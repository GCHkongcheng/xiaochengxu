App({
  onLaunch: function () {
    // 调用API从本地获取数据
    let count = wx.getStorageSync('count') || 0;
    this.globalData = {
      count: count
    };
  },
  globalData: {
    count: 0
  },
  goBack: function() {
    wx.navigateBack({
      delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
    });
  }
});
