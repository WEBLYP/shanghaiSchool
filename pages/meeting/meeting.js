// pages/meeting/meeting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    text: '',
    list: [],
    list1: [],
    wancheng: false,
    wancheng1: false,
    wancheng2: false,
    page: 1,
    page1: 1,
    page2: 1,
    hotpage: 1,
    hot: [],
    hotitem: '',
    end: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    if (app.globalData.hot) {
      that.setData({
        hot: app.globalData.hot
      })
    }
  },
  onDetailTap: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ //点击页面跳转，并带一个参数
      url: 'meetdetails/meetdetails?id=' + id
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
    this.getdata(this.data.flag, this.data.page, this.data.end);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      list: [],
      list1: [],
      list2: [],
      page: 1,
      page1: 1,
      page2: 1
    })
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
    this.getdata(this.data.flag, this.data.page);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(e) {
    const that = this;
    if (that.data.flag == 0) {
      that.setData({
        page: that.data.page + 1
      })
      that.getdata(that.data.flag, that.data.page);

    } else if (that.data.flag == 1) {
      that.setData({
        page1: that.data.page1 + 1
      })
      that.getdata(that.data.flag, that.data.page1, that.data.end);
    } else if (that.data.flag == 2) {
      that.setData({
        page2: that.data.page2 + 1
      })
      that.searchdata(that.data.page2)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  tabs: function(e) {
    const that = this;
    that.setData({
      flag: Number(e.currentTarget.dataset.index),
      list: [],
      list1: [],
      list2: [],
      page: 1,
      page1: 1,
      page2: 1,
      end: that.data.end
    })

    if (that.data.flag == 0) {
      that.getdata(that.data.flag, that.data.page)
    } else if (that.data.flag == 1) {
      that.setData({
        end: true
      })
      that.getdata(that.data.flag, that.data.page1, that.data.end)
    }

  },
  searchtext(e) {
    const that = this;
    if (that.data.hotitem != '') {
      that.setData({
        flag: 2,
        list2: []
      })
      that.searchdata(that.data.page2);
    } else {
      that.setData({
        flag: 0,
        list: []
      })
      that.searchdata(that.data.page2);
    }
  },
  getext: function(e) {
    this.setData({
      hotitem: e.detail.value
    })
  },
  getdata: function(flag, page, end) {
    const that = this
    wx.showLoading({
      title: '数据加载中',
    })
    let type = {
      type: 1,
      limit: 10,
      page: page
    }

    if(end && flag == 1){
      type = {
        type: 1,
        limit: 10,
        page: page,
        end: end
      }
    }

    wx.request({
      url: app.api + 'sufe/index/getdataList',
      method: 'post',
      data: type,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(e) {
        wx.stopPullDownRefresh()
        wx.hideLoading();
        if (flag == 0 && !e.data.ongoing.max) {
          if (e.data.ongoing.data) {
            that.setData({
              list: that.data.list.concat(e.data.ongoing.data),
              wancheng: true
            })
          }
        }

        if (flag == 1 && !e.data.over.max) {
          if (e.data.over.data) {
            that.setData({
              list1: that.data.list1.concat(e.data.over.data),
              wancheng1: true
            })
          }
        }

        if (that.data.flag == 0 && e.data.ongoing.max) {
          wx.showToast({
            title: '没有更多了',
            icon: 'none'
          })
        } else if (that.data.flag == 1 && e.data.over.max) {
          wx.showToast({
            title: '没有更多了',
            icon: 'none'
          })
        } else if (that.data.flag == 2 && e.data.over.max) {
          wx.showToast({
            title: '没有更多了',
            icon: 'none'
          })
        }

      }
    })
  },
  writehot: function(e) {
    let hot = e.currentTarget.dataset.hot;
    let tip = e.currentTarget.dataset.hot + '_1';
    this.setData({
      hotitem: hot,
      list2: [],
      flag: 2,
      page2: 1
    })
    const that = this;
    that.searchdata(that.data.page2, tip);
  },
  searchdata: function(page, tt) {
    const that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    let param = {
      type: 1,
      keyword: that.data.hotitem,
      page: that.data.page2,
      limit: 10
    }

    if (tt) {
      param = {
        type: 1,
        keyword: tt,
        page: that.data.page2,
        limit: 10
      }
    }

    wx.request({
      url: app.api + 'sufe/index/getdataList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: param,
      method: 'post',
      success: function(e) {
        wx.hideLoading()
        that.setData({
          list2: that.data.list2.concat(e.data.over.data),
          wancheng2: true
        })
        if (that.data.flag == 2 && e.data.over.max) {
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