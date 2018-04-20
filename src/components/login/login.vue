<template>
  <div class="login">
    <div class="login-content">
      <!-- <div class="login-content-layer"></div> -->
      <div class="login-content-form">
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  &-content{
    border-radius:5px;
    box-shadow: 4px 4px 8px rgba(126, 101, 101, 0.8),
                -4px -4px 8px rgba(155, 130, 130, 0.8);
    width: 90%;
    height: 85%;
    // background-image: url("../../assets/banner.jpg"); will-change: transform; transform: perspective(1000px) rotateX(-0.8deg) rotateY(-0.02deg) scale3d(1, 1, 1);
    background-image: url("../../assets/banner.jpg"); 
    background-size: 100%;
    overflow: hidden;
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &-layer {
      position: absolute;
      width: 100%;
      height: 100%;
      // -webkit-filter: blur(15px);
      // -moz-filter: blur(15px);
      // -o-filter: blur(15px);
      // -ms-filter: blur(15px);
      // filter: blur(15px);
    }
    &-form {
      position: absolute;
      background: #FFFFFF;
      padding: 40px 30px 30px 30px;
      border-radius: 5px;
      right: 50px;
      width: 350px;
      float: right;
    }
  }

}
</style>


