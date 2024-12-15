Page({
  data: {
    password: '',  // 用户输入的密码
    showContent: false,  // 是否显示内容
    errorMessage: ''  // 错误提示信息
  },

  // 监听输入框变化
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  // 提交密码时验证
  onSubmitPassword() {
    const correctPassword = '060129';  // 这里设定正确的密码
    
    if (this.data.password === correctPassword) {
      // 密码正确，显示页面内容
      this.setData({
        showContent: true,
        errorMessage: ''  // 清空错误信息
      });
    } else {
      // 密码错误，显示提示
      this.setData({
        errorMessage: 'error',
        password: ''  // 清空输入框
      });
    }
  }
});
