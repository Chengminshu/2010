$(function () {
    /*-----------------------------跳转至列表页-------------------------- */
    $(".button").click(function () {
        location.href = "./goodsList.html";
    })
    /* ----------------------------设置cookie------------------------------ */
    createCar();

    /* ---------------------------------------------商品导航的动态生成------------------------ */
    slideInfo({}).then(function (result) {
        var arr = result.sideNav;
        var html = "";
        arr.forEach(item => {
            var { title, child } = item;
            html += `<li class="category-item"><a href="javascript:;">${title}</a><i
        class="iconfont icon-jiantou_liebiaoxiangyou"></i>
    <div class="category-panels"><ul class="subcat-list left">`;
            child.forEach(({ title, img }, index) => {
                html += `<li>
                <a href="javascript:;">
                    <img src="${img}" alt="">
                    <p>${title}</p>
                </a>
            </li>`;
                if ((index + 1) % 5 == 0) {
                    html += `</ul><ul class="subcat-list left">`
                }
            })
            html += `<div class="subcate-btn">
            <a href="javascript:;" class="btn">
                查看全部
            </a>
            <span class="angle"></span>
        </div></ul></li>`;

        })
        $(".category-list").html(html);
        $(".category-list>li").each(function (index) {
            if (index == 0 || index == 1 || index == 2 || index == 4 || index == 10) {
                $(this).find(".category-panels").addClass("category-panels-2");
            } else if (index == 3 || index == 5 || index == 6 || index == 9) {
                $(this).find(".category-panels").addClass("category-panels-1");
            } else {
                $(this).find(".category-panels").addClass("category-panels-3");
            }
        })
        $(".category-list").hide();
        $(".nav-list li").first().mouseenter(function () {
            $(".category-list").show();
            $(".category-list li").first().find("div").show();
        }).mouseleave(function () {
            $(".category-list").hide();
        })
        $(".category-list").mouseenter(function () {
            $(".category-list").show();
        }).mouseleave(function () {
            $(".category-list").hide();
        })

    }).catch(err => {
        console.log(err);
    })

    /* -------------------------------------------放大镜-------------------------------- */
    $(document).on("mousemove", ".product-gallery-img", function (e) {
        $(".showImg").fadeIn();
        $(".bigImg").show();
        $(".sub").show();
        var maxLeft = $(".product-gallery-img").width() - $(".sub").width();
        var maxTop = $(".product-gallery-img").height() - $(".sub").height();
        var x = e.pageX - $(".product .container").prop('offsetLeft') - $(".sub").width() / 2;
        var y = e.pageY - $(".product .container").prop("offsetTop") - $(".sub").height() / 2;
        // 获取放大倍数
        var scale = $(".bigImg").width() / $(".smallImg").width();
        if (x < 0) {
            x = 0;
        }
        if (x > maxLeft) {
            x = maxLeft;
        }
        if (y < 0) {
            y = 0;
        }
        if (y > maxTop) {
            y = maxTop;
        }
        $(".sub").css({ left: x, top: y });
        $(".bigImg").css({ left: -scale * x, top: -scale * y });
    })
    $(document).on("mouseleave", ".product-gallery-img", function () {
        $(".showImg").stop().fadeOut();
        $(".bigImg").stop().hide();
        $(".sub").hide();
    })

    /* ----------------------------------图片数据库请求----------------------- */
    var search = location.search;
    if (search) {
        var gid = search.split("=")[1];
        infoDetail({ gid }).then(function (result) {
            if (result.status == false) {
                location.href = "./index.html";
                return false;
            }
            let { status, msg, data: { productId, goodsName, slogan, price, smallList, bigList } } = result;
            var leftHtml = ` <div class="product-gallery">
                <div class="product-gallery-img">
                    <div class="sub"></div>
                    <img src="${bigList[0]}" alt="" class="smallImg">
                </div>
                <div class="showImg">
                    <img class="bigImg" src="${bigList[0]}" alt="">
                </div>
                <div class="product-gallery-nav">
                    <a href="javascript:;" class="product-gallery-back"></a>
                    <ul id="pro-gallerys">
                    </ul>
                    <a href="javascript:;" class="product-gallery-next"></a>
                </div>
            </div>`;
            $(".product-left").html(leftHtml);
            var imgHtml = "";
            smallList.forEach(item => {
                imgHtml += `<li><a href="javascript:;"><img src="${item}" alt=""></a></li>`
            })
            $("#pro-gallerys").html(imgHtml);
            $("#pro-gallerys li").eq(0).addClass("active");

            // 商品详情
            var rightHtml = `<h1 id="pro-name">${goodsName}</h1>
                <div class="product-slogan">
                    <span class="product-slogan-link">10:08限时开售</span>
                    <span>${slogan}</span>
                </div>
                <!-- 商品简介 -->
                <div class="product-info-list">
                    <div class="product-info">
                        <label>价&emsp;&emsp;格</label>
                        <span class="pro-price"><em>￥</em>${price}</span>
                    </div>
                    <div class="product-info">
                        <label class="left">促&emsp;&emsp;销</label>
                        <div class="product-prom-item left">
                            <em>赠送积分</em>
                            <div class="product-prom-con">购买即赠商城积分，积分可抵现~</div>
                        </div>
                    </div>
                </div>
                <!-- 服务说明 -->
                <div class="product-pulldown">
                    <label>服务说明</label>
                    <div class="product-address">
                        <span>预计1月30日前发货</span>
                        <ul class="product-description-list">
                            <li><i class="iconfont icon-gou1"></i> 已满48元已免运费</li>
                            <li><i class="iconfont icon-gou1"></i>由华为商城负责发货，并提供售后服务</li>
                        </ul>
                    </div>
                </div>
                <!-- 编码说明 -->
                <div class="product-description">
                    <label>商品编码</label>
                    <span>2601010250401</span>
                </div>
                <div class="pro-skus">
                    <div class="product-choose">
                        <label>选择颜色</label>
                        <ul>
                            <li>
                                <a href="javascript:;">
                                    <img src="../images/92.png" alt="">
                                    <p>亮黑色</p>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src="../images/92.png" alt="">
                                    <p>普罗旺斯</p>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src="../images/92.png" alt="">
                                    <p>8号色</p>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src="../images/92.png" alt="">
                                    <p>绮境森林</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="product-choose">
                        <label>选择颜色</label>
                        <ul>
                            <li>
                                <a href="javascript:;">
                                    <p>5G全网通 8GB+128GB</p>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <p>5G全网通 8GB+256GB</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="product-choose">
                        <label>选择套餐</label>
                        <ul>
                            <li>
                                <a href="javascript:;">
                                    <p>官方标配</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 提交操作 -->
                <div class="product-operation">
                    <div class="product-stock left">
                        <input type="text" class="product-stock-text" value="1" disabled>
                        <div class="product-stock-btn">
                            <a href="javascript:;" class="add">+</a>
                            <a href="javascript:;" class="reduce">-</a>
                        </div>
                    </div>
                    <a href="javascript:;" class="product-button01 left">加入购物车</a>
                    <a href="javascript:;" class="product-button02 left">立即下单</a>
                </div>`;
            $(".product-meta").html(rightHtml);
            $(".add").css({ color: "#000" });
            //  鼠标移动  图片切换
            $(".showImg").fadeIn(0).fadeOut(0);
            $("#pro-gallerys li").mouseenter(function () {
                $(this).addClass("active").siblings().removeClass("active");
                $(".smallImg").prop("src", bigList[$(this).index()]);
                $(".bigImg").prop("src", bigList[$(this).index()]);
            })


            /* -----------------------------------加入购物车判断---------------------------- */
            $(document).on("click", ".product-button01", function () {
                var user = getCookie("lgc");
                if (user) {
                    var goodsImg = bigList[0];
                    var buyNum = $(".product-stock-text").val();
                    carInfo({ user, productId, buyNum }).then(result => {
                        createCar();
                        if (confirm("是否要跳转至购物车?")) {
                            location.href = "./goodsCar.html";
                        }
                    }).catch(err => {
                        console.log(err);
                    })

                } else {
                    location.href = "./login.html?returnUrl=" + encodeURIComponent(location.href);
                }
            })
        })
    } else {
        location.href = "./goodsList.html";
    }


    /* ----------------------------------------详情页增加减少功能-------------------------------- */
    $(document).on("click", ".add", function () {
        var num = $(this).parent().prev().val();
        num++;
        if (num == 1) {
            $(this).next().css({ cursor: "not-allowed" });
        } else {
            $(this).next().css({ cursor: "pointer", color: "#000" });
        }
        $(this).parent().prev().val(num);
    })
    $(document).on("click", ".reduce", function () {
        var num = $(this).parent().prev().val();
        if (num == 1) {
            $(this).css({ cursor: "not-allowed" });
            return false;
        }
        num--;
        if (num <= 1) {
            $(this).css({ cursor: "not-allowed", color: "#c4c4c4" });
        } else {
            $(this).css({ cursor: "pointer", color: "#000" });
        }
        $(this).parent().prev().val(num);
    })
})
