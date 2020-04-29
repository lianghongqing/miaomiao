const state ={
	// 默认状态，这里为什么要使用||呢，因为如果有缓存，就使用最新的，如果没有则使用广州 
	nm:window.localStorage.getItem('nowNm') || '广州',
	id:window.localStorage.getItem('nowId') || 20
};

const actions={
	
};

const mutations={
	// 状态管理 方法,一般大写CITY_INFO，把payload新状态赋给当前状态
	CITY_INFO(state,payload){
		state.nm = payload.nm;
		state.id = payload.id;
	}
};

export default{
	namespaced : true,
	state,
	actions,
	mutations
	
}