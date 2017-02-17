$(function () {
	 css();
    //获取数据
//  $.ajax({
//      type: "post",
//      url: "/News/faqNews/",
//      dataType: "json",
//      success: function (qData) {
//          var data = qData.data;
//          for (var i = 0; i < data.length; i++) {
//              var list = data[i];
//              if (list.title.indexOf("关于免责") > -1) {
//                  var str =
//               '<h3>' + list.title + '</h3>' +
//               '<p>' + list.content + '</p>' +
//               '<p><a style="color: blue;" href="Mine_MianZe.html">详情请点击</a></p>';
//                  $(".Mine_Faq").append(str);
//              }
//              else if (list.title.indexOf("团主必读") > -1) {
//                  var str =
//               '<h3>' + list.title + '</h3>' +
//               '<p>' + list.content + '</p>' +
//               '<p><a style="color: blue;" href="Mine_TuanZhu.html">详情请点击</a></p>';
//                  $(".Mine_Faq").append(str);
//              } else {
//                  var str =
//                '<h3>' + list.title + '</h3>' +
//                '<p>' + list.content + '</p>';
//                  $(".Mine_Faq").append(str);
//              }
//
//             
//          }
//      }
//  });




})

function Q(obj) {
    var width = $(window).width()
    if (width > 720) {
        width = 720;
    }
    var num = (parseInt(obj) / 720).toFixed(20) * width;
    return num + "px";
}
function css() {
    $("body").css({ "padding-bottom": Q(140) })
    $(".Mine_Faq").css({ "padding-left": Q(20), "padding-top": Q(20), "padding-right": Q(20) });
    $(".Mine_Faq p").css({ "line-height": Q(58), "font-size": Q(26),"padding-bottom": Q(40), })
    $(".Mine_Faq>p>img").css({"width":Q(640),"height":Q(385),"margin-left":Q(20),"margin-bottom":Q(10)});
    $(".Mine_Faq h1").css({ "font-size": Q(36), "padding-bottom": Q(20), "padding-top": Q(20),})
    $(".Mine_Faq h3").css({ "font-size": Q(30), "padding-bottom": Q(20), "padding-top": Q(20),})
    $("footer a").eq("3").find("span").addClass("light");
    $("footer a").eq("3").find("b").addClass("light");
    $("#logo>img").css({"width":"100%"});
    $("#center").css({"text-align":"center"});
    $("#center a").css({"font-size":Q(34),"color":"#EA618E"});
}
