/*
 * @Author: Hao 
 * @Date: 2017-11-15 11:49:44 
 * @Version: 1.0.0
 */
var y = importHy();

function importHy() {
	var h = {};
	
	//回到顶部
	h.backTop = function () {
		var top = $('<a class="back_top"><p></p></a>').appendTo("body");				//回到顶部的Dom结构
		top.on("click", function() {$("html,body").animate({scrollTop:0}, 300)});
		$(window).scroll(function(){
			if($(this).scrollTop() <=400 ){
				if( !top.hasClass('showed') ) return;
				top.fadeOut().removeClass('showed');
			}else{
				if( top.hasClass('showed') ) return;
				top.fadeIn().addClass('showed');
			}//end if
		});
	}();
	
	//加载更多
	h.loadMore = function (data, onepageNum, button) {
		var data = data;										//渲染数据
		var now = 1;											//渲染控制初始数据
		var onepageNum = onepageNum;							//每一页数量
		var totalNum = data.length;								//数据长度
		var pageCount = Math.ceil(totalNum / onepageNum);		//总页数
		renderData();
		$(button).on("click", renderData);
		function renderData () {
			var html = '';
			var begin = (now - 1) * onepageNum;
			for(var i = begin; i < begin + onepageNum; i ++) {
				if( i < totalNum ) {
					var rand = parseInt(255 * Math.random());
					html += '<a class="rand_color" style="background-color: rgb(255, 180, '+ rand +')">'+ data[i].number +'</a>'
				}
			}
			$(".load_wrap").append(html);
			now ++;
			if( pageCount < now ) $(button).hide();
		}//end func
	};
	
	//ScrollReveal插件
	h.scrollReveal = function () {
		var newMode = (window.addEventListener && !document.all) || (window.addEventListener && document.documentMode >= 10);
		newMode = newMode || false;
		if (newMode) {
			window.scrollReveal = new scrollReveal({ reset: true, move: '300px' });
		}//end if
	}

	//alert弹窗
	h.alert = function (text, callback) {
		var box = $('<div class="alertBox"><div><p class="text"></p><p class="btn"><a class="close">确认</a></p></div></div>').appendTo($('body'));
		box.find('.text').html(text);
		box.show();
		box.find('a.close').click(function () {
			box.remove();
			if(callback) callback();
		})//end func
	}

	//获取 http url参数
	h.getQueryString = function (name) {
		if(name && name!=''){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]); return null;
		}//end if
		else return null;
	}

	//分割数组
	h.sliceArr = function(array, size) {
		var result = [];
		for (var x = 0; x < Math.ceil(array.length / size); x++) {
			var start = x * size;
			var end = start + size;
			result.push(array.slice(start, end));
		}
		return result;
	}//end func

	//字符串截取
	h.setString = function (str, len) { 
		var strlen = 0;
		var s = "";
		for (var i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) > 128) {
				strlen += 2;
			} else {
				strlen++;
			}
			s += str.charAt(i);
			if (strlen >= len) {
				return s+"...";
			}
		}
		return s;
	}//end func
	return h;
}



