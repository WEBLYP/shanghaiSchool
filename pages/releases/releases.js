// pages/releases/releases.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      name: 'lyp',
      src: '/static/img/1.png'
    },
    hasUserInfo: false,
    userInfo: {},
    shcj: {},
    load: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    if (app.globalData.shcj) {
      wx.hideLoading();
      that.setData({
        load: true,
        shcj: app.globalData.shcj
      })
    } else {
      wx.hideLoading();
      that.setData({
        load: true
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      this.logins();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        this.logins();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
          this.logins();
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUserInfo: function (e) {
    const that = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      //app.globalData.shcj = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        //shcj: e.detail.userInfo,
        hasUserInfo: true
      })
      if (that.data.hasUserInfo) {
        wx.showToast({
          title: '正在登录',
          icon: 'loading',
          duration: 2000,
          success: function (e) {
            if (app.globalData.userInfo) {
              that.getdata(app.globalData.userInfo);
            }
          }
        })
      }
    }
  },
  getdata: function (id) {
    const that = this;
    if (id != null) {
      wx.login({
        success(res) {
          const data = {
            code: res.code,
            userinfo: JSON.stringify(id)
          }
          wx.request({
            url: app.api +'sufe/index/getuserinfo',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: data,
            method: 'post',
            success(e) {
              //console.log(e)
              app.globalData.shcj = e.data[0];
              that.setData({
                shcj: e.data[0]
              });
            }
          })
        }
      })
    }
  },
  logins: function (e) {
    const that = this;
    if (that.data.hasUserInfo && !app.globalData.shcj) {
      that.getdata(app.globalData.userInfo);
    }
  },
  backhome:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})