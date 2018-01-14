import Vue from 'vue'

// const store = new Vuex.Store({
//   state: {
//     nowMenu: '1-1'
//   }
// })
const state = {nowMenu:'1-1'}
const mutations = {
  getChangeMenu (state, obj) {
    state.nowMenu = obj.nowMenu
  }
}
const actions = {
  nowMenuChange (context, obj) {
    context.commit('getChangeMenu', obj)
  }
}
export default {
  state,
  mutations,
  actions
}