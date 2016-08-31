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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamFybm9sZC9naXQvU1ZHQ2lyY2xlLU1vZHVsZS1mb3ItRnJhbWVyanMvRXhhbXBsZXMvQ291bnRkb3duLmZyYW1lci9tb2R1bGVzL2NpcmNsZU1vZHVsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOzs7QUFBTSxPQUFPLENBQUM7OzttQkFDYixZQUFBLEdBQWM7O0VBRUQsZ0JBQUMsT0FBRDtBQUVaLFFBQUE7SUFGYSxJQUFDLENBQUEsNEJBQUQsVUFBUzs7VUFFZCxDQUFDLGFBQWM7OztXQUNmLENBQUMsY0FBZTs7O1dBRWhCLENBQUMsY0FBZTs7O1dBQ2hCLENBQUMsV0FBWTs7O1dBQ2IsQ0FBQyxjQUFlOzs7V0FFaEIsQ0FBQyxhQUFjOzs7V0FDZixDQUFDLGVBQWdCOzs7V0FDakIsQ0FBQyxrQkFBbUI7OztXQUNwQixDQUFDLGtCQUFtQjs7SUFFNUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEdBQWlCO0lBRWpCLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBVCxHQUFvQixJQUFDLENBQUEsT0FBTyxDQUFDLFVBQVYsR0FBd0IsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUVwRCx3Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQyxlQUFGLEdBQW9CO0lBQ3BCLElBQUMsQ0FBQyxNQUFGLEdBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUNwQixJQUFDLENBQUMsS0FBRixHQUFVLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDbkIsSUFBQyxDQUFDLFFBQUYsR0FBYSxDQUFDO0lBR2QsSUFBQyxDQUFDLFVBQUYsR0FBZSxJQUFJLENBQUMsRUFBTCxHQUFVLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFFbEMsSUFBQyxDQUFDLFFBQUYsR0FBYSxRQUFBLEdBQVcsSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFJLENBQUMsTUFBTCxDQUFB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Q0FBQSxFQUFHLEdBQUEsR0FBTSxDQUFDLEtBQUEsR0FBUSxHQUFULENBQVQ7T0FERDtNQUVBLElBQUEsRUFBTSxJQUZOO01BR0EsS0FBQSxFQUFPLFdBSFA7S0FERDtXQVFBLElBQUMsQ0FBQSxZQUFELEdBQWdCO0VBakJQOzttQkFtQlYsT0FBQSxHQUFTLFNBQUMsS0FBRDtJQUNSLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUNDO01BQUEsVUFBQSxFQUNDO1FBQUEsQ0FBQSxFQUFHLEdBQUEsR0FBTSxDQUFDLEtBQUEsR0FBUSxHQUFULENBQVQ7T0FERDtNQUVBLElBQUEsRUFBTSxLQUZOO0tBREQ7V0FLQSxJQUFDLENBQUEsWUFBRCxHQUFnQjtFQU5SOzttQkFVVCxJQUFBLEdBQU0sU0FBQTtXQUNMLElBQUMsQ0FBQyxPQUFGLEdBQVk7RUFEUDs7bUJBR04sSUFBQSxHQUFNLFNBQUE7V0FDTCxJQUFDLENBQUMsT0FBRixHQUFZO0VBRFA7O21CQUdOLFVBQUEsR0FBWSxTQUFBLEdBQUE7Ozs7R0FwSmdCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIGV4cG9ydHMuQ2lyY2xlIGV4dGVuZHMgTGF5ZXJcblx0Y3VycmVudFZhbHVlOiBudWxsXG5cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdEBvcHRpb25zLmNpcmNsZVNpemUgPz0gMzAwXG5cdFx0QG9wdGlvbnMuc3Ryb2tlV2lkdGggPz0gMjRcblxuXHRcdEBvcHRpb25zLnN0cm9rZUNvbG9yID89IFwiI2ZjMjQ1Y1wiXG5cdFx0QG9wdGlvbnMudG9wQ29sb3IgPz0gbnVsbFxuXHRcdEBvcHRpb25zLmJvdHRvbUNvbG9yID89IG51bGxcblxuXHRcdEBvcHRpb25zLmhhc0NvdW50ZXIgPz0gbnVsbFxuXHRcdEBvcHRpb25zLmNvdW50ZXJDb2xvciA/PSBcIiNmZmZcIlxuXHRcdEBvcHRpb25zLmNvdW50ZXJGb250U2l6ZSA/PSA2MFxuXHRcdEBvcHRpb25zLmhhc0xpbmVhckVhc2luZyA/PSBudWxsXG5cblx0XHRAb3B0aW9ucy52YWx1ZSA9IDJcblxuXHRcdEBvcHRpb25zLnZpZXdCb3ggPSAoQG9wdGlvbnMuY2lyY2xlU2l6ZSkgKyBAb3B0aW9ucy5zdHJva2VXaWR0aFxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEAuYmFja2dyb3VuZENvbG9yID0gXCJcIlxuXHRcdEAuaGVpZ2h0ID0gQG9wdGlvbnMudmlld0JveFxuXHRcdEAud2lkdGggPSBAb3B0aW9ucy52aWV3Qm94XG5cdFx0QC5yb3RhdGlvbiA9IC05MFxuXG5cblx0XHRALnBhdGhMZW5ndGggPSBNYXRoLlBJICogQG9wdGlvbnMuY2lyY2xlU2l6ZVxuXG5cdFx0QC5jaXJjbGVJRCA9IFwiY2lyY2xlXCIgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMClcblx0XHRALmdyYWRpZW50SUQgPSBcImNpcmNsZVwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDApXG5cblx0XHQjIFB1dCB0aGlzIGluc2lkZSBsaW5lYXJncmFkaWVudFxuXHRcdCMgZ3JhZGllbnRVbml0cz1cInVzZXJTcGFjZU9uVXNlXCJcblx0XHQjICAgIHgxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCI1MCVcIiB5Mj1cIjAlXCIgZ3JhZGllbnRUcmFuc2Zvcm09XCJyb3RhdGUoMTIwKVwiXG5cblxuXHRcdGlmIEBvcHRpb25zLmhhc0NvdW50ZXIgaXNudCBudWxsXG5cdFx0XHRjb3VudGVyID0gbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHRodG1sOiBcIlwiXG5cdFx0XHRcdHdpZHRoOiBALndpZHRoXG5cdFx0XHRcdGhlaWdodDogQC5oZWlnaHRcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIlwiXG5cdFx0XHRcdHJvdGF0aW9uOiA5MFxuXHRcdFx0XHRjb2xvcjogQG9wdGlvbnMuY291bnRlckNvbG9yXG5cblx0XHRcdHN0eWxlID0ge1xuXHRcdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdFx0Zm9udFNpemU6IFwiI3tAb3B0aW9ucy5jb3VudGVyRm9udFNpemV9cHhcIlxuXHRcdFx0XHRsaW5lSGVpZ2h0OiBcIiN7QC5oZWlnaHR9cHhcIlxuXHRcdFx0XHRmb250V2VpZ2h0OiBcIjYwMFwiXG5cdFx0XHRcdGZvbnRGYW1pbHk6IFwiLWFwcGxlLXN5c3RlbSwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZlwiXG5cdFx0XHRcdGJveFNpemluZzogXCJib3JkZXItYm94XCJcblx0XHRcdFx0aGVpZ2h0OiBALmhlaWdodFxuXHRcdFx0fVxuXG5cdFx0XHRjb3VudGVyLnN0eWxlID0gc3R5bGVcblxuXHRcdFx0bnVtYmVyU3RhcnQgPSAwXG5cdFx0XHRudW1iZXJFbmQgPSAxMDBcblx0XHRcdG51bWJlckR1cmF0aW9uID0gMlxuXG5cdFx0XHRudW1iZXJOb3cgPSBudW1iZXJTdGFydFxuXHRcdFx0bnVtYmVySW50ZXJ2YWwgPSBudW1iZXJFbmQgLSBudW1iZXJTdGFydFxuXG5cblx0XHRALmh0bWwgPSBcIlwiXCJcblx0XHRcdDxzdmcgdmlld0JveD0nLSN7QG9wdGlvbnMuc3Ryb2tlV2lkdGgvMn0gLSN7QG9wdGlvbnMuc3Ryb2tlV2lkdGgvMn0gI3tAb3B0aW9ucy52aWV3Qm94fSAje0BvcHRpb25zLnZpZXdCb3h9JyA+XG5cdFx0XHRcdDxkZWZzPlxuXHRcdFx0XHQgICAgPGxpbmVhckdyYWRpZW50IGlkPScje0BncmFkaWVudElEfScgPlxuXHRcdFx0XHQgICAgICAgIDxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcC1jb2xvcj0nI3tpZiBAb3B0aW9ucy50b3BDb2xvciBpc250IG51bGwgdGhlbiBAb3B0aW9ucy5ib3R0b21Db2xvciBlbHNlIEBvcHRpb25zLnN0cm9rZUNvbG9yfScvPlxuXHRcdFx0XHQgICAgICAgIDxzdG9wIG9mZnNldD1cIjEwMCVcIiBzdG9wLWNvbG9yPScje2lmIEBvcHRpb25zLnRvcENvbG9yIGlzbnQgbnVsbCB0aGVuIEBvcHRpb25zLnRvcENvbG9yIGVsc2UgQG9wdGlvbnMuc3Ryb2tlQ29sb3J9JyBzdG9wLW9wYWNpdHk9XCIxXCIgLz5cblx0XHRcdFx0ICAgIDwvbGluZWFyR3JhZGllbnQ+XG5cdFx0XHRcdDwvZGVmcz5cblx0XHRcdFx0PGNpcmNsZSBpZD0nI3tAY2lyY2xlSUR9J1xuXHRcdFx0XHRcdFx0ZmlsbD0nbm9uZSdcblx0XHRcdFx0XHRcdHN0cm9rZS1saW5lY2FwPSdyb3VuZCdcblx0XHRcdFx0XHRcdHN0cm9rZS13aWR0aCAgICAgID0gJyN7QG9wdGlvbnMuc3Ryb2tlV2lkdGh9J1xuXHRcdFx0XHRcdFx0c3Ryb2tlLWRhc2hhcnJheSAgPSAnI3tALnBhdGhMZW5ndGh9J1xuXHRcdFx0XHRcdFx0c3Ryb2tlLWRhc2hvZmZzZXQgPSAnMCdcblx0XHRcdFx0XHRcdHN0cm9rZT1cInVybCgjI3tAZ3JhZGllbnRJRH0pXCJcblx0XHRcdFx0XHRcdHN0cm9rZS13aWR0aD1cIjEwXCJcblx0XHRcdFx0XHRcdGN4ID0gJyN7QG9wdGlvbnMuY2lyY2xlU2l6ZS8yfSdcblx0XHRcdFx0XHRcdGN5ID0gJyN7QG9wdGlvbnMuY2lyY2xlU2l6ZS8yfSdcblx0XHRcdFx0XHRcdHIgID0gJyN7QG9wdGlvbnMuY2lyY2xlU2l6ZS8yfSc+XG5cdFx0XHQ8L3N2Zz5cIlwiXCJcblxuXHRcdHNlbGYgPSBAXG5cdFx0VXRpbHMuZG9tQ29tcGxldGUgLT5cblx0XHRcdHNlbGYucGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjI3tzZWxmLmNpcmNsZUlEfVwiKVxuXG5cdFx0QHByb3h5ID0gbmV3IExheWVyXG5cdFx0XHRvcGFjaXR5OiAwXG5cblx0XHRAcHJveHkub24gRXZlbnRzLkFuaW1hdGlvbkVuZCwgKGFuaW1hdGlvbiwgbGF5ZXIpIC0+XG5cdFx0XHRzZWxmLm9uRmluaXNoZWQoKVxuXG5cdFx0QHByb3h5Lm9uICdjaGFuZ2U6eCcsIC0+XG5cblx0XHRcdG9mZnNldCA9IFV0aWxzLm1vZHVsYXRlKEAueCwgWzAsIDUwMF0sIFtzZWxmLnBhdGhMZW5ndGgsIDBdKVxuXG5cdFx0XHRzZWxmLnBhdGguc2V0QXR0cmlidXRlICdzdHJva2UtZGFzaG9mZnNldCcsIG9mZnNldFxuXG5cdFx0XHRpZiBzZWxmLm9wdGlvbnMuaGFzQ291bnRlciBpc250IG51bGxcblx0XHRcdFx0bnVtYmVyTm93ID0gVXRpbHMucm91bmQoc2VsZi5wcm94eS54IC8gNSlcblx0XHRcdFx0Y291bnRlci5odG1sID0gbnVtYmVyTm93XG5cblx0XHRVdGlscy5kb21Db21wbGV0ZSAtPlxuXHRcdFx0c2VsZi5wcm94eS54ID0gMC4xXG5cblx0Y2hhbmdlVG86ICh2YWx1ZSwgdGltZSkgLT5cblx0XHRpZiB0aW1lIGlzIHVuZGVmaW5lZFxuXHRcdFx0dGltZSA9IDJcblxuXHRcdGlmIEBvcHRpb25zLmhhc0NvdW50ZXIgaXMgdHJ1ZSBhbmQgQG9wdGlvbnMuaGFzTGluZWFyRWFzaW5nIGlzIG51bGwgIyBvdmVycmlkZSBkZWZhdWx0IFwiZWFzZS1pbi1vdXRcIiB3aGVuIGNvdW50ZXIgaXMgdXNlZFxuXHRcdFx0Y3VzdG9tQ3VydmUgPSBcImxpbmVhclwiXG5cdFx0ZWxzZVxuXHRcdFx0Y3VzdG9tQ3VydmUgPSBcImVhc2UtaW4tb3V0XCJcblxuXHRcdEBwcm94eS5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHR4OiA1MDAgKiAodmFsdWUgLyAxMDApXG5cdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRjdXJ2ZTogY3VzdG9tQ3VydmVcblxuXG5cblx0XHRAY3VycmVudFZhbHVlID0gdmFsdWVcblxuXHRzdGFydEF0OiAodmFsdWUpIC0+XG5cdFx0QHByb3h5LmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdHg6IDUwMCAqICh2YWx1ZSAvIDEwMClcblx0XHRcdHRpbWU6IDAuMDAxXG5cblx0XHRAY3VycmVudFZhbHVlID0gdmFsdWVcblxuXG5cblx0aGlkZTogLT5cblx0XHRALm9wYWNpdHkgPSAwXG5cblx0c2hvdzogLT5cblx0XHRALm9wYWNpdHkgPSAxXG5cblx0b25GaW5pc2hlZDogLT5cblxuIl19
