<?php
    @include_once("connect.php");
    $user = $_POST["user"];
    $gid = $_POST["gid"];
    $buyNum = $_POST["num"];
    $type = $_POST["type"]; // 0=>减   1=>加   2=> 自己输入
    if(!($gid&&$buyNum&&$user)){
        $arr = array();
        $arr["status"] = false;
        $arr["msg"] = "请输入完整数据";
        exit(json_encode($arr));
    }
    $search = "select * from `shopcar` where user='$user' and gid = '$gid'";
    $result = mysqli_query($connect,$search);
    $item = mysqli_fetch_assoc($result);
    if($item){
        if($type == 1){
            $sql = "update `shopcar` set buyNum = buyNum+1 where user='$user' and gid = '$gid'";
        }else if($type == 2){
            $sql = "update `shopcar` set buyNum = $buyNum where user='$user' and gid = '$gid'";
        }else{
            $sql = "update `shopcar` set buyNum = buyNum-1 where user='$user' and gid = '$gid'";
        }
    }
    mysqli_query($connect,$sql);
    $rows = mysqli_affected_rows($connect);  
    $obj = array();
    if($rows>0){
        $obj["status"] = true;
        $obj["msg"] = "修改成功";
    }else{
        $obj["status"] = false;
        $obj["msg"] = "修改失败";
    }
    echo json_encode($obj);
?>