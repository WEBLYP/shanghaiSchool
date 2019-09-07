// pages/information/detail/index.js
const app = getApp();
const window = window;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://www.cingta.com/detail/9520',
    list: [],
    id: null,
    uid:null,
    article:'',
    linkurl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    that.setData({
      id: options.id
    })
    // if (!app.globalData.shcj) {
    //   wx.showToast({
    //     title: '请登录',
    //     icon: 'none'
    //   })
    //   setTimeout(() => {
    //     wx.navigateTo({
    //       url: '/pages/releases/releases',
    //     })
    //   }, 1000);
    //   return
    // }

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
    // if (app.globalData.shcj){
    //   this.setData({
    //     uid: app.globalData.shcj.Name_ID
    //   })
    //   this.getdata(that.data.id);
    // }
    this.getdata(that.data.id);
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
  onShareAppMessage: function(res) {
    if (res.from === 'button') {

    }
    return {
      title: '图情招聘',
      imageUrl: '',
      path: '/pages/information/detail/index?id=' + this.data.id,
      success: function(res) {
        console.log('成功', res)
      }
    }
  },
  backhome: function() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  share: function() {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  link: function(e) {
    wx.setClipboardData({
      data: this.data.linkurl,
      success(res) {
        setTimeout(function() {
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
  },
  getdata: function(index) {
    const that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    const param = {
      // uid:that.data.uid,
      detail_id: index
    }
    const test = '<h1>这里是详情页</h1>';
    wx.request({
      url: app.api + 'sufe/index/getDetails',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: param,
      method: 'post',
      success: function(e) {
        wx.hideLoading()
        const regex = new RegExp('<img', 'gi');
        let result = e.data[0].content.replace(regex, `<img style="max-width: 100%;"`);  
        that.setData({
          article: result,
          linkurl:e.data[0].linkurl
        })
      }
    })
  }
})