# SVG Circle Module for Loading, Countdown or for fun

#### Live Demo
Apple Watch Activities: [http://share.framerjs.com/0w3wirptkfc9/](http://share.framerjs.com/0w3wirptkfc9/)<br>
Countdown: [http://share.framerjs.com/8as5o1wn1f0a/](http://share.framerjs.com/8as5o1wn1f0a/)

<a href="http://share.framerjs.com/8as5o1wn1f0a/"><img src="https://raw.githubusercontent.com/ServusJon/SVGCircle-Module-for-FramerJS/master/countdown.gif" alt="Countdown" width="400"></a>
<a href="http://share.framerjs.com/0w3wirptkfc9/"><img src="https://raw.githubusercontent.com/ServusJon/SVGCircle-Module-for-FramerJS/master/applewatchactivities.gif" alt="Apple Watch Activities" width="400"></a>

Thank you [Henrique Gusso](https://twitter.com/gusso) for writing that [great article](https://medium.com/@gusso/draw-and-animate-an-svg-circle-in-framer-d4bc3a9863c1#.9kdfcl942).

## Setup
1. Download the `circleModule.coffee` file
2. Create or open a framer project and drop `circleModule.coffee` inside the /modules folder
3. Add `{Circle} = require "circleModule"` at the top of your document (case-sensitive).

## Add Circle
```coffeescript
circle = new Circle
```
You can also change the size of the circle `circleSize: 400` and the strokeSize `circleSize: 20`.

## Start Animation or set value initial value
You can animate to a certain value (percent-based). You can change the value any time in your prototype.
```coffeescript
circle.changeTo(50) # Animates to 50% of circle in the default time

# Options: Speed (in seconds)
circle.changeTo(50, 10) # Animates to 50% of circle in the 10s
```

Or just set a initial value (percent-based)
```coffeescript
circle.startAt(10)
```

## Countdown
You can use the circle also for countdowns
```coffeescript
countdownCircle = new Circle
	hasCounter: true
```

Change the text color `counterColor: "#fff"` and font-size `counterFontSize: 20` to your liking.

## Callback
You can get a callback when animation is completed
```coffeescript
circle.onFinished = ->
	print "animation done"
```

Get the current value of the circle
```coffeescript
circle.onFinished = ->
	if circle.currentValue == 80 # TRUE if circle was animated to "circle.changeTo(80)"
		print "80%"
```

## Coloring / Gradients
You can either use a plain color (default) for the circle or a gradient.
```coffeescript
gradientCircle = new Circle
	topColor: "#7cc201"
	bottomColor: "#a3fe00"

plainCircle = new Circle
	color: "#7cc201"
```


## Show / Hide Circle
You can easily animate the circles visibilty using standard framer functions. For instant changes:
```coffeescript
circle.hide()
circle.show()
```

## Optional Properties
You can also customize the circle with following properties:

| property  | Description|
| ------------- | ------------- |
| `circleSize`  | The size of the circle (default: 300)  |
| `strokeWidth`  | The thickness of the stroke (default: 24)  |
| `strokeColor`  | The color of the stroke (default: "#fc245c")  |
| `topColor`  | Top Gradient Color  |
| `bottomColor`  | Bottom Gradient Color  |
| `hasCounter`  | Set it to `true`, will show a countdown label  (default: null)  |
| `counterColor`  | Text color of countdown label (default: "#fff") |
| `counterFontSize`  | Font size of countdown label (default: 60) |
| `hasLinearEasing`  | Allows to change the animation curve to "linear" for "ease-in-out". Set it to `true (default: null) |

```coffeescript
loadingCircle = new Circle
	circleWidth: 200
	strokeWidth: 30

	topColor: "#ff150f"
	bottomColor: "#ff23bd"

	hasCounter: true
	counterColor: "#fff"
	hasLinearEasing: true

	counterColor: "red"
	counterFontSize: 100

loadingCircle.center() # center the circle

loadingCircle.changeTo(100)

loadingCircle.onFinished = ->
	print "animation is done"
```