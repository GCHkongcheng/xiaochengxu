var plugin = requirePlugin("chatbot");
Page({
  onLoad: function(){
    plugin.init({
        appid: "4OqHVvGy0Nm910S8ySFTtBR1AqbEuM", 
        openid: "gc", // 小程序用户的openid，必填项
        userHeader: "", // 用户头像,不传会弹出登录框
        userName: "", // 用户昵称,不传会弹出登录框
        anonymous: false, // 是否允许匿名用户登录，版本1.2.9后生效, 默认为false，设为true时，未传递userName、userHeader两个字段时将弹出登录框
        success: () => {console.log('success')},//非必填
        fail: (error) => {console.error('error')},//非必填
    });
    },
    data: {
      messages: [],
      inputText: ""
    },
    handleInput: function(e) {
      this.setData({
        inputText: e.detail.value
      });
    },
    sendMessage: function() {
      const { inputText } = this.data;
      if (inputText.trim()) {
        var chatbot = requirePlugin("chatbot");
        chatbot.send({
          query: inputText,
          success: (res) => {
            console.log('AI回答:', res);
            // 只保留最新的AI回答
            const newMessage = { content: res.answer, role: 'assistant' };
            this.setData({
              messages: [newMessage], // 替换messages数组，只保留最新的回答
              inputText: "" // 清空输入框
            });
          },
          fail: (error) => {
            console.error('发送失败', error);
          }
        });
      }
    }
  });
  