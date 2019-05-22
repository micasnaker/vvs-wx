//index.js
//获取应用实例
var tcity = require("../../../../utils/citys.js");
const app = getApp();
const api = require("../../../../utils/request.js")
Page({
  data: {
    name: '',
    phone: '',
    detail: '',
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    position: 'left',
    checked: false,
    check: 0,
    is_default: '',
    edit_list: [],
  },

  bindChange: function(e) {
    // console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }
      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })


      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];
      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }
      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
  },
  open: function(e) {
    this.setData({
      condition: !this.data.condition,
    })
  },

  // 姓名
  name: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  // 电话
  phone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 详细地址
  detail: function(e) {
    this.setData({
      detail: e.detail.value
    })
  },

  // 设为默认checkbox
  checkboxChange(e) {
    var that = this;
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    that.setData({
      check: e.detail.value
    })
  },



  // 保存并使用
  save() {
    var that = this;
    var province_save = that.data.province
    var city_save = that.data.city
    var county_save = that.data.county
    // console.log(province_save + city_save + county_save)
    var names = that.data.name
    var phones = that.data.phone

    var details = that.data.detail
    var detail_all = province_save + city_save + county_save + details
    var address_id = that.data.edit_list.id
    // console.log(names + phones + details)
    // console.log(detail_all)
    // console.log(that.data.check[0] + "check")
    var id = wx.getStorageSync('UserList').id;
    var token_sc = wx.getStorageSync('UserList').token_sc;
    if (that.data.check[0] == 0 || that.data.check[0] === false || that.data.check[0] == 1) {
      // 默认地址
      that.setData({
        is_defaults: 1
      })
      // console.log(that.data.is_defaults+"默认")
    } else if (that.data.check[0] == '') {
      // 非默认地址
      that.setData({
        is_defaults: 0
      })
    } else {
      // 非默认地址
      that.setData({
        is_defaults: 0
      })
      // console.log(that.data.is_defaults+"非默认")
    }
    // console.log(that.data.edit_list.contact_name)
    var params = {
      id: id,
      token_sc: token_sc,
      contact_name: names,
      phone: phones,
      address: detail_all,
      is_default: that.data.is_defaults,
      address_id: address_id
    }
    api._post('/address/update', params).then(res => {
      // console.log(res)
      if (res.error_code == 0) {
        wx.navigateBack({
          delta: 1,
        })
      } else if (that.data.phone.length < 11) {
        wx.showToast({
          title: '请填写11位手机号',
          icon: 'none',
          duration: 2000
        })
      } else if (that.data.edit_list.contact_name.length < 1 || county_save.length < 1) {
        wx.showToast({
          title: '请填写完整',
          icon: 'none',
          duration: 2000
        })
      } else if (res.error_code == 1100) {
        wx.showToast({
          title: '参数错误',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // 收货地址
  del() {
    var that = this;
    var id = wx.getStorageSync('UserList').id;
    var token_sc = wx.getStorageSync('UserList').token_sc;
    var address_id = that.data.edit_list.id;
    var params = {
      id: id,
      token_sc: token_sc,
      address_id: address_id
    }
    wx.showModal({
      title: '提示',
      content: '确定删除收货地址？',
      success(res) {
        if (res.confirm) {
          api._post('/address/remove', params).then(res => {
            // console.log(res)
            if (res.error_code == 0) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              wx.navigateBack({
                delta: 1,
              })
            }
          })
        } else if (res.cancel) {
          console.log('取消删除')
        }
      }
    })

  },

  onLoad: function(options) {
    var that = this;
    // console.log("onLoad");
    // 加载省市区
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    // console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    // console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }


    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    // console.log('初始化完成');

    // 接收传递进来的编辑地址
    // console.log(JSON.parse(options.edit_list))
    that.setData({
      edit_list: JSON.parse(options.edit_list)
    })
  },

})