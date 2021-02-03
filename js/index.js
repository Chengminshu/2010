$(function () {
    /*-----------------------------跳转至列表页-------------------------- */
    $(".button").click(function () {
        location.href = "./goodsList.html";
    })
    /* ----------------------------设置cookie------------------------------ */
    createCar();

    /* ---------------------------------跳转商品列表----------------------------------- */
    $(".more").click(function () {
        location.href = "./goodsList.html";
    })

    /* --------------------------------顶部图片-------------------------------------- */
    $(".close").click(function () {
        $(".top-banner").hide();
    })
    /* ----------------------------------登录/注册跳转---------------------------- */
    $(".loginBtn").click(function () {
        location.href = "../html/login.html";
    })
    $(".registerBtn").click(function () {
        location.href = "../html/register.html";
    })

    /* ------------------------------------轮播图-------------------------------------------------- */
    var index = 0;
    var timer = null;
    var isClick = false; // 是否已经被点击(默认没有)
    var slideWidth = $(".imgList>li").width();
    autoPlay();
    $(".dotList>li").click(function () {
        clearTimeout(timer);
        var i = $(this).index();
        // 跳过点击可以无缝衔接
        if (Math.abs(index - i) > 1) {
            var count = i > index ? i - 1 : i + 1;
            $(".imgList").css({ left: -slideWidth * count });
            $(".imgList").stop().animate({
                left: -slideWidth * count
            }, 100)
        }
        index = i;
        $(".dotList>li").eq(index).addClass("active").siblings().removeClass("active");
        $(".imgList").stop().animate({
            left: -slideWidth * index
        }, 300);
    })
    // 自动播放
    function autoPlay() {
        clearTimeout(timer);
        timer = setTimeout(function () {
            index++;
            $(".dotList>li").eq(index == $(".imgList li").length - 1 ? 0 : index).addClass("active").siblings().removeClass("active");
            $(".imgList").stop().animate({
                left: -slideWidth * index
            }, function () {
                if (index == $(".imgList li").length - 1) {
                    index = 0;
                    $(".imgList").css({ left: 0 });
                }
                autoPlay();
            })
        }, 3000)
    }
    // 添加鼠标移入移出事件
    $(".banner").mouseenter(function () {
        clearTimeout(timer);
        $(".leftBtn").css({ backgroundPosition: "-240px -72px" });
        $(".rightBtn").css({ backgroundPosition: "-160px -72px" });
    }).mouseleave(function () {
        $(".leftBtn").css({ backgroundPosition: "0 -72px" });
        $(".rightBtn").css({ backgroundPosition: "-80px -72px" });
        autoPlay();
    })

    // 左边  上一张
    $(".leftBtn").click(function () {
        clearTimeout(timer);
        if (isClick) {
            return false;
        }
        isClick = true;
        index--;
        if (index == -1) {
            index = $(".imgList li").length - 1;
            $(".imgList").css({ left: -slideWidth * index }); // 图片先移动到第五张
            index--; // 下标减一
        }
        console.log(index);
        // 对应小圆点切换
        $(".dotList>li").eq(index).addClass("active").siblings().removeClass("active");
        $(".imgList").stop().animate({
            left: -slideWidth * index
        }, function () {
            isClick = false;
        })
    })

    // 右边  下一张
    $(".rightBtn").click(function () {
        clearTimeout(timer);
        //防止连续点击
        if (isClick) { // 如果被点击
            return false;
        }
        isClick = true; // 已经被点击了 (只要本次运动没有结束  isClick=true)
        index++;
        $(".dotList>li").eq(index == $(".imgList li").length - 1 ? 0 : index).addClass("active").siblings().removeClass("active");
        $(".imgList").stop().animate({
            left: -slideWidth * index
        }, function () {
            isClick = false;
            if (index == $(".imgList li").length - 1) {
                index = 0;
                $(".imgList").css({ left: 0 });
            }
        })
    })

    /* -------------------------------------图片切换(渐变轮播)--------------------------------- */
    $(".slide-list>li").fadeOut(0).eq(0).fadeIn(0);
    var mTimer = null;
    var mIndex = 0;
    var prevEle = $(".slide-list li").eq(mIndex);
    autoPlayMin();
    $(".poiner-list>a").on("click", function () {
        // 点击之前先关闭定时器,防止点击的时候切换图片
        clearTimeout(mTimer);
        mIndex = $(this).index();
        if (prevEle) {
            $(prevEle).fadeOut();
        }
        prevEle = $(".slide-list>li").eq(mIndex);
        $(".slide-list>li").eq(mIndex).fadeIn();
        $(".poiner-list>a").eq(mIndex).addClass("active").siblings().removeClass("active");
    })
    $(".banner-slideshow").mouseenter(function () {
        clearTimeout(mTimer);
    }).mouseleave(function () {
        autoPlayMin();
    })
    // // 自动切换
    function autoPlayMin() {
        clearTimeout(mTimer);
        mTimer = setTimeout(function () {
            mIndex++;
            if (mIndex > $(".slide-list li").length - 1) {
                mIndex = 0;
            }
            $(prevEle).fadeOut();
            prevEle = $(".slide-list>li").eq(mIndex);
            $(".poiner-list>a").removeClass("active").eq(mIndex == $(".slide-list li").length ? 0 : mIndex).addClass("active");
            $(".slide-list>li").eq(mIndex).fadeIn(function () {
                autoPlayMin();
            })
        }, 3000)
    }

    /* ----------------------------------------公告信息切换----------------------------------- */
    var infoTimer = null;
    var infoIndex = 0;
    var infoHeight = $(".info-list>li").first().height();
    autoChange();
    function autoChange() {
        clearTimeout(infoTimer);
        infoTimer = setTimeout(function () {
            infoIndex++;
            $(".info-list").stop().animate({
                top: -infoHeight * infoIndex
            }, function () {
                if (infoIndex == $(".info-list>li").length - 1) {
                    infoIndex = 0;
                    $(".info-list").css({ top: 0 });
                    // infoBox.style.top = 0 + "px";
                }
                autoChange();
            })
        }, 3000)
    }


    /* ---------------------------------------------商品导航的动态生成------------------------ */
    slideInfo({}).then(function (result) {
        var arr = result.sideNav;
        var html = "";
        arr.forEach(item => {
            var { title, child } = item;
            html += `<li class="category-item"><a href="javascript:;">${title}</a><i
            class="iconfont icon-jiantou_liebiaoxiangyou"></i>
        <div class="category-panels"><ul class="subcat-list left">`;
            child.forEach(({ title, img }, i) => {
                html += `<li>
                    <a href="javascript:;">
                        <img src="${img}" alt="">
                        <p>${title}</p>
                    </a>
                </li>`;
                if ((i + 1) % 5 == 0) {
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
        $(".category-list>li").each(function (idx) {
            if (idx == 0 || idx == 1 || idx == 2 || idx == 4 || idx == 10) {
                $(this).find(".category-panels").addClass("category-panels-2");
            } else if (idx == 3 || idx == 5 || idx == 6 || idx == 9) {
                $(this).find(".category-panels").addClass("category-panels-1");
            } else {
                $(this).find(".category-panels").addClass("category-panels-3");
            }
        })
    }).catch(err => {
        console.log(err);
    })



})



