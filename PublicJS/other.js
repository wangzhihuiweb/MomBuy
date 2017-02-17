$.ajax({
        type: "get",
        url: "/User/doGetUserInfo/",
        dataType: "json",
        success: function (resData) {
            if (resData.errorcode == "101") {
                window.location.href = "/User/getAuthUrl?type=10&url=" + window.location.href;
                return;
            }
           
        }
    })