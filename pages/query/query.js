// pages/query/query.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotdata: [],
    hotext: '',
    qikans: [{
        'subject': '社会学',
        name: '理论观察',
        'level': '国家级',
        'url': 'http://www.baidu.com'
      },
      {
        'subject': '社会学',
        name: '理论观察',
        'level': '国家级',
        'url': 'http://www.sougou.com'
      }
    ],
    list: [],
    list1: [],
    wancheng: false,
    wancheng1:false,
    page: 1,
    page1: 1,
    key: null,
    year:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getdata();
    this.setData({
      hotdata: app.globalData.hot
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
    let year = new Date().getFullYear();
    this.setData({
      year:year
    })
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
    this.getdata();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    const that = this;
    if (that.data.key) {
      that.setData({
        page1: that.data.page1 + 1
      })
      that.getdata(that.data.key, that.data.page1)
    } else {
      that.setData({
        page: that.data.page + 1
      })
      that.getdata(null, that.data.page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  pulls: function(e) {
    this.setData({
      hotext: e.currentTarget.dataset.hot
    })
  },
  link: function(e) {
    const url = e.currentTarget.dataset.url;
    wx.setClipboardData({
      data: url,
      success(res) {
        setTimeout(function() {
          wx.getClipboardData({
            success(res) {
              wx.showModal({
                title: res.data,
                content: '已复制链接',
                success(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: './lianjie/index?url=' + url,
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          })
        }, 1500)
      }
    })
  },
  getdata: function(key, page) {
    const that = this;
    let msg = '数据加载中'
    let param = {
      type: 4,
      limit: 10,
      page: that.data.page
    }

    if (key) {
      param = {
        type: 4,
        keyword: key,
        limit: 10,
        page: that.data.page1
      };

      msg = '搜索中'
    }

    wx.showLoading({
      title: msg,
    });

    wx.request({
      url: app.api + 'sufe/index/getdataList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: param,
      method: 'post',
      success: function(e) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (e.data.over.max) {
          wx.showToast({
            title: '没有更多了',
            icon:'none'
          })
        } else if(!that.data.key){
          that.setData({
            list: that.data.list.concat(e.data.over.data),
            wancheng: true
          })
        }else if(that.data.key){
          that.setData({
            list1: that.data.list1.concat(e.data.over.data),
            wancheng1: true
          })
        }
      }
    })
  },
  getext(e) {
    this.setData({
      hotext: e.detail.value
    })
  },
  searchtext: function(e) {
    const that = this
    const key = that.data.hotext
    that.setData({
      key: key,
      list1:[]
    })
    that.getdata(key, that.data.page1);
  },
  backhome:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})