$(function () {
    $.ajax({
        type: "get",
        url: "/User/doGetUserInfo/",
        dataType: "json",
        success: function (resData) {
            if (resData.errorcode != "0" && resData.errorcode != "101") {
                return alert(resData.errordesc);

            } else if (resData.errorcode == "101") {
                //return;
                window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
                return;
            }
            var user = resData.data;

            if (!user.areaId || $.trim(user.areaId) == "") {

                window.location.href = "/MomBuy/Login/Login.html";
            }
           

        }
    })
})


function concern(pid, obj) {
    $.ajax({
        type: "post",
        url: "/Follow/add/",
        data: { pid: pid },
        dataType: "json",
        success: function (resData) {
            if (resData.errorcode != "0" && resData.errorcode != "101") {
                return alert(resData.errordesc);

            } else if (resData.errorcode == "101") {
                window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
                return;
            }
            $(obj).addcaddClass("light");
        }
    })
}