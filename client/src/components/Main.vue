<template>
  <div class="index">
    <!-- 使用element-ui  container页面布局 --> 
    <el-container>
      <!-- 使用NavMenu 导航菜单 -->
      <el-aside width="200px">
        <div class="logo" @click="$router.push({ path: '/index' })"></div>
        <!-- 开启router模式，index会变成path进行跳转 -->
        <!-- 开启unique-opened 点开一个分列，其他分列就会收起-->
        <el-menu
          default-active="$router.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
          :unique-opened="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <!-- 使用 vue-router 的模式，启用该模式会在激活导航时以 
              index 作为 path 进行路由跳转 -->
              <el-menu-item index="/index/user">个人中心</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/articleList">文章列表</el-menu-item>
              <el-menu-item index="/index/articlePublish">文章发布</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>栏目管理</span>
            </template>
            <el-menu-item-group>
            <!-- index必须 全路径 ，才能令 default-active="$route.path" 生效 -->
              <el-menu-item index="/index/categoryList">栏目列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <!-- 导航栏完成 -->
      </el-aside>
      <el-container>
        <el-header>
          <div class="left el-icon-s-fold system-title"></div>
          <div class="title system-title">头条后台管理系统</div>
          <div class="right" style="color: #fff">
            <!-- 动态生成用户名称 -->
            欢迎你:{{ nickname }}
            <el-button type="danger" @click="exit">退出</el-button>
          </div>
        </el-header>
        <!-- 首页 -->
        <el-main>
        <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      article_num: "",
      comment_num: "",
      user_num: "",
      admin_num: ""
    };
  },
  methods: {
    check_cache() {
      //从vuex里面找
      let vm = this;
      if (vm.$store.state.main_page_cache.article_num == "") {
        vm.get_article_num();
      } else {
        vm.article_num = vm.$store.state.main_page_cache.article_num;
      }
      if (vm.$store.state.main_page_cache.comment_num == "") {
        vm.get_comment_num();
      } else {
        vm.comment_num = vm.$store.state.main_page_cache.comment_num;
      }
      if (vm.$store.state.main_page_cache.user_num == "") {
        vm.get_user_num();
      } else {
        vm.user_num = vm.$store.state.main_page_cache.user_num;
      }
      if (vm.$store.state.main_page_cache.admin_num == "") {
        vm.get_admin_num();
      } else {
        vm.admin_num = vm.$store.state.main_page_cache.admin_num;
      }
    },
    get_article_num() {
      let vm = this;
      let baseurl = "/api/web/get_article";
      vm.$http
        .get(baseurl)
        .then(res => {
          if (res.data.status == 1) {
            vm.article_num = res.data.data.article_list.length;
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
    },
    get_comment_num() {
      let vm = this;
      let baseurl = "/api/web/get_comment_num";
      vm.$http
        .get(baseurl)
        .then(res => {
          if (res.data.status == 1) {
            vm.comment_num = res.data.data.comment_num;
            vm.$store.commit("setMainPageCacheCommentNum", vm.comment_num);
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
    get_user_num() {
      let vm = this;
      let baseurl = "/api/web/get_user_num";
      vm.$http
        .get(baseurl)
        .then(res => {
          if (res.data.status == 1) {
            vm.user_num = res.data.data.user_num;
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
    get_admin_num() {
      let vm = this;
      let baseurl = "/api/web/get_admin_num";
      vm.$http
        .get(baseurl)
        .then(res => {
          if (res.data.status == 1) {
            vm.admin_num = res.data.data.admin_num;
            vm.$store.commit("setMainPageCacheAdminNum", vm.admin_num);
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