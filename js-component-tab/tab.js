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

function People(node) {
	Tab.call(this,node);
}

People.prototype = new Tab();
People.prototype.constructor = People;

var tab1 = new Tab(document.querySelectorAll(".tab-container")[0]);
var tab2 = new People(document.querySelectorAll(".tab-container")[1]);

tab1.init();
tab2.init();