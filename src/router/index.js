import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/latout/homePage'
import home from '@/components/pages/home'
import menu from '@/components/pages/menu'
import user from '@/components/pages/user'
import goods from '@/components/pages/goods'
import customer from '@/components/pages/customer'
import kinds from '@/components/pages/kinds'
import shop from '@/components/pages/shop'
import hotGoods from '@/components/pages/hotGoods'
import picture from '@/components/pages/picture'
import order from '@/components/pages/order'
import diver from '@/components/pages/diver'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/',
      name: 'homePage',
      component: homePage,
      children:[
        {
          path: '/home',
          name: 'home',
          component: home,
        },
        {
          path: '/menu',
          name: 'menu',
          component: menu,
        },
        {
          path: '/user',
          name: 'user',
          component: user,
        },
        {
          path: '/goods',
          name: 'goods',
          component: goods,
        },
        {
          path: '/customer',
          name: 'customer',
          component: customer,
        },
        {
          path: '/kinds',
          name: 'kinds',
          component: kinds,
        },
        {
          path: '/shop',
          name: 'shop',
          component: shop,
        },
        {
          path: '/hotGoods',
          name: 'hotGoods',
          component: hotGoods,
        },
        {
          path: '/picture',
          name: 'picture',
          component: picture,
        },
        {
          path: '/order',
          name: 'order',
          component: order,
        },
        {
          path: '/diver',
          name: 'diver',
          component: diver,
        },
      ]
    }
  ]
})
