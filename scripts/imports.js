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
})();
window.WindowEvents = new GUI_Imports.EventEmitter();
