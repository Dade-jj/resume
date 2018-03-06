var EventCenter = {
	on : function(type,handler){
		$(document).on(type,handler);
	},

	fire : function(type,data){
		$(document).trigger(type,data);
	}
}

var footer = {
	init : function(){
		this.$footer = $("footer");
		this.$box = $("footer .box");
		this.$ul = $("footer").find("ul");
		this.$rightIcon = $("footer").find(".icon-right");
		this.$leftIcon = $("footer").find(".icon-left");
		this.isToEnd = false;
		this.isToStart = true;
		this.isAnimate = false;
		this.bind();
		this.render();		
	},	

	bind : function(){
		var _this = this;
		this.$rightIcon.on("click",function(){
			var itemWidth = _this.$ul.find("li").outerWidth(true);
			var lineCount = Math.floor(_this.$box.width()/itemWidth);
			if(_this.isAnimate)return;
				if(!_this.isToEnd){
					_this.isAnimate = true;
					_this.$ul.animate({
						left: '-='+ lineCount * itemWidth					
					},400,function(){
						_this.isToStart = false;
						_this.isAnimate = false;
						if(_this.$box.width() - parseFloat(_this.$ul.css("left")) >= _this.$ul.width()){
							_this.isToEnd = true;
						}
					})
				}				
		});

		this.$leftIcon.on("click",function(){
			var itemWidth = _this.$ul.find("li").outerWidth(true);
			var lineCount = Math.floor(_this.$box.width()/itemWidth);
			if(_this.isAnimate)return;
			if(!_this.isToStart){	
				_this.isAnimate = true;			
				_this.$ul.animate({
					left: '+='+ lineCount * itemWidth
				},400,function(){
					_this.isToEnd = false;
					_this.isAnimate = false;
					if(parseFloat(_this.$ul.css("left")) >= 0){
						_this.isToStart = true;
					}
				})
			}
		});

		this.$ul.on("click","li",function(){
			$(this).addClass('active').siblings().removeClass("active");
			EventCenter.fire("select-albumn",{
				channelId: $(this).attr("data-channelId"),
				channelTag: $(this).attr("data-channelName"),
			})
		})
	},

	render : function(){
		var _this = this;
		$.getJSON('http://api.jirengu.com/fm/getChannels.php')
		 .done(function(ret){
		 	_this.renderFooter(ret.channels);
		 })
	},
	
	renderFooter : function(channels){
		var html = '';
		channels.forEach(function(channel){
			html += '<li data-channelId='+channel.channel_id+' data-channelName='+channel.name+'>';
			html += '<div class="cover" style="background-image: url('+channel.cover_small+')"></div>';
			html += '<h4>'+channel.name+'</h4>'
			html += '</li>';
		})
		this.$ul.append(html);
		this.setStyle();
	},

	setStyle : function(){
		var liCount = this.$ul.find('li').length;
		var boxWidth = this.$box.css("width");
		this.$ul.css({width: this.$ul.find('li').outerWidth(true) * liCount + 'px'}) 
	}
}

var fm = {
	init : function(){
		this.$container = $("#page-music");
		this.$action = this.$container.find(".action");
		this.$detail = this.$container.find(".detail");
		this.audio = new Audio();
		this.audio.autoplay = true;
		this.bind();
		this.render();

	},

	bind : function(){
		var _this = this;
		EventCenter.on("select-albumn",function(e,data){
			_this.channelId = data.channelId;
			_this.channelName = data.channelTag;
			_this.$action.find(".btn-collect").removeClass("active");			
			_this.loadMusic(function(){
				_this.setMusic();
			});
		});

		this.$action.on("click",".btn-play",function(){
			if($(this).hasClass("icon-play")){
				$(this).removeClass("icon-play")
				$(this).addClass("icon-pause")
				_this.audio.play();
			}else {
				$(this).removeClass("icon-pause")
				$(this).addClass("icon-play")
				_this.audio.pause();
			}
		});

		this.$action.on("click",".btn-next",function(){
			_this.loadMusic(function(){
				_this.setMusic();
			})
		})

		this.audio.addEventListener("play",function(){
			clearInterval(_this.statusClock)
			_this.statusClock = setInterval(function(){
				_this.updateStatus();
			},1000)
		})

		this.audio.addEventListener("pause",function(){
			clearInterval(_this.statusClock)
		})

		this.audio.onplay = function(){
			_this.$action.find(".btn-play").removeClass("icon-play").addClass("icon-pause");
		}

		this.$action.find(".btn-collect").on("click",function(){
			if($(this).hasClass("active")){
				$(this).removeClass("active");
			}else {
				$(this).addClass("active")
			}
		})

		this.$detail.find(".bar").on("click",function(event){
			var percent = event.offsetX/parseInt(getComputedStyle(this).width);
			_this.audio.currentTime = _this.audio.duration * percent;
		})

	},

	render : function(){

	},

	loadMusic : function(callback){
		var _this = this;
		$.getJSON('https://jirenguapi.applinzi.com/fm/getSong.php',{channel:this.channelId})
			.done(function(ret){
				_this.song = ret['song'][0];
				callback();
				_this.loadLyric();
			})
	},

	setMusic : function(){
		this.audio.src = this.song.url;
		$(".bg").css(
			'background-image', 'url('+this.song.picture+')'
		);
		this.$container.find(".author").text(this.song.artist);
		this.$container.find(".detail h4").text(this.song.title);
		this.$container.find("figure").css(
			'background-image', 'url('+this.song.picture+')'
		);
		this.$container.find(".detail .tag").text(this.channelName);
	},

	loadLyric : function(){
		var _this = this;
		$.getJSON('https://jirenguapi.applinzi.com/fm/getLyric.php',{sid:this.song.sid})
		 .done(function(ret){
		 	var lyric = ret.lyric;
		 	var lyricObject = {};
		 	lyric.split("\n").forEach(function(line){
		 		var times = line.match(/\d{2}:\d{2}/);
		 		var str = line.replace(/\[.+?\]/g,'');
		 		if(Array.isArray(times)){
		 			times.forEach(function(time){
		 				lyricObject[time] = str;
		 			})
		 		}
		 	})
		 	_this.lyricObject = lyricObject;
		 })
	},

	updateStatus : function(){
		var _this = this;
		var min = Math.floor(this.audio.currentTime / 60);
		var second = Math.floor(this.audio.currentTime % 60) + "";
		second = second.length == 2?second:"0"+second;
		this.$detail.find(".current-time").text(min+":"+second);
		this.$container.find(".area-bar .bar-progress").css(
			'width', _this.audio.currentTime/_this.audio.duration*100 +"%"
		)
		var line = this.lyricObject["0"+min+':'+second];
		if(line){
			this.$detail.find(".lyric p").text(line).boomText();
		}		
	}
}


$.fn.boomText = function(type){
	type = type || "rollIn";
	this.html(function(){
		var arr = $(this).text()
			.split('').map(function(word){
				return '<span class="boomText" style="display:inline-block">'+word+'</span>'
			})
			return arr.join('');	
	})

	var index = 0;
	var $boomTexts = $(this).find('span')
	var clock = setInterval(function(){
		$boomTexts.eq(index).addClass('animated '+type)
		index++;
		if(index >= $boomTexts.length){
			clearInterval(clock);
		}
	},300)
}

footer.init();
fm.init();