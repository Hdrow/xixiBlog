// 加载头部和底部
var $o = {};
$(document).ready(function(e) {
	$o = {
		win:$(window),
		document:$(document),
		html:$('html'),
		body:$('body'),
		navbarToggle : $('#navbarToggle,#navbarToggleMask'),
		header : $('#header'),
		footer : $('#footer'),
		cateNav : $('#cateNav'),
		searchBar : $('.search-bar')
	};
	
	$.get('header.html', function(data){
		$o.header.html(data);
	});
	$.get('footer.html', function(data){
		$o.footer.html(data);
	}); 

});