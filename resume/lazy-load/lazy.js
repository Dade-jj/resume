start();
$(window).on("scroll",function(){
	start();
});

function start(){
	$(".container img").not("data-isLoaded").each(function(){
		var $node = $(this);
		console.log(isShow($node));
		if(isShow($node)){
			setTimeout(function(){
				loadImg($node);
			},300);
		}
	});
}

function isShow($node){
	return $node.offset().top <= $(window).height() + $(window).scrollTop();
}

function loadImg($node){
	$node.attr("src",$node.attr("data-src"));
	$node.attr("data-isLoaded",1);
}