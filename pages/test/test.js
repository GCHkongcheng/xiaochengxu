// pages/index/index.js
Page({
  data: {
    clicks: 0,
    testStarted: false,
    timer: 10,
    showResult: false,
    clicksPerSecond: 0,
    interval: null,
    historyBest: '暂无' // 存储历史最佳成绩，默认显示“暂无”
  },

  onLoad: function() {
    // 页面加载时，从本地存储中读取历史最佳成绩
    const historyBest = wx.getStorageSync('historyBest');
    if (historyBest) {
      this.setData({ historyBest }); // 如果存在历史最佳成绩，则更新视图数据
    }
  },

  startTest: function() {
    // 开始测试前重置数据
    this.setData({
      clicks: 0, // 重置点击次数
      testStarted: true, // 标记测试已开始
      timer: 10, // 重置倒计时
      showResult: false, // 隐藏结果
      clicksPerSecond: 0, // 重置手速结果
      interval: null // 清除之前的定时器
    });
    // 开始倒计时
    this.countdown();
  },

  countdown: function() {
    let that = this;
    // 设置定时器，每秒减少timer的值
    this.setData({
      interval: setInterval(function() {
        if (that.data.timer === 0) {
          clearInterval(that.data.interval); // 倒计时结束，清除定时器
          that.endTest(); // 调用结束测试的函数
        } else {
          that.setData({
            timer: that.data.timer - 1 // 倒计时减少
          });
        }
      }, 1000)
    });
  },

  countClicks: function() {
    // 只有在测试进行中且倒计时未结束时，才记录点击次数
    if (this.data.testStarted && this.data.timer > 0) {
      let newClicks = this.data.clicks + 1;
      this.setData({
        clicks: newClicks // 更新点击次数
      });
    }
  },

  endTest: function() {
    // 测试结束，清除定时器
    clearInterval(this.data.interval);
    // 计算手速
    let clicksPerSecond = this.data.clicks / 10;
    this.setData({
      clicksPerSecond: clicksPerSecond.toFixed(2) // 更新手速结果
    });
    // 比较当前成绩和历史最佳成绩，更新历史最佳成绩
    if (clicksPerSecond > parseFloat(this.data.historyBest) || this.data.historyBest === '暂无') {
      wx.setStorageSync('historyBest', clicksPerSecond.toFixed(2)); // 存储到本地存储
      this.setData({
        historyBest: clicksPerSecond.toFixed(2) // 更新视图数据
      });
    }
    // 更新页面数据
    this.setData({
      testStarted: false, // 标记测试结束
      showResult: true // 显示结果
    });
  },
  cancelTest: function() {
    // 清除定时器
    if (this.data.interval) {
      clearInterval(this.data.interval);
    }
    // 重置测试状态
    this.setData({
      testStarted: false,
      timer: 10,
      clicks: 0,
      clicksPerSecond: 0,
      interval: null,
      showResult: false
    });
  },
});
