// pages/releases/tougao/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  postdata: function(id) {
    const that = this;
    
    if (!app.globalData.shcj) {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })
      return
    }

    if(this.data.title=='' || this.data.content==''){
      wx.showToast({
        title: '请填写完整',
        icon:'none'
      })
      return
    }

    wx.showLoading({
      title: '发布投稿中',
    })
    const param = {
      uid: id,
      article: JSON.stringify({
        title: that.data.title,
        content: that.data.content
      })
    }
    wx.request({
      url: app.api+'sufe/user/examineArticle',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: param,
      method: 'post',
      success: function(e) {
        console.log(e)
        if (e.data.state == 1){
          wx.showToast({
            title: e.data.msg,
          })
        }
      }
    })
  },
  confirm:function(){
    const that = this
    if (app.globalData.shcj) {
      const id = app.globalData.shcj.Name_ID
      that.postdata(id);
    } else {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })
    }
  },
  getitle:function(e){
    this.setData({
      title:e.detail.value
    })
  },
  getcontent:function(e){
    this.setData({
      content: e.detail.value
    })
  },
  backhome:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})