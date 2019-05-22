// pages/home/home.js
const api = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    newGoods: [],
    hotGoods: [],
    recomGoods: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  // 首页头部 banner
  getHomeBanners() {
    var that = this;
    api._post('/homepage/banners').then(res => {
      this.setData({
        bannerList: res.data
      })
    })
  },

  // 首页新品列表
  getHomeNewGoods() {
    var that = this;
    var params = {
      type: 1
    };
    api._post('/homepage/goods', params).then(res => {
      // console.log(res.data)
      that.setData({
        newGoods: res.data
      })
    })
  },

  // 首页热卖列表
  getHomeHotGoods() {
    var that = this;
    var params = {
      type: 2
    };
    api._post('/homepage/goods', params).then(res => {
      // console.log(res.data)
      that.setData({
        hotGoods: res.data
      })
    })
  },

  // 首页推荐列表
  getHomeRecomGoods() {
    var that = this;
    var params = {
      type: 3
    };
    api._post('/homepage/goods', params).then(res => {
      // console.log(res.data)
      that.setData({
        recomGoods: res.data
      })
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
    // 首页banner
    this.getHomeBanners();

    // 首页新品商品
    this.getHomeNewGoods();

    // 首页热卖商品
    this.getHomeHotGoods();

    // 首页推荐商品
    this.getHomeRecomGoods();
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