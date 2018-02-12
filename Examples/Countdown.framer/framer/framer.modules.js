require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"circleModule":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Circle = (function(superClass) {
  extend(Circle, superClass);

  Circle.prototype.currentValue = null;

  function Circle(options) {
    var base, base1, base2, base3, base4, base5, base6, base7, base8, base9, counter, numberDuration, numberEnd, numberInterval, numberNow, numberStart, self, style;
    this.options = options != null ? options : {};
    if ((base = this.options).circleSize == null) {
      base.circleSize = 300;
    }
    if ((base1 = this.options).strokeWidth == null) {
      base1.strokeWidth = 24;
    }
    if ((base2 = this.options).linecap == null) {
      base2.linecap = "round";
    }
    if ((base3 = this.options).strokeColor == null) {
      base3.strokeColor = "#fc245c";
    }
    if ((base4 = this.options).topColor == null) {
      base4.topColor = null;
    }
    if ((base5 = this.options).bottomColor == null) {
      base5.bottomColor = null;
    }
    if ((base6 = this.options).hasCounter == null) {
      base6.hasCounter = null;
    }
    if ((base7 = this.options).counterColor == null) {
      base7.counterColor = "#fff";
    }
    if ((base8 = this.options).counterFontSize == null) {
      base8.counterFontSize = 60;
    }
    if ((base9 = this.options).hasLinearEasing == null) {
      base9.hasLinearEasing = false;
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
    this.html = "<svg viewBox='-" + (this.options.strokeWidth / 2) + " -" + (this.options.strokeWidth / 2) + " " + this.options.viewBox + " " + this.options.viewBox + "' >\n	<defs>\n	    <linearGradient id='" + this.gradientID + "' >\n	        <stop offset=\"0%\" stop-color='" + (this.options.topColor !== null ? this.options.bottomColor : this.options.strokeColor) + "'/>\n	        <stop offset=\"100%\" stop-color='" + (this.options.topColor !== null ? this.options.topColor : this.options.strokeColor) + "' stop-opacity=\"1\" />\n	    </linearGradient>\n	</defs>\n	<circle id='" + this.circleID + "'\n			fill='none'\n			stroke-linecap='" + this.options.linecap + "'\n			stroke-width      = '" + this.options.strokeWidth + "'\n			stroke-dasharray  = '" + this.pathLength + "'\n			stroke-dashoffset = '0'\n			stroke=\"url(#" + this.gradientID + ")\"\n			stroke-width=\"10\"\n			cx = '" + (this.options.circleSize / 2) + "'\n			cy = '" + (this.options.circleSize / 2) + "'\n			r  = '" + (this.options.circleSize / 2) + "'>\n</svg>";
    self = this;
    Utils.domComplete(function() {
      return self.path = document.querySelector("#" + self.circleID);
    });
    this.proxy = new Layer({
      opacity: 0,
      name: "circuleModuleProxy"
    });
    this.proxy.sendToBack();
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
    if (this.options.hasLinearEasing === true) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL0pvbmF0aGFuLkFybm9sZC9EZXNrdG9wL2dpdGh1Yi9TVkdDaXJjbGUtTW9kdWxlLWZvci1GcmFtZXJKUy9FeGFtcGxlcy9Db3VudGRvd24uZnJhbWVyL21vZHVsZXMvY2lyY2xlTW9kdWxlLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgZXhwb3J0cy5DaXJjbGUgZXh0ZW5kcyBMYXllclxuXHRjdXJyZW50VmFsdWU6IG51bGxcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0QG9wdGlvbnMuY2lyY2xlU2l6ZSA/PSAzMDBcblx0XHRAb3B0aW9ucy5zdHJva2VXaWR0aCA/PSAyNFxuXHRcdEBvcHRpb25zLmxpbmVjYXAgPz0gXCJyb3VuZFwiXG5cblx0XHRAb3B0aW9ucy5zdHJva2VDb2xvciA/PSBcIiNmYzI0NWNcIlxuXHRcdEBvcHRpb25zLnRvcENvbG9yID89IG51bGxcblx0XHRAb3B0aW9ucy5ib3R0b21Db2xvciA/PSBudWxsXG5cblx0XHRAb3B0aW9ucy5oYXNDb3VudGVyID89IG51bGxcblx0XHRAb3B0aW9ucy5jb3VudGVyQ29sb3IgPz0gXCIjZmZmXCJcblx0XHRAb3B0aW9ucy5jb3VudGVyRm9udFNpemUgPz0gNjBcblx0XHRAb3B0aW9ucy5oYXNMaW5lYXJFYXNpbmcgPz0gZmFsc2VcblxuXHRcdEBvcHRpb25zLnZhbHVlID0gMlxuXG5cdFx0QG9wdGlvbnMudmlld0JveCA9IChAb3B0aW9ucy5jaXJjbGVTaXplKSArIEBvcHRpb25zLnN0cm9rZVdpZHRoXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QC5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiXG5cdFx0QC5oZWlnaHQgPSBAb3B0aW9ucy52aWV3Qm94XG5cdFx0QC53aWR0aCA9IEBvcHRpb25zLnZpZXdCb3hcblx0XHRALnJvdGF0aW9uID0gLTkwXG5cblxuXHRcdEAucGF0aExlbmd0aCA9IE1hdGguUEkgKiBAb3B0aW9ucy5jaXJjbGVTaXplXG5cblx0XHRALmNpcmNsZUlEID0gXCJjaXJjbGVcIiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwKVxuXHRcdEAuZ3JhZGllbnRJRCA9IFwiY2lyY2xlXCIgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMClcblxuXHRcdCMgUHV0IHRoaXMgaW5zaWRlIGxpbmVhcmdyYWRpZW50XG5cdFx0IyBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIlxuXHRcdCMgICAgeDE9XCIwJVwiIHkxPVwiMCVcIiB4Mj1cIjUwJVwiIHkyPVwiMCVcIiBncmFkaWVudFRyYW5zZm9ybT1cInJvdGF0ZSgxMjApXCJcblxuXG5cdFx0aWYgQG9wdGlvbnMuaGFzQ291bnRlciBpc250IG51bGxcblx0XHRcdGNvdW50ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAXG5cdFx0XHRcdGh0bWw6IFwiXCJcblx0XHRcdFx0d2lkdGg6IEAud2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBALmhlaWdodFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiXCJcblx0XHRcdFx0cm90YXRpb246IDkwXG5cdFx0XHRcdGNvbG9yOiBAb3B0aW9ucy5jb3VudGVyQ29sb3JcblxuXHRcdFx0c3R5bGUgPSB7XG5cdFx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0XHRmb250U2l6ZTogXCIje0BvcHRpb25zLmNvdW50ZXJGb250U2l6ZX1weFwiXG5cdFx0XHRcdGxpbmVIZWlnaHQ6IFwiI3tALmhlaWdodH1weFwiXG5cdFx0XHRcdGZvbnRXZWlnaHQ6IFwiNjAwXCJcblx0XHRcdFx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmXCJcblx0XHRcdFx0Ym94U2l6aW5nOiBcImJvcmRlci1ib3hcIlxuXHRcdFx0XHRoZWlnaHQ6IEAuaGVpZ2h0XG5cdFx0XHR9XG5cblx0XHRcdGNvdW50ZXIuc3R5bGUgPSBzdHlsZVxuXG5cdFx0XHRudW1iZXJTdGFydCA9IDBcblx0XHRcdG51bWJlckVuZCA9IDEwMFxuXHRcdFx0bnVtYmVyRHVyYXRpb24gPSAyXG5cblx0XHRcdG51bWJlck5vdyA9IG51bWJlclN0YXJ0XG5cdFx0XHRudW1iZXJJbnRlcnZhbCA9IG51bWJlckVuZCAtIG51bWJlclN0YXJ0XG5cblxuXHRcdEAuaHRtbCA9IFwiXCJcIlxuXHRcdFx0PHN2ZyB2aWV3Qm94PSctI3tAb3B0aW9ucy5zdHJva2VXaWR0aC8yfSAtI3tAb3B0aW9ucy5zdHJva2VXaWR0aC8yfSAje0BvcHRpb25zLnZpZXdCb3h9ICN7QG9wdGlvbnMudmlld0JveH0nID5cblx0XHRcdFx0PGRlZnM+XG5cdFx0XHRcdCAgICA8bGluZWFyR3JhZGllbnQgaWQ9JyN7QGdyYWRpZW50SUR9JyA+XG5cdFx0XHRcdCAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wLWNvbG9yPScje2lmIEBvcHRpb25zLnRvcENvbG9yIGlzbnQgbnVsbCB0aGVuIEBvcHRpb25zLmJvdHRvbUNvbG9yIGVsc2UgQG9wdGlvbnMuc3Ryb2tlQ29sb3J9Jy8+XG5cdFx0XHRcdCAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3AtY29sb3I9JyN7aWYgQG9wdGlvbnMudG9wQ29sb3IgaXNudCBudWxsIHRoZW4gQG9wdGlvbnMudG9wQ29sb3IgZWxzZSBAb3B0aW9ucy5zdHJva2VDb2xvcn0nIHN0b3Atb3BhY2l0eT1cIjFcIiAvPlxuXHRcdFx0XHQgICAgPC9saW5lYXJHcmFkaWVudD5cblx0XHRcdFx0PC9kZWZzPlxuXHRcdFx0XHQ8Y2lyY2xlIGlkPScje0BjaXJjbGVJRH0nXG5cdFx0XHRcdFx0XHRmaWxsPSdub25lJ1xuXHRcdFx0XHRcdFx0c3Ryb2tlLWxpbmVjYXA9JyN7QG9wdGlvbnMubGluZWNhcH0nXG5cdFx0XHRcdFx0XHRzdHJva2Utd2lkdGggICAgICA9ICcje0BvcHRpb25zLnN0cm9rZVdpZHRofSdcblx0XHRcdFx0XHRcdHN0cm9rZS1kYXNoYXJyYXkgID0gJyN7QC5wYXRoTGVuZ3RofSdcblx0XHRcdFx0XHRcdHN0cm9rZS1kYXNob2Zmc2V0ID0gJzAnXG5cdFx0XHRcdFx0XHRzdHJva2U9XCJ1cmwoIyN7QGdyYWRpZW50SUR9KVwiXG5cdFx0XHRcdFx0XHRzdHJva2Utd2lkdGg9XCIxMFwiXG5cdFx0XHRcdFx0XHRjeCA9ICcje0BvcHRpb25zLmNpcmNsZVNpemUvMn0nXG5cdFx0XHRcdFx0XHRjeSA9ICcje0BvcHRpb25zLmNpcmNsZVNpemUvMn0nXG5cdFx0XHRcdFx0XHRyICA9ICcje0BvcHRpb25zLmNpcmNsZVNpemUvMn0nPlxuXHRcdFx0PC9zdmc+XCJcIlwiXG5cblx0XHRzZWxmID0gQFxuXHRcdFV0aWxzLmRvbUNvbXBsZXRlIC0+XG5cdFx0XHRzZWxmLnBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiIyN7c2VsZi5jaXJjbGVJRH1cIilcblxuXHRcdEBwcm94eSA9IG5ldyBMYXllclxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0bmFtZTogXCJjaXJjdWxlTW9kdWxlUHJveHlcIlxuXHRcdFx0XG5cdFx0QHByb3h5LnNlbmRUb0JhY2soKVxuXG5cdFx0QHByb3h5Lm9uIEV2ZW50cy5BbmltYXRpb25FbmQsIChhbmltYXRpb24sIGxheWVyKSAtPlxuXHRcdFx0c2VsZi5vbkZpbmlzaGVkKClcblxuXHRcdEBwcm94eS5vbiAnY2hhbmdlOngnLCAtPlxuXG5cdFx0XHRvZmZzZXQgPSBVdGlscy5tb2R1bGF0ZShALngsIFswLCA1MDBdLCBbc2VsZi5wYXRoTGVuZ3RoLCAwXSlcblxuXHRcdFx0c2VsZi5wYXRoLnNldEF0dHJpYnV0ZSAnc3Ryb2tlLWRhc2hvZmZzZXQnLCBvZmZzZXRcblxuXHRcdFx0aWYgc2VsZi5vcHRpb25zLmhhc0NvdW50ZXIgaXNudCBudWxsXG5cdFx0XHRcdG51bWJlck5vdyA9IFV0aWxzLnJvdW5kKHNlbGYucHJveHkueCAvIDUpXG5cdFx0XHRcdGNvdW50ZXIuaHRtbCA9IG51bWJlck5vd1xuXG5cdFx0VXRpbHMuZG9tQ29tcGxldGUgLT5cblx0XHRcdHNlbGYucHJveHkueCA9IDAuMVxuXG5cdGNoYW5nZVRvOiAodmFsdWUsIHRpbWUpIC0+XG5cdFx0aWYgdGltZSBpcyB1bmRlZmluZWRcblx0XHRcdHRpbWUgPSAyXG5cblx0XHRpZiBAb3B0aW9ucy5oYXNMaW5lYXJFYXNpbmcgaXMgdHJ1ZVxuXHRcdFx0Y3VzdG9tQ3VydmUgPSBcImxpbmVhclwiXG5cdFx0ZWxzZVxuXHRcdFx0Y3VzdG9tQ3VydmUgPSBcImVhc2UtaW4tb3V0XCJcblxuXHRcdEBwcm94eS5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHR4OiA1MDAgKiAodmFsdWUgLyAxMDApXG5cdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRjdXJ2ZTogY3VzdG9tQ3VydmVcblxuXHRcdEBjdXJyZW50VmFsdWUgPSB2YWx1ZVxuXG5cdHN0YXJ0QXQ6ICh2YWx1ZSkgLT5cblx0XHRAcHJveHkuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0eDogNTAwICogKHZhbHVlIC8gMTAwKVxuXHRcdFx0dGltZTogMC4wMDFcblxuXHRcdEBjdXJyZW50VmFsdWUgPSB2YWx1ZVxuXG5cblxuXHRoaWRlOiAtPlxuXHRcdEAub3BhY2l0eSA9IDBcblxuXHRzaG93OiAtPlxuXHRcdEAub3BhY2l0eSA9IDFcblxuXHRvbkZpbmlzaGVkOiAtPlxuXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBREFBLElBQUE7OztBQUFNLE9BQU8sQ0FBQzs7O21CQUNiLFlBQUEsR0FBYzs7RUFFRCxnQkFBQyxPQUFEO0FBRVosUUFBQTtJQUZhLElBQUMsQ0FBQSw0QkFBRCxVQUFTOztVQUVkLENBQUMsYUFBYzs7O1dBQ2YsQ0FBQyxjQUFlOzs7V0FDaEIsQ0FBQyxVQUFXOzs7V0FFWixDQUFDLGNBQWU7OztXQUNoQixDQUFDLFdBQVk7OztXQUNiLENBQUMsY0FBZTs7O1dBRWhCLENBQUMsYUFBYzs7O1dBQ2YsQ0FBQyxlQUFnQjs7O1dBQ2pCLENBQUMsa0JBQW1COzs7V0FDcEIsQ0FBQyxrQkFBbUI7O0lBRTVCLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxHQUFpQjtJQUVqQixJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsR0FBb0IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFWLEdBQXdCLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFFcEQsd0NBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUMsZUFBRixHQUFvQjtJQUNwQixJQUFDLENBQUMsTUFBRixHQUFXLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDcEIsSUFBQyxDQUFDLEtBQUYsR0FBVSxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQ25CLElBQUMsQ0FBQyxRQUFGLEdBQWEsQ0FBQztJQUdkLElBQUMsQ0FBQyxVQUFGLEdBQWUsSUFBSSxD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
