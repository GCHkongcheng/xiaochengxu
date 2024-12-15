Page({
  data:{
    swiperlist:[
      {id:1,url:'https://s2.loli.net/2024/12/14/7n8TtosRLqUvdub.png'},
      {id:2,url:'https://s2.loli.net/2024/12/14/VbxLsNPFJWQf1Rg.png'},
      {id:3,url:'https://s2.loli.net/2024/12/14/kmM6YnCOzFsfPTi.png'}
    ]
  },
  navigateToCalculator: function() {
    wx.navigateTo({
      url: '/pages/calculator/calculator'
    });
  },
  countWords: function() {
    wx.navigateTo({
      url: '/pages/word-count/word-count'
    });
  },
  drawLuckyNumber: function() {
    wx.navigateTo({
      url: '/pages/luckynumber/luckynumber'
    });
  },
  click: function() {
    wx.navigateTo({
      url: '/pages/click/click'
    });
  },
  hanglieshi: function() {
    wx.navigateTo({
      url: '/pages/hanglieshi/hanglieshi'
    });
  },
  yincang: function() {
    wx.navigateTo({
      url: '/pages/yincang/yincang'
    });
  }
});
