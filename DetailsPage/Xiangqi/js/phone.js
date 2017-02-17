/**
 * Created by Administrator on 2016/5/19.
 */
//获取商品ID
id=getParamValue("pid");
$(function(){
	
	
	
	//手机号验证
		$(".mobile").click(function(){
			var reg = /^\d{8}-\d{1,9}$|^\d{11}-\d{1,9}$|^\d{8}$|^\d{11}$/;
			var tel = $("#mobile").val();
				if(tel.trim() != ''){
					if(reg.test(tel)){
						$.ajax({
							type:"post",
							url:"/MyHome/setMobile/",
							dataType:"json",
							data:{mobile :tel},
							success:function(phoneData){
								if (phoneData.errorcode != "951" && phoneData.data != "") {
					                alert("手机号码更新成功");
					                window.location.href="http://www.ljmamatuan.com/MomBuy/DetailsPage/Xiangqi/fukuan.html?pid="+id;
					            } else{
					            	agin();
					              	alert("请正确填写手机号");
//					              	$("#mobile").val(teliphone);
				           		}
								
							}
						});
					}else{
						agin();
						alert("手机格式不正确");
//						$("#mobile").val(teliphone);
					}
				}else{
					agin();
						alert("手机格式不正确");
//						$("#mobile").val(teliphone);
				}
		});
    $("#phone").css({"font-size":Q(32),"padding-top":Q(36),"padding-right":Q(20),"padding-bottom":Q(32),"padding-left":Q(20),"margin-bottom":Q(20)});
    $("#phone>b").css({"margin-right":Q(42)});
    $("#phone>input").css({"font-size":Q(32)});
    $("button").css({"margin-left":Q(20),"margin-bottom":Q(294),"width":Q(680),"height":Q(90),"font-size":Q(40)});
});
function Q(obj){
    var width = $(window).width();
    if(width>720){
        width=720;
    }
    var num=(parseInt(obj)/720).toFixed(20) * width;
    return num+"px";
}
function agin(){
	 $.ajax({
        type: "POST",
        url: "/MyHome/index/",
        dataType: "json",
        success: function (resData) {
            if (resData.errorcode != "0" && resData.errorcode != "101") {
                return alert(resData.errordesc);

            } else if (resData.errorcode == "101") {
                window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
                return;
            }
            var user = resData.data;
            if(user.mobile!=$("#mobile").val()){
            	 $("#mobile").val(user.mobile);
            }else{
            	 $("#mobile").val();
            }
           
        }
        
    });
}
 function getParamValue(name) {
    var paramsArray = getUrlParams();
    if (paramsArray != null) {
        for (var i = 0; i < paramsArray.length; i++) {
            for (var j in paramsArray[i]) {
                if (j == name) {
                    return paramsArray[i][j];
                }
            }
        }
    }
    return null;
}
function getUrlParams() {
    var search = window.location.search;
    // 写入数据字典
    var tmparray = search.substr(1, search.length).split("&");
    var paramsArray = new Array;
    if (tmparray != null) {
        for (var i = 0; i < tmparray.length; i++) {
            var reg = /[=|^==]/;    // 用=进行拆分，但不包括==
            var set1 = tmparray[i].replace(reg, '&');
            var tmpStr2 = set1.split('&');
            var array = new Array;
            array[tmpStr2[0]] = tmpStr2[1];
            paramsArray.push(array);
        }
    }
    // 将参数数组进行返回
    return paramsArray;
}