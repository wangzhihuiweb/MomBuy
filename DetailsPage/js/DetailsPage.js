var id = "";

var timestamp;
var appId;
var noneceStr;
var signature;
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

function WeinXinShare(data,url)
{
    wx.onMenuShareAppMessage({
        title: data.title, // 分享标题
        desc: "【邻家妈妈团】" + data.content, // 分享描述
        link: window.location.href, // 分享链接
        imgUrl: url, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareTimeline({
        title: data.title, // 分享标题
        link: window.location.href, // 分享链接
        imgUrl: url, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareQQ({
        title: data.title, // 分享标题
        desc: "【邻家妈妈团】" + data.content, // 分享描述
        link: window.location.href, // 分享链接
        imgUrl: url, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareWeibo({
        title: data.title, // 分享标题
        desc: "【邻家妈妈团】" + data.content, // 分享描述
        link: window.location.href, // 分享链接
        imgUrl: url, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareQZone({
        title: data.title, // 分享标题
        desc: "【邻家妈妈团】" + data.content, // 分享描述
        link: window.location.href, // 分享链接
        imgUrl: url, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}

$(function () {
    getWXInfo();

    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: noneceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: [
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'onMenuShareQZone'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });



    DetalisPage();
    id = getParamValue("pId");

    //商品详情
    $.ajax({
        type: "get",
        url: "/Product/detail/",
        data: {
            id: id
        },
        dataType: "json",
        success: function (resData) {
        	
            if (resData.errorcode != "0" && resData.errorcode != "101") {
                return alert(resData.errordesc);

            } else if (resData.errorcode == "101") {
                window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
                return;
            }
            var data = resData.data;
//          console.log(data)
             var isFollownae = data.isFollow;
            $("#liuyan").attr("href", "/MomBuy/DetailsPage/Xiangqi/zise.html?pId=" + data.id);
            $("#headimg").attr("src", data.headimgurl);
            $("#nickName").text(data.nickname);
            $("#addressTitle").html(data.addressTitle + "：")
            $(".name").text(data.title);
            document.title = data.title;

            if(data.status == "1"){
                $(".Quantity").css('display', 'none');
            }

            $(".present").text(data.content);
            $(".price span").text(data.price);
            $("#gentuT").attr("href","Xiangqi/fukuan.html?pid="+data.id+"");
            //alert(data.now_bay_num)
            $(".tree b span").text(data.now_bay_num == null ? "0" : data.now_bay_num);
//          if (data.now_buy_num) {
//              $(".tree b").text("已成团" + data.now_buy_num + "次");
//          } else {
//              data.now_buy_num = 0;
//              $(".tree b").text("暂无成团数");
//          }
            
            //判断是否关注
	          if(isFollownae == "0"){
	          	$("#Follownae img").attr("src","images/guanzhu.png");
	          }else if(isFollownae == "1"){
	          	$("#Follownae img").attr("src","images/guanzhuLight.png");
	          	
	          }

//			alert(data.now_buy_num)
            $(".time span").text(data.time);
            $("#minNum").text(data.open_num);
            $("#buyNum").text(data.this_now_bay_num == null ? "0" : data.this_now_bay_num);
            $("#maxNum").text(data.total_num);
            $("#logistics").text(data.address);
            $("#cometime").text(data.come_time);
            if (data.images != null && data.images.length > 0) {
                for (var i = 0; i < data.images.length; i++) {
                    if(i==0)
                    {
                        WeinXinShare(data, data.images[i])
                    }
                    $(".Photode_img").append("<img src=" + data.images[i] + " alt='图片'>")
                    $("#banner ul").append("<li ><a href='javascript:'><img src=" + data.images[i] + "></a></li>")
                    if (i == 0) {
                        $("#banner ol").append("<li class='on'></li>");
                    } else {
                        $("#banner ol").append("<li></li>");
                    }

                }
                new Swipe(document.getElementById('banner'), {
                    speed: 500,
                    auto: 3000,
                    callback: function () {
                        var lis = $(this.element).next("ol").children();
                        lis.removeClass("on").eq(this.index).addClass("on");
                    }
                });
                $(".pics>ol>li").css({
                    "width": Q(14),
                    "height": Q(14),
                    "border-radius": Q(14),
                    "margin-right": Q(10),
                    "margin-left": Q(10)
                })
                $(".pics>ul>li>a>img").css({
                    "height": Q(800)
                })
                $(".pics>ol").css({
                    "bottom": Q(10)
                })
                DetalisPage();

            }

        }
    });

    //邻居购买记录
    $.ajax({
        type: "post",
        url: "/Order/getNeighborList/",
        data: {
            pId: id
        },
        dataType: "json",
        success: function (resData) {
        	//alert(id)
//      	console.log(resData)
//          if (resData.errorcode != "0" && resData.errorcode != "101") {
//              return alert(resData.errordesc);
//
//          } else if (resData.errorcode == "101") {
//              window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
//              return;
//          }
            data = resData.data;
            if (data.content != null && data.content.length > 0) {
               $("#youLinju").text("（共" + data.count + "条购买记录）")
                for (var i = 0; i < data.content.length; i++) {
                    if (i >= 5) {
                        divid = "moreLinJu";
                    }
                    $("#youLinJuInfo").append("<div class='Lis'><div class='lis_img'><img src=" + data.content[i].headimgurl + " alt=''/></div>" +
						"<div class='lisD'><div class='mingshijian'><span>" + data.content[i].nickname + "</span><b>" + data.content[i].addtime + "</b></div>" +
						"<div class='discuss'>购买了<font>" + data.content[i].num + "</font> 件</div></div></div>");
                }
                DetalisPage();
            }else{
            		$("#youLinJuInfo").html("暂无数据").css("text-align","center")
            }

        }
    });
    //评论
    $.ajax({
        type: "get",
        url: "/Comment/gList/",
        dataType: "json",
        data: {
            pId: id
        },
        success: function (resData) {
//      	console.log(resData)
//          return;
//          if (resData.errorcode != "0" && resData.errorcode != "101") {
//              return alert(resData.errordesc);
//
//          } else if (resData.errorcode == "101") {
//              window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
//              return;
//          }
            data = resData.data;
            if (data != null) {            
//              var divid = "defaultPingLun";
                if (data.content != null && data.content.length > 0) {
                	 $("#pingLun").text("（共" + data.count + "条评论）");
                    for (var i = 0; i < data.content.length; i++) {
//                      if (i >= 5) {
//                          divid = "morePingLun";
//                      }
                        var ext = "";
                        if (data.content[i].againBuy == "1") {
                            ext = "<div class='laud'><img src='images/laud.png'><span>还想要</span></div>";
                        }
                        $("#pingLunInfo").append(" <div class='Lis'><div class='lis_img'><img src=" + data.content[i].headimgurl + " alt='' /></div><div class='lisD'>" +
							"<div class='mingshijian'><span>" + data.content[i].userName + "</span><b>" + data.content[i].addtime + "</b></div>" +
							"<div class='discuss'>" + data.content[i].content + "</div>" +
							"" + ext + "</div></div>");
                    }
                    DetalisPage();
                }else{
                	$("#pingLunInfo").html("暂无数据").css("text-align","center")
                }
                

            }

        }
    });

    //留言
    $.ajax({
        type: "post",
        url: "/Message/gList/",
        dataType: "json",
        data: {
            pId: id
        },
        success: function (resData) {
//          if (resData.errorcode != "0" && resData.errorcode != "101") {
//              return alert(resData.errordesc);
//
//          } else if (resData.errorcode == "101") {
//              window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
//              return;
//          }
			console.log(resData)
            data = resData.data;
           
            if (data != null) {
                $("#liuYan span").text("（共" + data.count + "条留言）");
                //var divid = "defaultLiuYan";
                if (data.content && data.content.length > 0) {
                    for (var i = 0; i < data.content.length; i++) {
//                      if (i >= 5) {
//                          divid = "moreLiuYan";
//                      }
                        var ext = "";
                        var extHuiFu = "";
                        if (data.is_reply == "1") {
                            ext = "<div class='huifu'><a href='/MomBuy/DetailsPage/Xiangqi/zise.html?pId=" + id + "&messageid=" + data.content[i].id + "'><img src='images/huifu_03.png' /></a></div>";
                            
                        }
                        if (data.content[i].replyContent != null)
                        {
                            ext = "";
                            extHuiFu = " <div class='lisD lisD_R'><div class='mingshijian'><span>" + data.content[i].replynickname + "</span><b>" + data.content[i].replyAddtime + "</b></div>" +
								"<div class='discuss'>" + data.content[i].replyContent + "</div></div>";
                        }

                        $("#liuYanInfo").append("<div class='Lis'><div class='lis_img'><img src=" + data.content[i].headimgurl + " alt='' /></div><div class='lisD'>" +
							"<div class='mingshijian'><span>" + data.content[i].nickname + "</span><b>" + data.content[i].addtime + "</b></div>" +
							"<div class='discuss'>" + data.content[i].content + "</div>" + ext + "</div>" + extHuiFu + "</div>");
                    }
                    DetalisPage();
                }else{
                	$("#liuYanInfo").html("暂无数据").css("text-align","center")
                }

            }

        }
    })

    DetalisPage();
	

})



function DetalisPage() {
    //成团11次
    $("#tree>img").css({
        "width": Q(280),
        "height": Q(80),
        "top": Q(80),
        "right": Q(10),
        "z-index": Q(10)
    });
    $("#tree>b").css({
    	"width": Q(200),
        "font-size": Q(30),
        "top": Q(90),
        "right": Q(75),
        "z-index": Q(50)
    });
    $("body").css({
        "padding-bottom": Q(112)
    })
    $(".Tit").css({
        "padding-left": Q(120),
        "height": Q(71)
    })
    $(".Tit>img").css({
        "width": Q(80),
        "height": Q(80),
        "left": Q(20),
        "top": Q(20)
    })
    $(".Tit h3").css({
        "padding-left": Q(0),
        "padding-top": Q(25),
        "font-size": Q(28)
    })
    $(".pics>ol>li").css({
        "width": Q(14),
        "height": Q(14),
        "border-radius": Q(14),
        "margin-right": Q(10),
        "margin-left": Q(10)
    })
    $(".pics>ol").css({
        "bottom": Q(10)
    })

    $(".name").css({
        "padding-left": Q(36),
        "padding-right": Q(36),
        "padding-top": Q(18),
        "padding-bottom": Q(18),
        "line-height": Q(50),
        "font-size": Q(36)
    })

    $(".present").css({
        "padding-left": Q(20),
        "padding-right": Q(20),
        "padding-top": Q(3),
        "line-height": Q(40),
        "font-size": Q(28)
    })

    $(".price").css({
        "line-height": Q(68),
        "font-size": Q(52),
        "padding-top": Q(18)
    })
    $(".price font").css({
        "line-height": Q(68),
        "font-size": Q(32)
    })

    $(".time").css({
        "padding-top": Q(14),
        "height": Q(34),
        "line-height": Q(34)
    })
    $(".time img").css({
        "height": Q(34),
        "width": Q(34),
        "margin-right": Q(14)
    })
    $(".tree b>span").css({
    	"font-size":Q(40),
    	"display":"inline-block",
    	"margin-left":Q(5),
    	"margin-right":Q(5)
    })
    $(".time span").css({
        "font-size": Q(28),
        "line-height": Q(34)
    })

    $(".price").css({
        "line-height": Q(68),
        "font-size": Q(52)
    })
    $(".price font").css({
        "line-height": Q(68),
        "font-size": Q(32)
    })

    $(".Quantity").css({
        "font-size": Q(28),
        "padding-top": Q(18),
        "padding-bottom": Q(29)
    })
    $(".Quantity font").css({
        "line-height": Q(68),
        "font-size": Q(32)
    })

    $(".Pickup").css({
        "padding-top": Q(20),
        "padding-bottom": Q(28),
        "padding-left": Q(20)
    })
    $(".Pickup p").css({
        "height": Q(75),
        "padding-top": Q(22),
        "font-size": Q(28)
    })
	$(".Wrap .Pickup p b").css({
		"line-height":Q(40)
	})
	$(".Wrap .Pickup p span").css({
		"line-height":Q(40)
	})
    $(".Photode").css({
        "height": Q(83),
        "line-height": Q(83),
        "font-size": Q(32),
        "padding-left": Q(20)
    })

    $(".yourNeir").css({
        "height": Q(89),
        "padding-right": Q(20),
        "padding-left": Q(20)
    })

    $(".yourNeir p").css({
        "height": Q(89),
        "line-height": Q(89),
        "font-size": Q(32)
    })
    $(".yourNeir p span").css({
        "font-size": Q(28),
        "margin-left": Q(22)
    })

    $(".yourNeir b").css({
        "height": Q(89),
        "line-height": Q(89),
        "font-size": Q(28),
        "padding-right": Q(32)
    })
    $(".yourNeir b i").css({
        "height": Q(12),
        "width": Q(18),
        "right": Q(0),
        "top": Q(36)
    })

    $(".Lis").css({
        "padding-top": Q(20),
        "padding-bottom": Q(26),
        "padding-left": Q(20),
        "padding-right": Q(20)
    })
    $(".Lis .lis_img").css({
        "width": Q(80),
        "height": Q(80),
        "margin-right": Q(20)
    })

    $(".Lis .lisD").css({
        "width": Q(580)
    })


    $(".Lis a").css({
        "width": Q(580)
    })

    $(".mingshijian span").css({
        "font-size": Q(28)
    })
    $(".mingshijian b").css({
        "font-size": Q(24)
    })

    $(".discuss").css({
        "font-size": Q(32),
        "line-height": Q(50)
    })
    $(".laud").css({
        "padding-top": Q(9)
    })
    $(".laud img").css({
        "width": Q(33),
        "height": Q(32),
        "margin-right": Q(7),
        "margin-top": Q(8)
    })
    $(".laud span").css({
        "font-size": Q(28),
        "margin-top": Q(12)
    })

    $(".lisD_R").css({
        "padding-top": Q(25),
        "padding-left": Q(22),
        "padding-bottom": Q(26),
        "padding-right": Q(23),
        "margin-top": Q(20)
    })

    $(".footR").css({
        "height": Q(92)
    })

    $(".footR a").css({
        "height": Q(92),
        "width": Q(120)
    })
    $(".footR a img").eq(0).css({
        "margin-left": Q(45)
    })
    $(".footR a img").eq(1).css({
        "margin-left": Q(38)
    })
    $(".footR a img").eq(2).css({
        "margin-left": Q(25)
    })
    $(".footR a").eq(3).css({
        "width": Q(360),
        "line-height": Q(92),
        "font-size": Q(36)
    })
    //回复按钮
    $(".Megelist .Lis .huifu").css({
        "margin-top": Q(25)
    });
    $(".Megelist .Lis .huifu img").css({
        "width": Q(161),
        "height": Q(68)
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

//var i = 0;

function toggleShow(obj,type) {
		if(!$(obj).find("i").hasClass("light")){
			$( obj ).find("i").addClass("light")
			$(obj).parent().next(".Megelist").css("display","none")
		}else{
			$( obj ).find("i").removeClass("light")
			$(obj).parent().next(".Megelist").css("display","block")
			
		}
//  var id = "";
//  switch (type) {
//      case  3:
//          id = "liuYanInfo"
//          break;
//      case  2:
//          id = "pingLunInfo"
//          break;
//      case  1:
//          id = "youLinJuInfo"
//          break;
//  }
//  if (i % 2 == 0) {
//
//      $("#" + id).show();
//  } else {
//      $("#" + id).hide();
//  }
//  i++;
}

function follow() {
    $.ajax({
        type: "post",
        url: "/Follow/add/",
        data: {
            pId: id
        },
        dataType: "json",
        success: function (resData) {
            if (resData.errorcode != "0" && resData.errorcode != "101") {
                return alert(resData.errordesc);

            } else if (resData.errorcode == "101") {
                window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
                return;
            }
            
	          	$("#Follownae img").attr("src","../images/guanzhu.png");
            if(resData.data.msg == "关注成功"){
            	$("#Follownae img").attr("src","images/guanzhuLight.png");
            }else if(resData.data.msg == "取消关注"){
            	$("#Follownae img").attr("src","images/guanzhu.png");
            }
            

        }
    })
}
