import Vue from 'vue'
import VueRouterABC from 'vue-router'
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema/index.js'

Vue.use(VueRouterABC)

export default new VueRouterABC({
	mode: 'history',
	base: process.env.BASE_URL,
	routes:[
		movieRouter,
		mineRouter,
		cinemaRouter,
		{
			path:'/*',
			redirect:'/movie'
		}
	]
})



// -----------原文件刚生成时是这样写的-------------------
//   const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.中文意思是按需载入
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router
