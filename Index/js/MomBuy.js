
$(function() {
	onloadCss()		
		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, true);
		$.ajax({
		type: "get",
		url: "/Index/gList/",
		async:"true",
		dataType: "json",
		success: function(resData) {
//			console.log(resData)
			Banner(resData.data.advList)
			//nowAreaList接口有问题
			Ingroup1(resData.data.nowAreaList)
			
			Allgroup(resData.data.allList)
			onloadCss()		
		}
	})
// var mySwiper1 = new Swiper('#WaitGroup',{
//	  freeMode : true,
//	 autoplayStopOnLast:true
//});

//等待开团
$.ajax({
		type: "get",
		url: "/Product/getWaitList/",
		async:"true",
		data:{"is_index":1,"page":1},
		dataType: "json",
		success: function(resData) {
//			console.log(resData)
			var data=resData.data.data;
			var str="";
			$.each(data, function(key,val) {
				
				if(data.length-1 == key ){
					str+="<div class='swiper-slide dlis'><input type='hidden' name='' id='"+val.id+"' value='' /><h3><img src='"+val.headimgurl +"'><b>"+val.nickname+"</b></h3><div class='pic_d'><img onclick=\"Jump(" + val.id + ")\" src='"+val.icon+"' alt=''><b>"+val.success_count+"</b></div><p onclick=\"Jump(" + val.id + ")\">"+Tittle2(val.title)+"</p><h4>&yen; "+val.price+"</h4></div>";
				}else{
					str+="<div class='swiper-slide dlis'><input type='hidden' name='' id='"+val.id+"' value='' /><h3><img src='"+val.headimgurl +"'><b >"+val.nickname+"</b></h3><div class='pic_d'><img onclick=\"Jump(" + val.id + ")\" src='"+val.icon+"' alt=''><b>"+val.success_count+"</b></div><p onclick=\"Jump(" + val.id + ")\">"+Tittle2(val.title)+"</p><h4>&yen; "+val.price+"</h4></div>";
				}
					
			});
			$("#dengdaikaituan").html(str)
				
			adddccc()
			var mySwiper1 = new Swiper('#WaitGroup', {
					freeMode: true,
					slidesPerView: 'auto',
//					effect : 'coverflow',//3D效果
				});
		}
	})


})
function Banner(data) {
	var str = "";
	var str2="";
	$.each(data, function(key, val) {
		str+="<div class='swiper-slide'><a href='"+val.url+"'><img src='"+val.path+"' alt=''></a></div>"
	});
	$("#bannerwrapper").html(str)
	var mySwiper = new Swiper('.bannerslie', {
					direction: 'horizontal',
					loop: true,
					autoplay:3000,
					autoplayDisableOnInteraction : false,
					pagination: '.swiper-pagination',

				});
}


function Allgroup(data) {
			if(data.length == "0"){
				$("#Allgroup").css('display',"none")
			}
			var str = "";
			$.each(data, function(key, val) {
				str += 
				"<div class='List'><div class='List_tit' r><img src='" + val.headimgurl + "' alt='图片'><h3>" + val.nickname + "</h3></div><div class='Img'><img  onclick=\"Jump(" + val.id + ")\" src='" + val.icon + "' alt=''/><div class='HaveGroup'>已成团<font>" + success_count(val.success_count) + "</font>件  <i class='tick'></i></div></div><div class='name' onclick=\"Jump(" + val.id + ")\">" + Tittle(val.title) + "</div><div class='group'><font>" + val.open_num + "</font>件起团，在团<font class='tuchu'>" + success_count(val.this_success_count) + "</font>件</div><div class='timer'><img src='images/timer.png' alt='表'/>还剩: " + valtime(val.time) + "</div><div class='WithGroup'><div class='Price'><font>&yen;</font>" + val.price + "</div><div class='Zambia' id="+val.id+" data=" + val.isFollow + "></div><a href='../DetailsPage/Xiangqi/fukuan.html?pid="+val.id+"' class='goGroup'></a></div></div>";

			});
			$("#Allgroup").html(str);
			$("#Allgroup .Zambia").each(function(key, val) {
//				alert($("this").attr("data"))
				if ($(this).attr("data") == "0") {
//					alert("113")
					$(this).removeClass("light")
				} else {
					$(this).addClass("light")
				}
				$(this).click(function() {
					if ($(this).hasClass("light")) {
						$(this).removeClass("light")
						var obj=$(this).attr("id");
						concern(obj);
					} else {
						$(this).addClass("light");
						var obj=$(this).attr("id");
						concern(obj);
					}
				})
			})
}


