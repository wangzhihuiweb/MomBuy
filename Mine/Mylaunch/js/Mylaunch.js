$(function () {
	F1(1)
var id1;
var id2;
var id3;
    mylaunch()
//滚动条加载
   
    var tabsSwiper = new Swiper('#tabs-container', {
				speed: 500,
				onSlideChangeStart: function() {
					$(".tabs .active").removeClass('active')
					$(".tabs a").eq(tabsSwiper.activeIndex).addClass('active');
					$(".tabs a").each(function(index, element) {
							
                            if($( this ).hasClass("active")){
								var id=$(this).attr("data");
								 $(id).css("display","block");
								 $(id).parent().siblings().find(".content-slide").css("display","none");
								  $(".logining").html("");
				 				$("#ProductList").html("");
								$("#GroupOrder").html("");
//								$("#IngroupGoods").html("");		
								if($(this).index()==0){
									F1(1);
								}if($(this).index()==1){	
									F2(1);
								}if($(this).index()==2){
									IngroupGoodsFun()
//									$(".login").html("");
//      							$(".logining").html("没有可以加载的数据了");
								}
							}
                        });
				}
			})
			$(".tabs a").on('touchstart mousedown', function(e) {
				e.preventDefault()
				$(".tabs .active").removeClass('active')
				$(this).addClass('active')
				tabsSwiper.slideTo($(this).index())
//				wangzhihuiFun()
//				$("html,body").stop().animate({ "scrollTop": 0 });

			})
			$(".tabs a").click(function(e) {
				e.preventDefault()
//				wangzhihuiFun()
//					$("html,body").stop().animate({ "scrollTop": 0 });
			})
//		$(document).stop().animate({ "scrollTop": 0 });	
		$(window).scroll(function() {
	        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
	            GetAjaxData();
	        }	       
	    });
    
})


function DealProduct(id, status, obj) {
    var msg = "";
    if(status==0)
    {
        msg = "您确定要下架商品信息吗？";
    }
    else if (status == 4)
    {
        msg = "您确定要删除商品信息吗？";
    }
    if (confirm(msg)) {
        $.ajax({
            type: "get",
            url: "/Product/setStatus/",
            data: { pId: id, status: status },
            dataType: "json",
            success: function (resData) {
                if (resData.errorcode != "0" && resData.errorcode != "101") {
                    return alert(resData.errordesc);

                } else if (resData.errorcode == "101") {
                    window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
                    return;
                }
                var data = resData.data;
                alert(data.msg);
                $(obj).parent().parent().parent().remove();
                
            }
        })
    }

    
}

//商品列表
function F1(id){
	id1=id;
	$.ajax({
        type: "post",
        url: "/MyHome/productList/",
        data:{page:id,status:0},
        dataType: "json",
        success: function (resData) {
            if (resData.errorcode != "0" && resData.errorcode != "101") {
                return alert(resData.errordesc);

            } else if (resData.errorcode == "101") {
                window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
                return;
            }
            var data = resData.data.data;
			if (data != null && data.length > 0) {
                id1+=1;
				 for (var i = 0; i < data.length; i++) {
				 	//id1 = data[i].id;
			                var proBar = " ", ext = "<p><span>&yen;" + data[i].price + "</span></p>", cssType = "";
			                if (data[i].status == "0") {
			                    proBar = '<a href="/MomBuy/DetailsPage/DetailsPage.html?pId=' + data[i].id + '"><img src="images/yulan.png" alt="预览" /></a><a href="/MomBuy/Issue/Issue.html?pId=' + data[i].id + '"><img src="images/bianji.png" alt="编辑" /></a><a onclick="DealProduct(' + data[i].id + ',4,this)" href="javascript:"><img src="images/shanchu.png" alt="删除" /></a>';
			                    cssType = "operate3";
			
			                } else if (data[i].status == "1") {
			                    proBar = '<a href="/MomBuy/DetailsPage/DetailsPage.html?pId=' + data[i].id + '"><img src="images/yulan.png" alt="预览" /></a>' +
			                                '<a href="/MomBuy/Issue/Issue.html?pId=' + data[i].id + '"><img src="images/bianji.png" alt="编辑" /></a>' +
			                                '<a href="javascript:" onclick="DealProduct(' + data[i].id + ',0,this)"><img src="images/xiajia.png" alt="下架" /></a>' +
			                                '<a href="javascript:"><img onclick="DealProduct(' + data[i].id + ',4,this)" src="images/shanchu.png" alt="删除" /></a>';
			                    cssType = "";
			                } else if (data[i].status == "3" || data[i].status == "2") {
			                    proBar = '<a href="/MomBuy//DetailsPage/DetailsPage.html?pId=' + data[i].id + '"><img src="images/yulan.png" alt="预览" /><a href="/MomBuy/Mine/wode/myfaqi.html?pId=' + data[i].id + '"><img src="images/chakan.png" alt="查看订单"></a>';
			                    cssType = "operate2";
			                }
			                if (data[i].status != "4") {
			                    setPro("ProductList", data[i], proBar, ext, cssType, data[i].id);
			                }
			               
			            }
			}else{
            		$(".login").html("");
               		$(".logining").html("没有可以加载的数据了");
            } 
 			mylaunch();

           


        }
    })
}


