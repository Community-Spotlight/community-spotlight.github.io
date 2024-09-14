window.GUI_Imports = new (function() {
  const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  this.hasOwn = hasOwn;
  this.URLParams = new URLSearchParams(window.location.search);
  this.EventEmitter = class EventEmitter extends EventTarget {
    constructor() {
      super();
      this.events = Object.create(null);
    }
    register(eventName) {
      this.events[eventName] = [];
    }
    emit(eventName, ...data) {
      if (!hasOwn(this.events, eventName)) this.register(eventName);
      const events = this.events[eventName];
      let popped = 0;
      for (let i = 0; i < events.length; i++) {
        const event = events[i - popped];
        event.callback(...data);
        if (event.deleteWhenCalled) {
          events.pop(i - popped);
          popped++;
        }
      }
    }
    on(eventName, callback) {
      if (!hasOwn(this.events, eventName)) this.register(eventName);
      this.events[eventName].push({
        deleteWhenCalled: false,
        callback,
      });
    }
    once(eventName, callback) {
      if (!hasOwn(this.events, eventName)) this.register(eventName);
      this.events[eventName].push({
        deleteWhenCalled: true,
        callback,
      });
    }
    wipe() {
      for (const event in events) events[event] = [];
    }
  };
  this.BasicCache = new (function() {
    let csStorage = null, cache = Object.create(null);
    this.link = function(csStorageInstance) {
      csStorage ??= csStorageInstance;
      if (!csStorage) return;
      csStorage.cache ??= Object.create(null);
      Object.values(csStorage.cache).forEach(cached => {
        cache[cashed.name] = structuredClone(cached);
        cache[cashed.name].fn = () => Promise.reject('Cache function not implemented');
      });
    };
    this.cache = async function(name, ms, cacheFn) {
      if (!csStorage || cache[name]) {
        if (!csStorage) return;
        if ((Date.now() - cache[name].start) < cache[name].ms) return;
      };
      cache[name] = {
        start: Date.now(),
        ms, name, value: '',
      };
      const cache = cache[name];
      csStorage.cache[name] = structuredClone(cache);
      cache.fn = async () => {
        cache.value = await cacheFn.call(window, cache);
        csStorage.cache[name] = cache.value;
        csStorage.refresh();
      };
      await cache.fn();
    };
    this.get = async function(name) {
      if (!csStorage || !cache[name]) return;
      if ((Date.now() - cache[name].start) < cache[name].ms) await this.cache(name, cache[name].ms, cache[name].fn);
      return cache[name].value;
    };
  })();
})();
window.WindowEvents = new GUI_Imports.EventEmitter();
