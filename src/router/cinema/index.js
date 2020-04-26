export default{
	path:'/cinema',
	// which is lazy-loaded when the route is visited.中文意思是按需载入
	component: () => import('@/views/Cinema/index.vue'),
	// 二级路由
	/* children:[
		{
			path:'city_switch',
			component: () => import('@/components/List')
		},
		{
			path:'brand_swtich',
			component: () => import('@/components/List')
		},
		{
			path:'feature_switch',
			component: () => import('@/components/List')
		},
		{
			path: '/cinema',
			redirect: '/cinema/city_switch'
		}
		
	] */
}