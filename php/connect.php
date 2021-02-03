<?php
    @header("Content-Type:text/html;charset=utf-8");

    //1.连接数据库
    const host = "localhost";
    const user = "root";
    const pwd = "root";
    const dbName = "2010";
    $connect = mysqli_connect(host,user,pwd,dbName);

    // 2. 字符编码设置为utf-8
    mysqli_query($connect,"set names utf8"); //从数据库取数据时  将编码转为utf-8;
    mysqli_query($connect,"set character set utf-8");// 向数据库存数据时  将编码转为utf-8

    //3.判断数据库是否连接成功
    if(!$connect){
        exit("数据库连接失败!");
    }
?>