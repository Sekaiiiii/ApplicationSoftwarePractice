<template>
  <div class="user-component">
    <el-container v-loading="table_loading">
      <!-- 搜索框 -->
      <el-header>
        <div class="form-line-box">
          <el-form :inline="true" :model="search_form" size="mini">
            <el-form-item label="用户名">
              <el-input v-model="search_form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="get_user()">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addUserDialogShow = true">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-header>
      <!-- 表格主体 -->
      <el-main>
        <el-table :data="user_list" height="750" border style="width: 100%">
          <!-- <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left">
                <div v-if="props.row.name">
                  <el-form-item label="用户名">
                    <span>{{props.row.user_mail_address}}</span>
                  </el-form-item>
                </div>
              </el-form>
            </template>
          </el-table-column> -->
          <el-table-column
            type="index"
            label="序号"
            width="120"
          ></el-table-column>
          <el-table-column
            label="用户名"
            prop="name"
            width="250"
          ></el-table-column>
          <el-table-column
            label="密码"
            prop="password"
            width="250"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="setUser(scope.row)"
                >修改</el-button
              >
              <el-button size="mini" @click="deleteUser(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <!-- 添加用户会话框 -->
    <el-dialog title="添加用户" :visible.sync="addUserDialogShow">
      <el-form :model="add_user_form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="add_user_form.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="add_user_form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 设置密码会话框 -->
    <el-dialog title="重设密码" :visible.sync="setPasswordDialogShow">
      <el-form :model="set_password_form">
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input
            v-model="set_password_form.password1"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input
            v-model="set_password_form.password2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setPasswordDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmSetUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除用户会话框 -->
    <el-dialog
      title="确认删除"
      :visible.sync="deleteUserDialogShow"
      width="30%"
    >
      <span>确认删除用户？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteUserDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmDeleteUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //控制加载的变量
      table_loading : false,

      //控制会话框相关变量
      deleteUserDialogShow: false,
      setPasswordDialogShow: false,
      addUserDialogShow:false,

      //用户数据
      user_num: 0,
      user_list: [],

      //修改密码相关数据
      set_password_form: {
        password1: "",
        password2: "",
        name: "",
      },

      //删除用户相关数据
      delete_user_form: {
        name: "",
      },

      //添加用户相关数据
      add_user_form: {
        name: "",
        password: ""
      },

      //搜索框相关数据
      search_form: {
        name: "",
      },

      //样式使用的变量
      formLabelWidth: "120px",
    };
  },
  computed: {},
  methods: {
    get_user() {
      let vm = this;
      vm.table_loading = true;
      let baseurl = "/api/get_user?";
      for (let key in vm.search_form) {
        if (vm.search_form[key] != "") {
          baseurl += key + "=" + vm.search_form[key] + "&";
        }
      }
      vm.$http
        .get(baseurl)
        .then((res) => {
          if (res.data.status == 1) {
            vm.user_list = res.data.data.data;
            vm.user_num = res.data.data.data.length;
            vm.$message({
              message: res.data.data.msg,
              center: true,
            });
          } else {
            vm.$message({
              message: res.data.error_des,
              center: true,
            });
          }
          vm.table_loading = false;
        })
        .catch((err) => {
          console.error(err);
          vm.$message({
            message: "请求失败，请重试",
            center: true,
          });
          vm.table_loading = false;
        });
    },
    setUser(p) {
      let vm = this;
      vm.setPasswordDialogShow = true;
      vm.set_password_form.name = p.name;
    },
    confirmSetUser() {
      let vm = this;
      //如果密码输入不一致，重新输入，清空数据
      if (vm.set_password_form.password1 != vm.set_password_form.password2) {
        vm.$message({
          message: "两次输入密码不一致，请重试",
          center: true,
        });
        vm.set_password_form.password1 = "";
        vm.set_password_form.password2 = "";
        return;
      }
      //如果密码输入一致，发起修改密码的请求
      vm.$http({
        url: "/api/set_user",
        method: "post",
        data: {
          name: vm.set_password_form.name,
          password: vm.set_password_form.password1,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            vm.$message({
              message: res.data.data.msg,
              center: true,
            });
            vm.get_user();
            //关闭对话框
            vm.setPasswordDialogShow = false;
            //清空对话框数据
            vm.set_password_form.password1 = "";
            vm.set_password_form.password2 = "";
            vm.set_password_form.name = "";
          } else {
            vm.$message({
              message: res.data.error_des,
              center: true,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          vm.$message({
            message: "请求失败，请重试",
            center: true,
          });
          vm.setPasswordDialogShow = false;
          //清空对话框数据
          vm.set_password_form.password1 = "";
          vm.set_password_form.password2 = "";
          vm.set_password_form.name = "";
        });
    },
    deleteUser(p) {
      let vm = this;
      vm.deleteUserDialogShow = true;
      vm.delete_user_form.name = p.name;
    },
    confirmDeleteUser(){
      let vm = this;
      vm.$http({
        'url':'/api/del_user',
        'method':'post',
        'data':{
          'name':vm.delete_user_form.name
        }
      }).then(res=>{
        if(res.data.status === 1){
          vm.$message({
            'message':res.data.data.msg,
            'center':true
          });
          vm.get_user();
          vm.deleteUserDialogShow = false;
        }else{
          vm.$message({
            'message':res.data.error_des,
            'center':true
          })
        }
      })
    },
    confirmAddUser(){
      let vm = this;
      vm.$http({
        'url':'/api/add_user',
        'method':'post',
        'data':{
          'name':vm.add_user_form.name,
          'password':vm.add_user_form.password
        }
      }).then(res=>{
        if(res.data.status === 1){
          vm.$message({
            'message':res.data.data.msg,
            'center':true
          })
          vm.addUserDialogShow = false;
          vm.add_user_form.name = "";
          vm.add_user_form.password = "";
          vm.get_user();
        }else{
          vm.$message({
            'message':res.data.error_des,
            'center':true
          })
        }
      }).catch(err=>{
        console.error(err);
        vm.$message({
          'message':'请求出错,请重试',
          'center':true
        })
        vm.addUserDialogShow = false;
      })
    },
    no_use() {},
  },

  //生命周期函数
  created() {
    var vm = this;
    vm.get_user();
  },
};
</script>

<style >
.user-component .form-line-box {
  text-align: center;
}
.user-component .form-line-box .el-form-item {
  text-align: center;
  padding-top: 20px;
}

.user-component .page-box {
  text-align: center;
}
</style>