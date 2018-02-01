<template>
  <el-dialog :title="title" :visible="visible" @close="closeModel" width="600px">
    <el-form :model="form" ref="form" :rules="rules2" label-width="110px">
      <el-form-item label="新密码" prop="newPwd" >
        <el-input type="password" v-model="form.newPwd" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="请再次输入密码" prop="checkNewPwd">
        <el-input type="password" v-model="form.checkNewPwd" size="mini"></el-input>
      </el-form-item>
      <el-alert
        title="密码修改后需要重新登录，请您牢记修改后的密码。"
        type="info"
        show-icon>
      </el-alert>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel" size="small">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import axios from '../../../axios'
const defaultForm = {
  id: '',
  newPwd: '',
  checkNewPwd: ''
}
export default {
  props: {
    visible: '',
    action: '',
    receiveForm: {}
  },
  data () {
    // var checkPhone = (rule, value, callback) => {
    //   if (!(/^1[3|4|5|6|8|9][0-9]\d{8}$/.test(value))) {
    //     return callback(new Error('请输入正确的手机号码'));
    //   }
    //   callback()
    // };
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
      selDepartment: [],
      rules2: {
        newPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkNewPwd: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  watch: {

  },
  computed: {
    title () {
      return '修改密码'
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
      console.log(this.form)
    },
    submitForm (form) {
      this.form.action = this.action
      console.log(this.form)
      this.$refs[form].validate((valid) => {
        if(valid) {
          axios.post('/config/updatePersonalInfo',this.form)
          .then(data => {
            if(data && data.data.status == 200 && data.status == 200){
              this.closeModel()
              this.$message({
                message: data.data.message,
                type: 'success'
              })
              this.$router.push('/login')
              // this.$emit('modifyInfo', this.action)
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


