Page({
  data: {
    inputVal: '',
    range: ['二进制', '八进制', '十进制', '十六进制'],
    rangeIndex: 2, // 默认选择十进制
    targetRange: ['二进制', '八进制', '十进制', '十六进制'],
    targetRangeIndex: 0, // 默认选择二进制
    result: ''
  },
  onInput: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onRangeChange: function(e) {
    this.setData({
      rangeIndex: e.detail.value
    });
  },
  onTargetRangeChange: function(e) {
    this.setData({
      targetRangeIndex: e.detail.value
    });
  },
  convert: function() {
    const { inputVal, rangeIndex, targetRangeIndex } = this.data;
    let result = '';
    let base = parseInt(inputVal, this.getBase(this.data.range[rangeIndex]));

    if (!isNaN(base)) {
      switch (targetRangeIndex) {
        case 0: // 二进制
          result = base.toString(2);
          break;
        case 1: // 八进制
          result = base.toString(8);
          break;
        case 2: // 十进制
          result = base.toString(10);
          break;
        case 3: // 十六进制
          result = base.toString(16).toUpperCase();
          break;
        default:
          result = '无效的目标进制';
      }
    } else {
      result = '输入的数值无效';
    }

    this.setData({
      result
    });
  },
  getBase: function(baseName) {
    switch (baseName) {
      case '二进制':
        return 2;
      case '八进制':
        return 8;
      case '十进制':
        return 10;
      case '十六进制':
        return 16;
      default:
        return 10;
    }
  }
});
