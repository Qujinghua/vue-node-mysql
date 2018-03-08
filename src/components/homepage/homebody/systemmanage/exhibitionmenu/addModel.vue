<template>
  <el-dialog v-if="action=='addBig'||action=='editBig'" :title="title" :visible="visible" @close="closeModel" width="500px">
    <el-form :model="form" ref="form" :rules="rules2" label-width="80px">
      <el-form-item label="大类名称" prop="big_name" >
        <el-input v-model="form.big_name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="大类名称" prop="big_notes" >
        <el-input v-model="form.big_notes" size="mini"></el-input>
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
  big_name: '',
  big_notes: ''
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
        big_name: '',
        big_notes: ''
      },
      rules2: {
        big_name: [
          { required: true, message:'部门名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible (now) {
      if(now && this.action === 'editBig') {
        this.form = {...this.receiveForm}
      }
    }
  },
  computed: {
    title () {
      switch(this.action) {
        case 'addBig':
        return '新增大类'
        break
        case 'editBig':
        return '编辑大类'
        break
        case 'addSmall':
        return '新增子类'
        break
        case 'add':
        return '新增产品'
        break
        default:
        return
        break
      }
      // return this.action == 'add' ? '新增部门' : '编辑部门'
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
          axios.post('/config/updateMenu',this.form)
          .then(data => {
            if(data && data.data.status == 200 && data.status == 200){
              this.closeModel()
              this.$message({
                message: data.data.message || '成功！',
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


