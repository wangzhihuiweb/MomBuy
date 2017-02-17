$(function(){	
	//请求数据
	$.ajax({
		type:"post",
		url:"/News/walletNews/",
		dataType:"json",
		success:function(mnyDATA){
			//console.log(mnyDATA);
			var data=mnyDATA.data;
			for(var i=0;i<data.length;i++){
				var list=data[i];
				var str=
					'<h3>'+(i+1)+'、'+list.title+'</h3>'+
					'<p>'+list.content+'</p>';
				$(".aboutWallet").append(str);
				css();
			}
		}
	});
	
	
})	

function Q(obj){
	var width = $(window).width()
    if(width>720){
    	width=720;
    }
	var num=(parseInt(obj)/720).toFixed(20) * width;
	return num+"px";
}
function css(){
	//	$("body").css({"padding-bottom":Q(140)})
	$("footer a").eq("3").find("span").addClass("light")
	$("footer a").eq("3").find("b").addClass("light")
	$(".aboutWallet").css({"padding-left":Q(20),"padding-top":Q(20),"padding-right":Q(20)});
	$(".aboutWallet p").css({"line-height":Q(58),"font-size":Q(32),"text-indent":Q(32)})
	$(".aboutWallet h3").css({"font-size":Q(36),"padding-bottom":Q(16),"padding-top":Q(22)})
}
