// pages/information/information.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    lists1:[],
    page:1,
    page1:1,
    flag:0,
    text:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    this.getdata(this.data.page);
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
    const that = this;
    this.getdata(this.data.page);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const that = this;
    if(that.data.flag==0){
      that.setData({
        page: that.data.page + 1
      })
      that.getdata(that.data.page);
    }
    
    if (that.data.flag == 1) {
      that.setData({
        1: that.data.page1 + 1
      })
      that.getdata(that.data.page1);
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onDetailTapIndex: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  getdata: function () {
    const that = this;
    wx.showLoading({
      title: '数据加载中',
    });
    const param = {
      type: 3,
      limit:10,
      page: that.data.page
    }
    wx.request({
      url: app.api + 'sufe/index/getdataList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: param,
      method: 'post',
      success: function (e) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        that.setData({
          lists: that.data.lists.concat(e.data.over.data)
        })
        if (e.data.ongoing.max) {
          wx.showToast({
            title: '没有更多了',
            icon: 'none'
          })
        } 
      }
    })
  },
  godetail:function(e){
    wx.navigateTo({
      url: 'detail/index?id=' + e.currentTarget.dataset.id
    })
  },
  getext: function (e) {
    this.setData({
      text: e.detail.value
    })
  },
  searchtext: function () {
    wx.showLoading({
      title: '数据加载中',
    })
    const that = this;
    that.setData({
      flag: 1,
      lists1: []
    })

    let param = {
      type: 3,
      keyword: that.data.text,
      page: that.data.page1,
      limit: 10
    }
    
    wx.request({
      url: app.api + 'sufe/index/getdataList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: param,
      method: 'post',
      success: function (e) {
        wx.hideLoading();
        that.setData({
          lists1: that.data.lists1.concat(e.data.over.data)
        })
        if (e.data.ongoing.max) {
          wx.showToast({
            title: '没有更多了',
            icon: 'none'
          })
        } 
      }
    })
  },
  backhome:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})