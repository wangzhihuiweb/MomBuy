/**
 * Created by Administrator on 2016/5/19.
 */
$(function(){
  Order()
  	 $("footer a").eq("3").find("span").addClass("light")
	 $("footer a").eq("3").find("b").addClass("light")
});
function Q(obj){
    var width = $(window).width();
    if(width>720){
        width=720;
    }
    var num=(parseInt(obj)/720).toFixed(20) * width;
    return num+"px";
}
function css(){
	 $("#main>.banner").css({"margin-bottom":Q(38),"padding-top":Q(30),"padding-bottom":Q(30),"padding-left":Q(20),"padding-right":Q(20)});
    $("#main>.banner>img").css({"width":Q(90),"height":Q(90)});
    $("#main>.banner>h1").css({"width":Q(548),"font-size":Q(32),"margin-left":Q(20),"line-height":Q(46)});
    $("#main>ul").css({"padding-left":Q(20),"padding-right":Q(20)});
    $("#main>ul>li").css({"font-size":Q(32),"height":Q(71)});
    $(".biaoti").css({"padding-left":Q(20),"font-size":Q(32),"line-height":Q(80),"padding-right":Q(20),});
    
    $(".biaoti i").css({"font-size":Q(32)});
    
    $(".biaoti i u").css({
		"width":Q(13),
		"height":Q(18),
		"margin-left":Q(10),
		"top":Q(-3)
	})

    $(".add").css({"padding-top":Q(28),"padding-bottom":Q(28),"padding-left":Q(20),"padding-right":Q(20)});
    $(".add>h1").css({"font-size":Q(28),"margin-bottom":Q(14)});
    $(".add span,#add b").css({"font-size":Q(34),"line-height":Q(48)});
    $(".add>div>b").css({"margin-right":Q(20),"font-size":Q(32)});
    $(".list").css({"padding-left":Q(20),"padding-right":Q(20)});
    $(".list>ul>li>.user").css({"margin-top":Q(20),"margin-bottom":Q(15),"line-height":Q(56)});
    $(".list>ul>li>.user>img").css({"width":Q(55),"height":Q(56),"margin-right":Q(22)});
    $(".list>ul>li>.user>h3").css({"font-size":Q(32)});
    $(".list>ul>li>.user>h4").css({"font-size":Q(30)});
    $(".list>ul>li>.count").css({"font-size":Q(28),"margin-bottom":Q(35)});
	$(".list>ul>li>.count>a").css({"width":Q(151),"height":Q(58),"line-height":Q(62),"margin-top":Q(-15)});
    $(".list>.all>div").css({"font-size":Q(32),"margin-top":Q(26),"margin-bottom":Q(36)});
    $(".list>.all>img").css({"width":Q(160),"height":Q(68),"margin-bottom":Q(36)});
	$(".finoal").css({"margin-bottom":Q(30)});
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
	$("footer a b").css({ "margin-top": width * 0.0655 + "px" })

	$("#tjcg>a>img").css({ "height": Q(68), "margin-top": Q(30) });
	$("#tjcg").css({ "height": Q(120) });
}


function checkcode(productInfo)
{
    if(productInfo.code == undefined)
    {
        return "";
    }
    else{
        return "<li><span>取货码</span><b>" + productInfo.code + "</b></li>";
    }
    
}

var id = "";
id = getParamValue("pId");
function Order(){
	$.ajax({
		type:"post",
		data:{pId:id},
		url:"/Order/tuanOrderList/",
		async:true,
		 dataType: "json",
		success: function (resData) {
			var data=resData.data;
			var mainS = "<div id='main'><div class='banner'><img src='" + data.productInfo.icon + "' alt=''/><h1>" + data.productInfo.title + "</h1></div><ul><li><span>商品编号</span><b>" + Number(data.productInfo.id) +"</b></li><li><span>成团总数量</span><b>" + Number(data.productInfo.num) + "</b></li><li><span>成团总金额</span><b> <span>￥" + Number(data.productInfo.total).toFixed(0) + "</span></b></li><li><span>开团时间</span><b>" + data.productInfo.open_time + "</b></li><li><span>截团时间</span><b>" + data.productInfo.end_time + "</b></li>"+checkcode(data.productInfo)+"</ul></div>";

			var buttonstr = "";
			var buttons = "";
			if (data.productInfo.is_fahuo_remind == "1")
			{
			    buttons += '<a href="javascript:" name="' + data.productInfo.id + '" onclick="FaHuoTiXing(this)" style="float: right;"><img src="images/fahuoaddr.png" style="margin-right: 10px;"></a>';
			}
			if (data.productInfo.is_queren_remind == "1") {
			    //buttons += '<a href="javascript:" name="' + data.productInfo.id + '" onclick="QueRenShouHuo(this)" style="float: right;"><img style="margin-right: 10px;" src="images/okRemind.png"></a>';
			}
			if (buttons != "")
			{
			    buttonstr = '<div id="tjcg" style="background: #ffffff;width: 100%;border-top: 1px solid #ECEDED;">' + buttons + '</div>';
			}
			mainS += buttonstr;
			var str="";
			
			$.each(data.areaList, function (v, i) {
			    //var isdisplaynone = i.orderList.length > 0 ? "" : "style='display:none'";
                var isdisplaynone = '';
                if(i.username != ''){
                    var username = i.username + '&nbsp;&nbsp;';
                } else {
                    var username = '';
                }
			    str += "<div class='biaoti' data-ia='" + i.areaId + "'>" + i.areaName + "<i " + isdisplaynone + " onclick='MoreFun(" + i.areaId + ")'>结算<u></u></i></div><div " + isdisplaynone + " class='add'><h1>取货地址</h1><div><b>" + username + i.mobile + "</b><span>" + i.address + "</span></div></div><div class='list'><ul>" + orderListFun(i.orderList) + "</ul><div class='all'><div>总数量&nbsp;:&nbsp;<span>" + i.num + "</span>&nbsp;&nbsp;&nbsp;总金额&nbsp;:&nbsp;<span>" + Number(i.total).toFixed(0) + "</span><h4>" + lisTuanfun(i.isTuan) + "</h4></div></div>"+PickupFWzh(i.is_fahuo_remind,i.is_quhuo_remind,i.areaId)+"</div>";
			});
			

			$("body").prepend(mainS + str)
			css(); 
		}
	});
}

