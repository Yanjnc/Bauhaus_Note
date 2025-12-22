<template>
  <div class="bauhaus-container">
    <div class="bauhaus-card">
      <div class="bauhaus-header">
        <div class="geometric-shape triangle"></div>
        <h2>REGISTER</h2>
        <div class="geometric-shape circle-red"></div>
      </div>
      <el-form ref="form" :model="registerForm" label-width="0px" class="bauhaus-form">
        <el-form-item class="form-item">
          <el-input placeholder="USERNAME" v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="PASSWORD" v-model="registerForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="CONFIRM PASSWORD" v-model="registerForm.passwordConfirm" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="bauhaus-btn-primary">CREATE ACCOUNT</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="toLogin" class="bauhaus-btn-secondary">BACK TO LOGIN</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Register",
      data() {
        return {
          registerForm:{
            username:'',
            password:'',
            passwordConfirm:'',
          }
        }
      },
      methods: {
        onSubmit(){
          var _this = this
          if(this.registerForm.password !== this.registerForm.passwordConfirm){
            this.$message({
              message:'两次输入的密码不一致',
              type:'error'
            })
            return
          }

          this.axios.post("/register",{
            username:this.registerForm.username,
            password:this.registerForm.password
          })
          .then(function (response) {
            _this.$router.replace('/login')
          })
          .catch(function (error) {
            console.log(error)
          })
        },

        toLogin(){
          this.$router.replace('/login')
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
    box-shadow: 15px 15px 0px var(--bauhaus-blue);
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
    width: 0;
    height: 0;
  }

  .triangle {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid var(--bauhaus-yellow);
  }

  .circle-red {
    width: 20px;
    height: 20px;
    background-color: var(--bauhaus-red);
    border-radius: 50%;
  }

  .bauhaus-btn-primary {
    width: 100%;
    background-color: var(--bauhaus-red) !important; /* Different color for register */
    border: 2px solid var(--bauhaus-black) !important;
    color: white !important;
    margin-bottom: 10px;
  }

  .bauhaus-btn-secondary {
    width: 100%;
    background-color: var(--bauhaus-white) !important;
    border: 2px solid var(--bauhaus-black) !important;
    color: var(--bauhaus-black) !important;
  }
</style>
