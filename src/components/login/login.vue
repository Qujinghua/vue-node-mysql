<template>
  <div class="login">
    <div class="login-img">

    </div>
    <div class="login-form">
      <el-form :model="form" ref="form"  label-width="80px">
        <el-form-item label="用户名" prop="username" :rules="rules.username">
          <el-input type="text" size="mini" v-model="form.username" placeholder="姓名/手机号/邮箱" @keyup.enter.native="submitForm('form')"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd" :rules="rules.pwd">
          <el-input type="password" size="mini" v-model="form.pwd" placeholder="密码" @keyup.enter.native="submitForm('form')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submitForm('form')">登录</el-button>
          <el-button size="mini" @click="resetForm('form')">重置</el-button>
        </el-form-item>
        <el-alert
          title="游客请使用用户名admin密码12345678进行登录"
          type="info"
          show-icon>
        </el-alert>
      </el-form>
    </div>

  </div>

</template>

<script>
import * as types from '../../store/types'
import axios from '../../axios'
import setSession from '../common/sessionStorage'
export default {
  data () {
    return {
      rules: {
        username: [{ required: true, message: '用户名不能为空'}],
        pwd: [{ required: true, message: '用户名不能为空'}],
      },
      form: {
        username: '',
        pwd: ''
      }
    }
  },
  created() {
    // this.test()
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          axios.post('/config/userLogin',this.form)
          .then(data => {
            if (data && data.status == 200 && data.data.status == 200) {
              this.$message({
                message: '恭喜你，登录成功！',
                type: 'success'
              })
              this.$store.dispatch({type:'UserSession', userSession:data.data})
              this.$router.push('/home-page/exhibition')
            } else {
              this.$message({
                message: data.data.message,
                type: 'error'
              });
            }

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (form) {
      this.$refs[form].resetFields();
    },
    // test () {
    //   api.getUser()
    //   .then (data => {
    //     console.log(data)
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
.login {
  overflow: hidden;
  &-img {
    width: 60%;
    height: 500px;
    float: left;
  }
  &-form {
    padding: 100px 0 0 0;
    width: 30%;
    float: left;
  }
}
</style>


