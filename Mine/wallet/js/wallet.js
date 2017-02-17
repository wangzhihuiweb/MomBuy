$(function(){
	$.ajax({
		type:"post",
		url:"/MyHome/index/",
		dataType:"json",
		success:function(moneyData){
			var data=moneyData.data;
			$(".Amount b").text("￥"+Number(data.money).toFixed(0));
		}
	});
	$(".wallet div").css({"height":Q(112),"padding-left":Q(20),"padding-right":Q(20)})
	$(".wallet div span").css({"line-height":Q(112),"font-size":Q(32),})
	$(".wallet div b").css({"line-height":Q(112),"font-size":Q(36),})
	$(".wallet div i").css({"height":Q(33),"width":Q(18),"margin-top":Q(40),})
	
	$(".wallet div.Amount").css({"height":Q(120)})
	$(".wallet div.Amount span").css({"line-height":Q(120),"font-size":Q(32),})
	$(".wallet div.Amount b").css({"line-height":Q(120),"font-size":Q(36),})
	
	$(".wallet div.mrtop").css({"margin-top":Q(20)})
	$("footer a").eq("3").find("span").addClass("light")
	$("footer a").eq("3").find("b").addClass("light")
})	

function Q(obj){
	var width = $(window).width()
    if(width>720){
    	width=720;
    }
	var num=(parseInt(obj)/720).toFixed(20) * width;
	return num+"px";
}// JavaScript Document