<template>
  <div class="">
    <el-form :model="form" ref="form"  label-width="100px">
      <el-form-item label="用户名" prop="username" :rules="rules.username">
        <el-input type="text" v-model="form.username" placeholder="姓名/手机号/邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd" :rules="rules.pwd">
        <el-input type="password" v-model="form.pwd" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import * as types from '../../store/types'
import api from '../../axios'
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
    this.test()
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          api.userLogin(this.form)
          .then(data => {
            console.log(data)
            if (data && data.status == 200) {
              this.$message({
                message: '恭喜你，登录成功！',
                type: 'success'
              });
              this.$router.push('./home-page')
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
    test () {
      api.getUser()
      .then (data => {
        console.log(data)
      })
    }
  }
}
</script>

