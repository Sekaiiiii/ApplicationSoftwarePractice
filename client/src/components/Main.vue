<template>
  <div class="index">
    <!-- 使用element-ui  container页面布局 --> 
    <el-container>
      <el-header height="80px">
        <div class="header-title">
          <h1>后台管理子系统首页</h1>
        </div>
      </el-header>
      <el-main>
        <el-row class="card-row" :gutter="40">
          <el-col :span="8">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>用户信息</span>
                <el-link href="/#/index/user" style="float: right; padding: 3px 0">GOTO</el-link>
              </div>
              <div>
                <span>用户数量:</span>
                <span style="float:right">{{user_num}}</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>文章信息</span>
                <el-link href="/#/index/article" style="float: right; padding: 3px 0">GOTO</el-link>
              </div>
              <div>
                <span>文章数量:</span>
                <span style="float:right">{{article_num}}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      user_num: "",
      article_num: ""
    };
  },
  methods: {
    check_cache() {
      //从vuex里面找
      let vm = this;
      if (vm.$store.state.main_page_cache.user_num == "") {
        vm.get_user_num();
      } else {
        vm.user_num = vm.$store.state.main_page_cache.user_num;
      }
      if (vm.$store.state.main_page_cache.article_num == "") {
        vm.get_article_num();
      } else {
        vm.article_num = vm.$store.state.main_page_cache.article_num;
      }
    },
    get_user_num() {
      let vm = this;
      let baseurl = "/api/get_user";
      vm.$http
        .get(baseurl)
        .then(res => {
          if (res.data.status == 1) {
            vm.user_num = res.data.data.data.length;
            vm.$store.commit("setMainPageCacheUserNum", vm.user_num);
          } else {
            vm.$message({
              message: res.data.error_des
            });
          }
        })
        .catch(err => {
          console.error(err);
          vm.$message({
            message: "请求失败，请重试",
            center: true
          });
        });
    },
    get_article_num() {
      let vm = this;
      let baseurl = "/api/get_article";
      vm.$http
        .get(baseurl)
        .then(res => {
          if (res.data.status == 1) {
            vm.article_num = res.data.data.data.length;
            vm.$store.commit("setMainPageCacheArticleNum", vm.article_num);
          } else {
            vm.$message({
              message: res.data.error_des
            });
          }
        })
        .catch(err => {
          console.error(err);
          vm.$message({
            message: "请求失败，请重试",
            center: true
          });
        });
    }
  },
  created() {
    var vm = this;
    vm.check_cache();
  }
};
</script>



<style>
.main-component .header-title {
  height: 100%;
  width: 100%;
  font-size: 40px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  text-align: center;
  padding-top: 20px;
}

.main-component .card-row {
  padding: 30px;
}

</style>