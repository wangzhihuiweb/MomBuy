var pId = "";
var areaId = "";
var Fid='';
pId = getParamValue("pId");
areaId = getParamValue("areaId");
$(function() {
	css()
	 $("footer a").eq("3").find("span").addClass("light")
	 $("footer a").eq("3").find("b").addClass("light")
	MoreFun(0);
	
    $("#header .swiper-slide ul li").click(function(){
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
     $(window).scroll(function() {
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
           MoreFun(Fid)
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
								$("#List").html("");
								$("#List1").html("");
								if($(this).index()==0){
									MoreFun(0);
								}if($(this).index()==1){
									MoreFun1(0);
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
  
})

var id1;
var id2;
var isdeal = false;
function MoreFun(id){
	if(id1 == 0)
	 {
	    $(document).stop().animate({ "scrollTop": 0 });
	 }
//	$(document).stop().animate({ "scrollTop": 0 });
	$("body").css({"padding-bottom":Q(210)})
	$(".Nodata").css("display","none")
	$(".login").css("display","block")
	id1=id;
	isdeal = true;
	$.ajax({
		type: "post",
		data: {
			pId: pId,
			aId: areaId,
			id :id,
			is_end:1
		},
		url: "/Order/tuanOrderListMore/",
		async: true,
		dataType: "json",
		success: function(resData) {
//			console.log(resData)
			isdeal = false;
			var data = resData.data;
			if(data != null && data.length > 0) {
				id1=data.id;
				var str2 = "";
				$.each(data, function(v, i) {
					Fid=i.id;
					str2 += "<li><div class='user'><input type='hidden' value='" + i.id + "' /><img src='" + i.headimgurl + "' alt=''/><h3>" + wxName(i.nickname) + "</h3><h4>" + i.statusStr + "</h4></div><div class='count'>数量：<span>" + Number(i.num) + "</span>&nbsp;&nbsp;金额：<span>" + Number(i.total).toFixed(2) + "</span>" + GetQuHuoCode(i.code) + "" + Distributionfun(i.shipping_status, i.pay_status, i.tuan_status, i.statusStr, i.is_remind) + "</div></li>";
				});
				$("#List").append("<ul>"+str2+"</ul>");
				$(".login").css("display","none")
	        	$(".Nodata").css("display","none")
				
				
			} else {
				$("body").css({"padding-bottom":Q(120)})
//				$("#List").html("暂无数据").css("text-align", "center")
				$(".login").css("display","none")
				$(".Nodata").css("display","block")
			}
			css()
		}
	});
}
function MoreFun1(id){
//	$(document).stop().animate({ "scrollTop": 0 });
	$("body").css({"padding-bottom":Q(210)})
	$(".Nodata").css("display","none")
	$(".login").css("display","block")
	id2=id;
	isdeal = true;
	$.ajax({
		type: "post",
		data: {
			pId: pId,
			aId: areaId,
			id :id,
			is_end:0
		},
		url: "/Order/tuanOrderListMore/",
		async: true,
		dataType: "json",
		success: function(resData) {
//			console.log(resData)
			isdeal = false;
			var data = resData.data;
			if(data != null && data.length > 0) {
				var str2 = "";
				id2=data.id;
				$.each(data, function(v, i) {
					Fid=i.id;
					str2 += "<li><div class='user'><input type='hidden' value='" + i.id + "' /><img src='" + i.headimgurl + "' alt=''/><h3>" + wxName(i.nickname) + "</h3><h4>" + i.statusStr + "</h4></div><div class='count'>数量：<span>" + Number(i.num) + "</span>&nbsp;&nbsp;金额：<span>" + Number(i.total).toFixed(2) + "</span>" + GetQuHuoCode(i.code) + "" + Distributionfun(i.shipping_status, i.pay_status, i.tuan_status, i.statusStr, i.is_remind) + "</div></li>";
				});
				$("#List1").append("<ul>"+str2+"</ul>");
				$(".login").css("display","none")
	        	$(".Nodata").css("display","none")
				
				
			} else {
				$("body").css({"padding-bottom":Q(120)})
//				$("#List").html("暂无数据").css("text-align", "center")
				$(".login").css("display","none")
				$(".Nodata").css("display","block")
			}
			css()
		}
	});
}

function GetQuHuoCode(code) {
    if (code != "" && code != undefined) {
        return "&nbsp;&nbsp;取货码：<span>" + code + "</span>";
    }
    else {
        return "";
    }

}

//发货提醒///////////////////////////
function Distributionfun(shipping_status,pay_status,tuan_status, statusStr, is_remind){
    //if (shipping_status == 0 && pay_status == 2 && tuan_status == 1) {
    //    if(is_remind == 1){
    //    	return "";
    //        //return "<a onclick='Remind(this)' href='javascript:'>发货提醒</a>";
    //    } else {
    //        return "<b>已发送提醒</b>";
    //    }
    //
    //} else
    if ((statusStr == "发货啦" || statusStr == "已到货，等待买家取货" )&& is_remind == 1) {
        return "<a onclick='YiQuHuo(this)' href='javascript:'>买家已取货</a>";
    } else {
		return "";
	}
	
}

function YiQuHuo(obj)
{
    var yhid = $(obj).parent().parent().find("input").val()
    $.ajax({
        type: "post",
        url: "/Order/checkQuhuo/",
        async: true,
        data: {
            order_id: yhid
        },
        dataType: "json", //json
        success: function (resData) {
            if (resData.errorcode != "0") {
                alert(resData.errordesc);
            }
            else {
                alert(resData.data.msg);
                window.location.reload()
            }
        }

    });
}

function Remind(obj) {
	var yhid = $(obj).parent().parent().find("input").val()
	$.ajax({
		type: "post",
		url: "/Order/setOrderStatus/",
		async: false,
		data: {
			id: yhid,
			status: 1
		},
		dataType: "json", //json
		success: function(resData) {
			//console.log(resData)
			if(resData.data.code == 1) {
				//				alert("发货提醒成功")
				$(obj).parent().parent().find("h4").html("发货啦");
				$(obj).css("display", "none")
			} else {
				$(obj).html(resData.errordesc).attr("onclick", " ").css({
					"color": "#FF718D",
					"background": "#FFF"
				})
			}
		}

	});
}

//微信用户昵称太长，拼接...
function wxName(str) {
	if(str.length >= 7) {
		var substr = str.slice(0, 8).concat('...');
		return substr;
	} else {
		return str;
	}
}

function css() {
	$(".list").css({
		"padding-left": Q(20),
		"padding-right": Q(20)
	});
	$(".list>ul>li>.user").css({
		"margin-top": Q(20),
		"margin-bottom": Q(15),
		"line-height": Q(56)
	});
	$(".list>ul>li>.user>img").css({
		"width": Q(55),
		"height": Q(56),
		"margin-right": Q(22)
	});
	$(".list>ul>li>.user>h3").css({
		"font-size": Q(32)
	});
	$(".list>ul>li>.user>h4").css({
		"font-size": Q(30)
	});
	$(".list>ul>li>.count").css({
		"font-size": Q(28),
		"margin-bottom": Q(65)
	});
	$(".list>ul>li>.count>a").css({
		"width": Q(151),
		"height": Q(58),
		"line-height": Q(62),
		"margin-top": Q(7)
	});
	$(".list>.all>div").css({
		"font-size": Q(32),
		"margin-top": Q(26),
		"margin-bottom": Q(36)
	});
	$(".list>.all>img").css({
		"width": Q(160),
		"height": Q(68),
		"margin-bottom": Q(36)
	});
	 $("#header").css({
	 	"margin-bottom":Q(20),
	 	"height":Q(86),
	 	"width":Q(720),
	 	"padding-left":Q(80),
	 	"padding-right":Q(50)
	 });
	 $("#tabfist").css({
	 	"margin-right":Q(180)
	 })
    $("#header .swiper-slide").css({"font-size":Q(36),"width":Q(200),"line-height":Q(86),"padding-right":Q(18),"padding-left":Q(18)});
    $(".active").css({"bordet-bottom":Q(4)});
	 $("#main-box1").css({
	 	"margin-right":Q(200)
	 })
	var width = $(window).width()
	if(width > 720) {
		width = 720;
	}
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
	$(".Nodata").css({"font-size":Q(28),"height":Q(90),"line-height":Q(90),})
	
	
	 //加载中样式
	$(".login").css({"width":Q(260),"height":Q(90),"margin-top":Q(20)})
	$(".login img").css({"width":Q(90),"height":Q(90)})
	$(".login span").css({"font-size":Q(32),"margin-left":Q(25),"margin-top":Q(20)})
	//  $("body").css({"padding-bottom":width*0.1409+"px"})
}

function Q(obj) {
	var width = $(window).width();
	if(width > 720) {
		width = 720;
	}
	var num = (parseInt(obj) / 720).toFixed(20) * width;
	return num + "px";
}