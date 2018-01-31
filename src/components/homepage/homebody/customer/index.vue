<template>
  <div class="content">
    <div class="breadcrumb">
      <span>系统管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>客户管理</span>
    </div>
    <div class="content-detail">
      <el-card class="box-card" :body-style="{padding:'15px'}">
        <div slot="header" class="clearfix">
          <span>客户管理</span>
        </div>
        <div class="content-detail-body">
          <div class="content-detail-body-btn">
            <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="addEdit('add')">新增客户</el-button>
            <el-button type="primary" plain size="mini" icon="el-icon-delete" @click="deleteList">批量删除</el-button>
            <div class="content-detail-body-btn-search">
              <el-input placeholder="姓名/所属部门" v-model="searchInput" v-on:keyup.enter="search" size="mini" width="100px" class="content-detail-body-btn-search-input"></el-input>
              <el-button slot="append" @click="search" size="mini" icon="el-icon-search" class="content-detail-body-btn-search-btn"></el-button>
            </div>
          </div>

          <template>
            <el-table
              v-loading="loading"
              :data="tableData.data"
              stripe
              size="mini"
              @selection-change="selectList"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                fixed
                prop="customer_id"
                label="编号">
              </el-table-column>
              <el-table-column
                label="客户名称">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addEdit('edit',scope.row)">{{scope.row.customer_name}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="customer_contacts"
                label="联系人">
              </el-table-column>
              <el-table-column
                prop="customer_phone"
                label="联系方式">
              </el-table-column>
              <el-table-column
                prop="moveDate"
                label="迁入日期">
              </el-table-column>
              <el-table-column
                prop="user_name"
                label="录入人员">
              </el-table-column>
              <el-table-column
                prop="inputDate"
                label="录入日期">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="170">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addEdit('edit',scope.row)">报价</el-button>
                  <el-button type="text" size="small" @click="addEdit('edit',scope.row)">销售开单</el-button>
                  <el-button @click="deleteOne(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="getTerm.page"
                :page-sizes="[10, 20, 30, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next"
                :total="tableData.total">
              </el-pagination>
            </div>

          </template>
        </div>
      </el-card>
    </div>
    <add-model :visible.sync="formModel.visible" :action="formModel.action" :receiveForm="formModel.receiveForm" @getList="getList"></add-model>
  </div>
</template>
<script>
import axios from '../../../../axios'
import addModel from './addModel'
export default {
  data () {
    return {
      loading: true,
      tableData: {},
      selectArr: [],
      searchInput: '',
      getTerm: {
        page: 1,
        size: 10,
        keyword: ''
      },
      formModel: {
        visible: false,
        receiveForm: {},
        action: 'add'
      }
    }
  },
  components: {
    addModel
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
      this.formModel.receiveForm = {}
      if(action == 'edit') {
        this.formModel.receiveForm = params
      }
      this.formModel.visible = true
    },
    getCustomer () {
      axios.get('/config/getCustomer?page=' + this.getTerm.page + '&size=' + this.getTerm.size+'&keyword=' + this.getTerm.keyword)
      .then(data => {
        if(data.status==200){
          this.tableData = data.data
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
        this.selectArr.push(el.customer_id)
      })
    },
    deleteOp (delId) {
      return axios.post('/config/delCustomer',{customer_id:delId})
    },
    deleteOne(row) {
      let delId = row.customer_id
      this.$confirm('此操作将永久删除该客户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteOp(delId)
        .then(data => {
          if(data.data.status == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
          this.getCustomer()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    deleteList() {
      if(this.selectArr.length<1) {
        this.$message({
          message: '请至少选择列表中的一个'
        })
      } else {
        this.$confirm('此操作将永久删除已选中的客户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.selectArr.forEach(el => {
            this.deleteOp(el)
            .then(data => {
              if(data.data.status == 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });

              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                })
              }
              this.getCustomer()
            })
          })

        })

        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
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
</style>


