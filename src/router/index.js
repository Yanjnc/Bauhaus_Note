import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/home/Home";
import Index from "../components/Index";
import Bookshelf from "../components/bookshelf/Bookshelf";
import NoteEdit from "../components/note/NoteEdit";
import NoteDetail from "../components/note/NoteDetail";

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect:'/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/bookshelf',
        name: 'Bookshelf',
        component: Bookshelf,
        meta: {
          requireAuth:true
        }
      },
      {
        path: '/note/edit',
        name: 'NoteEdit',
        component: NoteEdit,
        meta: {
          requireAuth:true
        }
      },
      {
        path: '/note/detail',
        name: 'NoteDetail',
        component: NoteDetail,
        meta: {
          requireAuth:true
        }
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
