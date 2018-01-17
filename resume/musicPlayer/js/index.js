function $(node){
	return document.querySelector(node);
}

function $$(node){
	return document.querySelectorAll(node);
}


var currentIndex = 0;
var audio = new Audio();
var clock;
var musicList;
audio.autoplay  = true;
getMusicList(function callback(list){
	musicList = list;
	setPlaylist(list);
	loadMusic(list[currentIndex]);
});

audio.ontimeupdate = function(){
	$(".progress .progress-now").style.width = (this.currentTime/this.duration)*100 + "%";
}

$(".music-pannel .play").onclick = function(){
	if(audio.paused){
		audio.play();
		this.querySelector(".iconfont").classList.remove("icon-bofang");
		this.querySelector(".iconfont").classList.add("icon-bofang1");
	}else{
		audio.pause();
		this.querySelector(".iconfont").classList.remove("icon-bofang1");
		this.querySelector(".iconfont").classList.add("icon-bofang");
	}
}

audio.onplay = function(){
	var liList = $$(".music-list li");
	liList.forEach(function(li){
		console.log(li.classList.remove("active"));
	});
	$$(".music-list li")[currentIndex].classList.add("active");
	$(".music-pannel .play .iconfont").classList.remove("icon-bofang");
	$(".music-pannel .play .iconfont").classList.add("icon-bofang1");
	clock = setInterval(function(){
		var minute = Math.floor(audio.currentTime/60);
		var second = Math.floor(audio.currentTime%60) + '';
		second = second.length==2?second:"0" + second;
		$(".time").innerText = minute + ":" + second;
	},1000);
}

audio.onpause = function(){
	clearInterval(clock);
}

function getMusicList(callback){	
	var xhr = new XMLHttpRequest();
	xhr.open('get','music.json',true);
	xhr.onload = function(){
		if((xhr.status >= 200 || xhr.status < 300)||xhr.status == 304){
			callback(JSON.parse(xhr.responseText));
		}		
	}
	xhr.send();
}

function loadMusic(musicObj){
	$('.music .songName').innerText = musicObj.title;
	$('.music .author').innerText = musicObj.auther;
	audio.src = musicObj.src;
}

$(".music-pannel .forward").onclick = function(){
	currentIndex = (++currentIndex)%musicList.length;
	loadMusic(musicList[currentIndex]);
}

$(".music-pannel .back").onclick = function(){
	currentIndex = (musicList.length + (--currentIndex))%musicList.length;
	loadMusic(musicList[currentIndex]);
}

$(".music-pannel .bar").onclick = function(e){
	var percent = e.offsetX/parseInt(getComputedStyle(this).width);
	audio.currentTime = audio.duration * percent;
}

audio.onended = function(){
	currentIndex = (++currentIndex)%musicList.length;
	loadMusic(musicList[currentIndex]);
}

function setPlaylist(musiclist){
    var container = document.createDocumentFragment()
    var i = 0;
    musiclist.forEach(function(musicObj){
       var node = document.createElement('li')
       node.innerText = musicObj.auther + '-' + musicObj.title
       node.setAttribute("index", i++);
       node.setAttribute("class", "");
       container.appendChild(node);
    });
    $(".music-list").appendChild(container)
}

$(".music-list").addEventListener("click",function(e){
	var target = e.target;
	currentIndex = target.getAttribute("index");

	loadMusic(musicList[currentIndex]);
});