// pages/login/login.js
const app = getApp();
const api = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //获取用户输入的用户名
  phone: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },

  //获取用户输入的密码
  pass: function(e) {
    this.setData({
      userPwd: e.detail.value
    })
  },

  // 登录
  login() {
    var that = this;
    var phone = that.data.userName;
    var pass = that.data.userPwd;
    // console.log("用户名：" + phone + " 密码：" + pass);
    var params = {
      phone: phone,
      pass: pass
    }
    api._post('/members/login', params).then(res => {
      if (res.error_code == 0) {
        // 本地储存用户信息
        wx.setStorageSync('UserList', res.data)
        // 全局缓存用户信息
        app.globalData.userList = res.data;
        // 成功就跳转tabbar home页面
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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

  }
})