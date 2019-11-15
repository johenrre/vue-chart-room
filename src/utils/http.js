import axios from 'axios' // 引用axios
// import { MessageBox, Message } from 'element-ui'
import Qs from 'qs'

// axios 配置
// 设置响应超时
axios.defaults.timeout = 50000
axios.defaults.baseURL = 'http://www.autobole.com/order/Gw'

// http request 拦截器，通过这个，我们就可以把token传到后台
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    // const token = CurrentUser.getToken()
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded' // 设置跨域头部
    }
    if (token) {
      config.headers['X-TOKEN'] = token
    }

    config.data = Qs.stringify(config.data)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     // 下面设置根据后端接口调整，参考https://www.showdoc.cc/autoboledoc?page_id=2172361375593438
//     if (response.status === 200) {
//       let code = Number(response.data.code)
//       if (code !== 200) {
//         const msg = response.data.msg
//         Message.success(msg)
//       }
//       // 验证是否需要重新登录
//       const arr = [10001, 10002, 20013]
//       const isLoginOut = arr.some(c => c === code)
//       if (isLoginOut) {
//         CurrentUser.logout()
//       }
//     }
//     return response
//   },
//   error => {
//     // 网络错误
//     if (error.toString().trim() === 'Error: Network Error') {
//       MessageBox.alert('网络请求异常，请稍后重试', '出错了', {
//         confirmButtonText: '确定',
//         callback: action => {}
//       })
//     }
//     return Promise.reject(error.response.data)
//   }
// )

export default axios

/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
        paramsSerializer: params => {
          // 这里解决axios处理数组是id[]:1, id[]:2这种形式
          // 正确是id: 1, id: 2
          return Qs.stringify(params, { indices: false })
        }
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        // console.log(response.data.code)
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}