function PickupFWzh(isfahuo,isquhuo,areaid){
    if(isfahuo == "1"){
        return "<div style='height:"+Q(88)+";padding-bottom:"+Q(20)+"'><a href='javascript:' name='' onclick='FaHuoTiXing(this)' style='float: right;height:"+Q(68)+"'><img src='images/fahuoaddr.png' style='height:"+Q(68)+"'></a></div>";
    }else if(isquhuo=="1"){
        return "<div style='height:"+Q(88)+";padding-bottom:"+Q(20)+"'><a href='javascript:' name='' onclick='QuHuoTiXing(this,"+areaid+")' style='float: right;height:"+Q(68)+"'><img src='images/quRemind.png' style='height:"+Q(68)+"'></a></div>";
    //}else if(isquhuo == "2"){
    //    return "已发送取货提醒";
    }else{
        return "";
    }


}

function MoreFun(areaId){
    window.location.href = "/MomBuy/Mine/wode/MoreFun.html?pId=" + id + "&&areaId=" + areaId + "";
}

function QueRenShouHuo(obj) {
    var pid = $(obj).attr("name");
    $.ajax({
        type: "POST",
        url: "/Order/confirmRemind/",
        async: true,
        dataType: "json",
        data: { pId: pid },
        success: function (sysdata) {
            if (sysdata.errorcode != "0") {
                alert(sysdata.errordesc);
            }
            else {
                alert(sysdata.data.msg);
            }

        }
    })
}



function orderListFun(orderList){
	var str2="";
	if(orderList.length > 0){
		$.each(orderList, function(v,i) {
		    str2 += "<li><div class='user'><input type='hidden' value='" + i.id + "' /><img src='" + i.headimgurl + "' alt=''/><h3>" + wxName(i.nickname) + "</h3><h4>" + i.statusStr + "</h4></div><div class='count'>数量：<span>" + Number(i.num) + "</span>&nbsp;&nbsp;金额：<span>" + Number(i.total).toFixed(0) + "</span>" + GetQuHuoCode(i.code) + "" + Distributionfun(i.shipping_status, i.pay_status, i.tuan_status) + "</div></li>";
		});
	}else{
	    //str2+="暂无数据";
	    str2 += "";
	}
	
	return str2;
}

function GetQuHuoCode(code)
{
    if (code != "" && code != undefined) {
        return "&nbsp;&nbsp;取货码：<span>" + code + "</span>";
    }
    else {
        return "";
    }
    
}

function QuHuoTiXing(obj,areaid) {
    $.ajax({
        type: "POST",
        url: "/Order/pickUpRemind/",
        async: true,
        dataType: "json",
        data: { pId: id,areaId:areaid},
        success: function (sysdata) {
            if (sysdata.errorcode != "0") {
                alert(sysdata.errordesc);
            }
            else {
                alert(sysdata.data.msg);
                window.location.reload()
            }
        }
    })
}


function FaHuoTiXing(obj) {
    //var pid = $(obj).attr("name");
    $.ajax({
        type: "POST",
        url: "/Order/fahuoRemind/",
        async: true,
        dataType: "json",
        data: { pId: id},
        success: function (sysdata) {
            if (sysdata.errorcode != "0") {
                alert(sysdata.errordesc);
            }
            else {
                alert(sysdata.data.msg);
                window.location.reload()
            }
        }
    })
}

function lisTuanfun(isTuan){
	if(isTuan == 0 || isTuan == null){
		return "未成团";
	}else if(isTuan == 1){
		return "已成团";
	}else{
		return isTuan;
	}
}

//发货提醒
function Distributionfun(shipping_status, pay_status, tuan_status) {
    return "";
	if(shipping_status == 0 && pay_status == 2 && tuan_status ==1){
		return "<a onclick='Remind(this)' href='javascript:'>发货提醒</a>";
	}else{
		return "";
	}
	
}
function Remind(obj){
		var yhid=$(obj).parent().parent().find("input").val()
	$.ajax({
		type:"post",
		url:"/Order/setOrderStatus/",
		async:false,
		data:{id:yhid,status:1},
		dataType:"json",//json
		success: function (resData) {
			console.log(resData)
			if(resData.data.code == 1){
//				alert("发货提醒成功")
				$(obj).parent().parent().find("h4").html("已发货,等待买家确认收货");
				$(obj).css("display","none")
			}else{
				$(obj).html(resData.errordesc).attr("onclick"," ").css({"color":"#FF718D","background":"#FFF"})
			}
	 	}
		
	});
}
//微信用户昵称太长，拼接...
function wxName(str){
	if(str.length>=7){
		var substr=str.slice(0,8).concat('...');
		return substr;
	}else{
		return str;
	}
}