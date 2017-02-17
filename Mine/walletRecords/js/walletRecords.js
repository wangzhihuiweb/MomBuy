$(function(){	
	Transaction(0)
	Css()
	 $(window).scroll(function() {
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
           Transaction(Fid)
        }
    });
})	


function Transaction(id){
	$("body").css({"padding-bottom":Q(210)})
	$(".Nodata").css("display","none")
	$(".login").css("display","block")
	$.ajax({
		type:"post",
		url:"/Wallet/gList/",
		async:true,
		dataType: "json",
        data: {id:id},
        success: function (resData) {
//      	console.log(resData)
        	var str="";
        	 var data = resData.data;
        	if (data != null && data.length > 0) {      		
	        	$.each(data, function(v,i) {
	        		Fid=i.id;
//	        		<img src='"+i+"' alt='图片' />
//<p>订单编号："+i.id+"</p>
	        		str += "<div class='Records'><div class='pic'><p>" + Tittle(i.title) + "</p></div><div class='order'><p>" + TypeStr(i.type) + "</p><b>￥" + Number(i.money).toFixed(2) + "</b></div><div class='date'><p>" + i.addtime + "</p><a href='javascript:'>" + i.statusStr + "</a></div></div>";
	        	});
	        	$(".walletRecords").append(str)
	        	$(".login").css("display","none")
	        	$(".Nodata").css("display","none")
        	}else{
        		$("body").css({"padding-bottom":Q(120)})
        		//alert(00)
        		$(".login").css("display","none")
				$(".Nodata").css("display","block")
//      		str+="没有可以加载的数据了";
        	}
        	
        	Css()
        }
	});
}
var Fid = '';
function statusFun(status) {
    if (status == 0) {
        return "待处理";
    } else if (status == 1) {
        return "已处理";
    } else if (status == 2) {
        return "拒绝处理";
    }
}

function TypeStr(type) {
    if (type == 0) {
        return "购买记录";
    } else if (type == 1) {
        return "订单退款";
    } else if (type == 2) {
        return "账户充值";
    } else if (type == 3) {
        return "账户提现";
    } else if (type == 4) {
        return "团购结算";
    }
}

function Css(){
//	$("body").css({"padding-bottom":Q(140)})
	$(".Records").css({"padding-left":Q(20),"padding-top":Q(40),"padding-bottom":Q(30),"padding-right":Q(20)});
	$(".pic img").css({"height":Q(90),"width":Q(90),"margin-right":Q(22)})
	$(".pic p").css({"font-size":Q(32),"line-height":Q(48),"width":Q(540)})
	
	$(".order p").css({"height":Q(82),"line-height":Q(85),"font-size":Q(32),})
	$(".order b").css({"height":Q(79),"line-height":Q(82),"font-size":Q(32),})
	
	$(".date").css({"margin-top":Q(-7)})
	$(".date p").css({"font-size":Q(28),})
	$(".date a").css({"font-size":Q(31),})
	
	$(".Nodata").css({"font-size":Q(28),"height":Q(90),"line-height":Q(90),})
	
	
	 //加载中样式
	$(".login").css({"width":Q(260),"height":Q(90),"margin-top":Q(20)})
	$(".login img").css({"width":Q(90),"height":Q(90)})
	$(".login span").css({"font-size":Q(32),"margin-left":Q(25),"margin-top":Q(20)})
//	$(".logining").css({"font-size":Q(32),"height":Q(90),"margin-top":Q(20)});
	
//	$(".walletRecords p").css({"line-height":Q(58),"font-size":Q(32),"text-indent":Q(32)})
//	$(".walletRecords h3").css({"font-size":Q(36),"padding-bottom":Q(16),"padding-top":Q(12)})
	$("footer a").eq("3").find("span").addClass("light")
	$("footer a").eq("3").find("b").addClass("light")
}
function Q(obj){
	var width = $(window).width()
    if(width>720){
    	width=720;
    }
	var num=(parseInt(obj)/720).toFixed(20) * width;
	return num+"px";
}

function Tittle(str){
	if(str.length>=30){
		var substr=str.slice(0,30).concat('...');
//		console.log(substr);
		return substr;
	}else{
		return str;
	}
}