<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <div id="main" >
  <!-- <HelloWorld></HelloWorld> -->
  <Header title="喵喵电影首页"></Header>
	<!-- 内容开始 -->
		<!-- 二级导航 -->
		<div id="content">
			<!-- 二级导航栏 -->
			<div class="movie_menu">
				<router-link tag="div" to="/movie/city" class="city_name">
					<span>{{ $store.state.city.nm }}</span><i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<div class="hot_swtich">
					
					<router-link tag="div" to="/movie/nowplaying" class="hot_item">正在热映</router-link>
					<router-link tag="div" to="/movie/comingsoon" class="hot_item">即将上映</router-link>
				</div>
				<router-link tag="div" to="/movie/search" class="search_entry">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
			<!-- 二级导航内容 -->
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
		
	<TabBar></TabBar>
  </div>

  
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import Header from '@/components/Header/index.vue';
import TabBar from '@/components/TabBar/index.vue';
// import {messageBox} from '@/components/JS';


export default {
  name: 'movie',
  components: {
    Header,TabBar
  },
  // 调用弹窗
 //  mounted() {
 //  	messageBox({
	// 	title:'当前定位',
	// 	content:'fds',
	// 	cancel:'取消',
	// 	ok: '切换当前'
	// });
 //  }
  
}
</script>

<style scoped>
	#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
	.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
	.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
	.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
	.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	
	.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
	.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .search_entry i{  font-size:24px; color:red;}
	
	
</style>
