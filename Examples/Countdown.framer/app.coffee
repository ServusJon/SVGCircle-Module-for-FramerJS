# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: "Apple Watch Activities"
	author: "Jonathan Arnold"
	twitter: "@servusjon"
	description: "Build with SVGCircle Module. Learn more: https://github.com/ServusJon/SVGCircle-Module-for-FramerJS"


{Circle} = require "circleModule"

circleMaxWidth = 160
strokeWidth = 26
circlePadding = 6

loadingCircle = new Circle
	circleWidth: circleMaxWidth
	topColor: "#ff150f"
	bottomColor: "#ff23bd"
	strokeWidth: strokeWidth
	hasCounter: true
	counterColor: "#ff1d6a"
loadingCircle.center()

loadingCircle.changeTo(100)
