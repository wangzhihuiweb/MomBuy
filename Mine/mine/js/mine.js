$(function(){
    //样式引用
    $.ajax({
        type: "post",
        url: "/User/doGetUserInfo/",
        dataType: "json",
        success: function(resData) {

            if (resData.errorcode != "0" && resData.errorcode != "101") {
                return alert(resData.errordesc);

            } else if (resData.errorcode == "101") {
                    return;
                   window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
                return;
            }
            var user = resData.data;

            if (!user.areaId || $.trim(user.areaId) == "") {

                window.location.href = "/MomBuy/Login/Login.html";
            }

            $(".My_Div span").text(user.nickname);
            $(".head img").attr("src", user.headimgurl);

        }
    })
MineCss()
})	

function MineCss(){
	$("footer a").eq("3").find("span").addClass("light")
	$("footer a").eq("3").find("b").addClass("light")
	$(".My").css({"width":Q(720),"height":$(window).height()})
	$(".My_Div").css({"width":Q(200),"height":Q(200),"margin-left":Q(-100),"margin-top":Q(364),})
	$(".wodegentuan").css({"bottom":Q(179),"left":Q(263),"width":Q(134),"height":Q(183)});			
	$(".Showman").css({"bottom":Q(294),"left":Q(49),"width":Q(126),"height":Q(168)});
	$(".wallet").css({"bottom":Q(-58),"left":Q(294),"width":Q(112),"height":Q(162)});
	$(".changjianwenti").css({"bottom":Q(-241),"left":Q(233),"width":Q(111),"height":Q(138)});
	$(".Address").css({ "bottom": Q(-319), "left": Q(51), "width": Q(111), "height": Q(156) });
	
	$(".news").css({ "bottom": Q(-246), "left": Q(-143), "width": Q(112), "height": Q(144) });
	$(".essential").css({"bottom":Q(180),"left":Q(-170),"width":Q(117),"height":Q(166)});
	$(".jibenxinxi").css({"bottom":Q(-39),"left":Q(-217),"width":Q(112),"height":Q(145)});
	$(".My .My_Div span").css({"padding-top":Q(17),"font-size":Q(40),"width":Q(360),"left":Q(-76)})
	
	$(".mod-orient-layer").css({"font-size":Q(40),"padding-top":Q(30)})
	
}
function Q(obj){
	var width = $(window).width()
    if(width>720){
    	width=720;
    }
	var num=(parseInt(obj)/720).toFixed(20) * width;
	return num+"px";
}

