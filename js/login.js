$(document).ready(function () {
	var trList=['leftUp','moveRight','moveDown','centerBig','rightDownBig'];	//背景c3动画定义
	
	// 页面初始化
	function pageInit () {
		lrSwiper ();
		evenBind ();	
	}
	pageInit ();
	//事件绑定
	function evenBind () {
		$(".button_register").on("click", function () {
			window.location = "register.html";
		});
	}

	//登陆注册页背景动画轮播swiper
	function lrSwiper () {
		var mySwiper = new Swiper('#swiperLogin',{
			speed:500,
			autoplay:4400,
			autoplayDisableOnInteraction:false,
			effect:'fade',
			// paginationClickable :true,
			onSlideChangeStart: function(swiper){
				nextSlide=swiper.slides.eq(swiper.activeIndex);
				nextSlide.addClass(trList[Math.floor(Math.random()*5)]);
			},
			onSlideChangeEnd: function(swiper){
				prevSlide=swiper.slides[swiper.previousIndex];
				prevSlide.className="swiper-slide";
			},

		});	
	}
	
})//end ready