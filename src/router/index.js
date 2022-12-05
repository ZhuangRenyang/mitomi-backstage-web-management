import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',//配置统一前缀
    name: 'home',
    component: HomeView,
    //重定向
    redirect: 'admin/admins/list',
    children: [
      {
        path: 'admins/list',
        component: () => import('../views/admins/AdminListView'),
        meta: {
          title: 'MiToMi商城后台管理-用户列表'
        }
      },
      {
        path: 'admins/insert',
        component: () => import('../views/admins/AdminInsertView'),
        meta: {
          title: 'MiToMi商城后台管理-添加用户'
        }
      },
      {
        path: 'category/list',
        component:() => import('../views/category/CategoryListView'),
        meta: {
          title: 'MiToMi商城后台管理-类别列表'
        }
      },
      {
        path: 'category/insert',
        component:() => import ('../views/category/CategoryInsertView'),
        meta:{
          title: 'MiToMi商城后台管理-添加类别'
        }
      },
      {
        path: 'commodity/list',
        component:() => import('../views/commodity/CommodityListView'),
        meta: {
          title: 'MiToMi商城后台管理-商品列表'
        }
      },
      {
        path: 'commodity/insert',
        component:() => import ('../views/commodity/CommodityInsertView'),
        meta:{
          title: 'MiToMi商城后台管理-添加商品'
        }
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {

  document.title = to.meta.title ? to.meta.title : "MiToMi商城后台管理平台";
  next();
})