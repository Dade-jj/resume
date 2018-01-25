$(".add").click(function(){
	$(".pannel .prod").removeClass("hover");
	var data = generate();
});

$(".edit").click(function(){
	$(".pannel .prod").toggleClass("hover");
});

$(".pannel").on("click","a",function(){
	$(this).parents(".prod").remove();
});

function getData(){
	var result = [];
	for(var i=0;i<3;i++){
		var obj = {
			jewelName: "珠宝",
			jewelprice: '￥'+Math.floor(Math.random()*100),
			img: "https://picsum.photos/200/200/?image="+Math.floor(Math.random()*100)
		}
		result.push(obj);
	}
	return result;
}

function generate(){
	var prod = getData();
	$.each(prod,function(inx,node){
		var html = generateLi(node);
		$(".pannel").append(html);
	});
}

function generateLi(prod){
	var html = '';
	html += '<li class="prod">';
	html += '<div class="cover">';
	html += '<a class="delete" href="javascript:void(0);">删除</a>';
	html += '</div>'; 
	html += '<img src="'+prod.img+'">';
	html += '<div class="jewel-name">'+prod.jewelName+'</div>';
	html += '<div class="jewel-price">'+prod.jewelprice+'</div>';
	html += '</li>';
	return html;
}