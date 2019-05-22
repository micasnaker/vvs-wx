// pages/person/orderList/orderList.js
const app = getApp();
const api = require("../../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    current_scroll: 'tab1',
    tab1: true,
    orderList:[],
    guessList:[],
    obligationList:[],
    unDeliverList:[],
    deliverList:[],
    evaluate:[]
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
        tab3: false,
        tab4: false,
        tab5: false
      })
    } else if (index === "tab2") {
      this.setData({
        tab1: false,
        tab2: true,
        tab3: false,
        tab4: false,
        tab5: false
      })
    } else if (index === "tab3") {
      this.setData({
        tab1: false,
        tab2: false,
        tab3: true,
        tab4: false,
        tab5: false
      })
    } else if (index === "tab4") {
      this.setData({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: true,
        tab5: false
      })
    } else {
      this.setData({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: true
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

  // 去逛逛
  goHome() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },

  // 获取全部订单列表
  getOrderList() {
    var that = this;
    var id = wx.getStorageSync('UserList').id;
    var token_sc = wx.getStorageSync('UserList').token_sc;
    var params = {
      id: id,
      token_sc: token_sc,
      status:'',
      page_size:3,
      page:1
    }
    api._post('/orders/list',params).then(res=>{
      // console.log(res.data)
      that.setData({
        orderList : res.data
      })
    })
  },

  // 获取待付款订单列表
  getObligationOrderList() {
    var that = this;
    var id = wx.getStorageSync('UserList').id;
    var token_sc = wx.getStorageSync('UserList').token_sc;
    var params = {
      id: id,
      token_sc: token_sc,
      status: 0,
      page_size: 3,
      page: 1
    }
    api._post('/orders/list', params).then(res => {
      // console.log(res.data.list)
      that.setData({
        obligationList: res.data
      })
    })
  },

  // 获取待发货订单列表
  getUnDeliverOrderList() {
    var that = this;
    var id = wx.getStorageSync('UserList').id;
    var token_sc = wx.getStorageSync('UserList').token_sc;
    var params = {
      id: id,
      token_sc: token_sc,
      status: 1,
      page_size: 3,
      page: 1
    }
    api._post('/orders/list', params).then(res => {
      // console.log(res.data.list)
      that.setData({
        unDeliverList: res.data
      })
    })
  },

  // 获取已发货订单列表
  getDeliverOrderList() {
    var that = this;
    var id = wx.getStorageSync('UserList').id;
    var token_sc = wx.getStorageSync('UserList').token_sc;
    var params = {
      id: id,
      token_sc: token_sc,
      status: 2,
      page_size: 3,
      page: 1
    }
    api._post('/orders/list', params).then(res => {
      // console.log(res.data.list)
      that.setData({
        deliverList: res.data
      })
    })
  },

  // 获取待评价订单列表
  getEvaluateOrderList() {
    var that = this;
    var id = wx.getStorageSync('UserList').id;
    var token_sc = wx.getStorageSync('UserList').token_sc;
    var params = {
      id: id,
      token_sc: token_sc,
      status: 10,
      page_size: 3,
      page: 1
    }
    api._post('/orders/list', params).then(res => {
      // console.log(res.data.list)
      that.setData({
        evaluate: res.data
      })
    })
  },

  // 获取猜你喜欢列表
  getGuessLikeList(){
    var that = this;
    that.setData({
      guessList : wx.getStorageSync('guessLike')
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 全部订单
    this.getOrderList();
    // 猜你喜欢
    this.getGuessLikeList();
    // 待付款订单
    this.getObligationOrderList();
    // 待发货订单
    this.getUnDeliverOrderList();
    // 已发货
    this.getDeliverOrderList();
    // 待评价订单
    this.getEvaluateOrderList();
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