$(function(){
   css();
   $("footer a").eq("3").find("span").addClass("light");
	$("footer a").eq("3").find("b").addClass("light");
	//请求我的关注数据
	login(0);
	//滚动条加载
    $(window).scroll(function() {
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
            GetAjaxData();
        }
    });
});
var id1;
var isdeal = false;
function login(id){
	id1 = id;
	isdeal = true;
	$.ajax({
		type: 'POST',
		url: '/Follow/gList/',
		data:{id:id},
		dataType: 'json',
		success: function(resData){
			isdeal = false;
			if (resData.errorcode != "0" && resData.errorcode != "101") {
              return alert(resData.errordesc);
          } else if (resData.errorcode == "101") {
              window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
              return;
          }
			 var data = resData.data;
//			 console.log(data)
            var str = '';
              if (data != null && data.length > 0) {
              	$(".login").html("");
                  for (var i = 0; i < data.length; i++) {
                          var order=data[i];
                          id1 = order.id;
                          str=
									'<div class="section">'+
								        '<div class="main">'+
								            '<p>'+
								                '<img src="'+order.headimgurl+'" alt=""/>'+
								                '<span>'+order.nickname+'</span>'+
								            '</p>'+
								            '<div class="body">'+
								                '<img onclick="Jump(' + order.pId + ')" src="'+order.icon+'" alt=""/>'+
								                '<div>'+
								                    '<span onclick="Jump(' + order.pId + ')">'+Tittle(order.title)+'</span>'+
								                    '<div class="shijian">'+
								                        '<p>'+
								                   			'<img src="img/shijian.jpg" alt="shijian"/>'+
															'<span>'+valtime(order.time)+' </span>'+		                            
								                        '</p>'+
								                        '<div>'+
								                            '<span>'+order.open_num+'</span> 件起团，在团 <span>45</span> 件'+
								                        '</div>'+
								                        '<div class="foot">'+
								                            '<h1> <span>¥</span> '+order.price+'</h1>'+
								                            '<img  onclick="fllow(this)" did="'+order.pId+'" src="img/guazhu.png" alt=""/>'+
								                        '</div>'+
								                    '</div>'+
								                '</div>'+
								            '</div>'+
								        '</div>'+
								    '</div>';
                        
                          $(".myzz").append(str);
                           css();
                      }
               }else{
               			$(".login").html("");
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
	login(id1);
}
function fllow(obj){
	var id=$(obj).attr("did");
		console.log(id);
		concern(id);
		$(obj).parent().parent().parent().parent().parent().parent('.section').remove();
//		alert($(".section").length);
//	if(($(".section").length)<=4){
//      	$(".login").html("");
//          $(".logining").html("");
//}
}
function Q(obj){
    var width = $(window).width();
    if(width>720){
        width=720;
    }
    var num=(parseInt(obj)/720).toFixed(20) * width;
    return num+"px";
}

function Jump(pid) {
//	alert(pid)
  window.location.href = "/MomBuy/DetailsPage/DetailsPage.html?pId=" + pid + "";

}

function concern(pid,obj){
	$.ajax({
	  type:"post",
	  url:"/Follow/add/",
	  data:{pid:pid},
	  dataType:"json",
	  success:function(resData){
	     if(resData.errorcode!="0" && resData.errorcode!="101"){
	        return alert(resData.errordesc);
				
	     }else if(resData.errorcode == "101") {
			window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
			return;
         }
		 $(obj).addcaddClass("light");      
	  }
	})
}

function css(){
	$(".section").css({"margin-bottom":Q(20),"padding-left":Q(20),"padding-right":Q(20)});
    $(".main").css({"margin-bottom":Q(20)});
    $(".main>p>img").css({"width":Q(56),"height":Q(56)});
    $(".main>p").css({"margin-top":Q(15),"margin-bottom":Q(15)});
    $(".main>p>span").css({"margin-left":Q(18),"font-size":Q(28),"line-height":Q(30),"top":Q(5)});
    $(".body>img").css({"margin-right":Q(20),"width":Q(270),"height":Q(270)});
    $(".body>div").css({"width":Q(380)});
    $(".body>div>span").css({"font-size":Q(32),"height":Q(85)});
    $(".shijian>p").css({"margin-top":Q(20),"margin-bottom":Q(20)});
    $(".shijian>p>img").css({"width":Q(30),"height":Q(30)});
    $(".shijian>p>span").css({"font-size":Q(28),"line-height":Q(30),"top":Q(6),"left":Q(10)});
    $(".shijian div").css({"font-size":Q(28)});
    $(".shijian>div>span").css({"font-size":Q(30)});
    $(".foot").css({"margin-top":Q(10)});
    $(".foot>h1").css({"font-size":Q(40),"margin-top":Q(10),"margin-left":Q(4)});
    $(".foot>h1>span").css({"font-size":Q(34)});
    $(".foot>img").css({"margin-top":Q(13),"width":Q(54),"height":Q(45)});
    
    $(".login").css({"width":Q(260)})
	$(".login img").css({"width":Q(90),"height":Q(90)})
	$(".login span").css({"font-size":Q(32),"margin-left":Q(25)})
	$(".logining").css({"font-size":Q(32),"height":Q(90)});
	//�ײ�
	 var width = $(window).width()
    if(width>720){
    	width=720;
    }
    //$("body").css({"padding-top":Q(106)})
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
function Tittle(str){
	if(str.length>=20){
		var substr=str.slice(0,21).concat('...');
		console.log(substr);
		return substr;
	}else{
		return str;
	}
}
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
function valtime(obj) {	
	if(obj.indexOf("天") >-1 && obj.indexOf("小时")>-1 &&obj.indexOf("分")>-1){
		var a=obj.split("天");
	//console.log(a);
		var b=a[1].split("小时");
		var c=b[1].split("分");
		return "<span>"+a[0]+" <b>天</b> "+b[0]+" <b>小时</b> "+c[0]+" <b>分</b> </span>"
	}else if(obj.indexOf("天") ==-1 && obj.indexOf("小时")>-1){
		var d=obj.split("小时");
		var e=d[1].split("分");
		return "<span>0 <b>天</b> "+d[0]+" <b>小时</b> "+e[0]+" <b>分</b> </span>"
		//return "<font>0</font>&nbsp;天&nbsp;<font>"+d[0]+"</font>&nbsp;小时&nbsp;<font>"+e[0]+"</font>&nbsp;分";
	}
	else if(obj.indexOf("天") ==-1 && obj.indexOf("小时")==-1 ){
		var aa=obj.split("分");
		return "<span>0 <b>天</b> 0 <b>小时</b> "+aa[0]+" <b>分</b> </span>"
		//return "<font>0</font>&nbsp;天&nbsp;<font>0</font>&nbsp;小时&nbsp;<font>"+aa[0]+"</font>&nbsp;分";
		
	}else if(obj.indexOf("小时")==-1 && obj.indexOf("天")>-1 &&obj.indexOf("分")>-1){
		var x=obj.split("天");
		var m=x[1].split("分");
		return "<span>"+x[0]+"<b>天</b> 0 <b>小时</b> "+m[0]+" <b>分</b> </span>"
	}
	}