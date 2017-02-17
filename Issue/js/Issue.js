var timestamp;
var appId;
var noneceStr;
var signature;
var type;
function getWXInfo() {
    $.ajax({
        type: "get",
        url: "/WxApi/getSignPackage/",
        dataType: "json",
        async: false,
        success: function (resData) {
            if (resData.errorcode != "0" && resData.errorcode != "101") {
                return alert(resData.errordesc);

            } else if (resData.errorcode == "101") {
                window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
                return;
            }
            var data = resData.data;
            timestamp = data.timestamp;
            noneceStr = data.nonceStr;
            appId = data.appId;
            signature = data.signature;
        }
    })
}

var tuangou = {
    isopen: 0,
    type: 1,
    iogisticstype: 2
}

var id = getParamValue("pId");
var width=$(window).width();
var height=$(window).height();
$(function () {
	$(".model").width(width);
	$(".model").height(height);
    cssDy()
    //3个问号弹窗提示
    $(".Mtop span a").click(function(){
    	alert("根据您所发布的商品是否希望重复团购或只能一次性团购进行选择")
    })
    $(".Freq span a").click(function(){
    	alert("团主家自提为买家到您家提货，代收点为 社区代收点为团主提供收货、分货的服务，您只需要把商品上传并跟团，剩余的事情都可以交给代收点管理，大大减轻您的工作量哦！代收点费用为每单1元，由买家付款。比如：本次团购10人跟团，则代收点收取每人1元，共10元，与团购数量无关）")
    })
    $(".OtherCell span a").click(function(){
    	alert("其他小区购买时需其社区代收点取货、分货。请给代收点留下商品运输的有效联系方式，以便代收点可以正常的为您服务哦！")
    })
    //手写日期时间模块
    $("#startDate").click(function(){
    	$(".model").css("display","block");
    	var YY;
    	var MM;
    	var DD;
    	var TT;
    	if($(this).val()!=""){
    		var time=$(this).val().split(" ");
    		var nyr=time[0].split("-");
    		
    		 YY=nyr[0];//年
             MM=nyr[1];//月
             DD=nyr[2];//日
             TT=time[1];//时
    	}else{
	    	time=new Date();
	    	YY=time.getFullYear()
	    	MM=time.getMonth()+1;
	    	DD=time.getDate();
	    	TT=time.getHours();
    	}
    
    	$(".YY p").html(YY);
    	$(".MM p").html(coltime(MM));
    	$(".DD p").html(coltime(DD));
    	$(".TT p").html(coltime(TT));
    	type="start";
    	//console.log('fasdfsad')
    })
    $("#endDate").click(function(){
    	$(".model").css("display","block");
    	var YY;
    	var MM;
    	var DD;
    	var TT;
    	if($(this).val()!=""){
    		var time=$(this).val().split(" ");
    		var nyr=time[0].split("-");
    		
    		 YY=nyr[0];//年
             MM=nyr[1];//月
             DD=nyr[2];//日
             TT=time[1];//时
    	}else{
	    	var time=new Date();
	    	YY=time.getFullYear()
	    	MM=time.getMonth()+1;
	    	DD=time.getDate();
	    	TT=time.getHours();
    	}
    	$(".YY p").html(YY);
    	$(".MM p").text(coltime(MM));
    	$(".DD p").html(coltime(DD));
    	$(".TT p").html(coltime(TT));
    	type="end";
    })
    //设置日日期，考虑闰年以及大小月
    	//设置年
	    $(".YY .add").click(function(){
	    	var num=parseInt($(".YY p").html());
	    	num++;
	    	$(".YY p").html(num);
	    	if(!iSdateTime())
	    	{
	    		$(".DD .add").click();
	    	}
	    })
	    $(".YY .jian").click(function(){
	    	var num=parseInt($(".YY p").html());
	    	num--;
	    	$(".YY p").html(num);
	    	if(!iSdateTime())
	    	{
	    		$(".DD .add").click();
	    	}
	    })
	    //设置月
	    $(".MM .add").click(function(){
	    	var num=parseInt($(".MM p").html());
	    	num++;
	    	if(num>12){
	    		num=1;
	    	}
	    	$(".MM p").html(coltime(num));
	    	if(!iSdateTime())
	    	{
	    		$(".DD .add").click();
	    	}
	    })
	    $(".MM .jian").click(function(){
	    	var num=parseInt($(".MM p").html());
	    	num--;
	    	if(num<1){
	    		num=12;
	    	}
	    	$(".MM p").html(coltime(num));
	    	if(!iSdateTime())
	    	{
	    		$(".DD .add").click();
	    	}
	    })
	    //设置日
	    $(".DD .add").click(function(){
            var YY=parseInt($(".YY p").html());//年
            var MM=parseInt($(".MM p").html());//月
            var num=parseInt($(".DD p").html());//日
            num++;
            var runMM=[1,3,5,7,8,10,12];
            var str = runMM.toString();
            if(str.indexOf(MM) ==-1){
                if(num>30){
                    num=1;
                }
            }else if(MM==2){
                if(((YY%4 == 0) && (YY%100 != 0)) || (YY%400 == 0)){
                    if(num>29){
                        num=1;
                    }
                }else{
                    if(num>28){
                        num=1;
                    }
                }
            }else{
                if(num>31){
                    num=1;
                }
            }
            $(".DD p").html(coltime(num));
        })
	    $(".DD .jian").click(function(){
	    	var YY=parseInt($(".YY p").html());//年
            var MM=parseInt($(".MM p").html());//月
            var num=parseInt($(".DD p").html());//日
	    	num--;
	    	if(num<1){
	            var runMM=[1,3,5,7,8,10,12];
	            var str = runMM.toString();
	            if(str.indexOf(MM) ==-1){
	                num=30;
	      
	            }else if(MM==2){
	                if(((YY%4 == 0) && (YY%100 != 0)) || (YY%400 == 0)){
	                   num=29;
	                }else{
	                    num=28;
	                }
	            }else{
	                num=31;
	            }
	            
	    	}
	    	$(".DD p").html(coltime(num));
	    })
	    //设置小时
	    $(".TT .add").click(function(){
	    	var num=parseInt($(".TT p").html());
	    	num++;
	    	if(num>24){
	    		num=0;
	    	}
	    	$(".TT p").html(coltime(num));
	    })
	    $(".TT .jian").click(function(){
	    	var num=parseInt($(".TT p").html());
	    	num--;
	    	if(num<0){
	    		num=23;
	    	}
	    	$(".TT p").html(coltime(num));
	    })
    //取消日期
    $("#quxiaBtn").click(function(){
    	$(".model").css("display","none");
    })
    //确定设置日期时间
    $("#setDate").click(function(){
    	setTime();
    	
    })
    //日期模块的样式   
	$("#startDate").css({
		"padding-right":Q(20)
	})
	$("#endDate").css({
		"padding-right":Q(20)
	})
    $(".model-date").css({
    	"width":Q(640),
    	"height":Q(740),
    	"margin-top":Q(120)
    })
    $(".model-date h1").css({
    	"line-height":Q(60),
    	"font-size":Q(32)
    })
    $(".model-date .date ul").css({
    	"width":Q(500),
    	"height":Q(246),
    })
    $(".time").css({
    	"width":Q(150),
    	"height":Q(245),
    })
    $(".model-date .date ul li.year").css({
    	"width":Q(150),
    	"height":Q(245)
    })
    $(".model-date .date ul li.mid").css({
    	"margin-left":Q(25),
    	"margin-right":Q(25)
    })
    $(".model-date .date ul li p").css({
    	"height":Q(90),
		"line-height":Q(90)
    })
    $(".model-date .date ul li.year a").css({
    	"width": Q(150),
    	"height":Q(75),
    	"line-height":Q(75),
    	"font-size":Q(50)
    })
    $(".time a").css({
    	"width": Q(150),
    	"height":Q(75),
    	"line-height":Q(75),
    	"font-size":Q(50)
    })
    $(".time p").css({
    	"height":Q(90),
		"line-height":Q(90)
    })
    $(".btnbtn").css({
    	"margin-top":Q(20),
    	"height":Q(110),
    	"padding-left":Q(14)
    })
    $(".btnbtn a").css({
    	"width":Q(290),
    	"height":Q(82),
		"line-height":Q(82),
		"margin-top":Q(12),
		"margin-right":Q(14)
    })
    
    $(".Pudiv span a").css({
    	
    })
    $(".Pudiv span a img").css({
    	"width":Q(35),
    	"height":Q(35)
    })
    $(".title").css({
        "height": Q(110),
        "width": Q(720)
    });
    $(".title input").css({
        "padding-left": Q(20),
        "padding-right": Q(20),
        "font-size": Q(32)
    })
    $(".Fresh").css({
        "height": Q(266)
    })
    $(".Fresh textarea").css({
        "height": Q(266),
        "line-height": Q(48),
        "padding-top": Q(25.8),
        "padding-left": Q(20),
        "padding-right": Q(20),
        "font-size": Q(32)
    })
    $(".Picture").css({
        "padding-left": Q(20),
        "padding-right": Q(20),
        "padding-top": Q(8),
        "margin-bottom": Q(20)
    })
    $(".Picture .tit").css({
        "height": Q(92),
        "line-height": Q(92)
    })
    $(".Picture h3").css({
        "font-size": Q(32)
    })
    $(".Picture p").css({
        "font-size": Q(24),
        "padding-left": Q(11)
    })
    $(".Pudiv").css({
        "padding-left": Q(20),
        "padding-right": Q(20),
        "height": Q(110)
    })

    $(".Pudiv s").css({
        "height": Q(33),
        "width": Q(18),
        "top": Q(38),
        "right": Q(20)
    })
	$(".Pudiv div").css({
        "height": Q(108),
        "font-size": Q(32),
        "line-height": Q(108),
    })
	$(".Pudiv>input").css({
        "height": Q(108),
        "font-size": Q(32),
        "width": Q(400),
        "padding-right":Q(20)
    })
    $(".Pudiv div input").css({
        "height": Q(54),
        "font-size": Q(32),
        "width": Q(60)
    })
    $(".Pudiv span").css({
        "height": Q(110),
        "line-height": Q(110),
        "font-size": Q(32)
    })
    $(".Mtop").css({
        "margin-top": Q(20)
    })
    $(".Freq").css({
        "height": "auto",
        "padding-bottom": Q(43)
    })
    $(".Pudiv p").css({
        "height": Q(110),
        "margin-left": Q(51)
    })
    $(".Pudiv p b").css({
        "height": Q(110),
        "line-height": Q(110),
        "font-size": Q(32)
    })
    $(".Pudiv p i").css({
        "height": Q(36),
        "width": Q(36),
        "margin-right": Q(12),
        "margin-top": Q(37)
    })
    $(".Freq input").css({
        "height": Q(86),
        "width": Q(676),
        "padding-left": Q(29)
    })
    $(".OtherCell p").css({
        "margin-left": Q(59)
    });
    $(".Protocol").css({
        "height": Q(111),
        "padding-left": Q(247)
    })
    $(".Protocol span").css({
        "height": Q(111),
        "line-height": Q(111),
        "font-size": Q(32)
    })
    $(".Protocol i").css({
        "height": Q(30),
        "width": Q(30),
        "margin-right": Q(15),
        "margin-top": Q(42)
    })
    $("body").css({
        "padding-bottom": Q(112)
    })
    $("footer").css({
        "height": Q(92),
        "width": Q(720)
    })
    $("footer a").css({
        "line-height": Q(92),
        "font-size": Q(35)
    })
    /*$(".Picture .PicList").css({"padding-left":Q(33),"padding-top":Q(10)})
    $(".Picture .PicList div").css({"height":Q(170),"width":Q(170),"margin-right":Q(52),"margin-bottom":Q(40)})
    $(".Picture .PicList div img").css({"height":Q(170),"width":Q(170)})
    $(".Picture .PicList div span").css({"height":Q(40),"line-height":Q(40),"font-size":Q(28)})
    $(".Picture .PicList div b").css({"height":Q(46),"width":Q(46),"top":Q(-10),"left":Q(-10)})*/
    DIvS($(".PicList div"), "3")

    //选择照片PoModule

    $(".PoModule").css({
        "width": Q(720),
        "height": $(window).height()
    })
    $(".PoModule .Affirm").css({
        "height": Q(100)
    })
    $(".PoModule .Affirm p").css({
        "line-height": Q(100),
        "margin-right": Q(41),
        "margin-left": Q(14),
        "font-size": Q(36)
    })
    $(".PoModule .Affirm a").css({
        "line-height": Q(100),
        "font-size": Q(36)
    })
    $(".PoModule .albumTit").css({
        "height": Q(96),
        "line-height": Q(96),
        "font-size": Q(48)
    })
    $(".PoModule .albumTit img").css({
        "height": Q(33),
        "width": Q(18),
        "font-size": Q(48),
        "left": Q(40),
        "top": Q(32)
    })
    $(".PoModule .albumTit a").css({
        "font-size": Q(32),
        "right": Q(40)
    })

    //	$(".PoModule .Photolist").css({"padding-top":Q(8)})
    $(".PoModule .Photolist div").css({
        "width": Q(170),
        "height": Q(170),
        "margin-left": Q(8),
        "margin-top": Q(8)
    })
    $(".PoModule .Photolist div b").css({
        "width": Q(36),
        "height": Q(36),
        "right": Q(10),
        "top": Q(10)
    })
    $(".PoModule .albumTit img").on("click", function () {
        $(".PoModule").css({
            "display": "none"
        })
        $('html,body').removeClass('ovfHiden');
    })

    ////协议模块PoModule
    $(".UdpModule").css({
        "width": Q(720),
        "height": $(window).height()
    })
    $(".UdpModule .AuditProtocol").css({
        "width": Q(720)
    })
    $(".UdpModule .AuditProtocol h3").css({
        "padding-top": Q(40),
        "padding-bottom": Q(20),
        "font-size": Q(34)
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
    cssDy();

    //日期模块
    $(".DateModule").css({
        "width": Q(720),
        "height": $(window).height()
    })
    $(".DateModule img").css({
        "width": Q(640),
        "height": Q(737),
        "margin-left": Q(40),
        "margin-right": Q(40),
    })

    $(".Mtop p").on("click", function () {
        $(this).find("i").addClass("light").parent().siblings().find("i").removeClass("light");
        if ($("#disposable").attr("class") == "light") {
            tuangou.type = 1;
        } else {
            tuangou.type = 2;
        }
    })

    $(".Freq p").on("click", function () {
        $(this).find("i").addClass("light").parent().siblings().find("i").removeClass("light");
        if ($(this).find("b").text() == "代收点") {
            $(".Freq").css({
                "padding-bottom": Q(0)
            })
        } else {
            $(".Freq").css({
                "padding-bottom": Q(43)
            })
        }
        if ($("#ziqu").attr("class") == "light") {
            $("#address").show();
            $("#tuanzhuname").show();
            $("#tuanzhumobile").show();
            tuangou.iogisticstype = 2;
        } else {
            $("#address").hide();
            $("#tuanzhuname").hide();
            $("#tuanzhuname").hide();
            tuangou.iogisticstype = 1;
        }

    })

    $(".OtherCell p").on("click", function () {
        $(this).find("i").addClass("light").parent().siblings().find("i").removeClass("light");
        if ($("#open").attr("class") == "light") {
            tuangou.isopen = 0;
        } else {
            tuangou.isopen = 1;
        }
    })

    $(".Protocol i").on("click", function () {
        $(this).toggleClass("light");
    })
	$(".UdpModule .handle a.agree").click(function(){
		$(".Protocol i").removeAttr("class");
	})
	$(".UdpModule .handle a.nono").click(function(){
		$(".Protocol i").attr("class","light");
	})
    getWXInfo();

    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: noneceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: [
				'chooseImage',
				'previewImage',
				'uploadImage',
				'downloadImage'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    if (id) {
        SetProInfo();
    }

})

function cssDy() {
    $(".Picture .PicList").css({
        "padding-left": Q(33),
        "padding-top": Q(10)
    })
    $(".Picture .PicList div").css({
        "height": Q(170),
        "width": Q(170),
        "margin-right": Q(52),
        "margin-bottom": Q(40)
    })
    $(".Picture .PicList div img").css({
        "height": Q(170),
        "width": Q(170)
    })
    $(".Picture .PicList div span").css({
        "height": Q(40),
        "line-height": Q(40),
        "font-size": Q(28)
    })
    $(".Picture .PicList div b").css({
        "height": Q(46),
        "width": Q(46),
        "top": Q(-10),
        "left": Q(-10)
    })

}



function Q(obj) {
    var width = $(window).width()
    if (width > 720) {
        width = 720;
    }
    var num = (parseInt(obj) / 720).toFixed(20) * width;
    return num + "px";
}

function DIvS(obj, num) {
    $(obj).each(function (index, element) {
        if (((index + 1) % num) == 0) {
            $(this).css("margin-right", "0");
        }
    });
}





var editActionImg = [];
function SetProInfo() {
    $.ajax({
        type: "post",
        url: "/Product/detail/",
        data: { id: id, type: 1 },
        dataType: "json",
        success: function (resData) {
            if (resData.errorcode != "0" && resData.errorcode != "101") {
                return alert(resData.errordesc);

            } else if (resData.errorcode == "101") {
                window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
                return;
            }
            var data = resData.data;

            tuangou.iogisticstype = data.logistics_type;
            tuangou.type = data.type;

            $("#title").val(data.title);
            $("#content").val(data.content);
            $(".PicList").empty();
            for (var i = 0; i < data.images.length; i++) {
                editActionImg.push(data.images[i]);
                //images.localId.push(data.images[i]);
                //imgCount++;
                var img = data.images[i];

                if (i <= 2) {
                    $(".PicList").append("<div><img src=" + data.images[i] + " alt='图片'><span>主图</span><b onclick='closeImg(&quot;" + img + "&quot;,this,1)'></b></div>");
                } else {
                    $(".PicList").append("<div><img src=" + data.images[i] + " alt='图片'><b onclick='closeImg(&quot;" + img + "&quot;,this,1)'></b></div>");
                }
            }
            $(".PicList").append("<div onClick='getProduct()' class='Add'></div>");

            cssDy()
            $("#money").val(data.price);
            $("#minNum").val(data.open_num);
            $("#maxNum").val(data.total_num);
            $("#startDate").val(data.open_time.split(":")[0]);
            $("#endDate").val(data.end_time.split(":")[0]);
            $("#Deliverytime").val(data.come_time);
            $("#address").val(data.address);
            $("#tuanzhuname").val(data.name);
            $("#tuanzhumobile").val(data.mobile);
            if (data.logistics_type == "1") {
                $("#daishou").addClass("light");
                $("#address").hide();
                $("#tuanzhuname").hide();
                //$("#tuanzhumobile").hide();
                $("#ziqu").removeClass("light");
            }
            if (data.isopen == "1") {
                $("#Notopen").addClass("light");
                $("#open").removeClass("light");
            }
            if (data.type == "2") {
                $("#repeat").addClass("light");
                $("#disposable").removeClass("light");
            }
             DIvS($(".PicList div"), "3")
        }
    })

}

function publish(status) {

    if ($("#isok").attr("class") == 'light') {
        return alert("请同意协议");
    }
    var title = $("#title").val();
    if (!title || title.trim(title) == '') {
        return alert("请输入标题");
    }
    var content = $("#content").val();
    if (!content || content.trim(content) == '') {
        return alert("请输入内容");
    }
    var money = $("#money").val();
    if (!money || money.trim(money) == '') {
        return alert("请输入单价");
    }
    var minNum = $("#minNum").val();
    if (!minNum || minNum.trim(minNum) == '') {
        return alert("请输入起团数");
    }
    var maxNum = $("#maxNum").val();
    if (!maxNum || maxNum.trim(maxNum) == '') {
        return alert("请输入团购上限");
    }
    if (Number(minNum) > Number(maxNum)) {
        return alert("团购上限必须大于起团数");
    }
    var startDate = $("#startDate").val();
    if (!startDate || startDate.trim(startDate) == '') {
        return alert("请输入开团时间");
    }
    var endDate = $("#endDate").val();
    if (!endDate || endDate.trim(endDate) == '') {
        return alert("请输入截团时间");
    }
//  if (startDate >= endDate) {
//      return alert("截团时间必须大于开团时间");
//  }
    var deliverytime = $("#Deliverytime").val();
    if (!deliverytime || deliverytime.trim(deliverytime) == '') {
        return alert("请输入预计送达时间");
    }

    var address = ""
    var tuanzhuname = ""
    var tuanzhumobile = ""

    if (tuangou.iogisticstype == 2) {
        address = $("#address").val();
        if (!address || $.trim(address) == '') {
            return alert("请输入自取地址");
        }

        tuanzhuname = $("#tuanzhuname").val();
        if (!tuanzhuname || $.trim(tuanzhuname) == '') {
            return alert("请输入团主姓名");
        }
    }
    tuanzhumobile = $("#tuanzhumobile").val();
    if (!tuanzhumobile || $.trim(tuanzhumobile) == '') {
        return alert("请输入团主联系电话");
    }
	
	var L=startDate.split(" ")[0];
	var L2=endDate.split(" ")[0];
	var nyr=L.split("-")[0]+ L.split("-")[1] +L.split("-")[2]; //开团年月日
	var nyr2=L2.split("-")[0]+ L2.split("-")[1] +L2.split("-")[2];//截团年月日
//	var n=L.split("-")[0];//开团年
//	var n2=L2.split("-")[0];//开团年
	var S=startDate.split(" ")[1]; //开团小时
	var S2=endDate.split(" ")[1]; //截团小时
	var nyrS=nyr+""+S;
	var nyr2S=nyr2+""+S2;
	
	var Dq = new Date();
	var Dqnyr=Dq.getFullYear()+""+(Dq.getMonth()+1)+""+ Dq.getDate();//当前年月日
	var DqS=Dq.getHours();//当前小时
	var DqnyrDqS=Dqnyr+""+DqS;
	if(parseInt(DqnyrDqS) >= parseInt(nyrS)){
		alert("开始时间要大于当前时间");
		return;
	}
	if(parseInt(nyr2S) <= parseInt(nyrS)){
		alert("截图时间要大于开始时间");
		return;
	}
    upLoadImg();


    var closethis = setInterval(function () {
        if (uploadEnd == true) {

            var imageIds = "";
            images.serverId.map(function (index, value) {
                imageIds += index + ",";
            });
            imageIds = imageIds.substr(0, imageIds.length - 1);

            var imageAddr = "";
            editActionImg.map(function (index, value) {
                imageAddr += index + ",";
            });
            imageAddr = imageAddr.substr(0, imageAddr.length - 1);

            if (!id) {
                imageAddr = imageIds;
                imageIds = "";
            }
            $.ajax({
                type: "post",
                url: "/Product/add/",
                data: {
                    title: title,
                    content: content,
                    images: imageAddr,
                    price: money,
                    open_num: minNum,
                    total_num: maxNum,
                    open_time: startDate+":00:00",
                    end_time: endDate+":00:00",
                    come_time: deliverytime,
                    logistics_type: tuangou.iogisticstype,
                    address: address,
                    name: tuanzhuname,
                    mobile: tuanzhumobile,
                    is_open: tuangou.isopen,
                    type: tuangou.type,
                    status: status,
                    id: id,
                    images_new: imageIds
                },
                dataType: "json",
                success: function (resData) {
                    if (resData.errorcode != "0" && resData.errorcode != "101") {
                        return alert(resData.errordesc);

                    } else if (resData.errorcode == "101") {
                        window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
                        return;
                    }

                    window.location.href = "/MomBuy/Mine/Mylaunch/Mylaunch.html";

                }
            });
            uploadEnd = false;
            clearInterval(closethis);

        };
    }, 500)

}
var images = {
    localId: [],
    serverId: []
};

function getProduct() {
    wx.chooseImage({
        success: function (res) {
            var temp = res.localIds;
            for (var i = 0; i < temp.length; i++) {
                var items = temp[i];
                //判断元素是否存在于new_arr中，如果不存在则插入到new_arr的最后
                if ($.inArray(items, images.localId) == -1) {
                    images.localId.push(items);
                }
            }

            if (images.localId.length > 9) {
                alert("图片最多可选九张");
                images.localId.splice(9, images.localId.length - 9);
            }

            if (images.localId.length > 0) {
                $(".PicList").empty();
                for (var i = 0; i < editActionImg.length; i++) {
                    var img = editActionImg[i];
                    if (i <= 2) {
                        $(".PicList").append("<div><img src=" + img + " alt='图片'><span>主图</span><b onclick='closeImg(&quot;" + img + "&quot;,this,1)'></b></div>");
                    } else {
                        $(".PicList").append("<div><img src=" + img + " alt='图片'><b onclick='closeImg(&quot;" + img + "&quot;,this,1)'></b></div>");
                    }
                }
                for (var i = 0; i < images.localId.length; i++) {
                    var img = images.localId[i];

                    if (i <= 2) {
                        $(".PicList").append("<div><img src=" + img + " alt='图片'><span>主图</span><b onclick='closeImg(&quot;" + img + "&quot;,this)'></b></div>");
                    } else {
                        $(".PicList").append("<div><img src=" + img + " alt='图片'><b onclick='closeImg(&quot;" + img + "&quot;,this)'></b></div>");
                    }
                }
                $(".PicList").append("<div onClick='getProduct()' class='Add'></div>");
                cssDy()
            }
            DIvS($(".PicList div"), "3")
        }
    });
}

var uploadEnd = false;

function upLoadImg() {
    if (images.localId.length == 0 && editActionImg.length == 0) {
        alert('请先选择图片');
        return;
    }

    var i = 0,
		length = images.localId.length;
    images.serverId = [];
    /*for (var j = 0; j < editActionImg.length; j++) {
        images.serverId.push(editActionImg[j]);
    }*/

    function upload() {
        wx.uploadImage({
            localId: images.localId[i],
            success: function (res) {
                i++;

                //alert('已上传：' + i + '/' + length);
                images.serverId.push(res.serverId);
                if (i < length) {
                    upload();
                } else {
                    uploadEnd = true;
                }
            },
            fail: function (res) {
                alert(JSON.stringify(res));
                return;
            }
        });
    }

    if (i < length) {
        upload();
    } else if (editActionImg.length > 0 || images.serverId.length > 0) {
        uploadEnd = true;
    }

}

/** 
  *删除数组指定下标或指定对象 
  */
Array.prototype.remove = function (obj) {
    for (var i = 0; i < this.length; i++) {
        var temp = this[i];
        if (!isNaN(obj)) {
            temp = i;
        }
        if (temp == obj) {
            for (var j = i; j < this.length; j++) {
                this[j] = this[j + 1];
            }
            this.length = this.length - 1;
        }
    }
}

function closeImg(i, obj, local) {
    if (local) {
        editActionImg.remove(i);
        $(obj).parent().remove();
        return;
    }
    images.localId.remove(i);
    $(obj).parent().remove();
}

function DIvS(obj, num) {
    $(obj).each(function (index, element) {
        if (((index + 1) % num) == 0) {
            $(this).css("margin-right", "0");
        }
    });
}
//去掉开团秒钟
function qdss(){
	var ss=$("#startDate").val().split(":")[0];
	var newTime=ss+":00";
	$("#startDate").val(newTime);
}
//去掉截团秒钟
function qdjtss(){
	var ss=$("#endDate").val().split(":")[0];
	var newTime=ss+":00";
	$("#endDate").val(newTime);
}
//单价保留2位
function Bltwo(){
	var ss=$("#money").val();
	$("#money").val(Number(ss).toFixed(0));
}
//判断年月日是否合理
function iSdateTime(){
			var YY=parseInt($(".YY p").html());//年
            var MM=parseInt($(".MM p").html());//月
            var num=parseInt($(".DD p").html());//日
            var runMM=[1,3,5,7,8,10,12];
            var str = runMM.toString();
            if(str.indexOf(MM) ==-1){
                if(num>30){              
                    return false;
                }
            }else if(MM==2){
                if(((YY%4 == 0) && (YY%100 != 0)) || (YY%400 == 0)){
                    if(num>29){
						return false;
                    }
                }else{
                    if(num>28){
             			return false;
                    }
                }
            }else{
                if(num>31){
                    return false;
                }
            }
            return true;
}
function setTime(){
		var YY=parseInt($(".YY p").html());//年
        var MM=parseInt($(".MM p").html());//月
        var DD=parseInt($(".DD p").html());//日
        var TT=parseInt($(".TT p").html());//时
        
        $(".model").css("display","none");
        if(type=="start"){
        	$("#startDate").val(YY+"-"+coltime(MM)+"-"+coltime(DD)+" "+coltime(TT));
        }else{
        	$("#endDate").val(YY+"-"+coltime(MM)+"-"+coltime(DD)+" "+coltime(TT));
        }
}
function coltime(colk){
	if(parseInt(colk)<10){
		var temp=parseInt(colk).toString();
		return "0"+temp;
	}else{
		return colk;
	}
}
