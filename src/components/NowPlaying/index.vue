<template>
		
	<div class="movie_body" ref="movie_body">
		<Loading v-if="isLoading" />
		<!-- :handleToScroll，:handleToScrollEnd把此动作函数父子传参到scroller里 -->
		<Scroller :handleToScroll="handleToScroll" :handleToScrollEnd="handleToScrollEnd">
			<ul>
				<li class="pullDownMsg">{{pullDownMsg}}</li>
				<li v-for="item in movieList" :key="item.id">
					<!-- <img src="/images/movie_1.jpg"> 这里要修改为动态，就需要把src变成绑定:src -->
					<div class="pic_show" @tap="handleToDetail">
						<img :src="item.img | setWH('128.180')">
					</div>
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
		</Scroller>
	</div>
		
	
</template>

<script>
	
	
	export default {
		name:'NowPlaying',
		data(){
			return {
				movieList:[],
				pullDownMsg:'',
				isLoading:true,
				prevCityId:-1   //prevCityId上一个城市ID，我们这里假设为-1，就跟默认不相同
		
			}
		},
		// 原来是mounted,现改为activated
		activated(){
			
			// 第18课内容，增加了城市状态$store来动态切换城市数据
			var cityID = this.$store.state.city.id;
			
			// 如果上一次的prevCityId和当前状态的id一样,则代表并没有切换城市,则不走下面的请求
			if(this.prevCityId === cityID){return;}
			this.isLoading= true;
			
			
			this.axios.get('/api/movieOnInfoList?cityId='+cityID)
			.then((res)=>{
				
				var msg = res.data.msg;
				if(msg==='ok'){
					this.movieList = res.data.data.movieList;
					this.isLoading= false;
					//console.log(this.movieList);
					// 在获取数据后,又把当前的城市id赋值给上一次（当前）
					this.prevCityId = cityID;
					
					// ---增加下拉事件-----但为了其它地方也可以复用，所以这里打包成全局组件，放在components的scroll下
					/* this.$nextTick(()=>{
						var scroll = new BetterScroll(this.$refs.movie_body,{
							tap:true,
							probeType:1
						});
						// 下拉事件scroll，这里的pos可以是scroll的参数，可以获得x和y的值
						// 另外API文档中还有上拉加载的,再看看
						scroll.on('scroll',(pos)=>{
							// console.log('scroll');
							if(pos.y>30){
								this.pullDownMsg = "正在更新中";
							}
							
						});
						// 下拉结束事件touchEnd
						scroll.on('touchEnd',(pos)=>{
							 //console.log(pos)
							if(pos.y>30){
								this.axios.get('/api/movieOnInfoList?cityId=20').then((res)=>{
									var msg = res.data.msg;
									if(msg==='ok'){
										this.pullDownMsg = '更新完成';
										setTimeout(()=>{
											this.movieList = res.data.data.movieList;
											this.pullDownMsg = '';
										},1000)
									}
									
								})
								
							}
							
						})
					});

				 */}
			})
		},
		methods:{
			handleToDetail(){
				console.log(111)
			},
			
			// 然后在上面通过父子传参的方法:handleToScroll，:handleToScrollEnd把此动作函数父子传参到scroller里
			// <Scroller :handleToScroll="handleToScroll" :handleToScrollEnd="handleToScrollEnd">
			handleToScroll(pos){
				if(pos.y>30){
					this.pullDownMsg = "正在更新中";
				}
			},
			handleToScrollEnd(pos){
				if(pos.y>30){
					this.axios.get('/api/movieOnInfoList?cityId=20').then((res)=>{
						var msg = res.data.msg;
						if(msg==='ok'){
							this.pullDownMsg = '更新完成';
							setTimeout(()=>{
								this.movieList = res.data.data.movieList;
								this.pullDownMsg = '';
							},1000)
						}
					})
				}
			}
		},
		
		
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
.movie_body .pullDownMsg{ margin: 0;padding: 0;border: none;}

</style>