import { BASE_URL, TIMEOUT,LOGIN_BASE_URL } from './config'
import { TOKEN_KEY } from '../constants/token-const'

const token = wx.getStorageSync(TOKEN_KEY)

class HYRequest {
  constructor(baseURL, authHeader = {}) {
    this.baseURL = baseURL
    this.authHeader = authHeader
  }

  request(url, method, params,isAuth = false, header = {}) {
    const finalHeader = isAuth ? { ...this.authHeader, ...header }: header
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseURL + url,
        timeout: TIMEOUT,
        method: method,
        header: finalHeader,
        data: params,
        success: (res) => resolve(res.data),
        fail: reject
      })
    })
  }

  post(url, params,isAuth = false, header) {
    return this.request(url, "POST", params,isAuth, header)
  }

  get(url, params,isAuth = false, header) {
    return this.request(url, "GET", params,isAuth, header)
  }
}

const hyRequest = new HYRequest(BASE_URL)

const hyLoginRequest = new HYRequest(LOGIN_BASE_URL,
 {token})

export default hyRequest
export {
  hyLoginRequest
}
