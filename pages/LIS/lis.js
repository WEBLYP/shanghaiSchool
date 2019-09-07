// pages/LIS/lis.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportlist: [{
        'year': 2018,
        'id': 0
      },
      {
        'year': 2019,
        'id': 1
      }
    ],
    text:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getdata()
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
    this.getdata()
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
  getdata:function(){
    const that = this;
    wx.showLoading({
      title: '数据加载中',
    });
    const type={
      type:5,
      limit:5,
      page:1
    }
    wx.request({
      url: app.api+'sufe/index/getdataList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: type,
      method: 'post',
      success:function(e){
        wx.hideLoading();
        wx.stopPullDownRefresh();
        that.setData({
          text: e.data
        })
      }
    })
  },
  backhome:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})