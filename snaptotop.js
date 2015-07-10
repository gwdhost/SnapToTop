(function() {

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "SnapToTop";
    defaults = {
	    replacementClass: 'snap-to-top-replacement',
	    activeClass: 'fixed-snap',
	    distance_top: 20,
	    animation: true,
	    animationDuration: 500,
	    _randomMax: 1000,
	    _randomMin: 0,
	    _lockedClone: false,
	    _lastDirection: false,
	    _lastY: false
    };
    Plugin = (function() {
		function Plugin(element, options) {
        	this.element = element;
			this.options = $.extend(true, {}, defaults, options);
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		return Plugin;
	})();
    Plugin.prototype.init = function() {
	    this._id = Math.floor(Math.random() * (this.options._randomMax - this.options._randomMin)) + this.options._randomMin;
	    $(this.element).data('id', this._id);
	    this._height = $(this.element).outerHeight();
	    this._width = $(this.element).outerWidth();
	    this._parent = false;	    
	    if(jQuery(this.element).attr('data-parent')){
			this._parent = $(this.element).attr('data-parent');
			this._parent_top = $(this._parent).offset().top;
		}
		this._offset = $(this.element).offset();
		this._tagName = $(this.element).prop('tagName');
		this.options._lastY = $(window).scrollTop();
		this.scrollFixedTop();
	    
	    var scrollFixedTop = this;
	    
	    $(window).scroll(function(){
		    scrollFixedTop.scrollFixedTop();
	    });
    };
    Plugin.prototype.scrollFixedTop = function(){
	    var window_top = $(window).scrollTop();
	    
	    /* GETTING THE DIRECTION OFF SCROLLING */
		if(window_top > this.options._lastY){
			this.options._lastDirection = 'down';
		} else if(window_top < this.options._lastY){
			this.options._lastDirection = 'up';
		} else {
			this.options._lastDirection = 'still';
		}
		console.log(this.options._lastDirection);
		if(this._offset.top - this.options.distance_top <= window_top && (!this._parent || (this._parent_top - window_top >= (this.options.distance_top*2) + this._height))){
			if(this.options._lockedClone){
				/* IF THE FADE ON CLONED ELEMENT ISN'T FINISHED, THEN STOP THE FADING */
				$(this.options._lockedClone).stop(true, true);
			}
			if(!$(this.element).hasClass(this.options.activeClass)){
				this._addReplacement();
				$(this.element).addClass(this.options.activeClass);
				$(this.element).stop().css({
					'width': this._width,
					'position': 'fixed',
					'left': this._offset.left,
					'top': this.options.distance_top,
				});
				if(this.options._lastDirection == "up" && this.options.animation){
					$(this.element).stop().hide();
					$(this.element).fadeIn(this.options.animationDuration, function(){
						
					});
				} else {
					$(this.element).stop().show();
				}
			}
		} else if(this._parent_top - window_top < (this.options.distance_top*2) + this._height) {
			/* THE ELEMENT IS AT THE STOP ELEMENT */
			var scrollFixedTop = this;
			if(this.options.animation){
				this.options._lockedClone = $(this.element).clone();
				$(this.options._lockedClone).css({
					'position': 'absolute',
					'left': $(this.element).offset().left,
					'top': $(this.element).offset().top,
					'margin-left': 0,
					'margin-right': 0
				});
				$('body').append(this.options._lockedClone);
				$(this.options._lockedClone).stop().fadeOut(this.options.animationDuration, function(){
					$(scrollFixedTop.options._lockedClone).remove();
					scrollFixedTop.options._lockedClone = false;
				});
			}
			scrollFixedTop._removeReplacement();
			$(scrollFixedTop.element).removeAttr('style');
			$(scrollFixedTop.element).removeClass(scrollFixedTop.options.activeClass);
			
		} else if(this._offset.top - this.options.distance_top > window_top){
			/* IF WINDOW TOP IS AT THE CORRECT POSITION FOR THE ELEMENT, THEN JUST FIX IT, WITHOUT ANIMATION */
			this._removeReplacement();
			$(this.element).removeAttr('style');
			$(this.element).removeClass(this.options.activeClass);
		}
		this.options._lastY = window_top;
    };
    Plugin.prototype._addReplacement = function(){
	    /* THE REPLACEMENT HELPS THE CONTENT, NOT TO JUMP AROUND, WHEN THE ELEMENT IS FIXED */
	    var replacement = document.createElement(this._tagName);
    	replacement.className = this.options.replacementClass;
    	replacement.id = 'snap-to-top-replacement-' + this._id;
    	$(replacement).css({
	    	'width': this._width,
	    	'height': this._height,
	    	'opacity': 0
    	});
    	
    	$(this.element).after(replacement);
    };
    Plugin.prototype._removeReplacement = function(){
	    $('#snap-to-top-replacement-' + this._id).remove();
	};
    return $.fn[pluginName] = function(options) {
  	    return this.each(function() {
    	    if (!$.data(this, "plugin_" + pluginName)) {
				return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
    };
  })(jQuery, window, document);

}).call(this);
