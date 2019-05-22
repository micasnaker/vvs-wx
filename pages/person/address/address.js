// pages/person/address/address.js
const app = getApp();
const api = require("../../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    edit_list: [],
    disabled:true
  },

  // 获取收货地址列表
  getAddressList() {
    var that = this;
    var id = wx.getStorageSync('UserList').id;
    var token_sc = wx.getStorageSync('UserList').token_sc;
    var params = {
      id: id,
      token_sc: token_sc
    }
    api._post('/address/list', params).then(res => {
      // console.log(res.data)
      that.setData({
        addressList: res.data
      })
    })
  },

  //新增收货地址 
  add_Address() {
    var user = wx.getStorageSync('UserList');
    if (user) {
      wx.navigateTo({
        url: '/pages/person/address/addAddress/addAddress',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'fail',
        duration: 1000
      })
    }

  },

  // 编辑地址
  edit(item) {
    var that = this;
    var edit_id = item.currentTarget.dataset.id
    // console.log(edit_id)
    // console.log(that.data.addressList)
    // 循环出每一项地址
    for (var i = 0; i <= that.data.addressList.length; i++) {
      if (that.data.addressList[i]) {
        // 循环出的每一项id
        var ids = that.data.addressList[i].id
      }
      // 如果循环出的id和选中的id相等
      if (ids == edit_id) {
        // console.log(that.data.addressList[i])
        // 所选中的那一项的用户地址
        that.setData({
          edit_list: that.data.addressList[i]
        })
      }
    }
    // console.log(that.data.edit_list)
    wx.navigateTo({
      url: '/pages/person/address/editAddress/editAddress?edit_list=' + JSON.stringify(that.data.edit_list),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAddressList();
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
    this.getAddressList();
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