import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
/** 在请求被then 或 catch 处理前拦截它们 */
service.interceptors.request.use(
  // 在发送请求之前做些什么
  config => {
    console.log('request.js: before request')
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      // config.params = getToken()
      console.log('interceptors config = ' + config.headers['X-Token'])
    }
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  },
  // 对请求错误做些什么
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
/** 在响应被then 或 catch 处理前拦截它们 */
service.interceptors.response.use(
  response => {
    /**
         * code为非20000是抛错
         */
    console.log('request.js')
    const res = response.data
    if (res.code !== 20000) {
      console.log('request.js: if')
      Message({
        message: res.data,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('error')
    } else {
      console.log('request.js: else')
      return response.data
    }
  },
  error => {
    // for debug
    console.log('err' + error)
    console.log('request.js: error')
    Message({
      message: error.data,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