function Ingroup1(data) {
			console.log(data)
			if(data.length == "0"){
				$("#Ingroup2").css('display',"none")
			}
			var str = "";
			for(var i=0;i<data.length;i++){			
				var val2=data[i];	
				str += "<div class='List'><div class='List_tit' r><img src='" + val2.headimgurl + "' alt='图片'><h3>" + val2.nickname + "</h3></div><div class='Img'><img  onclick=\"Jump(" + val2.id + ")\" src='" + val2.icon + "' alt=''/><div class='HaveGroup'>已成团<font>" + success_count(val2.success_count) + "</font>件  <i class='tick'></i></div><div class='InGroup'></div></div><div onclick=\"Jump(" + val2.id + ")\" class='name'>" + Tittle(val2.title) + "</div><div class='group'><font>" + val2.open_num + "</font>件起团，在团<font class='tuchu'>" + success_count(val2.this_success_count) + "</font>件</div><div class='timer'><img src='images/timer.png' alt='表'/>还剩: " + valtime(val2.time) + "</div><div class='WithGroup'><div class='Price'><font>&yen;</font>" +val2.price + "</div><div id="+val2.id+" class='Zambia' data=" + val2.isFollow + "></div><a href='../DetailsPage/Xiangqi/fukuan.html?pid="+val2.id+"' class='goGroup'></a></div></div>";
			}
			$("#Ingroup").html(str)
			$("#Ingroup .Zambia").each(function() {
				if ($(this).attr("data") == "0") {
//					alert("113")
					$(this).removeClass("light")
				} else {
					$(this).addClass("light")
				}
				$(this).click(function() {
					if ($(this).hasClass("light")) {
						$(this).removeClass("light")
						var obj=$(this).attr("id");
						concern(obj);
					} else {
						$(this).addClass("light");
						var obj=$(this).attr("id");
						concern(obj);
					}
				})
			})

}

function valtime(obj) {	
	if(obj.indexOf("天") >-1 && obj.indexOf("小时")>-1){
		var a=obj.split("天");
	//console.log(a);
		var b=a[1].split("小时");
		var c=b[1].split("分");
		return "<font>"+a[0]+"</font>&nbsp;天&nbsp;<font>"+b[0]+"</font>&nbsp;小时&nbsp;<font>"+c[0]+"</font>&nbsp;分";
	}
	else if(obj.indexOf("小时")==-1 && obj.indexOf("天")>-1 &&obj.indexOf("分")>-1){
		var z=obj.split("天");
		var x=z[1].split("分");
		return "<font>"+z[0]+"</font>&nbsp;天&nbsp;<font>0</font>&nbsp;小时&nbsp;<font>"+x[0]+"</font>&nbsp;分"
	}
	else if(obj.indexOf("天") ==-1 && obj.indexOf("小时")>-1){
		var d=obj.split("小时");
		var e=d[1].split("分");
		return "<font>0</font>&nbsp;天&nbsp;<font>"+d[0]+"</font>&nbsp;小时&nbsp;<font>"+e[0]+"</font>&nbsp;分";
	}
	else if(obj.indexOf("天") ==-1 && obj.indexOf("小时")==-1 ){
		var aa=obj.split("分");
		return "<font>0</font>&nbsp;天&nbsp;<font>0</font>&nbsp;小时&nbsp;<font>"+aa[0]+"</font>&nbsp;分";
	}
	
}


function Jump(pid) {
//	alert(pid)
  window.location.href = "/MomBuy/DetailsPage/DetailsPage.html?pId=" + pid + "";

}


function success_count(obj){
	if(obj == null){
		return "0";
	}else{
		return obj;
	}	
}

function hengshuping() {
	if (window.orientation == 180 || window.orientation == 0) {
		onloadCss();
	}
	if (window.orientation == 90 || window.orientation == -90) {
		onloadCss()

	}
}

