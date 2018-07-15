// pages/commentdetail/commentdetail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasfavorite: false,
    hascomment: false,
    movie: {},
    commentValue: '',
    commentid: null,
    username: "",
    avatar: "",
    recordings:"",
    duration: "",
  },
  star(event) {
    let id = this.data.commentid
    if (!id) return

    wx.showLoading({
      title: '正在收藏影评'
    })

    qcloud.request({
      url: config.service.addfavorite,
      login: true,
      method: 'PUT',
      data: {
        id: id
      },
      success: result => {
        wx.hideLoading()

        let data = result.data

        if (!data.code) {
          wx.showToast({
            title: '收藏影评成功'
          })

          setTimeout(() => {
            let movie = this.data.movie
            wx.navigateTo({
              url: "/pages/user/user"
            })
          }, 1500)
        } else {
          wx.showToast({
            icon: 'none',
            title: '收藏影评失败'
          })
        }
      },
      fail: () => {
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '收藏影评失败'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let movie = {
      id: options.id,
      image: options.image.trim(),
      title: options.title
    }
    this.setData({
      movie: movie,
      commentValue: options.comment,
      commentid: options.commentid,
      username: options.username,
      avatar: options.avatar,
      recordings: options.recordings,
      duration: options.duration
    })
    this.getfavoriteList()
    this.getusercomment()
  },

  chooseComment: function () {
    let movie = this.data.movie
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            wx.navigateTo({
              url: '/pages/commentedit/commentedit?id=' + movie.id + "&image=" + movie.image + "&title=" + movie.title
            })
          } else if (res.tapIndex == 1) {
            wx.navigateTo({
              url: '/pages/recordings/recordings?id=' + movie.id + "&image=" + movie.image + "&title=" + movie.title
            })
          }
        }
      }
    })
  },

  getfavoriteList() {
    qcloud.request({
      url: config.service.favoriteList,
      login: true,
      success: result => {
        let data = result.data

        if (!data.code) {
          this.favoriteids = []
          data.data.forEach(element => {this.favoriteids.push(element.id)})
          if (this.favoriteids.includes(parseInt(this.data.commentid))){
            this.setData({
              hasfavorite: true
            })
          }
        }
      },
    })
  },

  getusercomment() {
    qcloud.request({
      url: config.service.usercomment,
      login: true,
      success: result => {
        let data = result.data
        console.log(data)
        if (!data.code) {
          this.usercomment = []
          data.data.forEach(element => { this.usercomment.push(element.id) })
          if (this.usercomment.includes(parseInt(this.data.commentid))) {
            this.setData({
              hascomment: true
            })
          }
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})