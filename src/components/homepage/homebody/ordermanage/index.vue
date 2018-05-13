<template>
  <div class="content">
    <div class="breadcrumb">
      <span>订单管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>订单管理</span>
    </div>
    <div class="content-detail">
      <el-card class="box-card" :body-style="{padding:'15px'}">
        <div slot="header" class="clearfix">
          <span>订单管理</span>
        </div>
        <div class="content-detail-body">
          <div class="content-detail-body-btn">
            <div class="content-detail-body-btn-search">
              <el-input placeholder="业务员 / 客户 / 合同号" v-model="searchInput" @keyup.enter.native="search" size="mini" width="100px" class="content-detail-body-btn-search-input"></el-input>
              <el-button slot="append" @click="search" size="mini" icon="el-icon-search" class="content-detail-body-btn-search-btn"></el-button>
            </div>
          </div>

          <template>
            <el-table
              v-loading="loading"
              :data="tableData.order"
              stripe
              size="mini"
              @selection-change="selectList"
              style="width: 100%">
              <!-- <el-table-column
                type="selection"
                width="55"
                :selectable="disableCheckBox">
              </el-table-column> -->
              <el-table-column
                fixed
                prop="user_name"
                label="业务">
              </el-table-column>
              <el-table-column
                prop="bill_order_num"
                label="合同号"
                width="125">
              </el-table-column>
              <el-table-column
                prop="customer_name"
                label="客户">
              </el-table-column>
              <el-table-column
                prop="bill_sale_money"
                label="金额">
              </el-table-column>
              <el-table-column
                prop="bill_sale_date"
                label="签约日期">
              </el-table-column>
              <el-table-column
                prop="bill_deliery_date"
                label="交货日期">
              </el-table-column>
              <el-table-column
                prop="bill_status"
                label="状态">
                <template slot-scope="scope">
                  <div v-html="scope.row.bill_status_font">{{scope.row.bill_status_font}}</div>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="160">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="billing(scope.row)">
                    修改订单
                  </el-button>
                  <el-button type="text" size="small" @click="addEdit('invoice',scope.row)">
                    发票信息
                    <!-- {{ scope.row.invoice_num == null ? '发票信息' : '已开票'}} -->
                  </el-button>
                  <!-- <el-button @click="deleteOne(scope.row)" type="text" size="small">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="getTerm.page"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="5"
                layout="total, sizes, prev, pager, next"
                :total="tableData.total">
              </el-pagination>
            </div>

          </template>
        </div>
      </el-card>
    </div>
    <invoice-model :visible.sync="formModel.visible" :action="formModel.action" :receiveForm="formModel.receiveForm" @getList="getList"></invoice-model>
    <billing-model :visible.sync="billingModel.visible" :action="billingModel.action" :receiveForm="billingModel.receiveForm" @getList="getList"></billing-model>
  </div>
</template>
<script>
import axios from '../../../../axios'
import invoiceModel from './invoiceModel'
import billingModel from './billingModel'
export default {
  data () {
    return {
      loading: true,
      tableData: {
        order: [],
        total: 0
      },
      selectArr: [],
      searchInput: '',
      getTerm: {
        page: 1,
        size: 5,
        keyword: ''
      },
      formModel: {
        visible: false,
        receiveForm: {},
        action: 'invoice'
      },
      billingModel: {
        visible: false,
        receiveForm: {},
        action: 'bill'
      }
    }
  },
  components: {
    invoiceModel,
    billingModel
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    // disableCheckBox (row, index) {
    //   return index !== 0
    // },
    addEdit (action, params) {
      this.formModel.action = action
      this.formModel.receiveForm = params
      this.formModel.visible = true
    },
    getCustomer () {
      // axios.get('/config/getCustomer?page=' + this.getTerm.page + '&size=' + this.getTerm.size+'&keyword=' + this.getTerm.keyword + '&signed=yes')
      axios.get('/config/getOrder?page=' + this.getTerm.page + '&size=' + this.getTerm.size+'&keyword=' + this.getTerm.keyword)
      .then(data => {
        if(data.status==200){
          data.data.order.forEach(el => {
            let orderList = el
            data.data.customer.forEach(el2 => {
              if(el.customer_id == el2.customer_id) {
                orderList.user_name = el2.user_name
                orderList.customer_name = el2.customer_name
                orderList.customer_contacts = el2.customer_contacts
                orderList.customer_phone = el2.customer_phone
              }
            })
            this.tableData.order.push(orderList)
          })
          this.tableData.total = data.data.total
          // console.log(data.data)
          this.tableData.order.forEach(el => {
            if(el.bill_status == '已付款') {
              el.bill_status_font = '<span style="display:block;width:64px;height:24px;line-height:24px;border-radius:12px;text-align:center;color:#FFF;background:#67C23A;">已付款</span>'
            } else if (el.bill_status == '未付款') {
              el.bill_status_font = '<span style="display:block;width:64px;height:24px;line-height:24px;border-radius:12px;text-align:center;color:#FFF;background:#F56C6C;">未付款</span>'
            } else if (el.bill_status == '货到付款') {
              el.bill_status_font = '<span style="display:block;width:64px;height:24px;line-height:24px;border-radius:12px;text-align:center;color:#FFF;background:#E6A23C;">货到付款</span>'
            } else {
              el.bill_status_font = '<span style="display:block;width:64px;height:24px;line-height:24px;border-radius:12px;text-align:center;color:#FFF;background:#E6A23C;">其他</span>'
            }
          })
        }
        this.loading = false
      })
      .catch(error => {
        console.log(error)
      })
    },
    getList (action) {
      // console.log(action)
      this.getCustomer()
    },
    selectList (val) {
      this.selectArr = []
      val.forEach(el => {
        this.selectArr.push(el.id)
      })
    },
    handleSizeChange(val) {
      this.loading = true
      this.getTerm.size = val
      this.getCustomer()
    },
    handleCurrentChange(val) {
      this.loading = true
      this.getTerm.page = val
      this.getCustomer()
    },
    search () {
      this.loading = true
      this.getTerm.keyword = this.searchInput
      this.getCustomer()
    },
    billing (params) {
      this.billingModel.receiveForm = params
      this.billingModel.visible = true
      // console.log(params)
    }
  },
  mounted () {
    this.getCustomer()
  }
}
</script>
<style lang="scss" scoped>
.breadcrumb{
  margin-bottom: 15px;
}
.content-detail {
  &-body{
    &-btn{
      margin-bottom: 10px;
      &-search {
        display: inline-block;
        float: right;
        width: 260px;
        &-input {
          width: 210px;
          float: left;
        }
        &-btn {
          width: 50px;
          text-align: center;
          float: left;
        }
      }
    }
    .pagination {
      padding: 10px 0 0 0;
      text-align: right;
    }

  }
}
// .pay {
//   display: block;
//   color: #fff;
//   width: 40px;
//   height: 30px;
//   border-radius: 3px;
//   &-all {
//     background: #67C23A;
//   }
// }
</style>


