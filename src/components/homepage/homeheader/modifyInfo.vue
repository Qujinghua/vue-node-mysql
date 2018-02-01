<template>
  <el-dialog :title="title" :visible="visible" @close="closeModel" width="600px">
    <el-form :model="form" ref="form" :rules="rules2" label-width="50px">
      <el-form-item label="姓名" prop="name" >
        <el-input v-model="form.name" size="mini" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" >
        <el-input v-model="form.phone" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" >
        <el-input v-model="form.email" size="mini"></el-input>
      </el-form-item>
      <el-alert
        title="您可以通过电话/邮箱作为用户名登录本系统。如果您想要修改电话或者邮箱，请在编辑后点击下方提交按钮。"
        type="info"
        show-icon>
      </el-alert>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel" size="small">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')" size="small">提 交</el-button>
    </div>
  </el-dialog>
</template>
<script>
import axios from '../../../axios'
const defaultForm = {
  id: '',
  name: '',
  phone: '',
  email: '',
}
export default {
  props: {
    visible: '',
    action: '',
    receiveForm: {}
  },
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!(/^1[3|4|5|6|8|9][0-9]\d{8}$/.test(value))) {
        return callback(new Error('请输入正确的手机号码'));
      }
      callback()
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if(!(/^.{8,16}$/.test(value))){
        callback(new Error('请保证密码在8-16位'));
      } else {
        if (this.form.checkNewPwd !== '') {
          this.$refs.form.validateField('checkNewPwd');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {},
      checkForm: {},
      selDepartment: [],
      rules2: {
        phone: [
          { validator:checkPhone, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {

  },
  computed: {
    title () {
      return '个人信息'
    },
  },
  // beforeUpdate () {
  //   this.setForm()
  // },
  updated () {
    this.setForm()
  },
  methods: {
    closeModel () {
      this.resetForm()
      this.$emit('update:visible', false)
    },
    resetForm() {
      this.form = {...defaultForm}
    },
    setForm () {
      this.form = this.receiveForm
    },
    submitForm (form) {
      this.form.action = this.action
      this.$refs[form].validate((valid) => {
        if(valid) {
          axios.post('/config/updatePersonalInfo',this.form)
          .then(data => {
            // console.log(data)
            if(data && data.data.status == 200 && data.status == 200){
              this.closeModel()
              this.$message({
                message: data.data.message,
                type: 'success'
              })
              // this.$router.push('/login')
              // this.$emit('modifyInfo', this.action)
            } else {
              this.$message({
                message: data.data.message,
                type: 'info'
              })
            }
          })
        } else {
          return false
        }
      })

    },
  }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
.el-dialog div:nth-child(5) {
  margin-bottom: 20px;
}
</style>


