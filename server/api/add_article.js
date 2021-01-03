'use strict'

const express = require("express");
const moment = require("moment");
const async = require("async");
const verify_login = require("../middleware/verify_login");
const verify_no_login = require("../middleware/verify_no_login");
const return_obj = require("../tool/return_obj");
const pool = require("../tool/pool");

const router = express.Router();

//验证登录
router.post("/",verify_login);

//参数检查
router.post("/",(req,res,next)=>{
    // author create_date modify_date content user_name
    if(req.body.content && req.body.title){
        next()
    }else{
        return res.send(return_obj.fail("104","缺少必要参数"));
    }
})

//业务处理
router.post("/",(req,res,next)=>{
    let content = req.body.content;
    let title = req.body.title;
    let name;
    if(req.body.name){
        name = req.body.name;
    }else{
        name = req.session.name;
    }
    let author;
    if(req.body.author){
        author = req.body.author;
    }else{
        author = req.session.name
    }
    let time = moment().format("YYYY-MM-DD hh:mm:ss");
    console.log(time);
    let sql = `
        insert into 
            article(author,create_date,modify_date,title,content,user_name)
        value (?,?,?,?,?,?)
    `
    pool.query(sql,[author,time,time,title,content,name],(err,result,fields)=>{
        if(err){
            console.error(err);
            return res.send(return_obj.fail("200","数据库接口调用出错"));
        }
        console.log(result);
        return res.send(return_obj.success({
            "msg":"添加新文章成功"
        }))
    })
})

module.exports = router;