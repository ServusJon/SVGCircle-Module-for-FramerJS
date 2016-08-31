require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"circleModule":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Circle = (function(superClass) {
  extend(Circle, superClass);

  Circle.prototype.currentValue = null;

  function Circle(options) {
    var base, base1, base2, base3, base4, base5, base6, base7, base8, counter, numberDuration, numberEnd, numberInterval, numberNow, numberStart, self, style;
    this.options = options != null ? options : {};
    if ((base = this.options).circleSize == null) {
      base.circleSize = 300;
    }
    if ((base1 = this.options).strokeWidth == null) {
      base1.strokeWidth = 24;
    }
    if ((base2 = this.options).strokeColor == null) {
      base2.strokeColor = "#fc245c";
    }
    if ((base3 = this.options).topColor == null) {
      base3.topColor = null;
    }
    if ((base4 = this.options).bottomColor == null) {
      base4.bottomColor = null;
    }
    if ((base5 = this.options).hasCounter == null) {
      base5.hasCounter = null;
    }
    if ((base6 = this.options).counterColor == null) {
      base6.counterColor = "#fff";
    }
    if ((base7 = this.options).counterFontSize == null) {
      base7.counterFontSize = 60;
    }
    if ((base8 = this.options).hasLinearEasing == null) {
      base8.hasLinearEasing = null;
    }
    this.options.value = 2;
    this.options.viewBox = this.options.circleSize + this.options.strokeWidth;
    Circle.__super__.constructor.call(this, this.options);
    this.backgroundColor = "";
    this.height = this.options.viewBox;
    this.width = this.options.viewBox;
    this.rotation = -90;
    this.pathLength = Math.PI * this.options.circleSize;
    this.circleID = "circle" + Math.floor(Math.random() * 1000);
    this.gradientID = "circle" + Math.floor(Math.random() * 1000);
    if (this.options.hasCounter !== null) {
      counter = new Layer({
        parent: this,
        html: "",
        width: this.width,
        height: this.height,
        backgroundColor: "",
        rotation: 90,
        color: this.options.counterColor
      });
      style = {
        textAlign: "center",
        fontSize: this.options.counterFontSize + "px",
        lineHeight: this.height + "px",
        fontWeight: "600",
        fontFamily: "-apple-system, Helvetica, Arial, sans-serif",
        boxSizing: "border-box",
        height: this.height
      };
      counter.style = style;
      numberStart = 0;
      numberEnd = 100;
      numberDuration = 2;
      numberNow = numberStart;
      numberInterval = numberEnd - numberStart;
    }
    this.html = "<svg viewBox='-" + (this.options.strokeWidth / 2) + " -" + (this.options.strokeWidth / 2) + " " + this.options.viewBox + " " + this.options.viewBox + "' >\n	<defs>\n	    <linearGradient id='" + this.gradientID + "' >\n	        <stop offset=\"0%\" stop-color='" + (this.options.topColor !== null ? this.options.bottomColor : this.options.strokeColor) + "'/>\n	        <stop offset=\"100%\" stop-color='" + (this.options.topColor !== null ? this.options.topColor : this.options.strokeColor) + "' stop-opacity=\"1\" />\n	    </linearGradient>\n	</defs>\n	<circle id='" + this.circleID + "'\n			fill='none'\n			stroke-linecap='round'\n			stroke-width      = '" + this.options.strokeWidth + "'\n			stroke-dasharray  = '" + this.pathLength + "'\n			stroke-dashoffset = '0'\n			stroke=\"url(#" + this.gradientID + ")\"\n			stroke-width=\"10\"\n			cx = '" + (this.options.circleSize / 2) + "'\n			cy = '" + (this.options.circleSize / 2) + "'\n			r  = '" + (this.options.circleSize / 2) + "'>\n</svg>";
    self = this;
    Utils.domComplete(function() {
      return self.path = document.querySelector("#" + self.circleID);
    });
    this.proxy = new Layer({
      opacity: 0
    });
    this.proxy.on(Events.AnimationEnd, function(animation, layer) {
      return self.onFinished();
    });
    this.proxy.on('change:x', function() {
      var offset;
      offset = Utils.modulate(this.x, [0, 500], [self.pathLength, 0]);
      self.path.setAttribute('stroke-dashoffset', offset);
      if (self.options.hasCounter !== null) {
        numberNow = Utils.round(self.proxy.x / 5);
        return counter.html = numberNow;
      }
    });
    Utils.domComplete(function() {
      return self.proxy.x = 0.1;
    });
  }

  Circle.prototype.changeTo = function(value, time) {
    var customCurve;
    if (time === void 0) {
      time = 2;
    }
    if (this.options.hasCounter === true && this.options.hasLinearEasing === null) {
      customCurve = "linear";
    } else {
      customCurve = "ease-in-out";
    }
    this.proxy.animate({
      properties: {
        x: 500 * (value / 100)
      },
      time: time,
      curve: customCurve
    });
    return this.currentValue = value;
  };

  Circle.prototype.startAt = function(value) {
    this.proxy.animate({
      properties: {
        x: 500 * (value / 100)
      },
      time: 0.001
    });
    return this.currentValue = value;
  };

  Circle.prototype.hide = function() {
    return this.opacity = 0;
  };

  Circle.prototype.show = function() {
    return this.opacity = 1;
  };

  Circle.prototype.onFinished = function() {};

  return Circle;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamFybm9sZC9naXQvU1ZHQ2lyY2xlLU1vZHVsZS1mb3ItRnJhbWVyanMvRXhhbXBsZXMvQXBwbGVXYXRjaEFjdGl2aXRpZXMuZnJhbWVyL21vZHVsZXMvY2lyY2xlTW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7OztBQUFNLE9BQU8sQ0FBQzs7O21CQUNiLFlBQUEsR0FBYzs7RUFFRCxnQkFBQyxPQUFEO0FBRVosUUFBQTtJQUZhLElBQUMsQ0FBQSw0QkFBRCxVQUFTOztVQUVkLENBQUMsYUFBYzs7O1dBQ2YsQ0FBQyxjQUFlOzs7V0FFaEIsQ0FBQyxjQUFlOzs7V0FDaEIsQ0FBQyxXQUFZOzs7V0FDYixDQUFDLGNBQWU7OztXQUVoQixDQUFDLGFBQWM7OztXQUNmLENBQUMsZUFBZ0I7OztXQUNqQixDQUFDLGtCQUFtQjs7O1dBQ3BCLENBQUMsa0JBQW1COztJQUU1QixJQUFDLENBQUEsT0FBTyxDQUFDLEtBQVQsR0FBaUI7SUFFakIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULEdBQW9CLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVixHQUF3QixJQUFDLENBQUEsT0FBTyxDQUFDO0lBRXBELHdDQUFNLElBQUMsQ0FBQSxPQUFQO0lBRUEsSUFBQyxDQUFDLGVBQUYsR0FBb0I7SUFDcEIsSUFBQyxDQUFDLE1BQUYsR0FBVyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQ3BCLElBQUMsQ0FBQyxLQUFGLEdBQVUsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUNuQixJQUFDLENBQUMsUUFBRixHQUFhLENBQUM7SUFHZCxJQUFDLENBQUMsVUFBRixHQUFlLElBQUksQ0FBQyxFQUFMLEdBQVUsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUVsQyxJQUFDLENBQUMsUUFBRixHQUFhLFFBQUEsR0FBVyxJQUFJLENBQUMsS0FBTCxDQUFXLElBQUksQ0FB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LEVBQ0M7UUFBQSxDQUFBLEVBQUcsR0FBQSxHQUFNLENBQUMsS0FBQSxHQUFRLEdBQVQsQ0FBVDtPQUREO01BRUEsSUFBQSxFQUFNLElBRk47TUFHQSxLQUFBLEVBQU8sV0FIUDtLQUREO1dBUUEsSUFBQyxDQUFBLFlBQUQsR0FBZ0I7RUFqQlA7O21CQW1CVixPQUFBLEdBQVMsU0FBQyxLQUFEO0lBQ1IsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQ0M7TUFBQSxVQUFBLEVBQ0M7UUFBQSxDQUFBLEVBQUcsR0FBQSxHQUFNLENBQUMsS0FBQSxHQUFRLEdBQVQsQ0FBVDtPQUREO01BRUEsSUFBQSxFQUFNLEtBRk47S0FERDtXQUtBLElBQUMsQ0FBQSxZQUFELEdBQWdCO0VBTlI7O21CQVVULElBQUEsR0FBTSxTQUFBO1dBQ0wsSUFBQyxDQUFDLE9BQUYsR0FBWTtFQURQOzttQkFHTixJQUFBLEdBQU0sU0FBQTtXQUNMLElBQUMsQ0FBQyxPQUFGLEdBQVk7RUFEUDs7bUJBR04sVUFBQSxHQUFZLFNBQUEsR0FBQTs7OztHQXBKZ0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgZXhwb3J0cy5DaXJjbGUgZXh0ZW5kcyBMYXllclxuXHRjdXJyZW50VmFsdWU6IG51bGxcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0QG9wdGlvbnMuY2lyY2xlU2l6ZSA/PSAzMDBcblx0XHRAb3B0aW9ucy5zdHJva2VXaWR0aCA/PSAyNFxuXG5cdFx0QG9wdGlvbnMuc3Ryb2tlQ29sb3IgPz0gXCIjZmMyNDVjXCJcblx0XHRAb3B0aW9ucy50b3BDb2xvciA/PSBudWxsXG5cdFx0QG9wdGlvbnMuYm90dG9tQ29sb3IgPz0gbnVsbFxuXG5cdFx0QG9wdGlvbnMuaGFzQ291bnRlciA/PSBudWxsXG5cdFx0QG9wdGlvbnMuY291bnRlckNvbG9yID89IFwiI2ZmZlwiXG5cdFx0QG9wdGlvbnMuY291bnRlckZvbnRTaXplID89IDYwXG5cdFx0QG9wdGlvbnMuaGFzTGluZWFyRWFzaW5nID89IG51bGxcblxuXHRcdEBvcHRpb25zLnZhbHVlID0gMlxuXG5cdFx0QG9wdGlvbnMudmlld0JveCA9IChAb3B0aW9ucy5jaXJjbGVTaXplKSArIEBvcHRpb25zLnN0cm9rZVdpZHRoXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QC5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiXG5cdFx0QC5oZWlnaHQgPSBAb3B0aW9ucy52aWV3Qm94XG5cdFx0QC53aWR0aCA9IEBvcHRpb25zLnZpZXdCb3hcblx0XHRALnJvdGF0aW9uID0gLTkwXG5cblxuXHRcdEAucGF0aExlbmd0aCA9IE1hdGguUEkgKiBAb3B0aW9ucy5jaXJjbGVTaXplXG5cblx0XHRALmNpcmNsZUlEID0gXCJjaXJjbGVcIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwKVxuXHRcdEAuZ3JhZGllbnRJRCA9IFwiY2lyY2xlXCIgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMClcblxuXHRcdCMgUHV0IHRoaXMgaW5zaWRlIGxpbmVhcmdyYWRpZW50XG5cdFx0IyBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIlxuXHRcdCMgICAgeDE9XCIwJVwiIHkxPVwiMCVcIiB4Mj1cIjUwJVwiIHkyPVwiMCVcIiBncmFkaWVudFRyYW5zZm9ybT1cInJvdGF0ZSgxMjApXCJcblxuXG5cdFx0aWYgQG9wdGlvbnMuaGFzQ291bnRlciBpc250IG51bGxcblx0XHRcdGNvdW50ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdGh0bWw6IFwiXCJcblx0XHRcdFx0d2lkdGg6IEAud2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBALmhlaWdodFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcblx0XHRcdFx0cm90YXRpb246IDkwXG5cdFx0XHRcdGNvbG9yOiBAb3B0aW9ucy5jb3VudGVyQ29sb3JcblxuXHRcdFx0c3R5bGUgPSB7XG5cdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0XHRmb250U2l6ZTogXCIje0BvcHRpb25zLmNvdW50ZXJGb250U2l6ZX1weFwiXG5cdFx0XHRcdGxpbmVIZWlnaHQ6IFwiI3tALmhlaWdodH1weFwiXG5cdFx0XHRcdGZvbnRXZWlnaHQ6IFwiNjAwXCJcblx0XHRcdFx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmXCJcblx0XHRcdFx0Ym94U2l6aW5nOiBcImJvcmRlci1ib3hcIlxuXHRcdFx0XHRoZWlnaHQ6IEAuaGVpZ2h0XG5cdFx0XHR9XG5cblx0XHRcdGNvdW50ZXIuc3R5bGUgPSBzdHlsZVxuXG5cdFx0XHRudW1iZXJTdGFydCA9IDBcblx0XHRcdG51bWJlckVuZCA9IDEwMFxuXHRcdFx0bnVtYmVyRHVyYXRpb24gPSAyXG5cblx0XHRcdG51bWJlck5vdyA9IG51bWJlclN0YXJ0XG5cdFx0XHRudW1iZXJJbnRlcnZhbCA9IG51bWJlckVuZCAtIG51bWJlclN0YXJ0XG5cblxuXHRcdEAuaHRtbCA9IFwiXCJcIlxuXHRcdFx0PHN2ZyB2aWV3Qm94PSctI3tAb3B0aW9ucy5zdHJva2VXaWR0aC8yfSAtI3tAb3B0aW9ucy5zdHJva2VXaWR0aC8yfSAje0BvcHRpb25zLnZpZXdCb3h9ICN7QG9wdGlvbnMudmlld0JveH0nID5cblx0XHRcdFx0PGRlZnM+XG5cdFx0XHRcdCAgICA8bGluZWFyR3JhZGllbnQgaWQ9JyN7QGdyYWRpZW50SUR9JyA+XG5cdFx0XHRcdCAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wLWNvbG9yPScje2lmIEBvcHRpb25zLnRvcENvbG9yIGlzbnQgbnVsbCB0aGVuIEBvcHRpb25zLmJvdHRvbUNvbG9yIGVsc2UgQG9wdGlvbnMuc3Ryb2tlQ29sb3J9Jy8+XG5cdFx0XHRcdCAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3AtY29sb3I9JyN7aWYgQG9wdGlvbnMudG9wQ29sb3IgaXNudCBudWxsIHRoZW4gQG9wdGlvbnMudG9wQ29sb3IgZWxzZSBAb3B0aW9ucy5zdHJva2VDb2xvcn0nIHN0b3Atb3BhY2l0eT1cIjFcIiAvPlxuXHRcdFx0XHQgICAgPC9saW5lYXJHcmFkaWVudD5cblx0XHRcdFx0PC9kZWZzPlxuXHRcdFx0XHQ8Y2lyY2xlIGlkPScje0BjaXJjbGVJRH0nXG5cdFx0XHRcdFx0XHRmaWxsPSdub25lJ1xuXHRcdFx0XHRcdFx0c3Ryb2tlLWxpbmVjYXA9J3JvdW5kJ1xuXHRcdFx0XHRcdFx0c3Ryb2tlLXdpZHRoICAgICAgPSAnI3tAb3B0aW9ucy5zdHJva2VXaWR0aH0nXG5cdFx0XHRcdFx0XHRzdHJva2UtZGFzaGFycmF5ICA9ICcje0AucGF0aExlbmd0aH0nXG5cdFx0XHRcdFx0XHRzdHJva2UtZGFzaG9mZnNldCA9ICcwJ1xuXHRcdFx0XHRcdFx0c3Ryb2tlPVwidXJsKCMje0BncmFkaWVudElEfSlcIlxuXHRcdFx0XHRcdFx0c3Ryb2tlLXdpZHRoPVwiMTBcIlxuXHRcdFx0XHRcdFx0Y3ggPSAnI3tAb3B0aW9ucy5jaXJjbGVTaXplLzJ9J1xuXHRcdFx0XHRcdFx0Y3kgPSAnI3tAb3B0aW9ucy5jaXJjbGVTaXplLzJ9J1xuXHRcdFx0XHRcdFx0ciAgPSAnI3tAb3B0aW9ucy5jaXJjbGVTaXplLzJ9Jz5cblx0XHRcdDwvc3ZnPlwiXCJcIlxuXG5cdFx0c2VsZiA9IEBcblx0XHRVdGlscy5kb21Db21wbGV0ZSAtPlxuXHRcdFx0c2VsZi5wYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiMje3NlbGYuY2lyY2xlSUR9XCIpXG5cblx0XHRAcHJveHkgPSBuZXcgTGF5ZXJcblx0XHRcdG9wYWNpdHk6IDBcblxuXHRcdEBwcm94eS5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCAoYW5pbWF0aW9uLCBsYXllcikgLT5cblx0XHRcdHNlbGYub25GaW5pc2hlZCgpXG5cblx0XHRAcHJveHkub24gJ2NoYW5nZTp4JywgLT5cblxuXHRcdFx0b2Zmc2V0ID0gVXRpbHMubW9kdWxhdGUoQC54LCBbMCwgNTAwXSwgW3NlbGYucGF0aExlbmd0aCwgMF0pXG5cblx0XHRcdHNlbGYucGF0aC5zZXRBdHRyaWJ1dGUgJ3N0cm9rZS1kYXNob2Zmc2V0Jywgb2Zmc2V0XG5cblx0XHRcdGlmIHNlbGYub3B0aW9ucy5oYXNDb3VudGVyIGlzbnQgbnVsbFxuXHRcdFx0XHRudW1iZXJOb3cgPSBVdGlscy5yb3VuZChzZWxmLnByb3h5LnggLyA1KVxuXHRcdFx0XHRjb3VudGVyLmh0bWwgPSBudW1iZXJOb3dcblxuXHRcdFV0aWxzLmRvbUNvbXBsZXRlIC0+XG5cdFx0XHRzZWxmLnByb3h5LnggPSAwLjFcblxuXHRjaGFuZ2VUbzogKHZhbHVlLCB0aW1lKSAtPlxuXHRcdGlmIHRpbWUgaXMgdW5kZWZpbmVkXG5cdFx0XHR0aW1lID0gMlxuXG5cdFx0aWYgQG9wdGlvbnMuaGFzQ291bnRlciBpcyB0cnVlIGFuZCBAb3B0aW9ucy5oYXNMaW5lYXJFYXNpbmcgaXMgbnVsbCAjIG92ZXJyaWRlIGRlZmF1bHQgXCJlYXNlLWluLW91dFwiIHdoZW4gY291bnRlciBpcyB1c2VkXG5cdFx0XHRjdXN0b21DdXJ2ZSA9IFwibGluZWFyXCJcblx0XHRlbHNlXG5cdFx0XHRjdXN0b21DdXJ2ZSA9IFwiZWFzZS1pbi1vdXRcIlxuXG5cdFx0QHByb3h5LmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdHg6IDUwMCAqICh2YWx1ZSAvIDEwMClcblx0XHRcdHRpbWU6IHRpbWVcblx0XHRcdGN1cnZlOiBjdXN0b21DdXJ2ZVxuXG5cblxuXHRcdEBjdXJyZW50VmFsdWUgPSB2YWx1ZVxuXG5cdHN0YXJ0QXQ6ICh2YWx1ZSkgLT5cblx0XHRAcHJveHkuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0eDogNTAwICogKHZhbHVlIC8gMTAwKVxuXHRcdFx0dGltZTogMC4wMDFcblxuXHRcdEBjdXJyZW50VmFsdWUgPSB2YWx1ZVxuXG5cblxuXHRoaWRlOiAtPlxuXHRcdEAub3BhY2l0eSA9IDBcblxuXHRzaG93OiAtPlxuXHRcdEAub3BhY2l0eSA9IDFcblxuXHRvbkZpbmlzaGVkOiAtPlxuXG4iXX0=
