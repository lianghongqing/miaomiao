<template>
	<div class="cinema_body">
		<Scroller>
			<ul>
				<li v-for="item in cinemaList" :key="item.id">
					<div>
						<span>{{item.nm}}</span>
						<span class="q"><span class="price">1{{item.sellPrice}}</span> 元起</span>
					</div>
					<div class="address">
						<span>{{item.addr}}</span>
						<span>{{item.distance}}</span>
					</div>
					<div class="card">
				<!-- <div>小吃</div>
				<div>折扣卡</div> -->
						<div v-for="(itemCard,key) in item.tag" v-if="itemCard===1" :key="key"
						:class="key | classCard"
						>{{key | formatCard}}</div>
					</div>
				</li>
			</ul>
		</Scroller>
	</div>
		
</template>		
	
</template>

<script>
	export default {
		name:'CinemaList',
		data(){
			return{
				cinemaList:[]
			}
		},
		mounted(){
			this.axios.get('/api/cinemaList?cityId=10')
			.then((res)=>{
				var msg = res.data.msg;
				if(msg === 'ok'){
					this.cinemaList = res.data.data.cinemas;
				}
			})
		},
		// 因为上面得出的key都是tag下面的字段,所以这里要使用filters(过滤器)自定义一些对应的过滤value
		filters:{
			// 内容key | formatCard过滤器
			formatCard(key){
				var card = [
					{key:'allowRefund' ,value:'可退'},
					{key:'endorse' ,value:'签名'},
					{key:'sell' ,value:'折扣'},
					{key:'snack' ,value:'小吃'},
					
				];
				// 为什么要遍历呢？因为要把全部的card[i].value返回给formatCard过滤器
				for(var i=0;i<card.length;i++){
					if(card[i].key==key){
						return card[i].value;
					}
				}
				return '';
			},
			// 样式:class="key | classCard"过滤器
			classCard(key){
				var card = [
					// or是橙色,bl是蓝色
					{key:'allowRefund' ,value:'or'},
					{key:'endorse' ,value:'or'},
					{key:'sell' ,value:'bl'},
					{key:'snack' ,value:'bl'},
					
				];
				// 为什么要遍历呢？因为要把全部的card[i].value返回给formatCard过滤器
				for(var i=0;i<card.length;i++){
					if(card[i].key==key){
						return card[i].value;
					}
				}
				return '';
			}
		}
		
	}
</script>

<style scoped>

#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>