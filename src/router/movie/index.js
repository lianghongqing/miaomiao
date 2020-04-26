export default{
	path:'/movie',
	// which is lazy-loaded when the route is visited.中文意思是按需载入
	component: () => import('@/views/Movie'),
	// 二级路由
	children:[
		{
			path:'city',
			component: () => import('@/components/City')
		},
		{
			path:'nowplaying',
			component: () => import('@/components/NowPlaying')
		},
		{
			path:'comingSoon',
			component: () => import('@/components/ComingSoon')
		},
		{
			path:'search',
			component: () => import('@/components/Search')
		},
		{
			path: '/movie',
			redirect: '/movie/nowplaying'
		}
	]
}