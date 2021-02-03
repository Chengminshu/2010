<?php
    @include_once("connect.php");
    // 4. 获取用户信息
    $account = $_POST["account"];
    $pwd = $_POST["pwd"];
    $arr = array();
    if($account&&$pwd){
        // 5.编写sql语句
        $search = "select * from `user` where username='$account' or phone = '$account' or email = '$account'";
        
        //6. 发送sql语句
        $result = mysqli_query($connect,$search);
        // 7. 用户名验证
        $item = mysqli_fetch_assoc($result);
        if($item){
            if($pwd == $item["password"]){
                $arr["status"]=true;
                $arr['msg']="登录成功!";
                $arr['user'] = $item["username"];
            }else{
                $arr["status"]=false;
                $arr['msg']="用户名或者密码错误!";
            }
        }else{
            $arr["status"]=false;
            $arr['msg']="用户名未注册!";
        }
    }else{
        $arr["status"]=false;
        $arr['msg']="用户名密码不能为空!";
    }
    echo json_encode($arr);

?>