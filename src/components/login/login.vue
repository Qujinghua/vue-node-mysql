<template>
  <div class="">
    <el-form :model="form" ref="form"  label-width="100px">
      <el-form-item label="用户名" prop="username" :rules="rules.username">
        <el-input type="text" v-model="form.username" placeholder="姓名/手机号/邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd" :rules="rules.pwd">
        <el-input type="password" v-model="form.pwd" placeholder="密码"></el-input>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
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
  }
}
</script>

