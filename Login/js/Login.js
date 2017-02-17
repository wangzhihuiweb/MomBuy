$(function(){
 		
 		resloadCss()
        $.ajax({
           type:"get",
	       url:"/Area/getList/",
		   dataType:"json",
	       success:function(resData){
              if(resData.errorcode!="0" && resData.errorcode!="101"){
	              window.location.href = "/MomBuy/Index/index.html";		
	           }else if(resData.errorcode == 101) {
		          return window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
               }
			   var list = resData.data;
			   for(var i=0;i<list.length;i++){
				  $(".List").append("<p onclick='areaSelected(this)'><span arId="+list[i].id+" class=''>"+list[i].name+"</span><b class=''></b></p>")   
			   }
			   resloadCss();              
           }
        })

})

function resloadCss(){

//	$(".title").css({"height":Q(110),"width":Q(720)});
//	$(".title input").css({"padding-left":Q(20),"padding-right":Q(20),"font-size":Q(32)})
	$("body").css({"width":Q(720),"height":$(window).height(),"padding-top":Q(81)})
	$(".Loginimg").css({"width":Q(583),"height":Q(663)})
	$(".getInto").css({"padding-top":Q(45),"padding-left":Q(20),"padding-right":Q(20)})
	$(".getInto a").css({"width":Q(680),"padding-top":Q(33),"padding-bottom":Q(33),"font-size":Q(36),"margin-bottom":Q(10)})
//	$(".getInto a:first-child ").css({"height":Q(34)})
	$(".CellList").css({"width":Q(720),"height":$(window).height()})
	$(".CellList .banner").css("height",Q(334))
	
	$(".CellList .tit").css({"padding-top":Q(27),"padding-right":Q(21),"padding-left":Q(20),"padding-bottom":Q(32)})
	$(".CellList .tit h3").css({"font-size":Q(35),"padding-top":Q(2)})
	$(".CellList .tit img").css({"width":Q(46),"height":Q(46)})
	
	$(".CellList .List").css({"height":Q(700)})
	
	$(".CellList .List p").css({"height":Q(112),"padding-right":Q(21),"padding-left":Q(20),})
	
	$(".CellList .List p span").css({"height":Q(112),"line-height":Q(112),"font-size":Q(32)})
	$(".CellList .List p b").css({"width":Q(36),"height":Q(36),"margin-top":Q(40)})
	$(".openSelect").on("click",function(){
		$(".CellList").show("slow");
	})
	$(".CellList .tit img").on("click",function(){
		$(".CellList").hide("slow")
//		$('html,body').addClass('ovfHiden');
	})
	$(".Protocol").css({
        "height": Q(80),
        "padding-left": Q(200)
    })
    $(".Protocol span").css({
        "height": Q(80),
        "line-height": Q(80),
        "font-size": Q(32)
    })
    $(".Protocol i").css({
        "height": Q(30),
        "width": Q(30),
        "margin-right": Q(15),
        "margin-top": Q(25)
    })
    //免责模块PoModule
    $(".UdpModule").css({
        "width": Q(720),
        "height": $(window).height()
    })
    $(".UdpModule .AuditProtocol").css({
        "width": Q(720)
    })
    $(".UdpModule .AuditProtocol h3").css({
        "padding-top": Q(51),
        "padding-bottom": Q(29),
        "font-size": Q(36)
    })
    $(".UdpModule .Project").css({
        "padding-left": Q(20),
        "padding-right": Q(20),
        "font-size": Q(32),
        "line-height": Q(58),
    })
    $(".UdpModule .handle").css({
        "padding-left": Q(20),
        "padding-top": Q(42),
        "padding-bottom": Q(60)
    })

    $(".UdpModule .handle a").css({
        "width": Q(316),
        "height": Q(86),
        "line-height": Q(86),
        "font-size": Q(32)
    })
    $(".UdpModule .handle a.agree").css({
        "margin-left": Q(40)
    })
    $(".UdpModule .handle").css({
        "padding-left": Q(20),
        "padding-top": Q(42),
        "padding-bottom": Q(60)
    })

    $(".UdpModule .handle a").css({
        "width": Q(316),
        "height": Q(86),
        "line-height": Q(86),
        "font-size": Q(32)
    })
    $(".UdpModule .handle a.agree").css({
        "margin-left": Q(40)
    })

    $(".Protocol span").on("click", function () {
        $(".UdpModule").css({
            "display": "block"
        })
        $('html,body').addClass('ovfHiden');
    })
    $(".handle a").on("click", function () {
        $(".UdpModule").css({
            "display": "none"
        })
        $('html,body').removeClass('ovfHiden');
    })   
	$(".UdpModule .handle a.agree").click(function(){
		$(".Protocol i").removeAttr("class");
	})
	$(".UdpModule .handle a.nono").click(function(){
		$(".Protocol i").attr("class","light");
	})
}

function areaSelected(obj){
	$(".CellList").hide("slow")
	$("#openSelectxt").html($(obj).find("span").text());
   $(obj).siblings().find("span").removeClass("light");
   $(obj).siblings().find("b").removeClass("light");
   $(obj).find("span").addClass("light");
   $(obj).find("b").addClass("light");
}



function Q(obj){
	var width = $(window).width()
    if(width>720){
    	width=720;
    }
	var num=(parseInt(obj)/720).toFixed(20) * width;
	return num+"px";
}


function setArea(){
	if($("#isok").attr("class")=="light"){
		alert("请签署免责条款");
	}else{
		var span= $(".List span[class=light]");
	if(span.length==0){
		return $(".CellList").css({"display":"block"});
	}
	var arId=$(span).attr("arId");	
	setAreaAjax(arId);
	}
	
}

function setAreaAjax(arId){
	$.ajax({
		type:"POST",
		url:"/Area/setArea/",
		data:{areaId :arId}	,
		dataType:"json",
		success: function(resData){
			data =resData.data;
			if(data.message!="设置成功"){
				alert("服务器繁忙,请稍后再试");
		    }else{
				window.location.href="/MomBuy/Index/index.html";
			}
		}
	})
}

function toggleJpg(){
	$("#isok").toggleClass("light");
}
