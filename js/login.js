$(function () {
    var isRem = document.querySelector(".isRem");
    $(".loginBtn").click(function () {
        var account = $(".user").val().trim();
        var pwd = $(".pwd").val();
        Judge();
        async function Judge() {
            var result = await login({ account, pwd });
            if (result.status) {
                if (isRem.checked) {
                    setCookie("lgc", result.user, 7);
                } else {
                    setCookie("lgc", result.user);
                }
                var search = location.search;
                if (search) {
                    var strUrl = search.split("=")[1];
                    console.log(strUrl);
                    var url = decodeURIComponent(strUrl);
                    if (url) {
                        location.href = url;
                    }
                } else {
                    location.href = "./index.html";
                }
            } else {
                $(".errorDiv").show();
                $(".user").css({ borderColor: "#ff3320" });
                $(".pwd").css({ borderColor: "#ff3320" });
                $(".errorDiv p").html(result.msg);
            }
        }
    })
    $(".registerBtn").click(function () {
        location.href = "./register.html";
    });



})