// pages/home/goodsInfo/goodsInfo.js
const app = getApp();
const api = require("../../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btuBottom: "",
    goodsInfo: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    current: 'tab1',
    current_scroll: 'tab1',
    tab1: true
  },

  // tabs 切换
  handleChange({
    detail
  }) {
    var index = detail.key
    this.setData({
      current: detail.key
    });
    if (index === "tab1") {
      this.setData({
        tab1: true,
        tab2: false,
        tab3: false
      })
    } else if (index === "tab2") {
      this.setData({
        tab1: false,
        tab2: true,
        tab3: false
      })
    } else {
      this.setData({
        tab1: false,
        tab2: false,
        tab3: true
      })
    }
  },

  handleChangeScroll({
    detail
  }) {
    this.setData({
      current_scroll: detail.key
    });
  },

  // 获取商品详情
  getGoodsInfo() {
    var that = this;
    // 商品 id
    var goods_id = app.globalData.goodsId
    var params = {
      goods_id: goods_id
    }
    api._post('/goods/info', params).then(res => {
      that.setData({
        goodsInfo: res.data
      })
    })
  },

  // 商品加入购物车
  toShopCart() {
    var goods_id = app.globalData.goodsId
    var user = wx.getStorageSync('UserList')
    var id = user.id
    var token_sc = user.token_sc
    var params = {
      id: id,
      token_sc: token_sc,
      goods_id: goods_id,
      count: 1
    }
    api._post('/shopping_cart/add', params).then(res => {
      // console.log(res)
      if (res.error_code == 0) {
        wx.showToast({
          title: '加入成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 适配iphonex
    let isPhone = app.globalData.isIphoneX;
    if (isPhone) {
      this.setData({
        btuBottom: "68rpx",
      })
    }

    // 拿到商品id
    // 全局缓存商品id
    app.globalData.goodsId = options.id;

    // 商品详情
    this.getGoodsInfo();

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