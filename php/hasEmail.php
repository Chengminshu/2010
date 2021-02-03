<?php

    @include_once("connect.php");
    $email = $_POST["email"];

    $search = "select * from `user` where email='$email'";
    $result = mysqli_query($connect,$search);
    $item = mysqli_fetch_assoc($result);
    $arr = array();
    if($item){
        $arr["status"] = true;
        $arr["msg"] = "该邮箱已存在";
    }else{
        $arr["status"] = false;
        $arr["msg"] = "该邮箱可以注册";
    }
    echo json_encode($arr);
?>