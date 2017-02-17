/**
 * Created by Administrator on 2016/5/20.
 */
var id = "";
var messageid = "";
var ismessage = false;
$(function () {
    id = getParamValue("pId");
    messageid = getParamValue("messageid");
    if (messageid != undefined)
    {
        ismessage = true;
    }
    
    

    $.ajax({
        type: "post",
        url: "/Product/detail/",
        data: { id: id },
        dataType: "json",
        success: function (resData) {
            if (resData.errorcode != "0" && resData.errorcode != "101") {
                alert(resData.errordesc);
                window.location.href = document.referrer;;

            } else if (resData.errorcode == "101") {
                window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
            }
            var data = resData.data;
            console.log(data);
            $("#name").text(data.nickname);
            $(".img").attr("src", data.icon);
//          alert(data.now_bay_num)
             $("#chengtuan").text("已成团" + (data.now_bay_num > 0 ? data.now_bay_num : 0) + "次");
//          if (data.now_buy_num) {
//             
//          } else {
//              $("#chengtuan").text("暂无成团数");
//          }
            $(".tou").attr("src", data.headimgurl);

        }
    })


    $("h1").css({ "padding-top": Q(20), "font-size": Q(28), "padding-bottom": Q(15), "padding-left": Q(120) });
    $("div .img").css({ "width": Q(720), "height": Q(358) });
    $("div .tou").css({ "top": Q(22), "left": Q(20), "width": Q(80), "height": Q(80) });
    $("div .tree").css({ "top": Q(80), "right": Q(10), "width": Q(253), "height": Q(80) });
    $("div b").css({ "top": Q(93), "right": Q(75), "font-size": Q(30) });
    $("input").css({ "font-size": Q(32), "padding-left": Q(20), "line-height": Q(94), "width": Q(580) });
	$("a").css({"line-height": Q(96), "width": Q(140),"font-size": Q(32),"margin-top":Q(1)});
    $('a').click(function () {


        if (confirm("是否确认" + (ismessage?"回复":"留言"))) {
        var content = $("#content").val();
        if (!content || content.trim(content) == "") {

        } else {
            if (ismessage) {
                $.ajax({
                    type: "post",
                    url: "/Message/reply/",
                    data: { message_id: messageid, content: content },
                    dataType: "json",
                    success: function (resData) {
                        if (resData.errorcode != "0" && resData.errorcode != "101") {
                            return alert(resData.errordesc);

                        } else if (resData.errorcode == "101") {
                            window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
                            return;
                        }
                        alert((ismessage ? "回复" : "留言") + "成功!");
                        window.location.href = document.referrer;;
                    }
                })
            }
            else {
                $.ajax({
                    type: "post",
                    url: "/Message/add/",
                    data: { pId: id, content: content },
                    dataType: "json",
                    success: function (resData) {
                        if (resData.errorcode != "0" && resData.errorcode != "101") {
                            return alert(resData.errordesc);

                        } else if (resData.errorcode == "101") {
                            window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
                            return;
                        }
                        alert((ismessage ? "回复" : "留言") + "成功!");
                        window.location.href = document.referrer;;
                    }
                })
            }

        }
    }
});
});
function Q(obj) {
    var width = $(window).width();
    if (width > 720) {
        width = 720;
    }
    var num = (parseInt(obj) / 720).toFixed(20) * width;
    return num + "px";
}

