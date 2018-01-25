<template>
  <el-dialog :title="title" :visible="visible" @close="closeModel" width="500px">
    <el-form :model="form" ref="form" :rules="rules2" label-width="90px" v-loading="loading">
      <el-form-item label="姓名" prop="name" >
        <el-input v-model="form.name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" >
        <el-input v-model="form.phone" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" >
        <el-input v-model="form.email" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="department" >
        <el-select v-model="form.department" size="mini" placeholder="请选择">
          <el-option
            v-for="item in selDepartment"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="超级管理员" prop="isSuperAdmin">
        <el-switch
          v-model="form.isSuperAdmin">
        </el-switch>
        <el-tooltip class="item" effect="dark" content="打开开关，此员工将拥有超级管理员权限，请悉知" placement="right">
          <i class="el-icon-question" style="font-size:18px;margin-left:10px;"></i>
        </el-tooltip>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel" size="small">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import axios from '../../../../../axios'
const defaultForm = {
  name: '',
  phone: '',
  email: '',
  department: '',
  isSuperAdmin: false
}
export default {
  props: {
    visible: '',
    action: '',
    receiveForm: {}
  },
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入手机号码'));
      } else {
        if (!(/^1[3|4|5|6|8|9][0-9]\d{8}$/.test(value))) {
          return callback(new Error('请输入正确的手机号码'));
        }
        callback()
      }

    };
    return {
      loading: true,
      form: {
        name: '',
        phone: '',
        email: '',
        department: '',
        isSuperAdmin: 0
      },
      selDepartment: [],
      rules2: {
        name: [
          { required: true, message:'请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator:checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible (now) {
      if(now && this.action === 'edit') {
        this.form = {...this.receiveForm}
        if(this.form.isSuperAdmin) {
          this.form.isSuperAdmin = true
        } else {
          this.form.isSuperAdmin = false
        }
      }
    }
  },
  computed: {
    title () {
      return this.action == 'add' ? '新增员工' : '编辑员工'
    },
  },
  mounted () {
    this.getDepartment()
  },
  methods: {
    closeModel () {
      this.resetForm()
      this.$emit('update:visible', false)
    },
    resetForm() {
      this.form = {...defaultForm}
    },
    getDepartment () {
      axios.get('/config/getDepartment')
      .then(data => {
        if(data.status==200){
          this.selDepartment = []
          data.data.forEach(el => {
            this.selDepartment.push(el.name)
          })
        }
        this.loading = false
      })
      .catch(error => {
        console.log(error)
      })
    },
    submitForm (form) {
      this.form.action = this.action
      if(this.form.isSuperAdmin) {
        this.form.isSuperAdmin = 1
      } else {
        this.form.isSuperAdmin = 0
      }
      this.$refs[form].validate((valid) => {
        if(valid) {
          axios.post('/config/updateUser',this.form)
          .then(data => {
            if(data && data.data.status == 200 && data.status == 200){
              this.closeModel()
              this.$message({
                message: data.data.message,
                type: 'success'
              })
              this.$emit('getList', this.action)
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
</style>


