$(document).ready(function () {
    // 变量定义
    var label1 = $(".label1");
    var code ;                                  //在全局定义验证码       
    var point1 = $(".point1");
    var point2 = $(".point2");
    var submit = $(".submit");
    var code1 = $("#code");

    var array = [];    

    // 页面初始化
    function pageInit() {
        // iptClick();
        checkCode();
        
        judgeIpt($("#user"),$(".r_user"),6);
        judgeIpt($("#pass"),$(".r_pass"),6);
        judgeIpt($("#number"),$(".phone"),0);
        twicePass($("#password"),$(".r_pass_again"));
        judgeQr();
        evenBind();
    }//end func
    pageInit();

    //事件绑定
    function evenBind() {
        submit.on("click",regist);
        code1.on("click",checkCode);
    }
    //注册框点击消失
    function iptClick() {
        $(".ipt").each(function (index, el) {
            $(el).focus(function () {
                $(this).siblings(label1).addClass("hide");
                $(this).parent().siblings(point1).addClass("active1");
            });
            $(el).blur(function () {
                if($(el).val().trim() == '') {
                    $(this).siblings(label1).removeClass("hide");   
                }
                $(this).parent().siblings(point1).removeClass("active1");   
            });
        })
    }//end func

    function checkCode() {
        //产生验证码  
        code = "";   
        var codeLength = 4;//验证码的长度  
        var checkCode = document.getElementById("code");   
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',  
        'S','T','U','V','W','X','Y','Z');//随机数  
        for(var i = 0; i < codeLength; i++) {//循环操作  
            var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）  
            code += random[index];//根据索引取得随机数加到code上  
        }  
        checkCode.value = code;//把code值赋给验证码  
    }//end func

    //二维码判断
    function judgeQr() {   
        $("#qr").on("focus", function () {
            $(this).siblings(label1).addClass("hide");
            if(!$(".verification").hasClass("active2")) {
                $(this).parent().siblings(point1).addClass("active1");
            }
        });
        $("#qr").on("blur", function () {
            var qr = $("#qr").val().toUpperCase().trim();
            var ver = $(".verification");
            if(qr !== $("#code").val().trim()) {
                ver.siblings(point2).addClass("active2");   
                ver.addClass("active2");
                ver.children(label1).addClass("hide");  
            }else {
                ver.children(".current").addClass("show");
                ver.siblings(point2).removeClass("active2");   
                ver.removeClass("active2");
            }
            $(this).parent().siblings(point1).removeClass("active1");   
        });
    }//end func
    
    //注册判断
    function judgeIpt (name,r_name,num) {
        name.on("focus", function () {
            $(this).siblings(label1).addClass("hide");
            if(!r_name.hasClass("active2")) {
                $(this).parent().siblings(point1).addClass("active1");
            }
        });
        name.on("blur", function () {
            var user = name.val().trim();
            var rUser = r_name;
            if(user.length < 4 || !y.checkStr(user,num)) {
                rUser.siblings(point2).addClass("active2");   
                rUser.addClass("active2");
                rUser.children(label1).addClass("hide");  
            }else {
                rUser.children(".current").addClass("show");
                rUser.siblings(point2).removeClass("active2");   
                rUser.removeClass("active2");
            }
            $(this).parent().siblings(point1).removeClass("active1");   
        });
    }//end func

    //第二次判断密码
    function twicePass(name,r_name) {
        name.on("focus", function () {
            $(this).siblings(label1).addClass("hide");
            if(!r_name.hasClass("active2")) {
                $(this).parent().siblings(point1).addClass("active1");
            }
        });
        name.on("blur", function () {
            var user = name.val().trim();
            var rUser = r_name;
            if(user.length < 4 || user !== $("#pass").val().trim()) {
                rUser.siblings(point1).removeClass("active1");                   
                rUser.siblings(point2).addClass("active2");   
                rUser.addClass("active2");
                rUser.children(label1).addClass("hide");  
            }else {
                rUser.children(".current").addClass("show");
                rUser.siblings(point2).removeClass("active2");   
                rUser.removeClass("active2");
            }
            $(this).parent().siblings(point1).removeClass("active1");   
        });
    }//end func

    // 注册按钮
    function regist () {
        $(".ipt_box").children(".show").each(function(index) {
            array.push(index);
            console.log(array);
            
            removalArray(array);
            console.log(array);
            
        })
    }//end func

    // 数组去重
    function removalArray(arr) {
        var ret = [];
        for(var i = 0, j = arr.length; i < j; i++) {
            if(ret.indexOf(arr[i]) === -1) {
                ret.push(arr[i]);
            }
        }
        return ret;
    }//end func

})//end ready