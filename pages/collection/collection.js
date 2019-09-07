// pages/collection/collection.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 1,
    lists: [],
    lists1: [],
    wancheng: false,
    wancheng1: false,
    page: 1,
    page1: 1
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
    const that = this
    that.setData({
      lists: [],
      lists1: []
    })
    if (that.data.lists.length == 0) {
      that.getdata(that.data.flag, that.data.page)
    }
    
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
    const that = this
    that.setData({
      lists: [],
      lists1: []
    })
    that.getdata(that.data.flag, that.data.page)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    const that = this;
    if (that.data.flag == 1) {
      that.setData({
        page: that.data.page + 1
      })
      that.getdata(that.data.flag, that.data.page)
    }
    if (that.data.flag == 2) {
      that.setData({
        page1: that.data.page1 + 1
      })
      that.getdata(that.data.flag, that.data.page1)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  tabs: function(e) {
    const that = this
    this.setData({
      flag: e.currentTarget.dataset.index,
      lists: [],
      lists1: [],
      page: 1,
      page1: 1
    })

    if (that.data.flag == 1) {
      that.getdata(that.data.flag, that.data.page)
    } else if (that.data.flag == 2) {
      that.getdata(that.data.flag, that.data.page1)
    }

  },
  getdata: function(flag, page) {
    const that = this;
    wx.showLoading({
      title: '加载中',
    })
    if (!app.globalData.shcj) {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })

      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/releases/releases',
        })
      }, 1000);

      return
    }

    const param = {
      type: that.data.flag,
      uid: app.globalData.shcj.Name_ID,
      limit: 10,
      page: page
    }

    wx.request({
      url: app.api + 'sufe/user/getRescourse',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: param,
      method: 'post',
      success: function(e) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (flag == 1 && !e.data.max) {
          if (e.data.data) {
            that.setData({
              lists: that.data.lists.concat(e.data.data),
              wancheng: true
            })
          }
        }

        if (flag == 2 && !e.data.max) {
          if (e.data.data) {
            that.setData({
              lists1: that.data.lists1.concat(e.data.data),
              wancheng1: true
            })
          }
        }

        if (flag == 1 && e.data.max) {
          wx.showToast({
            title: '没有更多了',
            icon: 'none'
          })
        } else if (flag == 2 && e.data.max) {
          wx.showToast({
            title: '没有更多了',
            icon: 'none'
          })
        }

      }
    })
  },
  backhome: function() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})