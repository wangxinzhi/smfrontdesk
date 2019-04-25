/* eslint-disable prefer-promise-reject-errors */
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: { // 更改 Vuex 中 store 的状态的唯一方法是提交 mutation ; 每个mutation 都由 1.一个字符串的事件类型(type) 和 2.一个回调函数(handler) ; motation 必须是同步函数
    SET_TOKEN: (state, token) => { // 回调函数, params: 1. state 2. payload(载荷)
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: { // Action 提交的是 mutation, 而不是直接变更状态 ; Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象 ; Action 通过 store.dispatch 方法触发
    // 登录
    Login ({ commit }, userInfo) { // { commit } 是 ES2015 的 参数解构 ; action 的处理函数返回的 Promise
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.rememberMe).then(response => {
          console.log('store: user.js: Login: then: After login function')
          console.log(response)
          const data = response.data
          console.log('NAME: ' + data.data)
          setToken(data.token)
          commit('SET_NAME', data.data)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          console.log('store: user.js: Login: then: catch')
          reject(error)
          console.log(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.data && data.data.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.data)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.token)
          // commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
