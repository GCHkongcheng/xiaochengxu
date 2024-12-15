Page({
  data: {
    totalWords: 0,
    wordsWithoutPunctuation: 0,
    inputText: ''
  },
  
  onInput: function(e) {
    this.setData({
      inputText: e.detail.value
    });
  },
  
  countWords: function() {
    const { inputText } = this.data;
    const totalWords = inputText.length;
    this.setData({
      totalWords
    });
  },
  
  countWordsWithoutPunctuation: function() {
    const { inputText } = this.data;
    // 去掉所有非中文、英文字母和数字的字符
    const cleanedText = inputText.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g, '');
    const wordsWithoutPunctuation = cleanedText.length;
    this.setData({
      wordsWithoutPunctuation
    });
  }
});
