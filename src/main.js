import { createApp } from 'vue'
import App from './App'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/bauhaus.css';

import axios from 'axios'
import VueAxios from 'vue-axios'

import store from "./store";

// Editor moved to md-editor-v3 within NoteEdit.vue

import $ from 'jquery'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

axios.defaults.baseURL = "/api"
axios.defaults.withCredentials = true
app.use(VueAxios,axios);

app.use(ElementPlus);
app.use(router)
app.use(store)



router.beforeEach((to,from,next) =>{
  if(to.meta.requireAuth){
    if(store.state.currentUser !== null && store.state.currentUser){
      next()
    }
    else{
      next({
        path:'/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else{
    next()
  }
})

app.mount('#app')
