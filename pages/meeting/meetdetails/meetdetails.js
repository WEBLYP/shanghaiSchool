// pages/meeting/meetdetails/meetdetails.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    detail:{},
    id:null,
    tags: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        id:options.id
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
    this.getdata(this.data.id);
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
  collect: function () {
    const that = this
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
    this.setData({
      flag: !this.data.flag
    })
    const param = {
      type: 1,
      uid: app.globalData.shcj.Name_ID,
      sid: that.data.id
    }
    wx.request({
      url: app.api + 'sufe/user/addRescourse',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: param,
      method: 'post',
      success: function (e) {
        console.log(e)
      }
    })
  },
  share:function(){
    
  },
  onDetailTapIndex: function (event) {
    wx.navigateTo({  //点击页面跳转，并带一个参数
      url: '/pages/index/index'
    })
  },
  getdata: function (id) {
    const that = this;
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
      success: function (e) {
        const tags = e.data[0].introduce == null ? '' : e.data[0].introduce.split(',');
        that.setData({
          detail: e.data[0],
          tags: tags,
          flag: e.data[0].collection,
          id: id,
          type: e.data[0].type
        })
      }
    })
  },
  link:function(e){
    const that = this;
    wx.setClipboardData({
      data: e.currentTarget.dataset.url,
      success(res) {
        setTimeout(function () {
          wx.getClipboardData({
            success(res) {
              wx.showModal({
                title: res.data,
                content: '已复制链接',
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