<template>
	<div class="city_body">
		<div class="city_list">
			<Scroller ref="city_list">
				<div>
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<!-- @tap="handleToCity(item.nm,item.id)"是状态管理store/city/index.js里的动作函数，把点击的nm和id传进去状态里 -->
							<li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
						</ul>
					</div>
					<!-- ref="city_sort"为了获取这里的dom元素，ref 加在普通的元素上，用this.ref.name 获取到的是dom元素 -->
					<Loading v-if="isLoading"/>
					<div else class="city_sort" ref="city_sort">  
						<!-- 第一层cityList，里面有index和list[] -->
						<div v-for="item in cityList" :key="item.index">
							<h2>{{item.index}}</h2>
							<ul>
								<!-- 第二层list[] -->
								<li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)">{{itemList.nm}}</li>
							</ul>
						</div>
					</div>
				</div>
			</Scroller>	
		</div>
		<div class="city_index">
			<ul>
				
				<li v-for="(item,index) in cityList" :key="item.index" @touchstart="handIndexGoToCity(index)">{{item.index}}</li>
			</ul>
		</div>	
	</div>
	
</template>

<script>
	export default {
		name:'City',
		data(){
			return {
				// 定义数组来接收this.cityList = cityList;
				cityList:[],
				hotList:[],
				isLoading:true
			}
		},
		// mounted是计算机属性
		// mounted:{}和,mounted() {}的区别是:mounted:{}是对像,mounted() {}是生命周期中的函数，这里跟created差不多
		// 但也区别,请查看:https://blog.csdn.net/yelin042/article/details/80216649
		// created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
		// mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted(){
			// ---------下面是优化,没有也没有问题---------
			// 增加了本地存储,所以增加判断
			var cityList = window.localStorage.getItem('cityList');
			var hotList = window.localStorage.getItem('hotList');
			if(cityList && hotList){
				this.cityList = JSON.parse(cityList);
				this.hotList = JSON.parse(hotList);
				this.isLoading = false;
			}else{
				
				// 这里使用的是main.js里的this.axios,跟使用Vue.use(VueResource)的this.$http.post差不多
				// vue2.0之后，就不再对vue-resource更新，而是推荐使用axios。。。https://www.cnblogs.com/peachmeimei/p/8916098.html
				this.axios.get('/api/cityList')     //这里使用了vue.config.js的跨域绑定
				.then((res)=>{
					this.isLoading = false;
					// console.log(res);
					// 有可能数据是没有的,所以要做一个判断
					var msg = res.data.msg;
					if(msg=='ok'){
						// 获取data下面的cities城市数据
						var cities = res.data.data.cities;
						// 获得数据后,我们先分一下组
						// 例如：[{index:'a',list:[{nm:'a城',id:123}]}]
						// 在下面创建分组方法formatCityList,然后在这里使用。。。这里要加this是因为已经不在同的方法
						var {cityList,hotList} = this.formatCityList(cities);
						// 使用var {cityList,hotList}来接收this.formatCityList(cities)返回的对像结果
						//console.log(cityList,hotList);
						this.cityList = cityList;
						this.hotList = hotList;
						//console.log(this.cityList);
						
						
						// ---------下面是优化,没有也没有问题---------
						// 增加本地存储localStorage.setItem(key,val)
						window.localStorage.setItem('cityList',JSON.stringify(cityList));
						window.localStorage.setItem('hotList',JSON.stringify(hotList));
						// 增加了存储后,就需要在上面this.axios.get('/api/cityList') 之前判断,是否有本地,如有就不访问api
						// -------优化项完成----------
					}
				});
				
			}
		},
		methods:{
			// 分组方法
			formatCityList(cities){
				// 定义城市数组
				var cityList =[];
				var hotList =[];
				// 循环把数据打印出来到城市数组cityList =[]
				for(var i=0;i<cities.length;i++){
					// 使用substring函数查到api中的py字段中的第一个字母
					// substring(0,1)返回的字符串数据,从答0处开始，1处结束,比如String XX= "abc";那么XX.substring(0,1)，就是a
					var firstLetter = cities[i].py.substring(0,1).toUpperCase();  //toUpperCase() 方法用于把字符串转换为大写。
					// 获取后写一个方法toCom用于对比
					// 做一个判断,toCom的结果
					if(toCom(firstLetter)){ //是真就添加新的组index，并把数据利用函数push写入
						cityList.push({
							// 例如：[{index:'a',list:[{nm:'a城',id:123}]}]
							index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}],
							})
					}else{  //如果是假，则直接添加至已有的组index中
						// 循环cityList中的键值j,把组中的数据list:[{nm:'a城',id:123}]写入，例如：cityList[j].index=‘a城’，则把list写入a城中
						for(var j=0;j<cityList.length;j++){
							if(cityList[j].index===firstLetter){
								// 把数据[{nm:'a城',id:123}]写入cityList[j]对应的list字段中
								cityList[j].list.push({
									nm:cities[i].nm,id:cities[i].id
								})
							}
						}
					}
				}
				function toCom(firstLetter){
					for(var i=0;i<cityList.length;i++){
						// 上面的例子是创建了cityList数组,所以这里下面就是使用cityList[i].index获取到index:'a城'的a城，用a来判断是否与firstLetter的字符？相同
						if(cityList[i].index === firstLetter){  //如果相同代表本index已经添加过了，就执行上述的else
							return false;
						}
					}
					return true;  //如果没有相同的组，则创建新的组index
				}
				//console.log(cityList);
				// 打印结果发现没有排序,在这里增加一个原生类的排序
				cityList.sort((n1,n2)=>{
					if(n1.index > n2.index){
						return 1;
					}
					else if(n1.index < n2.index){
						return -1;
					}
					else{
						return 0;
					}
				})
				
				// 接下来把热门城市
				for(var i=0;i<cities.length;i++){
					if(cities[i].isHot===1){
						hotList.push(cities[i] ) ;
					}
				}
				//console.log(hotList);  这里都对
				
				// 再接下来就把得出到的hotList和cityList返回到函数外面
				return{
					cityList,hotList
				}
				
			},
			
			//点击城市字母city_index跳转到相应的城市区域
			// 在要点击的地方增加@touchstart="handIndexGoToCity(index)"的事件
			handIndexGoToCity(index){
				// 这里的意思是指在上面refs的绑定中获取标签名为<h2>的所有属性，其中index为点击了第几个
				var h2 = this.$refs.city_sort.getElementsByTagName('h2');
				//console.log(h2);  得到的是HTMLCollection(22) [h2, h2, h2, h2, h2, h2,。。。]
				// 这里需要特别注意v-for 一定要加上index键值的参数 :v-for="(item,index) in cityList"，不然得不到index
				// this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
				console.log(h2[index]);
				// 因为增加了scroll滑动组件,所以上述的城市快选已经不行,要改为以下
				this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
				
				
			},
			
			// 状态管理,@tap="handleToCity(item.nm,item.id)"是状态管理store/city/index.js里的动作函数
			// 把点击的城市id和nm传到状态里记着使用
			handleToCity(nm,id){
				console.log(nm,id);
				this.$store.commit('city/CITY_INFO',{nm,id});
				window.localStorage.setItem('nowId',id);
				window.localStorage.setItem('nowNm',nm);
				this.$router.push('/movie/nowPlaying');
			}
		}
	}
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul{}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort{}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}

</style>