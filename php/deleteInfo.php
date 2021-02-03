<?php
    include_once("./connect.php");
    $ids = $_POST["ids"];
    if(!$ids){
        $arr = array();
        $arr["status"] = false;
        $arr["msg"] = "请输入完整数据";
        exit(json_encode($arr));
    }

    $search = "delete from `shopcar` where id in ($ids)";
    mysqli_query($connect,$search);
    $rows = mysqli_affected_rows($connect);  
    $msg = array();
    if($rows>0){
        $msg["status"] = true;
        $msg["msg"] = "删除成功";
    }else{
        $msg["status"] = false;
        $msg["msg"] = "删除失败";
    }
    echo json_encode($msg);


?>