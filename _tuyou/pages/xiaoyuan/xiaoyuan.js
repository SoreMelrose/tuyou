const app = getApp(); 
Page({
  data: {
    ActList:[],
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: '../../img/BasicsBg.png'
    }, {
      id: 1,
      type: 'image',
        url: '../../img/componentBg.png',
    }, {
      id: 2,
      type: 'image',
        url: '../../img/BasicsBg.png'
    }, {
      id: 4,
      type: 'image',
        url: '../../img/componentBg.png'
    }],
  }, 
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  xuanran() {
    let url = app.globalData.URL + '/act/listCampusActivity';
    let data = {
      sid: '3b7b162c987f4583be9a7a7b340adbee'
    };
    app.wxRequest('GET', url, data, (res) => {
      console.log(res.data)
      this.setData({
        ActList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
  },
  onShow(){
    this.xuanran();
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  canyuhuodong(e) {//参与活动按钮跳转
    console.log(e);
    wx.navigateTo({
      url: '../../pages/xiangqing/xiangqing',
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})