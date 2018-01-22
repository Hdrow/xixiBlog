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

	//取代系统alert
	h.alert = function(title, _class, _close){
		var oHtml = $('<div id="alert" class="alert '+_class+'"><div class="alert-inside"><div class="alert-title">'+title+'</div><a class="alert-confirm">确定</a></div><div class="alert-mask"></div></div>').appendTo('body');
		$('>div>a.alert-confirm', oHtml).on('click',  function(e){
			e.preventDefault();
			e.stopPropagation();
			oHtml.remove();
		});
		if(_close){
			$('>.alert-mask', oHtml).on('click',  function(e){
				e.preventDefault();
				e.stopPropagation();
				oHtml.remove();
			});
		};
		$(document).on('keydown.alert',function(event){
			e = event ? event :(window.event ? window.event : null); 
			if(e.keyCode==13){oHtml.remove();$(document).off('keydown.alert');} 
		});
	};

	//常用正则
	h.checkStr = function(str, type) {
		if(str && str != '') {
			type = type || 0;
			switch(type) {
				case 0:
					var reg = new RegExp(/^1[3-9]\d{9}$/); //手机号码验证
					break;
				case 1:
					var reg = new RegExp(/^[1-9]\d{5}$/); //邮政编码验证
					break;
				case 2:
					var reg = new RegExp(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/); //匹配EMAIL
					break;
				case 3:
					var reg = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/); //匹配身份证
					break;
				case 4:
					var reg = new RegExp(/^\d+$/); //是否为0-9的数字
					break;
				case 5:
					var reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]*[\w\u0391-\uFFE5]*$/); //不能以数字或符号开头
					break;
				case 6:
					var reg = new RegExp(/^\w+$/); //匹配由数字、26个英文字母或者下划线组成的字符串
					break;
				case 7:
					var reg = new RegExp(/^[\u0391-\uFFE5]+$/); //匹配中文
					break;
				case 8:
					var reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]+$/); //不能包含数字和符号
					break;
				case 9:
					var reg = new RegExp(/^\d{6}$/); //6位验证码验证
					break;
				case 10:
					var reg = new RegExp(/^\d{4}$/); //4位验证码验证
					break;
			} //end switch
			if(reg.exec($.trim(str))) return true;
			else return false;
		} //end if
		else return false;
	} //end func
	return h;
}



