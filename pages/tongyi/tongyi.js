Page({
  data: {
    text: '',
    result: '' // 用来存储API返回的数据
  },
  onInput: function(e) {
    this.setData({
      text: e.detail.value
    });
  },
  fetchApiData: function() {
    var that = this;
    const token = '63c106ce1db55b731cbea377d14c2c9e'; // 替换为您的API令牌
    const text = this.data.text;
    wx.showLoading({ title: '加载中' });
    wx.request({
      url: `https://api.istero.com/resource/ai/tongyi/conversation?token=${token}&text=${text}`, // 接口地址
      method: 'GET',
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            result: res.data.data.answer // 更新数据，设置result为返回的数据
          });
          console.log(res.data);
        } else {
          console.error('error');
        }
      },
      fail: function() {
        console.error('请求失败');
      },
      complete: function() {
        wx.hideLoading();
      }
    });
  }
});
