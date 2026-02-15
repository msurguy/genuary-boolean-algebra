var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _cache, _FontLoader_static, appendStylesheet_fn, loadGoogleFont_fn, loadExtraFont_fn;
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var events = { exports: {} };
var hasRequiredEvents;
function requireEvents() {
  if (hasRequiredEvents) return events.exports;
  hasRequiredEvents = 1;
  var R = typeof Reflect === "object" ? Reflect : null;
  var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };
  var ReflectOwnKeys;
  if (R && typeof R.ownKeys === "function") {
    ReflectOwnKeys = R.ownKeys;
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys2(target) {
      return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys2(target) {
      return Object.getOwnPropertyNames(target);
    };
  }
  function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
  }
  var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
    return value !== value;
  };
  function EventEmitter2() {
    EventEmitter2.init.call(this);
  }
  events.exports = EventEmitter2;
  events.exports.once = once;
  EventEmitter2.EventEmitter = EventEmitter2;
  EventEmitter2.prototype._events = void 0;
  EventEmitter2.prototype._eventsCount = 0;
  EventEmitter2.prototype._maxListeners = void 0;
  var defaultMaxListeners = 10;
  function checkListener(listener) {
    if (typeof listener !== "function") {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
  }
  Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
      }
      defaultMaxListeners = arg;
    }
  });
  EventEmitter2.init = function() {
    if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || void 0;
  };
  EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
    }
    this._maxListeners = n;
    return this;
  };
  function _getMaxListeners(that) {
    if (that._maxListeners === void 0)
      return EventEmitter2.defaultMaxListeners;
    return that._maxListeners;
  }
  EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
  };
  EventEmitter2.prototype.emit = function emit(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
    var doError = type === "error";
    var events2 = this._events;
    if (events2 !== void 0)
      doError = doError && events2.error === void 0;
    else if (!doError)
      return false;
    if (doError) {
      var er;
      if (args.length > 0)
        er = args[0];
      if (er instanceof Error) {
        throw er;
      }
      var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
      err.context = er;
      throw err;
    }
    var handler = events2[type];
    if (handler === void 0)
      return false;
    if (typeof handler === "function") {
      ReflectApply(handler, this, args);
    } else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        ReflectApply(listeners[i], this, args);
    }
    return true;
  };
  function _addListener(target, type, listener, prepend) {
    var m;
    var events2;
    var existing;
    checkListener(listener);
    events2 = target._events;
    if (events2 === void 0) {
      events2 = target._events = /* @__PURE__ */ Object.create(null);
      target._eventsCount = 0;
    } else {
      if (events2.newListener !== void 0) {
        target.emit(
          "newListener",
          type,
          listener.listener ? listener.listener : listener
        );
        events2 = target._events;
      }
      existing = events2[type];
    }
    if (existing === void 0) {
      existing = events2[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === "function") {
        existing = events2[type] = prepend ? [listener, existing] : [existing, listener];
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
      m = _getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        w.name = "MaxListenersExceededWarning";
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }
    return target;
  }
  EventEmitter2.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };
  EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
  EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };
  function onceWrapper() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      if (arguments.length === 0)
        return this.listener.call(this.target);
      return this.listener.apply(this.target, arguments);
    }
  }
  function _onceWrap(target, type, listener) {
    var state = { fired: false, wrapFn: void 0, target, type, listener };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }
  EventEmitter2.prototype.once = function once2(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
    var list, events2, position, i, originalListener;
    checkListener(listener);
    events2 = this._events;
    if (events2 === void 0)
      return this;
    list = events2[type];
    if (list === void 0)
      return this;
    if (list === listener || list.listener === listener) {
      if (--this._eventsCount === 0)
        this._events = /* @__PURE__ */ Object.create(null);
      else {
        delete events2[type];
        if (events2.removeListener)
          this.emit("removeListener", type, list.listener || listener);
      }
    } else if (typeof list !== "function") {
      position = -1;
      for (i = list.length - 1; i >= 0; i--) {
        if (list[i] === listener || list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }
      if (position < 0)
        return this;
      if (position === 0)
        list.shift();
      else {
        spliceOne(list, position);
      }
      if (list.length === 1)
        events2[type] = list[0];
      if (events2.removeListener !== void 0)
        this.emit("removeListener", type, originalListener || listener);
    }
    return this;
  };
  EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
  EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events2, i;
    events2 = this._events;
    if (events2 === void 0)
      return this;
    if (events2.removeListener === void 0) {
      if (arguments.length === 0) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      } else if (events2[type] !== void 0) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else
          delete events2[type];
      }
      return this;
    }
    if (arguments.length === 0) {
      var keys = Object.keys(events2);
      var key;
      for (i = 0; i < keys.length; ++i) {
        key = keys[i];
        if (key === "removeListener") continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners("removeListener");
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
      return this;
    }
    listeners = events2[type];
    if (typeof listeners === "function") {
      this.removeListener(type, listeners);
    } else if (listeners !== void 0) {
      for (i = listeners.length - 1; i >= 0; i--) {
        this.removeListener(type, listeners[i]);
      }
    }
    return this;
  };
  function _listeners(target, type, unwrap) {
    var events2 = target._events;
    if (events2 === void 0)
      return [];
    var evlistener = events2[type];
    if (evlistener === void 0)
      return [];
    if (typeof evlistener === "function")
      return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }
  EventEmitter2.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };
  EventEmitter2.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };
  EventEmitter2.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === "function") {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };
  EventEmitter2.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events2 = this._events;
    if (events2 !== void 0) {
      var evlistener = events2[type];
      if (typeof evlistener === "function") {
        return 1;
      } else if (evlistener !== void 0) {
        return evlistener.length;
      }
    }
    return 0;
  }
  EventEmitter2.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };
  function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
      copy[i] = arr[i];
    return copy;
  }
  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
      list[index] = list[index + 1];
    list.pop();
  }
  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }
  function once(emitter, name) {
    return new Promise(function(resolve, reject) {
      function errorListener(err) {
        emitter.removeListener(name, resolver);
        reject(err);
      }
      function resolver() {
        if (typeof emitter.removeListener === "function") {
          emitter.removeListener("error", errorListener);
        }
        resolve([].slice.call(arguments));
      }
      eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
      if (name !== "error") {
        addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
      }
    });
  }
  function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === "function") {
      eventTargetAgnosticAddListener(emitter, "error", handler, flags);
    }
  }
  function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === "function") {
      if (flags.once) {
        emitter.once(name, listener);
      } else {
        emitter.on(name, listener);
      }
    } else if (typeof emitter.addEventListener === "function") {
      emitter.addEventListener(name, function wrapListener(arg) {
        if (flags.once) {
          emitter.removeEventListener(name, wrapListener);
        }
        listener(arg);
      });
    } else {
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
  }
  return events.exports;
}
var eventsExports = requireEvents();
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventsExports);
const dialogContent = '<div id="fp__modal" class="fpb__modal" tabindex="-1" role="dialog" aria-modal="true"><div class="fpb__modal-header"><h5 id="fp__title" class="fp__modal-title"></h5><button type="button" id="fp__close" class="fpb__btn-close" aria-label="Close">&times;</button></div><div class="fpb__accordion"><div class="fpb__accordion-item fpb__open"><button class="fpb__accordion-toggle fpb__has-icon" type="button"><svg class="fpb__primary" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="currentColor" fill-opacity="0" stroke-dasharray="40" stroke-dashoffset="40" d="M10.76 13.24c-2.34 -2.34 -2.34 -6.14 0 -8.49c2.34 -2.34 6.14 -2.34 8.49 0c2.34 2.34 2.34 6.14 0 8.49c-2.34 2.34 -6.14 2.34 -8.49 0Z"><animate fill="freeze" attributeName="fill-opacity" begin="1.4s" dur="0.3s" values="0;0.3"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="1s" values="40;0"/></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M10.5 13.5l-7.5 7.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.4s" values="12;0"/></path></g></svg><span id="fp__t-filters"></span></button><div class="fpb__accordion-content"><div class="fpb__grid-2"><div><input id="fp__search" class="fpb__input" /></div><div><select id="fp__subsets" class="fpb__input fpb__dropdown"></select></div><div class="fpb__span-2"><div id="fp__categories" class="fpb__hlist"></div></div></div></div></div><div class="fpb__accordion-item"><button class="fpb__accordion-toggle fpb__has-icon" type="button"><svg class="fpb__primary" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-dasharray="56" stroke-dashoffset="56" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h14l-5 6.5v9.5l-4 -4v-5.5Z"><animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.3s" values="0;0.3"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="56;0"/></path></svg><span id="fp__t-metrics"></span></button><div class="fpb__accordion-content"><div class="fpb__grid-2"><div><select id="fp__width" class="fpb__input fpb__dropdown"></select></div><div><select id="fp__thickness" class="fpb__input fpb__dropdown"></select></div><div><select id="fp__complexity" class="fpb__input fpb__dropdown"></select></div><div><select id="fp__curvature" class="fpb__input fpb__dropdown"></select></div></div></div></div><div class="fpb__accordion-item"><button class="fpb__accordion-toggle fpb__has-icon" type="button"><svg class="fpb__primary" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="12" stroke-dashoffset="12" d="M17 21l0 -10.5M7 3l0 10.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="12;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M17 10l-4 4M17 10l4 4M7 14l-4 -4M7 14l4 -4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.4s" values="8;0"/></path></g></svg><span id="fp__t-sort"></span></button><div class="fpb__accordion-content"><div class="fpb__input-group"><select id="fp__sort" class="fpb__input fpb__dropdown"></select><input type="checkbox" id="fp__sort-order" class="fpb__hidden-input" /><label for="fp__sort-order" type="button" class="fpb__btn fpb__btn-toggle fpb__btn-flip fpb__has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 9l4-4l4 4M7 5v14m14-4l-4 4l-4-4m4 4V5"/></svg></label></div></div></div></div><div id="fp__fonts" tabindex="0"></div><div class="fp__preview-container"><div id="fp__preview" contenteditable spellcheck="false"></div></div><div id="fp__variants"></div><div class="fpb__modal-footer"><div class="fpb__grow"><button id="fp__clear-filters" type="button" class="fpb__btn fpb__btn-link fpb__btn-secondary fpb__has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="currentColor" fill-opacity="0" stroke-dasharray="56" stroke-dashoffset="56" d="M3 4h14l-5 6.5v9.5l-4 -4v-5.5Z"><animate fill="freeze" attributeName="fill-opacity" begin="2s" dur="0.3s" values="0;0.3"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="56;0"/></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M16 15l6 6"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.4s" values="10;0"/></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M16 21l6 -6"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.6s" dur="0.4s" values="10;0"/></path></g></svg><span id="fp__t-clear-filters"></span></button></div><button id="fp__cancel" type="button" class="fpb__btn fpb__btn-link fpb__has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-dasharray="24" stroke-dashoffset="24" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M5 5l14 14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.8s" values="24;0"/></path><path d="M19 5l-14 14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.8s" values="24;0"/></path></g></svg><span id="fp__t-cancel"></span></button><button id="fp__clear" type="button" class="fpb__btn fpb__btn-link fpb__has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="64" stroke-dashoffset="64" d="M5.64 5.64c3.51 -3.51 9.21 -3.51 12.73 0c3.51 3.51 3.51 9.21 0 12.73c-3.51 3.51 -9.21 3.51 -12.73 0c-3.51 -3.51 -3.51 -9.21 -0 -12.73Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0"/></path><path stroke-dasharray="20" stroke-dashoffset="20" d="M6 6l12 12"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.4s" values="20;0"/></path></g></svg><span id="fp__t-clear"></span></button><button id="fp__pick" type="button" class="fpb__btn fpb__btn-pill fpb__has-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><mask id="lineMdCheckAll0"><g fill="none" stroke="#fff" stroke-dasharray="24" stroke-dashoffset="24" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M2 13.5l4 4l10.75 -10.75"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.8s" values="24;0"/></path><path stroke="#000" stroke-width="6" d="M7.5 13.5l4 4l10.75 -10.75"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.8s" values="24;0"/></path><path d="M7.5 13.5l4 4l10.75 -10.75"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.8s" values="24;0"/></path></g></mask><rect width="24" height="24" fill="currentColor" mask="url(#lineMdCheckAll0)"/></svg><span id="fp__t-pick"></span></button></div></div><div id="fp__backdrop" class="fpb__backdrop"></div>';
const heartSVG = `<div class="fp__heart" role="button"><svg xmlns="http://www.w3.org/2000/svg" stroke-width="2" viewBox="0 0 18 18"><path d="M9 2.314 C13.438-2.248 24.534 5.735 9 16-6.534 5.736 4.562-2.248 9 2.314z" /></svg></div>`;
const createLazyFont = (font) => {
  const $item = document.createElement("div");
  $item.className = "fp__font-item";
  $item.role = "button";
  $item.dataset.family = font.name;
  return $item;
};
const hydrateFont = ($item, font) => {
  const $family = document.createElement("span");
  $family.className = "fp__font-family";
  $family.textContent = font.name;
  $family.style.fontFamily = `"${font.name}"`;
  $item.append($family);
  $item.insertAdjacentHTML("beforeend", heartSVG);
};
const createRadioToggle = ({
  id,
  name,
  value,
  label,
  classes,
  checked
}) => {
  const $input = document.createElement("input");
  $input.className = "fpb__hidden-input";
  $input.type = "radio";
  $input.name = name;
  $input.id = id;
  $input.value = value;
  $input.autocomplete = "off";
  if (checked) $input.checked = true;
  const $label = document.createElement("label");
  $label.className = "fpb__btn fpb__btn-pill fpb__btn-small fpb__btn-toggle";
  $label.htmlFor = id;
  $label.textContent = label;
  if (classes) $label.classList.add(...classes);
  return [$input, $label];
};
const createCheckToggle = ({
  id,
  value,
  label,
  classes,
  checked
}) => {
  const $input = document.createElement("input");
  $input.className = "fpb__hidden-input";
  $input.type = "checkbox";
  $input.id = id;
  $input.autocomplete = "off";
  if (value) $input.value = value;
  if (checked) $input.checked = true;
  const $label = document.createElement("label");
  $label.className = "fpb__btn fpb__btn-pill fpb__btn-small fpb__btn-toggle";
  $label.htmlFor = id;
  $label.textContent = label;
  if (classes) $label.classList.add(...classes);
  return [$input, $label];
};
const createVariants = (variants) => {
  const weights = Array.from(new Set(variants.map((v) => parseInt(v))));
  return [
    ...weights.flatMap(
      (weight) => createRadioToggle({
        id: `fp__weight-${weight}`,
        name: "fp__weight",
        label: weight.toString(),
        value: weight.toString()
      })
    ),
    ...createCheckToggle({ id: "fp__italic", label: "Italic", classes: ["fpb__btn-secondary"] })
  ];
};
const createBadges = (badges) => {
  return Object.entries(badges).flatMap(
    ([value, label]) => createCheckToggle({
      id: `fp__category-${value}`,
      value,
      label
    })
  );
};
const setActiveBadges = ($parent, values) => {
  const $inputs = $parent.querySelectorAll(".fpb__hidden-input");
  for (const $input of $inputs) {
    $input.checked = values.includes($input.value);
  }
};
const getActiveBadges = ($parent) => {
  const $inputs = $parent.querySelectorAll(".fpb__hidden-input:checked");
  return [...$inputs].map(($input) => $input.value);
};
const createOption = (key, label) => {
  const $option = document.createElement("option");
  $option.value = key;
  $option.textContent = label;
  return $option;
};
const createOptions = (options) => {
  return Object.entries(options).map(([key, label]) => createOption(key, label));
};
class Modal extends EventEmitter {
  constructor($el) {
    super();
    __publicField(this, "$el");
    this.$el = $el;
  }
  get isOpen() {
    return this.$el.classList.contains("fpb__open");
  }
  toggle(force) {
    const open2 = this.$el.classList.toggle("fpb__open", force);
    this.emit(open2 ? "opening" : "closing");
    setTimeout(() => this.emit(open2 ? "opened" : "closed"), 500);
  }
  open() {
    if (!this.isOpen) this.toggle(true);
  }
  close() {
    if (this.isOpen) this.toggle(false);
  }
}
class Accordion {
  constructor($el) {
    __publicField(this, "$el");
    this.$el = $el;
    this.$el.addEventListener("click", (event) => {
      const $target = event.target;
      const $accordionToggle = $target.closest(".fpb__accordion-toggle");
      if ($accordionToggle) this.toggleItem($accordionToggle.parentElement);
    });
  }
  getItems() {
    return this.$el.querySelectorAll(".fpb__accordion-item");
  }
  _toggle($item, force) {
    const $content = $item.querySelector(".fpb__accordion-content");
    const height = $content.children[0].clientHeight + "px";
    $content.style.setProperty("--fpb-height", height);
    setTimeout(() => {
      const open2 = $item.classList.toggle("fpb__open", force);
      setTimeout(() => $content.style.removeProperty("--fpb-height"), open2 ? 500 : 0);
    }, 1);
    return open;
  }
  toggleItem($item) {
    const open2 = this._toggle($item);
    if (!open2) return;
    this.getItems().forEach(($otherItem) => {
      if ($otherItem !== $item) this._toggle($otherItem, false);
    });
  }
}
const array = [];
const characterCodeCache = [];
function leven(first, second) {
  if (first === second) {
    return 0;
  }
  const swap = first;
  if (first.length > second.length) {
    first = second;
    second = swap;
  }
  let firstLength = first.length;
  let secondLength = second.length;
  while (firstLength > 0 && first.charCodeAt(~-firstLength) === second.charCodeAt(~-secondLength)) {
    firstLength--;
    secondLength--;
  }
  let start = 0;
  while (start < firstLength && first.charCodeAt(start) === second.charCodeAt(start)) {
    start++;
  }
  firstLength -= start;
  secondLength -= start;
  if (firstLength === 0) {
    return secondLength;
  }
  let bCharacterCode;
  let result;
  let temporary;
  let temporary2;
  let index = 0;
  let index2 = 0;
  while (index < firstLength) {
    characterCodeCache[index] = first.charCodeAt(start + index);
    array[index] = ++index;
  }
  while (index2 < secondLength) {
    bCharacterCode = second.charCodeAt(start + index2);
    temporary = index2++;
    result = index2;
    for (index = 0; index < firstLength; index++) {
      temporary2 = bCharacterCode === characterCodeCache[index] ? temporary : temporary + 1;
      temporary = array[index];
      result = array[index] = temporary > result ? temporary2 > result ? result + 1 : temporary2 : temporary2 > temporary ? temporary + 1 : temporary2;
    }
  }
  return result;
}
const familySort = (a, b, key) => {
  if (key === "name") return a.name.localeCompare(b.name);
  if (key === "popularity") {
    if (a.popularity === void 0 && b.popularity === void 0) return 0;
    if (a.popularity === void 0) return Infinity;
    if (b.popularity === void 0) return -Infinity;
    return a.popularity - b.popularity;
  }
  if (a.metrics === void 0 && b.metrics === void 0) return 0;
  if (a.metrics === void 0) return Infinity;
  if (b.metrics === void 0) return -Infinity;
  if (key === "complexity") return b.metrics.complexity - a.metrics.complexity;
  if (key === "curvature") return b.metrics.curvature - a.metrics.curvature;
  if (key === "thickness") return b.metrics.thickness - a.metrics.thickness;
  if (key === "width") return b.metrics.width - a.metrics.width;
  return 0;
};
const compareMetric = (value, target) => {
  if (target === "all") return true;
  if (value === void 0) return false;
  return value === parseFloat(target);
};
const familyFilter = (a, filters) => {
  var _a, _b, _c, _d;
  if (filters.name) {
    const difference = leven(a.name.toLowerCase(), filters.name.toLowerCase());
    const threshold = [...a.name].length - [...filters.name].length;
    if (difference > threshold) return false;
  }
  if (a.subsets && filters.subset !== "all" && !a.subsets.includes(filters.subset)) return false;
  if (a.category && !filters.categories.includes(a.category)) return false;
  if (!compareMetric((_a = a.metrics) == null ? void 0 : _a.width, filters.width)) return false;
  if (!compareMetric((_b = a.metrics) == null ? void 0 : _b.complexity, filters.complexity)) return false;
  if (!compareMetric((_c = a.metrics) == null ? void 0 : _c.curvature, filters.curvature)) return false;
  if (!compareMetric((_d = a.metrics) == null ? void 0 : _d.thickness, filters.thickness)) return false;
  return true;
};
const _Font = class _Font {
  constructor(family, weight, italic) {
    __publicField(this, "family");
    __publicField(this, "weight");
    __publicField(this, "italic");
    this.family = family;
    this.weight = weight;
    this.italic = italic;
  }
  get style() {
    return this.italic ? "italic" : "normal";
  }
  get variant() {
    return this.weight + (this.italic ? "i" : "");
  }
  toId() {
    return `${this.family}:${this.variant}`;
  }
  toConcise() {
    if (this.family.getDefaultVariant() === this.variant) return this.family.name;
    return this.toId();
  }
  toString() {
    if (this.family.getDefaultVariant() === this.variant) return this.family.name;
    const entries = [this.family.name];
    entries.push(_Font.weightNames[this.weight]);
    if (this.italic) entries.push("Italic");
    entries.push(`(${this.variant})`);
    return entries.join(" ");
  }
  static parse(family, variant = family.getDefaultVariant()) {
    const weight = parseInt(variant);
    const italic = variant.endsWith("i");
    return new _Font(family, weight, italic);
  }
};
__publicField(_Font, "weightNames", {
  100: "Thin",
  200: "Extra Light",
  300: "Light",
  400: "Normal",
  500: "Medium",
  600: "Semi Bold",
  700: "Bold",
  800: "Extra Bold",
  900: "Black"
});
let Font = _Font;
class FontFamily {
  constructor(family) {
    Object.assign(this, family);
  }
  toString() {
    return this.name;
  }
  getDefaultVariant() {
    const weights = Array.from(new Set(this.variants));
    return weights.toSorted((a, b) => {
      return Math.abs(parseInt(a) - 400) - Math.abs(parseInt(b) - 400);
    })[0];
  }
  // parse font family from compressed format
  static parse(raw) {
    const [name, cate, vari, subs, popu, thic, widt, comp, curv] = raw.split("/");
    const family = new FontFamily({
      name,
      category: cate,
      variants: vari.split(","),
      subsets: subs.split(",")
    });
    if (popu) family.popularity = parseInt(popu);
    if (thic && widt && comp && curv)
      family.metrics = {
        thickness: parseFloat(thic),
        width: parseFloat(widt),
        complexity: parseFloat(comp),
        curvature: parseFloat(curv)
      };
    return family;
  }
}
const _googleFonts = "Roboto/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,math,symbols,vietnamese/2/3/1/4/0|Open Sans/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,math,symbols,vietnamese/3/1/2/0/2|Google Sans/sans-serif/400,400i,500,500i,600,600i,700,700i/armenian,bengali,canadian-aboriginal,cyrillic,cyrillic-ext,devanagari,ethiopic,georgian,greek,greek-ext,gujarati,gurmukhi,hebrew,khmer,lao,latin,latin-ext,malayalam,oriya,sinhala,symbols,tamil,telugu,thai,vietnamese/4/2/2/1/2|Noto Sans JP/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic,japanese,latin,latin-ext,vietnamese/5/2/2/0/2|Inter/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/6/2/3/0/2|Montserrat/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/7/1/3/0/2|Poppins/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/devanagari,latin,latin-ext/9/2/3/4/2|Lato/sans-serif/100,100i,300,300i,400,400i,700,700i,900,900i/latin,latin-ext/11/3/1/1/3|Roboto Condensed/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/13/3/0/1/3|Arimo/sans-serif/400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese/14/3/2/4/1|Roboto Mono/monospace/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/16/1/4/1/2|Oswald/sans-serif/200,300,400,500,600,700/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/17/4/0/0/2|Noto Sans/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,devanagari,greek,greek-ext,latin,latin-ext,vietnamese/19/2/2/0/2|Raleway/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/20/1/2/0/3|Nunito Sans/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/23/1/2/4/1|Nunito/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/24/1/2/1/3|Playfair Display/serif/400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,latin,latin-ext,vietnamese/25/1/2/2/3|Rubik/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/arabic,cyrillic,cyrillic-ext,hebrew,latin,latin-ext/26/3/2/1/3|Ubuntu/sans-serif/300,300i,400,400i,500,500i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext/27/3/2/0/3|Roboto Slab/serif/100,200,300,400,500,600,700,800,900/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/28/3/3/0/0|DM Sans/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/29/2/2/0/2|Archivo Black/sans-serif/400/latin,latin-ext/30/4/4/4/0|Merriweather/serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/32/3/3/0/0|Noto Sans KR/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic,korean,latin,latin-ext,vietnamese/33/2/2/0/2|Work Sans/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/34/1/3/0/2|PT Sans/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext/35/2/1/0/2|Kanit/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,thai,vietnamese/36/4/1/4/1|Lora/serif/400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext,math,symbols,vietnamese/38/1/3/2/3|Mulish/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/39/1/2/4/1|Manrope/sans-serif/200,300,400,500,600,700,800/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/40/1/1/0/2|Archivo/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/41/3/1/0/3|Outfit/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext/42/3/1/0/2|Bebas Neue/sans-serif/400/latin,latin-ext/43/4/4/3/0|Noto Sans TC/sans-serif/100,200,300,400,500,600,700,800,900/chinese-traditional,cyrillic,latin,latin-ext,vietnamese/44/2/2/0/2|Figtree/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/45/3/1/0/2|Fira Sans/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/46/3/1/4/1|Quicksand/sans-serif/300,400,500,600,700/latin,latin-ext,vietnamese/47/0/2/1/3|Prompt/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,thai,vietnamese/48/3/3/4/1|Barlow/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/49/1/1/1/1|Hind Siliguri/sans-serif/300,400,500,600,700/bengali,latin,latin-ext/50/2/1/3/0|IBM Plex Sans/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/51/2/1/0/2|Saira/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/52/2/2/0/3|Titillium Web/sans-serif/200,200i,300,300i,400,400i,600,600i,700,700i,900/latin,latin-ext/53/2/1/3/0|Fjalla One/sans-serif/400/cyrillic-ext,latin,latin-ext,vietnamese/54/4/0/0/1|Bricolage Grotesque/sans-serif/200,300,400,500,600,700,800/latin,latin-ext,vietnamese/55/3/2/0/3|Karla/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext/56/1/1/0/2|Heebo/sans-serif/100,200,300,400,500,600,700,800,900/hebrew,latin,latin-ext,math,symbols/57/3/1/0/2|Jost/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,latin,latin-ext/58/1/1/0/2|Noto Serif/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,math,vietnamese/59/3/3/1/2|PT Serif/serif/400,400i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext/60/3/1/1/2|Share Tech/sans-serif/400/latin/61/3/0/4/0|Smooch Sans/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/62/1/4/4/0|Gravitas One/display/400/latin/65/4/4/2/3|Inconsolata/monospace/200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/66/1/2/0/3|Source Sans 3/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/67/2/1/0/2|Plus Jakarta Sans/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/cyrillic-ext,latin,latin-ext,vietnamese/68/2/2/4/2|Noto Color Emoji/sans-serif/400/emoji/69/0/4/3/0|Dancing Script/handwriting/400,500,600,700/latin,latin-ext,vietnamese/70/0/0/2/4|Josefin Sans/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext,vietnamese/71/1/2/4/2|Libre Baskerville/serif/400,400i,500,500i,600,600i,700,700i/latin,latin-ext/73/1/4/2/3|Cairo/sans-serif/200,300,400,500,600,700,800,900/arabic,latin,latin-ext/74/2/1/0/2|Noto Serif JP/serif/200,300,400,500,600,700,800,900/cyrillic,japanese,latin,latin-ext,vietnamese/75/0/3/2/0|Libre Franklin/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/76/2/2/1/2|EB Garamond/serif/400,400i,500,500i,600,600i,700,700i,800,800i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/77/1/0/3/4|Source Code Pro/monospace/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/78/0/4/0/2|Noto Sans SC/sans-serif/100,200,300,400,500,600,700,800,900/chinese-simplified,cyrillic,latin,latin-ext,vietnamese/79/2/2/0/2|Anton/sans-serif/400/latin,latin-ext,vietnamese/80/4/0/4/0|Barlow Condensed/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/81/3/0/1/1|Dosis/sans-serif/200,300,400,500,600,700,800/latin,latin-ext,vietnamese/82/1/0/1/3|Mukta/sans-serif/200,300,400,500,600,700,800/devanagari,latin,latin-ext/83/3/0/0/2|Changa One/display/400,400i/latin/84/4/1/3/0|Schibsted Grotesk/sans-serif/400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/85/2/3/0/2|Roboto Flex/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/86/3/1/4/0|Lobster Two/display/400,400i,700,700i/latin/87/4/0/2/4|Bitter/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/89/2/2/1/0|Nanum Gothic/sans-serif/400,700,800/korean,latin/90/1/2/1/2|Public Sans/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/91/3/2/0/2|Ramabhadra/sans-serif/400/latin,telugu/92/4/3/4/1|Noto Sans Telugu/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,telugu/93/2/2/0/2|Cabin/sans-serif/400,400i,500,500i,600,600i,700,700i/latin,latin-ext,vietnamese/94/3/1/4/2|Anek Telugu/sans-serif/100,200,300,400,500,600,700,800/latin,latin-ext,telugu/96/3/1/0/0|Assistant/sans-serif/200,300,400,500,600,700,800/hebrew,latin,latin-ext/97/1/0/0/2|Alfa Slab One/display/400/latin,latin-ext,vietnamese/99/4/4/0/0|Space Grotesk/sans-serif/300,400,500,600,700/latin,latin-ext,vietnamese/101/1/3/4/0|Bungee/display/400/latin,latin-ext,vietnamese/102/4/4/1/0|Pacifico/handwriting/400/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/103/3/1/2/3|M PLUS Rounded 1c/sans-serif/100,300,400,500,700,800,900/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,japanese,latin,latin-ext,vietnamese/104/1/2/0/3|Hind/sans-serif/300,400,500,600,700/devanagari,latin,latin-ext/108/2/1/3/0|Cormorant Garamond/serif/300,300i,400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/109/0/0/2/3|Red Hat Display/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/110/1/1/4/2|Exo 2/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/111/3/1/0/2|Oxygen/sans-serif/300,400,700/latin,latin-ext/112/2/1/4/2|Lobster/display/400/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/113/4/0/1/3|Inter Tight/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/114/3/1/0/2|Slabo 27px/serif/400/latin,latin-ext/115/3/0/0/0|Crimson Text/serif/400,400i,600,600i,700,700i/latin,latin-ext,vietnamese/116/1/0/2/3|Urbanist/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/117/1/1/4/3|Lexend/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/118/3/3/0/2|Caveat/handwriting/400,500,600,700/cyrillic,cyrillic-ext,latin,latin-ext/119/1/0/3/4|Overpass/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/120/3/1/4/2|Tajawal/sans-serif/200,300,400,500,700,800,900/arabic,latin/121/1/0/4/0|Comfortaa/display/300,400,500,600,700/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/122/1/3/1/3|PT Sans Narrow/sans-serif/400,700/cyrillic,cyrillic-ext,latin,latin-ext/123/3/0/0/2|Arvo/serif/400,400i,700,700i/latin/124/3/3/1/1|Abel/sans-serif/400/latin/125/1/0/1/2|Sora/sans-serif/100,200,300,400,500,600,700,800/latin,latin-ext/126/3/3/0/1|Rajdhani/sans-serif/300,400,500,600,700/devanagari,latin,latin-ext/127/0/0/1/0|Noto Sans Arabic/sans-serif/100,200,300,400,500,600,700,800,900/arabic,latin,latin-ext,math,symbols/128/0/3/3/0|Almarai/sans-serif/300,400,700,800/arabic,latin/130/3/1/4/0|Teko/sans-serif/300,400,500,600,700/devanagari,latin,latin-ext/131/4/4/0/0|DM Serif Display/serif/400,400i/latin,latin-ext/132/4/1/1/1|Merriweather Sans/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/cyrillic-ext,latin,latin-ext,vietnamese/133/3/2/0/2|Lexend Deca/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/134/3/3/0/2|M PLUS 1p/sans-serif/100,300,400,500,700,800,900/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,japanese,latin,latin-ext,vietnamese/136/1/3/3/0|Lilita One/display/400/latin,latin-ext/137/4/1/4/2|Barlow Semi Condensed/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/138/2/0/1/1|Orbitron/sans-serif/400,500,600,700,800,900/latin/139/2/4/4/0|Source Serif 4/serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/140/2/3/2/1|Cinzel/serif/400,500,600,700,800,900/latin,latin-ext/141/0/3/3/0|Noto Sans Thai/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,thai/142/2/2/0/2|Asap/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/143/3/1/1/3|Fredoka/sans-serif/300,400,500,600,700/hebrew,latin,latin-ext/144/3/2/1/4|Play/sans-serif/400,700/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/145/3/1/4/0|Abril Fatface/display/400/latin,latin-ext/146/4/2/0/0|Shadows Into Light/handwriting/400/latin,latin-ext/147/0/0/2/4|Chakra Petch/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext,thai,vietnamese/148/2/1/3/0|Indie Flower/handwriting/400/latin,latin-ext/150/0/1/2/4|Fira Sans Condensed/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/151/3/0/3/0|IBM Plex Mono/monospace/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/152/0/4/0/1|Zen Kaku Gothic New/sans-serif/300,400,500,700,900/cyrillic,japanese,latin,latin-ext/153/0/1/4/2|Questrial/sans-serif/400/latin,latin-ext,vietnamese/154/3/1/4/2|Maven Pro/sans-serif/400,500,600,700,800,900/latin,latin-ext,vietnamese/155/1/2/4/2|Be Vietnam Pro/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/156/3/3/0/3|Domine/serif/400,500,600,700/latin,latin-ext/157/3/3/1/0|Bodoni Moda/serif/400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,math,symbols/159/0/2/1/2|Varela Round/sans-serif/400/hebrew,latin,latin-ext,vietnamese/160/2/3/1/3|IBM Plex Serif/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/161/1/2/1/1|Marcellus/serif/400/latin,latin-ext/162/1/2/2/4|JetBrains Mono/monospace/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/163/1/4/-1/0|Instrument Serif/serif/400,400i/latin,latin-ext/164/3/0/2/2|Exo/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/165/1/2/0/2|Sofia Sans/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,latin,latin-ext/166/3/1/1/1|Satisfy/handwriting/400/latin/167/1/0/3/4|DM Serif Text/serif/400,400i/latin,latin-ext/168/4/1/1/1|IBM Plex Sans Arabic/sans-serif/100,200,300,400,500,600,700/arabic,cyrillic-ext,latin,latin-ext/169/2/1/0/2|Archivo Narrow/sans-serif/400,400i,500,500i,600,600i,700,700i/latin,latin-ext,vietnamese/170/4/0/4/1|Zilla Slab/serif/300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext/171/3/1/0/0|Unbounded/sans-serif/200,300,400,500,600,700,800,900/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/172/4/4/0/2|Instrument Sans/sans-serif/400,400i,500,500i,600,600i,700,700i/latin,latin-ext/173/1/2/4/1|Nanum Myeongjo/serif/400,700,800/korean,latin/174/0/2/2/3|ABeeZee/sans-serif/400,400i/latin,latin-ext/175/2/2/4/2|Geist/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic,latin,latin-ext/176/2/2/1/2|Red Hat Text/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext/177/1/2/4/2|Great Vibes/handwriting/400/cyrillic,cyrillic-ext,greek-ext,latin,latin-ext,vietnamese/178/0/0/3/4|Spectral/serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/179/1/2/0/0|Geologica/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/180/3/3/0/2|Albert Sans/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/181/1/2/4/2|League Spartan/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/182/3/0/0/3|Yellowtail/handwriting/400/latin,latin-ext/183/4/0/2/4|Google Sans Flex/sans-serif/100,200,300,400,500,600,700,800,900/canadian-aboriginal,cherokee,latin,latin-ext,math,nushu,symbols,syriac,tifinagh,vietnamese/184/2/2/1/2|Onest/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic,cyrillic-ext,latin,latin-ext/185/3/3/0/3|Catamaran/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,tamil/186/2/1/4/2|Saira Condensed/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/187/3/0/4/2|Noto Kufi Arabic/sans-serif/100,200,300,400,500,600,700,800,900/arabic,latin,latin-ext,math,symbols/188/1/3/0/2|Cormorant/serif/300,300i,400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/189/0/0/2/3|Rowdies/display/300,400,700/latin,latin-ext,vietnamese/190/4/3/4/0|Advent Pro/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,latin,latin-ext/191/1/0/0/3|Vollkorn/serif/400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/192/3/1/2/4|Epilogue/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/193/2/3/0/3|Kalam/handwriting/300,400,700/devanagari,latin,latin-ext/194/1/1/1/4|Noto Sans Display/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/195/3/1/0/2|Roboto Serif/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/196/2/3/2/2|Geist Mono/monospace/100,200,300,400,500,600,700,800,900/cyrillic,latin,latin-ext/197/2/2/1/1|Noto Serif KR/serif/200,300,400,500,600,700,800,900/cyrillic,korean,latin,latin-ext,vietnamese/198/0/3/2/0|DM Mono/monospace/300,300i,400,400i,500,500i/latin,latin-ext/199/1/4/4/1|Frank Ruhl Libre/serif/300,400,500,600,700,800,900/hebrew,latin,latin-ext/200/2/1/2/2|Luckiest Guy/display/400/latin,latin-ext/201/4/3/1/4|Signika/sans-serif/300,400,500,600,700/latin,latin-ext,vietnamese/202/3/1/1/3|Zen Maru Gothic/sans-serif/300,400,500,700,900/cyrillic,greek,japanese,latin,latin-ext/203/0/1/0/2|Asap Condensed/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/204/4/0/1/2|Google Sans Code/monospace/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/adlam,canadian-aboriginal,cherokee,latin,latin-ext,math,old-permic,symbols,symbols2,syriac,vietnamese/205/2/2/1/1|Alegreya/serif/400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/206/1/0/2/3|Noto Serif SC/serif/200,300,400,500,600,700,800,900/chinese-simplified,cyrillic,latin,latin-ext,vietnamese/207/0/3/2/0|Permanent Marker/handwriting/400/latin/208/4/3/3/4|Alegreya Sans/sans-serif/100,100i,300,300i,400,400i,500,500i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/209/2/0/0/0|Hanken Grotesk/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic-ext,latin,latin-ext,vietnamese/210/2/2/0/2|Sarabun/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext,thai,vietnamese/211/2/1/4/1|Montserrat Alternates/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/212/1/3/4/2|Bree Serif/serif/400/latin,latin-ext/213/4/1/0/0|Noto Serif TC/serif/200,300,400,500,600,700,800,900/chinese-traditional,cyrillic,latin,latin-ext,vietnamese/214/0/3/2/0|Hind Madurai/sans-serif/300,400,500,600,700/latin,latin-ext,tamil/215/2/1/3/0|Rethink Sans/sans-serif/400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext/216/2/2/4/2|Newsreader/serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext,vietnamese/217/1/1/1/1|Tinos/serif/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese/218/2/1/0/0|Space Mono/monospace/400,400i,700,700i/latin,latin-ext,vietnamese/219/1/4/0/1|Acme/sans-serif/400/latin/220/4/0/4/0|Cardo/serif/400,400i,700/gothic,greek,greek-ext,hebrew,latin,latin-ext,old-italic,runic/222/0/2/2/3|Amiri/serif/400,400i,700,700i/arabic,latin,latin-ext/223/1/1/3/4|Antic Slab/serif/400/latin/224/1/1/0/0|Yanone Kaffeesatz/sans-serif/200,300,400,500,600,700/cyrillic,cyrillic-ext,latin,latin-ext,math,symbols,vietnamese/225/4/4/1/4|Signika Negative/sans-serif/300,400,500,600,700/latin,latin-ext,vietnamese/226/3/1/1/3|Amatic SC/handwriting/400,700/cyrillic,hebrew,latin,latin-ext,vietnamese/227/0/4/2/1|Fraunces/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/228/3/3/2/3|Encode Sans/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/229/1/1/4/2|Rubik Mono One/sans-serif/400/cyrillic,latin,latin-ext/230/4/4/0/1|Chivo/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/231/3/2/0/2|Russo One/sans-serif/400/cyrillic,latin,latin-ext/232/4/3/4/0|Titan One/display/400/latin,latin-ext/233/4/3/1/3|Noto Sans Devanagari/sans-serif/100,200,300,400,500,600,700,800,900/devanagari,latin,latin-ext/234/2/2/0/2|Righteous/display/400/latin,latin-ext/235/4/2/0/3|Prata/serif/400/cyrillic,cyrillic-ext,latin,vietnamese/236/1/3/0/0|Readex Pro/sans-serif/200,300,400,500,600,700/arabic,latin,latin-ext,vietnamese/237/3/3/0/2|Atkinson Hyperlegible/sans-serif/400,400i,700,700i/latin,latin-ext/238/3/1/4/2|Creepster/display/400/latin/239/4/0/3/4|Crimson Pro/serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/240/2/0/1/1|Alata/sans-serif/400/latin,latin-ext,vietnamese/241/3/1/4/2|Patua One/display/400/latin/242/4/1/0/0|Changa/sans-serif/200,300,400,500,600,700,800/arabic,latin,latin-ext/243/3/1/4/1|Kumbh Sans/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,math,symbols/244/1/2/4/2|Libre Caslon Text/serif/400,400i,700/latin,latin-ext/245/1/3/1/1|Sawarabi Mincho/serif/400/braille,japanese,latin,latin-ext/246/2/3/1/0|Shippori Mincho/serif/400,500,600,700,800/japanese,latin,latin-ext/247/0/3/2/2|Alumni Sans/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/248/3/4/0/1|Baskervville/serif/400,400i,500,500i,600,600i,700,700i/latin,latin-ext/249/0/2/2/2|Noto Sans Bengali/sans-serif/100,200,300,400,500,600,700,800,900/bengali,latin,latin-ext/252/2/2/0/2|Unna/serif/400,400i,700,700i/latin,latin-ext/253/1/0/1/0|Actor/sans-serif/400/latin/254/2/1/0/3|Sawarabi Gothic/sans-serif/400/cyrillic,japanese,latin,latin-ext,vietnamese/255/3/2/4/0|Special Elite/display/400/latin,latin-ext/256/3/3/4/4|Press Start 2P/display/400/cyrillic,cyrillic-ext,greek,latin,latin-ext/257/0/4/3/0|Libre Barcode 39/display/400/latin/258/3/3/3/2|News Cycle/sans-serif/400,700/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/259/1/0/4/2|Noticia Text/serif/400,400i,700,700i/latin,latin-ext,vietnamese/260/3/2/0/0|Young Serif/serif/400/latin,latin-ext/261/4/3/2/2|Gothic A1/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic,cyrillic-ext,greek,greek-ext,korean,latin,latin-ext,vietnamese/262/1/1/4/1|Tenor Sans/sans-serif/400/cyrillic,latin,latin-ext/263/1/3/0/3|Noto Naskh Arabic/serif/400,500,600,700/arabic,latin,latin-ext,math,symbols/264/3/3/1/1|Noto Sans Tamil/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,tamil/265/2/2/0/2|Viga/sans-serif/400/latin,latin-ext/266/4/1/4/0|Syne/sans-serif/400,500,600,700,800/greek,latin,latin-ext/267/3/1/0/3|Martel/serif/200,300,400,600,700,800,900/devanagari,latin,latin-ext/268/1/3/0/0|Courgette/handwriting/400/latin,latin-ext/269/3/1/2/3|Passion One/display/400,700,900/latin,latin-ext/270/4/0/3/0|Encode Sans Condensed/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/271/2/0/4/1|Cantarell/sans-serif/400,400i,700,700i/latin,latin-ext/272/1/2/4/2|League Gothic/sans-serif/400/latin,latin-ext,vietnamese/273/4/4/4/1|Bangers/display/400/latin,latin-ext,vietnamese/274/4/0/1/3|Literata/serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/275/3/3/2/2|Courier Prime/monospace/400,400i,700,700i/latin,latin-ext/276/1/4/2/3|Crete Round/serif/400,400i/latin,latin-ext/277/4/1/1/0|El Messiri/sans-serif/400,500,600,700/arabic,cyrillic,latin,latin-ext/278/2/1/0/2|Hammersmith One/sans-serif/400/latin,latin-ext/279/3/2/0/0|Kaushan Script/handwriting/400/latin,latin-ext/280/2/0/2/4|Chango/display/400/latin,latin-ext/281/4/4/1/3|PT Sans Caption/sans-serif/400,700/cyrillic,cyrillic-ext,latin,latin-ext/282/3/3/0/3|Comic Neue/handwriting/300,300i,400,400i,700,700i/latin/283/1/1/1/3|Old Standard TT/serif/400,400i,700/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/284/1/2/1/1|Francois One/sans-serif/400/latin,latin-ext,vietnamese/285/4/0/4/1|Sanchez/serif/400,400i/latin,latin-ext/286/3/3/1/0|Rammetto One/display/400/latin,latin-ext/287/4/4/0/3|Sacramento/handwriting/400/latin,latin-ext/289/0/0/3/4|Eater/display/400/latin,latin-ext/290/4/4/3/2|Philosopher/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/291/2/1/0/2|Nanum Gothic Coding/handwriting/400,700/korean,latin/292/1/2/1/1|Yantramanav/sans-serif/100,300,400,500,700,900/devanagari,latin,latin-ext/293/3/0/3/0|STIX Two Text/serif/400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/294/2/1/1/2|Italianno/handwriting/400/latin,latin-ext,vietnamese/295/0/4/3/4|Sofia Sans Condensed/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,latin,latin-ext/296/3/4/1/1|Allura/handwriting/400/latin,latin-ext,vietnamese/297/0/0/3/4|Aleo/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/298/3/2/2/0|Josefin Slab/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/latin/299/0/1/1/1|Sen/sans-serif/400,500,600,700,800/latin,latin-ext/300/1/3/0/2|Oxanium/display/200,300,400,500,600,700,800/latin,latin-ext/301/1/2/3/0|Patrick Hand/handwriting/400/latin,latin-ext,vietnamese/302/2/0/1/3|Ubuntu Condensed/sans-serif/400/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext/303/3/0/0/3|Commissioner/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/304/2/2/1/3|Gruppo/sans-serif/400/latin,latin-ext/305/0/2/1/3|IBM Plex Sans Condensed/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/cyrillic-ext,latin,latin-ext,vietnamese/306/2/0/4/1|Baloo 2/display/400,500,600,700,800/devanagari,latin,latin-ext,vietnamese/307/2/1/1/3|Quattrocento Sans/sans-serif/400,400i,700,700i/latin,latin-ext/308/1/1/0/3|Oleo Script/display/400,700/latin,latin-ext/309/4/0/1/3|Quattrocento/serif/400,700/latin,latin-ext/310/0/2/3/3|Libre Bodoni/serif/400,400i,500,500i,600,600i,700,700i/latin,latin-ext,vietnamese/311/1/2/1/1|Berkshire Swash/handwriting/400/latin,latin-ext/312/4/1/3/4|Amaranth/sans-serif/400,400i,700,700i/latin/313/4/1/1/3|Jura/sans-serif/300,400,500,600,700/cyrillic,cyrillic-ext,greek,greek-ext,kayah-li,latin,latin-ext,vietnamese/314/0/2/1/1|Vazirmatn/sans-serif/100,200,300,400,500,600,700,800,900/arabic,latin,latin-ext/315/3/1/0/2|Golos Text/sans-serif/400,500,600,700,800,900/cyrillic,cyrillic-ext,latin,latin-ext/316/3/3/4/2|Rokkitt/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/317/3/1/0/0|Mitr/sans-serif/200,300,400,500,600,700/latin,latin-ext,thai,vietnamese/318/4/3/1/2|Sorts Mill Goudy/serif/400,400i/latin,latin-ext/319/1/1/2/3|Paytone One/sans-serif/400/latin,latin-ext,vietnamese/320/4/3/4/1|Parisienne/handwriting/400/latin,latin-ext/321/0/1/3/4|Didact Gothic/sans-serif/400/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext/322/1/1/4/2|Krub/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext,thai,vietnamese/323/1/2/0/2|BIZ UDPGothic/sans-serif/400,700/cyrillic,greek-ext,japanese,latin,latin-ext/324/1/4/0/0|Rock Salt/handwriting/400/latin/325/1/4/3/4|Audiowide/display/400/latin,latin-ext/326/4/4/0/2|Playball/display/400/latin,latin-ext,vietnamese/327/3/0/3/4|Radio Canada/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i/canadian-aboriginal,latin,latin-ext,vietnamese/328/3/2/4/2|Fira Code/monospace/300,400,500,600,700/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,symbols2/329/0/4/4/2|M PLUS 1/sans-serif/100,200,300,400,500,600,700,800,900/japanese,latin,latin-ext,vietnamese/330/1/3/4/1|Concert One/display/400/latin,latin-ext/331/4/1/2/4|Alexandria/sans-serif/100,200,300,400,500,600,700,800,900/arabic,latin,latin-ext,vietnamese/332/4/3/4/2|Playfair Display SC/serif/400,400i,700,700i,900,900i/cyrillic,latin,latin-ext,vietnamese/333/1/3/2/2|Zen Old Mincho/serif/400,500,600,700,900/cyrillic,greek,japanese,latin,latin-ext/334/1/1/3/4|Quantico/sans-serif/400,400i,700,700i/latin/335/3/2/3/0|IBM Plex Sans JP/sans-serif/100,200,300,400,500,600,700/cyrillic,japanese,latin,latin-ext/336/1/2/4/0|VT323/monospace/400/latin,latin-ext,vietnamese/337/3/0/3/0|Lusitana/serif/400,700/latin/338/1/1/1/2|Kosugi Maru/sans-serif/400/cyrillic,japanese,latin,latin-ext/339/3/2/1/4|Noto Sans Mono/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/340/1/4/0/2|Gilda Display/serif/400/latin,latin-ext/341/0/2/2/3|Playfair/serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/342/2/1/2/3|Gloria Hallelujah/handwriting/400/latin,latin-ext/343/0/3/2/-1|Antonio/sans-serif/100,200,300,400,500,600,700/latin,latin-ext/344/4/0/0/1|Tangerine/handwriting/400,700/latin/345/0/4/2/4|Forum/display/400/cyrillic,cyrillic-ext,latin,latin-ext/346/0/0/2/3|Staatliches/display/400/latin,latin-ext/347/4/0/0/0|Monoton/display/400/latin,latin-ext/348/4/4/3/1|Saira Extra Condensed/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/349/3/4/4/2|Neuton/serif/200,300,400,400i,700,800/latin,latin-ext/350/4/0/1/0|Pathway Gothic One/sans-serif/400/latin,latin-ext/351/4/4/4/0|Biryani/sans-serif/200,300,400,600,700,800,900/devanagari,latin,latin-ext/352/2/3/3/0|Gelasio/serif/400,400i,500,500i,600,600i,700,700i/latin,latin-ext,vietnamese/353/3/2/2/3|PT Mono/monospace/400/cyrillic,cyrillic-ext,latin,latin-ext/354/1/4/0/2|Istok Web/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext/357/2/2/1/1|Architects Daughter/handwriting/400/latin,latin-ext/358/0/3/1/3|Poiret One/display/400/cyrillic,latin,latin-ext/359/0/1/3/2|Bai Jamjuree/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext,thai,vietnamese/360/1/2/0/0|Khand/sans-serif/300,400,500,600,700/devanagari,latin,latin-ext/361/3/0/3/0|Lexend Giga/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/362/1/4/0/2|Fugaz One/display/400/latin/363/4/3/0/0|Amita/handwriting/400,700/devanagari,latin,latin-ext/364/0/1/1/3|Cookie/handwriting/400/latin/365/2/4/2/4|Dela Gothic One/display/400/cyrillic,greek,japanese,latin,latin-ext,vietnamese/366/4/4/0/2|Homemade Apple/handwriting/400/latin/367/0/4/3/4|Noto Serif Bengali/serif/100,200,300,400,500,600,700,800,900/bengali,latin,latin-ext/369/3/3/1/2|Blinker/sans-serif/100,200,300,400,600,700,800,900/latin,latin-ext/370/3/0/4/1|Cinzel Decorative/display/400,700,900/latin,latin-ext/371/0/4/1/0|Yeseva One/display/400/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/373/4/3/1/0|Pinyon Script/handwriting/400/latin,latin-ext,vietnamese/374/0/0/3/4|Calistoga/display/400/latin,latin-ext,vietnamese/375/4/2/2/3|Alex Brush/handwriting/400/latin,latin-ext,vietnamese/376/1/0/3/3|Abhaya Libre/serif/400,500,600,700,800/latin,latin-ext,sinhala/378/2/0/1/0|Taviraj/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,thai,vietnamese/379/1/2/1/0|Delius/handwriting/400/latin/380/1/2/1/4|Alice/serif/400/cyrillic,cyrillic-ext,latin,latin-ext/381/2/1/2/4|Lustria/serif/400/latin/382/0/2/2/2|Petrona/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/383/1/1/1/1|Hind Guntur/sans-serif/300,400,500,600,700/latin,latin-ext,telugu/384/2/1/3/0|Mukta Malar/sans-serif/200,300,400,500,600,700,800/latin,latin-ext,tamil/385/3/1/0/2|Arsenal/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/386/1/0/4/1|Handlee/handwriting/400/latin/387/1/1/1/4|Reenie Beanie/handwriting/400/latin/388/0/0/3/4|Noto Sans Hebrew/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic-ext,greek-ext,hebrew,latin,latin-ext/389/2/2/0/2|Merienda/handwriting/300,400,500,600,700,800,900/latin,latin-ext,vietnamese/390/1/3/2/4|Monda/sans-serif/400,500,600,700/latin,latin-ext,vietnamese/391/2/2/4/1|Mada/sans-serif/200,300,400,500,600,700,800,900/arabic,latin,latin-ext/392/2/1/0/2|Ropa Sans/sans-serif/400,400i/latin,latin-ext/393/3/0/4/0|Share Tech Mono/monospace/400/latin/394/1/3/4/0|Noto Nastaliq Urdu/serif/400,500,600,700/arabic,latin,latin-ext/395/3/2/1/1|Tilt Warp/display/400/latin,latin-ext,vietnamese/397/4/2/1/4|Itim/handwriting/400/latin,latin-ext,thai,vietnamese/398/3/1/2/3|Faustina/serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext,vietnamese/399/3/1/1/0|Gabarito/display/400,500,600,700,800,900/latin,latin-ext/401/4/1/0/1|Volkhov/serif/400,400i,700,700i/latin/402/3/3/0/0|Belleza/sans-serif/400/latin,latin-ext/403/1/0/0/3|Sofia Sans Extra Condensed/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,latin,latin-ext/404/4/4/1/1|Squada One/display/400/latin/405/4/0/4/0|Bad Script/handwriting/400/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/406/0/0/2/3|Pridi/serif/200,300,400,500,600,700/latin,latin-ext,thai,vietnamese/407/4/2/0/0|Noto Sans HK/sans-serif/100,200,300,400,500,600,700,800,900/chinese-hongkong,cyrillic,latin,latin-ext,vietnamese/408/2/2/0/2|Unica One/display/400/latin,latin-ext,vietnamese/409/1/0/4/0|Sofia/handwriting/400/latin/410/0/2/2/3|Pangolin/handwriting/400/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/412/3/0/3/3|Anonymous Pro/monospace/400,400i,700,700i/cyrillic,greek,latin,latin-ext/413/1/3/0/2|Andada Pro/serif/400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext,vietnamese/414/1/2/2/1|Cormorant Infant/serif/300,300i,400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/415/0/0/2/3|Vidaloka/serif/400/latin/421/3/1/1/2|Syncopate/sans-serif/400,700/latin,latin-ext/422/0/4/0/3|Noto Sans Symbols/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,symbols/423/2/2/1/2|Cuprum/sans-serif/400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/424/3/0/4/2|Ubuntu Mono/monospace/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext/425/1/2/0/3|Hind Vadodara/sans-serif/300,400,500,600,700/gujarati,latin,latin-ext/426/2/1/3/0|Zeyada/handwriting/400/latin,latin-ext/427/0/0/3/4|Belanosima/sans-serif/400,600,700/latin,latin-ext/428/4/1/2/3|Afacad/sans-serif/400,400i,500,500i,600,600i,700,700i/cyrillic-ext,latin,latin-ext,math,symbols,vietnamese/430/2/0/4/2|Noto Serif Display/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/431/1/3/1/2|Varela/sans-serif/400/latin,latin-ext/432/3/3/3/0|Secular One/sans-serif/400/hebrew,latin,latin-ext/433/4/2/4/1|Wix Madefor Text/sans-serif/400,400i,500,500i,600,600i,700,700i,800,800i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/434/1/2/4/2|Eczar/serif/400,500,600,700,800/devanagari,greek,greek-ext,latin,latin-ext/435/3/1/2/1|Ultra/serif/400/latin,latin-ext/436/4/4/2/3|GFS Didot/serif/400/greek,greek-ext,latin,vietnamese/437/1/3/1/0|Akshar/sans-serif/300,400,500,600,700/devanagari,latin,latin-ext/438/4/0/1/0|Rochester/handwriting/400/latin/439/1/0/3/4|Goldman/display/400,700/latin,latin-ext,vietnamese/440/4/3/0/0|Wix Madefor Display/sans-serif/400,500,600,700,800/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/441/1/2/4/2|Fira Sans Extra Condensed/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/442/3/0/4/1|Mona Sans/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/443/2/2/1/2|Saira Semi Condensed/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/444/2/0/4/2|Gudea/sans-serif/400,400i,700/latin,latin-ext/445/1/1/3/1|Caveat Brush/handwriting/400/latin,latin-ext/446/4/0/3/1|Nanum Pen Script/handwriting/400/korean,latin/447/1/0/2/4|Carter One/display/400/latin/448/4/3/3/4|Michroma/sans-serif/400/latin,latin-ext/449/1/4/0/3|Cedarville Cursive/handwriting/400/latin/450/0/2/3/4|Fira Mono/monospace/400,500,700/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,symbols2/451/0/4/4/1|Bevan/serif/400,400i/latin,latin-ext,vietnamese/452/4/4/0/0|Pontano Sans/sans-serif/300,400,500,600,700/latin,latin-ext/453/2/1/4/2|Balsamiq Sans/display/400,400i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext/454/4/2/2/2|Reem Kufi/sans-serif/400,500,600,700/arabic,latin,latin-ext,vietnamese/455/2/1/4/2|Black Han Sans/sans-serif/400/korean,latin/456/4/4/4/0|Ruda/sans-serif/400,500,600,700,800,900/cyrillic,latin,latin-ext,vietnamese/457/2/1/0/3|Kaisei Decol/serif/400,500,700/cyrillic,japanese,latin,latin-ext/458/1/3/3/4|Nothing You Could Do/handwriting/400/latin/459/0/3/2/-1|Cabin Condensed/sans-serif/400,500,600,700/latin,latin-ext,vietnamese/460/3/0/4/1|Shrikhand/display/400/gujarati,latin,latin-ext/461/4/3/2/3|Red Rose/display/300,400,500,600,700/latin,latin-ext,vietnamese/462/3/3/1/3|Six Caps/sans-serif/400/latin,latin-ext/463/4/4/4/1|Londrina Solid/display/100,300,400,900/latin/464/4/0/2/4|Martel Sans/sans-serif/200,300,400,600,700,800,900/devanagari,latin,latin-ext/465/1/3/4/1|Georama/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/466/3/1/0/3|Julius Sans One/sans-serif/400/latin,latin-ext/467/0/4/3/0|Yrsa/serif/300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext,vietnamese/468/3/0/1/1|Arapey/serif/400,400i/latin/469/1/0/1/0|Tomorrow/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/470/2/3/3/0|Marck Script/handwriting/400/cyrillic,latin,latin-ext/471/0/1/1/3|Chewy/display/400/latin/472/4/0/2/4|Zen Kaku Gothic Antique/sans-serif/300,400,500,700,900/cyrillic,japanese,latin,latin-ext/474/0/1/4/2|IBM Plex Sans Thai/sans-serif/100,200,300,400,500,600,700/cyrillic-ext,latin,latin-ext,thai/475/2/1/0/2|Gochi Hand/handwriting/400/latin/476/3/0/3/4|Rye/display/400/latin,latin-ext/477/4/3/3/3|Khula/sans-serif/300,400,600,700,800/devanagari,latin,latin-ext/478/1/1/4/1|Leckerli One/handwriting/400/latin/479/4/3/2/3|Damion/handwriting/400/latin,latin-ext/480/3/0/3/3|Mr Dafoe/handwriting/400/latin,latin-ext/481/3/0/2/4|Cousine/monospace/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese/482/1/4/4/0|Shippori Mincho B1/serif/400,500,600,700,800/japanese,latin,latin-ext/483/0/3/2/2|Economica/sans-serif/400,400i,700,700i/latin,latin-ext/484/3/4/0/3|Potta One/display/400/japanese,latin,latin-ext,vietnamese/485/4/4/2/4|Ovo/serif/400/latin/486/1/1/2/3|Gloock/serif/400/cyrillic-ext,latin,latin-ext/487/4/2/1/1|Black Ops One/display/400/cyrillic-ext,latin,latin-ext,vietnamese/488/4/3/3/0|Nixie One/display/400/latin/489/0/3/2/1|Lalezar/sans-serif/400/arabic,latin,latin-ext,vietnamese/490/4/0/0/1|Lateef/serif/200,300,400,500,600,700,800/arabic,latin,latin-ext/491/3/-1/1/0|Murecho/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic,cyrillic-ext,greek,japanese,latin,latin-ext/492/3/1/0/3|Adamina/serif/400/latin/493/2/3/1/1|Boogaloo/display/400/latin/494/4/0/4/2|Reddit Sans/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/495/2/1/0/2|Anuphan/sans-serif/100,200,300,400,500,600,700/latin,latin-ext,thai,vietnamese/496/2/1/0/1|MuseoModerno/display/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/497/3/3/0/3|Racing Sans One/display/400/latin,latin-ext/498/4/1/0/3|Hachi Maru Pop/handwriting/400/cyrillic,japanese,latin,latin-ext/499/0/4/2/4|Pirata One/display/400/latin,latin-ext/500/4/0/1/1|Sarala/sans-serif/400,700/devanagari,latin,latin-ext/501/3/1/4/0|Averia Serif Libre/display/300,300i,400,400i,700,700i/latin/502/3/2/2/2|Yuji Mai/serif/400/cyrillic,japanese,latin,latin-ext/503/3/3/3/4|K2D/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext,thai,vietnamese/504/3/1/0/2|Lemonada/display/300,400,500,600,700/arabic,latin,latin-ext,vietnamese/505/3/4/2/4|Sansita/sans-serif/400,400i,700,700i,800,800i,900,900i/latin,latin-ext/506/4/0/4/2|Sriracha/handwriting/400/latin,latin-ext,thai,vietnamese/507/4/1/2/3|Besley/serif/400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/508/2/3/3/3|Niramit/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext,thai,vietnamese/509/2/1/0/2|Mrs Saint Delafield/handwriting/400/latin,latin-ext/510/0/4/2/3|Do Hyeon/sans-serif/400/korean,latin/512/4/1/0/1|BenchNine/sans-serif/300,400,700/latin,latin-ext/513/3/4/1/3|Basic/sans-serif/400/latin,latin-ext/514/4/1/1/3|Pragati Narrow/sans-serif/400,700/devanagari,latin,latin-ext/515/4/0/4/0|Baloo Da 2/display/400,500,600,700,800/bengali,latin,latin-ext,vietnamese/517/2/1/1/3|Fredericka the Great/display/400/latin,latin-ext/518/3/3/3/4|Jua/sans-serif/400/korean,latin/519/4/1/3/4|Anek Bangla/sans-serif/100,200,300,400,500,600,700,800/bengali,latin,latin-ext/520/3/0/0/0|Aclonica/sans-serif/400/latin,latin-ext/521/4/3/1/4|Bona Nova SC/serif/400,400i,700/cyrillic,cyrillic-ext,greek,hebrew,latin,latin-ext,vietnamese/522/0/1/1/2|Kreon/serif/300,400,500,600,700/latin,latin-ext/523/3/0/0/1|Aboreto/display/400/latin,latin-ext/524/0/4/4/0|Just Another Hand/handwriting/400/latin,latin-ext/525/3/4/3/4|Spinnaker/sans-serif/400/latin,latin-ext/526/1/3/0/0|Noto Sans Malayalam/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,malayalam/527/2/3/0/2|M PLUS 2/sans-serif/100,200,300,400,500,600,700,800,900/japanese,latin,latin-ext,vietnamese/528/1/3/4/1|Charm/handwriting/400,700/latin,latin-ext,thai,vietnamese/529/0/0/2/3|Bowlby One SC/display/400/latin,latin-ext/530/4/4/2/3|Kufam/sans-serif/400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/arabic,latin,latin-ext,vietnamese/531/2/3/0/2|Yatra One/display/400/devanagari,latin,latin-ext/533/3/3/0/2|Electrolize/sans-serif/400/latin/534/1/2/1/0|Mandali/sans-serif/400/latin,telugu/535/1/2/1/3|Coda/display/400,800/latin,latin-ext/536/3/1/1/4|Glory/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext,vietnamese/537/1/0/2/4|Covered By Your Grace/handwriting/400/latin,latin-ext/538/0/0/2/4|Karma/serif/300,400,500,600,700/devanagari,latin,latin-ext/540/1/1/0/1|Palanquin Dark/sans-serif/400,500,600,700/devanagari,latin,latin-ext/541/4/1/3/1|Kiwi Maru/serif/300,400,500/cyrillic,japanese,latin,latin-ext/542/2/3/3/3|Italiana/sans-serif/400/latin/543/0/1/4/1|Marcellus SC/serif/400/latin,latin-ext/544/1/2/2/3|Judson/serif/400,400i,700/latin,latin-ext,vietnamese/545/3/1/0/1|Alegreya Sans SC/sans-serif/100,100i,300,300i,400,400i,500,500i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/546/2/0/3/0|Rufina/serif/400,700/latin,latin-ext/547/1/2/0/0|Nova Square/display/400/latin,latin-ext/548/3/3/4/0|Livvic/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,900,900i/latin,latin-ext,vietnamese/549/1/1/4/2|Host Grotesk/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext/550/2/2/1/2|Alef/sans-serif/400,700/hebrew,latin/551/2/2/1/3|Inria Serif/serif/300,300i,400,400i,700,700i/latin,latin-ext/552/1/1/1/0|Andika/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/553/1/2/0/3|Neucha/handwriting/400/cyrillic,latin/554/1/0/1/3|Gantari/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/555/2/2/4/2|Palanquin/sans-serif/100,200,300,400,500,600,700/devanagari,latin,latin-ext/556/1/1/4/1|Protest Revolution/display/400/latin,latin-ext,math,symbols,vietnamese/557/4/1/3/3|Grandstander/display/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/558/3/2/2/4|Funnel Sans/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext/559/2/2/1/2|Laila/serif/300,400,500,600,700/devanagari,latin,latin-ext/560/1/2/0/3|Days One/sans-serif/400/cyrillic,latin/561/4/4/0/2|La Belle Aurore/handwriting/400/latin,latin-ext/562/0/1/2/4|Cormorant Upright/serif/300,400,500,600,700/latin,latin-ext,vietnamese/563/0/0/2/3|Allerta Stencil/sans-serif/400/latin/564/3/3/0/2|Bellota Text/display/300,300i,400,400i,700,700i/cyrillic,latin,latin-ext,vietnamese/565/0/1/0/1|Shadows Into Light Two/handwriting/400/latin,latin-ext/566/0/1/2/4|Armata/sans-serif/400/latin,latin-ext/567/1/3/0/1|Aldrich/sans-serif/400/latin/568/3/3/4/0|Fahkwang/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext,thai,vietnamese/569/1/3/4/1|Rakkas/display/400/arabic,latin,latin-ext/570/4/0/0/0|Limelight/display/400/latin,latin-ext/571/4/3/0/1|Sofia Sans Semi Condensed/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,latin,latin-ext/572/3/0/1/1|Ms Madi/handwriting/400/latin,latin-ext,vietnamese/573/0/0/3/4|Grand Hotel/handwriting/400/latin,latin-ext/574/3/0/3/4|Rozha One/serif/400/devanagari,latin,latin-ext/575/3/2/0/1|Herr Von Muellerhoff/handwriting/400/latin,latin-ext/576/0/4/2/3|Chonburi/display/400/latin,latin-ext,thai,vietnamese/577/4/4/1/1|Castoro/serif/400,400i/latin,latin-ext/578/3/2/2/3|Tiro Bangla/serif/400,400i/bengali,latin,latin-ext/579/3/2/2/3|Faster One/display/400/latin,latin-ext/580/4/4/2/0|Spline Sans/sans-serif/300,400,500,600,700/latin,latin-ext/581/3/1/0/2|Proza Libre/sans-serif/400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext/582/1/3/1/3|Averia Libre/display/300,300i,400,400i,700,700i/latin/583/3/1/2/2|Sevillana/display/400/latin,latin-ext/584/0/0/3/4|BIZ UDGothic/sans-serif/400,700/cyrillic,greek-ext,japanese,latin,latin-ext/586/1/2/4/0|Darker Grotesque/sans-serif/300,400,500,600,700,800,900/latin,latin-ext,vietnamese/587/0/0/0/2|Candal/sans-serif/400/latin/588/4/4/1/4|Familjen Grotesk/sans-serif/400,400i,500,500i,600,600i,700,700i/latin,latin-ext,vietnamese/589/4/1/4/1|Caprasimo/display/400/latin,latin-ext/590/4/3/2/4|Lexend Exa/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/591/1/4/0/2|Corben/display/400,700/latin,latin-ext/592/3/3/2/3|Kameron/serif/400,500,600,700/latin,latin-ext/593/3/1/2/3|Radley/serif/400,400i/latin,latin-ext/594/3/1/2/3|Nobile/sans-serif/400,400i,500,500i,700,700i/cyrillic,latin,latin-ext/595/2/3/1/4|Anek Latin/sans-serif/100,200,300,400,500,600,700,800/latin,latin-ext,vietnamese/596/3/0/0/0|Krona One/sans-serif/400/latin,latin-ext/597/4/4/0/3|Overpass Mono/monospace/300,400,500,600,700/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/598/0/4/0/2|Pattaya/sans-serif/400/cyrillic,latin,latin-ext,thai,vietnamese/599/4/0/2/2|Fondamento/handwriting/400,400i/latin,latin-ext/601/1/1/2/3|Fustat/sans-serif/200,300,400,500,600,700,800/arabic,latin,latin-ext/602/2/1/0/1|Brygada 1918/serif/400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/603/1/2/1/1|UnifrakturMaguntia/display/400/latin/604/4/1/3/3|Nanum Brush Script/handwriting/400/korean,latin/605/0/4/3/4|Mate/serif/400,400i/latin,latin-ext/606/1/1/1/2|Caudex/serif/400,400i,700,700i/greek,greek-ext,latin,latin-ext,runic,vietnamese/607/1/2/2/1|Cabin Sketch/display/400,700/latin/608/3/1/0/2|Stardos Stencil/display/400,700/latin/609/3/1/2/1|Sometype Mono/monospace/400,400i,500,500i,600,600i,700,700i/latin,latin-ext/610/0/3/4/0|Alatsi/sans-serif/400/cyrillic-ext,latin,latin-ext,vietnamese/611/4/1/4/1|Sintony/sans-serif/400,700/latin,latin-ext/612/2/3/3/1|Saira Stencil One/display/400/latin,latin-ext,vietnamese/613/4/2/0/0|Metrophobic/sans-serif/400/latin,latin-ext,vietnamese/615/1/2/4/2|Podkova/serif/400,500,600,700,800/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/616/3/1/0/0|Suez One/serif/400/hebrew,latin,latin-ext/617/4/3/1/0|Arbutus Slab/serif/400/latin,latin-ext/619/3/3/1/2|Fjord One/serif/400/latin/620/1/1/2/3|Glegoo/serif/400,700/devanagari,latin,latin-ext/621/1/3/0/1|Major Mono Display/monospace/400/latin,latin-ext,vietnamese/622/0/4/3/0|Kosugi/sans-serif/400/cyrillic,japanese,latin,latin-ext/623/2/2/0/3|PT Serif Caption/serif/400,400i/cyrillic,cyrillic-ext,latin,latin-ext/624/3/3/1/1|Koulen/display/400/khmer,latin/625/4/0/0/0|Cutive Mono/monospace/400/latin,latin-ext/626/0/4/2/2|SUSE/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/627/2/1/0/1|Silkscreen/display/400,700/latin,latin-ext/628/1/4/3/0|Amiko/sans-serif/400,600,700/devanagari,latin,latin-ext/629/1/3/4/1|Oranienbaum/serif/400/cyrillic,cyrillic-ext,latin,latin-ext/630/1/0/1/2|Ma Shan Zheng/handwriting/400/chinese-simplified,latin/631/3/4/2/3|Athiti/sans-serif/200,300,400,500,600,700/latin,latin-ext,thai,vietnamese/632/1/1/4/0|Mali/handwriting/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext,thai,vietnamese/633/0/3/1/3|Rampart One/display/400/cyrillic,japanese,latin,latin-ext/634/3/3/2/1|Bellefair/serif/400/hebrew,latin,latin-ext/635/0/0/1/3|Vina Sans/display/400/latin,latin-ext,vietnamese/636/4/4/-1/0|Klee One/handwriting/400,600/cyrillic,greek-ext,japanese,latin,latin-ext/637/0/3/2/3|Parkinsans/sans-serif/300,400,500,600,700,800/latin,latin-ext/638/2/2/1/2|Honk/display/400/latin,latin-ext,math,symbols,vietnamese/639/1/1/0/4|Gowun Batang/serif/400,700/korean,latin,latin-ext,vietnamese/640/0/1/2/3|RocknRoll One/sans-serif/400/japanese,latin,latin-ext/641/4/3/0/2|Cantata One/serif/400/latin,latin-ext/642/1/3/0/0|Graduate/serif/400/latin/643/1/4/3/0|Libre Caslon Display/serif/400/latin,latin-ext/644/0/0/1/0|Monsieur La Doulaise/handwriting/400/latin,latin-ext/645/0/0/3/3|Mochiy Pop One/sans-serif/400/japanese,latin/646/4/4/1/4|Share/sans-serif/400,400i,700,700i/latin,latin-ext/647/3/0/0/3|Annie Use Your Telescope/handwriting/400/latin,latin-ext/648/0/0/2/4|ADLaM Display/display/400/adlam,latin,latin-ext/649/4/3/2/3|REM/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/650/3/3/0/1|Oooh Baby/handwriting/400/latin,latin-ext,vietnamese/651/0/0/2/3|Radio Canada Big/sans-serif/400,400i,500,500i,600,600i,700,700i/latin,latin-ext/652/4/1/4/1|Atkinson Hyperlegible Next/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext/653/2/2/1/2|Petit Formal Script/handwriting/400/latin,latin-ext/654/0/4/3/4|Hepta Slab/serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/655/1/4/1/0|IBM Plex Sans KR/sans-serif/100,200,300,400,500,600,700/korean,latin,latin-ext/656/2/1/0/2|Norican/handwriting/400/latin,latin-ext/657/4/0/3/4|DotGothic16/sans-serif/400/cyrillic,japanese,latin,latin-ext/658/1/2/0/0|Kristi/handwriting/400/latin/659/1/4/2/2|Croissant One/display/400/latin,latin-ext/660/3/4/0/3|Alegreya SC/serif/400,400i,500,500i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/661/3/1/2/2|Jockey One/sans-serif/400/latin,latin-ext/662/4/0/3/0|Yesteryear/handwriting/400/latin,latin-ext/663/3/0/3/4|Trirong/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,thai,vietnamese/664/1/3/0/0|Geo/sans-serif/400,400i/latin/665/2/0/3/0|Knewave/display/400/latin,latin-ext/666/4/1/2/3|Zalando Sans Expanded/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/667/2/2/1/2|Arizonia/handwriting/400/latin,latin-ext,vietnamese/668/1/0/3/4|Markazi Text/serif/400,500,600,700/arabic,latin,latin-ext,vietnamese/669/4/0/1/0|Goudy Bookletter 1911/serif/400/latin/670/1/0/3/4|Waiting for the Sunrise/handwriting/400/latin,latin-ext/671/0/0/2/4|Dongle/sans-serif/300,400,700/korean,latin,latin-ext,vietnamese/672/4/4/1/3|Licorice/handwriting/400/latin,latin-ext,vietnamese/674/0/4/3/4|Sigmar One/display/400/latin,latin-ext,vietnamese/675/4/4/3/0|Coming Soon/handwriting/400/latin/676/0/2/3/4|Love Ya Like A Sister/display/400/latin,latin-ext/677/3/1/1/0|Hina Mincho/serif/400/cyrillic,japanese,latin,latin-ext,vietnamese/678/0/0/3/3|Big Shoulders/display/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/679/3/3/3/2|Azeret Mono/monospace/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/680/1/4/4/1|Barriecito/display/400/latin,latin-ext,vietnamese/681/4/1/2/2|Antic Didone/serif/400/latin/682/0/1/1/0|Enriqueta/serif/400,500,600,700/latin,latin-ext/683/2/1/1/0|Wallpoet/display/400/latin/684/4/4/4/0|Niconne/handwriting/400/latin,latin-ext/685/2/0/2/4|Schoolbell/handwriting/400/latin/686/0/0/3/4|Halant/serif/300,400,500,600,700/devanagari,latin,latin-ext/687/1/1/1/2|Caladea/serif/400,400i,700,700i/latin,latin-ext/688/3/0/1/1|Allison/handwriting/400/latin,latin-ext,vietnamese/689/0/4/3/3|Marmelad/sans-serif/400/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/690/2/2/1/3|Antic/sans-serif/400/latin/691/0/1/4/0|Contrail One/display/400/latin/692/4/0/1/2|Allerta/sans-serif/400/latin/693/3/3/0/3|Irish Grover/display/400/latin/694/4/2/3/4|Flow Circular/display/400/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/696/3/3/3/2|Cormorant SC/serif/300,400,500,600,700/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/697/0/1/2/3|Fragment Mono/monospace/400,400i/cyrillic-ext,latin,latin-ext/698/1/4/4/1|Zen Antique/serif/400/cyrillic,greek,japanese,latin,latin-ext/699/3/3/3/4|Yusei Magic/sans-serif/400/japanese,latin,latin-ext/700/3/2/1/3|Pixelify Sans/display/400,500,600,700/cyrillic,latin,latin-ext/701/4/2/3/0|Montagu Slab/serif/100,200,300,400,500,600,700/latin,latin-ext,vietnamese/702/3/3/1/0|Calligraffitti/handwriting/400/latin/703/0/0/3/4|Baloo Bhaijaan 2/display/400,500,600,700,800/arabic,latin,latin-ext,vietnamese/704/2/1/1/3|Hahmlet/serif/100,200,300,400,500,600,700,800,900/korean,latin,latin-ext,vietnamese/705/1/3/2/0|Overlock/display/400,400i,700,700i,900,900i/latin,latin-ext/706/1/0/0/3|Bayon/sans-serif/400/khmer,latin/708/4/0/0/0|Ubuntu Sans/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext/709/1/1/0/3|Bentham/serif/400/latin,latin-ext/710/1/1/2/2|Bungee Spice/display/400/latin,latin-ext,vietnamese/711/4/4/1/0|Rancho/handwriting/400/latin/712/3/4/3/4|Style Script/handwriting/400/latin,latin-ext,vietnamese/713/1/0/3/4|Kantumruy Pro/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/khmer,latin,latin-ext/714/1/3/0/2|Sniglet/display/400,800/latin,latin-ext/716/3/1/2/4|Telex/sans-serif/400/latin,latin-ext/718/3/2/3/0|Spectral SC/serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/719/2/4/0/0|Ysabeau Office/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,latin,latin-ext,math,symbols,vietnamese/720/0/1/0/2|IM Fell English/serif/400,400i/latin/721/2/1/4/4|Maitree/serif/200,300,400,500,600,700/latin,latin-ext,thai,vietnamese/722/1/2/1/1|Uncial Antiqua/display/400/latin,latin-ext/723/1/4/2/4|Funnel Display/display/300,400,500,600,700,800/latin,latin-ext/724/3/3/3/2|Grenze Gotisch/display/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/725/4/0/2/3|Prosto One/display/400/cyrillic,latin,latin-ext/726/4/4/4/2|BioRhyme/serif/200,300,400,500,600,700,800/latin,latin-ext/727/3/4/2/2|ZCOOL XiaoWei/sans-serif/400/chinese-simplified,latin/728/2/1/0/1|Cormorant Unicase/serif/300,400,500,600,700/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/729/0/1/2/3|Libre Barcode 128/display/400/latin/730/3/3/3/2|Turret Road/display/200,300,400,500,700,800/latin,latin-ext/731/0/3/3/0|Average Sans/sans-serif/400/latin,latin-ext/732/2/0/3/0|Cairo Play/sans-serif/200,300,400,500,600,700,800,900/arabic,latin,latin-ext/733/2/1/0/2|Tilt Neon/display/400/latin,latin-ext,vietnamese/735/3/1/3/4|DynaPuff/display/400,500,600,700/cyrillic-ext,latin,latin-ext/736/4/3/2/4|AR One Sans/sans-serif/400,500,600,700/latin,latin-ext,vietnamese/737/2/2/0/1|Oxygen Mono/monospace/400/latin,latin-ext/738/0/4/4/1|Dawning of a New Day/handwriting/400/latin/739/0/0/2/3|Ibarra Real Nova/serif/400,400i,500,500i,600,600i,700,700i/latin,latin-ext/740/0/1/2/2|Bowlby One/display/400/latin/741/4/4/2/0|Bungee Inline/display/400/latin,latin-ext,vietnamese/742/4/4/2/0|Rosario/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext,vietnamese/743/3/1/0/3|Pathway Extreme/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/744/2/3/0/0|Gabriela/serif/400/cyrillic,cyrillic-ext,latin,latin-ext/745/2/3/2/3|Seaweed Script/display/400/latin,latin-ext/746/1/0/3/4|Recursive/sans-serif/300,400,500,600,700,800,900/cyrillic-ext,latin,latin-ext,vietnamese/747/2/3/2/4|BIZ UDPMincho/serif/400,700/cyrillic,greek-ext,japanese,latin,latin-ext/748/1/4/1/0|Carlito/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/749/3/0/1/3|Agbalumo/display/400/cyrillic-ext,ethiopic,latin,latin-ext,vietnamese/750/4/2/2/4|Macondo/display/400/latin/751/1/1/1/4|Lexend Peta/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/752/1/4/0/2|Encode Sans Expanded/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/753/1/3/4/1|Della Respira/serif/400/latin/754/1/2/2/3|IM Fell English SC/serif/400/latin/755/1/1/0/4|Noto Sans Sinhala/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,sinhala/757/1/3/0/2|IM Fell DW Pica/serif/400,400i/latin/758/2/1/0/4|Mountains of Christmas/display/400,700/latin/759/0/0/4/3|Tektur/display/400,500,600,700,800,900/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/760/3/3/3/0|Kurale/serif/400/cyrillic,cyrillic-ext,devanagari,latin,latin-ext/761/2/1/2/2|Chivo Mono/monospace/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/762/2/4/0/2|Zen Dots/display/400/latin,latin-ext/763/4/4/3/0|Fanwood Text/serif/400,400i/latin,latin-ext/764/1/0/3/3|Chelsea Market/display/400/latin,latin-ext/765/4/3/1/4|Baloo Thambi 2/display/400,500,600,700,800/latin,latin-ext,tamil,vietnamese/766/2/1/1/3|IBM Plex Sans Hebrew/sans-serif/100,200,300,400,500,600,700/cyrillic-ext,hebrew,latin,latin-ext/767/2/1/0/2|Bubblegum Sans/display/400/latin,latin-ext/768/4/0/1/3|Monomaniac One/sans-serif/400/japanese,latin,latin-ext/769/4/0/1/1|Fresca/sans-serif/400/latin,latin-ext/770/3/0/4/2|Qwitcher Grypen/handwriting/400,700/latin,latin-ext,vietnamese/771/0/4/3/3|Agdasima/sans-serif/400,700/latin,latin-ext/772/3/4/0/1|Average/serif/400/latin,latin-ext/773/1/1/2/4|Marvel/sans-serif/400,400i,700,700i/latin/774/1/0/1/2|Meddon/handwriting/400/latin,latin-ext/775/0/4/3/4|Kaisei Opti/serif/400,500,700/cyrillic,japanese,latin,latin-ext/776/1/3/3/4|Syne Mono/monospace/400/latin,latin-ext/777/1/3/4/0|Copse/serif/400/latin/778/3/2/2/1|Afacad Flux/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/779/2/2/1/2|Anton SC/sans-serif/400/latin,latin-ext,vietnamese/780/4/0/4/0|Magra/sans-serif/400,700/latin,latin-ext/781/3/0/4/1|Noto Serif Hebrew/serif/100,200,300,400,500,600,700,800,900/hebrew,latin,latin-ext/782/3/3/1/2|Trocchi/serif/400/latin,latin-ext/783/4/3/1/1|Sansita Swashed/display/300,400,500,600,700,800,900/latin,latin-ext,vietnamese/784/4/1/2/4|Quando/serif/400/latin,latin-ext/785/3/4/2/3|Hanuman/serif/100,200,300,400,500,600,700,800,900/khmer,latin/786/3/3/0/0|Carrois Gothic/sans-serif/400/latin/787/2/1/0/3|Mouse Memoirs/sans-serif/400/latin,latin-ext/788/4/4/2/4|Alike/serif/400/latin,latin-ext,math,symbols/789/3/2/2/3|Amarante/display/400/latin,latin-ext/790/3/1/1/2|Mallanna/sans-serif/400/latin,telugu/792/1/0/1/2|Corinthia/handwriting/400,700/latin,latin-ext,vietnamese/794/0/4/3/3|Cherry Bomb One/display/400/japanese,latin,latin-ext,vietnamese/795/4/2/1/4|Noto Serif Devanagari/serif/100,200,300,400,500,600,700,800,900/devanagari,latin,latin-ext/796/3/3/1/2|Noto Sans Kannada/sans-serif/100,200,300,400,500,600,700,800,900/kannada,latin,latin-ext/797/2/2/0/2|Rasa/serif/300,300i,400,400i,500,500i,600,600i,700,700i/gujarati,latin,latin-ext,vietnamese/798/3/0/1/1|Edu SA Beginner/handwriting/400,500,600,700/latin/799/0/0/1/3|Meie Script/handwriting/400/latin,latin-ext/800/0/3/3/4|Quintessential/handwriting/400/latin,latin-ext/801/0/0/3/4|KoHo/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext,thai,vietnamese/802/1/1/0/1|Encode Sans Semi Condensed/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/803/1/0/4/1|Inria Sans/sans-serif/300,300i,400,400i,700,700i/latin,latin-ext/804/2/1/4/0|Zain/sans-serif/200,300,300i,400,400i,700,800,900/arabic,latin/805/3/0/0/2|Jersey 10/display/400/latin,latin-ext/806/3/3/3/2|Charis SIL/serif/400,400i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/807/3/2/1/1|Buenard/serif/400,500,600,700/latin,latin-ext/808/1/1/1/1|Baloo Paaji 2/display/400,500,600,700,800/gurmukhi,latin,latin-ext,vietnamese/809/2/1/1/3|Lekton/monospace/400,400i,700/latin,latin-ext/810/0/2/3/0|Jaldi/sans-serif/400,700/devanagari,latin,latin-ext/811/3/0/1/2|Scada/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext/812/3/1/0/0|Walter Turncoat/handwriting/400/latin/813/3/2/0/4|ZCOOL KuaiLe/sans-serif/400/chinese-simplified,latin/814/2/3/3/0|Slabo 13px/serif/400/latin,latin-ext/815/2/2/0/0|Birthstone/handwriting/400/latin,latin-ext,vietnamese/816/1/4/3/4|WindSong/handwriting/400,500/latin,latin-ext,vietnamese/817/0/4/3/4|Cambay/sans-serif/400,400i,700,700i/devanagari,latin,latin-ext/818/1/1/4/0|Germania One/display/400/latin/819/4/0/0/3|Gotu/sans-serif/400/devanagari,latin,latin-ext,vietnamese/820/0/3/1/4|Baloo Chettan 2/display/400,500,600,700,800/latin,latin-ext,malayalam,vietnamese/821/2/1/1/3|Asul/serif/400,700/latin/822/3/1/0/1|MedievalSharp/display/400/latin,latin-ext/823/1/2/2/3|Rambla/sans-serif/400,400i,700,700i/latin,latin-ext/824/3/0/3/1|Libre Barcode 39 Text/display/400/latin/825/3/3/3/2|Delius Unicase/handwriting/400,700/latin/826/1/4/1/4|Ruslan Display/display/400/cyrillic,latin,latin-ext,math,symbols/827/4/4/0/2|Bungee Shade/display/400/latin,latin-ext,vietnamese/828/4/4/3/0|Kadwa/serif/400,700/devanagari,latin/829/3/3/0/0|Rouge Script/handwriting/400/latin/830/0/4/2/3|Fauna One/serif/400/latin,latin-ext/831/1/3/0/0|Mina/sans-serif/400,700/bengali,latin,latin-ext/832/1/2/0/3|Anek Devanagari/sans-serif/100,200,300,400,500,600,700,800/devanagari,latin,latin-ext/833/3/1/0/0|Metamorphous/display/400/latin,latin-ext/834/1/4/2/1|Allan/display/400,700/latin,latin-ext/835/4/4/1/2|Lexend Zetta/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/836/0/4/0/2|Poetsen One/display/400/latin,latin-ext/838/4/2/2/4|Happy Monkey/display/400/latin,latin-ext/839/1/3/1/3|Hurricane/handwriting/400/latin,latin-ext,vietnamese/840/0/4/3/4|Julee/handwriting/400/latin,latin-ext/842/1/0/1/3|Sarina/display/400/latin,latin-ext/843/4/4/3/3|Over the Rainbow/handwriting/400/latin,latin-ext/844/0/3/2/4|Piazzolla/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/845/1/2/1/0|Megrim/display/400/latin,latin-ext/846/0/2/3/1|Vast Shadow/serif/400/latin/847/4/4/3/1|Aguafina Script/handwriting/400/latin,latin-ext/848/1/4/2/3|Noto Emoji/sans-serif/300,400,500,600,700/emoji/849/0/4/3/0|Sue Ellen Francisco/handwriting/400/latin/850/0/4/1/0|Anybody/display/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/851/3/3/4/0|Lacquer/display/400/latin/852/1/3/0/3|Coustard/serif/400,900/latin/853/4/3/3/4|Miriam Libre/sans-serif/400,500,600,700/hebrew,latin,latin-ext/854/2/2/1/2|Manjari/sans-serif/100,400,700/latin,latin-ext,malayalam/855/1/1/1/3|Original Surfer/display/400/latin,latin-ext/856/3/3/2/4|Inknut Antiqua/serif/300,400,500,600,700,800,900/devanagari,latin,latin-ext/857/2/4/0/0|Nova Mono/monospace/400/greek,latin,latin-ext/858/0/3/0/0|Playpen Sans/handwriting/100,200,300,400,500,600,700,800/cyrillic,cyrillic-ext,emoji,greek,latin,latin-ext,math,vietnamese/859/1/3/2/4|Finger Paint/display/400/latin/860/1/3/3/3|Viaoda Libre/display/400/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/861/0/0/2/2|Encode Sans Semi Expanded/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/862/1/2/4/1|Coiny/display/400/latin,latin-ext,tamil,vietnamese/863/4/3/1/4|B612 Mono/monospace/400,400i,700,700i/latin/864/0/4/1/3|Vibur/handwriting/400/latin/865/1/0/2/1|Platypi/serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext,vietnamese/866/3/3/1/0|Whisper/handwriting/400/latin,latin-ext,vietnamese/867/0/0/3/2|Voltaire/sans-serif/400/latin,latin-ext,vietnamese/868/3/0/4/1|Bigshot One/display/400/latin/869/4/1/2/2|Ephesis/handwriting/400/latin,latin-ext,vietnamese/870/0/0/3/2|Slackey/display/400/latin/871/4/4/2/4|Gurajada/sans-serif/400/latin,latin-ext,telugu/873/4/4/4/0|Capriola/sans-serif/400/latin,latin-ext/874/3/3/2/2|Balthazar/serif/400/latin/875/3/0/0/0|Xanh Mono/monospace/400,400i/latin,latin-ext,vietnamese/876/0/2/1/0|Qahiri/sans-serif/400/arabic,latin/877/2/4/4/1|Noto Sans Lao Looped/sans-serif/100,200,300,400,500,600,700,800,900/lao,latin,latin-ext/878/2/2/0/2|Molengo/sans-serif/400/latin,latin-ext/879/1/1/4/0|Gentium Plus/serif/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/880/1/0/2/3|Zen Kurenaido/sans-serif/400/cyrillic,greek,japanese,latin,latin-ext/881/0/0/1/3|Cutive/serif/400/latin,latin-ext/882/3/4/2/3|Aref Ruqaa/serif/400,700/arabic,latin,latin-ext/883/2/1/2/3|Puritan/sans-serif/400,400i,700,700i/latin/884/2/1/4/0|Kalnia/serif/100,200,300,400,500,600,700/latin,latin-ext,math/885/1/3/1/3|Goblin One/display/400/latin/886/4/4/1/3|David Libre/serif/400,500,700/hebrew,latin,latin-ext,math,symbols,vietnamese/888/1/0/1/3|Sunflower/sans-serif/300,500,700/korean/889/2/1/4/2|Fontdiner Swanky/display/400/latin/890/3/4/1/3|Supermercado One/display/400/latin,latin-ext/891/4/0/2/2|Cal Sans/sans-serif/400/latin,latin-ext,vietnamese/892/2/2/1/2|Truculenta/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/893/3/0/2/4|Iceland/display/400/latin/894/1/0/3/0|Noto Serif Khojki/serif/400,500,600,700/khojki,latin,latin-ext/895/3/3/1/1|Zen Antique Soft/serif/400/cyrillic,greek,japanese,latin,latin-ext/896/3/3/3/4|Expletus Sans/display/400,400i,500,500i,600,600i,700,700i/latin,latin-ext/897/2/2/0/3|Noto Sans Myanmar/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,myanmar/899/0/3/3/0|Tenali Ramakrishna/sans-serif/400/latin,telugu/900/3/0/0/0|Oleo Script Swash Caps/display/400,700/latin,latin-ext/901/4/0/2/3|Freeman/display/400/latin,latin-ext,vietnamese/902/4/0/4/2|Mansalva/handwriting/400/greek,latin,latin-ext,vietnamese/903/1/1/3/3|Qwigley/handwriting/400/latin,latin-ext,vietnamese/904/0/4/2/2|Brawler/serif/400,700/latin/905/3/3/0/1|Jomhuria/display/400/latin,latin-ext/906/4/4/0/1|Baloo Tamma 2/display/400,500,600,700,800/kannada,latin,latin-ext,vietnamese/907/1/1/1/3|Cambo/serif/400/latin,latin-ext/908/3/2/0/1|Poller One/display/400/latin/909/4/4/0/3|Esteban/serif/400/latin,latin-ext/910/1/1/2/3|Modak/display/400/devanagari,latin,latin-ext/911/4/2/1/2|Anaheim/sans-serif/400,500,600,700,800/latin,latin-ext,vietnamese/912/1/0/0/1|Fuzzy Bubbles/handwriting/400,700/latin,latin-ext,vietnamese/913/0/3/2/4|Stick No Bills/sans-serif/200,300,400,500,600,700,800/latin,latin-ext,sinhala/914/3/0/0/2|Mukta Vaani/sans-serif/200,300,400,500,600,700,800/gujarati,latin,latin-ext/915/3/0/0/2|Noto Sans Khmer/sans-serif/100,200,300,400,500,600,700,800,900/khmer,latin,latin-ext/916/2/2/0/2|Monofett/monospace/400/latin,latin-ext/918/4/2/1/0|Kodchasan/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext,thai,vietnamese/919/0/3/1/3|Arya/sans-serif/400,700/devanagari,latin,latin-ext/920/3/0/4/0|Jaro/sans-serif/400/latin,latin-ext,vietnamese/921/4/0/1/0|Battambang/display/100,300,400,700,900/khmer,latin/922/3/3/0/0|Kaisei Tokumin/serif/400,500,700,800/cyrillic,japanese,latin,latin-ext/924/1/3/3/4|Libre Barcode 39 Extended Text/display/400/latin/925/3/3/3/2|Gamja Flower/handwriting/400/korean,latin/926/3/0/2/4|Hedvig Letters Serif/serif/400/latin,latin-ext,math,symbols/927/1/3/1/1|Yuji Syuku/serif/400/cyrillic,japanese,latin,latin-ext/928/0/3/3/4|Freehand/display/400/khmer,latin/929/1/0/0/2|Odibee Sans/display/400/latin/930/4/4/4/0|Zalando Sans/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/931/2/2/1/2|Meow Script/handwriting/400/latin,latin-ext,vietnamese/932/0/0/3/4|Montez/handwriting/400/latin,latin-ext/933/0/4/3/4|Oregano/display/400,400i/latin,latin-ext/934/1/0/3/4|Aladin/display/400/latin,latin-ext/935/4/0/2/3|Give You Glory/handwriting/400/latin,latin-ext/936/0/3/2/-1|Rubik Dirt/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/937/4/3/3/0|TikTok Sans/sans-serif/300,400,500,600,700,800,900/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/938/2/2/1/2|Emilys Candy/display/400/latin,latin-ext/940/3/1/2/3|Hi Melody/handwriting/400/korean,latin/941/1/-1/2/4|Iceberg/display/400/latin/942/3/0/3/0|Kranky/display/400/latin/943/0/2/2/4|MonteCarlo/handwriting/400/latin,latin-ext,vietnamese/944/0/0/3/4|Habibi/serif/400/latin,latin-ext/945/1/3/0/0|Orelega One/display/400/cyrillic,cyrillic-ext,latin,latin-ext/946/4/1/1/3|Denk One/sans-serif/400/cyrillic-ext,latin,latin-ext,vietnamese/947/4/1/1/3|Rosarivo/serif/400,400i/latin,latin-ext/948/0/3/2/2|Mukta Mahee/sans-serif/200,300,400,500,600,700,800/gurmukhi,latin,latin-ext/949/3/0/0/2|Arima/display/100,200,300,400,500,600,700/greek,greek-ext,latin,latin-ext,malayalam,tamil,vietnamese/950/1/1/2/3|Frijole/display/400/latin/951/4/4/2/4|Reggae One/display/400/cyrillic,japanese,latin,latin-ext/952/4/3/0/2|Vollkorn SC/serif/400,600,700,900/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/953/1/3/2/2|Euphoria Script/handwriting/400/latin,latin-ext/954/1/-1/2/3|Elsie/display/400,900/latin,latin-ext/955/2/1/1/3|Mako/sans-serif/400/latin,latin-ext/956/3/1/0/2|Imprima/sans-serif/400/latin,latin-ext/957/2/1/4/1|Padauk/sans-serif/400,700/latin,latin-ext,myanmar/958/2/1/4/2|Sunshiney/handwriting/400/latin/959/1/0/0/4|Atma/display/300,400,500,600,700/bengali,latin,latin-ext/960/2/0/1/4|Protest Strike/display/400/latin,latin-ext,math,symbols,vietnamese/962/4/1/4/1|Doppio One/sans-serif/400/latin,latin-ext/963/4/2/0/3|Kelly Slab/display/400/cyrillic,latin,latin-ext/964/2/1/4/0|Vesper Libre/serif/400,500,700,900/devanagari,latin,latin-ext/965/3/1/1/1|Martian Mono/monospace/100,200,300,400,500,600,700,800/cyrillic,cyrillic-ext,latin,latin-ext/966/1/4/4/1|Mr De Haviland/handwriting/400/latin,latin-ext/967/0/4/2/3|B612/sans-serif/400,400i,700,700i/latin/968/1/3/1/3|Tienne/serif/400,700,900/latin/969/3/3/2/3|Inder/sans-serif/400/latin,latin-ext/970/3/2/4/0|Gaegu/handwriting/300,400,700/korean,latin/971/0/1/3/4|Sour Gummy/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/972/2/2/1/2|Just Me Again Down Here/handwriting/400/latin,latin-ext/973/0/4/1/0|Nosifer/display/400/latin,latin-ext/974/4/4/3/2|Crafty Girls/handwriting/400/latin/975/0/3/3/3|Almendra/serif/400,400i,700,700i/latin,latin-ext/976/2/0/1/1|IM Fell Double Pica/serif/400,400i/latin/977/1/1/4/4|Skranji/display/400,700/latin,latin-ext/978/4/2/1/3|Shantell Sans/display/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/979/1/3/2/4|Nokora/sans-serif/100,200,300,400,500,600,700,800,900/khmer,latin/980/2/2/4/1|Waterfall/handwriting/400/latin,latin-ext,vietnamese/981/0/4/3/3|Artifika/serif/400/latin/982/3/3/2/3|Thasadith/sans-serif/400,400i,700,700i/latin,latin-ext,thai,vietnamese/983/0/0/0/2|Salsa/display/400/latin/985/4/1/1/4|Voces/sans-serif/400/latin,latin-ext/986/3/2/4/0|Bakbak One/display/400/devanagari,latin,latin-ext/987/4/2/0/1|Loved by the King/handwriting/400/latin,latin-ext/988/0/4/0/0|Redressed/handwriting/400/latin,latin-ext/989/2/0/2/4|Gowun Dodum/sans-serif/400/korean,latin,latin-ext,vietnamese/990/0/1/1/2|Pompiere/display/400/latin/991/0/4/2/3|NTR/sans-serif/400/latin,telugu/992/3/0/1/2|Alike Angular/serif/400/latin,latin-ext,math,symbols/993/2/2/0/0|Sarpanch/sans-serif/400,500,600,700,800,900/devanagari,latin,latin-ext/994/2/3/4/0|Tiro Devanagari Hindi/serif/400,400i/devanagari,latin,latin-ext/995/3/2/2/3|Noto Sans Meetei Mayek/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,meetei-mayek/996/2/2/0/2|Amethysta/serif/400/latin/997/1/3/0/0|Peralta/serif/400/latin,latin-ext/998/4/4/1/3|Cherry Cream Soda/display/400/latin/999/4/4/2/4|Noto Sans Georgian/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic-ext,georgian,greek-ext,latin,latin-ext,math,symbols/1000/2/2/0/2|Noto Sans Gujarati/sans-serif/100,200,300,400,500,600,700,800,900/gujarati,latin,latin-ext,math,symbols/1001/2/2/0/2|Delicious Handrawn/handwriting/400/latin,latin-ext/1002/1/0/3/3|Wendy One/sans-serif/400/latin,latin-ext/1003/4/2/4/2|Rubik Glitch/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1004/4/3/0/0|Jersey 25/display/400/latin,latin-ext/1005/3/3/3/2|McLaren/display/400/latin,latin-ext/1006/3/3/1/4|League Script/handwriting/400/latin/1007/0/1/3/4|Special Gothic/sans-serif/400,500,600,700/latin,latin-ext/1008/2/2/1/2|Red Hat Mono/monospace/300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext/1009/0/4/4/2|Lumanosimo/handwriting/400/latin,latin-ext/1011/2/4/2/4|Lemon/display/400/latin,latin-ext/1012/4/4/2/4|Solway/serif/300,400,500,700,800/latin/1013/3/3/2/1|Bilbo Swash Caps/handwriting/400/latin,latin-ext/1014/0/0/3/4|Federo/sans-serif/400/latin/1015/2/1/0/3|Cherry Swash/display/400,700/latin,latin-ext/1016/3/3/0/0|Poly/serif/400,400i/latin,latin-ext/1017/3/1/1/1|Shippori Antique/sans-serif/400/japanese,latin,latin-ext/1018/3/3/4/2|Codystar/display/300,400/latin,latin-ext/1019/0/4/1/3|Baloo Bhaina 2/display/400,500,600,700,800/latin,latin-ext,oriya,vietnamese/1020/2/1/1/3|Trade Winds/display/400/latin/1021/4/3/3/4|Bokor/display/400/khmer,latin/1022/4/0/1/1|Averia Sans Libre/display/300,300i,400,400i,700,700i/latin/1023/3/1/2/2|Road Rage/display/400/latin,latin-ext,vietnamese/1024/4/4/2/0|Madimi One/sans-serif/400/latin,latin-ext,math,symbols/1025/4/1/1/3|Teachers/sans-serif/400,400i,500,500i,600,600i,700,700i,800,800i/greek-ext,latin,latin-ext/1026/1/1/4/3|Holtwood One SC/serif/400/latin,latin-ext/1027/4/4/4/0|Bellota/display/300,300i,400,400i,700,700i/cyrillic,latin,latin-ext,vietnamese/1028/0/2/0/2|Scheherazade New/serif/400,500,600,700/arabic,latin,latin-ext/1029/2/0/1/3|Sancreek/display/400/latin,latin-ext/1030/4/1/3/4|Galada/display/400/bengali,latin/1031/4/0/2/3|The Girl Next Door/handwriting/400/latin,latin-ext/1032/0/2/3/4|Shanti/sans-serif/400/latin,latin-ext/1033/3/1/0/2|Special Gothic Condensed One/sans-serif/400/latin,latin-ext/1034/2/2/1/2|Wire One/sans-serif/400/latin/1035/0/4/1/2|Unkempt/display/400,700/latin/1036/1/1/1/4|Gulzar/serif/400/arabic,latin,latin-ext/1037/3/1/1/0|Suranna/serif/400/latin,telugu/1038/1/0/0/0|Nova Round/display/400/latin,latin-ext/1039/3/3/0/0|Solitreo/handwriting/400/hebrew,latin,latin-ext/1040/2/1/2/4|Ribeye/display/400/latin,latin-ext/1041/3/4/3/4|Numans/sans-serif/400/latin/1042/2/3/0/1|Lily Script One/display/400/latin,latin-ext/1043/4/1/2/3|Sail/display/400/latin,latin-ext/1044/1/1/2/3|Song Myung/serif/400/korean/1045/3/1/2/2|Shojumaru/display/400/latin,latin-ext/1046/4/4/2/4|Asar/serif/400/devanagari,latin,latin-ext/1047/1/1/2/4|Raleway Dots/display/400/latin,latin-ext/1048/0/2/1/1|Vujahday Script/handwriting/400/latin,latin-ext,vietnamese/1049/0/0/3/3|Kablammo/display/400/cyrillic,cyrillic-ext,emoji,latin,latin-ext,vietnamese/1050/4/2/3/4|Rubik Doodle Shadow/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext,math,symbols/1051/2/3/3/0|Square Peg/handwriting/400/latin,latin-ext,vietnamese/1052/0/4/3/2|ZCOOL QingKe HuangYou/sans-serif/400/chinese-simplified,latin/1053/4/0/1/0|IM Fell DW Pica SC/serif/400/latin/1054/2/1/4/4|Benne/serif/400/kannada,latin,latin-ext/1055/0/0/2/2|Atomic Age/display/400/latin,latin-ext/1056/3/3/0/1|Anek Malayalam/sans-serif/100,200,300,400,500,600,700,800/latin,latin-ext,malayalam/1057/3/1/0/0|Charmonman/handwriting/400,700/latin,latin-ext,thai,vietnamese/1058/0/1/2/3|New Rocker/display/400/latin,latin-ext/1059/4/1/2/4|Crushed/display/400/latin,latin-ext/1060/2/0/1/4|Macondo Swash Caps/display/400/latin/1062/1/1/1/4|Mirza/serif/400,500,600,700/arabic,latin,latin-ext/1063/3/0/1/3|Baloo Tammudu 2/display/400,500,600,700,800/latin,latin-ext,telugu,vietnamese/1064/2/1/1/3|Clicker Script/handwriting/400/latin,latin-ext/1065/0/0/3/4|Fascinate/display/400/latin,latin-ext/1066/4/3/2/4|Sedgwick Ave/handwriting/400/latin,latin-ext,vietnamese/1067/3/1/2/2|M PLUS 1 Code/monospace/100,200,300,400,500,600,700/japanese,latin,latin-ext,vietnamese/1068/1/2/4/1|Mochiy Pop P One/sans-serif/400/japanese,latin/1069/4/4/1/4|Moul/display/400/khmer,latin/1070/4/4/0/0|Stalemate/handwriting/400/latin,latin-ext/1071/0/4/3/4|Noto Serif HK/serif/200,300,400,500,600,700,800,900/chinese-hongkong,cyrillic,latin,latin-ext,vietnamese/1072/0/3/2/0|Farro/sans-serif/300,400,500,700/latin,latin-ext/1074/3/2/4/0|Gluten/display/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/1075/4/3/2/4|Prociono/serif/400/latin/1076/3/1/2/3|Rubik Bubbles/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1077/4/3/3/4|Miniver/display/400/latin/1078/1/1/3/4|Anta/sans-serif/400/latin,latin-ext,math,symbols/1080/3/3/4/0|Mohave/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext/1081/3/0/4/0|Train One/display/400/cyrillic,japanese,latin,latin-ext/1082/3/4/2/2|Patrick Hand SC/handwriting/400/latin,latin-ext,vietnamese/1083/2/0/1/3|Darumadrop One/display/400/japanese,latin,latin-ext/1084/4/1/4/3|Beth Ellen/handwriting/400/latin/1085/0/4/3/3|IM Fell Great Primer/serif/400,400i/latin/1086/1/1/4/4|Orienta/sans-serif/400/latin,latin-ext/1087/3/2/4/2|Baloo Bhai 2/display/400,500,600,700,800/gujarati,latin,latin-ext,vietnamese/1088/2/1/1/3|Carattere/handwriting/400/latin,latin-ext,vietnamese/1089/1/0/3/2|Borel/handwriting/400/latin,latin-ext,math,symbols,vietnamese/1090/0/4/2/3|Maiden Orange/serif/400/latin,latin-ext/1091/4/4/1/3|Gentium Book Plus/serif/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/1092/2/0/2/3|Baumans/display/400/latin/1093/3/1/4/2|Modern Antiqua/display/400/latin,latin-ext/1094/2/3/2/0|Kdam Thmor Pro/sans-serif/400/khmer,latin,latin-ext/1095/4/1/4/0|Harmattan/sans-serif/400,500,600,700/arabic,latin,latin-ext/1096/3/0/1/3|Angkor/display/400/khmer,latin/1097/4/4/0/0|Doto/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext/1098/2/2/1/2|Rhodium Libre/serif/400/devanagari,latin,latin-ext/1100/3/3/0/0|Aoboshi One/serif/400/japanese,latin,latin-ext/1101/3/3/1/1|Bona Nova/serif/400,400i,700/cyrillic,cyrillic-ext,greek,hebrew,latin,latin-ext,vietnamese/1102/0/2/1/2|Timmana/sans-serif/400/latin,telugu/1103/4/0/4/1|Swanky and Moo Moo/handwriting/400/latin,latin-ext/1104/0/0/3/4|Dokdo/display/400/korean,latin/1105/3/0/2/1|Noto Serif Thai/serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,thai/1108/3/3/1/2|Caesar Dressing/display/400/latin/1109/4/1/3/4|Protest Riot/display/400/latin,latin-ext,math,symbols,vietnamese/1110/4/1/2/4|Carme/sans-serif/400/latin/1111/1/2/3/1|IM Fell French Canon/serif/400,400i/latin/1112/1/1/3/4|Eagle Lake/handwriting/400/latin,latin-ext/1113/0/4/3/4|Cantora One/sans-serif/400/latin,latin-ext/1114/4/1/1/4|Reddit Sans Condensed/sans-serif/200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/1115/3/0/0/1|SN Pro/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/1116/2/2/1/2|Noto Sans Gunjala Gondi/sans-serif/400,500,600,700/gunjala-gondi,latin,latin-ext/1117/2/2/4/1|Ceviche One/display/400/latin,latin-ext/1118/4/0/0/2|Montaga/serif/400/latin/1119/1/1/1/1|Life Savers/display/400,700,800/latin,latin-ext/1120/0/1/3/3|Medula One/display/400/latin/1121/4/4/1/2|Akatab/sans-serif/400,500,600,700,800,900/latin,latin-ext,tifinagh/1122/1/1/-1/2|Dynalight/display/400/latin,latin-ext/1123/1/0/3/4|Fenix/serif/400/latin,latin-ext/1124/3/1/0/0|Metal Mania/display/400/latin,latin-ext/1125/4/0/1/4|Abyssinica SIL/serif/400/ethiopic,latin,latin-ext/1126/2/3/1/1|Vampiro One/display/400/latin,latin-ext/1127/4/3/0/0|Nova Flat/display/400/latin,latin-ext/1128/3/3/0/0|Henny Penny/display/400/latin/1129/0/2/3/4|Sono/sans-serif/200,300,400,500,600,700,800/latin,latin-ext,vietnamese/1130/0/4/1/3|UnifrakturCook/display/700/latin/1131/4/0/1/1|Ledger/serif/400/cyrillic,latin,latin-ext/1132/1/3/4/0|Ysabeau SC/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic,cyrillic-ext,greek,latin,latin-ext,math,symbols,vietnamese/1133/0/2/4/0|IM Fell Double Pica SC/serif/400/latin/1134/1/1/4/4|Comic Relief/display/400,700/cyrillic,greek,latin,latin-ext/1135/3/3/3/2|Zhi Mang Xing/handwriting/400/chinese-simplified,latin/1136/3/4/2/3|Sigmar/display/400/latin,latin-ext,vietnamese/1137/4/4/3/2|Noto Sans Armenian/sans-serif/100,200,300,400,500,600,700,800,900/armenian,latin,latin-ext/1138/2/2/0/2|Fuggles/handwriting/400/latin,latin-ext,vietnamese/1139/0/4/3/4|Nova Slim/display/400/latin,latin-ext/1140/1/3/0/0|Duru Sans/sans-serif/400/latin,latin-ext/1141/1/3/0/0|Braah One/sans-serif/400/gurmukhi,latin,latin-ext,vietnamese/1142/4/2/4/1|Gemunu Libre/sans-serif/200,300,400,500,600,700,800/latin,latin-ext,sinhala/1143/4/0/4/0|Sulphur Point/sans-serif/300,400,700/latin,latin-ext/1145/1/2/4/2|Noto Sans Thai Looped/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,thai/1146/2/2/4/1|Khmer/sans-serif/400/khmer/1147/2/2/1/2|Convergence/sans-serif/400/latin,latin-ext/1148/3/3/4/1|Asset/display/400/cyrillic-ext,latin,latin-ext,math,symbols/1149/4/4/2/3|Noto Sans Math/sans-serif/400/cyrillic,latin,math/1150/2/2/4/1|Chicle/display/400/latin,latin-ext/1151/4/4/2/3|Delius Swash Caps/handwriting/400/latin/1152/1/2/1/4|Underdog/display/400/cyrillic,latin,latin-ext/1154/2/1/4/0|Kavoon/display/400/latin,latin-ext/1155/4/3/2/3|Stick/sans-serif/400/cyrillic,japanese,latin,latin-ext/1156/2/3/3/0|Alkalami/serif/400/arabic,latin,latin-ext/1157/4/1/2/3|Yomogi/handwriting/400/cyrillic,japanese,latin,latin-ext,vietnamese/1158/0/2/1/2|Homenaje/sans-serif/400/latin/1159/4/4/3/0|Genos/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cherokee,latin,latin-ext,vietnamese/1160/3/0/1/3|Akaya Kanadaka/display/400/kannada,latin,latin-ext/1161/3/0/2/4|Noto Serif Georgian/serif/100,200,300,400,500,600,700,800,900/georgian,latin,latin-ext/1162/3/3/1/2|Anek Tamil/sans-serif/100,200,300,400,500,600,700,800/latin,latin-ext,tamil/1163/3/1/0/0|Miltonian Tattoo/display/400/latin/1164/4/3/3/3|Libre Barcode 128 Text/display/400/latin/1165/3/3/3/2|Sumana/serif/400,700/devanagari,latin,latin-ext/1166/2/1/1/1|Freckle Face/display/400/latin,latin-ext/1167/4/1/3/4|Noto Serif Malayalam/serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,malayalam/1168/2/3/1/2|Kenia/display/400/latin/1169/4/0/2/3|Smythe/display/400/latin/1170/4/4/2/4|Spicy Rice/display/400/latin,latin-ext/1171/4/0/2/4|Alkatra/display/400,500,600,700/bengali,devanagari,latin,latin-ext,oriya/1172/4/0/2/4|BhuTuka Expanded One/serif/400/gurmukhi,latin,latin-ext/1173/0/4/1/1|Rationale/sans-serif/400/latin/1174/3/0/0/0|Moon Dance/handwriting/400/latin,latin-ext,vietnamese/1175/0/4/3/4|East Sea Dokdo/handwriting/400/korean,latin/1176/2/4/3/1|Stylish/sans-serif/400/korean/1177/3/0/2/2|Gafata/sans-serif/400/latin,latin-ext/1178/1/0/4/1|Imbue/serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/1179/4/4/1/2|Noto Sans Buhid/sans-serif/400/buhid,latin,latin-ext/1180/2/2/4/1|IM Fell Great Primer SC/serif/400/latin/1181/1/1/-1/4|Scope One/serif/400/latin,latin-ext/1182/1/2/1/1|Pavanam/sans-serif/400/latin,latin-ext,tamil/1183/1/0/0/0|Special Gothic Expanded One/sans-serif/400/latin,latin-ext/1184/2/2/1/2|IM Fell French Canon SC/serif/400/latin/1185/1/1/3/4|Chathura/sans-serif/100,300,400,700,800/latin,telugu/1186/1/4/0/0|Hubot Sans/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/1187/2/2/1/2|Tauri/sans-serif/400/latin,latin-ext/1188/3/2/0/3|Gugi/display/400/korean,latin/1189/4/3/1/1|Imperial Script/handwriting/400/latin,latin-ext,vietnamese/1191/1/0/3/2|Comme/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext/1192/1/2/0/2|Noto Sans Warang Citi/sans-serif/400/latin,latin-ext,warang-citi/1193/2/3/4/1|Gayathri/sans-serif/100,400,700/latin,malayalam/1194/2/1/0/1|Zilla Slab Highlight/serif/400,700/latin,latin-ext/1195/-1/1/0/0|Notable/sans-serif/400/latin/1196/4/4/3/0|Katibeh/display/400/arabic,latin,latin-ext/1197/4/4/1/2|Lovers Quarrel/handwriting/400/latin,latin-ext,vietnamese/1198/0/4/3/2|Overlock SC/display/400/latin,latin-ext/1199/2/1/1/3|Astloch/display/400,700/latin/1200/0/0/2/1|Shippori Antique B1/sans-serif/400/japanese,latin,latin-ext/1201/3/3/2/2|Lavishly Yours/handwriting/400/latin,latin-ext,vietnamese/1202/0/0/3/3|Chau Philomene One/sans-serif/400,400i/latin,latin-ext/1203/4/0/0/3|Mystery Quest/display/400/latin,latin-ext/1204/1/1/3/4|Sedgwick Ave Display/handwriting/400/latin,latin-ext,vietnamese/1205/3/0/2/2|Nata Sans/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/1207/2/2/1/2|Edu TAS Beginner/handwriting/400,500,600,700/latin/1208/0/0/1/3|Miltonian/display/400/latin/1209/2/3/3/4|Grenze/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/1210/4/0/1/0|Short Stack/handwriting/400/latin/1211/1/4/3/4|Comforter Brush/handwriting/400/cyrillic,latin,latin-ext,vietnamese/1212/0/0/1/0|Inclusive Sans/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext,vietnamese/1213/2/2/4/2|Akronim/display/400/latin,latin-ext/1214/3/0/3/4|Long Cang/handwriting/400/chinese-simplified,latin/1215/0/0/2/4|IBM Plex Sans Thai Looped/sans-serif/100,200,300,400,500,600,700/cyrillic-ext,latin,latin-ext,thai/1216/2/1/0/2|Nova Script/display/400/latin,latin-ext/1217/2/3/1/0|Belgrano/serif/400/latin/1218/2/3/0/0|Nova Cut/display/400/latin,latin-ext/1219/1/3/4/0|Grape Nuts/handwriting/400/latin,latin-ext,vietnamese/1220/0/0/3/4|Noto Sans Thaana/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,thaana/1221/2/2/0/2|Jolly Lodger/display/400/latin,latin-ext/1223/4/4/2/4|Kavivanar/handwriting/400/latin,latin-ext,tamil/1224/1/1/1/2|Karantina/display/300,400,700/hebrew,latin,latin-ext/1225/4/4/4/0|Noto Sans Chorasmian/sans-serif/400/chorasmian,latin,latin-ext,math,symbols/1226/2/3/4/1|Nova Oval/display/400/latin,latin-ext/1227/2/3/0/0|Anek Gujarati/sans-serif/100,200,300,400,500,600,700,800/gujarati,latin,latin-ext/1228/3/0/0/0|Kode Mono/monospace/400,500,600,700/latin,latin-ext/1229/0/4/3/0|Zalando Sans SemiExpanded/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/1230/2/2/1/2|Siemreap/sans-serif/400/khmer/1231/0/4/3/0|LINE Seed JP/sans-serif/100,400,700,800/cyrillic,greek-ext,japanese,latin,latin-ext/1232/2/2/1/2|Varta/sans-serif/300,400,500,600,700/latin,latin-ext,vietnamese/1233/1/0/4/2|Mooli/sans-serif/400/latin,latin-ext/1234/1/3/0/3|Sonsie One/display/400/latin,latin-ext/1235/4/4/2/4|Odor Mean Chey/serif/400/khmer,latin/1237/4/1/1/0|Noto Sans Osmanya/sans-serif/400/latin,latin-ext,osmanya/1238/2/3/4/1|Playwrite NZ Basic/handwriting/100,200,300,400/latin/1239/2/2/3/4|Barrio/display/400/latin,latin-ext/1240/1/2/3/2|Cactus Classical Serif/serif/400/chinese-traditional,cyrillic,latin,latin-ext,vietnamese/1241/0/4/1/0|Badeen Display/display/400/arabic,latin,latin-ext/1242/3/3/3/2|Strait/sans-serif/400/latin,latin-ext/1243/2/0/0/2|Birthstone Bounce/handwriting/400,500/latin,latin-ext,vietnamese/1244/0/0/3/3|Jersey 15/display/400/latin,latin-ext/1245/3/3/3/2|Festive/handwriting/400/latin,latin-ext,vietnamese/1247/0/0/3/4|Ruthie/handwriting/400/latin,latin-ext,vietnamese/1248/0/4/3/2|Orbit/sans-serif/400/korean,latin,latin-ext/1249/0/4/3/0|Castoro Titling/display/400/latin,latin-ext/1250/0/4/2/3|Federant/display/400/latin/1251/4/1/2/1|Shalimar/handwriting/400/latin,latin-ext,vietnamese/1252/0/4/2/2|Sree Krushnadevaraya/serif/400/latin,telugu/1253/3/0/0/0|Metal/display/400/khmer,latin/1254/1/0/2/3|Jomolhari/serif/400/latin,tibetan/1255/2/3/2/3|Comforter/handwriting/400/cyrillic,latin,latin-ext,vietnamese/1256/0/0/3/4|Headland One/serif/400/latin,latin-ext/1257/2/4/2/1|Libre Barcode 39 Extended/display/400/latin/1258/3/3/3/2|Spline Sans Mono/monospace/300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext/1259/1/4/0/1|Handjet/display/100,200,300,400,500,600,700,800,900/arabic,armenian,cyrillic,cyrillic-ext,greek,hebrew,latin,latin-ext,vietnamese/1260/2/4/1/-1|Ysabeau/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,latin,latin-ext,math,symbols,vietnamese/1261/0/1/0/2|Nerko One/handwriting/400/latin,latin-ext/1262/4/0/2/4|Stint Ultra Condensed/serif/400/latin,latin-ext/1263/4/4/1/1|Lexend Mega/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/1264/1/4/0/2|Ranchers/display/400/latin,latin-ext/1265/4/0/1/3|Fasthand/display/400/khmer,latin/1266/1/0/0/2|Redacted/display/400/latin,latin-ext/1267/3/3/3/2|Spirax/display/400/latin/1268/1/1/2/4|Akaya Telivigala/display/400/latin,latin-ext,telugu/1269/3/0/2/4|Tilt Prism/display/400/latin,latin-ext,vietnamese/1271/3/2/3/2|Keania One/display/400/latin,latin-ext/1272/4/1/1/0|Bagel Fat One/display/400/korean,latin,latin-ext/1273/4/2/1/3|Unlock/display/400/latin,latin-ext/1274/4/3/0/0|Srisakdi/display/400,700/latin,latin-ext,thai,vietnamese/1275/0/1/2/3|Margarine/display/400/latin,latin-ext/1276/4/1/4/4|Content/display/400,700/khmer/1277/0/4/3/0|Englebert/sans-serif/400/latin,latin-ext/1278/3/0/2/4|Beau Rivage/handwriting/400/latin,latin-ext,vietnamese/1279/0/0/3/4|Winky Sans/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/1280/2/2/1/2|Zen Tokyo Zoo/display/400/latin,latin-ext/1281/1/0/2/0|Playwrite CU Guides/handwriting/400/latin/1282/2/2/3/4|Jacquard 12/display/400/latin,latin-ext,math,symbols/1283/4/0/4/0|Luxurious Script/handwriting/400/latin,latin-ext,vietnamese/1284/1/4/3/4|Lugrasimo/handwriting/400/latin,latin-ext/1285/0/4/2/4|Noto Sans Symbols 2/sans-serif/400/braille,latin,latin-ext,math,mayan-numerals,symbols/1286/2/2/1/2|Sansation/sans-serif/300,300i,400,400i,700,700i/cyrillic,greek,latin,latin-ext/1287/2/2/1/2|Phudu/display/300,400,500,600,700,800,900/cyrillic-ext,latin,latin-ext,vietnamese/1288/2/1/4/0|Noto Sans Canadian Aboriginal/sans-serif/100,200,300,400,500,600,700,800,900/canadian-aboriginal,latin,latin-ext,math,symbols/1289/2/2/0/2|Engagement/handwriting/400/latin,latin-ext/1290/3/4/3/4|Gupter/serif/400,500,700/latin/1292/2/0/1/1|The Nautigal/handwriting/400,700/latin,latin-ext,vietnamese/1293/0/4/3/4|Flamenco/display/300,400/latin/1294/0/0/1/3|Playwrite US Trad/handwriting/100,200,300,400/latin/1295/0/4/3/4|Kulim Park/sans-serif/200,200i,300,300i,400,400i,600,600i,700,700i/latin,latin-ext/1296/2/2/4/2|Girassol/display/400/latin,latin-ext/1297/3/0/1/0|Text Me One/sans-serif/400/latin,latin-ext/1298/0/1/1/2|Suwannaphum/serif/100,300,400,700,900/khmer,latin/1299/3/3/0/0|Rum Raisin/sans-serif/400/latin,latin-ext/1300/4/0/2/4|Joti One/display/400/latin,latin-ext/1301/4/3/0/3|Poltawski Nowy/serif/400,400i,500,500i,600,600i,700,700i/latin,latin-ext,vietnamese/1302/3/2/2/3|Noto Music/sans-serif/400/latin,latin-ext,music/1303/2/2/1/2|Londrina Outline/display/400/latin/1304/0/0/3/2|Passions Conflict/handwriting/400/latin,latin-ext,vietnamese/1305/0/4/3/2|Alan Sans/sans-serif/300,400,500,600,700,800,900/latin,latin-ext/1306/2/2/1/2|Noto Sans Ethiopic/sans-serif/100,200,300,400,500,600,700,800,900/ethiopic,latin,latin-ext/1307/2/2/0/2|Carrois Gothic SC/sans-serif/400/latin/1308/2/2/3/0|Bonheur Royale/handwriting/400/latin,latin-ext,vietnamese/1309/0/4/3/4|Seymour One/sans-serif/400/cyrillic,latin,latin-ext/1310/4/4/1/4|Island Moments/handwriting/400/latin,latin-ext,vietnamese/1311/0/0/0/3|Liu Jian Mao Cao/handwriting/400/chinese-simplified,latin/1312/0/0/2/4|Mate SC/serif/400/latin,latin-ext/1313/1/1/1/1|Ruluko/sans-serif/400/latin,latin-ext/1314/1/0/0/2|Cagliostro/sans-serif/400/latin/1315/1/1/1/3|Yeon Sung/display/400/korean,latin/1316/2/0/2/4|Dangrek/display/400/khmer,latin/1317/4/0/2/3|Noto Sans Gurmukhi/sans-serif/100,200,300,400,500,600,700,800,900/gurmukhi,latin,latin-ext/1318/2/2/0/2|Trispace/sans-serif/100,200,300,400,500,600,700,800/latin,latin-ext,vietnamese/1319/1/4/0/3|Hedvig Letters Sans/sans-serif/400/latin,latin-ext,math,symbols/1320/3/2/4/1|Rubik Scribble/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext,math,symbols/1321/0/3/1/3|Noto Sans Oriya/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,oriya/1322/2/2/0/2|Momo Signature/sans-serif/400/latin,latin-ext,vietnamese/1323/2/2/1/2|Sura/serif/400,700/devanagari,latin,latin-ext/1325/3/1/2/1|Vend Sans/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext/1326/2/2/1/2|Noto Sans Samaritan/sans-serif/400/latin,latin-ext,samaritan/1327/2/2/4/1|Noto Sans Lao/sans-serif/100,200,300,400,500,600,700,800,900/lao,latin,latin-ext/1328/2/2/0/2|Single Day/display/400/korean/1329/3/0/2/4|Yuji Boku/serif/400/cyrillic,japanese,latin,latin-ext/1330/1/3/3/4|Manuale/serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext,vietnamese/1331/3/1/0/0|Junge/serif/400/latin/1332/0/3/2/3|Gorditas/display/400,700/latin/1333/4/3/2/3|BIZ UDMincho/serif/400,700/cyrillic,greek-ext,japanese,latin,latin-ext/1335/0/2/1/0|Port Lligat Slab/serif/400/latin/1337/3/0/1/3|Preahvihear/sans-serif/400/khmer,latin/1338/2/3/1/2|Rubik Wet Paint/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1339/4/3/0/3|Ballet/handwriting/400/latin,latin-ext,vietnamese/1340/0/1/3/4|Kaisei HarunoUmi/serif/400,500,700/cyrillic,japanese,latin,latin-ext/1342/1/3/3/4|Mea Culpa/handwriting/400/latin,latin-ext,vietnamese/1344/0/0/3/4|Baskervville SC/serif/400,500,600,700/latin,latin-ext/1345/0/2/2/2|Almendra Display/display/400/latin,latin-ext/1346/0/0/2/2|Tac One/sans-serif/400/latin,latin-ext,math,symbols,vietnamese/1347/4/0/3/0|Faculty Glyphic/sans-serif/400/latin,latin-ext/1348/2/2/1/2|Ruwudu/serif/400,500,600,700/arabic,latin,latin-ext/1349/1/1/2/3|Montserrat Underline/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/1350/2/2/1/2|Texturina/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/1351/3/2/3/4|Edu NSW ACT Cursive/handwriting/400,500,600,700/latin,latin-ext/1354/2/2/3/4|Dekko/handwriting/400/devanagari,latin,latin-ext/1355/1/0/2/3|Devonshire/handwriting/400/latin,latin-ext/1356/3/4/2/3|Finlandica/sans-serif/400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext/1357/2/0/0/1|Marhey/display/300,400,500,600,700/arabic,latin,latin-ext/1358/2/3/1/4|Tiny5/sans-serif/400/cyrillic,cyrillic-ext,greek,latin,latin-ext/1360/3/1/3/0|Noto Serif Telugu/serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,telugu/1361/2/3/1/2|Autour One/display/400/latin,latin-ext/1362/3/4/3/4|Tourney/display/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/1363/3/3/1/0|Paprika/display/400/latin,latin-ext/1364/2/3/2/4|Playwrite IS/handwriting/100,200,300,400/latin/1365/0/3/2/4|Chocolate Classical Sans/sans-serif/400/chinese-traditional,cyrillic,latin,latin-ext,vietnamese/1366/2/2/0/2|Cute Font/display/400/korean,latin/1367/4/4/0/0|Kapakana/handwriting/300,400/japanese,latin,latin-ext/1368/2/2/3/4|Noto Serif Kannada/serif/100,200,300,400,500,600,700,800,900/kannada,latin,latin-ext/1369/3/3/1/2|Ysabeau Infant/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,greek,latin,latin-ext,math,symbols,vietnamese/1370/0/1/0/2|Anek Kannada/sans-serif/100,200,300,400,500,600,700,800/kannada,latin,latin-ext/1371/3/1/0/0|Chela One/display/400/latin,latin-ext/1374/4/0/1/3|Almendra SC/serif/400/latin/1375/3/1/2/2|Romanesco/handwriting/400/latin,latin-ext/1376/4/4/3/4|Climate Crisis/display/400/latin,latin-ext/1377/-1/4/1/4|Erica One/display/400/latin,latin-ext/1378/4/4/3/0|Bodoni Moda SC/serif/400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,math,symbols/1379/0/2/1/2|Milonga/display/400/latin,latin-ext/1380/1/2/3/4|Stoke/serif/300,400/latin,latin-ext/1381/2/4/3/3|Kite One/sans-serif/400/latin,latin-ext/1382/0/1/1/4|Gideon Roman/display/400/latin,latin-ext,vietnamese/1383/1/2/3/2|Buda/display/300/latin/1384/0/0/0/3|Micro 5/display/400/latin,latin-ext,math,symbols/1385/3/3/3/2|Noto Sans Tagalog/sans-serif/400/latin,latin-ext,tagalog/1386/2/2/4/1|Bilbo/handwriting/400/latin,latin-ext,vietnamese/1387/0/4/3/4|Fascinate Inline/display/400/latin,latin-ext/1388/4/3/3/4|Asta Sans/sans-serif/300,400,500,600,700,800/korean,latin/1389/2/2/1/2|Alumni Sans Pinstripe/sans-serif/400,400i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/1390/0/4/0/2|My Soul/handwriting/400/latin,latin-ext,vietnamese/1391/1/0/3/4|Averia Gruesa Libre/display/400/latin,latin-ext/1392/3/1/2/2|Sahitya/serif/400,700/devanagari,latin/1393/1/0/2/2|Mozilla Text/sans-serif/200,300,400,500,600,700/latin,latin-ext/1394/2/2/1/2|Sedan SC/serif/400/latin,latin-ext/1395/1/2/3/4|Meera Inimai/sans-serif/400/latin,tamil/1396/3/1/0/1|Gwendolyn/handwriting/400,700/latin,latin-ext,vietnamese/1397/0/0/3/4|Simonetta/display/400,400i,900,900i/latin,latin-ext/1398/0/0/2/4|Noto Sans Gothic/sans-serif/400/gothic,latin,latin-ext/1399/2/2/4/1|Boldonse/display/400/latin,latin-ext/1400/3/3/3/2|Tiro Devanagari Sanskrit/serif/400,400i/devanagari,latin,latin-ext/1401/3/2/2/3|Jacques Francois/serif/400/latin/1402/1/3/2/3|Mynerve/handwriting/400/greek,latin,latin-ext,vietnamese/1403/0/1/2/4|Stint Ultra Expanded/serif/400/latin,latin-ext/1404/0/4/1/2|Koh Santepheap/serif/100,300,400,700,900/khmer,latin/1405/3/3/2/1|Dorsa/sans-serif/400/latin/1406/3/4/4/0|Arbutus/serif/400/latin,latin-ext/1407/4/4/3/4|Mogra/display/400/gujarati,latin,latin-ext/1408/4/3/2/4|Farsan/display/400/gujarati,latin,latin-ext,vietnamese/1409/2/4/2/3|Rubik Moonrocks/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1410/4/3/0/2|Edu AU VIC WA NT Hand/handwriting/400,500,600,700/latin,latin-ext/1411/0/1/1/4|Ramaraja/serif/400/latin,telugu/1412/4/0/2/3|Tiro Devanagari Marathi/serif/400,400i/devanagari,latin,latin-ext/1413/3/2/2/3|Playwrite DE Grund/handwriting/100,200,300,400/latin/1415/0/3/2/4|Reem Kufi Fun/sans-serif/400,500,600,700/arabic,latin,latin-ext,vietnamese/1416/2/1/4/2|Smooch/handwriting/400/latin,latin-ext,vietnamese/1417/3/0/3/4|Playwrite IN/handwriting/100,200,300,400/latin/1418/0/4/3/4|Condiment/handwriting/400/latin,latin-ext/1419/0/0/2/4|Tillana/display/400,500,600,700,800/devanagari,latin,latin-ext/1420/0/1/0/2|New Amsterdam/sans-serif/400/latin,latin-ext/1422/4/0/4/0|Smokum/display/400/latin,latin-ext/1423/4/4/2/0|Glass Antiqua/display/400/latin,latin-ext/1424/2/0/1/3|Noto Sans Sora Sompeng/sans-serif/400,500,600,700/latin,latin-ext,sora-sompeng/1425/2/2/4/1|Victor Mono/monospace/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,greek,latin,latin-ext,vietnamese/1426/0/4/0/2|Joan/serif/400/latin,latin-ext/1427/1/1/1/2|Donegal One/serif/400/latin,latin-ext/1428/2/3/2/4|Bacasime Antique/serif/400/latin,latin-ext/1429/1/1/2/3|Nuosu SIL/sans-serif/400/latin,latin-ext,yi/1430/2/1/1/0|IBM Plex Sans Devanagari/sans-serif/100,200,300,400,500,600,700/cyrillic-ext,devanagari,latin,latin-ext/1432/2/1/0/2|Bruno Ace SC/display/400/latin,latin-ext/1434/2/4/4/0|Playwrite CU/handwriting/100,200,300,400/latin/1435/0/4/3/4|Nabla/display/400/cyrillic-ext,latin,latin-ext,math,vietnamese/1436/4/1/2/0|TASA Orbiter/sans-serif/400,500,600,700,800/latin,latin-ext/1437/2/2/1/2|Noto Serif Ahom/serif/400/ahom,latin,latin-ext/1438/3/3/1/1|Ewert/display/400/latin,latin-ext/1439/4/4/3/0|Blaka/display/400/arabic,latin,latin-ext/1440/4/0/3/0|Bruno Ace/display/400/latin,latin-ext/1441/3/4/4/1|Poor Story/display/400/korean,latin/1442/1/0/4/2|Lexend Tera/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/1443/0/4/0/2|Yaldevi/sans-serif/200,300,400,500,600,700/latin,latin-ext,sinhala/1444/1/1/0/2|LXGW WenKai TC/handwriting/300,400,700/chinese-traditional,cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,lisu,vietnamese/1445/0/3/1/3|Kotta One/serif/400/latin,latin-ext/1446/1/1/1/2|Plaster/display/400/latin,latin-ext/1447/4/4/4/0|Londrina Shadow/display/400/latin/1448/0/0/3/1|Grechen Fuemen/handwriting/400/latin,latin-ext,vietnamese/1449/0/2/3/4|New Tegomin/serif/400/japanese,latin,latin-ext/1450/0/3/3/2|Liter/sans-serif/400/cyrillic,latin,latin-ext/1452/2/2/1/2|Offside/display/400/latin,latin-ext/1453/1/3/0/1|Noto Sans Tai Viet/sans-serif/400/latin,latin-ext,tai-viet/1454/2/2/4/1|Inika/serif/400,700/latin,latin-ext/1455/3/2/1/1|Jacques Francois Shadow/display/400/latin/1456/1/3/3/3|Kumar One/display/400/gujarati,latin,latin-ext/1457/4/4/3/0|Risque/display/400/latin,latin-ext/1458/4/1/1/3|Trykker/serif/400/latin,latin-ext/1459/1/3/1/0|Beiruti/sans-serif/200,300,400,500,600,700,800,900/arabic,latin,latin-ext,vietnamese/1460/2/0/1/3|Playwrite AT/handwriting/100,100i,200,200i,300,300i,400,400i/latin/1461/1/3/2/4|Science Gothic/sans-serif/100,200,300,400,500,600,700,800,900/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/1462/2/2/1/2|Amiri Quran/serif/400/arabic,latin/1463/1/1/3/4|Dhurjati/sans-serif/400/latin,telugu/1464/4/0/4/0|Bungee Hairline/display/400/latin,latin-ext,vietnamese/1465/0/4/0/0|Anek Gurmukhi/sans-serif/100,200,300,400,500,600,700,800/gurmukhi,latin,latin-ext/1466/3/1/0/0|Water Brush/handwriting/400/latin,latin-ext,vietnamese/1467/1/0/0/1|Anek Odia/sans-serif/100,200,300,400,500,600,700,800/latin,latin-ext,oriya/1468/3/0/0/0|Lancelot/display/400/latin,latin-ext/1469/0/0/1/0|Ribeye Marrow/display/400/latin,latin-ext/1470/2/4/3/3|Hubballi/sans-serif/400/kannada,latin,latin-ext/1471/0/0/1/3|Noto Serif Gujarati/serif/100,200,300,400,500,600,700,800,900/gujarati,latin,latin-ext,math,symbols/1472/2/3/1/2|Marko One/serif/400/latin/1473/3/4/2/3|Noto Serif Sinhala/serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,sinhala/1475/1/3/1/2|Sixtyfour/monospace/400/latin,latin-ext,math,symbols/1476/2/4/3/4|Linden Hill/serif/400,400i/latin,latin-ext/1477/1/0/2/2|Diplomata/display/400/latin,latin-ext/1478/4/4/3/2|Alumni Sans Inline One/display/400,400i/latin,latin-ext,vietnamese/1479/4/4/2/0|Bubbler One/sans-serif/400/latin,latin-ext/1480/0/0/4/1|Encode Sans SC/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/1481/2/2/3/0|Fruktur/display/400,400i/cyrillic-ext,latin,latin-ext,vietnamese/1482/4/1/2/4|Jacquard 24/display/400/latin,latin-ext/1483/4/0/3/0|Stalinist One/display/400/cyrillic,latin,latin-ext/1484/4/4/3/0|Playwrite NZ Basic Guides/handwriting/400/latin/1485/2/2/3/4|Elsie Swash Caps/display/400,900/latin,latin-ext/1486/1/1/1/3|Geostar Fill/display/400/latin/1487/2/4/3/0|Bitcount Single/display/100,200,300,400,500,600,700,800,900/latin,latin-ext/1488/3/3/3/2|Stack Sans Headline/sans-serif/200,300,400,500,600,700/latin,latin-ext/1489/2/2/1/2|Reddit Mono/monospace/200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/1490/1/3/0/2|Rubik Distressed/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1491/4/3/3/0|Galindo/display/400/latin,latin-ext/1493/4/3/2/4|Bungee Outline/display/400/latin,latin-ext,vietnamese/1495/0/4/3/0|Bigelow Rules/display/400/latin,latin-ext/1496/2/4/2/3|Monomakh/display/400/cyrillic,cyrillic-ext,latin,latin-ext/1497/3/3/3/2|Fleur De Leah/handwriting/400/latin,latin-ext,vietnamese/1498/0/0/3/3|Libre Barcode EAN13 Text/display/400/latin/1499/3/3/3/2|Galdeano/sans-serif/400/latin/1500/3/0/4/0|Sofadi One/display/400/latin/1501/1/3/2/4|Kirang Haerang/display/400/korean,latin/1502/2/0/3/3|Are You Serious/handwriting/400/latin,latin-ext,vietnamese/1503/2/0/3/3|Wellfleet/serif/400/latin,latin-ext/1504/4/3/2/0|Bahiana/display/400/latin,latin-ext/1505/4/4/3/0|Wittgenstein/serif/400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/1506/2/1/1/0|Luxurious Roman/display/400/latin,latin-ext,vietnamese/1507/1/2/3/3|Playwrite VN Guides/handwriting/400/latin/1508/2/2/3/4|National Park/sans-serif/200,300,400,500,600,700,800/latin,latin-ext,vietnamese/1509/2/2/1/2|Ponomar/display/400/cyrillic,cyrillic-ext,latin/1510/3/3/3/2|Rubik Glitch Pop/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext,math,symbols/1511/4/3/3/0|Grey Qo/handwriting/400/latin,latin-ext,vietnamese/1512/0/4/3/3|Dai Banna SIL/serif/300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext,new-tai-lue/1513/2/0/1/3|Gasoek One/sans-serif/400/korean,latin,latin-ext/1514/4/4/0/1|Ancizar Sans/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/greek,latin,latin-ext/1515/2/2/1/2|Port Lligat Sans/sans-serif/400/latin/1516/3/0/0/3|Moderustic/sans-serif/300,400,500,600,700,800/cyrillic,cyrillic-ext,greek,latin,latin-ext/1517/2/2/4/2|Big Shoulders Stencil/display/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/1518/3/3/3/2|Caramel/handwriting/400/latin,latin-ext,vietnamese/1519/3/4/3/4|Stack Sans Text/sans-serif/200,300,400,500,600,700/latin,latin-ext/1520/2/2/1/2|Playwrite US Modern/handwriting/100,200,300,400/latin/1521/0/3/2/4|Ojuju/sans-serif/200,300,400,500,600,700,800/latin,latin-ext,math,symbols,vietnamese/1522/0/1/2/4|Noto Sans Syloti Nagri/sans-serif/400/latin,latin-ext,syloti-nagri/1523/2/2/4/1|Rubik Iso/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1524/2/3/2/0|Tiro Gurmukhi/serif/400,400i/gurmukhi,latin,latin-ext/1525/3/2/2/3|Peddana/serif/400/latin,telugu/1526/3/4/2/0|Manufacturing Consent/display/400/latin,latin-ext/1527/3/3/3/2|Reem Kufi Ink/sans-serif/400/arabic,latin,latin-ext,vietnamese/1528/2/1/4/2|Felipa/handwriting/400/latin,latin-ext/1529/0/0/1/3|Chilanka/handwriting/400/latin,latin-ext,malayalam/1530/0/2/2/3|Griffy/display/400/latin,latin-ext/1532/1/1/1/4|Noto Serif Khmer/serif/100,200,300,400,500,600,700,800,900/khmer,latin,latin-ext/1533/3/3/1/2|Tiro Telugu/serif/400,400i/latin,latin-ext,telugu/1534/3/2/2/3|Tulpen One/display/400/latin/1535/2/4/0/2|Jacquarda Bastarda 9/display/400/latin,latin-ext,math,symbols/1536/2/3/3/0|Libertinus Math/display/400/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,math,vietnamese/1537/3/3/3/2|Edu AU VIC WA NT Pre/handwriting/400,500,600,700/latin,latin-ext/1538/2/2/3/4|Konkhmer Sleokchher/display/400/khmer,latin,latin-ext/1539/4/3/4/1|Neonderthaw/handwriting/400/latin,latin-ext,vietnamese/1540/0/1/3/4|Lakki Reddy/handwriting/400/latin,telugu/1541/4/1/3/4|Londrina Sketch/display/400/latin/1542/0/0/3/3|WDXL Lubrifont JP N/sans-serif/400/cyrillic,japanese,latin,latin-ext,symbols2/1543/2/2/1/2|Love Light/handwriting/400/latin,latin-ext,vietnamese/1544/0/4/3/2|LXGW WenKai Mono TC/monospace/300,400,700/chinese-traditional,cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,lisu,vietnamese/1545/0/2/1/3|Mr Bedfort/handwriting/400/latin,latin-ext/1546/0/0/2/3|Bitcount Grid Double/display/100,200,300,400,500,600,700,800,900/latin,latin-ext/1547/3/3/3/2|Ranga/display/400,700/devanagari,latin,latin-ext/1548/4/4/1/2|Jersey 20/display/400/latin,latin-ext/1549/3/3/3/2|Ga Maamli/display/400/latin,latin-ext,vietnamese/1550/4/0/3/4|Ravi Prakash/display/400/latin,telugu/1551/4/0/3/0|Kings/handwriting/400/latin,latin-ext,vietnamese/1552/1/0/3/3|Noto Serif Lao/serif/100,200,300,400,500,600,700,800,900/lao,latin,latin-ext/1553/3/3/1/2|Diplomata SC/display/400/latin,latin-ext/1554/4/4/2/1|Explora/handwriting/400/cherokee,latin,latin-ext,vietnamese/1555/0/4/3/4|Epunda Sans/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/1556/2/2/1/2|Butcherman/display/400/latin,latin-ext/1557/4/2/3/0|Tapestry/handwriting/400/latin,latin-ext,vietnamese/1558/3/1/3/4|Playwrite HR/handwriting/100,200,300,400/latin/1559/1/4/2/4|Langar/display/400/gurmukhi,latin,latin-ext/1560/4/1/1/3|Inspiration/handwriting/400/latin,latin-ext,vietnamese/1561/0/4/3/4|Revalia/display/400/latin,latin-ext/1562/3/4/2/4|Dr Sugiyama/handwriting/400/latin,latin-ext/1563/0/4/2/4|Annapurna SIL/serif/400,700/devanagari,latin,latin-ext,math,symbols/1564/3/1/1/0|Passero One/display/400/latin,latin-ext/1565/4/0/0/0|BioRhyme Expanded/serif/200,300,400,700,800/latin,latin-ext/1566/1/4/0/0|Rubik Gemstones/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1567/4/3/3/0|Noto Serif Tamil/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,tamil/1568/3/3/1/2|Alumni Sans Collegiate One/sans-serif/400,400i/cyrillic,latin,latin-ext,vietnamese/1569/-1/4/2/0|Jim Nightshade/handwriting/400/latin,latin-ext/1570/0/4/4/4|Emblema One/display/400/latin,latin-ext/1571/4/4/1/3|GFS Neohellenic/sans-serif/400,400i,700,700i/greek,greek-ext,latin,vietnamese/1573/1/0/1/1|Playwrite AU SA/handwriting/100,200,300,400/latin/1574/0/3/2/4|Miss Fajardose/handwriting/400/latin,latin-ext/1575/0/4/3/4|Chiron Hei HK/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/chinese-traditional,cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,symbols2,vietnamese/1576/2/2/1/2|Uchen/serif/400/latin,tibetan/1577/1/3/2/2|Aref Ruqaa Ink/serif/400,700/arabic,latin,latin-ext/1578/2/1/2/3|Praise/handwriting/400/latin,latin-ext,vietnamese/1579/4/4/3/4|Geom/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/greek,latin,latin-ext/1580/2/2/1/2|Edu VIC WA NT Beginner/handwriting/400,500,600,700/latin/1582/0/0/1/3|Momo Trust Display/sans-serif/400/latin,latin-ext,vietnamese/1583/2/2/1/2|Updock/handwriting/400/latin,latin-ext,vietnamese/1584/1/4/3/4|Tsukimi Rounded/sans-serif/300,400,500,600,700/japanese,latin,latin-ext/1585/0/3/1/3|Babylonica/handwriting/400/latin,latin-ext,vietnamese/1586/0/-1/2/1|Noto Serif Armenian/serif/100,200,300,400,500,600,700,800,900/armenian,latin,latin-ext/1587/3/3/1/2|Diphylleia/serif/400/korean,latin,latin-ext/1588/1/2/2/4|Piedra/display/400/latin,latin-ext/1590/4/0/3/3|Rubik Burned/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1591/2/3/1/4|Kumar One Outline/display/400/gujarati,latin,latin-ext/1592/0/4/1/0|Noto Sans Hanunoo/sans-serif/400/hanunoo,latin,latin-ext/1593/2/2/4/1|Molle/handwriting/400i/latin,latin-ext/1594/4/3/2/3|Playpen Sans Arabic/handwriting/100,200,300,400,500,600,700,800/arabic,emoji,latin,latin-ext,math/1595/2/2/3/4|Mrs Sheppards/handwriting/400/latin,latin-ext/1596/4/0/2/4|Gidugu/sans-serif/400/latin,latin-ext,telugu/1597/4/4/3/0|Arsenal SC/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/1598/1/0/4/2|Oldenburg/display/400/latin,latin-ext/1599/1/4/2/3|Hanalei Fill/display/400/latin,latin-ext/1600/4/1/3/3|WDXL Lubrifont SC/sans-serif/400/chinese-simplified,cyrillic,latin,latin-ext,symbols2/1601/2/2/1/2|Mozilla Headline/sans-serif/200,300,400,500,600,700/latin,latin-ext/1602/2/2/1/2|Foldit/display/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/1603/4/4/4/0|Flow Rounded/display/400/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/1604/3/3/3/2|Bonbon/handwriting/400/latin/1605/1/3/3/4|Noto Sans Anatolian Hieroglyphs/sans-serif/400/anatolian-hieroglyphs,latin,latin-ext/1608/2/2/4/1|Oi/display/400/arabic,cyrillic,cyrillic-ext,greek,latin,latin-ext,tamil,vietnamese/1609/-1/4/2/4|Playwrite PL/handwriting/100,200,300,400/latin/1610/0/4/2/4|Trochut/display/400,400i,700/latin/1611/3/0/4/0|Gidole/sans-serif/400/cyrillic,greek,latin,latin-ext,vietnamese/1612/2/2/1/2|Bungee Tint/display/400/latin,latin-ext,vietnamese/1613/4/4/1/0|Send Flowers/handwriting/400/latin,latin-ext,vietnamese/1615/0/0/3/2|Twinkle Star/handwriting/400/latin,latin-ext,vietnamese/1616/1/2/3/4|Rubik Vinyl/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1617/1/3/4/4|Libertinus Sans/sans-serif/400,400i,700/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/1618/2/2/1/2|Story Script/sans-serif/400/latin,latin-ext,vietnamese/1619/2/2/1/2|Bahianita/display/400/latin,latin-ext,vietnamese/1620/4/4/3/0|TASA Explorer/sans-serif/400,500,600,700,800/latin,latin-ext/1621/2/2/1/2|Noto Sans Coptic/sans-serif/400/coptic,latin,latin-ext/1622/2/2/4/1|Tiro Kannada/serif/400,400i/kannada,latin,latin-ext/1623/3/2/2/3|Princess Sofia/handwriting/400/latin,latin-ext/1624/0/0/2/3|Flavors/display/400/latin,latin-ext/1625/4/0/1/4|Noto Serif Tibetan/serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,tibetan/1626/3/3/1/2|Noto Sans Javanese/sans-serif/400,500,600,700/javanese,latin,latin-ext/1627/2/2/4/1|Sirin Stencil/display/400/latin/1628/1/0/2/3|Playwrite AU NSW/handwriting/100,200,300,400/latin/1629/0/3/2/4|Chenla/display/400/khmer/1630/0/4/3/0|Atkinson Hyperlegible Mono/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext/1631/2/2/1/2|Noto Serif Vithkuqi/serif/400,500,600,700/latin,latin-ext,vithkuqi/1632/3/3/1/1|Noto Rashi Hebrew/serif/100,200,300,400,500,600,700,800,900/greek-ext,hebrew,latin,latin-ext/1633/3/3/1/2|Cascadia Code/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/arabic,braille,cyrillic,cyrillic-ext,greek,hebrew,latin,latin-ext,symbols2,vietnamese/1634/2/2/1/2|Iansui/handwriting/400/chinese-traditional,latin,latin-ext,symbols2/1635/2/2/3/4|M PLUS Code Latin/sans-serif/100,200,300,400,500,600,700/latin,latin-ext,vietnamese/1636/1/2/4/1|Snippet/sans-serif/400/latin/1637/0/2/1/3|Playwrite AU QLD/handwriting/100,200,300,400/latin/1638/0/4/2/4|Ancizar Serif/serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/greek,latin,latin-ext/1639/2/2/2/2|Splash/handwriting/400/latin,latin-ext,vietnamese/1640/0/1/3/3|Purple Purse/display/400/latin,latin-ext/1641/3/2/2/3|Matemasie/sans-serif/400/latin,latin-ext/1642/4/4/2/4|Cascadia Mono/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/arabic,braille,cyrillic,cyrillic-ext,greek,hebrew,latin,latin-ext,symbols2,vietnamese/1643/2/2/1/2|Huninn/sans-serif/400/chinese-traditional,cyrillic,latin,latin-ext,vietnamese/1644/2/2/1/2|WDXL Lubrifont TC/sans-serif/400/chinese-traditional,cyrillic,latin,latin-ext,symbols2/1645/2/2/1/2|Tai Heritage Pro/serif/400,700/latin,latin-ext,tai-viet,vietnamese/1647/2/1/2/3|Chiron GoRound TC/sans-serif/200,300,400,500,600,700,800,900/chinese-traditional,cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/1648/2/2/1/2|Winky Rough/sans-serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/1649/2/2/1/2|Noto Sans Adlam/sans-serif/400,500,600,700/adlam,latin,latin-ext/1650/2/2/4/1|Sedan/serif/400,400i/latin,latin-ext/1651/1/2/3/4|Rubik Spray Paint/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1652/4/3/3/0|Momo Trust Sans/sans-serif/200,300,400,500,600,700,800/latin,latin-ext,vietnamese/1653/2/2/1/2|Edu AU VIC WA NT Dots/handwriting/400,500,600,700/latin,latin-ext/1654/2/2/3/4|Butterfly Kids/handwriting/400/latin,latin-ext/1655/0/4/2/3|Tiro Tamil/serif/400,400i/latin,latin-ext,tamil/1656/3/2/2/3|Playwrite GB S/handwriting/100,100i,200,200i,300,300i,400,400i/latin/1657/0/3/2/4|Bitcount Prop Single/display/100,200,300,400,500,600,700,800,900/latin,latin-ext/1658/3/3/3/2|BBH Bartle/sans-serif/400/latin/1659/2/2/1/2|Triodion/display/400/cyrillic,cyrillic-ext,latin/1660/3/3/3/2|Noto Sans Mongolian/sans-serif/400/latin,latin-ext,math,mongolian,symbols/1661/2/2/4/1|Elms Sans/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/1662/2/2/1/2|Noto Sans Brahmi/sans-serif/400/brahmi,latin,latin-ext,math,symbols/1663/2/2/4/1|Noto Sans Cypro Minoan/sans-serif/400/cypro-minoan,latin,latin-ext/1664/2/2/4/1|Agu Display/display/400/latin,latin-ext,vietnamese/1665/3/3/3/2|Lunasima/sans-serif/400,700/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese/1666/1/3/4/1|Chokokutai/display/400/japanese,latin,latin-ext,vietnamese/1668/1/3/3/0|Noto Serif Tangut/serif/400/latin,latin-ext,tangut/1669/0/3/1/0|Bitcount Grid Single/display/100,200,300,400,500,600,700,800,900/latin,latin-ext/1670/3/3/3/2|Labrada/serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,vietnamese/1671/3/1/2/3|Aubrey/display/400/latin/1672/3/0/0/1|Sekuya/display/400/latin,latin-ext/1673/3/3/3/2|Rubik Puddles/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1674/0/3/0/4|Taprom/display/400/khmer,latin/1675/1/0/0/2|Rubik 80s Fade/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1676/4/3/1/0|Rubik Beastly/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1677/4/3/1/3|Playwrite CA/handwriting/100,200,300,400/latin/1678/0/4/3/4|Edu NSW ACT Foundation/handwriting/400,500,600,700/latin/1679/0/0/1/3|Combo/display/400/latin,latin-ext/1680/1/0/1/4|Ubuntu Sans Mono/monospace/400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext/1681/0/3/0/3|Tagesschrift/display/400/latin,latin-ext/1683/3/3/3/2|Protest Guerrilla/display/400/latin,latin-ext,math,symbols,vietnamese/1684/4/1/4/0|Noto Sans Carian/sans-serif/400/carian,latin,latin-ext/1686/2/2/4/1|Playwrite DK Loopet/handwriting/100,200,300,400/latin/1687/1/3/2/4|Moulpali/sans-serif/400/khmer,latin/1689/3/0/0/2|Noto Serif Ethiopic/serif/100,200,300,400,500,600,700,800,900/ethiopic,latin,latin-ext/1690/3/3/1/2|Workbench/monospace/400/latin,math,symbols/1691/4/2/3/4|Libertinus Serif/serif/400,400i,600,600i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese/1692/2/2/2/2|Playwrite HU/handwriting/100,200,300,400/latin/1693/0/4/3/4|Playwrite DE SAS/handwriting/100,200,300,400/latin/1694/1/3/2/4|Noto Sans Batak/sans-serif/400/batak,latin,latin-ext/1695/2/2/4/1|Sassy Frass/handwriting/400/latin,latin-ext,vietnamese/1696/0/4/3/4|Jaini/display/400/devanagari,latin,latin-ext/1697/4/4/2/2|Sixtyfour Convergence/monospace/400/latin,latin-ext,math,symbols/1698/2/2/1/1|Kolker Brush/handwriting/400/latin,latin-ext,vietnamese/1699/1/4/3/1|Suravaram/serif/400/latin,telugu/1700/3/0/1/1|Playwrite AU TAS/handwriting/100,200,300,400/latin/1703/0/3/2/4|Playwrite ZA/handwriting/100,200,300,400/latin/1704/0/4/3/4|Palette Mosaic/display/400/japanese,latin/1705/3/4/3/3|Redacted Script/display/300,400,700/latin,latin-ext/1706/3/3/3/2|Namdhinggo/serif/400,500,600,700,800/latin,latin-ext,limbu/1709/1/1/1/3|Noto Sans Tangsa/sans-serif/400,500,600,700/latin,latin-ext,tangsa/1710/2/2/4/1|Geostar/display/400/latin/1711/1/4/4/0|Hind Mysuru/sans-serif/300,400,500,600,700/kannada,latin,latin-ext/1712/2/2/1/2|Black And White Picture/display/400/korean,latin/1714/4/0/2/2|Vibes/display/400/arabic,latin/1715/0/0/1/3|Cossette Titre/sans-serif/400,700/latin,latin-ext/1716/2/2/1/2|SUSE Mono/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i/latin,latin-ext,vietnamese/1717/2/2/1/2|Parastoo/serif/400,500,600,700/arabic,latin,latin-ext,vietnamese/1718/2/2/2/2|Edu NSW ACT Hand Pre/handwriting/400,500,600,700/latin,latin-ext/1719/2/2/3/4|Noto Serif Balinese/serif/400/balinese,latin,latin-ext/1721/3/3/1/1|Petemoss/handwriting/400/latin,latin-ext,vietnamese/1722/1/4/3/2|Gajraj One/display/400/devanagari,latin,latin-ext/1723/4/4/0/1|Playwrite ES/handwriting/100,200,300,400/latin/1724/0/4/2/4|Estonia/handwriting/400/latin,latin-ext,vietnamese/1725/0/4/0/2|Flow Block/display/400/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/1726/3/3/3/2|Stack Sans Notch/sans-serif/200,300,400,500,600,700/latin,latin-ext/1727/2/2/1/2|Rubik Lines/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext,math,symbols/1728/4/3/3/0|Noto Sans Syriac/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,syriac/1729/2/2/0/2|Libertinus Mono/monospace/400/latin,latin-ext/1730/2/2/1/1|Playwrite NL/handwriting/100,200,300,400/latin/1731/0/4/3/4|Ruge Boogie/handwriting/400/latin,latin-ext,vietnamese/1732/0/0/3/4|Zen Loop/display/400,400i/latin,latin-ext/1733/0/4/1/2|Kalnia Glaze/display/100,200,300,400,500,600,700/latin,latin-ext/1734/0/3/3/3|Alumni Sans SC/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/cyrillic,cyrillic-ext,latin,latin-ext,vietnamese/1735/2/2/1/2|Rock 3D/display/400/japanese,latin/1737/0/4/4/4|Noto Sans Nag Mundari/sans-serif/400,500,600,700/latin,latin-ext,nag-mundari/1738/3/2/4/1|Snowburst One/display/400/latin,latin-ext/1739/0/4/3/3|Mingzat/sans-serif/400/latin,latin-ext,lepcha/1740/1/3/4/0|Savate/sans-serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/1741/2/2/1/2|Moirai One/display/400/korean,latin,latin-ext/1742/0/3/2/3|Cherish/handwriting/400/latin,latin-ext,vietnamese/1745/1/4/4/3|Shizuru/display/400/japanese,latin/1746/0/4/3/4|Noto Sans Duployan/sans-serif/400,700/duployan,latin,latin-ext/1747/2/2/4/1|Playwrite MX Guides/handwriting/400/latin/1748/2/2/3/4|Danfo/serif/400/latin,latin-ext,vietnamese/1749/4/3/3/2|Ole/handwriting/400/latin,latin-ext,vietnamese/1751/0/4/3/2|Noto Sans Multani/sans-serif/400/latin,latin-ext,multani/1752/2/2/4/1|Noto Sans Old Persian/sans-serif/400/latin,latin-ext,old-persian/1753/2/2/4/1|LXGW Marker Gothic/sans-serif/400/chinese-traditional,cyrillic,cyrillic-ext,greek,latin,latin-ext,symbols2,vietnamese/1754/2/2/1/2|Rubik Marker Hatch/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1755/4/3/4/0|Noto Serif Yezidi/serif/400,500,600,700/latin,latin-ext,yezidi/1758/3/3/1/1|Phetsarath/sans-serif/400,700/lao/1759/2/2/1/2|Puppies Play/handwriting/400/latin,latin-ext,vietnamese/1760/1/4/3/3|Grandiflora One/serif/400/korean,latin,latin-ext/1761/0/2/1/1|Playwrite IT Moderna/handwriting/100,200,300,400/latin/1762/0/3/2/4|Slackside One/handwriting/400/japanese,latin,latin-ext/1764/1/0/3/4|Chiron Sung HK/serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/chinese-hongkong,cyrillic,cyrillic-ext,greek,latin,latin-ext,symbols2,vietnamese/1765/2/2/2/2|Noto Serif Toto/serif/400,500,600,700/latin,latin-ext,toto/1767/3/3/1/1|BBH Hegarty/sans-serif/400/latin/1769/2/2/1/2|Rubik Storm/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1770/4/3/3/0|Noto Sans Syriac Eastern/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,syriac/1771/2/2/0/2|Noto Sans Old Italic/sans-serif/400/latin,latin-ext,old-italic/1772/2/2/4/1|Noto Sans Khojki/sans-serif/400/khojki,latin,latin-ext/1773/2/2/4/1|Playwrite BE VLG/handwriting/100,200,300,400/latin/1774/0/4/3/4|Bitcount/display/100,200,300,400,500,600,700,800,900/latin,latin-ext/1775/3/3/3/2|Asimovian/sans-serif/400/latin,latin-ext,vietnamese/1776/2/2/1/2|Edu SA Hand/handwriting/400,500,600,700/latin,latin-ext/1777/2/2/3/4|Epunda Slab/serif/300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext/1778/2/2/2/2|Playwrite RO/handwriting/100,200,300,400/latin/1779/0/4/3/4|Playwrite MX/handwriting/100,200,300,400/latin/1780/0/4/3/4|Hanalei/display/400/latin,latin-ext/1781/3/1/1/3|Noto Sans Glagolitic/sans-serif/400/cyrillic-ext,glagolitic,latin,latin-ext,math,symbols/1782/2/2/4/1|Playwrite HR Lijeva/handwriting/100,200,300,400/latin/1783/0/4/2/4|Noto Serif Dogra/serif/400/dogra,latin,latin-ext/1784/3/3/1/1|Noto Sans Elbasan/sans-serif/400/elbasan,latin,latin-ext/1785/2/2/4/1|Noto Serif Oriya/serif/400,500,600,700/latin,latin-ext,oriya/1786/2/3/1/1|Shafarik/display/400/cyrillic,cyrillic-ext,glagolitic,latin,latin-ext/1787/3/3/3/2|Playwrite NO/handwriting/100,200,300,400/latin/1788/0/4/2/4|Edu AU VIC WA NT Arrows/handwriting/400,500,600,700/latin,latin-ext/1789/2/2/3/4|Playwrite DE LA/handwriting/100,200,300,400/latin/1790/1/4/3/4|Rubik Broken Fax/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext,math,symbols/1793/4/3/2/0|Noto Sans Bamum/sans-serif/400,500,600,700/bamum,latin,latin-ext/1795/2/2/4/1|Linefont/display/100,200,300,400,500,600,700,800,900/latin/1796/3/3/3/2|Rubik Doodle Triangles/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext,math,symbols/1797/4/3/3/0|Coral Pixels/display/400/latin,latin-ext/1799/3/3/3/2|Noto Serif Makasar/serif/400/latin,latin-ext,makasar/1800/3/2/1/1|Edu QLD Beginner/handwriting/400,500,600,700/latin/1801/0/0/2/4|Tuffy/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,phoenician/1802/2/2/1/2|Rubik Microbe/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1803/4/3/3/0|Noto Sans Old Hungarian/sans-serif/400/latin,latin-ext,old-hungarian/1804/2/2/4/1|Noto Sans Palmyrene/sans-serif/400/latin,latin-ext,palmyrene/1806/2/2/4/1|Kedebideri/sans-serif/400,500,600,700,800,900/beria-erfe,latin/1807/2/2/1/2|Noto Sans Avestan/sans-serif/400/avestan,latin,latin-ext/1808/2/2/4/1|Rubik Pixels/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1809/4/3/3/0|BBH Bogle/sans-serif/400/latin/1810/2/2/1/2|Noto Sans Yi/sans-serif/400/latin,latin-ext,yi/1811/2/2/4/1|Ingrid Darling/handwriting/400/latin,latin-ext,vietnamese/1812/0/4/3/4|Syne Tactile/display/400/latin,latin-ext/1813/1/0/3/3|Playwrite VN/handwriting/100,200,300,400/latin/1814/0/4/3/4|Noto Sans Shavian/sans-serif/400/latin,latin-ext,shavian/1815/2/2/4/1|Noto Serif Myanmar/serif/100,200,300,400,500,600,700,800,900/myanmar/1816/0/3/3/0|Noto Traditional Nushu/sans-serif/300,400,500,600,700/latin,latin-ext,nushu/1817/1/3/4/1|Karla Tamil Upright/sans-serif/400,700/tamil/1818/2/2/1/2|Lilex/monospace/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/cyrillic,cyrillic-ext,greek,latin,latin-ext,symbols2,vietnamese/1819/2/2/1/1|Noto Sans Ol Chiki/sans-serif/400,500,600,700/latin,latin-ext,ol-chiki/1822/2/2/4/1|Playpen Sans Deva/handwriting/100,200,300,400,500,600,700,800/devanagari,emoji,latin,latin-ext/1823/2/2/3/4|Rubik Maps/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext,math,symbols/1824/4/3/4/0|Noto Sans Marchen/sans-serif/400/latin,latin-ext,marchen/1825/2/2/4/1|Noto Serif Todhri/serif/400/latin,latin-ext,todhri/1826/2/2/2/2|Playpen Sans Hebrew/handwriting/100,200,300,400,500,600,700,800/emoji,hebrew,latin,latin-ext,math/1827/2/2/3/4|Moo Lah Lah/display/400/latin,latin-ext,vietnamese/1828/4/0/3/3|Intel One Mono/monospace/300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext,symbols2,vietnamese/1829/2/2/1/1|Sirivennela/sans-serif/400/latin,telugu/1830/2/2/1/2|Playwrite FR Moderne/handwriting/100,200,300,400/latin/1832/0/4/2/4|Playwrite DK Uloopet/handwriting/100,200,300,400/latin/1833/0/3/2/4|Amarna/sans-serif/100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i/latin,latin-ext/1834/2/2/1/2|Playwrite PE/handwriting/100,200,300,400/latin/1835/0/4/3/4|Noto Znamenny Musical Notation/sans-serif/400/latin,latin-ext,math,symbols,znamenny/1836/2/2/4/1|Noto Sans Linear A/sans-serif/400/latin,latin-ext,linear-a/1837/2/2/4/1|Exile/display/400/latin,latin-ext/1838/3/3/3/2|Noto Serif Khitan Small Script/serif/400/khitan-small-script,latin,latin-ext/1839/1/4/1/1|Noto Sans Cherokee/sans-serif/100,200,300,400,500,600,700,800,900/cherokee,latin,latin-ext/1840/2/2/0/2|Playwrite PT/handwriting/100,200,300,400/latin/1841/0/4/3/4|Noto Sans Nandinagari/sans-serif/400/latin,latin-ext,nandinagari/1842/2/3/4/1|Warnes/display/400/latin,latin-ext/1843/1/4/1/3|Noto Sans Egyptian Hieroglyphs/sans-serif/400/egyptian-hieroglyphs,latin,latin-ext/1844/2/2/4/1|Noto Sans Old North Arabian/sans-serif/400/latin,latin-ext,old-north-arabian/1845/2/2/4/1|Playwrite BE WAL/handwriting/100,200,300,400/latin/1847/0/4/3/4|Noto Sans Osage/sans-serif/400/latin,latin-ext,osage/1848/2/2/4/1|Bytesized/sans-serif/400/latin,latin-ext/1849/2/2/1/2|Lisu Bosa/serif/200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i/latin,latin-ext,lisu/1850/2/1/2/0|Noto Sans Lisu/sans-serif/400,500,600,700/latin,latin-ext,lisu/1851/2/2/4/1|Playwrite NZ/handwriting/100,200,300,400/latin/1852/0/3/2/4|Wavefont/display/100,200,300,400,500,600,700,800,900/latin/1853/3/3/3/2|Big Shoulders Inline/display/100,200,300,400,500,600,700,800,900/latin,latin-ext,vietnamese/1854/3/3/3/2|Noto Sans Mahajani/sans-serif/400/latin,latin-ext,mahajani/1855/2/2/4/1|Ponnala/display/400/latin,telugu/1856/3/3/3/2|Noto Sans Wancho/sans-serif/400/latin,latin-ext,wancho/1857/1/3/4/1|Jaini Purva/display/400/devanagari,latin,latin-ext/1858/4/4/2/2|Yuji Hentaigana Akari/handwriting/400/japanese,latin,latin-ext/1859/0/4/3/4|Matangi/sans-serif/300,400,500,600,700,800,900/devanagari,latin,latin-ext/1860/2/2/1/2|Noto Sans Vithkuqi/sans-serif/400,500,600,700/latin,latin-ext,vithkuqi/1862/2/2/4/1|Noto Sans Medefaidrin/sans-serif/400,500,600,700/latin,latin-ext,medefaidrin/1863/2/2/4/1|Noto Sans Adlam Unjoined/sans-serif/400,500,600,700/adlam,latin,latin-ext/1864/2/2/4/1|Playwrite NG Modern/handwriting/100,200,300,400/latin/1865/0/3/2/4|Playwrite CO/handwriting/100,200,300,400/latin/1866/0/4/3/4|Noto Serif Old Uyghur/serif/400/latin,latin-ext,old-uyghur/1867/3/2/1/1|Narnoor/sans-serif/400,500,600,700,800/gunjala-gondi,latin,latin-ext,math,symbols/1868/2/1/4/1|Noto Sans Takri/sans-serif/400/latin,latin-ext,takri/1869/2/2/4/1|Noto Sans New Tai Lue/sans-serif/400,500,600,700/latin,latin-ext,new-tai-lue/1870/2/2/4/1|Noto Serif Gurmukhi/serif/100,200,300,400,500,600,700,800,900/gurmukhi,latin,latin-ext/1871/3/3/1/2|Noto Sans Balinese/sans-serif/400,500,600,700/balinese,latin,latin-ext/1872/2/2/4/1|Noto Sans Tifinagh/sans-serif/400/latin,latin-ext,tifinagh/1873/2/2/4/1|Noto Sans Lydian/sans-serif/400/latin,latin-ext,lydian/1874/2/2/4/1|Playwrite AR/handwriting/100,200,300,400/latin/1875/0/4/3/4|Blaka Ink/display/400/arabic,latin,latin-ext/1877/4/0/3/0|Playwrite SK/handwriting/100,200,300,400/latin/1878/0/4/3/4|Blaka Hollow/display/400/arabic,latin,latin-ext/1879/4/0/1/0|Karla Tamil Inclined/sans-serif/400,700/tamil/1880/2/2/1/2|Noto Sans Cham/sans-serif/100,200,300,400,500,600,700,800,900/cham,latin,latin-ext/1881/2/2/0/2|UoqMunThenKhung/serif/400/chinese-traditional,cyrillic,latin,symbols2/1882/2/2/2/2|Noto Sans Tai Le/sans-serif/400/latin,latin-ext,tai-le/1883/2/2/4/1|Noto Serif NP Hmong/serif/400,500,600,700/latin,nyiakeng-puachue-hmong/1884/3/3/1/1|Noto Sans Indic Siyaq Numbers/sans-serif/400/indic-siyaq-numbers,latin,latin-ext/1885/3/1/4/1|Noto Sans Inscriptional Pahlavi/sans-serif/400/inscriptional-pahlavi,latin,latin-ext/1886/2/2/4/1|Noto Serif Ottoman Siyaq/serif/400/latin,latin-ext,ottoman-siyaq-numbers/1887/3/3/1/1|Bitcount Single Ink/display/100,200,300,400,500,600,700,800,900/latin,latin-ext/1888/3/3/3/2|Noto Sans Newa/sans-serif/400/latin,latin-ext,newa/1889/2/2/4/1|Maname/serif/400/latin,latin-ext,sinhala,vietnamese/1890/3/1/2/3|Noto Sans Imperial Aramaic/sans-serif/400/imperial-aramaic,latin,latin-ext/1892/2/2/4/1|Noto Sans Tamil Supplement/sans-serif/400/latin,latin-ext,tamil-supplement/1893/2/2/4/1|Libertinus Serif Display/display/400/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese/1894/3/3/3/2|Padyakke Expanded One/serif/400/kannada,latin,latin-ext/1895/0/4/1/1|Noto Sans Cuneiform/sans-serif/400/cuneiform,latin,latin-ext/1896/2/2/4/1|Rubik Maze/display/400/cyrillic,cyrillic-ext,hebrew,latin,latin-ext/1898/4/3/2/0|Playpen Sans Thai/handwriting/100,200,300,400,500,600,700,800/emoji,latin,latin-ext,math,thai/1899/2/2/3/4|Noto Sans Sundanese/sans-serif/400,500,600,700/latin,latin-ext,sundanese/1901/2/2/4/1|Playwrite CZ/handwriting/100,200,300,400/latin/1902/0/4/3/4|Playwrite IN Guides/handwriting/400/latin/1903/2/2/3/4|Playwrite GB J/handwriting/100,100i,200,200i,300,300i,400,400i/latin/1904/0/3/2/4|Noto Sans Runic/sans-serif/400/latin,latin-ext,runic/1905/2/2/4/1|Playwrite AU VIC/handwriting/100,200,300,400/latin/1906/0/4/2/4|Noto Serif Hentaigana/serif/200,300,400,500,600,700,800,900/kana-extended,latin,latin-ext/1907/2/2/2/2|Edu AU VIC WA NT Guides/handwriting/400,500,600,700/latin,latin-ext/1908/2/2/3/4|Playwrite CO Guides/handwriting/400/latin/1909/2/2/3/4|Jacquard 24 Charted/display/400/latin,latin-ext/1910/3/3/3/2|Noto Sans Mro/sans-serif/400/latin,latin-ext,mro/1911/2/2/4/1|Noto Sans Zanabazar Square/sans-serif/400/latin,latin-ext,zanabazar-square/1912/2/2/4/1|Jacquard 12 Charted/display/400/latin,latin-ext,math,symbols/1913/3/3/3/2|Kay Pho Du/serif/400,500,600,700/kayah-li,latin,latin-ext/1914/1/2/0/0|Noto Serif Grantha/serif/400/grantha,latin,latin-ext/1915/3/3/1/1|Noto Sans Sogdian/sans-serif/400/latin,latin-ext,sogdian/1916/3/1/4/1|Noto Sans Tagbanwa/sans-serif/400/latin,latin-ext,tagbanwa/1917/2/2/4/1|Menbere/sans-serif/100,200,300,400,500,600,700/ethiopic,latin,latin-ext,vietnamese/1918/2/2/1/2|Edu QLD Hand/handwriting/400,500,600,700/latin,latin-ext,vietnamese/1919/2/2/3/4|Noto Sans Miao/sans-serif/400/latin,latin-ext,miao/1920/2/2/4/1|Playwrite CL/handwriting/100,200,300,400/latin/1921/0/4/3/4|Noto Sans Sharada/sans-serif/400/latin,latin-ext,sharada/1922/2/2/4/1|Noto Sans Tai Tham/sans-serif/400,500,600,700/latin,latin-ext,tai-tham/1923/1/3/4/1|Noto Sans Bhaiksuki/sans-serif/400/bhaiksuki,latin,latin-ext/1925/2/2/4/1|Edu VIC WA NT Hand Pre/handwriting/400,500,600,700/latin,latin-ext/1926/2/2/3/4|Noto Sans Grantha/sans-serif/400/grantha,latin,latin-ext/1927/2/2/4/1|Noto Sans Vai/sans-serif/400/latin,latin-ext,vai/1928/2/2/4/1|Noto Sans NKo/sans-serif/400/latin,latin-ext,nko/1929/2/2/4/1|Noto Sans Old South Arabian/sans-serif/400/latin,latin-ext,old-south-arabian/1930/2/2/4/1|Libertinus Keyboard/display/400/latin,latin-ext/1931/3/3/3/2|Noto Sans Chakma/sans-serif/400/chakma,latin,latin-ext/1932/2/2/4/1|Cause/handwriting/100,200,300,400,500,600,700,800,900/latin,latin-ext/1933/2/2/3/4|Kanchenjunga/sans-serif/400,500,600,700/kirat-rai,latin/1934/2/2/1/2|Playwrite IE/handwriting/100,200,300,400/latin/1935/0/4/3/4|Playwrite ID/handwriting/100,200,300,400/latin/1936/0/4/3/4|Playwrite US Trad Guides/handwriting/400/latin/1938/2/2/3/4|Edu VIC WA NT Hand/handwriting/400,500,600,700/latin,latin-ext/1939/2/2/3/4|Noto Sans Elymaic/sans-serif/400/elymaic,latin,latin-ext/1940/1/3/4/1|Sankofa Display/sans-serif/400/latin,latin-ext,vietnamese/1941/0/0/3/4|Noto Sans Kawi/sans-serif/400,500,600,700/kawi,latin,latin-ext/1942/2/2/4/1|Jersey 15 Charted/display/400/latin,latin-ext/1943/3/3/3/2|Noto Sans Kaithi/sans-serif/400/kaithi,latin,latin-ext/1944/2/2/4/1|Noto Sans NKo Unjoined/sans-serif/400,500,600,700/latin,latin-ext,nko/1945/2/2/4/1|Noto Sans Khudawadi/sans-serif/400/khudawadi,latin,latin-ext/1946/2/2/4/1|Noto Sans Rejang/sans-serif/400/latin,latin-ext,rejang/1948/2/2/4/1|Noto Sans Pahawh Hmong/sans-serif/400/latin,latin-ext,pahawh-hmong/1949/2/2/4/1|Noto Sans Buginese/sans-serif/400/buginese,latin,latin-ext/1951/2/2/4/1|Micro 5 Charted/display/400/latin,latin-ext,math,symbols/1952/3/3/3/2|Playwrite TZ/handwriting/100,200,300,400/latin/1953/0/4/3/4|Noto Sans Modi/sans-serif/400/latin,latin-ext,modi/1954/2/2/4/1|Playwrite ES Deco/handwriting/100,200,300,400/latin/1955/0/4/3/4|Noto Sans Linear B/sans-serif/400/latin,latin-ext,linear-b/1956/2/2/4/1|Noto Sans Mayan Numerals/sans-serif/400/latin,latin-ext,mayan-numerals/1957/2/2/4/1|Noto Sans Caucasian Albanian/sans-serif/400/caucasian-albanian,latin,latin-ext/1959/2/3/4/1|Jersey 25 Charted/display/400/latin,latin-ext/1960/3/3/3/2|Noto Sans Syriac Western/sans-serif/100,200,300,400,500,600,700,800,900/latin,latin-ext,syriac/1961/2/2/1/2|Bitcount Prop Single Ink/display/100,200,300,400,500,600,700,800,900/latin,latin-ext/1962/3/3/3/2|Yarndings 20/display/400/latin,math,symbols/1963/3/3/3/2|Pochaevsk/display/400/cyrillic,cyrillic-ext,latin/1964/3/3/3/2|Noto Sans Limbu/sans-serif/400/latin,latin-ext,limbu/1965/2/2/4/1|Noto Sans Inscriptional Parthian/sans-serif/400/inscriptional-parthian,latin,latin-ext/1966/2/2/4/1|Bitcount Prop Double/display/100,200,300,400,500,600,700,800,900/latin,latin-ext/1968/3/3/3/2|Noto Sans Mandaic/sans-serif/400/latin,latin-ext,mandaic/1969/2/2/4/1|Playwrite NL Guides/handwriting/400/latin/1970/2/2/3/4|Noto Sans Nushu/sans-serif/400/latin,latin-ext,nushu/1972/2/2/4/1|Tirra/sans-serif/400,500,600,700,800,900/latin,latin-ext,tifinagh/1973/2/2/1/2|Noto Sans Hatran/sans-serif/400/hatran,latin,latin-ext/1979/2/2/4/1|Bitcount Ink/display/100,200,300,400,500,600,700,800,900/latin,latin-ext/1980/3/3/3/2|Noto Sans Cypriot/sans-serif/400/cypriot,latin,latin-ext/1981/2/2/4/1|Playwrite GB J Guides/handwriting/400,400i/latin/1982/2/2/3/4|Noto Sans Psalter Pahlavi/sans-serif/400/latin,latin-ext,psalter-pahlavi/1983/2/2/4/1|Playwrite BR/handwriting/100,200,300,400/latin/1985/0/4/3/4|Noto Sans Old Turkic/sans-serif/400/latin,latin-ext,old-turkic/1986/2/2/4/1|Noto Sans Old Permic/sans-serif/400/cyrillic-ext,latin,latin-ext,old-permic/1987/2/2/4/1|Jersey 20 Charted/display/400/latin,latin-ext/1988/3/3/3/2|Noto Sans Kayah Li/sans-serif/400,500,600,700/kayah-li,latin,latin-ext/1989/2/2/4/1|Noto Sans Saurashtra/sans-serif/400/latin,latin-ext,saurashtra/1990/2/2/4/1|Noto Sans SignWriting/sans-serif/400/latin,latin-ext,signwriting/1991/0/4/4/1|Bitcount Grid Single Ink/display/100,200,300,400,500,600,700,800,900/latin,latin-ext/1992/3/3/3/2|Jersey 10 Charted/display/400/latin,latin-ext/1993/3/3/3/2|Noto Serif Dives Akuru/serif/400/dives-akuru,latin,latin-ext/1994/2/2/2/2|Playwrite DE VA/handwriting/100,200,300,400/latin/1995/0/4/2/4|Yuji Hentaigana Akebono/handwriting/400/japanese,latin,latin-ext/1996/0/4/3/4|Noto Sans Mende Kikakui/sans-serif/400/latin,latin-ext,mende-kikakui/1997/2/2/4/1|Bitcount Prop Double Ink/display/100,200,300,400,500,600,700,800,900/latin,latin-ext/1999/3/3/3/2|Noto Sans Nabataean/sans-serif/400/latin,latin-ext,nabataean/2000/2/2/4/1|Noto Sans Bassa Vah/sans-serif/400,500,600,700/bassa-vah,latin,latin-ext/2001/1/3/4/1|Noto Sans Sunuwar/sans-serif/400/latin,latin-ext,sunuwar/2003/2/2/1/2|Playwrite PL Guides/handwriting/400/latin/2004/2/2/3/4|Noto Sans Soyombo/sans-serif/400/latin,latin-ext,soyombo/2005/2/2/4/1|Noto Sans Phoenician/sans-serif/400/latin,latin-ext,phoenician/2006/2/2/4/1|Playwrite IT Trad/handwriting/100,200,300,400/latin/2007/0/4/3/4|Playwrite PT Guides/handwriting/400/latin/2008/2/2/3/4|Playwrite DE Grund Guides/handwriting/400/latin/2009/2/2/3/4|Noto Sans Manichaean/sans-serif/400/latin,latin-ext,manichaean/2010/2/2/4/1|Playwrite PE Guides/handwriting/400/latin/2011/2/2/3/4|Noto Sans Deseret/sans-serif/400/deseret,latin,latin-ext/2012/2/2/4/1|Jacquarda Bastarda 9 Charted/display/400/latin,latin-ext,math,symbols/2013/3/3/3/2|Noto Sans Ugaritic/sans-serif/400/latin,latin-ext,ugaritic/2014/2/2/4/1|Noto Sans Hanifi Rohingya/sans-serif/400,500,600,700/hanifi-rohingya,latin,latin-ext/2015/2/2/4/1|Noto Sans Tirhuta/sans-serif/400/latin,latin-ext,tirhuta/2016/2/2/4/1|Noto Sans Pau Cin Hau/sans-serif/400/latin,latin-ext,pau-cin-hau/2017/2/2/4/1|Noto Sans Ogham/sans-serif/400/latin,latin-ext,ogham/2018/2/2/4/1|Noto Sans Old Sogdian/sans-serif/400/latin,latin-ext,old-sogdian/2019/3/1/4/1|Bitcount Grid Double Ink/display/100,200,300,400,500,600,700,800,900/latin,latin-ext/2020/3/3/3/2|Noto Sans Masaram Gondi/sans-serif/400/latin,latin-ext,masaram-gondi/2021/1/3/4/1|Noto Sans Lycian/sans-serif/400/lycian/2022/0/0/3/0|Noto Sans PhagsPa/sans-serif/400/latin,latin-ext,math,phags-pa,symbols/2023/2/2/1/2|Noto Sans Lepcha/sans-serif/400/latin,latin-ext,lepcha/2024/2/2/4/1|Playwrite FR Trad/handwriting/100,200,300,400/latin/2025/0/4/3/4|Cossette Texte/sans-serif/400,700/latin,latin-ext/2026/2/2/1/2|Yarndings 12/display/400/latin,math,symbols/2027/3/3/3/2|Noto Sans Meroitic/sans-serif/400/latin,latin-ext,meroitic,meroitic-cursive,meroitic-hieroglyphs/2030/2/2/4/1|Noto Sans Kharoshthi/sans-serif/400/kharoshthi,latin,latin-ext/2031/2/2/4/1|Yarndings 12 Charted/display/400/latin,math,symbols/2032/3/3/3/2|Playwrite TZ Guides/handwriting/400/latin/2034/2/2/3/4|Playwrite IE Guides/handwriting/400/latin/2035/2/2/3/4|Noto Sans Siddham/sans-serif/400/latin,latin-ext,siddham/2036/2/2/4/1|Yarndings 20 Charted/display/400/latin,math,symbols/2037/3/3/3/2|Playwrite ZA Guides/handwriting/400/latin/2038/2/2/3/4|Playwrite BE WAL Guides/handwriting/400/latin/2039/2/2/3/4|Playwrite NZ Guides/handwriting/400/latin/2040/2/2/3/4|Playwrite IT Moderna Guides/handwriting/400/latin/2042/2/2/3/4|Playwrite US Modern Guides/handwriting/400/latin/2044/2/2/3/4|Playwrite AU VIC Guides/handwriting/400/latin/2045/2/2/3/4|Playwrite DE VA Guides/handwriting/400/latin/2046/2/2/3/4|Playwrite IT Trad Guides/handwriting/400/latin/2047/2/2/3/4|Playwrite ES Deco Guides/handwriting/400/latin/2048/2/2/3/4|Playwrite FR Moderne Guides/handwriting/400/latin/2049/2/2/3/4|Playwrite FR Trad Guides/handwriting/400/latin/2051/2/2/3/4|Playwrite AU SA Guides/handwriting/400/latin/2053/2/2/3/4|Playwrite CL Guides/handwriting/400/latin/2054/2/2/3/4|Playwrite BR Guides/handwriting/400/latin/2055/2/2/3/4|Playwrite ID Guides/handwriting/400/latin/2056/2/2/3/4|Playwrite AU QLD Guides/handwriting/400/latin/2057/2/2/3/4|Playwrite HR Guides/handwriting/400/latin/2058/2/2/3/4|Playwrite NG Modern Guides/handwriting/400/latin/2059/2/2/3/4|Playwrite ES Guides/handwriting/400/latin/2060/2/2/3/4|Playwrite HR Lijeva Guides/handwriting/400/latin/2061/2/2/3/4|Playwrite HU Guides/handwriting/400/latin/2062/2/2/3/4|Playwrite AT Guides/handwriting/400,400i/latin/2063/2/2/3/4|Playwrite AU NSW Guides/handwriting/400/latin/2064/2/2/3/4|Playwrite GB S Guides/handwriting/400,400i/latin/2065/2/2/3/4|Playwrite DK Uloopet Guides/handwriting/400/latin/2066/2/2/3/4|Playwrite CZ Guides/handwriting/400/latin/2067/2/2/3/4|Playwrite DK Loopet Guides/handwriting/400/latin/2068/2/2/3/4|Playwrite BE VLG Guides/handwriting/400/latin/2069/2/2/3/4|Playwrite DE LA Guides/handwriting/400/latin/2070/2/2/3/4|Playwrite AR Guides/handwriting/400/latin/2071/2/2/3/4|Playwrite IS Guides/handwriting/400/latin/2072/2/2/3/4|Playwrite DE SAS Guides/handwriting/400/latin/2073/2/2/3/4|Playwrite CA Guides/handwriting/400/latin/2074/2/2/3/4|Playwrite AU TAS Guides/handwriting/400/latin/2075/2/2/3/4|Playwrite SK Guides/handwriting/400/latin/2076/2/2/3/4|Playwrite NO Guides/handwriting/400/latin/2077/2/2/3/4|Playwrite RO Guides/handwriting/400/latin/2078/2/2/3/4";
const _systemFonts = "Arial/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese|Comic Sans MS/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext|Courier New/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese|Georgia/serif/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext|Helvetica/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese|Impact/sans-serif/400/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext|Tahoma/sans-serif/400,700/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese|Times New Roman/serif/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,hebrew,latin,latin-ext,vietnamese|Trebuchet MS/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext|Verdana/sans-serif/400,400i,700,700i/cyrillic,cyrillic-ext,greek,greek-ext,latin,latin-ext,vietnamese\n";
const googleFonts = _googleFonts.split("|").map(FontFamily.parse);
const systemFonts = _systemFonts.split("|").map(FontFamily.parse);
class FontLoader {
  static loaded(name) {
    return __privateGet(this, _cache).has(name);
  }
  static async load(font) {
    const family = font instanceof FontFamily ? font : null;
    const name = font instanceof FontFamily ? font.name : font;
    let promise = __privateGet(this, _cache).get(name);
    if (!promise) {
      const systemFont = systemFonts.find((sf) => sf.name === name);
      const googleFont = googleFonts.find((gf) => gf.name === name);
      if (family && family.url) {
        promise = __privateMethod(this, _FontLoader_static, loadExtraFont_fn).call(this, family);
      } else if (systemFont) {
        promise = Promise.resolve();
      } else if (googleFont) {
        promise = __privateMethod(this, _FontLoader_static, loadGoogleFont_fn).call(this, googleFont);
      } else {
        console.error(`Could not load font ${name}!`);
        promise = Promise.resolve();
      }
      __privateGet(this, _cache).set(name, promise);
    }
    await promise;
  }
}
_cache = new WeakMap();
_FontLoader_static = new WeakSet();
appendStylesheet_fn = async function(url) {
  const $link = document.createElement("link");
  $link.href = url;
  $link.rel = "stylesheet";
  $link.type = "text/css";
  document.head.append($link);
};
loadGoogleFont_fn = async function(font) {
  const url = new URL("https://fonts.googleapis.com/css");
  const name = font.name + ":" + font.variants.join(",");
  url.searchParams.set("family", name);
  url.searchParams.set("display", "swap");
  __privateMethod(this, _FontLoader_static, appendStylesheet_fn).call(this, url.toString());
  await document.fonts.load(`1em "${font.name}"`);
};
loadExtraFont_fn = async function(font) {
  const fontFace = new FontFace(font.name, `url(${font.url})`);
  document.fonts.add(await fontFace.load());
  await document.fonts.load(`1em "${font.name}"`);
};
__privateAdd(FontLoader, _FontLoader_static);
__privateAdd(FontLoader, _cache, /* @__PURE__ */ new Map());
const translations = {
  en: {
    selectFont: "Select a font",
    sampleText: "The quick brown fox jumps over the lazy dog.",
    pickHint: "Pick a font...",
    filters: "Filters",
    search: "Search",
    subsets: {
      all: "(All Subsets)",
      arabic: "Arabic",
      bengali: "Bengali",
      "chinese-hongkong": "Chinese (Hong Kong)",
      "chinese-simplified": "Chinese (Simplified)",
      "chinese-traditional": "Chinese (Traditional)",
      cyrillic: "Cyrillic",
      "cyrillic-ext": "Cyrillic Extended",
      devanagari: "Devanagari",
      greek: "Greek",
      "greek-ext": "Greek Extended",
      gujarati: "Gujarati",
      gurmukhi: "Gurmukhi",
      hebrew: "Hebrew",
      japanese: "Japanese",
      kannada: "Kannada",
      khmer: "Khmer",
      korean: "Korean",
      latin: "Latin",
      "latin-ext": "Latin Extended",
      malayalam: "Malayalam",
      myanmar: "Myanmar",
      oriya: "Oriya",
      sinhala: "Sinhala",
      tamil: "Tamil",
      telugu: "Telugu",
      thai: "Thai",
      tibetan: "Tibetan",
      vietnamese: "Vietnamese"
    },
    categories: {
      serif: "Serif",
      "sans-serif": "Sans-serif",
      display: "Display",
      handwriting: "Handwriting",
      monospace: "Monospace"
    },
    metrics: "Metrics",
    widths: {
      all: "(All Widths)",
      "0!": "Very narrow",
      "1!": "Narrow",
      "2!": "Medium width",
      "3!": "Wide",
      "4!": "Very wide"
    },
    thicknesses: {
      all: "(All Thicknesses)",
      "0!": "Very thin",
      "1!": "Thin",
      "2!": "Medium thickness",
      "3!": "Thick",
      "4!": "Very thick"
    },
    complexities: {
      all: "(All Complexities)",
      "0!": "Very Simple",
      "1!": "Simple",
      "2!": "Medium complexity",
      "3!": "Complex",
      "4!": "Very complex"
    },
    curvatures: {
      all: "(All Curvatures)",
      "0!": "Very straight",
      "1!": "Straight",
      "2!": "Medium curvature",
      "3!": "Curvy",
      "4!": "Very Curvy"
    },
    sort: "Sort",
    sorts: {
      name: "Sort by Name",
      popularity: "Sort by Popularity",
      width: "Sort by Width",
      thickness: "Sort by Thickness",
      complexity: "Sort by Complexity",
      curvature: "Sort by Curvature"
    },
    clearFilters: "Clear filters",
    clear: "Clear",
    cancel: "Cancel",
    select: "Select"
  },
  nl: {
    selectFont: "Selecteer een lettertype",
    sampleText: "Wazig tv-filmpje rond chique skybox.",
    pickHint: "Kies een lettertype...",
    filters: "Filters",
    search: "Zoeken",
    subsets: {
      all: "(Alle subsets)",
      arabic: "Arabisch",
      bengali: "Bengaals",
      "chinese-hongkong": "Chinees (Hongkong)",
      "chinese-simplified": "Chinees (Vereenvoudigd)",
      "chinese-traditional": "Chinees (Traditioneel)",
      cyrillic: "Cyrillisch",
      "cyrillic-ext": "Cyrillisch Uitgebreid",
      devanagari: "Devanagari",
      greek: "Grieks",
      "greek-ext": "Grieks Uitgebreid",
      gujarati: "Gujarati",
      gurmukhi: "Gurmukhi",
      hebrew: "Hebreeuws",
      japanese: "Japans",
      kannada: "Kannada",
      khmer: "Khmer",
      korean: "Koreaans",
      latin: "Latijn",
      "latin-ext": "Latijn Uitgebreid",
      malayalam: "Malayalam",
      myanmar: "Myanmar",
      oriya: "Oriya",
      sinhala: "Sinhala",
      tamil: "Tamil",
      telugu: "Telugu",
      thai: "Thai",
      tibetan: "Tibetaans",
      vietnamese: "Vietnamees"
    },
    categories: {
      serif: "Schreef",
      "sans-serif": "Schreefloos",
      display: "Display",
      handwriting: "Handschrift",
      monospace: "Monospace"
    },
    metrics: "Metriek",
    widths: {
      all: "(Alle breedtes)",
      "0!": "Zeer smal",
      "1!": "Smal",
      "2!": "Normale breedte",
      "3!": "Breed",
      "4!": "Zeer breed"
    },
    thicknesses: {
      all: "(Alle diktes)",
      "0!": "Zeer dun",
      "1!": "Dun",
      "2!": "Normale dikte",
      "3!": "Dik",
      "4!": "Zeer dik"
    },
    complexities: {
      all: "(Alle complexiteiten)",
      "0!": "Zeer eenvoudig",
      "1!": "Eenvoudig",
      "2!": "Normale complexiteit",
      "3!": "Complex",
      "4!": "Zeer complex"
    },
    curvatures: {
      all: "(Alle krommingen)",
      "0!": "Zeer recht",
      "1!": "Recht",
      "2!": "Normale kromming",
      "3!": "Gebogen",
      "4!": "Zeer gebogen"
    },
    sort: "Sorteren",
    sorts: {
      name: "Sorteer op naam",
      popularity: "Sorteer op populariteit",
      width: "Sorteer op breedte",
      thickness: "Sorteer op dikte",
      complexity: "Sorteer op complexiteit",
      curvature: "Sorteer op kromming"
    },
    clearFilters: "Filters wissen",
    clear: "Wissen",
    cancel: "Annuleren",
    select: "Selecteren"
  },
  de: {
    selectFont: "Schriftart auswählen",
    sampleText: "Falsches Üben von Xylophonmusik quält jeden größeren Zwerg.",
    pickHint: "Wähle eine Schriftart...",
    filters: "Filter",
    search: "Suche",
    subsets: {
      all: "(Alle Untergruppen)",
      arabic: "Arabisch",
      bengali: "Bengalisch",
      "chinese-hongkong": "Chinesisch (Hongkong)",
      "chinese-simplified": "Chinesisch (Vereinfacht)",
      "chinese-traditional": "Chinesisch (Traditionell)",
      cyrillic: "Kyrillisch",
      "cyrillic-ext": "Kyrillisch Erweitert",
      devanagari: "Devanagari",
      greek: "Griechisch",
      "greek-ext": "Griechisch Erweitert",
      gujarati: "Gujarati",
      gurmukhi: "Gurmukhi",
      hebrew: "Hebräisch",
      japanese: "Japanisch",
      kannada: "Kannada",
      khmer: "Khmer",
      korean: "Koreanisch",
      latin: "Lateinisch",
      "latin-ext": "Lateinisch Erweitert",
      malayalam: "Malayalam",
      myanmar: "Myanmar",
      oriya: "Oriya",
      sinhala: "Singhalesisch",
      tamil: "Tamil",
      telugu: "Telugu",
      thai: "Thailändisch",
      tibetan: "Tibetisch",
      vietnamese: "Vietnamesisch"
    },
    categories: {
      serif: "Serifen",
      "sans-serif": "Serifenlos",
      display: "Display",
      handwriting: "Handschrift",
      monospace: "Monospace"
    },
    metrics: "Metriken",
    widths: {
      all: "(Alle Breiten)",
      "0!": "Sehr schmal",
      "1!": "Schmal",
      "2!": "Mittlere Breite",
      "3!": "Breit",
      "4!": "Sehr breit"
    },
    thicknesses: {
      all: "(Alle Strichstärken)",
      "0!": "Sehr dünn",
      "1!": "Dünn",
      "2!": "Mittlere Stärke",
      "3!": "Dick",
      "4!": "Sehr dick"
    },
    complexities: {
      all: "(Alle Komplexitäten)",
      "0!": "Sehr einfach",
      "1!": "Einfach",
      "2!": "Mittlere Komplexität",
      "3!": "Komplex",
      "4!": "Sehr komplex"
    },
    curvatures: {
      all: "(Alle Krümmungen)",
      "0!": "Sehr gerade",
      "1!": "Gerade",
      "2!": "Mittlere Krümmung",
      "3!": "Geschwungen",
      "4!": "Sehr geschwungen"
    },
    sort: "Sortieren",
    sorts: {
      name: "Nach Name sortieren",
      popularity: "Nach Beliebtheit sortieren",
      width: "Nach Breite sortieren",
      thickness: "Nach Strichstärke sortieren",
      complexity: "Nach Komplexität sortieren",
      curvature: "Nach Krümmung sortieren"
    },
    clearFilters: "Filter löschen",
    clear: "Löschen",
    cancel: "Abbrechen",
    select: "Auswählen"
  },
  es: {
    selectFont: "Selecciona una fuente",
    sampleText: "El veloz murciélago hindú comía feliz cardillo y kiwi.",
    pickHint: "Elige una fuente...",
    filters: "Filtros",
    search: "Buscar",
    subsets: {
      all: "(Todos los subconjuntos)",
      arabic: "Árabe",
      bengali: "Bengalí",
      "chinese-hongkong": "Chino (Hong Kong)",
      "chinese-simplified": "Chino (Simplificado)",
      "chinese-traditional": "Chino (Tradicional)",
      cyrillic: "Cirílico",
      "cyrillic-ext": "Cirílico extendido",
      devanagari: "Devanagari",
      greek: "Griego",
      "greek-ext": "Griego extendido",
      gujarati: "Gujarati",
      gurmukhi: "Gurmukhi",
      hebrew: "Hebreo",
      japanese: "Japonés",
      kannada: "Canarés",
      khmer: "Jemer",
      korean: "Coreano",
      latin: "Latín",
      "latin-ext": "Latín extendido",
      malayalam: "Malayalam",
      myanmar: "Birmano",
      oriya: "Oriya",
      sinhala: "Cingalés",
      tamil: "Tamil",
      telugu: "Telugu",
      thai: "Tailandés",
      tibetan: "Tibetano",
      vietnamese: "Vietnamita"
    },
    categories: {
      serif: "Serifa",
      "sans-serif": "Sans serif",
      display: "Decorativo",
      handwriting: "Manuscrita",
      monospace: "Monoespaciada"
    },
    metrics: "Métricas",
    widths: {
      all: "(Todas las anchuras)",
      "0!": "Muy estrecha",
      "1!": "Estrecha",
      "2!": "Anchura media",
      "3!": "Ancha",
      "4!": "Muy ancha"
    },
    thicknesses: {
      all: "(Todos los grosores)",
      "0!": "Muy delgada",
      "1!": "Delgada",
      "2!": "Grosor medio",
      "3!": "Gruesa",
      "4!": "Muy gruesa"
    },
    complexities: {
      all: "(Todas las complejidades)",
      "0!": "Muy simple",
      "1!": "Simple",
      "2!": "Complejidad media",
      "3!": "Compleja",
      "4!": "Muy compleja"
    },
    curvatures: {
      all: "(Todas las curvaturas)",
      "0!": "Muy recta",
      "1!": "Recta",
      "2!": "Curvatura media",
      "3!": "Curvada",
      "4!": "Muy curvada"
    },
    sort: "Ordenar",
    sorts: {
      name: "Ordenar por nombre",
      popularity: "Ordenar por popularidad",
      width: "Ordenar por anchura",
      thickness: "Ordenar por grosor",
      complexity: "Ordenar por complejidad",
      curvature: "Ordenar por curvatura"
    },
    clearFilters: "Borrar filtros",
    clear: "Borrar",
    cancel: "Cancelar",
    select: "Seleccionar"
  },
  fr: {
    selectFont: "Sélectionnez une police",
    sampleText: "Portez ce vieux whisky au juge blond qui fume.",
    pickHint: "Choisissez une police...",
    filters: "Filtres",
    search: "Rechercher",
    subsets: {
      all: "(Tous les sous-ensembles)",
      arabic: "Arabe",
      bengali: "Bengali",
      "chinese-hongkong": "Chinois (Hong Kong)",
      "chinese-simplified": "Chinois (simplifié)",
      "chinese-traditional": "Chinois (traditionnel)",
      cyrillic: "Cyrillique",
      "cyrillic-ext": "Cyrillique étendu",
      devanagari: "Devanagari",
      greek: "Grec",
      "greek-ext": "Grec étendu",
      gujarati: "Gujarati",
      gurmukhi: "Gurmukhi",
      hebrew: "Hébreu",
      japanese: "Japonais",
      kannada: "Kannada",
      khmer: "Khmer",
      korean: "Coréen",
      latin: "Latin",
      "latin-ext": "Latin étendu",
      malayalam: "Malayalam",
      myanmar: "Myanmar",
      oriya: "Oriya",
      sinhala: "Singhalais",
      tamil: "Tamoul",
      telugu: "Telugu",
      thai: "Thaï",
      tibetan: "Tibétain",
      vietnamese: "Vietnamien"
    },
    categories: {
      serif: "Empattement",
      "sans-serif": "Sans empattement",
      display: "Décoratives",
      handwriting: "Écriture manuscrite",
      monospace: "Monospace"
    },
    metrics: "Métriques",
    widths: {
      all: "(Toutes les largeurs)",
      "0!": "Très étroit",
      "1!": "Étroit",
      "2!": "Largeur moyenne",
      "3!": "Large",
      "4!": "Très large"
    },
    thicknesses: {
      all: "(Toutes les épaisseurs)",
      "0!": "Très fin",
      "1!": "Fin",
      "2!": "Épaisseur moyenne",
      "3!": "Épais",
      "4!": "Très épais"
    },
    complexities: {
      all: "(Toutes les complexités)",
      "0!": "Très simple",
      "1!": "Simple",
      "2!": "Complexité moyenne",
      "3!": "Complexe",
      "4!": "Très complexe"
    },
    curvatures: {
      all: "(Toutes les courbures)",
      "0!": "Très droit",
      "1!": "Droit",
      "2!": "Courbure moyenne",
      "3!": "Courbé",
      "4!": "Très courbé"
    },
    sort: "Trier",
    sorts: {
      name: "Trier par nom",
      popularity: "Trier par popularité",
      width: "Trier par largeur",
      thickness: "Trier par épaisseur",
      complexity: "Trier par complexité",
      curvature: "Trier par courbure"
    },
    clearFilters: "Effacer filtres",
    clear: "Effacer",
    cancel: "Annuler",
    select: "Sélectionner"
  }
};
const configOverrides = /* @__PURE__ */ new Map();
class PickerDialog {
  constructor(parent) {
    __publicField(this, "opened", false);
    __publicField(this, "picker");
    __publicField(this, "config");
    __publicField(this, "override");
    __publicField(this, "observer");
    __publicField(this, "selected");
    __publicField(this, "hovered", null);
    __publicField(this, "modal");
    __publicField(this, "$modal");
    __publicField(this, "$modalBackdrop");
    __publicField(this, "$closeBtn");
    __publicField(this, "$search");
    __publicField(this, "$subset");
    __publicField(this, "$categories");
    __publicField(this, "$width");
    __publicField(this, "$thickness");
    __publicField(this, "$complexity");
    __publicField(this, "$curvature");
    __publicField(this, "$sort");
    __publicField(this, "$sortOrder");
    __publicField(this, "$preview");
    __publicField(this, "$fonts");
    __publicField(this, "$variants");
    __publicField(this, "$filtersText");
    __publicField(this, "$metricsText");
    __publicField(this, "$sortText");
    __publicField(this, "$clearFiltersBtn");
    __publicField(this, "$cancelBtn");
    __publicField(this, "$clearBtn");
    __publicField(this, "$pickBtn");
    this.createLayout(parent);
    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const $target = entry.target;
        if (entry.isIntersecting && !$target.childElementCount) {
          const family = this.getFamilyFor($target);
          if (!family) continue;
          hydrateFont($target, family);
          FontLoader.load(family);
        } else if (!entry.isIntersecting && $target.childElementCount) {
          $target.textContent = "";
        }
      }
    });
  }
  createLayout(parent) {
    parent.insertAdjacentHTML("afterbegin", dialogContent);
    this.$modal = document.querySelector("#fp__modal");
    this.$modalBackdrop = document.querySelector("#fp__backdrop");
    this.$closeBtn = this.$modal.querySelector("#fp__close");
    this.$search = this.$modal.querySelector("#fp__search");
    this.$subset = this.$modal.querySelector("#fp__subsets");
    this.$categories = this.$modal.querySelector("#fp__categories");
    this.$width = this.$modal.querySelector("#fp__width");
    this.$thickness = this.$modal.querySelector("#fp__thickness");
    this.$complexity = this.$modal.querySelector("#fp__complexity");
    this.$curvature = this.$modal.querySelector("#fp__curvature");
    this.$sort = this.$modal.querySelector("#fp__sort");
    this.$sortOrder = this.$modal.querySelector("#fp__sort-order");
    this.$preview = this.$modal.querySelector("#fp__preview");
    this.$fonts = this.$modal.querySelector("#fp__fonts");
    this.$variants = this.$modal.querySelector("#fp__variants");
    this.$clearFiltersBtn = this.$modal.querySelector("#fp__clear-filters");
    this.$cancelBtn = this.$modal.querySelector("#fp__cancel");
    this.$clearBtn = this.$modal.querySelector("#fp__clear");
    this.$pickBtn = this.$modal.querySelector("#fp__pick");
    this.$filtersText = this.$modal.querySelector("#fp__t-filters");
    this.$metricsText = this.$modal.querySelector("#fp__t-metrics");
    this.$sortText = this.$modal.querySelector("#fp__t-sort");
    this.modal = new Modal(this.$modal);
    new Accordion(this.$modal.querySelector(".fpb__accordion"));
  }
  getElementFor(family) {
    const $font = this.$fonts.querySelector(`[data-family="${family.name}"]`);
    if (!$font) throw new Error(`Could not find element for '${family.name}'!`);
    return $font;
  }
  getFamilyFor($element) {
    const name = $element.dataset.family;
    if (!name) return null;
    return this.picker.getFamily(name);
  }
  getFamilies() {
    return Array.from(this.picker.families.values());
  }
  sortFamilies(orderBy, reverse = false) {
    const families = this.getFamilies();
    const sorted = families.sort((a, b) => familySort(a, b, orderBy));
    if (reverse) sorted.reverse();
    for (const family of sorted) {
      this.$fonts.append(this.getElementFor(family));
    }
    for (const favourite of this.picker.favourites) {
      const $favourite = this.getElementFor(favourite);
      this.$fonts.prepend($favourite);
    }
    if (this.selected) {
      const $selected = this.getElementFor(this.selected.family);
      this.$fonts.prepend($selected);
    }
    this.$fonts.scrollTop = 0;
  }
  filterFamilies(filters) {
    const families = this.getFamilies();
    const filtered = families.filter((a) => familyFilter(a, filters));
    const familyNames = filtered.map((filtered2) => filtered2.name);
    for (const $font of this.$fonts.children) {
      const name = $font.dataset.family;
      const hidden = !familyNames.includes(name);
      $font.classList.toggle("fpb__hidden", hidden);
    }
  }
  updateSort() {
    const orderBy = this.$sort.value;
    const reverse = this.$sortOrder.checked;
    this.sortFamilies(orderBy, reverse);
  }
  updateFilter() {
    this.filterFamilies({
      name: this.$search.value,
      subset: this.$subset.value,
      categories: getActiveBadges(this.$categories),
      complexity: this.$complexity.value,
      curvature: this.$curvature.value,
      thickness: this.$thickness.value,
      width: this.$width.value
    });
  }
  updatePreview() {
    const font = this.hovered ?? this.selected;
    if (font) {
      this.$preview.style.fontFamily = `"${font.family}"`;
      this.$preview.style.fontWeight = font.weight.toString();
      this.$preview.style.fontStyle = font.style;
    } else {
      this.$preview.style.removeProperty("font-family");
      this.$preview.style.removeProperty("font-weight");
      this.$preview.style.removeProperty("font-style");
    }
  }
  selectFont(font) {
    for (const $font of this.$fonts.querySelectorAll(".fp__selected")) {
      $font.classList.remove("fp__selected");
    }
    this.selected = font;
    if (!font) return;
    this.getElementFor(font.family).classList.add("fp__selected");
    if (!this.config.variants) return;
    this.$variants.textContent = "";
    this.$variants.append(...createVariants(font.family.variants));
    const $weight = this.$variants.querySelector(`#fp__weight-${font.weight}`);
    const $italic = this.$variants.querySelector("#fp__italic");
    if (!$weight) throw new Error("Could not find weight button for selected font.");
    if (!$italic) throw new Error("Could not find italic button for selected font.");
    $weight.checked = true;
    $italic.checked = font.italic;
    this.updateVariant();
  }
  favouriteFont(font) {
    const $family = this.getElementFor(font.family);
    const value = $family.classList.toggle("fp__fav");
    this.picker.markFavourite(font.family, value);
  }
  updateVariant() {
    if (!this.config.variants) return;
    if (!this.selected) return;
    const $weight = this.$variants.querySelector("[name=fp__weight]:checked");
    const $italic = this.$variants.querySelector("#fp__italic");
    if (!$weight) throw new Error("Could not find weight button for selected font.");
    if (!$italic) throw new Error("Could not find italic button for selected font.");
    let weight = parseInt($weight.value);
    let italic = $italic.checked;
    const hasRegular = this.selected.family.variants.includes(`${weight}`);
    const hasItalic = this.selected.family.variants.includes(`${weight}i`);
    $italic.disabled = !hasRegular || !hasItalic;
    if (!hasRegular) italic = true;
    if (!hasItalic) italic = false;
    $italic.checked = italic;
    this.selected = new Font(this.selected.family, weight, italic);
    this.updatePreview();
  }
  createLazyFontList() {
    for (const font of this.getFamilies()) {
      const $item = createLazyFont(font);
      this.$fonts.append($item);
      this.observer.observe($item);
    }
  }
  applyTranslations() {
    const dict = translations[this.config.language];
    this.$search.placeholder = dict.search;
    this.$modal.querySelector("#fp__title").textContent = dict.selectFont;
    this.$subset.append(...createOptions(dict.subsets));
    this.$categories.append(...createBadges(dict.categories));
    this.$width.append(...createOptions(dict.widths));
    this.$thickness.append(...createOptions(dict.thicknesses));
    this.$complexity.append(...createOptions(dict.complexities));
    this.$curvature.append(...createOptions(dict.curvatures));
    this.$sort.append(...createOptions(dict.sorts));
    this.$preview.textContent = this.config.previewText ?? dict.sampleText;
    this.$filtersText.textContent = dict.filters;
    this.$metricsText.textContent = dict.metrics;
    this.$sortText.textContent = dict.sort;
    this.$modal.querySelector("#fp__t-clear-filters").textContent = dict.clearFilters;
    this.$modal.querySelector("#fp__t-cancel").textContent = dict.cancel;
    this.$modal.querySelector("#fp__t-clear").textContent = dict.clear;
    this.$modal.querySelector("#fp__t-pick").textContent = dict.select;
  }
  onFontHover(event) {
    var _a;
    const family = this.getFamilyFor(event.target);
    if (!family) return;
    if (family === ((_a = this.selected) == null ? void 0 : _a.family)) {
      this.hovered = null;
    } else {
      this.hovered = Font.parse(family);
    }
    this.updatePreview();
  }
  onFontUnhover(event) {
    if (!this.getFamilyFor(event.target)) return;
    this.hovered = null;
    this.updatePreview();
  }
  onFontClick(event) {
    var _a;
    const $target = event.target;
    if ($target.classList.contains("fp__heart")) {
      const family2 = this.getFamilyFor($target.parentElement);
      if (!family2) return;
      const font = Font.parse(family2);
      this.selectFont(font);
      this.favouriteFont(font);
      return;
    }
    const family = this.getFamilyFor($target);
    if (!family || family === ((_a = this.selected) == null ? void 0 : _a.family)) return;
    this.selectFont(Font.parse(family));
  }
  onFontDoubleClick(event) {
    if (!this.getFamilyFor(event.target)) return;
    this.submit();
  }
  selectClosestFont(excluded, reverse, $from) {
    if (!this.selected) {
      this.$fonts.firstElementChild.click();
      return;
    }
    let $target = $from ? $from : this.getElementFor(this.selected.family);
    while (excluded || $target.classList.contains("fpb__hidden")) {
      excluded = false;
      const $next = reverse ? $target.previousElementSibling : $target.nextElementSibling;
      if (!$next) return;
      $target = $next;
    }
    this.hovered = null;
    $target.click();
    $target.scrollIntoView({
      behavior: "instant",
      block: "center"
    });
  }
  selectClosestVariant(reverse) {
    var _a, _b;
    const $origin = this.$variants.querySelector("[name=fp__weight]:checked");
    const $next = reverse ? (_a = $origin == null ? void 0 : $origin.previousElementSibling) == null ? void 0 : _a.previousElementSibling : (_b = $origin == null ? void 0 : $origin.nextElementSibling) == null ? void 0 : _b.nextElementSibling;
    if (!$next) return;
    const $target = $next;
    $target.checked = !$target.checked;
    this.updateVariant();
  }
  toggleVariantItalic() {
    const $target = this.$variants.querySelector("#fp__italic");
    if (!$target) return;
    $target.checked = !$target.checked;
    this.updateVariant();
  }
  onKeyPressed(event) {
    if (!this.opened) return;
    const $target = event.target;
    if ($target && $target !== this.$modal && !this.$fonts.contains($target)) {
      return;
    }
    let handled = true;
    if (event.key === "Escape") {
      this.cancel();
    } else if (event.key === "f") {
      if (this.selected) this.favouriteFont(this.selected);
    } else if (event.key === "PageUp") {
      this.selectClosestFont(false, false, this.$fonts.firstElementChild);
    } else if (event.key === "PageDown") {
      this.selectClosestFont(false, true, this.$fonts.lastElementChild);
    } else if (event.key === "ArrowUp") {
      this.selectClosestFont(true, true, null);
    } else if (event.key === "ArrowDown") {
      this.selectClosestFont(true, false, null);
    } else if (event.key === "ArrowLeft") {
      this.selectClosestVariant(true);
    } else if (event.key === "ArrowRight") {
      this.selectClosestVariant(false);
    } else if (event.key === "i") {
      this.toggleVariantItalic();
    } else if (event.key === "/") {
      this.$search.focus();
    } else if (event.key === "Enter") {
      this.submit();
    } else {
      handled = false;
    }
    if (handled) event.preventDefault();
  }
  bindEvents() {
    var _a, _b;
    const filtersCallback = () => {
      this.filtersChanged(this.$filtersText);
      this.updateFilter();
    };
    this.$categories.addEventListener("input", filtersCallback);
    this.$search.addEventListener("input", filtersCallback);
    this.$subset.addEventListener("input", filtersCallback);
    const metricsCallback = () => {
      this.filtersChanged(this.$metricsText);
      this.updateFilter();
    };
    this.$width.addEventListener("input", metricsCallback);
    this.$thickness.addEventListener("input", metricsCallback);
    this.$complexity.addEventListener("input", metricsCallback);
    this.$curvature.addEventListener("input", metricsCallback);
    const sortCallback = () => {
      this.filtersChanged(this.$sortText);
      this.updateSort();
    };
    this.$sort.addEventListener("input", sortCallback);
    this.$sortOrder.addEventListener("input", sortCallback);
    this.$fonts.addEventListener("mouseover", (event) => this.onFontHover(event));
    this.$fonts.addEventListener("mouseout", (event) => this.onFontUnhover(event));
    this.$fonts.addEventListener("click", (event) => this.onFontClick(event));
    this.$fonts.addEventListener("dblclick", (event) => this.onFontDoubleClick(event));
    this.$variants.addEventListener("input", () => this.updateVariant());
    this.$clearFiltersBtn.addEventListener("click", () => {
      this.override = {};
      this.assignDefaults();
    });
    this.$pickBtn.addEventListener("click", () => this.submit());
    (_a = this.$clearBtn) == null ? void 0 : _a.addEventListener("click", () => this.clear());
    (_b = this.$cancelBtn) == null ? void 0 : _b.addEventListener("click", () => this.cancel());
    this.$modalBackdrop.addEventListener("click", () => this.cancel());
    this.$closeBtn.addEventListener("click", () => this.cancel());
    this.$modal.addEventListener("keydown", (event) => this.onKeyPressed(event));
  }
  applyConfiguration() {
    this.picker.favourites.forEach((family) => this.getElementFor(family).classList.add("fp__fav"));
    this.$variants.classList.toggle("fpb__hidden", !this.config.variants);
    if (!this.config.showClearButton) this.$clearBtn.remove();
    if (!this.config.showCancelButton) this.$cancelBtn.remove();
  }
  filtersChanged($target) {
    if ($target) {
      $target.classList.add("fp__changed");
    } else {
      this.$filtersText.classList.remove("fp__changed");
      this.$metricsText.classList.remove("fp__changed");
      this.$sortText.classList.remove("fp__changed");
    }
    this.$clearFiltersBtn.classList.toggle("fpb__hidden", !$target);
  }
  assignDefaults() {
    const config = { ...this.config, ...this.override };
    this.$search.value = config.defaultSearch;
    setActiveBadges(this.$categories, config.defaultCategories);
    this.$subset.value = config.defaultSubset;
    this.$width.value = config.defaultWidth;
    this.$thickness.value = config.defaultThickness;
    this.$complexity.value = config.defaultComplexity;
    this.$curvature.value = config.defaultCurvature;
    this.$sort.value = config.sortBy;
    this.$sortOrder.checked = config.sortReverse;
    this.updateSort();
    this.updateFilter();
    this.filtersChanged(null);
    if (!Object.values(this.override).length) return;
    if (this.override.defaultSearch !== void 0 || this.override.defaultCategories !== void 0 || this.override.defaultSubset !== void 0)
      this.filtersChanged(this.$filtersText);
    if (this.override.defaultWidth !== void 0 || this.override.defaultThickness !== void 0 || this.override.defaultComplexity !== void 0 || this.override.defaultCurvature !== void 0)
      this.filtersChanged(this.$metricsText);
    if (this.override.sortBy !== void 0 || this.override.sortReverse !== void 0)
      this.filtersChanged(this.$sortText);
  }
  storeDefaults() {
    var _a;
    const override = {};
    const defaultSearch = this.$search.value;
    if (defaultSearch !== this.config.defaultSearch) override.defaultSearch = defaultSearch;
    const defaultCategories = getActiveBadges(this.$categories);
    if (JSON.stringify(defaultCategories.toSorted()) !== JSON.stringify((_a = this.config.defaultCategories) == null ? void 0 : _a.toSorted()))
      override.defaultCategories = defaultCategories;
    const defaultSubset = this.$subset.value;
    if (defaultSubset !== this.config.defaultSubset) override.defaultSubset = defaultSubset;
    const defaultWidth = this.$width.value;
    if (defaultWidth !== this.config.defaultWidth) override.defaultWidth = defaultWidth;
    const defaultThickness = this.$thickness.value;
    if (defaultThickness !== this.config.defaultThickness)
      override.defaultThickness = defaultThickness;
    const defaultComplexity = this.$complexity.value;
    if (defaultComplexity !== this.config.defaultComplexity)
      override.defaultComplexity = defaultComplexity;
    const defaultCurvature = this.$curvature.value;
    if (defaultCurvature !== this.config.defaultCurvature)
      override.defaultCurvature = defaultCurvature;
    const sortBy = this.$sort.value;
    if (sortBy !== this.config.sortBy) override.sortBy = sortBy;
    const sortReverse = this.$sortOrder.checked;
    if (sortReverse !== this.config.sortReverse) override.sortReverse = sortReverse;
    configOverrides.set(this.config.stateKey, override);
  }
  async open(picker) {
    if (this.opened) return;
    this.opened = true;
    this.picker = picker;
    this.config = this.picker.getConfig();
    this.override = configOverrides.get(this.config.stateKey) ?? {};
    this.applyTranslations();
    this.bindEvents();
    this.createLazyFontList();
    this.selectFont(picker.font);
    this.applyConfiguration();
    this.assignDefaults();
    requestAnimationFrame(() => {
      this.modal.open();
      this.picker.emit("open");
      this.modal.once("opened", () => {
        this.picker.emit("opened");
        this.$fonts.focus();
      });
    });
    this.modal.once("closed", () => {
      this.picker.emit("close");
      this.$modal.remove();
      this.$modalBackdrop.remove();
    });
    await new Promise((resolve) => {
      this.modal.once("closing", () => resolve());
    });
    this.storeDefaults();
  }
  submit() {
    this.picker.setFont(
      this.selected,
      true
      /* Emit events */
    );
    this.close();
  }
  clear() {
    this.picker.clear(
      true
      /* Emit events */
    );
    this.close();
  }
  cancel() {
    this.picker.emit("cancel");
    this.close();
  }
  close() {
    this.opened = false;
    this.modal.close();
  }
  destroy() {
    this.$modal.remove();
  }
}
let pickerDialog = null;
class FontPicker extends EventEmitter {
  constructor(el, config = {}) {
    super();
    __publicField(this, "$el");
    __publicField(this, "$inputEl");
    __publicField(this, "orgInputType");
    __publicField(this, "_font");
    __publicField(this, "_families");
    __publicField(this, "_favourites");
    __publicField(this, "_config", {
      language: "en",
      container: document.body,
      previewText: null,
      font: null,
      verbose: false,
      variants: true,
      favourites: [],
      saveFavourites: true,
      storageKey: "fp__favourites",
      stateKey: "default",
      defaultSearch: "",
      defaultSubset: "all",
      defaultCategories: ["display", "handwriting", "monospace", "sans-serif", "serif"],
      defaultWidth: "all",
      defaultThickness: "all",
      defaultComplexity: "all",
      defaultCurvature: "all",
      sortBy: "popularity",
      sortReverse: false,
      googleFonts: null,
      systemFonts: null,
      extraFonts: [],
      showCancelButton: true,
      showClearButton: false
    });
    __publicField(this, "clickHandler");
    __publicField(this, "changeHandler");
    this.$el = typeof el === "string" ? document.querySelector(el) : el;
    if (this.$el instanceof HTMLInputElement) {
      this.orgInputType = this.$el.type;
      if (this.$el.value) {
        config.font = this.$el.value;
      }
      const $wrap = document.createElement("button");
      $wrap.setAttribute("type", "button");
      this.$el.after($wrap);
      this.$inputEl = this.$el;
      this.$inputEl.type = "hidden";
      this.$el = $wrap;
      this.changeHandler = () => this.setFont(this.$inputEl.value);
      this.$inputEl.addEventListener("change", this.changeHandler);
    } else if (this.$el.dataset.font) {
      config.font = this.$el.dataset.font;
    }
    this.$el.classList.add("font-picker", "fpb__input", "fpb__dropdown");
    this.clickHandler = this.open.bind(this);
    this.$el.addEventListener("click", this.clickHandler);
    this.configure(config);
    this.initialize();
  }
  get font() {
    return this._font;
  }
  get families() {
    return this._families;
  }
  get favourites() {
    return this._favourites;
  }
  getConfig() {
    return { ...this._config };
  }
  configure(options) {
    if ("container" in options && options.container && !(options.container instanceof HTMLElement)) {
      options.container = document.querySelector(options.container) ?? void 0;
    }
    Object.assign(this._config, options);
    const keys = Object.keys(options);
    if (!this.families || keys.includes("googleFonts") || keys.includes("systemFonts") || keys.includes("extraFonts")) {
      this.updateFamilies();
    }
    if (!this.font || keys.includes("font")) {
      this.setFont(this._config.font);
    }
  }
  initialize() {
    const favourites = this._config.favourites.slice();
    if (this._config.saveFavourites) {
      const names = localStorage.getItem(this._config.storageKey);
      if (names) favourites.push(...JSON.parse(names));
    }
    this._favourites = /* @__PURE__ */ new Set();
    for (const name of favourites) {
      try {
        const family = this.getFamily(name);
        this._favourites.add(family);
      } catch (error) {
        console.warn(`Font from favourites is not available: '${name}'!`);
      }
    }
  }
  updateFamilies() {
    const families = [
      ...googleFonts.filter((font) => {
        var _a;
        return ((_a = this._config.googleFonts) == null ? void 0 : _a.includes(font.name)) ?? true;
      }),
      ...systemFonts.filter((font) => {
        var _a;
        return ((_a = this._config.systemFonts) == null ? void 0 : _a.includes(font.name)) ?? true;
      }),
      ...this._config.extraFonts.map((font) => new FontFamily(font))
    ];
    this._families = /* @__PURE__ */ new Map();
    families.forEach((family) => this.families.set(family.name, family));
  }
  getFamily(name) {
    const family = this.families.get(name);
    if (!family) throw new Error(`Could not find font family '${name}'!`);
    return family;
  }
  setFont(font, emit = false) {
    if (!font) {
      this._font = null;
    } else if (font instanceof Font) {
      this._font = font;
    } else if (typeof font === "string") {
      const [name, variant] = font.split(":");
      const family = this.getFamily(name);
      this._font = Font.parse(family, variant);
    } else {
      this._font = Font.parse(font);
    }
    if (this.font) {
      if (!this.font.family.variants.includes(this.font.variant)) {
        const variant = this.font.family.getDefaultVariant();
        console.warn(
          `Variant ${this.font.variant} not supported by '${this.font.family.name}', falling back to ${variant}.`
        );
        this._font = Font.parse(this.font.family, variant);
      }
      const text = this._config.verbose ? this.font.toString() : this.font.toConcise();
      this.$el.textContent = text;
      this.$el.dataset.font = this.font.toId();
      if (this.$inputEl) {
        this.$inputEl.value = this.font.toId();
      }
      this.$el.style.fontFamily = `"${this.font.family}"`;
      this.$el.style.fontWeight = this.font.weight.toString();
      this.$el.style.fontStyle = this.font.style;
      FontLoader.load(this.font.family);
    } else {
      this.$el.textContent = translations[this._config.language].pickHint;
      this.$el.dataset.font = "";
      if (this.$inputEl) {
        this.$inputEl.value = "";
      }
      this.$el.style.removeProperty("font-family");
      this.$el.style.removeProperty("font-weight");
      this.$el.style.removeProperty("font-style");
    }
    if (emit) {
      this.emit("pick", this.font);
      if (this.$inputEl) {
        this.$inputEl.dispatchEvent(new Event("change"));
      }
    }
  }
  clear(emit) {
    this.setFont(null, emit);
    if (emit) this.emit("clear");
  }
  markFavourite(family, value) {
    if (value === void 0) value = !this.favourites.has(family);
    if (value) {
      this.favourites.add(family);
    } else {
      this.favourites.delete(family);
    }
    if (this._config.saveFavourites) {
      const data = Array.from(this.favourites).map((font) => font.name);
      localStorage.setItem(this._config.storageKey, JSON.stringify(data));
    }
    return value;
  }
  async open() {
    this.close();
    pickerDialog = new PickerDialog(this._config.container);
    await pickerDialog.open(this);
    pickerDialog = null;
    return this.font;
  }
  async close() {
    pickerDialog == null ? void 0 : pickerDialog.close();
  }
  destroy() {
    this.close();
    pickerDialog == null ? void 0 : pickerDialog.destroy();
    if (this.changeHandler) this.$el.removeEventListener("change", this.changeHandler);
    if (this.clickHandler) this.$el.removeEventListener("click", this.clickHandler);
    this.$el.classList.remove("font-picker", "fpb__input", "fpb__dropdown");
    this.$el.removeAttribute("data-font");
    this.$el.style.removeProperty("font-family");
    this.$el.style.removeProperty("font-weight");
    this.$el.style.removeProperty("font-style");
    if (this.$inputEl) {
      this.$inputEl.type = this.orgInputType;
      this.$el.remove();
    }
  }
}
__publicField(FontPicker, "FontLoader", FontLoader);
export {
  FontPicker as default
};
