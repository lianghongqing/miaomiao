<template>
	<div>
		<div class="search_body">
				<div class="search_input">
					<div class="search_input_wrapper">
						<i class="iconfont icon-sousuo"></i>
						<input type="text" v-model="searchMsg">
					</div>					
				</div>
				<div class="search_result">
					<h3>电影/电视剧/综艺</h3>
					<ul v-for="item in searchList" :key="item.id">
						<li>
							<div class="img"><img :src="item.img | setWH('128.180')"></div>
							<div class="info">
								<p><span>{{item.nm}}</span><span>{{item.sc}}</span></p>
								<p>{{item.enm}}</p>
								<p>{{item.cat}}</p>
								<p>{{item.rt}}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		
	</div>
</template>

<script>
	export default {
		name:'Search',
		data(){
			return{
				searchMsg:'',
				searchList:[]
			}
		},
		methods:{
			// 1. 定义终止请求方法
			       cancelRequest() {
						if (typeof this.source === 'function') {
			             this.source('终止请求!')
						}
				  }
		},
		
		// 这里搜索就不能在mounted生命周期里做了,因为需要在客户输入搜索词后再进行获取数据的
		// 这里就需要在上面绑定:双向绑定v-model来获取输入的值
		// 因为这里的数据需要通过异步获取,所以不能使用components(计算属性),因为计算属性不会自动监听,所以使用watch
		watch:{
			searchMsg(newVal){
				var that = this;
				// 第18课，城市状态切换城市，参考nowplaying/index.vue
				var cityId = this.$store.state.city.id;
				this.cancelRequest();
				//console.log(newVal);实时获取v-model="searchMsg"的值
				this.axios.get('/api/searchList?cityId='+cityId+'&kw='+newVal,{
					 cancelToken: new this.axios.CancelToken( function (c) {
						 // 这里有个that,具体是什么原因要在上面var that = this;需要百度，也可以 写成箭头函数也行
						 that.source = c;
						 })            
				})
				.then((res)=>{
					var msg = res.data.msg;
					var movies = res.data.data.movies;
					if(msg && movies){
						this.searchList = res.data.data.movies.list
					}
					else{
						this.searchList = [];
						console.log("暂无搜索结果！！")
					}
				})
				.catch(err => {
				         if (err) {
				            if (this.axios.isCancel(err)) {
				               // 终止多次请求 请求取消 返回取消后的信息
				               console.log('请求取消', err.message)
				            } else {
				               // 服务端数据异常
				               console.log('没有搜索到数据哦')
				            }
				         }
				      })
				
				// 这里完成后,你会发现,在输入框每输入一个字都会发起请求,所以我们需要使用axios的终止多次请求
				// 百度后,获取的方法是增加cancelRequest的方法,然后在请求时增加cancelToken: new this.axios.CancelToken( function (c) {}的函数方法
				// .catch是可有可无
			}
		}
		
	}
</script>

<style scoped>
#content .search_body{ flex:1; overflow:auto;}
.search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
.search_body .search_result{}
.search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
.search_body .search_result ul{}
.search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
.search_body .search_result .img{ width: 60px; float:left; }
.search_body .search_result .img img{ width: 100%; }
.search_body .search_result .info{ float:left; margin-left: 15px; flex:1;}
.search_body .search_result .info p{ height: 22px; display: flex; line-height: 22px; font-size: 12px;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1; }
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}

</style>