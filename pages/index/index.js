Page({
  data: {
    result: '0',
    firstNumber: null,
    operator: null,
    hasResult: false // 用于标记是否已经有初步的结果
  },

  // 输入数字
  inputNumber: function(e) {
    const number = e.currentTarget.dataset.number;
    if (this.data.hasResult && this.data.result !== '0') {
      this.setData({
        result: number,
        hasResult: false
      });
    } else {
      this.setData({
        result: this.data.result === '0' && !this.data.result.includes('.') ? number : this.data.result + number
      });
    }
  },

  // 输入运算符
  inputOperator: function(e) {
    const operator = e.currentTarget.dataset.operator;
    if (this.data.operator) {
      this.equals(); // 如果已经有运算符，先计算当前结果
    }
    this.setData({
      firstNumber: this.data.result === '0' ? null : this.data.result,
      operator: operator,
      hasResult: true
    });
  },

  // 输入小数点
  point: function() {
    if (!this.data.result.includes('.')) {
      this.setData({
        result: this.data.result === '0' ? '0.' : this.data.result + '.'
      });
    }
  },

  // 清除操作
  clear: function() {
    this.setData({
      result: '0',
      firstNumber: null,
      operator: null,
      hasResult: false
    });
  },

  // 等于操作，计算结果
  equals: function() {
    if (this.data.operator) {
      this.calculate();
      this.setData({
        operator: null,
        firstNumber: this.data.result, // 设置新的 firstNumber 为计算结果
        hasResult: false
      });
    }
  },

  // 计算逻辑
  calculate: function() {
    let firstNumber = parseFloat(this.data.firstNumber);
    let secondNumber = parseFloat(this.data.result);
    let result = 0;
    switch (this.data.operator) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '*':
        result = firstNumber * secondNumber;
        break;
      case '/':
        if (secondNumber === 0) {
          this.setData({ result: 'Error' });
          return;
        }
        result = firstNumber / secondNumber;
        break;
    }
    this.setData({ result: String(result) });
  }
});
