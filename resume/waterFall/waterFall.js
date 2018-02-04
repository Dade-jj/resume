var imgWidth = $(".waterFall img").outerWidth(true);
var colCount = Math.floor($(".waterFall").width()/imgWidth);
var colHeightArr = [];

for(var i = 0;i<colCount; i++){
	colHeightArr[i] = 0;
}	

$(".waterFall img").on("load",function(){
	var minValue = colHeightArr[0]
	var minIndex = 0
	for(var i=0; i<colCount;i++){
		if(colHeightArr[i]<minValue){
			minValue = colHeightArr[i];
			minIndex = i;
		}
	}
	$(this).css({
		left: minIndex*imgWidth,
		top: minValue,
	});
	colHeightArr[minIndex] += $(this).outerHeight(true);

});