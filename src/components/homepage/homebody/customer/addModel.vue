<template>
  <el-dialog :title="title" :visible="visible" @close="closeModel" width="800px">
    <el-form :model="form" ref="form" :inline="true" :rules="rules2" label-width="135px" v-loading="loading">
      <el-form-item label="资源渠道" prop="name" >
        <el-select v-model="form.customer_resources" size="mini" placeholder="请选择" style="width:220px">
          <el-option
            v-for="item in selResources"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <br v-if="action=='add'">
      <el-form-item label="转移到" prop="user_name" v-if="action=='edit'">
        <el-select v-model="form.user_name" size="mini" placeholder="请选择" style="width:220px">
          <el-option
            v-for="item in selUser"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称" prop="customer_name" >
        <el-input v-model="form.customer_name" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="customer_contacts" >
        <el-input v-model="form.customer_contacts" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="customer_phone" >
        <el-input v-model="form.customer_phone" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <!-- <el-form-item label="场所面积（平米）" prop="customer_area" >
        <el-input v-model="form.customer_area" size="mini" style="width:220px"></el-input>
      </el-form-item> -->
      <el-form-item label="email" prop="customer_email" >
        <el-input v-model="form.customer_email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <!-- <el-form-item label="预计迁入日期" prop="moveDate" >
        <el-date-picker
          style="width:220px"
          v-model="form.moveDate"
          type="date"
          size="mini"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item> -->
     
      <!-- <el-form-item label="公司地址" prop="company_address" >
        <el-input v-model="form.company_address" size="mini" style="width:588px"></el-input>
      </el-form-item> -->
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
  user_name: '',
  customer_resources: '',
  customer_name: '',
  customer_contacts: '',
  customer_phone: '',
  // customer_area: '',
  customer_email: '',
  // moveDate: '',
  // company_address: ''

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
      loading: false,
      form: {...defaultForm},
      selResources: [
        {id: 1, name: '公司资源'},
        {id: 2, name: '展厅资源'}
      ],
      selUser: [],
      rules2: {
        customer_resources: [
          { required: true, message:'请选择资源', trigger: 'blur' }
        ],
        customer_name: [
          { required: true, message:'请填写客户名称', trigger: 'blur' }
        ],
        customer_contacts: [
          { required: true, message: '请填写联系人', trigger: 'blur' }
        ],
        customer_phone: [
          { required: true, message: '请填写联系方式', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() < Date.now();
        // },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '明天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        },{
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        },{
          text: '一周后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        },{
          text: '十天后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 10);
            picker.$emit('pick', date);
          }
        },{
          text: '二十天后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 20);
            picker.$emit('pick', date);
          }
        },{
          text: '三十天后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
            picker.$emit('pick', date);
          }
        }]
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
      return this.action == 'add' ? '新增客户' : '编辑客户'
    },
  },
  mounted () {
    this.getUser()
  },
  methods: {
    closeModel () {
      this.resetForm()
      this.$emit('update:visible', false)
    },
    resetForm() {
      this.form = {...defaultForm}
    },
    getUser() {
      axios.get('/config/getUser')
      .then(data => {
        if(data.status==200){
          this.selUser = []
          data.data.data.forEach(el => {
            this.selUser.push(el.name)
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
      let nowDate = new Date()
      this.form.inputDate = nowDate.getFullYear() + '-' + (nowDate.getMonth()+1) + '-' + nowDate.getDate()
      if(this.form.user_name == '') {
        this.form.user_name = sessionStorage.getItem('username')
      }
      console.log(this.form)
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
.el-form-item {
  margin-bottom: 10px;
}
</style>


