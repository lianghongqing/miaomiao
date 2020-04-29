import Vue from 'vue';
import MessageBox from '@/components/JS/MessageBox/index.vue';

// 这里做一个兼容弹窗,不管到时是城市切换还是其它,都可以使用
export var messageBox = (function(){
	// 闭包
	var defaults ={
		// 这里要定义一些默认值，对应的title是定位,content是北京,cancel是取消
		title : '',
		content:'',
		cancel:'',
		ok:'',
		// 这里定义默认的cancel和ok的动作为空
		handleCancel:null,
		handleOk:null
	};
	
	//使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。Vue.extend( options )
	var MyComponent = Vue.extend(messageBox);  //https://cn.vuejs.org/v2/api/index.html#Vue-extend
	
	// 这里返回一个具体调用这个弹窗的function
	return function(opts){   //opts是配置参数
		// 当收到配置时，要对原来默认的default覆盖，所以要for一下defaults
		for(var attrOpts in defaults){
			defaults[attrOpts] = opts[attrOpts];  //所收到的opts遍历给defaults
		}
		
		
		var vm = new MyComponent({
			el:document.createElement('div'),   //可以查看生命周期，这里创建的div最终也是会给template覆盖的
			data:{
				title : defaults.title,  //把收到配置时的值赋给实质data
				content:defaults.content,
				cancel:defaults.cancel,
				ok:defaults.ok,
			},
			methods:{
				handleCancel(){
					//这里其实&&是判断，当第一个存在，就执行第2个；  ||也是判断，当第一存在就执行第1个
					defaults.handleCancel  &&  defaults.handleCancel.bind(this);  
					// 当点击这2个方法的时候,都需要把弹窗删除掉,不能长时间在页面上removeChild()删除子节点
					document.body.removeChild(vm.$el);
				},
				handleOk(){
					defaults.handleOk  &&  defaults.handleOk.bind(this);
					document.body.removeChild(vm.$el);
				},
			}
		});
		
		// 把这个弹窗添加到body里就可以，appendChild() 方法可向节点的子节点列表的末尾添加新的子节点
		document.body.appendChild(vm.$el);
	};
	
})();