Page({
  data: {
    result: '',
    expr:' '
  },
  showyiyan: function() {
    const url = `https://v.api.aa1.cn/api/yiyan/index.php`;
    wx.request({
      url: url,
      method: 'GET',
      success: (res) => {
        const content = res.data.match(/<p>(.*?)<\/p>/)[1];
          this.setData({
            result: content
          });
        },
      fail: () => {
        this.setData({
          result: '不想说话'
        });
      }
    });
  }
});