//在团商品

function F2(id){
	id2=id;
	$.ajax({
        type: "post",
        url: "/MyHome/productList/",
        dataType: "json",
        data: { page:id,status: 1 },
        success: function (resData) {
        	if (resData.errorcode != "0" && resData.errorcode != "101") {
                return alert(resData.errordesc);

            } else if (resData.errorcode == "101") {
                window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
                return;
            }

            var data = resData.data.data;
            if (data != null && data.length > 0) {
                id2+=1;
            	for (var i = 0; i < data.length; i++) {

	                if (!data[i].now_bay_mun) {
	                    data[i].now_bay_mun = 0;
	                }
	                var proBar = " ", ext = "<p><span>&yen;" + data[i].price + "</span></p>", cssType = "";
	                //var time = new Date(data[i].end_time);
	                ext = '<p><span>&yen;' + data[i].price + '</span><b>在团<font>' + (data[i].now_bay_num > 0 ? data[i].now_bay_num : 0) + '</font>件</b></p><h4>截止时间：' + data[i].end_time.ToShortDateString() + '</h4>';
	                proBar = '<a href="/MomBuy/DetailsPage/DetailsPage.html?pId=' + data[i].id + '"><img src="images/yulan.png" alt="预览" /><a href="/MomBuy/Mine/wode/myfaqi.html?pId=' + data[i].id + '"><img src="images/chakan.png" alt="查看订单"></a>';
	                cssType = "operate2";
	                setPro("ProductList", data[i], proBar, ext, cssType, data[i].id);
	                setPro("GroupOrder", data[i], proBar, ext, cssType, data[i].id);

            	}
            }else{
            		$(".login").html("");
               		$(".logining").html("没有可以加载的数据了");
            }         
            mylaunch();

        }
    })
}

function IngroupGoodsFun(){
	$.ajax({
        type: "post",
        url: "/Product/tuanProductList/",
        dataType: "json",
        data: {},
        success: function (resData) {
//      	console.log(resData)
        	var str="";
        	$.each(resData.data, function(v,i) {
        		str+="<div class='lis'><i class='"+statusFun(i.status)+"'></i><div class='To'><img onclick='Jump("+i.id+")'  src='"+i.icon+"' alt='图片' /><div><h3 onclick='Jump("+i.id+")'>"+Tittle(i.title)+"</h3><p><span>&yen;" + i.price + "</span></p><h4>截止时间："+i.end_time+"</h4></div></div><div class='operate operate2'><a href='/MomBuy/DetailsPage/DetailsPage.html?pId=" + i.id + "'><img src='images/yulan.png' alt='预览' /></a><a href='/MomBuy/Mine/wode/myfaqi.html?pId=" +i.id + "'><img src='images/chakan.png' alt='查看订单' /></a></div></div>"
        	});
        	$("#IngroupGoods").html(str)
        	mylaunch()
			
        }
	})
}

function statusFun(status){
	if(status == 2 || status ==1){
		return "";
	}else{
		return "fail";
	}
}


