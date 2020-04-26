export default{
	path:'/mine',
	// which is lazy-loaded when the route is visited.中文意思是按需载入
	component: () => import('@/views/Mine/index.vue')
}