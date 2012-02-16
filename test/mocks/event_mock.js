(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  this.EventMock = (function(_super) {

    __extends(_Class, _super);

    _Class.prototype.events = {
      '': {
        anEvent: function(el, e) {
          return this.eventsTriggered.push('anEvent');
        }
      }
    };

    function _Class() {
      _Class.__super__.constructor.apply(this, arguments);
      this.eventsTriggered = [];
    }

    return _Class;

  })(Uniform);

}).call(this);
