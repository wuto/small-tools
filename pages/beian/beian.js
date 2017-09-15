// pages/info/info.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urldata: {},
    code: 0

  },

  formSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)

    if (e.detail.value.input != null && e.detail.value.input != '') {
      that.getUrl(e.detail.value.input)
    } else {
      wx.showToast({
        title: '请输入网址',

      })

    }
  },


  formReset: function () {
    console.log('form发生了reset事件')
  },

  //获取url的备案信息
  getUrl: function (uel) {
    var that = this;
    that.toast3Tap()
    wx.request({
      url: 'https://www.sojson.com/api/beian/' + uel,
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      
      success: function (res) {
        that.hideToast()
        console.log(res.data)
        if (res.data.type == 200 ) {// 获取到了备案信息
          that.setData({
            urldata: res.data,
            code: res.data.type
          })
         
        } else if (res.data.type == 300){//未备案
          wx.showToast({
            title: '未查询到备案信息',
          })

        }else{
          wx.showToast({
            title: '未查询到备案信息',
          })
        }

        that.hideToast();
      },

      fail: function (res) {
        console.log('fail')
        that.hideToast()
      },

      complete: function (res) {
        console.log('complete')
      },
    })

  },

  toast3Tap: function () {
    wx.showToast({
      title: "loading",
      icon: "loading"
      // duration: 5000
    })
  },
  hideToast: function () {
    wx.hideToast()
  }



})