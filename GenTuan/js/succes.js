/**
 * Created by Administrator on 2016/5/19.
 */
var id = getParamValue("orderid");
$(function(){
	css();
    $.ajax({
		type:"post",
		url:"/Order/detail/",
		async:true,
		dataType:"json",
		data:{order_id:id},
		success:function(syData){
			var order=syData.data;
			console.log(syData)
//			alert(order.tuan_status)
			if(order.tuan_status ==1 || (order.pay_status == 2 && order.tuan_status == 0)){
				$("#top img").attr("src","img/succes.jpg");
			}else{
				$("#top img").attr("src","img/fail.jpg");
			}
			$("#top span").html(order.returnStr+" !");
            $("#add h1").html(order.addressTitle);
            if(order.username != ''){
                $("#add div b").html(order.username + "&nbsp;&nbsp;" + order.phone);
            } else {
                $("#add div b").html(order.phone);
            }

			$("#add div span").html(order.address);
			if(!order.express_money){
				order.express_money=0;
			}
			var buttons = "";
			if (order.statusStr == "等待支付")
			{
			    buttons = '<div id="tjcg" style="float: right;">' +
							'<a href="javascript:" name="' + order.order_id + '" onclick="GoNextPay(this)" ><img style="margin-right:10px" src="img/toPay.png"></a>' +
							'<a href="javascript:" name="' + order.order_id + '" onclick="CancelOrder(this)" ><img src="img/callOf.png"></a>' +
						'</div>';
			}
			else if (order.statusStr == "成团啦，等待发货") {
			    //buttons = '<div id="tjcg" style="float: right;">' +
					//		'<a href="javascript:" name="' + order.order_id + '" onclick="SendAlert(this)" ><img src="img/fhRemind.png"></a>' +
					//	'</div>';
			}
			var str=
					'<div class="main">'+
			            '<p>'+
			                '<img src="'+order.headimgurl+'" alt=""/>'+
			                '<span>'+order.nickname+'</span>'+
			                '<b>'+order.statusStr+'</b>'+
			            '</p>'+
			            '<div>'+
			                '<img onclick="goctxq('+order.pId+')" src="'+order.icon+'" alt=""/>'+
			                '<p>'+
			                    '<span onclick="goctxq('+order.pId+')">'+Tittle(order.pTitle)+'</a></span>'+
			                '</p>'+
			                '<div>'+
			                    '￥'+order.price+'<br/>*'+order.num+
			                '</div>'+
			            '</div>'+
			            '<div class="text" ' + (buttons == "" ? "" : 'style="border-bottom: 1px solid #ECEDED;"') + '>' +
			                '<h1>共'+order.num+'件商品&nbsp;&nbsp;代收点: '+Number(order.express_money).toFixed(0)+'&nbsp;&nbsp;全计: '+Number(order.total).toFixed(0)+'</h1>'+
			            '</div>' + buttons
                         +
			        '</div>';
			$(".section").append(str);
			$(".one b").html(order.order_id);
			if(order.pay_type==1){
				$(".one2 b").html("微信支付");
			}else{
				$(".one2 b").html("我的钱包");
			}
			$(".one3 b").html(order.mobile);
			$(".one4 b").html(order.addtime);
			if(!order.tuantime){
				$(".one5 span").html("订单更新时间")
				$(".one5 b").html(order.updateTime);
			}else{
				$(".one5 b").html(order.tuantime);
			}
            if(!order.code)
                $('.one6').css('display', 'none');
            else
                $('.one6 b').html(order.code);
			css();
		}
	});
});

function goctxq(idlist){
    window.location.href = "/MomBuy/DetailsPage/DetailsPage.html?pId=" + idlist;
}

function Q(obj){
    var width=$(window).width();
    if(width>720){
        width=720;
    }
    var num=(parseInt(obj)/720).toFixed(20)*width;
    return num+"px";
}
function css(){
	$("#top").css({"padding-top":Q(37),"padding-bottom":Q(38)});
    $("#top>img").css({"position":Q(-5),"width":Q(355),"height":Q(52)});
    $("#add").css({"margin-bottom":Q(20),"padding-top":Q(30),"padding-bottom":Q(30),"padding-left":Q(20),"padding-right":Q(20)});
    $("#add>h1").css({"font-size":Q(32),"margin-bottom":Q(14)});
    $("#add span,#add b").css({"font-size":Q(34),"line-height":Q(44)});
    $("#add>div>b").css({"margin-right":Q(20),"font-size":Q(32)});
    $(".section").css({"padding-left":Q(22),"padding-right":Q(22),"margin-bottom":Q(20)});
    $(".main>div").css({"height":Q(120)});
    $(".main>p>img").css({"width":Q(56),"height":Q(56)});
    $(".main>p").css({"margin-top":Q(16),"margin-bottom":Q(24)});
    $(".main>p>span").css({"margin-left":Q(17),"font-size":Q(30),"line-height":Q(58),"top":Q(5)});
    $(".main>p>b").css({"font-size":Q(28),"line-height":Q(58),"top":Q(5)});
    $(".main>div>img").css({"width":Q(90),"height":Q(90)});
    $(".main>div>p").css({"margin-left":Q(22)});
    $(".main>div>p>span").css({"font-size":Q(32),"line-height":Q(47),"width":Q(430),"margin-left":Q(20),"bottom":Q(17)});
    $(".main>div>div").css({"font-size":Q(32),"line-height":Q(47),"bottom":Q(17)});
    $(".main>.text").css({"height":Q(96)});
    $(".text>h1").css({"font-size":Q(32),"line-height":Q(95)});
    $(".main>div.button").css({"padding-top":Q(30),"padding-bottom":Q(30)});
    $(".main>div.button>button").css({"width":Q(160),"height":Q(70),"font-size":Q(32)});
    $(".list").css({"padding-top":Q(23),"padding-bottom":Q(23),"padding-left":Q(20),"padding-right":Q(20),"font-size":Q(32),"margin-bottom":Q(30)});
    $(".list>ul>li").css({ "line-height": Q(70) });
    $("#tjcg>a>img").css({ "width": Q(160), "height": Q(68), "margin-top": Q(30) });
    $("#top span").css({"top":Q(35),"left":Q(330),"font-size":Q(40)});
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
//获取地址栏参数
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
    // 将参数数组进行返回f
    return paramsArray;
}
function Tittle(str){
	if(str.length>=25){
		var substr=str.slice(0,26).concat('...');
		return substr;
	}else{
		return str;
	}
}

function CancelOrder(obj) {
    var orderid = $(obj).attr("name");
    if (confirm("是否取消跟团？")) {
        $.ajax({
            type: "POST",
            url: "/Order/closeOrder/",
            async: true,
            dataType: "json",
            data: { order_id: orderid },
            success: function (sysdata) {
                var order = sysdata.data;;
                if (order.status == 1) {
                    window.location.href = document.referrer;
                }
            }
        })
    } else {
        return;
    }
}

function GoNextPay(obj) {
    var timestamp = new Date().getTime();
    var orderid = $(obj).attr("name");
    window.location.href = "/Wxpay/weixinPay/order_id/" + orderid + "/rnd/" + timestamp;
}

function SendAlert(obj)
{
    var orderid = $(obj).attr("name");
    $.ajax({
        type: "POST",
        url: "/Order/deliveryRemind/",
        async: true,
        dataType: "json",
        data: { order_id: orderid },
        success: function (sysdata) {
            if (sysdata.errorcode != "0") {
                alert(sysdata.errordesc);
            }
            else {
                alert(sysdata.data.msg);
            }
        }
    })
}