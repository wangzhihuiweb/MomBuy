/**
 * Created by Administrator on 2016/5/18.
 */
$(function(){
	css()
	$("#main-wait,#main-fa,#main-shou,#main-pin,#main-fail").css("display","none");
    $("#header .swiper-slide").click(function(){
        if($(this).siblings().hasClass('active')){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        }else{
            $(this).addClass('active');
        }
        var id=$(this).attr("data");
         	$(id).css("display","block")
			$(id).parent().parent().siblings().find(".content-slide").css("display", "none");
	       	//$(id).siblings().css("display","none")			
    });
    //css样式
	allbox(0);//全部跟团
//	daibox(0);//待成货
//	dwaitbox(0);//待发货
//	dshoubox();//待收货
	//滚动条加载
    $(window).scroll(function() {
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
            GetAjaxData();
        }
    });
    var tabsSwiper = new Swiper('#tabs-container', {
					speed: 500,
					onSlideChangeStart: function() {
						$(".tabs .active").removeClass('active')
						$(".tabs div").eq(tabsSwiper.activeIndex).addClass('active');
						$(".tabs div").each(function(index, element) {
							if ($(this).hasClass("active")) {
								var id = $(this).attr("data");
								$(id).css("display", "block");
								$(id).parent().parent().siblings().find(".content-slide").css("display", "none");
								 $(".login").html("");
				 				 $("#main-box").html("");
								$("#main-all").html("");
								$("#main-wait").html("");
								$("#main-fa").html("");
								$("#main-shou").html("");
								$("#main-pin").html("");
								$("#main-fail").html("");	
								if($(this).index()==0){
									allbox(0);
								}if($(this).index()==1){
									daibox(0);
								}if($(this).index()==2){
									dwaitbox(0);
								}if($(this).index()==3){
									dshoubox(0);
								}if($(this).index()==4){
									dpjbox(0);
								}if($(this).index()==5){
									failBox(0);
								}
							}
						});
						if($("#fail").attr("class")=="swiper-slide active"){
								
								$(".swiper-wrapper tabs").css("transform","translate3d(0, 0px, 0px)");
							}
					}
				})
				$(".tabs div").on('touchstart mousedown', function(e) {
					e.preventDefault()
					$(".tabs .active").removeClass('active')
					$(this).addClass('active')
					tabsSwiper.slideTo($(this).index())
				})
				$(".tabs div").click(function(e) {
					e.preventDefault()
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
	//加载中样式
	$(".login").css({"width":Q(260)})
	$(".login img").css({"width":Q(90),"height":Q(90)})
	$(".login span").css({"font-size":Q(32),"margin-left":Q(25)})
	$(".logining").css({"font-size":Q(32),"height":Q(90)});
	$("#header,.section").css({"margin-bottom":Q(20)});
	$("#header").css({"width":Q(720)});
    $("#header .swiper-slide").css({"font-size":Q(36),"line-height":Q(86),"padding-right":Q(18),"padding-left":Q(18)});
//  $("#top>ul>li:first-child").css({"padding-left":Q(20),"padding-right":Q(20),"margin-right":Q(20)});
    $(".active").css({"bordet-bottom":Q(4)});
    $(".section").css({"padding-left":Q(22),"padding-right":Q(22),"padding-bottom":Q(7)});
    $(".main>div").css({"height":'auto'});
    $(".main>p>img").css({"width":Q(56),"height":Q(56),"margin-top":Q(5)});
    $(".main>p").css({"margin-top":Q(18),"margin-bottom":Q(25)});
    $(".main>p>span").css({"margin-left":Q(15),"font-size":Q(28),"line-height":Q(58),"top":Q(5)});
    $(".main>p>b").css({"font-size":Q(28),"line-height":Q(58),"top":Q(5)});
    $(".main>div>img").css({"width":Q(90),"height":Q(90)});
    $(".main>div>p").css({"margin-left":Q(0),"margin-top":Q(0)});
    $(".main>div>p>span").css({"font-size":Q(32),"line-height":Q(47),"width":Q(430),"margin-left":Q(20)});
    $(".main>div>div").css({"font-size":Q(32),"line-height":Q(47)});
    $(".main>.text").css({"height":Q(96)});
    $(".text>h1").css({"font-size":Q(32),"line-height":Q(95)});
    $(".main>div.button").css({"padding-top":Q(30),"padding-bottom":Q(30)});
    $(".main>div.button>a>button").css({"width":Q(160),"height":Q(70),"font-size":Q(32)});
    $("#tjcg>a>img").css({"width":Q(160),"height":Q(68),"margin-top":Q(30)});
    $("#main-wait>.section").css({"padding-bottom":Q(0)});
    var width = $(window).width()
    if(width>720){
    	width=720;
    }
    $("body").css({"padding-top":Q(110)})
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
//全部跟团
var id1;
var id2;
var id3;
var id4;
var id5;
var id6;
var isdeal = false;
var currentstatus = "";
//全部
function allbox(id){
	id1=id;
	isdeal = true;
	currentstatus = "0";
	$.ajax({
		type:"POST",
		url:"/Order/gList/",
		async:true,
		dataType:"json",
		data:{status:0,id:id},
		success:function(newData){
			$(".login").html("");
			isdeal = false;
			var jsData=newData.data;

			//console.log(jsData);	
			if (jsData != null && jsData.length > 0){
				for(var i=0;i < jsData.length;i++){
				    var order = jsData[i];
				    id1 = order.id;
				    var buttons = "";
				    if (order.status_str == "等待支付" && order.product_status != 3) {
					    buttons = '<div id="tjcg"><a href="javascript:" name="' + order.order_id + '" onclick="CancelOrder(this)" ><img src="img/callOf.png"></a>' +
										'<a href="javascript:" name="' + order.order_id + '" onclick="GoNextPay(this)" ><img style="margin-right:10px" src="img/toPay.png"></a>' +
									'</div>';
					}
					else if (order.status_str == "发货啦" || order.status_str == '已取货，等待买家确认收货' || order.status_str == '已到货，等待买家取货') {
					    buttons = '<div id="tjcg">' +
										'<a href="javascript:" id="' + order.order_id + '" onclick="isTrue(this)" ><img src="img/button.jpg"></a>' +
									'</div>';
					}
					else if (order.status_str == "等待买家评论")
					{
					    buttons = '<div class="button">' +
										'<a href="fabiao.html?pid=' + order.order_id + '"><button>评价</button></a>' +
									'</div>';
					}


					var str =
							'<div class="section">' +
								'<div class="main">' +
									'<p>' +
										'<img src="' + order.headimgurl + '" alt="" />' +
										'<span>' + order.nickname + '</span>' +
										'<b>' + order.status_str + '</b>' +
									'</p>' +
									'<div>' +
										'<img onclick="goctxq(' + order.order_id + ')" src="' + order.icon + '"" />' +
										'<p>' +
											'<span onclick="goctxq(' + order.order_id + ')">' + Tittle(order.pTitle) + '</span>' +
										'</p>' +
										'<div>' +
											'￥' + order.price + '<br/>*' + order.num +
										'</div>' +
									'</div>' +
									'<div class="text" style="' + (buttons == "" ? "" : "border-bottom: 1px solid #ECEDED;") + '">' +
										'<h1>共' + order.num + '件商品&nbsp;&nbsp;代收点: ' + Number(order.express_money).toFixed(0) + '&nbsp;&nbsp;全计: ' + Number(order.total).toFixed(0) + '</h1>' +
									'</div>' +
                                     buttons +
								'</div>' +
							'</div>';
					$("#main-all").append(str);
					css();
				}
			}else{
	               		$(".logining").html("没有可以加载的数据了");
					}
		}
	});
}
//待成团
function daibox(id){
	id2=id;
	isdeal = true;
	currentstatus = "1";
	$.ajax({
		type:"POST",
		url:"/Order/gList/",
		async:true,
		dataType:"json",
		data:{status:13,id:id},
		success:function(newData){
			isdeal = false;
			var jsData=newData.data;
			if (jsData != null && jsData.length > 0){
				for(var i=0;i < jsData.length;i++){
					var order=jsData[i];
					if(order.status_str=="支付成功，等待成团"){//未发货状态
						id2=order.id;
						var str=
							'<div class="section">'+
								'<div class="main">'+
									'<p>'+
										'<img src="'+order.headimgurl+'" alt="" />'+
										'<span>'+order.nickname+'</span>'+
										'<b>'+order.status_str+'</b>'+
									'</p>'+
									'<div>'+
										'<img onclick="goctxq('+order.order_id+')" src="'+order.icon+'" alt="" />'+
										'<p>'+
											'<span onclick="goctxq('+order.order_id+')">'+Tittle(order.pTitle)+'</span>'+
										'</p>'+
										'<div>'+
											'￥'+order.price+'<br/>*'+order.num+
										'</div>'+
									'</div>'+
									'<div class="text">'+
										'<h1>共'+order.num+'件商品&nbsp;&nbsp;代收点: '+Number(order.express_money).toFixed(0)+'&nbsp;&nbsp;全计: '+Number(order.total).toFixed(0)+'</h1>'+
									'</div>'+
								'</div>'+
							'</div>';
							$("#main-wait").append(str);
							css()
					}
				}
			}else{
	               		$(".logining").html("没有可以加载的数据了");
					}
		}
	});
}
function goctxq(idlist){
    window.location.href = "succes.html?orderid=" + idlist;
}
//待发货
function dwaitbox(id){
	id3=id;
	isdeal = true;
	currentstatus = "1";
	$.ajax({
		type:"POST",
		url:"/Order/gList/",
		async:true,
		dataType:"json",
		data:{status:31,id:id},
		success:function(newData){
			isdeal = false;
			var jsData=newData.data;
//			console.log(jsData);
			if (jsData != null && jsData.length > 0){
				for(var i=0;i < jsData.length;i++){
					var order=jsData[i];
					if(order.status_str=="成团啦，等待发货"){//未发货状态
						id3=order.id;
						var str=
							'<div class="section">'+
								'<div class="main">'+
									'<p>'+
										'<img src="'+order.headimgurl+'" alt="" />'+
										'<span>'+order.nickname+'</span>'+
										'<b>'+order.status_str+'</b>'+
									'</p>'+
									'<div>'+
										'<img onclick="goctxq('+order.order_id+')" src="'+order.icon+'" alt="" />'+
										'<p>'+
											'<span onclick="goctxq('+order.order_id+')">'+order.pTitle+'</span>'+
										'</p>'+
										'<div>'+
											'￥'+order.price+'<br/>*'+order.num+
										'</div>'+
									'</div>'+
									'<div class="text" style="">' +
										'<h1>共'+order.num+'件商品&nbsp;&nbsp;代收点: '+Number(order.express_money).toFixed(0)+'&nbsp;&nbsp;全计: '+Number(order.total).toFixed(0)+'</h1>'+
									'</div>' +
                                    //'<div id="tjcg">' +
									//	'<a href="javascript:" name="' + order.order_id + '" onclick="SendAlert(this)" ><img src="img/fhRemind.png"></a>' +
									//'</div>' +
								'</div>'+
							'</div>';
							$("#main-fa").append(str);
							css()
					}
				}
			}else{
	               		$(".logining").html("没有可以加载的数据了");
					}
		}
	});
}
//待收货
function dshoubox(id){
	id4=id;
	isdeal = true;
	currentstatus = "1";
	$.ajax({
		type:"POST",
		url:"/Order/gList/",
		async:true,
		dataType:"json",
		data:{status:32,id:id},
		success:function(newData){
			isdeal = false;
			var jsData=newData.data;
//			console.log(jsData);
			if (jsData != null && jsData.length > 0){
				for(var i=0;i < jsData.length;i++){
					var order=jsData[i];
					if(order.status_str=="发货啦" || order.status_str=="已取货，等待买家确认收货" || order.status_str == "已到货，等待买家取货"){//未发货状态
						id4=order.id;
						var str=
							'<div class="section">'+
								'<div class="main">'+
									'<p>'+
										'<img src="'+order.headimgurl+'" alt="" />'+
										'<span>'+wxName(order.nickname)+'</span>'+
										'<b>'+order.status_str+'</b>'+
									'</p>'+
									'<div>'+
										'<img  onclick="goctxq('+order.order_id+')" src="'+order.icon+'" alt="" />'+
										'<p>'+
											'<span onclick="goctxq('+order.order_id+')" >'+order.pTitle+'</span>'+
										'</p>'+
										'<div>'+
											'￥'+order.price+'<br/>*'+order.num+
										'</div>'+
									'</div>'+
									'<div class="text">'+
										'<h1>共'+order.num+'件商品&nbsp;&nbsp;代收点: '+Number(order.express_money).toFixed(0)+'&nbsp;&nbsp;全计: '+Number(order.total).toFixed(0)+'</h1>'+
									'</div>'+
									'<div id="tjcg">'+
										'<a href="javascript:" id="'+order.order_id+'" onclick="isTrue(this)" ><img src="img/button.jpg"></a>'+
									'</div>'+
								'</div>'+
							'</div>';
						$("#main-shou").append(str);
						css();
					}
				}
			}else{
	               		$(".logining").html("没有可以加载的数据了");
					}
		}
	});
}
//待评价
function dpjbox(id){
	id5=id;
	isdeal = true;
	currentstatus = "1";
	$.ajax({
		type:"POST",
		url:"/Order/gList/",
		async:true,
		dataType:"json",
		data:{status:34,id:id},
		success:function(newData){
			isdeal = false;
			var jsData=newData.data;
//			console.log(jsData);
			if (jsData != null && jsData.length > 0){
				for(var i=0;i < jsData.length;i++){
					var order=jsData[i];
					if(order.status_str=="等待买家评论"){//未发货状态
						id5=order.id;
						var str=
							'<div class="section">'+
								'<div class="main">'+
									'<p>'+
										'<img src="'+order.headimgurl+'" alt="" />'+
										'<span>'+wxName(order.nickname)+'</span>'+
										'<b>'+order.status_str+'</b>'+
									'</p>'+
									'<div>'+
										'<img onclick="goctxq('+order.order_id+')" src="'+order.icon+'" alt="" />'+
										'<p>'+
											'<span onclick="goctxq('+order.order_id+')" >'+order.pTitle+'</span>'+
										'</p>'+
										'<div>'+
											'￥'+order.price+'<br/>*'+order.num+
										'</div>'+
									'</div>'+
									'<div class="text">'+
										'<h1>共'+order.num+'件商品&nbsp;&nbsp;代收点: '+Number(order.express_money).toFixed(0)+'&nbsp;&nbsp;全计: '+Number(order.total).toFixed(0)+'</h1>'+
									'</div>'+
									'<div class="button">'+
										'<a href="fabiao.html?pid='+order.order_id+'"><button>评价</button></a>'+
									'</div>'+
								'</div>'+
							'</div>';
						$("#main-pin").append(str);
						css();
					}
				}
			}else{
	               		$(".logining").html("没有可以加载的数据了");
					}
		}
	});
}
//成团失败
function failBox(id){
	id6=id;
	isdeal = true;
	currentstatus = "1";
	$.ajax({
		type:"POST",
		url:"/Order/gList/",
		async:true,
		dataType:"json",
		data:{status:35,id:id},
		success:function(newData){
			isdeal = false;
			var jsData=newData.data;
//			console.log(jsData);
			if (jsData != null && jsData.length > 0){
				for(var i=0;i < jsData.length;i++){
					var order=jsData[i];
					if(order.status_str=="成团失败"){//未发货状态
						id6=order.id;
						var str=
							'<div class="section">'+
								'<div class="main">'+
									'<p>'+
										'<img src="'+order.headimgurl+'" alt="" />'+
										'<span>'+wxName(order.nickname)+'</span>'+
										'<b>'+order.status_str+'</b>'+
									'</p>'+
									'<div>'+
										'<img onclick="goctxq('+order.order_id+')" src="'+order.icon+'" alt="" />'+
										'<p>'+
											'<span onclick="goctxq('+order.order_id+')" >'+order.pTitle+'</span>'+
										'</p>'+
										'<div>'+
											'￥'+order.price+'<br/>*'+order.num+
										'</div>'+
									'</div>'+
									'<div class="text">'+
										'<h1>共'+order.num+'件商品&nbsp;&nbsp;代收点: '+Number(order.express_money).toFixed(0)+'&nbsp;&nbsp;全计: '+Number(order.total).toFixed(0)+'</h1>'+
									'</div>'+
								'</div>'+
							'</div>';
						$("#main-fail").append(str);
						css();
					}
				}
			}else{
	               		$(".logining").html("没有可以加载的数据了");
					}
		}
	});
}
function GetAjaxData(){
	str=
	'<div class="login">'+
		'<img src="img/login.png" alt="" />'+
			'<span>加载中...</span>'+
						'</div>';
	$(".logining").html(str);
	css();
	if($(".active").index() == 0)
	{
		if (id1 == 0) {
	        $(document).stop().animate({ "scrollTop": 0 });
	    }
		allbox(id1)
	}if($(".active").index() == 1)
	{
		if (id2 == 0) {
	        $(document).stop().animate({ "scrollTop": 0 });
	    }
		daibox(id2)
	}if($(".active").index() == 2)
	{
		if (id3 == 0) {
	        $(document).stop().animate({ "scrollTop": 0 });
	    }
		dwaitbox(id3)
	}if($(".active").index() == 3)
	{
		if (id4 == 0) {
	        $(document).stop().animate({ "scrollTop": 0 });
	    }
		dshoubox(id4);
	}if($(".active").index() == 4)
	{
		if (id5 == 0) {
	        $(document).stop().animate({ "scrollTop": 0 });
	    }
		dpjbox(id5);
	}if($(".active").index() == 5)
	{
		if (id6 == 0) {
	        $(document).stop().animate({ "scrollTop": 0 });
	    }
		failBox(id6);
	}
	
	
	
}
function Tittle(str){
	if(str.length>=26){
		var substr=str.slice(0,27).concat('...');
		return substr;
	}else{
		return str;
	}
}
//确认收货
function isTrue(obj){
	var pppid=$(obj).attr("id");
	if(confirm("您是否确认收货")){
		$.ajax({
			type:"POST",
			url:"/Order/setOrderStatus/",
			async:true,
			dataType:"json",
			data:{status:2,id:pppid},
			success: function (sysdata) {
			    var order = sysdata.data;
			    if (order.code == 1) {
			        if (currentstatus == "0") {
                        window.location.reload()
			        }
			        else {
			            $(obj).parent().parent().parent().remove();
			        }
				}
			}
		})
	}else{
		return;
	}
	
}
//微信用户昵称太长，拼接...
function wxName(str){
	if(str.length>=8){
		var substr=str.slice(0,9).concat('...');
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
                    $(obj).parent().parent().parent(".section").remove();
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
    window.location.href = "/Wxpay/weixinPay?order_id=" + orderid + "&rnd=" + timestamp;
}

function SendAlert(obj) {
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
                window.location.reload()
            }
        }
    })
}