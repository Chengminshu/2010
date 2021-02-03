<?php
    @include_once("./connect.php");
    
    $key = $_GET["key"];
    $orderType = $_GET["orderType"];
    $orderCol = $_GET["orderCol"];
    $showNum = $_GET["showNum"];
    $pageIndex = $_GET["pageIndex"];

    if(!($showNum&&$orderType&&$orderCol&&$pageIndex)){
        $arr = array();
        $arr["status"] = false;
        $arr["msg"] = "请输入完整参数";
        exit(json_encode($arr));
    }
    // 获取信息总条数
    $search = "select count(*) as count from `goodlist` where goodsName like '%$key%'";
    $result = mysqli_query($connect,$search);
    $item = mysqli_fetch_assoc($result);
    $count = $item["count"];

    // 获取最大页数
    $maxPage = ceil($count/$showNum);
    if($pageIndex >= $maxPage){
        $pageIndex = $maxPage;
    }
    if($pageIndex <= 1){
        $pageIndex = 1;
    }

    // 跳过的条数
    $skipNum = ($pageIndex-1)*$showNum;


    $search = "select productId,goodsName,slogan,price,smallList,bigList from `goodlist` where goodsName like '%$key%' order by $orderCol*1 $orderType limit $skipNum,$showNum";
    $result = mysqli_query($connect,$search);
    $all = array();
    while($item = mysqli_fetch_assoc($result)){
         // 数据处理 
         $str = $item["bigList"];
         $item["bigList"] = explode(",",$str);
         $item["goodsImg"] = $item["bigList"][0];
        array_push($all,$item);
    }
    $obj = array();
    $obj["maxPage"] = $maxPage;  // 最大页码
    $obj["current"] = $pageIndex; // 当前页
    $obj["count"] = $count;  // 总数量
    $obj["data"] = $all;
    echo json_encode($obj);

?>