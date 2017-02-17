$(function(){
	id=getParamValue("pid");
	//console.log(id);
	$.ajax({
		type:"post",
		url:"/News/dynamicNewsInfo/",
		data:{"id":id},
		dataType:"json",
		success:function(newData){
			var data=newData.data;
			for(var i=0;i<data.length;i++){
				list=data[i];
			var str=
					'<h1>'+list.title+'</h1>'+
				   	'<div>'+
				   		'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+list.content+''+
				   	'</div>';
   			$("body").append(str);
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
	$("body").css({"padding-bottom":Q(140)})
	$("h1").css({"font-size":Q(42),"padding-top":Q(40),"padding-bottom":Q(40),"padding-left":Q(20),"padding-right":Q(40)});
	$("div").css({"font-size":Q(36),"padding-left":Q(30),"padding-right":Q(20)})
	$("footer a").eq("3").find("span").addClass("light")
	$("footer a").eq("3").find("b").addClass("light")
}