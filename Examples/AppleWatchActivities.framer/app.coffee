# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: "Apple Watch Activities"
	author: "Jonathan Arnold"
	twitter: "@servusjon"
	description: "Build with SVGCircle Module. Learn more: https://github.com/ServusJon/SVGCircle-Module-for-FramerJS"


{Circle} = require "circleModule"

padding = 20

loadingCircle = new Circle
	circleSize: 300
	topColor: "#ff150f"
	bottomColor: "#ff23bd"
	strokeWidth: 40
loadingCircle.center()

loadingCircle2 = new Circle
	circleSize: 220 - padding
	strokeWidth: 40
	topColor: "#7cc201"
	bottomColor: "#a3fe00"
loadingCircle2.center()

loadingCircle3 = new Circle
	circleSize: 140 - padding * 2
	strokeWidth: 40
	topColor: "#1baca6"
	bottomColor: "#18e1e9"
loadingCircle3.center()

loadingCircle.changeTo(80, 2)
loadingCircle2.changeTo(60, 2)	
loadingCircle3.changeTo(30, 2)	
