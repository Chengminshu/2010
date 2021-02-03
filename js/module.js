// 设置cookie
function createCar() {
    var cookie = document.cookie;
    if (cookie) {
        var lgc = getCookie("lgc");
        if (lgc) {
            $(".wrapper").html(`欢迎,${lgc}<button>退出</button>`).css({
                color: "#848484"
            });
            $(".login_url").html(`您好!&ensp;${lgc}`);
            carCount({ lgc }).then(result => {
                let { status, data, count } = result;
                if (status) {
                    if (count >= 1) {
                        $(".hungBar-cart .tip").html(count);
                        $(".hungBar-cart .tip").show();
                    } else {
                        $(".hungBar-cart .tip").hide();
                    }
                    var html = "";
                    var subTotal = null;
                    if (data.length > 0) {
                        data.forEach(item => {
                            var { goodsImg, price, total, goodsName, slogan, buyNum, gid } = item;
                            html += `<ul class="list">
                                <li class="pro-item" data-id="${gid}">
                                    <div class="pro-info">
                                        <div class="p-choose">
                                            <i class="iconfont icon-gou"></i>
                                        </div>
                                        <div class="p-img">
                                            <img src="${goodsImg}" alt="">
                                        </div>
                                        <div class="item-wrap">
                                            <div class="p-name">${goodsName}</div>
                                            <div class="p-dec">${slogan}</div>
                                            <div class="p-price">
                                                ¥<span>${price}</span>
                                                &nbsp;&nbsp;
                                                <strong>
                                                    <em>X</em>
                                                    <span>${buyNum}</span>
                                                </strong>
                                            </div>
                                        </div>
    
                                    </div>
                                </li>
                            </ul>`;
                            subTotal += total * 1;
                        })
                        html += `<div class="pro-settleup">
                                <p>
                                    <span>总计:</span>
                                    <b class="titalPrice">¥&nbsp;${subTotal.toFixed(2)}</b>
                                </p>
                                <a href="./goodsCar.html" class="button-minicart">结算</a>
                                </div>`;
                        $(".purchase").html(html);
                        $(".cart-num").html(count);
                    }

                } else {
                    $(".purchase").html(`<div class="empty">
                            <p>
                                <span class="minicart"></span>
                                <p>您的购物车是空的，赶紧选购吧~</p> 
                            </p>
                    </div>`);
                    $(".hungBar-cart .tip").hide();
                }
            })
        }
    }
    $(".wrapper button").click(function () {
        setCookie("lgc", "", -1);
        location.reload();
    })
}

// 封装设置cookie的函数
function setCookie(key, val, day = 0, path = "/") {
    if (day) {
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = `${key}=${val};expires=${date.toUTCString()};path=${path}`;
    } else {
        document.cookie = `${key}=${val};path=${path}`;
    }
}

// 封装获取cookie的函数
function getCookie(key) {
    var cookie = document.cookie;
    var arr = cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var attr = arr[i].split("=")[0];
        var val = arr[i].split("=")[1];
        if (key == attr) {
            return val;
        }
    }
    return "";
}

// 封装  getElementsByClassName获取class名字  IE8 兼容
function getElementsByClassName(selector) {
    var all = document.getElementsByTagName("*");
    var list = [];
    for (var i = 0; i < all.length; i++) {
        var item = all[i];
        var cls = item.getAttribute("class");
        if (cls) {
            var classList = cls.split(" ");

            if (indexOf(classList, selector) != -1) {
                list.push(item);
            }
        }
    }
    return list;
}


// 封装indexOf
function indexOf(list, item) {
    var flag = -1;
    for (var i = 0; i < list.length; i++) {
        if (list[i] == item) {
            flag = i;
            break;
        }
    }
    return flag;
}

// 添加事件监听的兼容
function addEvent(ele, eventType, callback) {
    if (ele.addEventListener) {
        // 常规
        ele.addEventListener(eventType, callback);
    } else {
        // IE
        ele.attachEvent("on" + eventType, callback);
    }

}
// 删除事件监听的兼容
function removeEvent(ele, eventType, callback) {
    if (ele.removeEventListener) {
        // 常规
        ele.removeEventListener(eventType, callback);
    } else {
        // IE
        ele.detachEvent("on" + eventType, callback);
    }
}

// 阻止事件冒泡
function Bubble(e) {
    var e = e || window.event;
    if (e.stopPropagation) {
        // 常规浏览器
        e.stopPropagation();
    } else {
        // IE 浏览器
        e.cancelBubble = true;
    }
}