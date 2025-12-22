<template>
  <div class="bauhaus-container">
    <div class="bauhaus-card">
      <div class="bauhaus-header">
        <div class="geometric-shape circle"></div>
        <h2>LOGIN</h2>
        <div class="geometric-shape square"></div>
      </div>
      <el-form ref="form" :model="loginForm" label-width="0px" class="bauhaus-form">
        <el-form-item class="form-item">
          <el-input placeholder="USERNAME" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="PASSWORD" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="bauhaus-btn-primary">ENTER</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="toRegister" class="bauhaus-btn-secondary">REGISTER</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Login",
      data() {
        return {
          loginForm:{
            username:'leo',
            password:'123'
          }
        }
      },
      methods: {
        onSubmit(){
          var _this = this
          this.axios.post("/login",{
            username:this.loginForm.username,
            password:this.loginForm.password,
          })
          .then(function (response) {
            console.log(response.data.status)
            if(response.data.status === 200){
              _this.$store.commit('login',response.data.object)
              // _this.$router.push({path: '/'})
              var path = _this.$route.query.redirect
              _this.$router.replace({path:path === undefined ? '/' : path})
            }
            else {
              alert("账号或密码错误")
            }

          })
          .catch(function (error) {
            console.log(error)
          })

        },

        toRegister(){
          this.$router.replace('/register')
        }
      }
    }
</script>

<style scoped>
  .bauhaus-container {
    height: 100vh;
    width: 100vw;
    background-color: var(--bauhaus-gray);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
  }

  .bauhaus-card {
    background-color: var(--bauhaus-white);
    border: 4px solid var(--bauhaus-black);
    box-shadow: 15px 15px 0px var(--bauhaus-red);
    padding: 40px;
    width: 350px;
    position: relative;
  }

  .bauhaus-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    border-bottom: 2px solid var(--bauhaus-black);
    padding-bottom: 20px;
  }

  h2 {
    margin: 0;
    font-size: 24px;
    letter-spacing: 2px;
    color: var(--bauhaus-black);
    text-transform: uppercase;
    font-weight: 900;
  }

  .geometric-shape {
    width: 20px;
    height: 20px;
  }

  .circle {
    background-color: var(--bauhaus-blue);
    border-radius: 50%; /* Only exception for pure circle */
  }

  .square {
    background-color: var(--bauhaus-yellow);
  }

  .bauhaus-btn-primary {
    width: 100%;
    background-color: var(--bauhaus-blue) !important;
    border: 2px solid var(--bauhaus-black) !important;
    color: white !important;
    margin-bottom: 10px;
  }

  .bauhaus-btn-secondary {
    width: 100%;
    background-color: var(--bauhaus-yellow) !important;
    border: 2px solid var(--bauhaus-black) !important;
    color: var(--bauhaus-black) !important;
  }
</style>
