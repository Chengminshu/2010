<?php

    @include_once("connect.php");
    $user = $_POST["user"];

    $search = "select * from `user` where username='$user'";
    $result = mysqli_query($connect,$search);
    $item = mysqli_fetch_assoc($result);
    $arr = array();
    if($item){
        $arr["status"] = true;
        $arr["msg"] = "该用户已存在";
    }else{
        $arr["status"] = false;
        $arr["msg"] = "√";
    }
    echo json_encode($arr);
?>