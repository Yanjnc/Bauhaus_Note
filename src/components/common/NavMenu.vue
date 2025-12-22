<template>
  <div class="navmenu-root">
    <div class="nav-bar" :class="navBarClasses">
      <el-menu
        class="el-menu-demo bauhaus-nav"
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
    <div v-if="showContrastTest" class="contrast-test">
      <div class="contrast-box test-light">
        <ul class="test-menu">
          <li class="nav-item-sample">Home</li>
          <li class="nav-item-sample">Bookshelf</li>
          <li class="nav-item-sample">Profile</li>
        </ul>
      </div>
      <div class="contrast-box test-dark">
        <ul class="test-menu">
          <li class="nav-item-sample">Home</li>
          <li class="nav-item-sample">Bookshelf</li>
          <li class="nav-item-sample">Profile</li>
        </ul>
      </div>
      <div class="contrast-box test-gradient">
        <ul class="test-menu">
          <li class="nav-item-sample">Home</li>
          <li class="nav-item-sample">Bookshelf</li>
          <li class="nav-item-sample">Profile</li>
        </ul>
      </div>
      <div class="contrast-box test-image">
        <ul class="test-menu">
          <li class="nav-item-sample">Home</li>
          <li class="nav-item-sample">Bookshelf</li>
          <li class="nav-item-sample">Profile</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "NavMenu",
      data() {
        return {
          isDarkBg: false,
          isHighContrastMode: false,
          showContrastTest: false,
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
        this.applyAccessibleContrast()
        const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
        if (mql && mql.addEventListener) {
          mql.addEventListener('change', this.applyAccessibleContrast)
        } else if (mql && mql.addListener) {
          mql.addListener(this.applyAccessibleContrast)
        }
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
        this.isHighContrastMode = /hc=1/.test(window.location.search)
        this.showContrastTest = /contrastTest=1/.test(window.location.search)
        if (this.showContrastTest) {
          this.$nextTick(() => {
            this.applyBoxContrast()
          })
        }
      },

      methods: {
        parseColor(color) {
          if (!color) return { r: 255, g: 255, b: 255 }
          if (color.startsWith('#')) {
            const hex = color.replace('#', '')
            const h = hex.length === 3 ? hex.split('').map(ch => ch + ch).join('') : hex
            const r = parseInt(h.substring(0,2), 16)
            const g = parseInt(h.substring(2,4), 16)
            const b = parseInt(h.substring(4,6), 16)
            return { r, g, b }
          }
          const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
          if (m) return { r: parseInt(m[1]), g: parseInt(m[2]), b: parseInt(m[3]) }
          return { r: 255, g: 255, b: 255 }
        },
        srgbToLinear(v) {
          const s = v / 255
          return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
        },
        calcLuminance(color) {
          const { r, g, b } = this.parseColor(color)
          const R = this.srgbToLinear(r)
          const G = this.srgbToLinear(g)
          const B = this.srgbToLinear(b)
          return 0.2126 * R + 0.7152 * G + 0.0722 * B
        },
        contrastRatio(c1, c2) {
          const L1 = this.calcLuminance(c1)
          const L2 = this.calcLuminance(c2)
          const light = Math.max(L1, L2)
          const dark = Math.min(L1, L2)
          return (light + 0.05) / (dark + 0.05)
        },
        pickTextColor(bg) {
          const darkCandidates = ['#000000', '#333333']
          const lightCandidates = ['#FFFFFF', '#F5F5F5']
          const bgLum = this.calcLuminance(bg)
          const useDark = bgLum > 0.5
          const pool = useDark ? darkCandidates : lightCandidates
          let best = pool[0]
          let bestRatio = this.contrastRatio(bg, best)
          for (let i = 1; i < pool.length; i++) {
            const ratio = this.contrastRatio(bg, pool[i])
            if (ratio > bestRatio) {
              bestRatio = ratio
              best = pool[i]
            }
          }
          if (bestRatio < 4.5) {
            best = useDark ? '#000000' : '#FFFFFF'
          }
          this.isDarkBg = !useDark
          return best
        },
        applyAccessibleContrast() {
          const menuEl = this.$el.querySelector('.el-menu')
          const bgColor = window.getComputedStyle(menuEl).backgroundColor || '#FFFFFF'
          const textColor = this.pickTextColor(bgColor)
          this.$el.style.setProperty('--nav-text-color', textColor)
          if (this.isHighContrastMode) {
            const hcColor = this.isDarkBg ? '#FFFFFF' : '#000000'
            this.$el.style.setProperty('--nav-text-color', hcColor)
          }
        },
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
        },
        applyBoxContrast() {
          const boxes = this.$el.querySelectorAll('.contrast-box')
          boxes.forEach(box => {
            const style = window.getComputedStyle(box)
            const bg = style.backgroundColor || '#FFFFFF'
            const color = this.pickTextColor(bg)
            box.style.setProperty('--nav-text-color', color)
          })
        }
      },
      computed: {
        navBarClasses() {
          return {
            'dark-bg': this.isDarkBg,
            'hc-mode': this.isHighContrastMode
          }
        }
      },
      watch: {
        showContrastTest(val) {
          if (val) this.$nextTick(this.applyBoxContrast)
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
    background-color: var(--bauhaus-white);
    --nav-text-color: var(--text-primary);
  }
  .bauhaus-nav.el-menu--horizontal {
    border-bottom: 4px solid var(--bauhaus-black) !important;
    height: 60px;
    line-height: 60px;
  }
  .el-menu-item, .el-submenu__title {
    height: 60px !important;
    line-height: 60px !important;
    font-size: 16px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #333333;
    color: var(--nav-text-color);
    transition: color var(--transition-duration) ease, transform var(--transition-duration) ease;
    font-family: var(--bauhaus-font-family);
  }
  .el-menu-item:hover, .el-menu-item:focus, .el-submenu__title:hover, .el-submenu__title:focus {
    transform: translateY(-1px);
  }
  .dark-bg {
    background-color: #111111;
  }
  .hc-mode .el-menu-item, .hc-mode .el-submenu__title {
    color: #000000;
    color: var(--nav-text-color);
  }
  @media (prefers-color-scheme: dark) {
    .nav-bar {
      background-color: #111111;
    }
  }
  .contrast-test {
    margin-top: 70px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 12px;
  }
  .contrast-box {
    border: 3px solid var(--bauhaus-black);
    padding: 12px;
    --nav-text-color: var(--text-primary);
  }
  .test-light { background-color: #FFFFFF; }
  .test-dark { background-color: #000000; }
  .test-gradient { background: linear-gradient(90deg, #ffffff 0%, #777777 50%, #000000 100%); }
  .test-image {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width=\"200\" height=\"100\"><rect width=\"200\" height=\"100\" fill=\"%23ffffff\"/><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"%2300569C\"/><rect x=\"120\" y=\"20\" width=\"60\" height=\"60\" fill=\"%23E30613\"/></svg>');
    background-size: cover;
    background-position: center;
    background-color: #f2f2f2;
  }
  .test-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 18px;
  }
  .nav-item-sample {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    font-family: var(--bauhaus-font-family);
    color: #333333;
    color: var(--nav-text-color);
    transition: color var(--transition-duration) ease, transform var(--transition-duration) ease;
  }
  .nav-item-sample:hover, .nav-item-sample:focus {
    transform: translateY(-1px);
  }
</style>
