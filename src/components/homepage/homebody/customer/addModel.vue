<template>
  <el-dialog :title="title" :visible="visible" @close="closeModel" width="800px">
    <el-form :model="form" ref="form" :inline="true" :rules="rules2" label-width="135px" v-loading="loading">
      <el-form-item label="资源渠道" prop="name" >
        <el-select v-model="form.department" size="mini" placeholder="请选择" style="width:108px">
          <el-option
            v-for="item in selDepartment"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-select v-model="form.department" size="mini" placeholder="请选择" style="width:108px">
          <el-option
            v-for="item in selDepartment"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <br v-if="true">
      <el-form-item label="客户名称" prop="phone" >
        <el-input v-model="form.phone" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="公司性质" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="phone" >
        <el-input v-model="form.phone" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="场所性质" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone" >
        <el-input v-model="form.phone" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="场所面积（平米）" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="公司网址" prop="phone" >
        <el-input v-model="form.phone" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="email" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="预计迁入日期" prop="phone" >
        <el-date-picker
          style="width:220px"
          v-model="value1"
          type="date"
          size="mini"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="公司税号" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="公司开户银行" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="公司开户账号" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="公司地址" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:588px"></el-input>
      </el-form-item>
      <el-form-item label="接进人员或关键字" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:588px"></el-input>
      </el-form-item>
      <el-form-item label="项目负责人" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="负责人电话" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="负责人手机" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="负责人email" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="设计公司名称" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="设计师" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="设计师电话" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="设计师email" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="项目地址" prop="email" >
        <el-input v-model="form.email" size="mini" style="width:588px"></el-input>
      </el-form-item>
      <el-form-item label="需求调研" prop="email" >
        <el-input type="textarea" v-model="form.email" :rows="2" placeholder="请输入内容" style="width:588px"></el-input>
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
      loading: false,
      form: {
        name: '',
        phone: '',
        email: '',
        department: '',
        isSuperAdmin: 0
      },
      selDepartment: [],
      rules2: {
        // name: [
        //   { required: true, message:'请输入姓名', trigger: 'blur' }
        // ],
        // phone: [
        //   { required: true, validator:checkPhone, trigger: 'blur' }
        // ],
        // email: [
        //   { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        //   { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        // ],
        // department: [
        //   { required: true, message: '请选择部门', trigger: 'blur' }
        // ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
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
        }]
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
    // this.getDepartment()
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
.el-form-item {
  margin-bottom: 0px;
}
</style>


