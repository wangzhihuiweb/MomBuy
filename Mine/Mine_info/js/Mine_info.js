$(function () {


var teliphone=this;
    $.ajax({
        type: "POST",
        url: "/MyHome/index/",
        dataType: "json",
        success: function (resData) {
            if (resData.errorcode != "0" && resData.errorcode != "101") {
                return alert(resData.errordesc);

            } else if (resData.errorcode == "101") {
                window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
                return;
            }
            var user = resData.data;
            //console.log(user);
            $(".headimg img").attr("src", user.headimgurl);
            $("#name").text(user.nickname);
            $("#mobile").val(user.mobile);
            teliphone=user.mobile;
            //$("#tel").attr("value",user.mobile);
            $.ajax({
                type: "POST",
                url: "/Area/getList/",
                dataType: "json",
                success: function (areaData) {
                    if (areaData.errorcode != "0" && areaData.errorcode != "101") {
                        return alert(areaData.errordesc);

                    } else if (areaData.errorcode == "101") {
                        window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
                        return;
                    }

//                  var data = areaData.data;
//                  if (data != null || data.length > 0) {
//                      for (var i = 0; i < data.length; i++) {
//                          var area='<p onclick="areaSelected(this)"><span arId="'+data[i].id+'" >' + data[i].name + '</span><b></b></p>';
//                          if (user.areaId == data[i].id) {
//                              area = '<p onclick="areaSelected(this)"><span arId="'+data[i].id+'" class="light">' + data[i].name + '</span><b class="light"></b></p>';
//                          }
//                          $(".List").append(area);
//                      }
                    var list = areaData.data;
                    if (list != null || list.length > 0) {
						for(var i=0;i<list.length;i++){
				var sss ="";
if(user.areaId == list[i].id)
{
	sss = "light";
}
//+list[i].id
						 $(".List").append("<p onclick='areaSelected(this)'><span arId="+list[i].id+" class='"+sss +"'>"+list[i].name+"</span><b class='"+sss +"'></b></p>")   
						}


                    }
                    CellList()
                }
            })
        }
        
    });

	

    $("footer a").eq("3").find("span").addClass("light")
    $("footer a").eq("3").find("b").addClass("light")
    $("body").css({ "padding-bottom": Q(140) })
    $(".Mine_info div").css({ "height": Q(111), "padding-left": Q(20), "padding-right": Q(20) })
    $(".Mine_info div span").css({ "line-height": Q(111), "font-size": Q(32), })
    $(".Mine_info div a").css({ "line-height": Q(111), "font-size": Q(32)})
    $(".Mine_info div input").css({"height":Q(110),"font-size": Q(32),"width":Q(230) })
    $(".Mine_info div i").css({ "height": Q(33), "width": Q(18), "margin-top": Q(41), })

    $(".Mine_info div.headimg").css({ "height": Q(130) })
    $(".Mine_info div.headimg span").css({ "line-height": Q(130) })
    $(".Mine_info div img").css({ "height": Q(80), "width": Q(80), "margin-top": Q(25), })
    CellList()
    

    $(".getInto").on("click", function () {
        $(".CellList").css({ "display": "block" })
        //		$('html,body').addClass('ovfHiden');
    })
    $(".CellList .tit img").on("click", function () {
        $(".CellList").css({ "display": "none" })
        //		$('html,body').addClass('ovfHiden');
    })
    //手机号验证
		$("#mobile").blur(function(){
			var reg = /^\d{8}-\d{1,9}$|^\d{11}-\d{1,9}$|^\d{8}$|^\d{11}$/;
			var tel = $("#mobile").val();
				if(tel.trim() != ''){
					if(reg.test(tel)){
						$.ajax({
							type:"post",
							url:"/MyHome/setMobile/",
							dataType:"json",
							data:{mobile :tel},
							success:function(phoneData){
								if (phoneData.errorcode != "951" && phoneData.data != "") {
					                alert("手机号码更新成功");
					            } else{
					            	agin();
					              	alert("请正确填写手机号");
//					              	$("#mobile").val(teliphone);
				           		}
								
							}
						});
					}else{
						agin();
						alert("手机格式不正确");
//						$("#mobile").val(teliphone);
					}
				}else{
					agin();
						alert("手机格式不正确");
//						$("#mobile").val(teliphone);
				}
		});
})


function mobilevlav(){
	$("#mobile").val("")
}

function areaSelected(obj){
	var arId=$(obj).find("span").attr("arId");
	console.log(arId);
   $(obj).siblings().find("span").removeClass("light");
   $(obj).siblings().find("b").removeClass("light");
   $(obj).find("span").addClass("light");
   $(obj).find("b").addClass("light");
   setAreaAjax(arId);
}
function Q(obj) {
    var width = $(window).width()
    if (width > 720) {
        width = 720;
    }
    var num = (parseInt(obj) / 720).toFixed(20) * width;
    return num + "px";
}

function CellList() {
    $(".CellList").css({ "width": Q(720), "height": $(window).height() })
    $(".CellList_warp").css({ "width": Q(720), "height": Q(779) })
    $(".CellList .tit").css({ "padding-top": Q(27), "padding-right": Q(21), "padding-left": Q(20), "padding-bottom": Q(32) })

    $(".CellList .tit h3").css({ "font-size": Q(35), "padding-top": Q(0) })
    $(".CellList .tit img").css({ "width": Q(46), "height": Q(46) })

    $(".CellList .List").css({ "height": Q(654) })

    $(".CellList .List p").css({ "height": Q(112), "padding-right": Q(21), "padding-left": Q(20), })

    $(".CellList .List p span").css({ "height": Q(112), "line-height": Q(112), "font-size": Q(32) })
    $(".CellList .List p b").css({ "width": Q(36), "height": Q(36), "margin-top": Q(40) })
}
function setAreaAjax(arId){
	$.ajax({
		type:"POST",
		url:"/Area/setArea/",
		data:{areaId :arId}	,
		dataType:"json",
	})
}
function agin(){
	 $.ajax({
        type: "POST",
        url: "/MyHome/index/",
        dataType: "json",
        success: function (resData) {
            if (resData.errorcode != "0" && resData.errorcode != "101") {
                return alert(resData.errordesc);

            } else if (resData.errorcode == "101") {
                window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
                return;
            }
            var user = resData.data;
            if(user.mobile!=$("#mobile").val()){
            	 $("#mobile").val(user.mobile);
            }else{
            	 $("#mobile").val();
            }
           
        }
        
    });
}
