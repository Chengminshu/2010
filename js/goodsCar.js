$(function () {
    // 操作类型----加号还是减号
    var type = null;
    $(document).on("change", ".p-stock-text", function () {
        type = 2;
        // console.log($(this).val());
        var gid = $(this).parent().attr("gid");
        var num = $(this).val();
        update({ user, gid, num, type }).then(result => {
            if (result.status) {
                var price = $(this).parent().prev().find("span").html();
                var total = (price * 1 * num).toFixed(2);
                $(this).parent().next().html(`￥&nbsp;<span>${total}</span>`);
                getTotal();
            }
        })
    })
    /* ---------------------------------全选和反选----------------------------------- */
    $(document).on("click", ".check-all,#checkAll", function () {
        var status = $(this).prop("checked");
        $(".check-one").prop("checked", status);
        $(".check-all,#checkAll").each((index, item) => {
            if (this != item) {
                $(item).prop("checked", status);
            }
        })
        getTotal();
    })
    $(document).on("click", ".check-one", function () {
        var status = $(".check-one:checked").length > 0 && !$(".check-one").is(":not(:checked)");
        $(".check-all,#checkAll").prop("checked", status);
        getTotal();
    })
    /* --------------------------------实现加号功能------------------------------------ */
    $(document).on("click", ".add", function () {
        type = 1;
        var num = $(this).prev().val();
        num++;
        var gid = $(this).parent().attr("gid");
        update({ user, gid, num, type }).then(result => {
            if (result.status) {
                $(this).prev().val(num);
                if (num == 1) {
                    $(this).prev().prev().css({ cursor: "not-allowed" });
                } else {
                    $(this).prev().prev().css({ cursor: "pointer", color: "#000" });
                }
                var price = $(this).parent().prev().find("span").html();
                var subtotal = price * 1 * num;
                $(this).parent().next().html(`￥&nbsp;<span>${subtotal.toFixed(2)}</span>`);
                getTotal();
            }
        }).catch(err => {
            console.log(err);
        })
    })
    /* --------------------------------实现减号功能------------------------------------------ */
    $(document).on("click", ".reduce", function () {
        type = 0;
        var gid = $(this).parent().attr("gid");
        var num = $(this).next().val();
        if (num == 1) {
            return false;
        }
        num--;
        if (num <= 1) {
            $(this).css({ cursor: "not-allowed", color: "#d6d6d6" });
        } else {
            $(this).css({ cursor: "pointer", color: "#000" });
        }
        update({ user, gid, num, type }).then(result => {
            if (result.status) {
                $(this).next().val(num);
                // 更新小计
                var price = $(this).parent().prev().find("span").html();
                var subtotal = price * 1 * num;
                $(this).parent().next().html(`￥&nbsp;<span>${subtotal.toFixed(2)}</span>`);
                getTotal();
            }
        })

    })
    /* --------------------------------单删功能---------------------------------------- */
    $(document).on("click", ".p-del", function () {
        if (confirm("您是否要删除该商品?")) {
            var ids = $(this).attr("data-id");
            deleteInfo({ ids }).then(result => {
                if (result.status) {
                    $(this).parent().parent().parent().parent().remove();
                    createGood();
                }
            }).catch(err => {
                console.log(err);
            })
        }
        ischeckAll();
        getTotal();
    })
    /* ------------------------------全删功能------------------------------------ */
    $(document).on("click", ".delAll", function () {
        var list = $(".check-one:checked").map(function () {
            return $(this).parent().parent().attr("data-id");
        }).get();
        var ids = list.join(",");
        if (ids) {
            if (confirm("您是否删除选中商品?")) {
                deleteInfo({ ids }).then(result => {
                    if (result.status) {
                        $(this).parent().parent().parent().remove();
                        createGood();
                    }
                })

            }
        } else {
            alert("请选中你要删除的商品~");
        }
        ischeckAll();
        getTotal();
    })
    /* --------------------------------结算功能-------------------------------- */
    function getTotal() {
        var sum = 0;
        var total = 0;
        $(".check-one").each(function () {
            if ($(this).prop("checked")) {
                var price = $(this).parent().next().find(".p-price-total>span").html() * 1;
                var value = $(this).parent().next().find(".p-stock-text").val() * 1;
                sum += value;
                total += price;
            }
            $(".total-choose>em").html(sum);
            $(".total-price span").html(total.toFixed(2));
        })
    }
    /* --------------------------------判断是否全选----------------------------- */
    function ischeckAll() {
        if ($(".check-one").length == 0) {
            $(".check-all,#checkAll").prop("checked", false);
            return false;
        }
        var list = Array.from($(".check-one"));
        var flag = list.every((item) => {
            return item.checked == true;
        });
        $(".check-all,#checkAll").prop("checked", flag);
    }

    /* -----------------------------------判断用户是否登录------------------------- */
    var user = getCookie("lgc");
    if (user) {
        createGood();
    } else {
        location.href = "./login.html?returnUrl=" + encodeURIComponent(location.href);
    }
    createCar();

    function createGood() {
        checkInfo({ user }).then(result => {
            if (result.status) {
                let { status, data } = result;
                var html = `
                <div class="pro-title">
                    <label class="checkbox">
                        <input type="checkbox" class="check-all">
                        <span>全选</span>
                    </label>
                    <ul>
                        <li>商品</li>
                        <li>单价</li>
                        <li>数量</li>
                        <li>小计</li>
                        <li>操作</li>
                    </ul>
                </div>
                <div id="wrapper">`;
                data.forEach(({ id, gid, buyNum, goodsName, price, total, goodsImg }) => {
                    html += `<div class="pro-list" data-id="${id}">
                            <label class="checkbox">
                                <input type="checkbox" class="check-one">
                            </label>
                            <div class="sc-pro-main">
                                <a href="javascript:;" class="p-img left">
                                    <img src="${goodsImg}" alt="">
                                </a>
                                <ul class="left">
                                    <li>
                                        <a href="#" class="p-name">
                                            ${goodsName}
                                        </a>
                                        <p class="p-info">
                                            亮黑色 4G全网通 8GB+256GB 官方标配
                                        </p>
                                    </li>
                                    <li class="p-price">
                                        ￥&nbsp;<span>${price}</span>
                                    </li>
                                    <li class="p-stock" gid=${gid}>
                                        <a href="javascript:;" class="reduce btn">-</a>
                                        <input type="text" class="p-stock-text" value="${buyNum}">
                                        <a href="javascript:;" class="add btn">+</a>
                                    </li>
                                    <li class="p-price-total">
                                        ¥ <span>${total}</span>
                                    </li>
                                    <li>
                                        <a href="javascript:;" class="p-del"  data-id="${id}">删除</a>
                                    </li>
                                </ul>
                            </div>
                        </div>`;
                })
                html += ` <div class="total-tool">
                        <div class="total-control left">
                            <label class="checkbox">
                                <input type="checkbox" id="checkAll">
                                <span>全选</span>
                            </label>
                            <a href="javascript:;" class="delAll">删除</a>
                        </div>
                        <div class="total-btn right">
                            <a href="javascript:;">立即结算</a>
                        </div>
                        <div class="total-price right">
                            <p>
                                <label>总计:
                                    ￥&nbsp;<span> 0.00</span>
                                </label>
                            </p>
                            <div class="total-choose">
                                已选择
                                <em>0</em>
                                件商品
                            </div>
                        </div>
                    </div>`;
                $(".sc-list .container").html(html);

                // 判断搜索框的值是否大于1
                var inputValue = $(".p-stock-text").val();
                if (inputValue <= 1) {
                    $(".add").prev().prev().css({ cursor: "not-allowed" });
                } else {
                    $(".add").prev().prev().css({ cursor: "pointer", color: "#000" });
                }
            } else {
                $(".account").html(` 
                <div class="sc-empty">
                    <div class="container">
                        <span class="minicart"></span>
                        <p>您的购物车里什么也没有哦</p>
                        <a href="./goodsList.html">去逛逛</a>
                    </div>
                </div>`);
            }
        })
    }
})
