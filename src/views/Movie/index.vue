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

// 加{}是导入指定模块，不加是默认导入--------???暂时还是不太明白，要百度
import {messageBox} from '@/components/JS';


export default {
	name: 'movie',
	components: {
	Header,TabBar
	},
	// 调用弹窗
	mounted() {
		setTimeout(()=>{
			this.axios.get('/api/getLocation').then((res)=>{
			var msg =res.data.msg;
			var nm = res.data.data.nm;
			var id = res.data.data.id;
			// console.log(this.$store.state.city.id,id);  得到的结果前者是字符串,后者是数字,所以 下面只使用==
			if(this.$store.state.city.id==id){return};
			if(msg === 'ok'){
				messageBox({
					title:'当前定位',
					content:nm,
					cancel:'取消',
					ok: '切换当前',
					handleOk(){
						// 把拿到的nm城市存储到本地,以便之后调用
						window.localStorage.setItem('nowNm',nm);
						window.localStorage.setItem('nowId',id);
						// 切换
						window.location.reload();
					},
					handleCancel(){
						// 取消本就是取消隐藏了,所以 这里并不需要有什么动作
					}
				});
			}
	  })

		},3000);
		 	}
  
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
