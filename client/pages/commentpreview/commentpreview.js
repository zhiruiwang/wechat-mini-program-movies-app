// pages/commentpreview/commentpreview.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    commentValue: '',
    avatar:"",
    username:""
  },

  addComment(event) {
    let content = this.data.commentValue
    if (!content) return

    wx.showLoading({
      title: '正在发表影评'
    })

    qcloud.request({
      url: config.service.addComment,
      login: true,
      method: 'PUT',
      data: {
        content: content,
        movie_id: this.data.movie.id
      },
      success: result => {
        wx.hideLoading()

        let data = result.data

        if (!data.code) {
          wx.showToast({
            title: '发表影评成功'
          })

          setTimeout(() => {
            let movie = this.data.movie
            wx.navigateTo({
              url: `/pages/commentlist/commentlist?id=${movie.id}&image=${movie.image}&title=${movie.title}`
            })
          }, 1500)
        } else {
          wx.showToast({
            icon: 'none',
            title: '发表影评失败'
          })
        }
      },
      fail: () => {
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '发表影评失败'
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
      avatar: options.avatar,
      username: options.username
    })
  },

  back: function() {
    wx.navigateBack({
      
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