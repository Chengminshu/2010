function request(url, params, type = "get") {
    return new Promise(function (resolved, reject) {
        $.ajax({
            type,
            url,
            data: {
                ...params
            },
            async: true,
            dataType: "json",
            success: function (result) {
                resolved(result);
            }
        })
    });
}

// 判断用户名、电话、邮箱是否存在
const hasUser = params => request("../php/hasUser.php", params, "post");
const hasPhone = params => request("../php/hasPhone.php", params, "post");
const hasEmail = params => request("../php/hasEmail.php", params, "post");

// // 注册登录
const register = params => request("../php/register.php", params, "post");
const login = params => request("../php/login.php", params, "post");

// 商品侧边导航
const slideInfo = params => request("../data/slideNav.json", params);

// 商品列表页渲染
const goodsInfo = params => request("../php/searchInfo.php", params);

// 商品详情页
const infoDetail = params => request("../php/searchById.php", params, "post")

// 添加购物车
const carInfo = params => request("../php/insertInfo.php", params, "post");

// 购物车渲染
const checkInfo = params => request("../php/searchCar.php", params, "post");

// 购物车按钮操作数据更新
const update = params => request("../php/updataInfo.php", params, "post");
// const updataInfo = params => request("../php/updataInfo.php", params);

// 购物车删除商品
const deleteInfo = params => request("../php/deleteInfo.php", params, "post");

// 购物车数量变化
const carCount = params => request("../php/carCount.php", params, "post");




