/**
@description
	Creates a slide-show (i.e. carousel) out of anything with the class "carousel". 
@author		Jeremy England
@company	SimplyCoded
*/
// CAROUSEL OBJECT
function Carousel(containerID) {
	this.container = document.getElementById(containerID) || document.body;
	this.slides = this.container.querySelectorAll('.carousel');
	this.width = this.container.offsetWidth;
	this.height = this.container.offsetHeight;
	this.total = this.slides.length - 1;
	this.current = 0;
	
	//CSS adjustments to make our animations work better. 
	this.container.style.overflow = "hidden";
	for (var s = 0; s <= this.total; s++) {
		this.slides[s].style.position = "relative";
		this.slides[s].style.margin = "0 auto";
	}
	
	// start on slide 1
	this.slide(this.current);
	// ANIMATION EFFECTS
	var busy = false;
	this._animate = function (direction, effect, interval) {
		//Default Rate. The time it takes for animations to completely finish. 
		//Note: If an interval is set lower than this rate it will be automatically adjusted.
		var dRate = 1.2; //1.2 second(s).
		
		//SELECT EFFECT
		/**effect: fade*/
		if (effect == "fade") {	
			var rate;
			
			if (busy === false) {
				eval(direction);
				
				if (interval === false || interval >= ((dRate*1000)+200) ) {
					// Default animation speed. rate = 0.5; is for 1 second.
					rate = dRate * 0.5;
				} else if (interval < ((dRate*1000)+200) && interval > 400) {
					// Adjusts the animation duration to complete within the interval time period. +200 millisecond pause.
					rate = ( (interval-200) / 1000 ) / 2;
				} else {
					// Make faster than 400 millisecond animations continuous without any pause.
					rate = (interval / 1000) / 2;
				}
				
				TweenMax.to(elemOut, rate, {opacity:0, 
					onStart:function(){
						busy = true;
					},
					onComplete:function(){
						busy = false;
						elemOut.style.display = "none";
						elemOut.style.opacity = "1";
						elemIn.style.opacity = "0";
						elemIn.style.display = "block";
						TweenMax.to(elemIn, rate, {opacity:1});
					}
				});
			}
		}
		
		/**effect: slide*/
		else if (effect == "slide") {
			var width = this.width;
			var left = 0, opacity = 1;
			var rate, playing;
				
			if (interval === false || interval >= ((dRate*1000)+200) ) {
				// Default animation speed. rate = 10; is for 1 second.
				rate = dRate * 10;
			} else if (interval < ((dRate*1000)+200) && interval > 400) {
				// Adjusts the animation duration to complete within the interval time period. +200 millisecond pause.
				rate = ((interval-200) / 2) / 50;
			} else {
				// Make faster than 400 millisecond animations continuous without any pause.
				rate = (interval / 2) / 50;
			}
			eval(direction);
				
			playing = setInterval(slideOut, rate);
			
			function slideOut() {
				left -= width/100;
				elemOut.style.left = left+"px";
				if (opacity > 0) {
					opacity -= 1 / (width/2) * (width/100);
				}
				elemOut.style.opacity = opacity;
				
				if (left <= -width/2) {
					clearInterval(playing);
					elemOut.style.display = "none";
					elemOut.style.left = "0px";
					elemOut.style.opacity = "1";
					elemIn.style.left = width/2 +"px";
					elemIn.style.opacity = "0";
					elemIn.style.display = "block";
					left = width/2;
					playing = setInterval(slideIn, rate);
				}
			} 

			function slideIn() {
				left -= width/100;
				elemIn.style.left = left+"px";
				if (opacity < 1) {
					opacity += 1 / (width/2) * (width/100);
				}
				elemIn.style.opacity = opacity;
				
				if (left <= 0) {
					clearInterval(playing);
					elemIn.style.left = "0px";
				}
			}
		}
		
		/**effect: fall*/
		else if (effect == "fall") {
			var height = this.height;
			var rate;
				
			if (interval === false || interval >= ((dRate*1000)+200) ) {
				// Default animation speed. rate = 500; is for one second.
				rate = dRate * 500;
			} else if (interval < ((dRate*1000)+200) && interval > 400) {
				// Adjusts the animation duration to complete within the interval time period. +200 millisecond pause.
				rate = (interval-200) / 2;
			} else {
				// Make faster than 400 millisecond animations continuous without any pause.
				rate = (interval) / 2;
			}
			
			eval(direction);
			
			$(elemOut).stop().animate({"top": height+"px","opacity":"0"},rate,
				function(){
					$(elemOut).css({"display":"none", "top":"0", "opacity":"1"});
					$(elemIn).css({"display":"block","top": -height+"px", "opacity":"0"});
					$(elemIn).animate({"top": "0px", "opacity":"1"},rate);
				}
			);
			
		}
		
		/**effect: rotate*/
		else if (effect == "rotate") {
			var rate;
			
			if (interval === false || interval >= ((dRate*1000)+200)) {
				// Default animation speed. rate = 0.5; is for 1 second.
				rate = dRate * 0.5;
			} else if (interval < ((dRate*1000)+200) && interval > 400) {
				// Adjusts the animation duration to complete within the interval time period. +200 millisecond pause.
				rate = ( (interval-200) / 1000 ) / 2;
			} else {
				// Make faster than 400 millisecond animations continuous without any pause.
				rate = ( (interval) / 1000 ) / 2;
			}
			
			eval(direction);
			
			if (direction.indexOf("+= 1;") > -1 ){
				// next() function will rotate clockwise.
				elemOut.style.animation = "rotateOut " + rate + "s linear";
				setTimeout(function(){
					elemOut.style.display = "none";
					elemOut.style.removeProperty("animation");
					elemIn.style.display = "block";
					elemIn.style.animation = "rotateIn " + rate + "s linear";
				}, (rate * 1000));
				setTimeout(function(){
					elemIn.style.removeProperty("animation");
				}, (rate * 2000));
				
			} else if (direction.indexOf("-= 1;") > -1) {
				// prev() function will rotate counter-clockwise
				elemOut.style.animation = "rotateIn " + rate + "s linear reverse";
				setTimeout(function(){
					elemOut.style.display = "none";
					elemOut.style.removeProperty("animation");
					elemIn.style.display = "block";
					elemIn.style.animation = "rotateOut " + rate + "s linear reverse";
				}, (rate * 1000));
				setTimeout(function(){
					elemIn.style.removeProperty("animation");
				}, (rate * 2000));
				
			}
			
		}
		
		/**effect: none*/
		else {
			eval(direction);
			this.slide(this.current);
		}
	};
}
// NEXT
Carousel.prototype.next = function (effect, interval) {
	effect = effect 	|| false;
	interval = interval || false;
	
	var next = "var elemOut = this.slides[this.current];" +
	"(this.current === this.total) ? this.current = 0 : this.current += 1;" +
	"var elemIn = this.slides[this.current];";
	
	this.stop();	
	this._animate(next, effect, interval);
	
	if(typeof interval === 'number' && (interval % 1) === 0) {
		var context = this;
		this.run = setTimeout(function() {
			context.next(effect, interval);
		}, interval);
	}
};
// PREVIOUS
Carousel.prototype.prev = function (effect, interval) {	
	effect = effect 	|| false;
	interval = interval || false;
	
	var prev = "var elemOut = this.slides[this.current];" +
	"(this.current === 0) ? this.current = this.total : this.current -= 1;" +
	"var elemIn = this.slides[this.current];" ;
	
	this.stop();	
	this._animate(prev, effect, interval);
	
	if(typeof interval === 'number' && (interval % 1) === 0) {
		var context = this;
		this.run = setTimeout(function() {
			context.prev(effect, interval);
		}, interval);
	}
};
// STOP PLAYING
Carousel.prototype.stop = function () {
	clearTimeout(this.run);
};
// SELECT SLIDE
Carousel.prototype.slide = function (index) {	
	if (index >= 0 && index <= this.total) { 
		this.stop();
		for (var s = 0; s <= this.total; s++) {
			if (s === index) {
				this.slides[s].style.display = "block"; 
			} else {
				this.slides[s].style.display = 'none';
			}
		}
	} else {
		alert("Index " + index + " doesn't exist. Available : 0 - " + this.total);
	}
};