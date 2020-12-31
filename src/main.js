import Vue from 'vue'
import App from './App.vue'
import Vuerouter from 'vue-router'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/index.css"
import "./assets/font/iconfont.css"

Vue.config.productionTip = false
Vue.use(Vuerouter)
Vue.use(ElementUI);
// 设置默认请求地址
axios.defaults.baseURL = "http://localhost:3000"
Vue.prototype.axios = axios

// 解决重复路由
const originalPush = Vuerouter.prototype.push
Vuerouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


import found from './views/found.vue';
import list from './views/list.vue';
import songs from './views/songs.vue';
import mv from './views/mv.vue';
import result from './views/result.vue';
import playList from './views/playList.vue';
let router = new Vuerouter({
  // 去掉#
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: '/found'
    },
    {
      path: "/found",
      component: found
    },

    {
      path: "/list",
      component: list
    },
    {
      path: "/songs",
      component: songs
    },
    {
      path: "/mv",
      component: mv
    },
    {
      path: "/result",
      component: result
    },
    {
      path: "/playlist",
      component: playList
    },
  ]
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
