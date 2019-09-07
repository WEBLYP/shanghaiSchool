//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    shang:'',
    flag:false,
    prize:{},
    addd: true
   
  },
  onLaunch:function(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.gethot();
    if(wx.getStorageSync('addd')=='hide'){
      this.setData({
        addd:false
      })
    }
  },
  onDetailTap1: function(event) {
    wx.navigateTo({ //点击页面跳转，并带一个参数
      url: '../meeting/meeting'
    })
  },
  onDetailTap2: function(event) {
    wx.navigateTo({ //点击页面跳转，并带一个参数
      url: '../recruitment/recruitment'
    })
  },
  onDetailTap3: function(event) {
    wx.navigateTo({ //点击页面跳转，并带一个参数
      url: '../information/information'
    })
  },
  onDetailTap4: function(event) {
    wx.navigateTo({ //点击页面跳转，并带一个参数
      url: '../query/query'
    })
  },
  onDetailTap5: function(event) {
    wx.navigateTo({ //点击页面跳转，并带一个参数
      url: '../LIS/lis'
    })
  },
  onDetailTap6: function(event) {
    wx.navigateTo({ //点击页面跳转，并带一个参数
      url: '../releases/releases'
    })
  },
  onDetailTap7: function(event) {
    wx.navigateTo({ //点击页面跳转，并带一个参数
      url: '../collection/collection'
    })
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
  gethot() {
    const that = this
    wx.request({
      url: app.api + 'sufe/index/getTag',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success: function(e) {
        app.globalData.hot=e.data;
      }
    });


    wx.request({
      url: app.api +'sufe/index/getwechat',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success:function(e){
        console.log(e)
        that.setData({
          prize:e.data
        })
      }
    })


  },
  shang:function(){
    this.setData({
      flag: true
    })
  },
  close:function(){
    this.setData({
      flag:!this.data.flag
    })
  },
  closeaddd: function(){
    this.setData({
      addd: false
    })
    
    wx.setStorageSync('addd', 'hide')

  },
  link:function(e){
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.zh,
      success(res) {
        setTimeout(function () {
          wx.getClipboardData({
            success(res) {
              wx.showModal({
                title: res.data,
                content: '已复制支付宝账号',
                success(res) {
                }
              })
            }
          })
        }, 1500)
      }
    })
  }
})