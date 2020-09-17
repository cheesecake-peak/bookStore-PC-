// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
axios.defaults.baseURL = "http://localhost:8088" 
//添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log(config.url)
  if("common/login"!=config.url){
   // if(localStorage.getItem('token')){
      config.headers.common['Authorization'] = localStorage.getItem('token');
 // }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
//添加响应拦截器
axios.interceptors.response.use(function (response) {
  if(401==response.data.code){
    router.push({
      path:'/'
    })
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});
