<template>
  <div class="nav-bar">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      router
      active-text-color="#25567A">
      <el-menu-item  v-for="(item,i) in navList" :index="item.url" :key="i">
        {{ item.name }}
      </el-menu-item>

      <el-submenu index="2" style="float:right;">
        <template slot="title">{{userFlag.name}}</template>

        <el-menu-item v-for="(item,i) in userFlag.menuList" :index="item.url" :key="i">{{item.name}}</el-menu-item>
        <el-menu-item :style="{display:isLogin}"
                      @click="logout">注销</el-menu-item>
      </el-submenu>

      <li style="float: right;outline: none;cursor: pointer">
        <i class="el-icon-full-screen" style="height: 35px;line-height: 35px;" @click="fullScreen"></i>
      </li>


    </el-menu>
  </div>
</template>

<script>
    export default {
      name: "NavMenu",
      data() {
        return {
          isLogin:'none',
          userFlag: {
            name: '',
            menuList: []
          },

          navList: [
            {name: 'Note', url: '/home'},
            {name: '书架', url: '/bookshelf'},
          ],
        };
      },

      mounted() {
        if (window.localStorage.getItem("user") != null) {
          this.userFlag.name = JSON.parse(window.localStorage.getItem("user")).username
          this.userFlag.menuList = [
            {url: '/home', name: '开始页面'},
            {url: '/bookshelf', name: '书架管理'},
          ]
          this.isLogin = 'inline-block'
        } else {
          this.userFlag.name = "未登录"
          this.userFlag.menuList = [
            {url: '/register', name: '注册'},
            {url: '/login', name: '登录'},
          ]
          this.isLogin = 'none'
        }
      },

      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath)
        },
        logout(){
          var _this = this
          this.axios.get('/logout')
          .then(function (response) {
            if(response.data.status === 200){
              _this.$store.commit('logout')
              _this.$router.replace('/login')
            }
          })
          .catch(function (error) {
            console.log(error)
          })

        },
        fullScreen(ev) {
          const isFull=!!(document.webkitIsFullScreen || document.mozFullScreen ||
            document.msFullscreenElement || document.fullscreenElement
          )
          if(!isFull){
            var element = document.documentElement;
            if (element.requestFullscreen) {
              element.requestFullscreen()
            } else if (element.msRequestFullscreen) {
              element.msRequestFullscreen()
            } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen()
            } else if (element.webkitRequestFullscreen) {
              element.webkitRequestFullscreen()
            }
          }
          else{
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            }
          }
        }
      }
    }

</script>

<style scoped>
  .nav-bar{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  .bauhaus-nav.el-menu--horizontal {
    border-bottom: 4px solid var(--bauhaus-black) !important;
    height: 60px;
    line-height: 60px;
  }
  
  /* Deep selector for element ui overrides in scoped style if needed, 
     but global bauhaus.css handles most. Just specific sizing here. */
  .el-menu-item, .el-submenu__title {
    height: 60px !important;
    line-height: 60px !important;
    font-size: 16px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
</style>
