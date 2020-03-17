layui.use(['table'], function () {
  var table = layui.table;
  // 展示已知数据
  table.render({
    elem: '#table',
    height: 330,
    cols: [[ // 标题栏
      {
        field: 'id',
        title: 'ID',
        width: 80,
        sort: true
      }, {
        field: 'username',
        title: '用户名',
        event: 'collapse',
        templet: function (d) {
          return '<div style="position: relative;\n' + '    padding: 0 10px 0 20px;">' + d.username + '<i style="left: 0px;" lay-tips="展开" class="layui-icon layui-colla-icon layui-icon-right"></i></div>'
        },
        width: 120
      }, {
        field: 'email',
        title: '邮箱',
        minWidth: 150
      }, {
        field: 'sign',
        title: '签名',
        minWidth: 160
      }, {
        field: 'sex',
        title: '性别',
        width: 80
      }, {
        field: 'city',
        title: '城市',
        width: 100
      }, {
        field: 'experience',
        title: '积分',
        width: 80,
        sort: true
      }, {
        title: '操作',
        fixed: 'right',
        width: 80,
        align: 'center',
        fixed: 'right',
        toolbar: '#barDemo'
      }]],
    data: [{
      "id": "10001",
      "username": "杜甫",
      "email": "xianxin@layui.com",
      "sex": "男",
      "city": "浙江杭州",
      "sign": "人生恰似一场修行",
      "experience": "116",
      "ip": "192.168.0.8",
      "logins": "108",
      "joinTime": "2016-10-14"
    }, {
      "id": "10002",
      "username": "李白",
      "email": "xianxin@layui.com",
      "sex": "男",
      "city": "浙江杭州",
      "sign": "人生恰似一场修行",
      "experience": "12",
      "ip": "192.168.0.8",
      "logins": "106",
      "joinTime": "2016-10-14",
      "LAY_CHECKED": true
    }, {
      "id": "10003",
      "username": "王勃",
      "email": "xianxin@layui.com",
      "sex": "男",
      "city": "浙江杭州",
      "sign": "人生恰似一场修行",
      "experience": "65",
      "ip": "192.168.0.8",
      "logins": "106",
      "joinTime": "2016-10-14"
    }, {
      "id": "10004",
      "username": "贤心",
      "email": "xianxin@layui.com",
      "sex": "男",
      "city": "浙江杭州",
      "sign": "人生恰似一场修行",
      "experience": "666",
      "ip": "192.168.0.8",
      "logins": "106",
      "joinTime": "2016-10-14"
    }, {
      "id": "10005",
      "username": "贤心",
      "email": "xianxin@layui.com",
      "sex": "男",
      "city": "浙江杭州",
      "sign": "人生恰似一场修行",
      "experience": "86",
      "ip": "192.168.0.8",
      "logins": "106",
      "joinTime": "2016-10-14"
    }, {
      "id": "10006",
      "username": "贤心",
      "email": "xianxin@layui.com",
      "sex": "男",
      "city": "浙江杭州",
      "sign": "人生恰似一场修行",
      "experience": "12",
      "ip": "192.168.0.8",
      "logins": "106",
      "joinTime": "2016-10-14"
    }, {
      "id": "10007",
      "username": "贤心",
      "email": "xianxin@layui.com",
      "sex": "男",
      "city": "浙江杭州",
      "sign": "人生恰似一场修行",
      "experience": "16",
      "ip": "192.168.0.8",
      "logins": "106",
      "joinTime": "2016-10-14"
    }, {
      "id": "10008",
      "username": "贤心",
      "email": "xianxin@layui.com",
      "sex": "男",
      "city": "浙江杭州",
      "sign": "人生恰似一场修行",
      "experience": "106",
      "ip": "192.168.0.8",
      "logins": "106",
      "joinTime": "2016-10-14"
    }],
    skin: 'line', // 行边框风格
    even: true, // 开启隔行背景
    size: 'sm' // 小尺寸的表格
  });

  table.on('tool(test)', function (obj) {
	  
	return;
    var data = obj.data;
    if (obj.event === 'collapse') {
      var trObj = layui.$(this).parent('tr'); // 当前行
      var accordion = true // 开启手风琴，那么在进行折叠操作时，始终只会展现当前展开的表格。
      var content = '<table></table>' // 内容
      // 表格行折叠方法
      collapseTable({
        elem: trObj,
        accordion: accordion,
        content: content,
        success: function (trObjChildren, index) { // 成功回调函数
          // trObjChildren 展开tr层DOM
          // index 当前层索引
          trObjChildren.find('table').attr("id", index);
          table.render({
            elem: "#" + index,
            url: '/demo/table/user',
            limit: 3,
            cellMinWidth: 80,
            cols: [[{
              type: 'checkbox',
              fixed: 'left'
            }, {
              field: 'id',
              width: 80,
              title: 'ID',
              sort: true
            }, {
              field: 'username',
              title: '用户名'
            }, {
              field: 'sex',
              title: '性别',
              sort: true
            }, {
              field: 'city',
              title: '城市'
            }]]
          });

        }
      });

    }
  })

  function collapseTable(options) {
    var trObj = options.elem;
    if (!trObj) return;
    var accordion = options.accordion,
      success = options.success,
      content = options.content || '';
    var tableView = trObj.parents('.layui-table-view'); // 当前表格视图
    var id = tableView.attr('lay-id'); // 当前表格标识
    var index = trObj.data('index'); // 当前行索引
    var leftTr = tableView.find('.layui-table-fixed.layui-table-fixed-l tr[data-index="' + index + '"]'); // 左侧当前固定行
    var rightTr = tableView.find('.layui-table-fixed.layui-table-fixed-r tr[data-index="' + index + '"]'); // 右侧当前固定行
    var colspan = trObj.find('td').length; // 获取合并长度
    var trObjChildren = trObj.next(); // 展开行Dom
    var indexChildren = id + '-' + index + '-children'; // 展开行索引
    var leftTrChildren = tableView.find('.layui-table-fixed.layui-table-fixed-l tr[data-index="' + indexChildren + '"]'); // 左侧展开固定行
    var rightTrChildren = tableView.find('.layui-table-fixed.layui-table-fixed-r tr[data-index="' + indexChildren + '"]'); // 右侧展开固定行
    var lw = leftTr.width() + 15; // 左宽
    var rw = rightTr.width() + 15; // 右宽
    // 不存在就创建展开行
    if (trObjChildren.data('index') != indexChildren) {
      // 装载HTML元素
      var tr = '<tr data-index="' + indexChildren + '"><td colspan="' + colspan + '"><div style="height: auto;padding-left:' + lw + 'px;padding-right:' + rw + 'px" class="layui-table-cell">' + content + '</div></td></tr>';
      trObjChildren = trObj.after(tr).next().hide(); // 隐藏展开行
      var fixTr = '<tr data-index="' + indexChildren + '"></tr>';// 固定行
      leftTrChildren = leftTr.after(fixTr).next().hide(); // 左固定
      rightTrChildren = rightTr.after(fixTr).next().hide(); // 右固定
    }
    // 展开|折叠箭头图标
    trObj.find('td[lay-event="collapse"] i.layui-colla-icon').toggleClass("layui-icon-right layui-icon-down");
    // 显示|隐藏展开行
    trObjChildren.toggle();
    // 开启手风琴折叠和折叠箭头
    if (accordion) {
      trObj.siblings().find('td[lay-event="collapse"] i.layui-colla-icon').removeClass("layui-icon-down").addClass("layui-icon-right");
      trObjChildren.siblings('[data-index$="-children"]').hide(); // 展开
      rightTrChildren.siblings('[data-index$="-children"]').hide(); // 左固定
      leftTrChildren.siblings('[data-index$="-children"]').hide(); // 右固定
    }
    success(trObjChildren, indexChildren); // 回调函数
    heightChildren = trObjChildren.height(); // 展开高度固定
    rightTrChildren.height(heightChildren + 115).toggle(); // 左固定
    leftTrChildren.height(heightChildren + 115).toggle(); // 右固定
  }
});


