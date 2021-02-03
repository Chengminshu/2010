<?php
    @include_once("./connect.php");
    $id = $_POST["gid"];
    if(!$id){
        $arr = array();
        $arr["status"] = false;
        $arr["msg"] = "请输入完整参数";
        exit(json_encode($arr));
    }
    $search = "select * from `goodlist` where productId='$id';";
    $result = mysqli_query($connect,$search);
    $item = mysqli_fetch_assoc($result);
    $obj = array();
    if($item){
        // 数据处理
        $item["bigList"] = explode(",",$item["bigList"]);
        $item["smallList"] = explode(",",$item["smallList"]);
        $obj["status"] = true;
        $obj["msg"] = "OK";
        $obj["data"] = $item;
    }else{
        $obj["status"] = false;
        $obj["msg"] = "该数据不存在";
    }
    echo json_encode($obj);
?>