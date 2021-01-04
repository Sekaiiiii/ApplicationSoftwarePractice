<template>
  <div class="login-component">
    <el-container>
      <el-header></el-header>
      <el-main>
        <div class="login-form-box">
                <el-form
                   :model="user"
                   :rules="rules"
                   ref="ruleForm"
                   class="demo-ruleForm"
                >
                   <el-form-item prop="username">
                    <el-input
                      v-model="user.username"
                      @focus="clearprams('username')"
                      placeholder="请输入用户名"
                    >
                      <i slot="prefix" class="el-input__icon el-icon-user-solid"></i
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                  <!--使用获得焦点，清除之前判断结果 -->
                    <el-input
                        v-model="user.password"
                        type="password"
                        @focus="clearprams('password')"
                        placeholder="请输入密码"
                    >
                        <i slot="prefix" class="el-input__icon el-icon-key"></i
                    ></el-input>
                </el-form-item>
            </el-form>
        </div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import { login } from "@/apis/user";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^1\d{4}$|(^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$)/,
            message: "请输入5位或13位电话号码",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 希望用户在输入的时候，把之前监测判断的输入清掉(用户体验)
    // 必须要传入参数，不然会把所有其他校检清除
    clearprams(prop) {
      this.$refs.ruleForm.clearValidate(prpo);
    },
    login() {
      //validate函数里面使用一个回调函数是一个布尔值，表示input框里面的参数是否正确
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          // console.log(success, "我去登录了");
          // 发送axios请求
          let res = await login(this.user);
          console.log(res);
          console.log(res.data.message);
          if (res.data.message === "登录成功") {
            this.$message.success(res.data.message);
            // 成功登陆验证，把token，user信息存到本地
            window.localStorage.setItem(
              "toutiao_houtai_token_user",
              JSON.stringify(res.data.data)
            );
            // 登录成功跳转登录页面
            this.$router.push({ name: "index" });
          } else {
            this.$message.error(res.data.message);
          }
        } else {
          this.$message.error("输入的用户名或密码不合法");
          // console.log(success, "验证错误");
        }
      });
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.login-component {
  width: 100%;
  height: 100%;
  background-image: url("../assets/login-background-image2.jpg");
  background-size: 100%;
}
.el-icon-user {
  display: block;
  font-size: 30px;
}
.login-form-box {
  height: 240px;
  width: 400px;
  padding-top: 30px;
  padding-bottom: 15px;
  padding-right: 15px;
  padding-left: 15px;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 10%;
  background-image: url("../assets/login-form-background-image1.jpg");
}
.el-input {
  width: 400px;
}
</style>