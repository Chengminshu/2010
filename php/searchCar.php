<?php
    @include_once("./connect.php");
    $user = $_POST["user"];
    if(!$user){
        $arr = array();
        $arr["status"] = false;
        $arr["msg"] = "请输入完整参数";
        exit(json_encode($arr));
    }
    $search = "select s.id,s.user,s.gid,s.buyNum,g.productId,g.goodsName,g.bigList,g.price,round(s.buyNum*g.price,2) as total from `shopcar` as s,`goodlist` as g where user='$user' and s.gid = g.productId";
    $result = mysqli_query($connect,$search);
    $list = array();
    while($item = mysqli_fetch_assoc($result)){
        $item["bigList"] = explode(",",$item["bigList"]);
        $item["goodsImg"] = $item["bigList"][0];
        array_push($list,$item);
    }
    $obj = array();
    if($list){
        $obj["status"] = true;
        $obj["msg"] = "OK";
        $obj["data"] = $list;
    }else{
        $obj["status"] = false;
        $obj["msg"] = "该数据不存在";
    }
    echo json_encode($obj);
?>