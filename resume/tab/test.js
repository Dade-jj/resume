$(".tab .child").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
	$(this).parents(".header").find(".pannel").eq($(this).index()).addClass("active").siblings().removeClass("active");
});