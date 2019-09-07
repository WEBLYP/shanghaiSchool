// pages/releases/huiyi/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    name: '',
    place: '',
    types: ['会议1', '会议2'],
    type: '请选择会议的类型',
    date: '请选择会议日期',
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getips();
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
  geturl: function(e) {
    const val = e.detail.value;
    this.setData({
      url: val
    });
  },
  getname: function(e) {
    const val = e.detail.value;
    this.setData({
      name: val
    });
  },
  getplace: function(e) {
    const val = e.detail.value;
    this.setData({
      place: val
    });
  },
  huiyi: function(e) {
    console.log(e)
    const that = this;
    this.setData({
      type: that.data.types[e.detail.value].title,
      id: that.data.types[e.detail.value].id
    })
  },
  getdate: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  gettime: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  confirm: function() {
    const that = this;

    if (!app.globalData.shcj) {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })
      return
    }

    if (that.data.url == null || that.data.name == null || that.data.url.length == 0 || that.data.name.length == 0) {
      wx.showToast({
        title: '请检查是否填写完整',
        icon: 'none',
        duration: 1000
      })
      return
    }
    wx.showLoading({
      title: '发布中',
    })
    const param = {
      'uid': app.globalData.shcj.Name_ID,
      rescourse: JSON.stringify({
        'linkurl': that.data.url,
        'title': that.data.name,
        'introduce': that.data.id,
        'ftitle': that.data.place,
        'sendtime': that.data.date
      })
    }
    wx.request({
      url: app.api + 'sufe/user/examineResources',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: param,
      method: 'post',
      success: function(e) {
        wx.showToast({
          title: e.data.msg,
        })
      }
    })

  },
  getips() {
    const that = this;
    that.setData({
      types: app.globalData.hot
    })
  },
  backhome:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})