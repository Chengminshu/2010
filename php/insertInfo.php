<?php
    @include_once("connect.php");
    $user = $_POST["user"];
    $gid = $_POST["productId"];
    $buyNum = $_POST["buyNum"];
    if(!($gid&&$buyNum&&$user)){
        $arr = array();
        $arr["status"] = false;
        $arr["msg"] = "请输入完整数据";
        exit(json_encode($arr));
    }
    $search = "select * from `shopcar` where user='$user' and gid='$gid'";
    $result = mysqli_query($connect,$search);
    $item = mysqli_fetch_assoc($result);
    if($item){
        $sql = "update `shopcar` set buyNum = buyNum+$buyNum where user='$user' and gid = '$gid'";
    }else{
        $sql = "insert into `shopcar` (user,gid,buyNum) values ('$user','$gid',$buyNum)";
    }
    mysqli_query($connect,$sql);
    $rows = mysqli_affected_rows($connect);  
    $obj = array();
    if($rows>0){
        $obj["status"] = true;
        $obj["msg"] = "添加成功";
    }else{
        $obj["status"] = false;
        $obj["msg"] = "添加失败";
    }
    echo json_encode($obj);
?>