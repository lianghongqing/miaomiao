<template>
	<div>
		<div class="movie_body">
				<ul>
					<li v-for="item in movieList" :key="item.id">
						<!-- <img src="/images/movie_1.jpg"> 这里要修改为动态，就需要把src变成绑定:src -->
						<div class="pic_show"><img :src="item.img | setWH('128.180')"></div>
						<!-- ps：这里遇到了img404的问题， http://p1.meituan.net/w.h/moviemachine/6664cd8c31f1254bc52793a158dc53ff8811971.jpg 404 (Not Found) -->
						<!-- 看上面的报错中看到了w.h的问题，这是动态的地址，代表w宽，h高，加上这里是v-for，所以我们要写计算属性来做 -->
						<!-- 但如果每个组件都写就比较麻烦，所以直接写一个全局的过滤器，在main.js里setWH(w.h) -->
						<div class="info_list">
							<!-- 什么时候使用{{ item.nm }} ，什么时候使用"item.version"，如下，绑定时使用""，引用是使用{{}} -->
							<h2>{{ item.nm }} <img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
							<p>观众评 <span class="grade">{{item.sc}}9.2</span></p>
							<p>{{item.star}}</p>
							<p>今天{{item.showst}}家影院放映{{item.wish}}场</p>
						</div>
						<div class="btn_mall">
							购票
						</div>
					</li>
				</ul>
			</div>
		
	</div>
</template>

<script>
	export default {
		name:'NowPlaying',
		data(){
			return {
				movieList:[]
			}
		},
		mounted(){
			this.axios.get('/api/movieOnInfoList?cityId=10')
			.then((res)=>{
				var msg = res.data.msg;
				if(msg==='ok'){
					this.movieList = res.data.data.movieList;
					console.log(this.movieList);
				}
			})
		}
		
	}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}

</style>