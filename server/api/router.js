"use strict"

const express = require("express");

const router = express.Router();

router.use("/login",require('./login'));
router.use("/logout",require('./logout'));

router.use("/add_article",require("./add_article"));
router.use("/del_article",require("./del_article"));
router.use("/get_article",require("./get_article"));
router.use("/set_article",require("./set_article"));

router.use("/add_user",require("./add_user"));
router.use("/del_user",require("./del_user"));
router.use("/get_user",require("./get_user"));
router.use("/set_user",require("./set_user"));

module.exports = router;