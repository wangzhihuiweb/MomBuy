$(function() {
	addressList()
	Sitecss()
		//省
		// Province() 
	
	
	$(".NewAdd").click(function(){
		achieve()
		$(".xinbaocunAddCS").css("display","block")
		$(".baocunAddCS").css("display","none")
	})
})




function Sitecss() {
	$("body").css({
		"padding-bottom": Q(110)
	})
	$(".site .div").css({
		"padding-left": Q(20),
		"padding-top": Q(38),
		"padding-right": Q(20)
	})
	$(".site .div .name h3").css({
		"font-size": Q(36),
		"line-height": Q(40),
		"height": Q(40),
	})
	$(".site .div .name span").css({
		"margin-left": Q(22),
		"font-size": Q(32),
		"margin-top": Q(3.8)
	})
	$(".site .div .address").css({
		"padding-top": Q(2.5),
		"line-height": Q(40),
		"font-size": Q(28),
		"padding-bottom": Q(34),
		"width": Q(602)
	})
	$(".site .div i").css({
		"height": Q(33),
		"width": Q(18),
		"right": Q(20),
		"top": Q(90)
	})
	$(".site .weixdz").css({
		"height": Q(121),
		"padding-left": Q(20),
		"padding-top": Q(0),
		"padding-right": Q(0)
	})
	$(".site .weixdz a").css({
		"line-height": Q(121),
		"font-size": Q(32)
	})
	$(".site .weixdz i").css({
		"top": Q(44)
	})
	$(".NewAdd").css({
		"height": Q(92),
		"line-height": Q(92),
		"font-size": Q(36)
	})
	$(".Addsite a").css({
		"height": Q(92),
		"line-height": Q(92),
		"font-size": Q(36)
	})
	$(".Addsite div").css({
		"padding-left": Q(20),
		"height": Q(110),
		"padding-right": Q(20)
	})
	$(".Addsite div span").css({
		"font-size": Q(32),
		"width": Q(170),
		"line-height": Q(110)
	})
	$(".Addsite div i").css({
		"height": Q(33),
		"width": Q(18),
		"right": Q(20),
		"margin-top": Q(40)
	})
	
	$(".Addsite div.setdefault u").css({
		"width": Q(36), "height": Q(36), "margin-top": Q(38), "margin-right": Q(12)
	})
	$(".Addsite div b").css({
		"font-size": Q(32),
		"padding-right": Q(15),
		"line-height": Q(110)
	})

	$(".Addsite div input").css({
			"height": Q(108),
			"font-size": Q(32)
		})
		//	$(".selAdd").css({"height":Q(100)})
	$(".selAdd .Tit").css({
		"height": Q(100),
		"width": Q(720),
		"padding-left": Q(36),
		"padding-right": Q(7)
	})
	$(".selAdd .Tit img").css({
		"height": Q(46),
		"width": Q(46),
		"margin-top": Q(27)
	})
	$(".selAdd .Tit h3").css({
		"font-size": Q(36),
		"height": Q(100),
		"line-height": Q(100)
	})
	$(".Adname").css({
		"height": $(window).height(),
		"padding-bottom": Q(0),
		"padding-top": Q(100)
	})
	$(".Adname p").css({
		"padding-left": Q(20),
		"height": Q(112),
		"line-height": Q(112),
		"font-size": Q(32)
	})
	$("footer a").eq("3").find("span").addClass("light")
	$("footer a").eq("3").find("b").addClass("light")
	$(".NewAdd").click(function() {
		$(".site").hide("1500", function() {
			$(".Addsite").show("1500");
		})
		document.getElementById("titleID").innerHTML = "添加地址";
	})
//	$(".site div").click(function() {
//		
//	})
}

