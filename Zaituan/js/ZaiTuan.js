$(function(){
	//加载中样式
	
//	alert($("#top li:eq(2)").text())

//	$("#top li").click(function(){
//		alert("00")
//	})

//	$("#main-all2").trigger("click");
	css()
	
	$("#main-wait,#main-all").css("display","none");
//  $("#top>ul>li").click(function(){
//      if($(this).siblings().hasClass('active')){
//          $(this).siblings().removeClass('active');
//          $(this).addClass('active');
//			var id=$(this).attr("data");
//			 $(id).siblings().css("display","none")
//			 $(id).css("display","block")
//      }else{
//          $(this).addClass('active');
//      }
//   
//
//  });
//  f1(0)
//  f2(0)
//	f3(0)
   
   
    var tabsSwiper = new Swiper('#tabs-container', {
					speed: 500,
					onSlideChangeStart: function() {
						$(".tabs .active").removeClass('active')
						$(".tabs li").eq(tabsSwiper.activeIndex).addClass('active');
						$(".tabs li").each(function(index, element) {
                            if($( this ).hasClass("active")){
								var id=$(this).attr("data");
								 $(id).css("display","block");
								 $(id).parent().siblings().find(".content-slide").css("display","none");
				 				 $(".logining").html("");
				 				 $("#main-box").html("");
								$("#main-all").html("");
								$("#main-wait").html("");
								if($(this).index()==0){
									f1(0);
								}if($(this).index()==1){
									f2(0);
								}if($(this).index()==2){
									f3(1);
								}
							}
                        });
						
						}
				})

				$(".tabs li").on('touchstart mousedown', function(e) {
					e.preventDefault()
					$(".tabs .active").removeClass('active')
					$(this).addClass('active')
					tabsSwiper.slideTo($(this).index())
//					$("#main-box").html("");
//					$("#main-all").html("");
//					$("#main-wait").html("");
//					if($(this).index()==0){
//						f1(0);
//					}if($(this).index()==1){
//						f2(0);
//					}if($(this).index()==2){
//						f3(0);
//					}
})

			Udefun()	
    		$(".login").css({"width":Q(260)})
			$(".login img").css({"width":Q(90),"height":Q(90)})
			$(".login span").css({"font-size":Q(32),"margin-left":Q(25)})
			$(".logining").css({"font-size":Q(32),"height":Q(90)});	
 //滚动条加载
//	$(document).stop().animate({ "scrollTop": 0 });	
    $(window).scroll(function() {
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
            GetAjaxData();
        }
    });
});
var Ude="";

function Udefun(){

				Ude = getParamValue("Ude");
//					alert(Ude)
//					css()
//					$("#main-box").html("")
//					$("#main-all").html("");
//				    $("#main-wait").html("");
					if(Ude == 0 ){	
						$("#main-box").html("")
						$("#main-all").html("");
					    $("#main-wait").html("");
						$("#main-box1").trigger("mousedown");
					}else if(Ude == 1){
						$("#main-box").html("")
						$("#main-all").html("");
					    $("#main-wait").html("");
						$("#main-all2").trigger("mousedown");
					}else if(Ude == 2){
						$("#main-box").html("")
						$("#main-all").html("");
					    $("#main-wait").html("");
						$("#main-wait3").trigger("mousedown");
					}				
	if($(".tabs li:eq(0)").hasClass("active")){
	    f1(0)
	}
	//解决等待成团，点击进入后变成了两个商品
//	if($(".tabs li:eq(1)").hasClass("active")){
//		f2(0)
//	}
//	if($(".tabs li:eq(2)").hasClass("active")){
//		f3(0)
//	}

}


