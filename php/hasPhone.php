<?php

    @include_once("connect.php");
    $phone = $_POST["phone"];

    $search = "select * from `user` where phone='$phone'";
    $result = mysqli_query($connect,$search);
    $item = mysqli_fetch_assoc($result);
    $arr = array();
    if($item){
        $arr["status"] = true;
        $arr["msg"] = "该手机号已存在";
    }else{
        $arr["status"] = false;
        $arr["msg"] = "该手机号可以注册";
    }
    echo json_encode($arr);
?>