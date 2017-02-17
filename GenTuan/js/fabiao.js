/**
 * Created by Administrator on 2016/5/18.
 */
var id=getParamValue("pid");
$(function(){
    //ҳ����ʽ
    $("#zan a").click(function() {
		if($(this).attr("data") == "0"){
			$(this).attr("data","1");
			$(this).find("img").attr("src","img/zan_03light.png");		
		}else if($(this).attr("data")=="1"){
			$(this).find("img").attr("src","img/zan_03.jpg");
			$(this).attr("data",0);
		}
		
		
	})
    
    css();
});
function Q(obj){
    var width = $(window).width();
    if(width>720){
        width=720;
    }
    var num=(parseInt(obj)/720).toFixed(20) * width;
    return num+"px";
}
function css(){
	$("div").css({"padding-left":Q(20),"padding-right":Q(20)});
    $("#text").css({"height":Q(248),"padding-top":Q(32)});
    $("#text>textarea").css({"font-size":Q(32),"width":Q(680),"height":Q(214)});
    $("#zan").css({"padding-top":Q(40),"padding-bottom":Q(40),"margin-bottom":Q(25)});
    $("#zan a img").css({"width":Q(140),"height":Q(40)});
    $("button").css({"width":Q(680),"font-size":Q(36),"height":Q(90)});
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
function fabiao(){
	if($("#text textarea").val()==""){
		alert("请您输入要评论的内容");
	}else{
		$.ajax({
			type:"post",
			url:"/Comment/add/",
			async:true,
			dataType:"json",
			data:{orderId:id,content:$("#text textarea").val(),againBuy:$("#zan a").attr("data")},
			success:function(fbData){
				var fabiao=fbData.data;
				if(fabiao.status==0){
					alert("发表评价成功");
					window.location.href="http://www.ljmamatuan.com/MomBuy/GenTuan/GenTuan.html";
				}else{
					alert(fabiao.errordesc);
				}
			}
		});
	}
}
