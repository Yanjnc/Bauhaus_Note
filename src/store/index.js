import { createStore } from 'vuex'

const store = createStore({
  state:{
    currentUser:window.localStorage.getItem('user') === null?'':JSON.parse(window.localStorage.getItem('user'))
  },
  mutations:{
    login(state,user){
      state.currentUser = user
      window.localStorage.setItem("user",JSON.stringify(user))
    },
    logout(state) {
      state.currentUser = null
      window.localStorage.removeItem("user")
    }
  }
})

export default store
