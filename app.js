// app.js
import { getLoginCode, codeToToken, checkToken, checkSession } from './service/api_login'
import { TOKEN_KEY } from './constants/token-const'

App({
  globalData: {
    userInfo: null
  },
  onLaunch() {
    // 2.让用户默认进行登录
    this.handleLogin()
  },
  handleLogin: async function() {
    const token = wx.getStorageSync(TOKEN_KEY)
    // token有没有过期
    const checkResult = await checkToken()
    // 判断session是否过期
    const isSessionExpire = await checkSession()

    if (!token || checkResult.errorCode || !isSessionExpire) {
      this.loginAction()
    }
  },

  loginAction: async function() {
    // 1.获取code
    const code = await getLoginCode()

    // 2.将code发送给服务器
    const result = await codeToToken(code)
    const token = result.token
    wx.setStorageSync(TOKEN_KEY, token)
  },
})
