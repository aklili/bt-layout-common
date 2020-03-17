/**
 * 按钮事件
 */
layui.define([], function (exports) {

  function debounce(handler, delay) {
    var timer;

    return function () {
      var self = this, arg = arguments;

      clearTimeout(timer);

      timer = setTimeout(function () {
        handler.apply(self, arg)
      }, delay)
    }
  }


  var MiuButton = function (ele) {
    var btnElem = ele, btnElemHtml = $(ele).html();
    this.click = function (fn) {
      $(btnElem).on('click', debounce(function () {
        fn();
      }, 200))
    }

    /**
     * 禁用按钮
     * 开启加载状态
     * @param msg 加载提示文本
     */
    this.start = function (msg) {
      var loadingHtml = '';
      loadingHtml += msg || '正在提交';
      loadingHtml += '<i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>';
      $(btnElem).html(loadingHtml);
      $(btnElem).attr('disabled', true);
    }

    /**
     * 开启按钮
     * 关闭加载状态
     */
    this.end = function () {
      setTimeout(() => {
        $(btnElem).html(btnElemHtml)
        $(btnElem).removeAttr('disabled');
      }, 500)
    }

  }


  exports('MiuButton', MiuButton);
});