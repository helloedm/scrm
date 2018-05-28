import Vue from 'vue'
import Router from 'vue-router'

//登录相关
import login from 'components/login/login';       //登录页
import register from 'components/login/register'  //注册
import creatshop from 'components/login/creatshop'//创建商铺
import creatshopinfo from 'components/login/creatshopinfo' //商铺详情

//main 控制台相关
import main from 'components/main/main'                 //入口页面
import recruitment from "components/main/recruitment"   //控制台

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/creatshopinfo',
      name:'creatshopinfo',
      component: creatshopinfo
    },
    {
      path:'/creatshop',
      name:'creatshop',
      component: creatshop
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      children: [{ path: '/scrm/main', component: recruitment }]
    }
  ]
})