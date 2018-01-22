$(document).ready(function () {
    // 变量定义
    var label1 = $(".label1");
    var code ;                                  //在全局定义验证码       
    var point1 = $(".point1");
    var point2 = $(".point2");
    var submit = $(".submit");
    var code1 = $("#code");

    var user = $("#user").val().trim();
    var pass = $("#pass").val().trim();
    var password = $("#password").val().trim();
    var number = $("#number").val().trim();
    var qr = $("#qr").val().toUpperCase().trim();

    // 页面初始化
    function pageInit() {
        iptClick();
        checkCode();

        judgeIpt(); 
        evenBind();
    }//end func
    pageInit();

    //事件绑定
    function evenBind() {
       submit.on("click",judgeIpt);
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
    }

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
    }
    
    //注册判断
    function judgeIpt () {
        


       
        // if(user.length < 4) {
        //     y.alert("账号不得少于4个字符");
        // }else if(!y.checkStr(user,6)) {
        //     y.alert("账号不符合规则");
        // }else if(pass.length < 6) {
        //     y.alert("密码不得少于6个字符");
        // }else if(!y.checkStr(pass,6)) {
        //     y.alert("密码不符合规则");
        // }else if(password !== pass) {
        //     y.alert("两次密码输入不一致");
        // }else if(number.length <= 0) {
        //     y.alert("手机号不能为空");
        // }else if(!y.checkStr(number,0)) {
        //     y.alert("请输入正确的手机号");
        // }else if(qr.length <= 0) {
        //     y.alert("请输入验证码");
        // }else if(qr != code ) {
        //     y.alert("请输入正确的验证码");
        // }else {
        //     y.alert("注册成功");
        //     $(".alert-confirm").on("click",function () {
        //         console.log(1);
        //     });
        // }
    }

    

})//end ready