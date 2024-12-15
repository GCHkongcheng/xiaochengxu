Page({
  data: {
    luckyNumber: '0'
  },
  onLoad: function(options) {
    // 页面加载时执行的函数
    this.checkAndUpdateLuckyNumber();
  },
  checkAndUpdateLuckyNumber: function() {
    const today = new Date();
    const storedDate = wx.getStorageSync('lastUpdated');
    const storedLuckyNumber = wx.getStorageSync('luckyNumber');
    
    // 检查是否是新的一天
    if (!storedDate || today.getDate() !== storedDate.getDate() || today.getMonth() !== storedDate.getMonth() || today.getFullYear() !== storedDate.getFullYear()) {
      this.updateLuckyNumber();
    } else {
      this.setData({ luckyNumber: storedLuckyNumber });
    }
  },
  updateLuckyNumber: function() {
    const luckyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const index = Math.floor(Math.random() * luckyNumbers.length);
    const luckyNumber = `今日幸运数字是：${luckyNumbers[index]}`;
    this.setData({ luckyNumber });
    
    // 存储幸运数字和更新日期
    const now = new Date();
    wx.setStorageSync('lastUpdated', now);
    wx.setStorageSync('luckyNumber', luckyNumber);
  },
  drawLuckyNumber: function() {
    // 可以保留这个函数用于手动刷新
    this.updateLuckyNumber();
  },
  goBack: function() {
    wx.navigateBack({
      delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
    });
  }
});