var id1;
var id2;
var id3;
var id4;
var isdeal = false;
//接受本小区在团数据
function  f1(id)
{
	isdeal = true;
	id1 = id;
	$.ajax({
		type: 'GET',
		url: '/Product/gList/',
		data:{"id":id,"is_All":"0"},
		dataType: 'json',
		success: function(resData){
		
//			alert(id)
			isdeal = false;
			if(id ==0)
			{
				$("#main-box").html("");
			}
		
			$(".logining").html("");
			if (resData.errorcode != "0" && resData.errorcode != "101") {
                return alert(resData.errordesc);
            } else if (resData.errorcode == "101") {
                window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
                return;
            }
            
			 var data = resData.data;
//			 console.log(data)
                if (data != null && data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                            var order=data[i];
                            id1 = order.id;
                            var str1=
									'<div class="section">'+
										'<div class="main">'+
											'<p>'+
												'<img src='+order.headimgurl+' alt="5"/>'+
												'<span>'+order.nickname+'</span>'+
											'</p>'+
											'<div class="body">'+
												'<img onclick="Jump(' + order.id + ')" src='+order.icon+' alt="1"/>'+
												'<i>'+order.success_count+'</i>'+
												'<div>'+
													'<span onclick="Jump(' + order.id + ')">'+Tittle(order.title)+'</span>'+
													'<div class="shijian">'+
														'<p>'+
															'<img src="img/shijian.jpg" alt="shijian"/>'+
															'<span>'+valtime(order.time)+' </span>'+
														'</p>'+
														'<div>'+
															'<span>' + order.open_num + '</span>件起团，在团<span class="teshu">' + (order.num == null ? "0" : order.num) + '</span> 件' +
														'</div>'+
														'<div class="foot foot2">'+
															'<h1> <span>¥</span>'+order.price+'</h1>'+
															'<a href="../DetailsPage/Xiangqi/fukuan.html?pid='+order.id+'"><img date="'+order.id+'" src="img/2.jpg" alt="2"/></a>'+
														'</div>'+
													'</div>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>';
									 $("#main-box").append(str1);
							var order1=data[i].neighborOrder;
							if(order1!=null){
								var listr="";
								var count = 0;
//								var sss = true;
								for(var r=0;r<order1.length;r++){
									if(count >=7)
									 {
									 	listr+='<li class="right"><img src="img/point.jpg" alt="point"/></li>';
									 	break;
									 }
									 listr+='<li><img src='+order1[r]+' alt="3"/></li>';
//									 if(r == 0 && sss)
//									 {
//									 	
//									 	sss = false;
//									 	r--;
//									 }
									 
									 
									 count++;
									 
								}
								 var str= '<div class="main_foot">'+
											'<div>'+
												'<p>看看你的邻居：</p>'+
												'<ul>'+
													listr
												'</ul>'+
											'</div>'+
										'</div>';
							
	                            $("#main-box").append(str).show();
	                        	 css();
							}
		
					}
                         css();
            }else{
            		$(".login").html("");
               		$(".logining").html("没有可以加载的数据了");
            }
		}
	})
}
//接受全部在团数据
function f2(id){
	  	id2 = id;
	  	isdeal = true;
	$.ajax({
		type: 'GET',
		url: '/Product/gList/',
		data:{"id":id,"is_All":"1"},
		dataType: 'json',
		success: function(resData){
//			console.log(resData)
			isdeal = false;
			var data = resData.data;
//			alert(data.length)
//			console.log(data)
//			$(".logining").html("");
			var ishavedata = false;
	 if (data != null && data.length > 0 && data !== "" ) {
	 		$(".logining").html("");
	
			    ishavedata = true;
               for(var i = 0; i < data.length; i++) {
                          var order=data[i];
                           id2 = order.id;
			   	 var str =
                        '<div class="section">' +
                            '<div class="main">' +
                                '<p>' +
                                    '<img src=' + order.headimgurl + ' alt="5"/>' +
                                    '<span>' + order.nickname + '</span>' +
                                '</p>' +
                                '<div class="body">' +
                                    '<img onclick="Jump(' + order.id + ')" src=' + order.icon + ' alt="1"/>' +
                                    '<i>'+order.success_count+'</i>'+
                                    '<div>' +
                                        '<span onclick="Jump(' + order.id + ')">' + Tittle(order.title) + '</span>' +
                                        '<div class="shijian">' +
                                            '<p>' +
                                                '<img src="img/shijian.jpg" alt="shijian"/>' +
                                                '<span>' + valtime(order.time) + ' </span>' +
                                            '</p>' +
                                            '<div>' +
                                                '<span>' + order.open_num + '</span>件起团，在团<span class="teshu">' + (order.num == null ? "0" : order.num) + '</span> 件' +
                                            '</div>' +
                                            '<div class="foot foot2">' +
                                                '<h1><span>¥</span>' + order.price + '</h1>' +
                                                '<a href="../DetailsPage/Xiangqi/fukuan.html?pid=' + order.id + '"><img date="' + order.id + '" src="img/2.jpg" alt="2"/></a>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
			    $("#main-all").append(str);
			    css();
			}
}else{
	$(".login").html("");
    $(".logining").html("没有可以加载的数据了");
	
}
//			if (!ishavedata)
//			{
//			    $(".logining").html("没有可以加载的数据了");
//			}
		}
	})
	
}
//接受等待开团数据
function f3(id){
//	 	alert(id)
		id3 = id;
		isdeal = true;
	$.ajax({
		type: 'GET',
		url: '/Product/getWaitList/',
		data:{page:id,"is_All":"1"},
		dataType: 'json',
		success: function(resData){
			isdeal = false;
			if (resData.errorcode != "0" && resData.errorcode != "101") {
              return alert(resData.errordesc);
          } else if (resData.errorcode == "101") {
              window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
              return;
          }
			 var data = resData.data.data;
//			 alert(data.length)
//			 console.log(data)
              if (data != null && data.length > 0) {
              	$(".logining").html("");
//            	alert(resData.data.page_total)
//            	if(resData.data.page_total > id3){       		
              			id3+=1;
//            	}
              
                  for (var i = 0; i < data.length; i++) {
                          var order=data[i];
                          //id3 = order.id;
                          var str=
									'<div class="section">'+
						                '<div class="main">'+
						                    '<p>'+
						                        '<img  src="'+order.headimgurl+'" alt="5"/>'+
						                        '<span>'+order.nickname+'</span>'+
						                    '</p>'+
						                    '<div class="body">'+
						                        '<img onclick="Jump(' + order.id + ')" src="'+order.icon+'" alt="1"/>'+
						                        '<i class="scount">'+order.success_count+'</i>'+
						                        '<div>'+
						                            '<span onclick="Jump(' + order.id + ')">'+Tittle(order.title)+'</span>'+
						                            '<div class="shijian">'+                  
						                                '<div class="foot">'+
						                                    '<h1><span>¥</span> '+order.price+'</h1>'+
						                                '</div>'+
						                                '<div class="wait_for">'+
						                                	'<img onclick="Jump(' + order.id + ')" src="img/wait_for.png" id="'+order.id+'" alt="2"/>'+
						                                '</div>'+                                
						                            '</div>'+
						                        '</div>'+
						                    '</div>'+
						                '</div>'
						            '</div>';
                        
							                 
						            $("#main-wait").append(str);
                           css();
                      }
               }else{
               		$(".login").html("");
               		$(".logining").html("没有可以加载的数据了");
            }
		}
	})
}
function f4(id){
		id4 = id;
		isdeal = true;
	$.ajax({
		type: 'GET',
		url: '/Product/getWaitList/',
		data:{"id":id,"is_All":"1"},
		dataType: 'json',
		success: function(resData){
			$(".logining").html("");
			isdeal = false;
			if (resData.errorcode != "0" && resData.errorcode != "101") {
              return alert(resData.errordesc);
          } else if (resData.errorcode == "101") {
              window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
              return;
          }
			 var data = resData.data;
              if (data = null && data.length < 0) {
              	
                           css();
                     } else{
               				
               				$(".logining").html("没有可以加载的数据了");
          			  }
           }
		
	})
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
	    if(id1 == 0)
	    {
	        $(document).stop().animate({ "scrollTop": 0 });
	    }
		f1(id1)
	}
	if($(".active").index() == 1)
	{
	    if (id2 == 0) {
	        $(document).stop().animate({ "scrollTop": 0 });
	    }
		f2(id2)
	}
	if($(".active").index() == 2)
	{
	    if (id3 == 1) {
	        $(document).stop().animate({ "scrollTop": 0 });
	    }
		f3(id3)
	}
	
}

