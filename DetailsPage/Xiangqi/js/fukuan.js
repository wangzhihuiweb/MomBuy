/**
 * Created by Administrator on 2016/5/20.
 */
//获取商品ID
id=getParamValue("pid");
$(function() {
	$.ajax({
		type:"post",
		url:"/Product/getOrderAddress/",
		data:{"pId":id},
		dataType:"json",
		success:function(addData){
				var addr=addData.data;
				if(addr.logistics_mobile==null || addr.logistics_mobile == ''){
					alert("您还没有设置电话，请您先设置电话");
					window.location.href="http://www.ljmamatuan.com/MomBuy/DetailsPage/Xiangqi/phone.html?pid="+id;
				}else{
					$("#add h1").html(addr.addressTitle);
                    if(addr.username != ''){
                        $("#add div b").html(addr.username + '&nbsp;&nbsp;' + addr.mobile);
                    }else{
                        $("#add div b").html(addr.mobile);
                    }

					$(".lianxi b").html(addr.logistics_mobile);
					$("#add div span").html(addr.address);
					$(".dshow").html("¥"+addr.express_money);
					$("#list>ul>li>b.dsqh").html(addr.logistics_name);
					$.ajax({
						type:"post",
						url:"/Product/detail/",
						data:{"id":id},
						dataType:"json",
						success:function(Data){
							var data=Data.data;
							$("#main img").attr("src",data.icon);
							$("#main img").attr("onclick","Jump("+ data.id +")");
							$("#main div h1").html(Tittle(data.title));
							$(".price").html("¥ "+parseFloat(data.price).toFixed(0));							
							heji();
						}
					});
				}
			}
		})
   css();
   //支付切换功能
   $(".fufu").click(function(){
   		if($(this).attr("src")=="img/huan.jpg"){
   			$(this).attr("src","img/dui.jpg");
   			$(".fufu1").attr("src","img/huan.jpg")
   		}else{
   			return;
   		}
   	
   })
   $(".fufu1").click(function(){
   		if($(this).attr("src")=="img/huan.jpg"){
   			$(this).attr("src","img/dui.jpg");
   			$(".fufu").attr("src","img/huan.jpg")
   		}else{
   			return;
   		}
   	
   })
   $(".ddf1").click(function(){
		$(".fufu").trigger("click");
   })
   $(".ddf2").click(function(){
		$(".fufu1").trigger("click");
   })
   //购物车 加减功能
   $("#jian").click(function(){
   		var s=parseInt($("#cot").html());
   		s++;
   		$("#cot").html(s);
   		heji()
   })
   $("#addjia").click(function(){
   		var s=parseInt($("#cot").html());
   		s--;
   		if(s<=0){
   			s=1;	
   		}
   		$("#cot").html(s);
   		heji()
   })
  
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
	 $("#add").css({
        "padding-top": Q(28), "padding-bottom": Q(28),
        "padding-left": Q(20), "padding-right": Q(20)
    });
    $("#add>h1").css({"font-size": Q(32), "margin-bottom": Q(14)});
    $("#add span,#add b").css({"font-size": Q(34), "line-height": Q(44)});
    $("#add>div>b").css({"margin-right": Q(20),"font-size":Q(32)});
    $("#main").css({
        "margin-top": Q(20), "padding-top": Q(40), "padding-left": Q(20), "padding-bottom": Q(40)
        , "padding-right": Q(20)
    });
    $("#main>img").css({"width": Q(169), "height": Q(170), "margin-right": Q(20)});
    $("#main>div>h1").css({"font-size": Q(32), "margin-top": Q(-5)});
    $("#main>div>div").css({"margin-top": Q(40)});
    $("#main>div>div>span").css({"font-size": Q(32),"margin-left":Q(10)});
    $("#main>div>div>div").css({"font-size": Q(28)});
    $("#main>div>div>div>a").css({
        "padding-top": Q(4),
        "padding-bottom": Q(4),
        "padding-left": Q(15),
        "padding-right": Q(15),
        "width": Q(50),
        "line-height": Q(44)
    })
    $("#main>div>div>div>b").css({"height": Q(44),"width": Q(34),"line-height": Q(44)});
    $("#list>ul>li").css({"padding-left": Q(20), "padding-right": Q(20), "font-size": Q(32), "line-height": Q(110)});
    $("#list>ul>li>b>img").css({"width": Q(26), "height": Q(33), "margin-top": Q(40), "margin-left": Q(20)});
    $("#zhifu").css({
        "margin-top": Q(20),
        "margin-bottom": Q(32),
        "padding-right": Q(20),
        "padding-left": Q(20),
        "padding-bottom": Q(32)
    });
    $("#zhifu>h2").css({"line-height": Q(100), "font-size": Q(32), "margin-bottom": Q(5)});
    $("#zhifu>div>div>img").css({"width": Q(36), "height": Q(41)});
    $("#zhifu>div>div>p>img").css({"width": Q(190), "height": Q(42)});
    $("#zhifu>div>div>p").css({
        "margin-right": Q(90),
        "margin-left": Q(22),
        "margin-top": Q(0),
        "margin-bottom": Q(0)
    });
    $("#heji").css({"line-height": Q(92), "font-size": Q(30)});
    $("#heji>div").css({"margin-right": Q(60)});
    $("#heji>div>span").css({"font-size": Q(38)});
    $("#heji>img").css({"width":Q(224),"height":Q(92)});
}
 //合计
 function heji(){
	   var price=parseFloat($(".price").html().split("¥")[1]);
	   var count=parseInt($("#cot").html());
	   var daishou=parseFloat($(".dshow").html().split("¥")[1]);
	   var bb=price*count+daishou;
	   $("#heji div span").html("￥"+bb.toFixed(0));
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
	if(str.length>=20){
		var substr=str.slice(0,21).concat('...');
		return substr;
	}else{
		return str;
	}
}
//支付按钮
function playfu(){
	var pp;
	if($(".fufu").attr("src")=="img/dui.jpg"){
		pp=1;
	}else if($(".fufu1").attr("src")=="img/dui.jpg"){
		pp=2;
	}

    if(pp == 2){
        if (confirm("确定用钱包支付该笔订单？")) {
            $.ajax({
                type:"post",
                url:"/Order/createOrder/",
                async:true,
                dataType:"json",
                data:{pId:id,num:parseInt($("#cot").html()),pay_type:pp},
                success:function(Sydata){
                    var sai = Sydata.data;
                    var pai=Sydata.errordesc;
                    if (pp == 1) {
                        if (sai.order_id) {
                            var timestamp=new Date().getTime();
                            window.location.href = sai.url + "?order_id=" + sai.order_id + "&rnd=" + timestamp;
                        } else {
                            alert(pai)
                        }
                    }
                    else {
                        if (sai.order_id) {
                            window.location.href = "succes.html?orderid=" + sai.order_id;
                        } else {
                            alert(pai)
                        }
                    }

                }
            });
        }
    }else if(pp == 1){
        $.ajax({
            type:"post",
            url:"/Order/createOrder/",
            async:true,
            dataType:"json",
            data:{pId:id,num:parseInt($("#cot").html()),pay_type:pp},
            success:function(Sydata){
                var sai = Sydata.data;
                var pai=Sydata.errordesc;
                if (pp == 1) {
                    if (sai.order_id) {
                        var timestamp=new Date().getTime();
                        window.location.href = sai.url + "?order_id=" + sai.order_id + "&rnd=" + timestamp;
                    } else {
                        alert(pai)
                    }
                }
                else {
                    if (sai.order_id) {
                        window.location.href = "succes.html?orderid=" + sai.order_id;
                    } else {
                        alert(pai)
                    }
                }

            }
        });
    }


}
function Jump(pid) {
//	alert(pid)
  window.location.href = "/MomBuy/DetailsPage/DetailsPage.html?pId=" + pid + "";

}