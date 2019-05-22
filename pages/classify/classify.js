Page({
    data: {
        category: [
            {name:'美食餐饮',id:'guowei'},
            {name:'美妆丽人',id:'shucai'},
            {name:'母婴亲子',id:'chaohuo'},
            {name:'休闲娱乐',id:'dianxin'},
            {name:'医疗健康',id:'cucha'},
            {name:'运动健身',id:'danfan'}
        ],
        detail:[],
        curIndex: 0,
        isScroll: false,
        toView: 'guowei'
    },
    onReady(){
        var self = this;
        wx.request({
            url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
            success(res){
                self.setData({
                    detail : res.data
                })
            }
        });
        
    },
    switchTab(e){
      const self = this;
      this.setData({
        isScroll: true
      })
      setTimeout(function(){
        self.setData({
          toView: e.target.dataset.id,
          curIndex: e.target.dataset.index
        })
      },0)
      setTimeout(function () {
        self.setData({
          isScroll: false
        })
      },1)
    }
})