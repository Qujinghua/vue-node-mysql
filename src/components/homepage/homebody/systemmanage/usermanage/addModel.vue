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
        <el-input v-model="form.name" size="mini"></el-input>
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
    return {
      loading: true,
      form: {
        name: '',
        phone: '',
        email: '',
        department: '',
        isSuperAdmin: false
      },
      selDepartment: [],
      rules2: {
        name: [
          { required: true, message:'部门名称不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message:'部门地址不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible (now) {
      if(now && this.action === 'edit') {
        this.form = {...this.receiveForm}
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
      axios.get('./getDepartment')
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
      this.$refs[form].validate((valid) => {
        if(valid) {
          axios.post('/updateDepartment',this.form)
          .then(data => {
            if(data && data.data.status == 200 && data.status == 200){
              this.closeModel()
              this.$message({
                message: '成功',
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


