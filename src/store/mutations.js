import * as types from './types'

const mutations = {
  [types.LOGIN]: (state, data) => {
    localStorage.setItem('token', data)
    //localStorage.token = data
    state.token = data
  },
  [types.LOGOUT]: (state) => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('isSuperAdmin');
  },
  [types.USERSESSION]: (state, data) => {
    sessionStorage.setItem('username', data.userSession.username)
    sessionStorage.setItem('isSuperAdmin', data.userSession.isSuperAdmin)
    sessionStorage.setItem('userid', data.userSession.userid)
  },

  [types.nowMenu]: (state, data) => {
    state.nowMenu = data.nowMenu
  },
  [types.breadCrumbOne]: (state, data) => {
    state.breadCrumbOne = data.breadCrumbOne
  },
  [types.breadCrumbTwo]: (state, data) => {
    state.breadCrumbTwo = data.breadCrumbTwo
  },
  [types.topSideMenu]: (state, data) => {
    state.topSideMenu = data.topSideMenu
  }



}
export default mutations
