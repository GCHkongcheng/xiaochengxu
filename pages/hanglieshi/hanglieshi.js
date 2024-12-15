Page({
  data: {
    range: [2, 3, 4, 5], // 增加5阶行列式
    order: null, // 当前选择的行列式阶数，默认为 null
    matrix: [], // 行列式矩阵
    result: null // 行列式结果
  },

  // 选择行列式阶数时更新矩阵
  onPickerChange: function(e) {
    const order = parseInt(this.data.range[e.detail.value]);
    this.setData({
      order: order,
      matrix: this.generateMatrix(order) // 生成对应阶数的矩阵
    });
  },

  // 生成空矩阵，初始化为 ""
  generateMatrix: function(order) {
    const matrix = [];
    for (let i = 0; i < order; i++) {
      matrix.push(new Array(order).fill("")); // 使用空字符串初始化每个单元格
    }
    return matrix;
  },

  // 输入框发生变化时更新矩阵
  onInput: function(e) {
    const { row, col } = e.currentTarget.dataset; // 获取行列索引
    const value = e.detail.value; // 获取输入的值

    // 确保 row 和 col 是有效的
    if (row === undefined || col === undefined || isNaN(value)) {
      console.error('Invalid input:', row, col, value);
      return;
    }

    // 更新矩阵中的对应值
    const matrix = this.data.matrix;
    if (matrix[row] && matrix[row][col] !== undefined) {
      matrix[row][col] = parseFloat(value) || ""; // 输入为空或无效时恢复为空字符串
      this.setData({ matrix }); // 更新数据
    } else {
      console.error('Matrix element not found:', row, col);
    }
  },

  // 计算行列式
  calculateDeterminant: function() {
    const matrixData = this.data.matrix;

    // 检查矩阵是否完整（是否有空值）
    if (matrixData.some(row => row.some(cell => cell === "" || isNaN(cell)))) {
      this.setData({ result: '请填写完整的行列式' });
      return;
    }

    try {
      const determinant = this.calculate(matrixData);
      this.setData({ result: determinant });
    } catch (error) {
      this.setData({ result: '计算出错' });
    }
  },

  // 递归计算行列式
  calculate: function(matrix) {
    // 基本情况：1x1矩阵
    if (matrix.length === 1) return matrix[0][0];

    // 基本情况：2x2矩阵
    if (matrix.length === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;
    for (let i = 0; i < matrix.length; i++) {
      // 获取子矩阵
      const subMatrix = this.getSubMatrix(matrix, 0, i);
      // 使用拉普拉斯展开式
      det += (i % 2 === 0 ? 1 : -1) * matrix[0][i] * this.calculate(subMatrix);
    }
    return det;
  },

  // 获取子矩阵：去掉指定的行和列
  getSubMatrix: function(matrix, rowToRemove, colToRemove) {
    return matrix.slice(1).map(row => 
      row.filter((_, colIdx) => colIdx !== colToRemove)
    );
  }
});
