window.GUI_Imports = new (function() {
  import * as htmJS from './scripts/htm.mjs';
  this.htm = htmJS;
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
    let read = null, cache = Object.create(null);
    this.storage = cache;
    this.link = function(csStorageInstance, readCache) {
      if (!csStorageInstance || !readCache) return;
      read = readCache;
      Object.values(readCache()).forEach(cached => {
        WindowEvents.emit('setCacheProp', cached);
        cache[cached.name] = structuredClone(cached);
        cache[cached.name].fn = () => Promise.reject('Cache function not implemented');
      });
      WindowEvents.emit('refreshCsStorage');
    };
    this.cache = async function(name, ms, cacheFn) {
      if (!read || cache[name]) {
        if (!read) return;
        if ((Date.now() - cache[name].start) < cache[name].ms) return;
      };
      cache[name] = {
        start: Date.now(),
        ms, name, value: '',
      };
      const cacheObj = cache[name], altCacheObj = structuredClone(cacheObj);
      cacheObj.fn = async () => {
        cacheObj.value = await cacheFn.call(window, this);
        altCacheObj.value = cacheObj.value;
        WindowEvents.emit('setCacheProp', altCacheObj);
        WindowEvents.emit('refreshCsStorage');
      };
      await cacheObj.fn();
    };
    this.get = async function(name) {
      if (!read || !cache[name]) return;
      if ((Date.now() - cache[name].start) < cache[name].ms) await this.cache(name, cache[name].ms, cache[name].fn);
      return cache[name].value;
    };
  })();
})();
window.WindowEvents = new GUI_Imports.EventEmitter();
