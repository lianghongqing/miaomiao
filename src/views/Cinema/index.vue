<template>
	<div id="main" >
	  <Header title="电影院"></Header>
	  <div id="content">
		  <div class="cinema_menu">
		  	<div class="city_switch">
		  		全城 <i class="iconfont icon-lower-triangle"></i>
		  	</div>
		  	<div class="brand_swtich">
		  		品牌 <i class="iconfont icon-lower-triangle"></i>
		  	</div>
		  	<div class="feature_switch">
		  		特色 <i class="iconfont icon-lower-triangle"></i>
		  	</div>
		  </div>
		  <List></List>
	  </div>
	  <!-- 二级导航内容 -->
	  
	  <TabBar></TabBar>
 
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header/index.vue';
import TabBar from '@/components/TabBar/index.vue';
import List from '@/components/List/index.vue';

export default {
  name: 'cinema',
  components: {
    Header,TabBar,List
  }
}
</script>

<style scoped>
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
	
</style>