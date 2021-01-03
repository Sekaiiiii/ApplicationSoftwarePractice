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
    //可以修改的参数有 content title author user_name
    if(req.body.content || req.body.title || req.body.author || req.body.user_name && req.body.id){
        
        next()
    }else{
        return res.send(return_obj.fail("104","缺少必要的参数"));
    }
})

//业务处理
router.post("/",(req,res,next)=>{
    let param = {};
    let id = req.body.id;
    if(req.body.content){
        param.content = req.body.content
    }
    if(req.body.title){
        param.title = req.body.title
    }
    if(req.body.author){
        param.author = req.body.author
    }
    if(req.body.name){
        param.user_name = req.body.name
    }
    param.modify_date = moment().format("YYYY-MM-DD hh-mm-ss");
    let sql = `
    update article set ? where id_article = ?
    `
    pool.query(sql,[param,id],(err,result,fields)=>{
        if(err){
            console.error(err);
            return res.send(return_obj.fail("200","调用数据库接口出错"));
        }
        if(result.affectedRows === 0){
            return res.send(return_obj.fail("201","数据库找不到对应的文章"));
        }
        res.send(return_obj.success({
            'msg':"更新文章信息成功"
        }))
    })
    
})

module.exports = router;