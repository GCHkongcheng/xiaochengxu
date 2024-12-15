// page.js
Page({
  data: {
    count: 0,
    clicks: 0,
    testStarted: false,
    timer: '10',
    showResult: false,
    clicksPerSecond: 0,
    interval: null
  },
  onLoad: function () {
    // 页面加载时从全局变量中获取数值，并更新页面显示
    this.setData({
      count: getApp().globalData.count
    });
  },
  onIncrement: function () {
    // 点击按钮时，增加数值
    let newCount = getApp().globalData.count + 1;
    // 更新全局变量
    getApp().globalData.count = newCount;
    // 更新本地存储
    wx.setStorageSync('count', newCount);
    // 更新页面显示
    this.setData({
      count: newCount
    });
  },
  onClear: function () {
    // 清空数值
    getApp().globalData.count = 0;
    // 更新本地存储
    wx.setStorageSync('count', 0);
    // 更新页面显示
    this.setData({
      count: 0
    });
  },
  test: function() {
    wx.navigateTo({
      url: '/pages/test/test'
    });
  }
});
