// pages/commentdetail/commentdetail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    commentValue: ''
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
    let commentValue = options.comment
    this.setData({
      movie: movie,
      commentValue: commentValue
    })
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
              url: '/pages/home/home',
            })
          }
        }
      }
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