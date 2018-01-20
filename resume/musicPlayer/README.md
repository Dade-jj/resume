# 音乐播放器
- 自己为了练习css和JavaScript而做的一个音乐播放器
## API
### 属性
1. currentIndex 表示当前播放到第几首歌
2. clock 计数器编号
3. musicList 音乐列表
##### audio 音乐对象
```
var audio = new Audio();
audio.src = 'http://cloud.hunger-valley.com/music/玫瑰.mp3';
```
##### audio.play()
开始播放
##### audio.pause();
暂停播放
##### audio.autoPlay;
设置自动播放
```
audio.autoPlay = true;
audio.autoPlay = false;
```
##### audio.src
设置或者获取文件
```
audio.src = 'http://cloud.hunger-valley.com/music/玫瑰.mp3';
```
获取音乐长度，单位为秒
##### audio.currentTime
获取当前音乐的播放时间
##### audio.ended
判断音乐是否播放完毕
### 事件 
##### 1.play
当音乐开始播放时触发
```
audio.onplay = function(){
 console.log('playing')
}
```
##### 2.pause
当音乐暂停时触发
```
audio.onpause = function(){
 console.log('pause')
}
```
##### 3.ended
当音乐结束触发
```
audio.ended = function(){
 console.log('ended')
}
```
##### 4.timeupdate
当currentTime更新时会触发这个事件
```
audio.ontimeupdate = function(){
 console.log('timeupdate')
}
```
#### [效果预览](https://dade-jj.github.io/resume/resume/musicPlayer/index.html)
