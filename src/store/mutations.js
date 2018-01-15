import * as types from './types'

const mutations = {
  [types.LOGIN]: (state, data) => {
    localStorage.setItem('token', data)
    //localStorage.token = data
    state.token = data
  },
  [types.LOGOUT]: (state) => {
    localStorage.removeItem('token');
    state.token = null
  },
  [types.USERNAME]: (state, data) => {
    localStorage.setItem('username', data)
    state.username = data
  },

  [types.nowMenu]: (state, data) => {
    state.nowMenu = data.nowMenu
  },
  [types.breadCrumbOne]: (state, data) => {
    state.breadCrumbOne = data.breadCrumbOne
  },
  [types.breadCrumbTwo]: (state, data) => {
    state.breadCrumbTwo = data.breadCrumbTwo
  }
}
export default mutations
