// Uniform v0.5.1
// Written by Luke Morton, MIT licensed.
// https://github.com/DrPheltRight/uniform
!function (definition) {
  var context = this,
    old = context.Uniform;

  if (typeof define == 'function' && typeof define.amd == 'object') {
    define(['require'], definition);
  } else {
    context.Uniform = definition(function (jQuery) {
      // This is a fake require for jQuery
      return context['$'];
    });

    context.Uniform.no_conflict = function () {
      context.Uniform = old;
      return this;
    };
  }
}(function(require) {
// Generated by CoffeeScript 1.3.3
var Uniform,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Uniform = (function() {
  var delegate_event, is_array, ns_event;

  Uniform.unique_counter = 0;

  Uniform.create_class = function(methods) {
    var klass, method, method_name;
    klass = (function(_super) {

      __extends(_Class, _super);

      function _Class() {
        if (methods.constructor !== Object) {
          methods.constructor.apply(this, arguments);
        } else {
          _Class.__super__.constructor.apply(this, arguments);
        }
      }

      return _Class;

    })(this);
    for (method_name in methods) {
      method = methods[method_name];
      if (method_name !== 'constructor') {
        klass.prototype[method_name] = method;
      }
    }
    return klass;
  };

  function Uniform(settings) {
    var key, val;
    for (key in settings) {
      val = settings[key];
      if (key === 'el' || key === '$' || key === 'ns' || key === 'uid') {
        this[key] = val;
      }
    }
    this.el || (this.el = null);
    this.$ || (this.$ = Uniform.$);
    this.ns || (this.ns = 'Uniform');
    this.uid || (this.uid = ++Uniform.unique_counter);
    this.delegated_events = [];
    this.build_template(function() {
      return this.init();
    });
  }

  Uniform.prototype.template = function(built) {
    return built('');
  };

  Uniform.prototype.build_template = function(callback) {
    var _ref,
      _this = this;
    if (((_ref = this.el) != null ? _ref.length : void 0) != null) {
      callback.call(this);
    } else {
      this.template(function(view) {
        _this.el = _this.$(view);
        return callback.call(_this);
      });
    }
    return this;
  };

  Uniform.prototype.init = function() {
    this.cache_elements();
    return this.delegate_events();
  };

  Uniform.prototype.elements = function(add) {
    return {};
  };

  Uniform.prototype.find = function(sel) {
    return this.el.find(sel);
  };

  Uniform.prototype.cache_elements = function() {
    var add, name, sel, _ref,
      _this = this;
    add = function(name, selector) {
      _this[name] = _this.find(selector);
      return {};
    };
    _ref = this.elements(add);
    for (name in _ref) {
      sel = _ref[name];
      add(name, sel);
    }
    return this;
  };

  Uniform.prototype.events = function(add) {
    return {};
  };

  ns_event = function(event_type) {
    if (event_type == null) {
      event_type = '';
    }
    return "" + event_type + "." + this.ns + this.uid;
  };

  is_array = function(arg) {
    if (Array.isArray != null) {
      return Array.isArray(arg);
    }
    return Object.prototype.toString.call(arg) === '[object Array]';
  };

  delegate_event = function(event_type, selector, callback) {
    var args, el, scope;
    if (typeof selector === 'string') {
      el = this.el;
    } else {
      el = this.$(selector);
      selector = '';
    }
    args = [ns_event.call(this, event_type)];
    if (selector !== '') {
      args.push(selector);
    }
    scope = this;
    if (typeof callback === 'string') {
      callback = this[callback];
    }
    args.push(function() {
      var callback_args;
      callback_args = Array.prototype.slice.call(arguments);
      callback_args.unshift(this);
      return callback.apply(scope, callback_args);
    });
    el.on.apply(el, args);
    return this.delegated_events.push([el].concat(args));
  };

  Uniform.prototype.delegate_events = function() {
    var add, callback, event_type, events, selector, _ref,
      _this = this;
    this.undelegate_events();
    add = function(selector, event_type, callback) {
      var _ref;
      if (callback == null) {
        _ref = ['', selector, event_type], selector = _ref[0], event_type = _ref[1], callback = _ref[2];
      }
      delegate_event.call(_this, event_type, selector, callback);
      return {};
    };
    _ref = this.events(add);
    for (selector in _ref) {
      events = _ref[selector];
      for (event_type in events) {
        callback = events[event_type];
        add(selector, event_type, callback);
      }
    }
    return this;
  };

  Uniform.prototype.undelegate_events = function() {
    var delegated_event, el, event_type;
    while (delegated_event = this.delegated_events.pop()) {
      el = delegated_event[0], event_type = delegated_event[1];
      el.off(event_type);
    }
    return this;
  };

  Uniform.prototype.destroy = function() {
    this.undelegate_events();
    this.el.remove();
    this.el = null;
    return this;
  };

  return Uniform;

})();

Uniform.$ = require('jquery');
return Uniform;
});