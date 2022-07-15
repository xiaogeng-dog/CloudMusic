import eventStore from '../../store/index'

// pages/home-video/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMVList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    // 发起数据请求
    eventStore.dispatch("getTopMVAction", 0)

    // 监听topMV数据
    eventStore.onState("topMV", this.topMVHandler)
  },

  topMVHandler: function (res) {
    this.setData({
      topMVList: res
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    eventStore.dispatch("getTopMVAction", 0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    eventStore.dispatch("getTopMVAction")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {

  }
})