//引入组件
import Vue from 'vue'
import Index from '../components/Index.vue'
import Login from '../components/Login.vue'
import PageNotFound from "../components/PageNotFound.vue"
import User from "../components/User.vue"
import Article from "../components/Article.vue"
import Main from"../components/Main.vue"
// import Admin from "../components/Admin.vue"
// import Audit from "../components/Audit.vue"
// import Museum from "../components/Museum.vue"
// import Exhibition from "../components/Exhibition.vue"
// import EducationActivity from "../components/EducationActivity.vue"
// import Collection from "../components/Collection.vue"
// import New from "../components/New.vue"
// import Explain from "../components/Explain.vue"
// import Comment from "../components/Comment.vue"
// import Database from "../components/Database.vue"
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: "root",
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      {
        path:"main",
        component:Main
      },
      {
        path: "user",
        component: User
      },
      {
        path: "article",
        component: Article
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: PageNotFound
  }
]

const router = new VueRouter({
  routes
})

export default router