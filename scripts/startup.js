(async function() {
  window.GUI = this;
  this.importScript = function(url) {
    const node = document.createElement('script');
    node.loadPromise = new Promise((resolve, reject) => {
      node.onload = resolve;
      node.onerror = reject;
      node.src = url;
      document.body.appendChild(node);
    });
    return node;
  };
  await (this.importScript('./scripts/nav.js').loadPromise);
  this.globalEvents = new GUI_Imports.EventEmitter();
  this.csStorage = new (function() {
    const key = 'CS-Storage';
    const defaultConfig = {
      dark: true,
    };
    this.data = null;
    this.refresh = function(update) {
      if (update) {
        this.data = typeof update === 'string' ? JSON.parse(update) : update;
        localStorage.setItem(key, JSON.stringify(this.data));
        return;
      }
      try {
        this.data = JSON.parse(localStorage.getItem(key));
      } catch {
        console.warn('Storage Error, couldnt parse JSON');
        this.refresh(this.defaultConfig);
      }
    };
    this.refresh(localStorage.getItem(key) || defaultConfig);
  })();
  
  this.globalEvents.on('theme-switch', (val, btn, children) => {
    btn.dataset.dark = val;
    children[0].src = val === false ? './assets/dark.svg' : './assets/light.svg';
    children[1].textContent = val === false ? 'Dark Mode' : 'Light Mode';
    document.body.style.background = val === false ? '#ffffff' : '#141414';
    document.body.style.color = val === false ? '#000000' : '#ffffff';
  });
  this.globalEvents.on('tab-switch', (name) => {
    for (const btn of this.nav.buttons) {
      if (btn.dataset.name !== name) {
        btn.style.display = '';
        btn.setAttribute('aria-hidden', 'false');
        continue;
      }
      if (btn.dataset.name !== 'home') {
        this.nav.spawn('home', btn);
        btn.style.display = 'none';
        btn.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-pressed', 'false');
      }
    }
    this.tab.set(name);
  });
  
  this.tab = new (function(GUI, GUI_Imports) {
    this.current = GUI_Imports.URLParams.get('page') || 'home';
    this.contentBody = new (function() {
      this.scripts = [];
      this.node = document.querySelector('div.content-body') || null;
      this.set = function(node) {
        if (!node) return this.node = document.querySelector('div.content-body');
        this.node = node;
      };
      this.remove = function() {
        if (!this.node) return;
        this.node.remove();
        this.node = null;
      };
      this.removeScripts = function() {
        let script;
        while(script && (script = this.scripts.shift())) script.remove();
      };
    })();
    this.reset = function(body) {
      this.contentBody.remove();
      this.contentBody.removeScripts();
      if (body) this.contentBody.set(body);
    };
    this.acquire = function() {
      const body = document.createElement('div');
      body.classList = 'content-body';
      document.body.appendChild(body);
      this.reset(body);
      return body;
    };
    this.set = function(name) {
      this.reset();
      GUI_Imports.URLParams.set('page', name);
      this.current = name;
      const newUrl = `${window.location.pathname}?${GUI_Imports.URLParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
      const script = GUI.importScript(`./scripts/${name}-page.js`);
      script.id = 'page-loader';
      this.contentBody.scripts.push(script);
    };
  })(this, GUI_Imports);
  
  this.nav = new (function(GUI) {
    const { tab, globalEvents, csStorage } = GUI;
    this.buttons = Array.from(document.querySelectorAll('div.nav-btn'));
    this.buttons.shift();
    this.node = document.querySelector('nav.nav-bar');
    this.logo = document.querySelector('nav.nav-bar div.logo');
    this.theme = document.querySelector('div[data-name="theme-switch"]');
    this.home = document.querySelector(`div.nav-btn[data-name="home"]`);
    function implementButtonEvents(btn, altcallback, tab) {
      btn.altpress = altcallback || (() => {});
      btn.altdown = function(...args) {
        this.setAttribute('aria-pressed', 'true');
        if (this.dataset.tab == 'true') globalEvents.emit('tab-switch', this.dataset.name);
        this.altpress.apply(this, args);
      };
      btn.dataset.tab = String(tab ?? true);
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
        this.altpress.apply(this, args);
      };
      btn.onkeyup = function(...args) {
        const [ev] = args;
        if (ev.keyCode === 32 || ev.keyCode === 13) {
          ev.preventDefault();
          this.setAttribute('aria-pressed', 'false');
          this.altpress.apply(this, args);
        }
      };
    };
    this.attachListeners = function() {
      this.logo.onclick = () => {
        if (this.home) {
          this.home.remove();
          this.home = null;
        };
        globalEvents.emit('tab-switch', 'home');
      };
      this.theme.dataset.dark = String(csStorage.data.dark);
      implementButtonEvents(this.theme, function() {
        const val = !(this.dataset.dark == 'true');
        csStorage.data.dark = val;
        globalEvents.emit('theme-switch', val, this, this.children);
        csStorage.refresh(csStorage.data);
      }, false);
      if (!csStorage.data.dark) globalEvents.emit('theme-switch', csStorage.data.dark, this.theme, this.theme.children);
      for (const btn of this.buttons) implementButtonEvents(btn, () => {}, true);
    };
    this.spawn = function(name, copyableBtn) {
      switch(name) {
        case 'home': {
          if (this.home) this.home.remove();
          this.home = copyableBtn.cloneNode(true);
          this.home.dataset.name = 'home';
          this.home.children[0].src = './assets/home.svg';
          this.home.children[1].textContent = 'Back to Home';
          this.home.style.boxShadow = 'inset 0 -5px 0 0 #0391a3';
          this.home.role = 'button';
          this.home.setAttribute('aria-pressed', 'true');
          this.home.setAttribute('tabindex', String(copyableBtn.getAttribute('tabindex')));
          this.home.focus();
          implementButtonEvents(this.home, () => this.home.remove(), true);
          this.node.insertBefore(this.home, copyableBtn);
        };
      }
    };
  })(this);
  this.globalEvents.emit('tab-switch', this.tab.current);
  this.nav.attachListeners();

  this.makeBreak = () => document.createElement('br');
  WindowEvents.emit('GUI', this);
}).apply({});
