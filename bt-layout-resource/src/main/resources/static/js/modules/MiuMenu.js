/**
 * 菜单
 */
layui.define(['MiuHttp', 'layer'], function (exports) {
  var MiuHttp = layui.MiuHttp, layer = layui.layer, menuHtml = '';
  var paddingArr = [0, 10, 32, 52];
  var MiuMenu = function () {
    this.init = function (options) {
      MiuHttp.get({
        url: options.url
      }).then(res => {
        if (res.code == '200') {
          handlerMenu(res.data)
        }
      }).catch(error => {
        layer.msg("菜单初始化失败")
      })
    }
  }

  /**
   * 事件处理
   */
  function event() {

    //处理多级菜菜单事件
    $("#miu-asider-menu").on('click', '.miu-menu-submenu-title', function () {
      var parentElement = $(this).parent();
      var dataId = $(this).parent().attr("data-id");

      //获取父节点
      let ls = parentElement.siblings('li');
      if (ls.length > 0) {
        $.each(ls, function (index, item) {
          $(item).removeClass('open-sub-menu');
          $(item).find('li').removeClass("open-sub-menu");
          $(item).find('ul').slideUp();
        })          
      }
      if (parentElement.hasClass("open-sub-menu")) {
        //如果是打开状态则关闭
        parentElement.removeClass("open-sub-menu");
        $(this).next("ul").slideUp();
      } else {
        //如果是关闭状态则打开
        parentElement.addClass("open-sub-menu");
        $(this).next("ul").slideDown();
      }

    })

    $("#miu-asider-menu").on('click', '.miu-menu-title', function () {
      $('#miu-asider-menu').find('div.miu-menu-title').removeClass("menu-active");
      $(this).addClass("menu-active");
    });
  }

  /**
   * 菜单渲染
   * @param {Array} data  菜单数据
   */
  function handlerMenu(data) {
    var menuHtml = render(data, "root");
    $("#miu-asider-menu").html(menuHtml);
    event();
  }

  function render(menuData, flag) {
    if (flag == "root") {
      menuHtml += '<ul>';
    } else {
      menuHtml += '<ul class="miu-menu-submenu-list">';
    }
    menuData.forEach((item, index) => {
      if (item['list'] instanceof Array) {
        menuHtml += '<li data-id="' + item.id + '" class="miu-menu">';
        //根据层级 添加padding-left
        if (item.level == 1) {
          menuHtml += '<div data-level="' + item.level + '" class="miu-menu-submenu-title" style="padding-left: ' + paddingArr[item.level] + 'px">';
        } else if (item.level == 2) {
          menuHtml += '<div <div data-level="' + item.level + '" class="miu-menu-submenu-title" style="padding-left: ' + paddingArr[item.level] + 'px">';
        } else if (item.level == 3) {
          menuHtml += '<div <div data-level="' + item.level + '" class="miu-menu-submenu-title"  style="padding-left: ' + paddingArr[item.level] + 'px">';
        }
        menuHtml += '<div class="title">';
        //图标处理
        if (item.icon !== undefined) {
          menuHtml += '<span class="miu-layout-menu-side-title-icon">';
          menuHtml += '<i class="' + item.icon + '"></i>'
          menuHtml += "</span>"
        }
        menuHtml += '<span class="miu-layout-menu-side-title">' + item.name + '</span >';
        menuHtml += '</div>';
        menuHtml += '<span class="arrow">';
        menuHtml += '<i class="layui-icon layui-icon-down"></i>';
        menuHtml += '</div>'
        render(item['list'], "sub")
        menuHtml += '</li>';
      } else {
        menuHtml += '<li data-id="' + item.id + '" class="miu-menu">';
        if (item.level == 1) {
          menuHtml += '<div data-level="' + item.level + '" data-href="'+item.url+'" class="miu-menu-title" style="padding-left: ' + paddingArr[item.level] + 'px">';
        } else if (item.level == 2) {
          menuHtml += '<div <div data-level="' + item.level + '" data-href="' + item.url +'" class="miu-menu-title"  style="padding-left: ' + paddingArr[item.level] + 'px">';
        } else if (item.level == 3) {
          menuHtml += '<div <div data-level="' + item.level + '" data-href="' + item.url +'" class="miu-menu-title" style="padding-left:' + paddingArr[item.level] + 'px">';
        }
        menuHtml += '<div class="title">';
        //图标处理
        if (item.icon !== undefined) {
          menuHtml += '<span class="miu-layout-menu-side-title-icon">';
          menuHtml += '<i class="' + item.icon + '"></i>'
          menuHtml += "</span>"
        }
        menuHtml += '<span class="miu-layout-menu-side-title">' + item.name + '</span >';
        menuHtml += '</div>';
        menuHtml += '</div>'
        menuHtml += '</li>';
      }
    })
    menuHtml += '</ul>';
    return menuHtml;
  }
  exports("MiuMenu", new MiuMenu())
});