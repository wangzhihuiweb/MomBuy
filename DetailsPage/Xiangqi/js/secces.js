/**
 * Created by Administrator on 2016/5/19.
 */
id = getParamValue("orderid");
$(function(){
   css();
   $.ajax({
   	type:"post",
   	url:"/Order/detail/",
   	async:true,
   	data:{order_id:id},
   	dataType:"json",
   	success:function(genData){
   		var order=genData.data;
   		if(order.pay_status==2){
	   		$(".banner img").attr("src",order.icon);
	   		$(".banner img").attr("onclick","Jump("+ order.pId +")");
	   		$(".banner h1").html(Tittle(order.pTitle));
	   		$(".bid b").html(order.order_id);
	   		$(".num b").html(order.num);
	   		$(".money b").html("&yen;"+Number(order.total).toFixed(0));
	   		$(".tel b").html(order.mobile);
            $("#add h1").html(order.addressTitle);
	   		//if(order.logistics_type==1){
                //$("#add h1").html("团主家自提");
            //}else{
            //    $("#add h1").html("本小区代收点自提");
            //}
            if(order.username != ''){
                $("#add div b").html(order.username + '&nbsp;&nbsp;' + order.phone);
            }else{
                $("#add div b").html(order.phone);
            }

            $("#add div span").html(order.address);
        }
        if(order.pay_status==3){
   			$("#top img").attr("src","img/fail.jpg");
   			$("#top span").html("支付失败 !");
   		}
		//加载购买这个商品的邻居信息
		$.ajax({
			type:"post",
			url:"/Order/getNeighborList/",
			async:true,
			data:{pId:order.pId},
			dataType:"json",
			success:function(pidData){
				var liju=pidData.data;
				if(liju.count==0){
					$("#kankan").css("display","none");
					$("#list").css("display","none");
				}else{
					$("#kankan span").html("(共"+liju.count+"条购买记录)");
					for(var i=0;i<liju.content.length;i++){
						var order=liju.content[i];
						var str=
							'<li>'+
				                '<div>'+
				                    '<img src="'+order.headimgurl+'" alt=""/>'+
				                    '<p>'+
				                        '<span>'+order.nickname+'</span>'+
				                        '<b>购买了 <span>'+order.num+'</span> 件</b>'+
				                    '</p>'+
				                    '<span>'+order.addtime+'</span>'+
				                '</div>'+
				            '</li>';
				        $("#list ul").append(str);    
				        css()
					}
				}
			}
		});
   	}
   });
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
	 $("#top").css({"height":Q(176)});
    $("#top>img").css({"margin-top":Q(70),"width":Q(355),"height":Q(52)});
    $("#main").css({"margin-bottom":Q(20)});
    $("#main>.banner").css({"padding-top":Q(39),"padding-bottom":Q(39),"padding-left":Q(20),"padding-right":Q(20)});
    $("#main>.banner>img").css({"width":Q(90),"height":Q(90)});
    $("#main>.banner>h1").css({"width":Q(548),"font-size":Q(32),"margin-left":Q(20),"line-height":Q(46)});
    $("#main>ul").css({"padding-left":Q(20),"padding-right":Q(20)});
    $("#main>ul>li").css({"font-size":Q(32),"height":Q(71)});
    $("#add").css({"padding-top":Q(30),"padding-bottom":Q(30),"padding-left":Q(20),"padding-right":Q(20)});
    $("#add>h1").css({"font-size":Q(32),"margin-bottom":Q(14)});
    $("#add span,#add b").css({"font-size":Q(34),"line-height":Q(44)});
    $("#add>div>b").css({"margin-right":Q(20),"font-size":Q(32)});
    $("#kankan").css({"font-size":Q(32),"padding-top":Q(19),"padding-bottom":Q(19),"padding-left":Q(20),"padding-right":Q(20)});
    $("#kankan>span").css({"margin-left":Q(15),"font-size":Q(28)});
    $("#list").css({"margin-bottom":Q(30)});
    $("#list>ul>li").css({"padding-top":Q(30),"padding-bottom":Q(24),"padding-left":Q(20),"padding-right":Q(20)});
    $("#list>ul>li>div>img").css({"width":Q(80),"height":Q(80),"margin-right":Q(20)});
    $("#list>ul>li>div>p").css({"margin":Q(0)});
    $("#list>ul>li>div>p>span").css({"font-size":Q(28)});
    $("#list>ul>li>div>p>b").css({"font-size":Q(32),"margin-top":Q(6)});
    $("#list>ul>li>div>span").css({"font-size":Q(24)});
    $("#top span").css({"top":Q(65),"left":Q(330),"font-size":Q(44)});
    $("#list>ul>li>div>p>b>span").css({"font-size":Q(38)});
	var width = $(window).width()
    if(width>720){
    	width=720;
    }
    //$("body").css({"padding-top":Q(86)})
    $("body").css({"padding-bottom":width*0.1409+"px"})
//"padding-bottom":width*0+"px"
	$("footer").css({"padding-top":width*0.024+"px"});
	$("footer a").css({"height":width*0.105+"px"})
	$("footer a b").css({"font-size":width*0.026+"px"})
	$("footer a.home").css({"padding-left":width*0.0625+"px","padding-right":width*0.0625+"px"})
	$("footer a.home span").css({"width":width*0.072+"px","height":width*0.053+"px","top":width*0.0069444+"px"})

	
	
	$("footer a.Ingroup").css({"padding-left":width*0.083+"px","padding-right":width*0.073+"px"})
	$("footer a.Ingroup span").css({"width":width*0.081+"px","height":width*0.061+"px"})
	
	$("footer a.mine").css({"padding-left":width*0.07+"px","padding-right":width*0.07+"px"})
	$("footer a.mine span").css({"width":width*0.058+"px","height":width*0.058+"px"})
	
	$("footer a.Withgroup").css({"padding-left":width*0.07+"px","padding-right":width*0.081+"px"})
	$("footer a.Withgroup span").css({"width":width*0.08+"px","height":width*0.052+"px","top":width*0.00416666+"px"})
	
	$("footer a.publish").css({"padding-left":width*0.049+"px","padding-right":width*0.049+"px","margin-left":-width*0.11+"px"})
	
	$("footer a.publish span").css({"width":width*0.125+"px","height":width*0.125+"px","top":-width*0.06+"px"})
	$("footer a.publish b").css({"width":width*0.125+"px"})
	$("footer a b").css({"margin-top":width*0.0655+"px"})
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
function Tittle(str){
	if(str.length>=32){
		var substr=str.slice(0,33).concat('...');
		return substr;
	}else{
		return str;
	}
}
function Jump(pid) {
//	alert(pid)
  window.location.href = "/MomBuy/DetailsPage/DetailsPage.html?pId=" + pid + "";

}