function OldAddress(obj,i){
	$(".site").hide("1500", function() {
			$(".Addsite").show("1500");
		})
		Addids=$(obj).find("input:eq(0)").val()
//		alert($(obj).find("input:eq(1)").val())
		$("#sheng u").html($(obj).find("input:eq(1)").val())
		$("#shi u").html($(obj).find("input:eq(2)").val())
		$("#qu u").html($(obj).find("input:eq(3)").val())
		$("#shouhuren").val($(obj).find("h3").text());
		$("#shojihao").val($(obj).find("span").text())
		$("#xiangxidizhi").val($(obj).find(".address u").text())
		document.getElementById("titleID").innerHTML = "添加地址";
//		alert(i)
		
		if(i==0){
			$(".setdefault").find("u").removeClass("light")
			isDefault=0;
		}else{
			$(".setdefault").find("u").addClass("light")
			isDefault=1;
		}
		
}


//选择省，市 ，区，
function SelAdd() {
	$(".Addsite").hide("1500", function() {
		$(".selAdd").show("1500");
	});
	document.getElementById("titleID").innerHTML = "添加地址";
}
//关闭选择省，市 ，区，，市 ，区，
function CloseselAdd() {
	$(".selAdd").hide("1500", function() {
		$(".Addsite").show("1500");
	});
}
//选择默认地址
var isDefault=0;
function setdefaultfun(obj){
	if($( obj ).find("u").hasClass("light")){
		$(obj).find("u").removeClass("light")
		isDefault=0;
	}else{
		isDefault=1;
		$(obj).find("u").addClass("light")
	}
}





//新添加地址
function xinbaocunAdd() {
	var name = $("#shouhuren").val(),
		mobile = $("#shojihao").val(),
		province = $("#sheng").text(),
		city = $("#shi").text(),
		area = $("#qu").text(),
		address = $("#xiangxidizhi").val();
		 if (!CellPhone.test(mobile)) {
		 	alert("手机号格式不正确")
		 	return;
		 }
//	alert(isDefault)
//	return;
	$.ajax({
		type: "post",
		url: "/MyHome/addAddress/",
		async: true,
		data: {
			name: name,
			mobile: mobile,
			province: province,
			city: city,
			area: area,
			address: address,
			isDefault:isDefault 
		},
		dataType: "json",
		success: function(resData) {
			if (resData.errorcode != "0" && resData.errorcode != "101") {
				return alert(resData.errordesc);
			} else if (resData.errorcode == "101") {
				window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
				return;
			}
			var data = resData.data;
			if (data.status == 1) {
				$(".Addsite").hide("1500", function() {
					$(".site").show("1500");
					window.location.href = window.location.href;
				});
				document.getElementById("titleID").innerHTML = "妈妈团—我的收货地址";
			}
		},
		error: function(e) {
			alert("失败")
		}
	});

}

var Addids='';

//修改地址
function baocunAdd(){
	var name = $("#shouhuren").val(),
		mobile = $("#shojihao").val(),
		province = $("#sheng").text(),
		city = $("#shi").text(),
		area = $("#qu").text(),
		address = $("#xiangxidizhi").val();
		
		 if (!CellPhone.test(mobile)) {
		 	alert("手机号格式不正确")
		 	return;
		 }
//	alert(isDefault)
	$.ajax({
		type: "post",
		url: "/MyHome/addAddress/",
		async: true,
		data: {
			id :Addids,
			name: name,
			mobile: mobile,
			province: province,
			city: city,
			area: area,
			address: address,
			isDefault:isDefault
		},
		dataType: "json",
		success: function(resData) {
			if (resData.errorcode != "0" && resData.errorcode != "101") {
				return alert(resData.errordesc);
			} else if (resData.errorcode == "101") {
				window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
				return;
			}
			var data = resData.data;
			if (data.status == 1) {
				$(".Addsite").hide("1500", function() {
					$(".site").show("1500");
					window.location.href = window.location.href;
				});
				document.getElementById("titleID").innerHTML = "妈妈团—我的收货地址";
			}
		},
		error: function(e) {
			alert(e)
		}
	});

}












