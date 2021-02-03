$(function () {
    $(".loginBtn").on("click", function () {
        location.href = "../html/login.html";
    })

    /* ------------------------------------眼睛状态切换--------------------------------------- */
    // 设置眼睛的点击状态
    var pflag = false;
    var rflag = false;
    $(".p-eye").click(function () {
        pflag = setEye(pflag, $(".pwd"), $(".p-eye"));
    })
    $(".r-eye").click(function () {
        rflag = setEye(rflag, $(".repwd"), $(".r-eye"));
    })


    /* -------------------------------------表单验证----------------------------- */
    var userSpan = $(".error").eq(0).get(0);
    var pwdSpan = $(".error").eq(1).get(0);
    var phoneSpan = $(".error").eq(3).get(0);
    var emailSpan = $(".error").eq(4).get(0);
    //用户名验证
    $(".user").on("blur", function () {
        var user = $(".user").val().trim();
        // var userSpan = $(".error").eq(0).get(0);
        Judge(JudgeUser, user, userSpan);
    })
    //密码验证
    $(".pwd").on("blur", function () {
        var pwd = $(".pwd").val();
        // var pwdSpan = $(".error").eq(1).get(0);
        Judge(JudgePwd, pwd, pwdSpan);
    })
    // 重复密码
    $(".repwd").on("blur", function () {
        var repwd = $(".repwd").val();
        var repeat = $(".pwd").val();
        JudgeRePwd(repwd, repeat).then(function () {
            $(".repwdSpan").hide();
            $(".repwd").css({ borderColor: "transparent" });
        }).catch(err => {
            $(".repwd").css({ borderColor: "#ff3320" });
            $(".repwdSpan").find(".error").html(err.msg);
            $(".repwdSpan").show();
            $(".repwdSpan").css({ color: "red" });
        })
    })
    //手机号验证
    $(".phone").on("blur", function () {
        var phone = $(".phone").val().trim();
        // var phoneSpan = $(".error").eq(3).get(0);
        Judge(JudgePhone, phone, phoneSpan);
    })
    // 邮箱验证
    $(".email").on("blur", function () {
        var email = $(".email").val().trim();
        // var emailSpan = $(".error").eq(4).get(0);
        Judge(JudgeEmail, email, emailSpan);
    })

    /* -----------------------------------点击注册-------------------------- */
    $(".registerBtn").on("click", function () {
        var user = $(".user").val().trim();
        var pwd = $(".pwd").val();
        var repwd = $(".repwd").val();
        var phone = $(".phone").val().trim();
        var email = $(".email").val().trim();
        var pList = [JudgeUser(user), JudgePwd(pwd), JudgeRePwd(repwd, pwd), JudgePhone(phone), JudgeEmail(email)];
        Promise.allSettled(pList).then(list => {
            var flag = list.every(item => {
                return item.status == "fulfilled";
            })
            if (flag) {
                register({ user, pwd, phone, email }).then(function (result) {
                    alert(result.msg);
                    setCookie("user", user, 7);
                    setCookie("pwd", pwd, 7);
                    setCookie("email", phone, 7);
                    setCookie("phone", email, 7);
                    location.href = "./login.html";
                })
            } else {
                list.forEach((item, index) => {
                    if (item.status == "fulfilled") {
                        let { value: { msg } } = item;
                    } else {
                        let { reason: { msg } } = item;
                        var input = $(".error").parent().parent().first().get(0);
                        $(".error").eq(index).parent().show();
                        $(input).css({ borderColor: "#ff3320" });
                        $(".error").eq(index).html(msg);
                        $(".error").eq(index).css({ color: "red" });
                    }
                })
            }
        }).catch(err => {
            console.log(err);
        })
    })

    // 错误悬浮框的显示隐藏
    function frame(ele) {
        $(ele).show();
        var timer = setTimeout(function () {
            $(ele).hide();
            clearTimeout(timer);
        }, 2000)
    }

    // 封装小眼睛
    function setEye(flag, ele, subEle) {
        flag = !flag;
        if (flag) {
            ele.prop("type", "text");
            subEle.css({ backgroundImage: "url(../pics/password.png)" });
        } else {
            ele.prop("type", "password");
            subEle.css({ backgroundImage: "url(../pics/password_disable.svg)" });
        }
        return flag;
    }

    function num(str) {
        var reg = /\w+/g;
        if (reg.test(str)) {
            return true
        }
        return false;
    }

    function upper(str) {
        var reg = /[A-Z]+/g;
        if (reg.test(str)) {
            return true
        }
        return false;
    }

    function lower(str) {
        var reg = /[a-z]+/g;
        if (reg.test(str)) {
            return true
        }
        return false;
    }

    // 异步判断注册封装
    function Judge(callback, data, tipSpan) {
        callback(data).then(function (result) {
            if (pwdSpan === tipSpan) {
                $(".strength").html(result.msg)
                $(".color").css({ backgroundColor: result.bgc })
                frame(frame($(tipSpan).parent().prev().get(0)));
            }
            $(tipSpan).parent().hide();
            $(tipSpan).parent().parent().first().css({ borderColor: "transparent" })
        }).catch(err => {
            var reg = /该用户已存在/;
            if (((userSpan === tipSpan) && !(reg.test(err.msg))) || pwdSpan === tipSpan) {
                if (pwdSpan === tipSpan) {
                    $(".strength").html("密码强度");
                    $(".color").css({ backgroundColor: "rgba(0, 0, 0, 0.15)" })
                }
                frame($(tipSpan).parent().prev().get(0));
            }
            $(tipSpan).parent().parent().first().css({ borderColor: "#ff3320" })
            $(tipSpan).html(err.msg)
            $(tipSpan).parent().show();
            $(tipSpan).css({ color: "red" })
        })
    }

    // 判断重复密码
    async function JudgeRePwd(repwd, pwd) {
        if (pwd) {
            if (repwd === pwd) {
                return {
                    status: true,
                    msg: "√"
                }
            } else {
                throw {
                    status: false,
                    msg: "两次密码不一致,请重新输入!"
                }
            }
        } else {
            throw {
                status: false,
                msg: "请输入正确的密码"
            }
        }
    }

    async function JudgeUser(user) {
        var reg = /^.{6,12}$/;
        if (reg.test(user)) {
            var reg = /^\D/;
            if (reg.test(user)) {
                var reg = /^\w+$/;
                if (reg.test(user)) {
                    var result = await hasUser({ user })
                    if (!result.status) {
                        return result;
                    } else {
                        throw result;
                    }
                } else {
                    throw {
                        status: false,
                        msg: "用户名含有非法字符头,请重新输入"
                    };
                }
            } else {
                throw {
                    status: false,
                    msg: "用户名不能以数字开头,请重新输入"
                };
            }
        } else {
            throw {
                status: false,
                msg: "用户名的长度为6~12个字符,请重新输入"
            };
        }
    }

    async function JudgePwd(pwd) {
        var reg = /^.{6,12}$/;
        if (reg.test(pwd)) {
            var reg = /^[0-9a-zA-Z]{6,12}$/;
            if (reg.test(pwd)) {
                var count = num(pwd) + upper(pwd) + lower(pwd);
                switch (count) {
                    case 1:
                        return {
                            status: true,
                            msg: "密码强度: 弱",
                            bgc: "red"
                        };
                    case 2:
                        return {
                            status: true,
                            msg: "密码强度: 中",
                            bgc: "orange"
                        };
                    case 3:
                        return {
                            status: true,
                            msg: "密码强度: 强",
                            bgc: "rgb(26, 235, 26)"
                        };
                    default:
                        pwdSpan.textContent = "意外错误";
                        break;
                }
            } else {
                throw {
                    status: false,
                    msg: "密码含有非法字符头,请重新输入"
                };
            }
        } else {
            throw {
                status: false,
                msg: "密码的长度为6~12个字符,请重新输入"
            };
        }
    }

    async function JudgePhone(phone) {
        var reg = /^1[3-9]\d{9}$/;
        if (reg.test(phone)) {
            var result = await hasPhone({ phone });
            if (!result.status) {
                return {
                    status: true,
                    msg: "√"
                };
            } else {
                throw {
                    status: false,
                    msg: result.msg
                };
            }
        } else {
            throw {
                status: false,
                msg: "手机号错误,请重新输入"
            };
        }
    }

    async function JudgeEmail(email) {
        var reg = /^\w{6,12}@\w+\.(com|cn|net|edu)$/;
        if (reg.test(email)) {
            var result = await hasEmail({ email })
            if (!result.status) {
                return {
                    status: true,
                    msg: "√"
                };
            } else {
                throw {
                    status: false,
                    msg: result.msg
                }
            }
        } else {
            throw {
                status: false,
                msg: "邮箱格式有误, 请重新输入"
            }
        }
    }
})