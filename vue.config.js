/* export default｛｝是es6的写法，这里不支持，所以使用了原来的module.exports =｛｝ */

module.exports ={
	/* devServer代表开发环境的配置 */
	devServer:{
		/* proxy代表的是我们的字段 */
		proxy:{
			/* 因为api的网址都是以这个api为根目录，例如http://39.97.33.178/api/cityList , */
			// '/api'代表：凡是在vue中使用get('/api/cityList')中有'/api'的，则使用target的网址重定向
			'/api':{
				/* target目标 */
				target:'http://39.97.33.178',
				/* 是否要改变反向目标地址，我们这里是开发环境，当然是true，这样就可以解决跨域问题 */
				changeOrigin:true
			}
		}
	}
}

/* 重启生效 */
/* 下载axios使用来作用api的获取，命令：npm i -S axios */
