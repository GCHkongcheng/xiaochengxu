Page({
  data: {
    result: '',
    expr:' '
  },
  onInput: function(e) {
    this.setData({
      expr: e.detail.value
    });
  },
  calculate: function() {
    const expr = this.data.expr;
    const url = `https://api.mathjs.org/v4/?expr=${encodeURIComponent(expr)}`;

    wx.request({
      url: url,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            result: res.data
          });
        } else {
          this.setData({
            result: '计算错误'
          });
        }
      },
      fail: () => {
        this.setData({
          result: '请求失败'
        });
      }
    });
  }
});
