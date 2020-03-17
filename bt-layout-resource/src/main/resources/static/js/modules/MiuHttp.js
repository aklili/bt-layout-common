/**
 * http
 */
layui.define([], function (exports) {

  var MiuHttp = function () {

    var defaultConfig = {
      //记载状态配置
      loading: {
        status: true,
        text: '正在加载...'
      },
      header: {
        tokenStatus: true, //默认开启
        tokenCache: true, //从缓存拿token
      }
    }

    this.init = function (options) {
      $.extend(true, defaultConfig, options);
    }

    //获取数据请求
    this.get = function (options) {
      return this.request('GET', options);
    }

    //提交数据请求
    this.post = function (options) {
      return this.request('POST', options);
    }

    //更新资源请求
    this.put = function (options) {
      return this.request('PUT', options);
    }

    //删除数据请求
    this.del = function (options) {
      return this.request('DELETE', options);
    }

    //发送请求
    this.request = function (methods, options) {
      //合并两个配置
      $.extend(true, defaultConfig, options);

      //开启加载loading状态
      if (defaultConfig.loading.status) {
        $("#miu-loading").show();
      }

      var contentType = '';
      if (defaultConfig.contentType == 'form') {
        contentType = 'application/x-www-form-urlencoded'
      } else if (defaultConfig.contentType == 'multipart') {
        contentType = 'multipart/form-data';
      } else {
        contentType = "application/json";
      }

      return new Promise(function (reslove, reject) {
        $.ajax({
          url: defaultConfig.url,
          methods: methods,
          contentType: contentType,
          data: defaultConfig.data,
          beforeSend: function (jqXHR, settings) {
            //判断是否使用token
            if (defaultConfig.header.tokenStatus) {
              //判断是否从缓存拿token
              if (defaultConfig.header.tokenCache) {
                //判断缓存里的token是否未undefined
                if (layui.sessionData("MiuData").token != undefined) {
                  jqXHR.setRequestHeader('Authorization', layui.sessionData("MiuData").token)
                } else {
                  jqXHR.abort();
                  reject("登录失效");
                }
              } else {
                //从配置文件里面读取
                jqXHR.setRequestHeader('Authorization', defaultConfig.header.token)
              }
            }
          },
          success: function (res) {
            reslove(res);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
            handlerStatus(jqXHR.status);
            reject(jqXHR.status, textStatus);
          },
          complete: function (jqXHR, textStatus) {
            //关闭loading
            if (defaultConfig.loading.status) {
              setTimeout(() => {
                $("#miu-loading").hide();
              }, 500);
            }
          }
        })
      })
    }
  }


  function handlerStatus(status) {
    switch (status) {
      case (500):
        alert('服务器系统内部错误');
        break;
      case (401):
        alert('未登录');
        break;
      case (403):
        alert('无权限执行此操作');
        break;
      case (408):
        alert('请求超时');
        break;
      case (408):
        alert('请求超时');
        break;
      case (404):
        alert('请求资源未找到');
        break;
      default:
        alert('未知错误,请联系管理员');
    }
  }


  exports('MiuHttp', new MiuHttp())

});