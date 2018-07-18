// pages/recordings/recordings.js
//获取应用实例
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const app = getApp()
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
var tempFilePath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    movie: {}
  },
  //开始录音的时候
  start: function () {

    const options = {
      duration: 10000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  //停止录音
  stop: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
    })
  },
  //播放声音
  play: function () {

    innerAudioContext.autoplay = true
    innerAudioContext.src = this.tempFilePath,
    console.log(innerAudioContext.duration)
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  duration: function (recordingUrl) {
    innerAudioContext.autoplay = false
    innerAudioContext.src = recordingUrl
    innerAudioContext.src
    console.log(innerAudioContext.duration)
    return innerAudioContext.duration
  },

  addComment(recordingUrl) {
    // if (!recordingUrl) return

    wx.showLoading({
      title: '正在发表影评'
    })

    qcloud.request({
      url: config.service.addComment,
      login: true,
      method: 'PUT',
      data: {
        content: null,
        movie_id: this.data.movie.id,
        recordings: recordingUrl,
        duration: this.duration(recordingUrl)
        // duration: this.tempFilePath.slice(this.tempFilePath.search("durationTime=") + 13, this.tempFilePath.search(".mp3"))/1000
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

  uploadRecording() {
    let recording = this.tempFilePath
    console.log(recording)
    if (!recording) return
    wx.showLoading({
      title: '正在发表录音'
    })
    wx.uploadFile({
      url: config.service.uploadUrl,
      filePath: recording,
      name: 'file',
      formData:
      {
        userId: 100005718031 //附加信息为用户ID
      },
      success: res => {
        wx.hideLoading()
        console.log(res.data)
        let data = JSON.parse(res.data)
        if (!data.code) {
          wx.showToast({
            title: '发表录音成功'
          })
          this.addComment(data.data.imgUrl)
        }
      },
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '发表录音失败'
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
      movie: movie
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
    this.setData({
      locationAuthType: app.data.locationAuthType
    })
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
      }
    })
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