import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
/* 添加一个原型属性$axios（本项目没有加$，就直接是axios）指向Axios,
这样做的好处是在vue实例或组件中不用再去重复引用Axios 直接用this.$axios就能执行axios 方法了 */
Vue.prototype.axios = axios;


// 在NowPlaying遇到了w.h动态地址问题,所以要在这里写一个全局的过滤器setWH
Vue.filter('setWH',(url,arg)=>{
	// 这里的w.的.是通配符,所以要加上\转译
	// replace(/w\.h/,arg)代表:把/w\.h/ 换成 arg
	return url.replace(/w\.h/,arg);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
