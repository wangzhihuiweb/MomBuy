$(function () {
    $.ajax({
        type: "post",
        url: "/News/walletNews/",
        dataType: "json",
        success: function (mnyDATA) {
            console.log(mnyDATA);
        }
    });

    $("body").css({ "padding-bottom": Q(140) })
    $("footer a").eq("3").find("span").addClass("light")
    $("footer a").eq("3").find("b").addClass("light")

    $(".cash div").css({ "padding-left": Q(20), "padding-right": Q(20), "height": Q(120) });
    $(".cash div span").css({ "width": Q(234), "line-height": Q(120), "font-size": Q(32) })
    $(".cash div input").css({ "height": Q(120), "width": Q(446), "font-size": Q(32) })
    $(".cash div").eq(0).css({ "padding-left": Q(20), "padding-right": Q(20), "height": Q(128) });
    $(".cash div").eq(1).css({ "padding-left": Q(20), "padding-right": Q(20), "height": Q(121) });

    $(".cash div").eq(1).find("span").css({ "width": Q(234), "line-height": Q(121), "font-size": Q(32) })
    $(".cash div").eq(2).find("span").css({ "line-height": Q(120) })
    $(".cash div").eq(2).find("input").css({ "height": Q(120) })

    $(".cash div").eq(3).css({ "height": Q(118) })
    $(".cash div").eq(3).find("span").css({ "line-height": Q(118) })
    $(".cash div").eq(3).find("input").css({ "height": Q(118) })
    //	$(".cash div").css({"padding-left":Q(20),"padding-right":Q(20),"height":Q(120)});
    //	$(".cash div").css({"padding-left":Q(20),"padding-right":Q(20),"height":Q(120)});
    //	$(".cash div").css({"padding-left":Q(20),"padding-right":Q(20),"height":Q(120)});
    //	$(".cash div").css({"padding-left":Q(20),"padding-right":Q(20),"height":Q(120)});
    //	$(".cash div span").css({"width":Q(234),"line-height":Q(128),"font-size":Q(32)})
    //	$(".cash div input").css({"height":Q(128),"width":Q(446),"font-size":Q(32)})

    $(".cash div b").css({ "font-size": Q(32), "line-height": Q(120) })

    $(".cash div p").css({ "margin-right": Q(50) })
    $(".cash div p i").css({ "width": Q(36), "height": Q(36), "margin-top": Q(40), "margin-right": Q(12) })

    $(".cash a").css({ "height": Q(90), "margin-top": Q(20), "font-size": Q(36), "line-height": Q(90), "margin-left": Q(20), "margin-right": Q(20), })


    $(".fail").css({ "height": Q(50), "width": Q(316), "margin-top": Q(-25), "margin-left": Q(-158) })

})

function Q(obj) {
    var width = $(window).width()
    if (width > 720) {
        width = 720;
    }
    var num = (parseInt(obj) / 720).toFixed(20) * width;
    return num + "px";
}
var type = 2;
function Cash() {
    var moneys = $("#money").val();
    if (!moneys || $.trim(moneys) == "") {
        return alert("请填写提钱的金额");
    }
    if (isNaN(moneys)) {
        return alert("金额请填写数字整型");
    }
    var money = Number(moneys);
    if (money < 10) {
        return alert("对不起，提现金额不能低于￥10 ");
    }


    var cardNum;
    var name;
    var remarks;
    var mobile = "";
    var bank = "";
    //if (type == 1)
    //{
    //    cardNum = $("#cardNum").val();
    //    if (!cardNum || $.trim(cardNum) == "") {
    //        return alert("请填写账号");
    //    }
    //    if (!isChn(cardNum)) {
    //        return alert("提现账号不可以有汉字");
    //    }
    //    name = $("#name").val();
    //    if (!name || $.trim(name) == "") {
    //        return alert("请填写姓名");
    //    }
    //    remarks = $("#remarks").val();
    //}
    //else if (type == 2) {
        cardNum = $("#cardnum2").val();
        if (isNaN(cardNum)) {
            return alert("银行卡号不正确");
        }
        if (!IsBankCard(cardNum)) {
            return alert("银行卡号不正确");
        }
        name = $("#name2").val();
        if (!name || $.trim(name) == "") {
            return alert("请填写姓名");
        }
        bank = $("#bank2").val();
        if (!bank || $.trim(bank) == "") {
            return alert("请填写开户银行");
        }
        mobile = $("#mobile2").val();
        if (!mobile || $.trim(mobile) == "") {
            return alert("请填写联系方式");
        }
        remarks = $("#remarks2").val();
    //}
    
   
    $.ajax({
        type: "post",
        url: "/Wallet/cashing/",
        data: { money: money, type: type, account: cardNum, name: name, remark: remarks, mobile: mobile, bank_name: bank },
        dataType: "json",
        success: function (resData) {
            if (resData.errorcode != "0" && resData.errorcode != "101") {
                return alert(resData.errordesc);
            } else if (resData.errorcode == "101") {
                window.location.href = "/User/getAuthUrl?type=10&url=/MomBuy/Index/index.html";
                return;
            }else{
                alert('已发起提现请求，请等待系统处理');
                window.location.href = "/MomBuy/Mine/wallet/wallet.html";
            }
        }
    })
}

function toggleAiLi() {
    $("#aili").addClass("light");
    $("#bank").removeClass("light");
    $(".yinhangka").css("display","none")
    $(".zhifubao").css("display","block")
    type = 1;
}

function toggleCard() {
    $("#aili").removeClass("light");
    $("#bank").addClass("light");
    $(".zhifubao").css("display","none")
    $(".yinhangka").css("display","block")
    type = 2;
}

function isChn(str) {
    var reg = /^[u4E00-u9FA5]+$/;
    if (!reg.test(str)) {
        return false;
    }
    return true;
}

function IsBankCard(str) {
    var reg = /^(\d{16}|\d{19})$/;
    if (!reg.test(str)) {
        return false;
    }
    return true;
}