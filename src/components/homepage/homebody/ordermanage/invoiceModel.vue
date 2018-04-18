<template>
  <el-dialog :title="title" :visible="visible" @close="closeModel" width="600px">
    <el-form :model="form" ref="form" :rules="rules2" label-width="120px" v-loading="loading">
      <el-form-item label="发票抬头" prop="invoice_raise" >
        <el-input v-model="form.invoice_raise" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="纳税人识别号" prop="invoice_num" >
        <el-input v-model="form.invoice_num" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="发票金额" prop="invoice_money" >
        <el-input v-model="form.invoice_money" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="发票类型" prop="invoice_type">
        <el-radio-group v-model="form.invoice_type">
          <el-radio label="增值税专用发票"></el-radio>
          <el-radio label="增值税普通发票"></el-radio>
          <el-radio label="其他"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.invoice_desc" type="textarea" :rows="2" size="mini"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel" size="small">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import axios from '../../../../axios'
const defaultForm = {
  invoice_raise: '',
  invoice_num: '',
  invoice_money: '',
  invoice_type: '',
  invoice_desc: '',
}
export default {
  props: {
    visible: '',
    action: '',
    receiveForm: {}
  },
  data () {
    // var checkPhone = (rule, value, callback) => {
    //   if (!value) {
    //     return callback();
    //   } else {
    //     if (!(/^1[3|4|5|6|8|9][0-9]\d{8}$/.test(value))) {
    //       return callback(new Error('请输入正确的手机号码'));
    //     }
    //     callback()
    //   }

    // };
    return {
      loading: true,
      form: {...defaultForm},
      selDepartment: [],
      rules2: {
        invoice_raise: [
          { required: true, message:'请输入发票抬头', trigger: 'blur' }
        ],
        invoice_num: [
          { required: true, message:'请输入纳税人识别号', trigger: 'blur' }
        ],
        invoice_money: [
          { required: true, message:'请输入发票金额', trigger: 'blur' }
        ],
        invoice_type: [
          { required: true, message:'请输入发票类型', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible (now) {
      if(now && this.action === 'invoice') {
        this.form = {...this.receiveForm}
        console.log(this.form)
      }
    }
  },
  computed: {
    title () {
      return '发票信息'
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
      // console.log(this.form)
      this.$refs[form].validate((valid) => {
        if(valid) {
          axios.post('/config/updateCustomer',this.form)
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