function Q(obj) {
	var width = $(window).width()
	if (width > 720) {
		width = 720;
	}
	var num = (parseFloat(obj) / 720).toFixed(20) * width;
	return num + "px";
}

function addressList() {
	//获取收获地址
	$.ajax({
		type: "get",
		url: "/MyHome/addressList/",
		async: true,
		data: {
			id: 0
		},
		dataType: "json",
		success: function(resData) {
			console.log(resData.data)
			var data = resData.data;
			if (data != null || data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					var O = data[i];
					var str =
						'<div class="div" onclick="OldAddress(this,'+O.isDefault+')">' +
						'<input id="Addid" type="hidden" value=' + O.id + ' />' +
						'<input id="province" type="hidden" value=' + O.province + ' />' +
						'<input id="city" type="hidden" value=' + O.city + ' />' +
						'<input id="area" type="hidden" value=' + O.area + ' />' +
						'<div class="name"><h3>' + O.name + '</h3><span>' + O.mobile + '</span></div>' +
						'<div class="address">' + defaultA(O.isDefault) + O.province + O.city + O.area + "<u>" + O.address + '</u></div>' +
						'<i></i>' +
						'</div>';
					$(".site").append(str);
					Sitecss()
				}
			} else {
				//console.log(data)
				alert(data)
				alert(000)
			}

		},
		error: function(e) {
			alert("失败")
		}
	});

}

function defaultA(i) {
	if (i == "1") {
		return "<font>[默认]</font>";
	} else {
		return " ";
	}
}

function achieve() {
	$.ajax({
		type: "get",
		url: "json/address.json",
		data: null,
		dataType: "json",
		async: false,
		success: function(json) {
			//        	console.log(json)
			//        	var json = (new Function("", "return " + data))();
			var str = [];
			$.each(json, function(key, val) {
				if (val.MenuClass == "0") {
					str.push("<u>"+val.AreaName + "</u>");
					$("#sheng").html(str[0])	
					return;
				}
				//$("#sheng").html(str[0])			
			})
			var str2=[]
			$.each(json, function(key, val) {
				if (val.Area1 == $("#sheng").find("u").text() && val.MenuClass == "1") {
					str2.push("<u>"+val.AreaName + "</u>");
					$("#shi").html(str2[0])		
					return;
				}
					
			})
			var str3=[]
			$.each(json, function(key, val) {
				if (val.Area1 == $("#sheng").find("u").text() && val.Area2 == $("#shi").find("u").text()&& val.MenuClass == "2") {
					str3.push("<u>"+val.AreaName + "</u>");
					$("#qu").html(str3[0])		
					return;
				}
					
			})
		}
	});
}
//function ValUpID(obg){
//	$.each(obg, function(key, val) {
//				alert(00)
//				if (key2 == "0") {
//					$("#sheng").html(val2.AreaName + "<input type='hidden' value='" + val2.Id + "' />")
//				}
//	})
//}

