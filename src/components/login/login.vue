<template>
  <div class="">
    <el-form :model="registerValidateForm" label-width="100px" ref="registerValidateForm">
      <el-form-item
                  prop="name"
                  label="用户名"
                  :rules="rules.name"
                  >
      <el-input v-model="registerValidateForm.name" placeholder="姓名/手机号/邮箱"></el-input>
      </el-form-item>
      <el-form-item
                  prop="password"
                  label="密码"
                  :rules="rules.password"
                  >
        <el-input type="password" v-model="registerValidateForm.password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm('registerValidateForm')">登录</el-button>
      <el-button @click="resetForm('registerValidateForm')">重置</el-button>

    </el-form>
  </div>
</template>

<script>
import * as types from '../../store/types'
import api from '../../axios'
  export default {
    name: 'login',
    data () {
      return {
        registerValidateForm: {
          name: '',
          password: ''
        },
        rules: {
          name: [{required: true, message: '请输入用户名（姓名/手机号/邮箱）',trigger: 'blur'}],
          password: [{required: true,message: '请输入密码',trigger: 'blur'}]
        }
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            let opt = this.registerValidateForm;
            api.userRegister(opt)
            .then(function (response) {
              if(response.success) {
                this.$message({
                  type: 'success',
                  message: `登录成功`
                })
                //Register 设计为了Login的组件，所以成功跳转时刷新一次页面
                this.$router.go(0)
                this.$router.push('./hello')
              } else {
                this.$message({
                  type: 'error',
                  message: '登录失败'
                })
              }
            }).catch(function(err) {
              console.log(err);
            })

          } else {
            console.log('error submit!!!');
            return false;
          }
        })
      }
    }

  }
</script>

<style lang="scss" scoped>

</style>

