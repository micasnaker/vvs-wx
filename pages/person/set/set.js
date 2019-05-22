// pages/person/set/set.js
const app = getApp();
const api = require("../../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible2: false,
  },

  // 退出登录
  loginOut() {
    var id = wx.getStorageSync('UserList').id
    var token_sc = wx.getStorageSync('UserList').token_sc
    var params = {
      id: id,
      token_sc: token_sc
    }
    wx.showModal({
      title: '提示',
      content: '确定退出登录吗',
      success(res) {
        if (res.confirm) {
          console.log('确定登录成功')
          api._post('/members/logout', params).then(res => {
            if (res.error_code == 0) {
              wx.clearStorage();
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 1000
              })
              wx.switchTab({
                url: '/pages/person/person',
              })
            }
          })
        } else if (res.cancel) {
          console.log('取消退出登录')
        }
      }
    })

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