//<font>[默认]</font>
//省
function Province(num) {
//	$("#qu").html(" ")
	SelAdd()
var shengname=$("#sheng u").text();
var shiname=$("#shi u").text();
//alert(shengID)
    $.ajax({
        type:"get",
        url: "json/address.json",
        data:null,
        dataType: "json",
        async: false,
        success: function (json) {
//        	console.log(json)
//        	var json = (new Function("", "return " + data))();
			var str = "";
			
			if(num == 1){
				 $.each(json, function (key, val) {  
            		if(val.MenuClass == "0"){
            		str += "<p onclick='City(this," + val.Id + ")' title='" + val.AreaName + "'>" + val.AreaName + "<input type='hidden' value='" + val.Id + "' /></p>";
            		}
            	 })
				 $("#provinceQ").html(str).siblings().find("h3").html("省")
				 
				 
			}else if(num == 2){
				 $.each(json, function (key, val) {  
            		if(val.Area1== shengname && val.MenuClass == "1"){
            		str += "<p onclick='City(this," + val.Id + ")' title='" + val.AreaName + "'>" + val.AreaName + "<input type='hidden' value='" + val.Id + "' /></p>";
            		}
            	 })
				 $("#provinceQ").html(str).siblings().find("h3").html("市")
			}else if(num == 3){
				 $.each(json, function (key, val) {  
            		if(val.Area1== shengname && val.Area2== shiname && val.MenuClass == "2"){
            		str += "<p onclick='City(this," + val.Id + ")' title='" + val.AreaName + "'>" + val.AreaName + "<input type='hidden' value='" + val.Id + "' /></p>";
            		}
            	 })
				 $("#provinceQ").html(str).siblings().find("h3").html("区")
			}else if(num == 5){//选完省刷新下面数据
				
				
				
				 $.each(json, function (key, val) {  
            		if(val.Area1== shengname && val.MenuClass == "1"){
            			shiname = val.Area2;
        				$("#shi").html("<u>"+val.AreaName + "</u><input type='hidden' value='" + val.Id + "' />")
        				return;
            		}
            		else if(val.Area1== shengname && val.Area2== shiname && val.MenuClass == "2")
            			{
            				$("#qu").html("<u>"+val.AreaName + "</u><input type='hidden' value='" + val.Id + "' />")
            				return;
            			}
            	})
				 //$("#provinceQ").html(str).siblings().find("h3").html("市")
			}else if(num == 6){//选完省刷新下面数据
				 $.each(json, function (key, val) {  
            		if(val.Area1== shengname && val.Area2== shiname && val.MenuClass == "2")
            			{
            				$("#qu").html("<u>"+val.AreaName + "</u><input type='hidden' value='" + val.Id + "' />")
            				return;
            			}
            	})
				 //$("#provinceQ").html(str).siblings().find("h3").html("市")
			}

            Sitecss()
//          $("#province").find("p:eq(0)").trigger("click")
        }
    })
}
//市
function City(obj) {
	if($(obj).parent().parent().find(".Tit h3").text() == "省"){
		
//		alert($(obj).text())
//		alert($("#sheng u").text())
		var shengname=$("#sheng u").text();
		
		$("#sheng").html("<u>"+$(obj).text() + "</u><input type='hidden' value='" + $(obj).find("input").val() + "' />");
		
		
		if($(obj).text() == shengname ){
//			alert(000)
		}else{
			Province('5')
		}
		
		

	//$("#qu").html(" ")
	}else if($(obj).parent().parent().find(".Tit h3").text() == "市"){
		var shiname = $("#shi u").text();
		$("#shi").html("<u>"+$(obj).text() + "</u><input type='hidden' value='" + $(obj).find("input").val() + "' />")
		if($(obj).text() == shiname ){
//			alert(000)
		}else{
			Province('6')
		}
		
		//$("#qu").html("<u>"+$("#provinceQ").find("p:eq(0)").text() + "</u><input type='hidden' value='" + $("#provinceQ").find("p:eq(0) input").val() + "' />");
	}else if($(obj).parent().parent().find(".Tit h3").text() == "区"){
		$("#qu").html("<u>"+$(obj).text() + "</u><input type='hidden' value='" + $(obj).find("input").val() + "' />")
	}
	
	CloseselAdd()
}


//电话号码验证
var CellPhone = /^[1][3,5,8,7][0-9]{9}$/;
//function Mpnv() {
//  var CellPhone = /^[1][3,5,8,7][0-9]{9}$/;
//  var val = $("#shojihao").val();
//  if (val == "") {
//      alert("请输入收货人的联系电话");
//      return false;
//  }
//  if (CellPhone.test(val)) {
////      $("#wzhMobileNum").removeClass("light").next().hide();
//      return true;
//  } else {
//      alert("手机号格式不正确");
//      return false;
//  }
//
//
//}