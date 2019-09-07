// pages/recruitment/detail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    url: 'https://m.kuaidi100.com',
    detail: {},
    tags: [],
    id: null,
    type:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getdata(options.id)
    if (options.id){
      this.setData({
        id: options.id
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    if(this.data.id){
      this.getdata(this.data.id)
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

    if (res.from === 'button') {

    }
    return {
      title: '图情招聘',
      imageUrl: '',
      path: '',
      success: function(res) {
        console.log('成功', res)
      }
    }

  },
  onDetailTapIndex: function() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  collect: function() {
    this.setData({
      flag: !this.data.flag
    })
    const that = this;
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
      type: 2,
      uid: app.globalData.shcj.Name_ID,
      sid: that.data.id
    }
    wx.request({
      url: app.api +'sufe/user/addRescourse',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: param,
      method: 'post',
      success:function(e){
      }
    })
  },
  link: function(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.url,
      success(res) {
        setTimeout(function() {
          wx.getClipboardData({
            success(res) {
              wx.showModal({
                title: res.data,
                content: '已复制链接',
                success(res) {
                  // if (res.confirm) {
                  //   wx.navigateTo({
                  //     url: '/pages/weblink/index?url=' + e.currentTarget.dataset.url,
                  //   })
                  // } else if (res.cancel) {
                  //   console.log('用户点击取消')
                  // }
                }
              })
            }
          })
        }, 1500)
      }
    })
  },
  getdata: function(id) {
    const that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    const param = {
      //uid: app.globalData.shcj.Name_ID,
      detail_id: id
    }
    wx.request({
      url: app.api + 'sufe/index/getDetails',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: param,
      method: 'post',
      success: function(e) {
        wx.hideLoading()
        that.setData({
          detail: e.data[0],
          tags: e.data[0].relative.split(','),
          flag: e.data[0].collection,
          id: id,
          type: e.data[0].type
        })
      }
    })
  }
})