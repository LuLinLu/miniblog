import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/articles/Articles.vue'

Vue.use(Router);
const routes = [
  {
    path:"/",
    redirect:"/home"
  },
  {
    path: '/Articles',
    name: 'Articles',
    component: ()=>import("@/views/articles/Articles.vue")
  },
  {
    path: '/Home',
    name: 'Home',
    component: ()=>import("@/views/home/Home.vue")
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=>import("@/views/login/Login.vue")
  },
  {
    path:"/page",
    name:"Page",
    component: ()=>import("@/views/page/Page.vue"),
    props:(route) => ({id:route.query.id})
  },
  {
    path:"/profile",
    name:"Profile",
    component: ()=>import("@/views/profile/Profile.vue"),
  },
  {
    path:"/writearticle",
    name:"WriteArticle",
    component: ()=>import("@/views/writearticle/WriteArticle.vue")
  },
  {
    path:"/search",
    name:"Search",
    component:()=>import("@/views/articles/Search.vue"),
    props:(route)=> ({query:route.query.q}),
  },
];

export default new Router({
  routes,
  mode:"history"
})
