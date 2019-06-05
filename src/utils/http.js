import axios from 'axios' // 引用axios
import { MessageBox, Message } from 'element-ui'
import Qs from 'qs'
import router from '@/router'
import CurrentUser from '../core/currentUser'

/* eslint-disable no-alert, no-console, no-empty,no-unused-vars */
// axios 配置
// 设置响应超时
axios.defaults.timeout = 50000
// axios.defaults.baseURL = 'https://easy-mock.com/mock/' // 这是调用数据接口,公共接口url+调用接口名
let httpUrl = window.location.host
if (httpUrl.indexOf('.com') !== -1) {
  console.log('生产环境', httpUrl)
} else if (httpUrl.indexOf('.net') !== -1) {
  console.log('测试环境', httpUrl)
  axios.defaults.baseURL = 'http://vk.autobole.net/volkswagen/' // 这是调用数据接口,公共接口url+调用接口名
} else if (httpUrl.indexOf('localhost:8080') !== -1) {
  console.log('指定开发环境', httpUrl)
  axios.defaults.baseURL = 'http://192.168.6.200:8088/api' // 这是axios配置的请求地址
} else {
  console.log('开发环境', httpUrl)
  // axios.defaults.baseURL = "https://way.jd.com"; // 这是调用数据接口,公共接口url+调用接口名
}

// http request 拦截器，通过这个，我们就可以把token传到后台
axios.interceptors.request.use(
  config => {
    const token = CurrentUser.get_token()
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded' // 设置跨域头部
    }
    if (token) {
      // 方法一: 这里把token放到params里
      // const params = { 'X-TOKEN': token, ...config.params }
      // config.params = params
      // 方法二：把token放到headers里
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
axios.interceptors.response.use(
  response => {
    // console.log('请求拦截返回参数', response)
    if (response.status === 200) {
      // 成功
      let returnCode = response.data.code
      if (returnCode > 10000 && returnCode < 20000) {
        // console.log('成功', response)
        Message.success(response.data.msg)
      } else if (returnCode >= 20000 && returnCode < 30000) {
        // 只弹窗，不操作
        // console.log('失败1', response)
        Message.error(response.data.msg)
      } else if (returnCode >= 30000 && returnCode < 40000) {
        // 只弹窗，点击跳到登入页
        localStorage.removeItem('userInfo')

        MessageBox.confirm(response.data.msg, '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log('此处应退出登录  重新实例化')
          router.push({ path: '/login' })
        })
      }
    }
    return response
  },
  error => {
    // console.log('error', error.toString())
    if (
      error.toString().trim() ===
      "TypeError: Cannot read property 'cancelToken' of null"
    ) {
      localStorage.removeItem('userInfo')
      MessageBox.confirm(
        '会话凭证失效，可以取消继续留在该页面，或者重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        //  console.log('此处应退出登录  重新实例化')
        router.push({ path: '/login' })
      })
    }

    // console.log(error.toString().trim())
    if (error.toString().trim() === 'Error: Network Error') {
      MessageBox.alert('网络请求异常，请稍后重试', '出错了', {
        confirmButtonText: '确定',
        callback: action => {}
      })
    }
    return Promise.reject(error.response.data)
  }
)

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
        params: params
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
