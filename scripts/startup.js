(async function() {
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
        continue;
      }
      if (btn.dataset.name !== 'home') {
        this.nav.spawn('home', btn);
        btn.style.display = 'none';
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
    this.home = document.querySelector(`div.nav-btn[data-name="home"]`)
    this.attachListeners = function() {
      this.logo.onclick = () => {
        if (this.home) {
          this.home.remove();
          this.home = null;
        };
        globalEvents.emit('tab-switch', 'home');
      };
      this.theme.dataset.dark = String(csStorage.data.dark);
      this.theme.onclick = () => {
        const val = !(this.theme.dataset.dark == 'true');
        csStorage.data.dark = val;
        globalEvents.emit('theme-switch', val, this.theme, this.theme.children);
        csStorage.refresh(csStorage.data);
      };
      if (!csStorage.data.dark) globalEvents.emit('theme-switch', csStorage.data.dark, this.theme, this.theme.children);
      for (const btn of this.buttons) btn.onclick = function() { globalEvents.emit('tab-switch', this.dataset.name); };
    };
    this.spawn = function(name, copyableBtn) {
      switch(name) {
        case 'home': {
          if (this.home) this.home.remove();
          this.home = null;
          this.home = copyableBtn.cloneNode(true);
          this.home.dataset.name = 'home';
          this.home.children[0].src = './assets/home.svg';
          this.home.children[1].textContent = 'Back to Home';
          this.home.style.boxShadow = 'inset 0 -5px 0 0 #0391a3';
          this.node.insertBefore(this.home, copyableBtn);
          this.home.onclick = () => {
            globalEvents.emit('tab-switch', 'home');
            this.home.remove();
          };
        };
      }
    };
  })(this);
  this.globalEvents.emit('tab-switch', this.tab.current);
  this.nav.attachListeners();

  this.makeBreak = () => document.createElement('br');
  WindowEvents.emit('GUI', this);
}).apply({});
