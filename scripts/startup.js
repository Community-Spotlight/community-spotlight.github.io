window.GUI_Imports = new (function() {
  this.URLParams = new URLSearchParams(window.location.search);
  this.EventEmitter = class EventEmitter {
    _eventHandlers = {};
    isValidType(type) {
      return typeof type === 'string';
    }
    isValidHandler(handler) {
      return typeof handler === 'function';
    }
    on(type, handler) {
      if (!type || !handler) return false;
      if (!this.isValidType(type)) return false;
      if (!this.isValidHandler(handler)) return false;
      let handlers = this._eventHandlers[type];
      if (!handlers) handlers = this._eventHandlers[type] = [];
      if (handlers.indexOf(handler) >= 0) return false;
      handler._once = false;
      handlers.push(handler);
      return true;
    }
    once(type, handler) {
      if (!type || !handler) return false;
      if (!this.isValidType(type)) return false;
      if (!this.isValidHandler(handler)) return false;
      const ret = this.on(type, handler);
      if (ret) handler._once = true;
      return ret;
    }
    off(type, handler) {
      if (!type) return this.offAll();
      if (!handler) {
        this._eventHandlers[type] = [];
        return;
      }
      if (!this.isValidType(type)) return;
      if (!this.isValidHandler(handler)) return;
      const handlers = this._eventHandlers[type];
      if (!handlers || !handlers.length) return;
      for (let i = 0; i < handlers.length; i++) {
        const fn = handlers[i];
        if (fn === handler) {
          handlers.splice(i, 1);
          break;
        }
      }
    }
    offAll() {
      this._eventHandlers = {};
    }
    emit(type, data) {
      if (!type || !this.isValidType(type)) return;
      const handlers = this._eventHandlers[type];
      if (!handlers || !handlers.length) return;
      const event = this.createEvent(type, data);
      for (const handler of handlers) {
        if (!this.isValidHandler(handler)) continue;
        if (handler._once) event.once = true;
        handler(event);
        if (event.once) this.off(type, handler);
      }
    }
    has(type, handler) {
      if (!type || !this.isValidType(type)) return false;
      const handlers = this._eventHandlers[type];
      if (!handlers || !handlers.length) return false;
      if (!handler || !this.isValidHandler(handler)) return true;
      return handlers.indexOf(handler) >= 0;
    }
    getHandlers(type) {
      if (!type || !this.isValidType(type)) return [];
      return this._eventHandlers[type] || [];
    }
    createEvent(type, data, once = false) {
      const event = { type, data, timestamp: Date.now(), once };
      return event;
    }
  }
})();
window.GUI = new (function() {
  this.globalEvents = new GUI_Imports.EventEmitter();
  this.csStorage = new (function() {
    const key = 'CS-Storage';
    const defaultConfig = {
      dark: true,
    };
    this.data = null;
    this.refresh = function(update) {
      if (update) {
        this.data = update;
        localStorage.setItem(key, JSON.stringify(this.data));
      }
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch {
        console.warn('Storage Error, couldnt parse JSON');
        this.refresh(this.defaultConfig);
      }
    };
    this.refresh();
  })();
  
  this.globalEvents.on('theme-switch', (val, btn, children) => {
    btn.setAttribute('darkMode', val);
    children[0].src = val === false ? './assets/dark.svg' : './assets/light.svg';
    children[1].textContent = val === false ? 'Dark Mode' : 'Light Mode';
    document.body.style.background = val === false ? '#ffffff' : '#141414';
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
    this.reset = function() {
      this.contentBody.remove();
      this.contentBody.removeScripts();
    };
    this.set = function(name) {
      this.reset();
      GUI_Imports.URLParams.set('page', name);
      this.current = name;
      const newUrl = `${window.location.pathname}?${GUI_Imports.URLParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
      const script = document.createElement('script');
      script.id = 'page-loader';
      script.src = `./scripts/${name}-page.js`;
      this.contentBody.scripts.push(script);
      document.body.appendChild(script);
      GUI.globalEvents.emit('tab-switch', name);
    };
  })(this, GUI_Imports);
  this.tab.set(this.tab.current);
  
  this.nav = new (function(GUI) {
    const { tab, globalEvents, csStorage } = GUI;
    this.buttons = Array.from(document.querySelectorAll('nav.nav-btn'));
    this.node = document.querySelector('nav.nav-bar');
    this.logo = document.querySelector('nav.nav-bar div.logo');
    this.theme = document.querySelector('div#theme-switch');
    this.home = document.querySelector(`div.nav-btn[data-name="home"]`)
    this.attachListeners = function() {
      this.logo.addEventListener('click', () => {
        if (this.home) {
          this.home.remove();
          this.home = null;
        };
        tab.set('home');
        globalEvents.emit('tab-switch', 'home');
      });
      this.mode.dataset.dark = String(csStorage.data.dark);
      this.mode.addEventListener('click', () => {
        const val = !(this.mode.dataset.dark == 'true');
        csStorage.data.dark = val;
        globalEvents.emit('theme-switch', val, this.mode, this.mode.children);
        csStorage.refresh(csStorage.data);
      });
      if (!csStorage.data.dark) globalEvents.emit('theme-switch', csStorage.data.dark, this.mode, this.mode.children);
      for (const btn of this.buttons) btn.addEventListener('click', () => tab.set(btn.dataset.name || 'home'));
    };
    this.spawn = function(name, copyableBtn) {
      switch(name) {
        case 'home': {
          this.home.remove();
          this.home = null;
          this.home = copyableBtn.cloneNode(true);
          this.home.dataset.name = 'home';
          this.home.children[0].src = './assets/home.svg';
          this.home.children[1].textContent = 'Back to Home';
          this.home.style.boxShadow = 'inset 0 -5px 0 0 #0391a3';
          this.node.insertBefore(this.home, copyableBtn);
          this.home.addEventListener('click', () => {
            tab.set('home');
            globalEvents.emit('tab-switch', 'home');
            this.home.remove();
          });
        };
      }
    };
  })(this);
  this.nav.attachListeners();

  this.makeBreak = () => document.createElement("br");
})();
