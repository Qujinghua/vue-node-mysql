<template>
  <el-dialog :title="title" :visible="visible" @close="closeModel" width="500px">
    <el-form :model="form" ref="form" :rules="rules2" label-width="80px">
      <el-form-item label="部门名称" prop="name" >
        <el-input v-model="form.name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="部门地址" prop="address">
        <el-input v-model="form.address" size="mini"></el-input>
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
  address: ''
}
export default {
  props: {
    visible: '',
    action: '',
    receiveForm: {}
  },
  data () {
    return {
      form: {
        name: '',
        address: ''
      },
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
      return this.action == 'add' ? '新增部门' : '编辑部门'
    },
  },
  methods: {
    closeModel () {
      this.resetForm()
      this.$emit('update:visible', false)
    },
    resetForm() {
      this.form = {...defaultForm}
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
                message: '成功！',
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