function onloadCss() {
	var width = $(window).width()
	if (width > 720) {
		width = 720;
	}
	//alert(width)
	$(".pics>ol>li").css({
		"width": width * 0.019 + "px",
		"margin-right": width * 0.0138 + "px",
		"margin-left": width * 0.0138 + "px",
		"height": width * 0.019 + "px",
		"border-radius": width * 0.019 + "px"
	})
	
	$(".bannerslie").css({"height":Q(430),"width":Q(720)})
	
	$(".pics>ol").css({
		"bottom": width * 0.016 + "px"
	})

	$(".Title").css({
		"height": width * 0.1 + "px",
		"line-height": width * 0.1 + "px"
	})
	$(".Lis_w .List .List_tit").css({
		"height": width * 0.102777 + "px"
	})
	$(".Lis_w .List .List_tit h3").css({
		"top": width * 0.03072 + "px",
		"font-size": width * 0.03888 + "px"
	})
	$(".tuchu").css({
		"font-size": width * 0.05 + "px",
		"margin-left":width*0.01+"px",
		"margin-right":width*0.01+"px"
	})
	$(".Lis_w .Price font").css({
		"margin-right":width*0.01+"px"
	})
	$(".Title i").css({
		"width": width * 0.0180 + "px",
		"height": width * 0.025 + "px",
		"top": width * 0.0367 + "px",
		"margin-left": width * 0.020 + "px"
	})

	$(".Lis_w .List .List_tit img").css({
		"width": width * 0.11111 + "px",
		"height": width * 0.11111 + "px",
		"top": width * 0.02916 + "px",
		"margin-right": width * 0.0277777 + "px",
		"margin-left": width * 0.0277777 + "px",
	})

	$(".Img").css({
		"height": width * 0.63888 + "px",
		"width": width * 0.9444 + "px"
	})
	$(".Img img").css({
		"height": width * 0.63888 + "px",
		"width": width * 0.9444 + "px"
	})
	var Imgw = $(".Img").width();
	var ImgH = $(".Img").height();
	$(".Lis_w .Img").css({
		"top": -width * 0.01 + "px"
	})
	$(".InGroup").css({
		"width": Imgw * 0.41 + "px",
		"height": ImgH * 0.11 + "px",
		"bottom": "4%",
		"left": "3%"
	})
	$(".Title h3").css({
		"font-size": width * 0.05444 + "px"
	});
	$(".Title a").css({
		"font-size": width * 0.03 + "px",
	});
	$(".name").css({
		"font-size": width * 0.04344 + "px",
		"line-height": width * 0.0625 + "px",
		"padding-left": width * 0.0277777 + "px",
		"padding-right": width * 0.0277777 + "px",
		"padding-top": width * 0.014 + "px"
	})
	$(".group").css({
		"height": width * 0.08434 + "px",
		"line-height": width * 0.08434 + "px",
		"font-size": width * 0.04 + "px",
		"padding-left": width * 0.0277777 + "px"
	});
	$(".timer").css({
		"height": width * 0.08 + "px",
		"line-height": width * 0.08 + "px",
		"font-size": width * 0.04 + "px",
		"padding-left": width * 0.0277777 + "px"
	});
	$(".HaveGroup").css({
		"width": Imgw * 0.39 + "px",
		"height": ImgH * 0.17 + "px",
		"line-height": ImgH * 0.145 + "px",
		"top": "2%",
		"right": "1.5%",
		"font-size": width * 0.0388 + "px",
		"padding-right":Q(55)
	})
	$(".HaveGroup font").css({
		"font-size": width * 0.05 + "px",
		"margin-left":width*0.01+"px",
		"margin-right":width*0.01+"px"
	})

	$(".Lis_w .timer img").css({
		"height": width * 0.047 + "px",
		"height": width * 0.047 + "px",
		"margin-right": width * 0.02 + "px"
	})

	$(".Lis_w .WithGroup").css({
		"margin-top": width * 0.015 + "px",
		"height": width * 0.111 + "px"
	})

	$(".Lis_w .Price").css({
		"font-size": width * 0.07 + "px",
		"padding-left": width * 0.04 + "px",
		"height": width * 0.111 + "px",
		"line-height": width * 0.11568 + "px",
		"width": width * 0.5000 + "px"
	})
	$(".Lis_w .Price font").css({
		"font-size": width * 0.04 + "px"
	})

	$(".Lis_w .WithGroup a").css({
		"font-size": width * 0.04 + "px",
		"width": width * 0.31 + "px",
		"height": width * 0.111 + "px",
		"line-height": width * 0.115 + "px",
		"padding-left": width * 0.069 + "px"
	})

	$(".WithGroup .Zambia").css({
		"width": width * 0.072 + "px",
		"height": width * 0.065 + "px",
		"margin-right": width * 0.031 + "px",
		"margin-left": width * 0.03888 + "px",
		"margin-top": width * 0.024 + "px"
	})

	$(".Lis_w .List").css({
		"margin-bottom": width * 0.028 + "px"
	})

	$(".WaitGroup").css({
		"width":Q(720),
		"height":Q(560)
	})
	$(".WaitGroup .dlis").css({
		"width":Q(300),
		"height":Q(560),
		"margin-left":Q(20)
	})

	$("body").css({
			"padding-bottom":Q(121)
		})
		//"padding-bottom":width*0+"px"
	$("footer").css({
		"padding-top": width * 0.024 + "px"
	});
	$("footer a").css({
		"height": width * 0.105 + "px"
	})
	$("footer a b").css({
		"font-size": width * 0.026 + "px"
	})
	$("footer a.home").css({
		"padding-left": width * 0.0625 + "px",
		"padding-right": width * 0.0625 + "px"
	})
	$("footer a.home span").css({
		"width": width * 0.072 + "px",
		"height": width * 0.053 + "px",
		"top": width * 0.0069444 + "px"
	})

	$("footer a.Ingroup").css({
		"padding-left": width * 0.083 + "px",
		"padding-right": width * 0.073 + "px"
	})
	$("footer a.Ingroup span").css({
		"width": width * 0.081 + "px",
		"height": width * 0.061 + "px"
	})

	$("footer a.mine").css({
		"padding-left": width * 0.07 + "px",
		"padding-right": width * 0.07 + "px"
	})
	$("footer a.mine span").css({
		"width": width * 0.058 + "px",
		"height": width * 0.058 + "px"
	})

	$("footer a.Withgroup").css({
		"padding-left": width * 0.07 + "px",
		"padding-right": width * 0.081 + "px"
	})
	$("footer a.Withgroup span").css({
		"width": width * 0.08 + "px",
		"height": width * 0.052 + "px",
		"top": width * 0.00416666 + "px"
	})

	$("footer a.publish").css({
		"padding-left": width * 0.049 + "px",
		"padding-right": width * 0.049 + "px",
		"margin-left": -width * 0.11 + "px"
	})

	$("footer a.publish span").css({
		"width": width * 0.125 + "px",
		"height": width * 0.125 + "px",
		"top": -width * 0.06 + "px"
	})
	$("footer a.publish b").css({
		"width": width * 0.125 + "px"
	})
	$("footer a b").css({
		"margin-top": width * 0.0655 + "px"
	})
	
	

}