function Jump(pid) {
//	alert(pid)
  window.location.href = "/MomBuy/DetailsPage/DetailsPage.html?pId=" + pid + "";

}

function Q(obj){
    var width = $(window).width();
    if(width>720){
        width=720;
    }
    var num=(parseFloat(obj)/720).toFixed(20) * width;
    return num+"px";
}
//样式
function css(){
	$("#header,.section").css({"padding-left":Q(20),"padding-right":Q(20)});
    $("#header").css({"margin-bottom":Q(20),"height":Q(86)});
    $("#top>ul").css({"padding-left":Q(18),"padding-right":Q(15)});
    $("#top>ul>li").css({"font-size":Q(36), "line-height":Q(82), "padding-left":Q(10), "padding-right":Q(10), "margin-right":Q(56)});
    $("#top>ul li:last-child").css({"margin-right":Q(0)});
    $(".section").css({"padding-bottom":Q(3),"margin-bottom":Q(20),});
    $("#main-box>.section").css({"margin-bottom":Q(0)});
    $(".main").css({"margin-bottom":Q(30)});
	$(".main>p").css({"margin-top":Q(25),"margin-bottom":Q(15)});
    $(".main>p>img").css({"width":Q(56),"height":Q(56)});
    $(".main>p>span").css({"margin-left":Q(15),"font-size":Q(28),"height":Q(28),"line-height":Q(28),"top":Q(13)});
    $(".body>img").css({"margin-right":Q(20),"width":Q(270),"height":Q(270)});
	$(".body>div").css({"width":Q(380)});
    $(".body>div>span").css({"font-size":Q(32),"height":Q(85)});
    $(".shijian>p").css({"height":Q(30),"margin-top":Q(20)});
    $(".shijian>p>img").css({"width":Q(30),"height":Q(30)});
    $(".shijian>p>span").css({"font-size":Q(30),"line-height":Q(30),"height":Q(30),"top":Q(2),"left":Q(13)});
    $(".shijian>div").css({"font-size":Q(28),"margin-top":Q(20)});
    $(".shijian>div>span").css({"font-size":Q(34)});
    $(".shijian>div>span.teshu").css({"font-size":Q(34), "margin-left" : Q(10)});
    $(".foot2").css({"width":Q(380)})
    //等待开团的样式
    $("#main-wait .body").css({"height":Q(230)});
    $("#main-wait .body>div>span").css({"margin-bottom":Q(0)});
    $("#main-wait .body>img").css({"width":Q(230),"height":Q(230)})
    
    
 $(".body>i").css({
		"height":Q(70),
		"padding-top":Q(15),
		"width":Q(119),
		"font-size":Q(24),
		"top":Q(5),
		"text-indent":Q(16),
		"left":Q(150),
		"text-indent":Q(16)
	})
    
    
    $("#main-wait .shijian>.wait_for>img").css({"width":Q(170),"height":Q(56)})
    $("#main-wait .shijian>div").css({"margin-top":Q(15),"margin-bottom":Q(20)});
    $("#main-wait .scount").css({"left":Q(110)});
    
    //$(".foot").css({"margin-top":Q(25)})
    $(".foot>h1").css({"font-size":Q(44),"height":Q(56),"line-height":Q(56),"padding-top":Q(2)});
	$(".foot>h1>span").css({"font-size":Q(33),"margin-right":Q(7)});
    $(".foot img").css({"width":Q(142),"height":Q(56)});
    $("#main-box>.main_foot").css({"margin-bottom":Q(20),"padding-left":Q(20),"padding-right":Q(20),"padding-bottom":Q(20)});
    $("#main-box>.main_foot div p").css({"font-size":Q(28),"line-height":Q(86)});
    $("#main-box>.main_foot div ul li").css({"margin-right":Q(33)});
    $("#main-box>.main_foot div ul li.seven").css({"margin-right":Q(20)});
    $("#main-box>.main_foot div ul li img").css({"width":Q(56),"height":Q(56)});
//  $("#main-box>.main_foot div ul li").eq(7).css({"margin-right":Q(0)});
    $("#main-box>.main_foot div ul li.right  img").css({"width":Q(20),"height":Q(56)});
	$("#main-all>.section>.main").css({"margin-bottom":Q(0)});
    $("#main-all>.section").css({"padding-bottom":Q(30)});
    
    var width = $(window).width()
    if(width>720){
    	width=720;
    }
    $("body").css({"padding-top":Q(106)})
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
	//加载中样式
	$(".login").css({"width":Q(260)})
	$(".login img").css({"width":Q(90),"height":Q(90)})
	$(".login span").css({"font-size":Q(32),"margin-left":Q(25)})
	$(".logining").css({"font-size":Q(32),"height":Q(90)});
}

