// pages/person/personInfo/personInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[],
    sex_person:'',
    ifName:false
  },

  // 用户基本信息
  getUserInfo() {
    var that = this;
    // var userInfo = wx.getStorageSync({
    //   key: 'getStorageSync'
    // })
    that.setData({
      userInfo: wx.getStorageSync('UserList')
    })
    // console.log(that.data.userInfo)
    if (that.data.userInfo.sex==0){
      that.setData({
        sex_person:'保密'
      })
    } else if (that.data.userInfo.sex == 1){
      that.setData({
        sex_person: '男'
      })
    }else{
      that.setData({
        sex_person: '女'
      }) 
    }
  },

  // 输入姓名
  name(){
    var that = this;
    var ifName = that.data.ifName
    that.setData({
      ifName: !ifName
    })
  },

  // 取消
  cancel(){
    var that = this;
    var ifName = that.data.ifName
    that.setData({
      ifName: !ifName
    })
  },

  // 确定
  confirm() {
    var that = this;
    var ifName = that.data.ifName
    that.setData({
      ifName: !ifName
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserInfo();
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