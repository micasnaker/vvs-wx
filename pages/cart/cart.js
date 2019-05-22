// pages/cart/cart.js
const app = getApp();
const api = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopCartList: [],
    guessLike: []
  },

  // 去逛逛
  goHome() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },

  // 获取购物车列表
  getShopCartList() {
    var that = this;
    var id = wx.getStorageSync('UserList').id;
    var token_sc = wx.getStorageSync('UserList').token_sc;
    var params = {
      id: id,
      token_sc: token_sc
    }
    api._post('/shopping_cart/list', params).then(res => {
      // console.log(res.data)
      that.setData({
        shopCartList: res.data
      })
    })
  },

  // 猜你喜欢列表
  getGoodsGuessLike() {
    var that = this;
    var id = wx.getStorageSync('UserList').id;
    var token_sc = wx.getStorageSync('UserList').token_sc;
    var params = {
      id: id,
      token_sc: token_sc
    }
    api._post('/goods/guess_like', params).then(res => {
      // console.log(res.data)
      that.setData({
        guessLike: res.data
      })
      wx.setStorageSync('guessLike',res.data)
    })
  },

  // 去商品详情页
  toGoodsInfo(index) {
    var goods_id = index.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/home/goodsInfo/goodsInfo?id=' + goods_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getShopCartList();
    this.getGoodsGuessLike();
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