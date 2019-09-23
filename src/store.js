import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uuid:"",
    avatar:"",
    name:"",
    email:"",
    subscribes:[]
  },
  mutations: {
    setLoginUser(state,data){
      state.uuid = data.uuid
      state.avatar = data.avatar
      state.name = data.name
      state.email = data.email
      state.subscribes = data.subscribe
    }
  },
  actions: {

  }
})
