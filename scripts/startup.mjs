import GUI_Imports from './imports.mjs';
globalThis.WindowEvents = new GUI_Imports.EventEmitter();
(async function() {
  globalThis.GUI = this;
  this.imports = GUI_Imports;
  this.importScript = function(url, skipDeletion, once) {
    skipDeletion = skipDeletion ?? false;
    const node = document.createElement('script');
    node.loadPromise = Promise.resolve();
    if (once && this.importScript.cache.has(url)) return node;
    if (once) this.importScript.cache.add(url);
    node.loadPromise = new Promise((resolve, reject) => {
      node.onload = (...args) => {
        if (!skipDeletion) node.remove();
        resolve(...args);
      };
      node.onerror = reject;
      node.GUI = globalThis.GUI;
      node.src = url;
      document.body.appendChild(node);
    });
    return node;
  };
  this.importScript.cache = new Set();
  this.importStyle = function(url, once) {
    const node = document.createElement('link');
    node.rel = 'stylesheet';
    if (once && this.importStyle.cache.has(url)) return node;
    if (once) {
      this.importStyle.cache.add(url);
      document.head.appendChild(node);
    } else {
      node.onload = node.remove;
      document.body.appendChild(node);
    }
    node.href = url;
    return node;
  };
  this.importStyle.cache = new Set();
  this.globalEvents = new GUI_Imports.EventEmitter();
  this.csStorage = new (function(GUI_Imports) {
    const key = 'CS-Storage';
    const defaultConfig = {
      dark: true,
      cache: {},
    };
    this.data = null;
    this.refresh = function(update) {
      if (update) {
        this.data = typeof update === 'string' ? JSON.parse(update) : update;
        localStorage.setItem(key, JSON.stringify(this.data));
        return;
      } else localStorage.setItem(key, JSON.stringify(this.data));
      try {
        this.data = JSON.parse(localStorage.getItem(key));
      } catch {
        console.warn('Storage Error, couldnt parse JSON');
        this.refresh(this.defaultConfig);
      }
    };
    this.refresh(localStorage.getItem(key) || defaultConfig);
    GUI_Imports.BasicCache.link(this, (function(name) {
      this.data.cache ??= {};
      if (!name) return this.data.cache;
      return this.data.cache[name];
    }).bind(this));
    this.data.cache ??= {};
    this.data.dark ??= true;
  })(GUI_Imports);
  await (this.importScript('./scripts/nav.js').loadPromise);
  await (this.importScript('https://cdn.jsdelivr.net/gh/Community-Spotlight/promotion-exports/scripts/community-spotlight.js').loadPromise);
  if (this.csStorage.data.dark) document.body.dataset.dark = 'true';
  else delete document.body.dataset.dark;

  WindowEvents.on('setCacheProp', (cached) => {
    this.csStorage.data.cache ??= {};
    this.csStorage.data.cache[cached.name] = cached;
  });
  WindowEvents.on('refreshCsStorage', (obj) => this.csStorage.refresh(obj || undefined));
  
  this.globalEvents.on('theme-switch', (val, btn, children) => {
    btn.dataset.dark = val;
    children[0].src = val ? '/assets/light.svg' :
      '/assets/dark.svg';
    children[1].textContent = val ? 'Light Mode' : 'Dark Mode';
    if (val) document.body.dataset.dark = 'true';
    else delete document.body.dataset.dark;
  });
  this.globalEvents.on('tab-switch', (name) => this.tab.set(name));
  
  this.tab = new (function(GUI, GUI_Imports) {
    this.current = GUI_Imports.URLParams.get('page') || 'home';
    this.contentBody = new (function() {
      this.scripts = [];
      this.node = document.querySelector('div.content-case') || null;
      this.set = function(node) {
        if (!node) return this.node = document.querySelector('div.content-case');
        this.node = node;
      };
      this.remove = function() {
        if (!this.node) return;
        this.removeScripts();
        this.node.remove();
        this.node = null;
      };
      this.removeScripts = function() {
        let script = true;
        while(script && (script = this.scripts.shift())) script.remove();
      };
    })();
    this.reset = function(body) {
      this.contentBody.remove();
    };
    this.acquire = function(fn, css) {
      fn = fn ?? (() => {});
      css = css || '';
      const bodyCase = document.createElement('div');
      bodyCase.classList = 'content-case';

      const body = document.createElement('div');
      body.classList = 'content-body';
      body.appendChild(document.createElement('style'));

      bodyCase.appendChild(body);
      document.body.appendChild(bodyCase);
      body.querySelector('style').textContent = css;
      this.contentBody.set(bodyCase);
      fn(body);
      return body;
    };
    this.set = function(name, force) {
      if (this.current === name && !force) return;
      this.reset();
      GUI_Imports.URLParams.set('page', name);
      this.current = name;
      const newUrl = `${globalThis.location.pathname}?${GUI_Imports.URLParams.toString()}`;
      globalThis.history.replaceState({}, '', newUrl);
      const script = GUI.importScript(`./scripts/${name}-page.js`);
      script.loadPromise.catch((err) => {
        alert(`Failed to load page "${name}", does it exist?`);
      });
      script.id = 'page-loader';
    };
    if (this.current !== '') this.set(this.current, true);
  })(this, GUI_Imports);
  
  this.nav = new (function(GUI) {
    const { tab, globalEvents, csStorage } = GUI;
    this.buttons = Array.from(document.querySelectorAll('div.nav-btn'));
    this.buttons.shift();
    this.node = document.querySelector('nav.nav-bar');
    this.logo = document.querySelector('nav.nav-bar div.logo');
    this.theme = document.querySelector('div[data-name="theme-switch"]');
    function implementButtonEvents(btn, altcallback, tab, doBefore) {
      btn.altpress = altcallback || (() => {});
      btn.altdown = function(...args) {
        this.setAttribute('aria-pressed', 'true');
        if (this.dataset.evbefore == 'true') this.altpress.call(this, false, args);
        if (this.dataset.tab == 'true') globalEvents.emit('tab-switch', this.dataset.name);
        if (this.dataset.evbefore == 'false') this.altpress.call(this, false, args);
      };
      btn.dataset.tab = String(tab ?? true);
      btn.dataset.evafter = String(doBefore ?? false);
      btn.onmousedown = btn.altdown;
      btn.onkeydown = function(...args) {
        const [ev] = args;
        if (ev.keyCode === 32 || ev.keyCode === 13) {
          ev.preventDefault();
          btn.altdown(...args);
        }
      };
      btn.onmouseup = function(...args) {
        this.setAttribute('aria-pressed', 'false');
        this.altpress.call(this, true, ...args);
      };
      btn.onkeyup = function(...args) {
        const [ev] = args;
        if (ev.keyCode === 32 || ev.keyCode === 13) {
          ev.preventDefault();
          this.setAttribute('aria-pressed', 'false');
          this.altpress.call(this, true, args);
        }
      };
    };
    this.attachListeners = function() {
      this.logo.onclick = () => globalEvents.emit('tab-switch', 'home');
      this.theme.dataset.dark = String(csStorage.data.dark);
      implementButtonEvents(this.theme, function(upEvent) {
        if (!upEvent) return;
        const val = !(this.dataset.dark == 'true');
        csStorage.data.dark = val;
        globalEvents.emit('theme-switch', val, this, this.children);
        csStorage.refresh(csStorage.data);
      }, false, false);
      if (!csStorage.data.dark) globalEvents.emit('theme-switch', csStorage.data.dark, this.theme, this.theme.children);
      for (const btn of this.buttons) implementButtonEvents(btn, () => {}, true, false);
    };
  })(this);
  this.globalEvents.emit('tab-switch', this.tab.current);
  this.nav.attachListeners();

  this.makeBreak = () => document.createElement('br');
  WindowEvents.emit('GUI', this);
}).apply({});