function Q(obj){
    var width = $(window).width();
    if(width>720){
        width=720;
    }
    var num=(parseFloat(obj)/720).toFixed(20) * width;
    return num+"px";
}


function Tittle(str){
	if(str.length>=50){
		var substr=str.slice(0,50).concat('...');
//		console.log(substr);
		return substr;
	}else{
		return str;
	}
}
function Tittle2(str){
	if(str.length>=20){
		var substr=str.slice(0,20).concat('...');
//		console.log(substr);
		return substr;
	}else{
		return str;
	}
}
//添加关注
function concern(obj){
	$.ajax({
	  type:"post",
	  url:"/Follow/add/",
	  data:{pId:obj},
	  dataType:"json",
	  success:function(resData){
	     if(resData.errorcode!="0" && resData.errorcode!="101"){
	        return alert(resData.errordesc);
				
	     }else if(resData.errorcode == "101") {
			window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
			return;
        }   
	  }
	})
}

function adddccc(){
	$(".swiper-container").css({"width":Q(720),"height":Q(430)})
	$(".swiper-pagination").css({"height":Q(14),"bottom":Q(15)})
	$(".swiper-pagination span").css({"width":Q(14),"height":Q(14),"margin-left":Q(10),"margin-right":Q(10)})
//	var marginL=$("#pagination span").outerWidth() * $("#pagination span").length
//	$("#pagination").css({"margin-left":Q(-(marginL/2))})
	$(".WaitGroup").css({
		"width":Q(720),
		"height":Q(560),
		"padding-right":Q(20)
	})
	$(".WaitGroup .swiper-slide").css({
		"width":Q(300),
		"height":Q(560),
		"margin-left":Q(20)
	})
	$(".WaitGroup .dlis").parent().find(".dlis:last").css("margin-right",Q(20));
	$(".WaitGroup .dlis h3").css({
		"height":Q(56),
		"margin-top":Q(20),
		"margin-bottom":Q(20)
	})
	$(".WaitGroup .dlis h3 img").css({
		"height":Q(56),
		"width":Q(56),
		"margin-right":Q(20),
		"margin-left":Q(20)
	})
	$(".WaitGroup .dlis h3 b").css({
		"height":Q(56),
		"width":Q(200),
		"line-height":Q(56),
		"font-size":Q(28)
	})
	
	$(".WaitGroup .dlis .pic_d").css({
		"height":Q(300),
		"width":Q(300),
		"margin-bottom":Q(10)
	})
	$(".WaitGroup .dlis .pic_d b").css({
		"height":Q(80),
		"padding-top":Q(15),
		"width":Q(129),
		"font-size":Q(28),
		"top":Q(10),
		"text-indent":Q(24),
		"right":Q(10)
	})
	
	$(".WaitGroup .dlis p").css({
		"font-size":Q(28),
		"line-height":Q(40),
		"height":Q(80),
		"padding-right":Q(20),
		"padding-left":Q(20),
	})
	$(".WaitGroup .dlis h4").css({
		"font-size":Q(40),
		"height":Q(40),
//		"margin-top":Q(10),
		"padding-left":Q(20),
	})
	
	
}