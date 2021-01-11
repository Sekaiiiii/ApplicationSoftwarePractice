'use strict'

const express = require("express");
const async = require("async");
const verify_login = require("../middleware/verify_login");
const verify_no_login = require("../middleware/verify_no_login");
const return_obj = require("../tool/return_obj");
const pool = require("../tool/pool");

const router = express.Router();


//验证登录
router.get("/",verify_login);

//参数检查
router.get("/",(req,res,next)=>{
    next()
})

//业务处理
router.get("/",(req,res,next)=>{
    let author = "%"
    if(req.query.author){
        author = "%" + req.query.author + "%";
    }
    let content = "%"
    if(req.query.content){
        content = "%" + req.query.content + "%";
    }
    let title = "%"
    if(req.query.title){
        title = "%" + req.query.title + "%";
    }
    let name = "%"
    if(req.query.name){
        name = "%" + req.query.name + "%";
    }
    let sql = `
    select * from article 
    where
        author like ? and
        user_name like ? and
        title like ? and
        content like ?
    `
    pool.query(sql,[author,name,title,content],(err,result,fields)=>{
        if(err){
            console.error(err);
            return res.send(return_obj.fail("200","调用数据库接口出错"));
        }
        return res.send(return_obj.success({
            "msg":"获取文章信息成功",
            "data":result
        }))
    })
})

module.exports = router;