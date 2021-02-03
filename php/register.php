<?php
    @include_once("connect.php");

    // 4. 获取用户信息
    $user = $_POST["user"];
    $pwd = $_POST["pwd"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $item = array();
    if($user&&$pwd&&$phone&&$email){
        // 5.编写sql语句
        $search = "insert into `user` (username,password,phone,email) values ('$user','$pwd','$phone','$email');";
        
        //6. 发送sql语句
        mysqli_query($connect,$search);
        // 7. 用户名验证
        $rows = mysqli_affected_rows($connect);
        if($rows>0){
            $item["status"] = true;
            $item["msg"] = "注册成功";
        }else{
            $item["status"] = false;
            $item["msg"] = "用户已存在!注册失败";
            $item["sql"] = $search;
        }
    }else{
        $item["status"]=false;
        $item['msg']="发生意外错误!";
    }
    echo json_encode($item);


    // 8.关闭数据库

    // close();

?>