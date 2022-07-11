<template>
  <div class="login-container">
    <h1>智慧服务平台</h1>
    <div class="login-form">
      <h2>欢迎登录</h2>
      <el-form ref="form" :model="loginForm" >
        <el-form-item >
          <el-input v-model.trim="loginForm.username" placeholder="请输入账号" suffix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input type="password" clearable v-model.trim="loginForm.password" show-password placeholder="请输入密码" suffix-icon="el-icon-s-goods"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="verify">
            <el-input v-model.trim="loginForm.code" placeholder="请输入验证码"></el-input>
            <el-image :src="codeImageUrl" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="danger">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import UserApi from '@/api/user'
export default {
  name: 'index',
  data() {
    return {
      // 验证码路径
      codeImageUrl: '',
      // 登录参数
      loginForm: {
        username: '',
        password: '',
        code: '',
        token: ''
      }
    }
  },
  created () {
    this.handleGetCaptcha()
  },
  methods: {
    async handleGetCaptcha() {
      const response = await UserApi.getCaptcha()
      console.log(response)
    }
  }
}
</script>

<style scoped>
.login-container{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-family: Verdana;
  background-size: cover;
  background: url('../../assets/images/bg.jpg') no-repeat fixed center;
}
h1{
  text-align: center;
  font-size: 42px;
  margin-top: 50px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 5px;
}
h2{
  color: #fff;
  font-size: 30px;
  margin-bottom: 30px;
}
.login-form{
  margin: 10% auto 13%;
  width: 20%;
}
.verify{
  width: 100%;
  display: flex;
  align-items: center;
}
.el-image{
  width: 200px;
  height: 40px;
  border-radius: 5px;
  margin-left: 10px;
  cursor:pointer;
}
</style>
