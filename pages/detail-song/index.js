// pages/detail-song/index.js
import eventStore, { rankingMap }  from "../../store/index"
import { getSongMenuList } from '../../service/music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankingName: "",
    type: "",
    songInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const type = options.type
    this.setData({ type })
    if (type === "song") {
      const idx = options.idx
      const rankingName = rankingMap[idx]
      this.setData({
        rankingName
      })
      // eventStore.dispatch("getRankingsAction")
      eventStore.onState(rankingName, this.getRankingHanlder)
    } else if (type === "menu") {
      const id = options.id
      getSongMenuList(id).then(res => {
        this.setData({
          songInfo: res.playlist
        })
      })
    }
  },

  getRankingHanlder: function(res) {
    console.log(res)
    this.setData({
      songInfo: res
    })

    // 有值的情况下修改
    if (res.name) {
      wx.setNavigationBarTitle({
        title: res.name,
      })
    } 
  },

  handleSongItemClick: function(event) {
    const index = event.currentTarget.dataset.index
    const item = event.currentTarget.dataset.item

    eventStore.setState("playList", this.data.songInfo.tracks)
    eventStore.setState("playIndex", index)
    wx.navigateTo({
      url: '/pages/music-player/index?id=' + item.id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    if (this.data.rankingName) {
      eventStore.offState(this.data.rankingName, this.getRankingHanlder)
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})