## 组件功能
一个通过面向写法tab切换的小组件，点击tab栏可显示不同的面板
## 组件实现方式
```
function Tab(node) {
	this.$node = $(node);
}
	
Tab.prototype = {
	constructor : Tab,

	init : function(){
		this.$ul = this.$node.find("ul");
		this.$pannel = this.$node.find(".pannel");
		this.index = 0; 
		this.bind();
	},

	bind : function(){
		var _this = this;
		this.$ul.on("click","li",function(){
			$(this).addClass("active").siblings().removeClass("active");
			this.index = $(this).index();
			// console.log(_this.$pannel);
			_this.$pannel.eq(this.index).addClass("show").siblings().removeClass("show");
		})
	},

}	
```
创建了一个Tab构造函数并重写了原型。原型的constructor指向构造函数Tab，init是去初始化参数并执行方法，bind用来绑定事件。
```
function People(node) {
	Tab.call(this,node);
}

People.prototype = new Tab();
People.prototype.constructor = People;

var tab1 = new Tab(document.querySelectorAll(".tab-container")[0]);
var tab2 = new People(document.querySelectorAll(".tab-container")[1]);
```
构造函数People借用了Tab构造函数中的参数，并将Tab的一个实例作为原型，People的实例可从自己的原型上去寻找init方法从而实现了继承。

## 如何使用
通过向People或者Tab构造函数传入参数并创建实例执行init方法。
