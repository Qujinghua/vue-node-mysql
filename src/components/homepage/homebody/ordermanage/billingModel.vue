<template>
  <el-dialog :title="title" :visible="visible" @close="closeModel" width="800px">
    <el-form :model="form" ref="form" :inline="false" :rules="rules2" label-width="135px" v-loading="loading">
      <el-form-item label="客户名称" prop="name" >
        <el-input v-model="form.customer_name" disabled size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="name" >
        <el-input v-model="form.customer_name" disabled size="mini" style="width:220px"></el-input>
        <el-input v-model="form.customer_phone" disabled size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="合同编号" prop="bill_order_num" >
        <el-input v-model="form.bill_order_num" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="销售日期" prop="bill_sale_date" >
        <el-date-picker
          style="width:220px"
          v-model="form.bill_sale_date"
          type="date"
          size="mini"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="销售金额" prop="bill_sale_money" >
        <el-input v-model="form.bill_sale_money" size="mini" style="width:220px"></el-input>
      </el-form-item>
      <!-- <el-form-item label="折扣" prop="bill_sale_discount" >
        <el-input v-model="form.bill_sale_discount" size="mini" style="width:220px"></el-input> 折
      </el-form-item>
      <el-form-item label="首款金额" prop="bill_sale_first_money" >
        <el-input v-model="form.bill_sale_first_money" size="mini" style="width:220px"></el-input>
        <el-radio-group v-model="form.bill_sale_first_money_method">
          <el-radio label="刷卡"></el-radio>
          <el-radio label="公司账户"></el-radio>
          <el-radio label="微信/支付宝"></el-radio>
          <el-radio label="商场账户"></el-radio>
          <el-radio label="现金"></el-radio>
          <el-radio label="其他"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="信息费用" prop="bill_info_fee" >
        <el-input v-model="form.bill_info_fee" size="mini" style="width:220px"></el-input>
        <br>
        <el-radio-group v-model="form.bill_info_fee_method">
          <el-radio label="待定"></el-radio>
          <el-radio label="含税（开票）"></el-radio>
          <el-radio label="不含税（不开票）"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="交货日期" prop="bill_deliery_date" >
        <el-date-picker
          style="width:220px"
          v-model="form.bill_deliery_date"
          type="date"
          size="mini"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单状态" prop="bill_status" >
        <el-radio-group v-model="form.bill_status">
          <el-radio label="未付款"></el-radio>
          <el-radio label="已付款"></el-radio>
          <el-radio label="货到付款"></el-radio>
          <el-radio label="其他"></el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="付款方式" prop="bill_payment_method" >
        <el-radio-group v-model="form.bill_payment_method">
          <el-radio label="全款付清"></el-radio>
          <el-radio label="预付首款，货到付清"></el-radio>
          <el-radio label="货到付款"></el-radio>
          <el-radio label="其他"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="公司开户银行" prop="company_open_bank" >
        <el-input v-model="form.company_open_bank" size="mini" style="width:220px"></el-input>
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
  customer_name: '',
  customer_phone: '',

  bill_order_num: '',
  bill_sale_date: '',
  bill_sale_money: '',
  // bill_sale_discount: 10,
  // bill_sale_first_money: '',
  // bill_sale_first_money_method: '',

  // bill_info_fee: '',
  // bill_info_fee_method: '',
  bill_deliery_date: '',
  bill_status: ''
  // bill_payment_method: '',
  // company_open_bank: ''

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
      selUser: [],
      rules2: {
        bill_order_num: [
          { required: true, message:'请输入合同编号', trigger: 'blur' }
        ],
        bill_sale_date: [
          { required: true, message:'请选择销售日期', trigger: 'blur' }
        ],
        bill_sale_money: [
          { required: true, message: '请输入销售金额', trigger: 'blur' }
        ],
        
        bill_deliery_date: [
          { required: true, message: '请选择交货日期', trigger: 'blur' }
        ],
        bill_status: [
          { required: true, message: '请选择订单状态', trigger: 'blur' }
        ],
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
      if(now && this.action === 'bill') {
        // console.log(this.receiveForm)
        this.form = this.receiveForm
        // this.form.bill_order_num = this.FormatDateTime()
        // this.form.customer_name = this.receiveForm.customer_name
        // this.form.customer_phone = this.receiveForm.customer_phone
        // this.form.company_open_bank = this.receiveForm.company_open_bank
        // this.form.customer_id = this.receiveForm.customer_id
      }
    }
  },
  computed: {
    title () {
      return '销售开单'
    },
  },
  mounted () {

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
      // let nowDate = new Date()
      // if(this.action != 'bill') {
      //   this.form.inputDate = nowDate.getFullYear() + '-' + (nowDate.getMonth()+1) + '-' + nowDate.getDate()
      // }
      // if(this.form.user_name == '') {
      //   this.form.user_name = sessionStorage.getItem('username')
      // }
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
    FormatDateTime() {
      // var a = time.replace("/Date(", "").replace(")/", "");
      // var date = new Date(parseInt(a));
      var date = new Date()
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return '' + y + m + d + 'H' + h + minute + second;
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


