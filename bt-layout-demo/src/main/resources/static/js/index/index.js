/**
*
*/
layui.use(['MiuMenu'], function () {
    var MiuMenu = layui.MiuMenu;
     layui.sessionData("MiuData", {
          key: 'token',
          value: 'dkdkdks'
        });
    MiuMenu.init({
        url: '/data/menu-data.json', //菜单地址
        cache: true//对菜单数据是否初始化
    })

});