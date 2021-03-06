import Vue from 'vue'
import Router from 'vue-router'

//home组件
const Home = resolve => require(['@/components/Home/Home.vue'], resolve)
import Index from './map/index'
import My from './map/my';

//重定向 放最后面
import Redirect from './map/Redirect'

Vue.use(Router)

export default new Router({
    mode: 'history',//开启history有利于SEO
    routes: [
        Index,//主页
        My,
        Redirect, //路由重定向(访问不存在的页面时，重定向到这个页面) 放最后面
    ]
})