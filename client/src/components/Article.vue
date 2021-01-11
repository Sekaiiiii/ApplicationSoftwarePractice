<template>
  <div class="article-components">
    <el-container v-loading="table_loading">
      <!-- 搜索框 -->
      <!-- 包括 author name title content 的搜索 -->
      <el-header>
        <div class="form-line-box">
          <el-form :inline="true" :model="search_form" size="mini">
            <el-form-item label="作者">
              <el-input v-model="search_form.author"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="search_form.name"></el-input>
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="search_form.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input v-model="search_form.content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="get_article()">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addArticleDialogShow = true"
                >添加</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-header>

      <!-- 表格主体 -->
      <el-main>
        <el-table :data="article_list" height="750" border style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left">
                <div v-if="props.row.content">
                  <el-form-item label="内容">
                    <span>{{ props.row.content }}</span>
                  </el-form-item>
                </div>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="文章序号"
            prop="id_article"
            width="80"
          ></el-table-column>
          <el-table-column
            label="作者名"
            prop="author"
            width="150"
          ></el-table-column>
          <el-table-column
            label="标题"
            prop="title"
            width="250"
          ></el-table-column>
          <el-table-column
            label="创建时间"
            prop="create_date"
            width="250"
          ></el-table-column>
          <el-table-column
            label="最后修改时间"
            prop="modify_date"
            width="250"
          ></el-table-column>
          <el-table-column
            label="发表用户"
            prop="user_name"
            width="250"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="setArticle(scope.row)"
                >修改</el-button
              >
              <el-button size="mini" @click="deleteArticle(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <!-- 添加用户会话框 -->
    <el-dialog title="添加文章" :visible.sync="addArticleDialogShow">
      <el-form :model="add_article_form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input
            v-model="add_article_form.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input
            v-model="add_article_form.author"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="add_article_form.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addArticleDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddArticle()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改文章对话框 -->
    <el-dialog title="修改文章" :visible.sync="setArticleDialogShow">
      <el-form :model="set_article_form">
        <el-form-item label="作者名" :label-width="formLabelWidth">
          <el-input
            v-model="set_article_form.author"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input
            v-model="set_article_form.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="set_article_form.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setArticleDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmSetArticle()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除文章会话框 -->
    <el-dialog
      title="确认删除"
      :visible.sync="deleteArticleDialogShow"
      width="30%"
    >
      <span>确认删除文章？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteArticleDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmDeleteArticle()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //控制加载的变量
      table_loading: false,

      //控制会话框相关变量
      deleteArticleDialogShow: false,
      setArticleDialogShow: false,
      addArticleDialogShow: false,

      //文章数据
      article_num: 0,
      article_list: [],

      //修改文章相关数据
      set_article_form: {
        id: "",
        title: "",
        author: "",
        content: "",
        name: "",
      },

      //删除用户相关数据
      delete_article_form: {
        id: "",
      },

      //添加文章相关数据
      add_article_form: {
        name: "",
        title: "",
        author: "",
        content: "",
      },

      //搜索框相关数据
      search_form: {
        author: "",
        name: "",
        title: "",
        content: "",
      },

      //样式使用的变量
      formLabelWidth: "120px",
    };
  },
  computed: {},
  methods: {
    get_article() {
      let vm = this;
      vm.table_loading = true;
      let baseurl = "/api/get_article?";
      for (let key in vm.search_form) {
        if (vm.search_form[key] != "") {
          baseurl += key + "=" + vm.search_form[key] + "&";
        }
      }
      vm.$http
        .get(baseurl)
        .then((res) => {
          if (res.data.status == 1) {
            vm.article_list = res.data.data.data;
            vm.article_num = res.data.data.data.length;
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
    setArticle(p) {
      let vm = this;
      vm.setArticleDialogShow = true;
      vm.set_article_form.id = p.id_article;
      vm.set_article_form.name = p.user_name;
      vm.set_article_form.content = p.content;
      vm.set_article_form.author = p.author;
      vm.set_article_form.title = p.title;
    },
    confirmSetArticle() {
      let vm = this;

      vm.$http({
        url: "/api/set_article",
        method: "post",
        data: {
          'id':vm.set_article_form.id,
          'name':vm.set_article_form.name,
          'content':vm.set_article_form.content,
          'author':vm.set_article_form.author,
          'title':vm.set_article_form.title
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            vm.$message({
              message: res.data.data.msg,
              center: true,
            });
            vm.get_article();
            //关闭对话框
            vm.setArticleDialogShow = false;
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
          vm.setArticleDialogShow = false;
        });
    },
    deleteArticle(p) {
      let vm = this;
      vm.deleteArticleDialogShow = true;
      vm.delete_article_form.id = p.id_article;
    },
    confirmDeleteArticle() {
      let vm = this;
      vm.$http({
        url: "/api/del_article",
        method: "post",
        data: {
          id: vm.delete_article_form.id,
        },
      }).then((res) => {
        if (res.data.status === 1) {
          vm.$message({
            message: res.data.data.msg,
            center: true,
          });
          vm.get_article();
          vm.deleteArticleDialogShow = false;
        } else {
          vm.$message({
            message: res.data.error_des,
            center: true,
          });
        }
      });
    },
    confirmAddArticle() {
      let vm = this;
      vm.$http({
        url: "/api/add_article",
        method: "post",
        data: vm.add_article_form,
      })
        .then((res) => {
          if (res.data.status === 1) {
            vm.$message({
              message: res.data.data.msg,
              center: true,
            });
            vm.addArticleDialogShow = false;
            vm.add_article_form = {
              name: "",
              title: "",
              author: "",
              content: "",
            };
            vm.get_article();
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
            message: "请求出错,请重试",
            center: true,
          });
          vm.addArticleDialogShow = false;
        });
    },
    no_use() {},
  },

  //生命周期函数
  created() {
    var vm = this;
    vm.get_article();
  },
};
</script>

<style >
.article-components .form-line-box {
  text-align: center;
}
.article-components .form-line-box .el-form-item {
  text-align: center;
  padding-top: 20px;
}

.article-components .page-box {
  text-align: center;
}
</style>