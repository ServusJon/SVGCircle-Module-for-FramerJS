class exports.Circle extends Layer
	currentValue: null

	constructor: (@options={}) ->

		@options.circleSize ?= 300
		@options.strokeWidth ?= 24

		@options.strokeColor ?= "#fc245c"
		@options.topColor ?= null
		@options.bottomColor ?= null

		@options.hasCounter ?= null
		@options.counterColor ?= "#fff"
		@options.counterFontSize ?= 60
		@options.hasLinearEasing ?= null

		@options.value = 2

		@options.viewBox = (@options.circleSize) + @options.strokeWidth

		super @options

		@.backgroundColor = ""
		@.height = @options.viewBox
		@.width = @options.viewBox
		@.rotation = -90


		@.pathLength = Math.PI * @options.circleSize

		@.circleID = "circle" + Math.floor(Math.random()*1000)
		@.gradientID = "circle" + Math.floor(Math.random()*1000)

		# Put this inside lineargradient
		# gradientUnits="userSpaceOnUse"
		#    x1="0%" y1="0%" x2="50%" y2="0%" gradientTransform="rotate(120)"


		if @options.hasCounter isnt null
			counter = new Layer
				parent: @
				html: ""
				width: @.width
				height: @.height
				backgroundColor: ""
				rotation: 90
				color: @options.counterColor

			style = {
				textAlign: "center"
				fontSize: "#{@options.counterFontSize}px"
				lineHeight: "#{@.height}px"
				fontWeight: "600"
				fontFamily: "-apple-system, Helvetica, Arial, sans-serif"
				boxSizing: "border-box"
				height: @.height
			}

			counter.style = style

			numberStart = 0
			numberEnd = 100
			numberDuration = 2

			numberNow = numberStart
			numberInterval = numberEnd - numberStart


		@.html = """
			<svg viewBox='-#{@options.strokeWidth/2} -#{@options.strokeWidth/2} #{@options.viewBox} #{@options.viewBox}' >
				<defs>
				    <linearGradient id='#{@gradientID}' >
				        <stop offset="0%" stop-color='#{if @options.topColor isnt null then @options.bottomColor else @options.strokeColor}'/>
				        <stop offset="100%" stop-color='#{if @options.topColor isnt null then @options.topColor else @options.strokeColor}' stop-opacity="1" />
				    </linearGradient>
				</defs>
				<circle id='#{@circleID}'
						fill='none'
						stroke-linecap='round'
						stroke-width      = '#{@options.strokeWidth}'
						stroke-dasharray  = '#{@.pathLength}'
						stroke-dashoffset = '0'
						stroke="url(##{@gradientID})"
						stroke-width="10"
						cx = '#{@options.circleSize/2}'
						cy = '#{@options.circleSize/2}'
						r  = '#{@options.circleSize/2}'>
			</svg>"""

		self = @
		Utils.domComplete ->
			self.path = document.querySelector("##{self.circleID}")

		@proxy = new Layer
			opacity: 0

		@proxy.on Events.AnimationEnd, (animation, layer) ->
			self.onFinished()

		@proxy.on 'change:x', ->

			offset = Utils.modulate(@.x, [0, 500], [self.pathLength, 0])

			self.path.setAttribute 'stroke-dashoffset', offset

			if self.options.hasCounter isnt null
				numberNow = Utils.round(self.proxy.x / 5)
				counter.html = numberNow

		Utils.domComplete ->
			self.proxy.x = 0.1

	changeTo: (value, time) ->
		if time is undefined
			time = 2

		if @options.hasCounter is true and @options.hasLinearEasing is null # override default "ease-in-out" when counter is used
			customCurve = "linear"
		else
			customCurve = "ease-in-out"

		@proxy.animate
			properties:
				x: 500 * (value / 100)
			time: time
			curve: customCurve



		@currentValue = value

	startAt: (value) ->
		@proxy.animate
			properties:
				x: 500 * (value / 100)
			time: 0.001

		@currentValue = value



	hide: ->
		@.opacity = 0

	show: ->
		@.opacity = 1

	onFinished: ->