function valtime(obj) {	
	if(obj.indexOf("天") >-1 && obj.indexOf("小时")>-1 &&obj.indexOf("分")>-1){
		var a=obj.split("天");
		var b=a[1].split("小时");
		var c=b[1].split("分");
		return a[0]+" <b>天</b> "+b[0]+" <b>小时</b> "+c[0]+" <b>分</b> "
	}else if(obj.indexOf("天") ==-1 && obj.indexOf("小时")>-1){
		var d=obj.split("小时");
		var e=d[1].split("分");
		return "0 <b>天</b> "+d[0]+" <b>小时</b> "+e[0]+" <b>分</b> "
		//return "<font>0</font>&nbsp;天&nbsp;<font>"+d[0]+"</font>&nbsp;小时&nbsp;<font>"+e[0]+"</font>&nbsp;分";
	}
	else if(obj.indexOf("天") ==-1 && obj.indexOf("小时")==-1 ){
		var aa=obj.split("分");
		return "0 <b>天</b> 0 <b>小时</b> "+aa[0]+" <b>分</b> "
		//return "<font>0</font>&nbsp;天&nbsp;<font>0</font>&nbsp;小时&nbsp;<font>"+aa[0]+"</font>&nbsp;分";
		
	}else if(obj.indexOf("小时")==-1 && obj.indexOf("天")>-1 &&obj.indexOf("分")>-1){
		var x=obj.split("天");
		var m=x[1].split("分");
		return x[0]+"<b>天</b> 0 <b>小时</b> "+m[0]+" <b>分</b> "
	}
	}
function Tittle(str){
	if(str.length>=20){
		var substr=str.slice(0,21).concat('...');
		return substr;
	}else{
		return str;
	}
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
    // 将参数数组进行返回
    return paramsArray;
}