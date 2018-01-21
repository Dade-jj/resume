document.querySelectorAll('.header .child').forEach(function(node){
	node.addEventListener('click',function(){
		var index;
		this.parentElement.querySelectorAll('.child').forEach(function(tab,inx){
			tab.classList.remove('active');
			if(node == tab){
				index = inx;
			}
		});

		this.classList.add('active');
		this.parentElement.nextElementSibling.querySelectorAll('.pannel').forEach(function(pannel){
			pannel.classList.remove('active');
		});
		this.parentElement.nextElementSibling.querySelectorAll('.pannel')[index].classList.add('active');
	});
});