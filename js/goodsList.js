$(function () {

    /* ----------------------------设置cookie------------------------------ */
    createCar();

    var key = "";
    var orderCol = "id";
    var orderType = "asc";
    var pageIndex = 1;
    var showNum = 15;

    var search = location.search;
    if (search) {
        var strUrl = search.split("=")[1];
        var html = ` <a href="./index.html">首页</a>
            &nbsp;>&nbsp;
            <a href="./goodsList.html">手机</a>
            &nbsp;>&nbsp;`;
        if (strUrl === 'enjoy') {
            key = '畅享';
            html += `<span>华为畅享系列</span>`;
        } else if (strUrl === 'Maimang') {
            key = '麦芒';
            html += `<span>华为麦芒系列</span>`;
        } else {
            key = strUrl;
            html += `<span>HUAWEI ${key}系列</span>`;
        }
        $(".bread").html(html);
    } else {
        $(".bread").html(` <a href="./index.html">首页</a>
        &nbsp;>&nbsp;
        <span>手机</span>`)
    }
    getGood();

    /* --------------------------------排序方式切换----------------------------- */
    $(".sort-type").on("click", "li", function () {
        orderCol = $(this).attr("id");
        $(this).addClass("select").siblings().removeClass("select");
        getGood();
    })
    $(".button").click(function () {
        key = $(".search-bar input").get(0).value;
        getGood();
    })
    /* --------------------------------升序、降序---------------------------------- */
    $(".sort").on("click", "p", function () {
        orderType = $(this).attr("id");
        getGood();
    })
    function getGood() {
        goodsInfo({ key, orderCol, orderType, pageIndex, showNum }).then(result => {
            let { count, maxPage, data } = result;
            if (data.length > 0) {
                pageIndex = pageIndex > maxPage ? maxPage : pageIndex;
                var html = "";
                data.forEach(({ productId, goodsName, price, goodsImg }) => {
                    html += `<li>
                    <a class="pro-panels" href="./goodsDesc.html?gid=${productId}">
                        <p class="p-img"><img src="${goodsImg}" alt=""></p>
                        <p class="p-name">${goodsName}</p>
                        <p class="p-price cl">
                            <b>¥<span>${price}</span>起</b>
                            <span>多款可选</span>
                        </p>
                        <p class="p-label cl">
                            <span>分期免息</span>
                            <span>赠送积分</span>
                        </p>
                        <p class="p-comment">
                            <em><span>32560</span>人评价</em>
                            <em><span>97</span>%好评</em>
                        </p>
                    </a>
                </li>`;
                })
                $(".goods-list").html(html);
                $(".bar").pagination({
                    totalData: count,
                    showData: showNum,
                    pageCount: maxPage,
                    isHide: true,
                    mode: "fixed",
                    count: maxPage - 1,
                    current: pageIndex,
                    coping: true,
                    homePage: "首页",
                    endPage: "尾页",
                    jump: true,
                    jumpBtn: "go",
                    callback(api) {
                        pageIndex = api.getCurrent();
                        getGood();
                    }
                })
            } else {
                $(".goods-list").html(`<div class="null">数据还在路上喔~</div>`)
            }
        })
    }

})