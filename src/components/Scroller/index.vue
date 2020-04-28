<!-- 让下拉更滑畅的全局组件 -->
<template>
	<div class="wrapper" ref='wrapper'>
		<!-- slot插槽的意思，即如果页面中有使用就显示，没有使用就占位 -->
		<slot></slot>
	</div>
</template>

<script>
	import BetterScroll from 'better-scroll';
	export default{
		name:'Scroller',
		props:{
			handleToScroll:{
				type:Function,           //这是表示把handleToScroll定义为函数
				default:function(){}     //这是表示给一个空函数给它，免得在子组件中有空函数时会报错，比如comingsoon，就没有传参函数，但也是可以使用下拉滑畅的全局组件
			},
			handleToScrollEnd:{
				type:Function,
				default:function(){}
			}
		},
		mounted() {
			var scroll = new BetterScroll(this.$refs.wrapper,{
				tap:true,
				probeType:1
			});
			
			
			// 1、原来在组件中是如下面这样写的，但因为全局都需要使用，所以封装成全局组件，然后使用props父子传参的方法，把this.handleToScroll(pos);回调出去。
			//然后在具体的vue项目中使用时，只需要把具体的动作函数写上，就可以调用，比如miaomiao\src\components\NowPlaying里下面的方法
			// 下拉事件scroll，这里的pos可以是scroll的参数，可以获得x和y的值
			/* scroll.on('scroll',(pos)=>{
				if(pos.y>30){
					this.pullDownMsg = "正在更新中";
				}
				
			}); */
			// 然后在子组件中，通过父子传参的方法:handleToScroll，:handleToScrollEnd把此动作函数父子传参到这里（scroller）
			// <Scroller :handleToScroll="handleToScroll" :handleToScrollEnd="handleToScrollEnd">
			scroll.on('scroll',(pos)=>{
				this.handleToScroll(pos);
			});
			scroll.on('touchEnd',(pos)=>{
				this.handleToScrollEnd(pos);
			})
			
		}
	}
</script>

<style scoped="scoped">
	.wrapper{height: 100%;}
</style>
