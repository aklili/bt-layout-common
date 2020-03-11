/**
 * 基于layui封装的自定义JS模块入口文件
 * 
 * @author yulao
 */
layui.config({
	base : '/js/modules/'
}).use('main');

$(function() {
	$(document).pjax('a', '#container',{fragment: '#container'});
	$(document).on('pjax:send', function() {
		NProgress.start();
	})
	$(document).on('pjax:complete', function() {
		NProgress.done();
	})
	//$("html").css('font-size','12px');
});