function setPro(elementId, data, proBar, ext, cssType, pid) {

    $("#" + elementId).append('<div class="lis">' +
        '<div class="To">' +
        '<img onclick="Jump('+pid+')" src=' + data.icon + ' alt="图片" />' +
        '<div>' +
        '<h3 onclick="Jump('+pid+')" >' + Tittle(data.title) + '</h3>' + ext + '</div>' +
        '<div class="operate ' + cssType + '">' + proBar + '</div></div>');
}
function Jump(pid) {
    window.location.href = "/MomBuy/DetailsPage/DetailsPage.html?pId=" + pid + "";

}
function mylaunch() {
    $("footer a").eq("3").find("span").addClass("light")
    $("footer a").eq("3").find("b").addClass("light")
    $("body").css({
        "padding-top": Q(86)
    })
    $("body").css({
        "padding-bottom": Q(140)
    })
    $(".Nav").css({
        "height": Q(86),
        "padding-left": Q(70)
    })
    $(".Nav a").css({
        "height": Q(86),
        "line-height": Q(86),
        "font-size": Q(34),
        "border-bottom-width": Q(4),
        "width": Q(148)
    })
    $(".Nav a").eq("1").css({
        "margin-left": Q(89)
    })
    $(".Nav a").eq("2").css({
        "margin-left": Q(68)
    })
    $(".lis").css({
        "padding-left": Q(20),
        "margin-top": Q(20),
        "padding-right": Q(20)
    })
    $(".lis .To").css({
        "padding-top": Q(30)
//      "padding-bottom": Q(20)
    })
    $(".lis .To img").css({
        "width": Q(150),
        "margin-right": Q(20),
        "margin-bottom": Q(30),
        "height": Q(150)
    })

    $(".lis .To div").css({
        //"padding-left": Q(20),
        "width": Q(510)
    })

    $(".lis .To div h3").css({
        "font-size": Q(31),
        "height":Q(80)
    })
    $(".lis .To div h4").css({
        "font-size": Q(28)
    })
    $(".lis .To div p").css({
        "padding-top": Q(5),
        "padding-bottom": Q(5)

    })
    $(".lis .To div p span").css({
        "font-size": Q(36)
    })
    $(".lis .To div p b").css({
        "font-size": Q(28),
        "margin-left": Q(26),
        "margin-top": Q(0)
    })
    $(".lis .To div p b font").css({
        "font-size": Q(32),
    })

    $("#IngroupGoods .To div").css({
        "width": Q(410)
    })
    $("#IngroupGoods .lis i").css({
        "width": Q(72),
        "height": Q(70),
        "right": Q(20)
    })

    $(".operate").css({
        "width": Q(680)
    })
    $(".operate a").css({
        "width": Q(170),
        "height": Q(165)
    })

    $(".operate2 a").css({
        "margin-left": Q(85),
        "margin-right": Q(85)
    })
    $(".operate3 a").css({
        "margin-left": Q(28),
        "margin-right": Q(28)
    })
    //加载中样式
	$(".login").css({"width":Q(260)})
	$(".login img").css({"width":Q(90),"height":Q(90)})
	$(".login span").css({"font-size":Q(32),"margin-left":Q(25)})
	$(".logining").css({"font-size":Q(32),"height":Q(90),"margin-top":Q(20)});
}

function Q(obj) {
    var width = $(window).width()
    if (width > 720) {
        width = 720;
    }
    var num = (parseFloat(obj) / 720).toFixed(20) * width;
    return num + "px";
}

function Tittle(str){
	if(str.length>=20){
		var substr=str.slice(0,21).concat('...');
		return substr;
	}else{
		return str;
	}
}

String.prototype.ToShortDateString = function () {

    var strs = this.split(':');
    var str = strs[0];
    if (strs[1]) {
        str += ":" + strs[1];
    }
    return str;

}
function GetAjaxData(){
//	alert(1)
	str=
	'<div class="login">'+
		'<img src="images/login.png" alt="" />'+
			'<span>加载中...</span>'+
						'</div>';
	$(".logining").html(str);
	mylaunch();
//	wangzhihui=true;
	if($(".active").index() == 0)
	{
//		alert(1)
		if(id1 == 1)
	    {
	        $(document).stop().animate({ "scrollTop": 0 });
	    }
		F1(id1)
	}
	if($(".active").index() == 1)
	{
		if(id2 == 1)
	    {
	        $(document).stop().animate({ "scrollTop": 0 });
	    }
//		alert(2)
		F2(id2)
	}
//	if($(".active").index() == 2)
//	{
//		IngroupGoodsFun()
////		alert(00)
////		$(".login").html("");
////      $(".logining").html("没有可以加载的数据了");
//	}
}
function Tittle(str){
	if(str.length>=20){
		var substr=str.slice(0,21).concat('...');
		return substr;
	}else{
		return str;
	}
}