<template>
  <!-- 大类 -->
  <el-dialog v-if="action=='addBig'||action=='editBig'" :title="title" :visible="visible" @close="closeModel('big')" width="500px">
    <el-form :model="form" ref="form" :rules="rulesBig" label-width="80px">
      <el-form-item label="大类名称" prop="big_name" >
        <el-input v-model="form.big_name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="大类备注" prop="big_notes" >
        <el-input v-model="form.big_notes" size="mini"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel('big')" size="small">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')" size="small">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 子类 -->
  <el-dialog v-else-if="action=='addSmall'||action=='editSmall'" :title="title" :visible="visible" @close="closeModel('small')" width="500px">
    <el-form :model="smallForm" ref="smallForm" :rules="rulesSmall" label-width="80px">
      <el-form-item label="子类名称" prop="small_name" >
        <el-input v-model="smallForm.small_name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="所属大类" prop="big_name" >
        <!-- <el-input v-model="smallForm.big_name" size="mini"></el-input> -->
        <el-select v-model="smallForm.big_name" placeholder="请选择" size="mini">
          <el-option
            v-for="item in bigCLists"
            :key="item.big_name"
            :label="item.big_name"
            :value="item.big_name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="子类备注" prop="small_notes" >
        <el-input v-model="smallForm.small_notes" size="mini"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel('small')" size="small">取 消</el-button>
      <el-button type="primary" @click="submitFormSmall('smallForm')" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import axios from '../../../../../axios'
const defaultBigForm = {
  big_name: '',
  big_notes: ''
}
const defaultSmallForm = {
  small_name: '',
  big_name: '',
  small_notes: ''
}
export default {
  props: {
    visible: '',
    action: '',
    receiveForm: {},
    bigCLists: {},
    smallCLists: {}
  },
  data () {
    return {
      form: {
        big_name: '',
        big_notes: ''
      },
      smallForm: {
        small_name: '',
        big_name: '',
        small_notes: ''
      },
      rulesBig: {
        big_name: [
          { required: true, message:'大类名称不能为空', trigger: 'blur' }
        ]
      },
      rulesSmall: {
        small_name: [
          { required: true, message:'子类名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible (now) {
      if(now && this.action === 'editBig') {
        this.form = {...this.receiveForm}
      } else if(this.action === 'editSmall') {
        this.smallForm = {...this.receiveForm}
      }
      console.log(this.bigCLists)
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
    closeModel (str) {
      if(str == 'big') {
        this.resetFormBig()
      } else if(str == 'small'){
        this.resetFormSmall()
      }
      this.$emit('update:visible', false)
    },
    resetFormBig(str) {
      this.form = {...defaultBigForm}
    },
    resetFormSmall(str) {
      this.form = {...defaultSmallForm}
    },
    submitForm (form) {
      this.form.action = this.action
      this.$refs[form].validate((valid) => {
        if(valid) {
          axios.post('/config/updateMenu',this.form)
          .then(data => {
            if(data && data.data.status == 200 && data.status == 200){
              this.closeModel('big')
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


