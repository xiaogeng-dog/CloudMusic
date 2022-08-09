// pages/song-search/index.js
import { getHotSearch, getSuggestSearch, getSearchResult } from '../../service/search'
import eventStore from '../../store/index'
import stringToNodes from '../../utils/string2nodes'
// 导入防抖函数
import debounce from '../../utils/debounce'
const debounceGetSuggestSearch = debounce(getSuggestSearch)



Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    hots: [],
    isSearch: false,

    searchValue: "",
    suggestSongs: [],
    suggestSongsNodes: [],

    searchSongs: []
  },

  handleSearchFocus: function() {
    this.setData({ isSearch: true })
  },
  handleSearchCancel: function() {
    this.setData({ isSearch: false })
    this.setData({ searchSongs: [] })
  },
  handleSearchChange: function(event) {
    const searchValue = event.detail
    this.setData({ searchValue })
    if (searchValue.length <= 0) {
      this.setData({suggestSongs:[]})
      this.setData({searchSongs:[]})
      // 处理防抖
      debounceGetSuggestSearch.cancel()
      return
    }
    debounceGetSuggestSearch(searchValue).then(res => {
      if (!res.result) return
      const result = res.result
      const order = res.result.order
      let suggestSongs = []
      for (const type of order) {
        const typeResult = result[type]
        suggestSongs = suggestSongs.concat(typeResult)
      }

      // 搜索关键字加颜色区分
      const suggestKeyWords = suggestSongs.map(item => item.name)
      const suggestSongsNodes = []
      for (const keyword of suggestKeyWords) {
        const nodes = stringToNodes(keyword, searchValue)
        suggestSongsNodes.push(nodes)
      }

      this.setData({
        suggestSongs: suggestSongs,
        suggestSongsNodes
      })
    })
  },

  handleTagClick: function(event) {
    const value = event.target.dataset.value
    this.setData({ searchValue: value }, () => {
      this.handleSearchAction()
    })
  },
  handleItemSelect: function(event) {
    const name = event.currentTarget.dataset.name
    this.setData({
      searchValue: name
    }, () => {
      this.handleSearchAction()
    })
  },
  handleSearchAction: function() {
    getSearchResult(this.data.searchValue).then(res => {
      this.setData({ searchSongs: res.result.songs })
    })
  },

  handleSongItemClick: function(event) {
    const index = event.currentTarget.dataset.index
    const item = event.currentTarget.dataset.item

    eventStore.setState("playList", this.data.searchSongs)
    eventStore.setState("playIndex", index)
    wx.navigateTo({
      url: '/pages/music-player/index?id=' + item.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  getHotSearch().then(res => {
      this.setData({
        hots: res.result.hots
      })
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