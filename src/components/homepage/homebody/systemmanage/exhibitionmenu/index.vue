<template>
  <div class="content">
    <div class="breadcrumb">
      <span>系统管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>展厅管理</span>
    </div>
    <div class="content-tabs">
      <el-tabs type="border-card" @tab-click="tabClick">
        <el-tab-pane label="产品大类">
          <div class="content-tabs-bigC-btn">
            <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="addEditBig('addBig')">新增大类</el-button>
          </div>
          <template>
            <el-table
              v-loading="bigC.loading"
              :data="bigC.tableData"
              stripe
              size="mini"
              style="width: 100%">
              <el-table-column
                prop="big_name"
                label="大类名称">
              </el-table-column>
              <el-table-column
                prop="big_notes"
                label="大类介绍">
              </el-table-column>
              <el-table-column
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addEditBig('editBig',scope.row)">编辑</el-button>
                  <el-button @click="deleteOne('delBig', scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="产品子类">
          <div class="content-tabs-bigC-btn">
            <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="addEditBig('addSmall')">新增子类</el-button>
          </div>
          <template>
            <el-table
              v-loading="smallC.loading"
              :data="smallC.tableData"
              stripe
              size="mini"
              style="width: 100%">
              <el-table-column
                fixed
                prop="small_name"
                label="子类名称">
              </el-table-column>
              <el-table-column
                fixed
                prop="big_name"
                label="所属大类">
              </el-table-column>
              <el-table-column
                prop="small_notes"
                label="子类介绍">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addEditBig('editSmall',scope.row)">编辑</el-button>
                  <el-button @click="deleteOne('delSmall', scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="产品系列">
          <div class="content-tabs-brandC-btn">
            <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="addEditBig('addBrand')">新增系列</el-button>
          </div>
          <template>
            <el-table
              v-loading="brandC.loading"
              :data="brandC.tableData"
              stripe
              size="mini"
              style="width: 100%">
              <el-table-column
                prop="brand_name"
                label="系列名称">
              </el-table-column>
              <el-table-column
                prop="big_name"
                label="所属大类">
              </el-table-column>
              <el-table-column
                prop="small_name"
                label="所属子类">
              </el-table-column>
              <el-table-column
                prop="brand_notes"
                label="系列介绍">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addEditBig('editBrand',scope.row)">编辑</el-button>
                  <el-button @click="deleteOne(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <add-model :visible.sync="formModel.visible" :action="formModel.action" :receiveForm="formModel.receiveForm" :bigCLists="bigC.tableData" :smallCLists="smallC.tableData" @getList="getList"></add-model>
  </div>
</template>

<script>
import axios from '../../../../../axios'
import addModel from './addModel'
export default {
  data () {
    return {
      formModel: {
        visible: false,
        receiveForm: {},
        action: ''
      },
      bigC: {
        loading: true,
        tableData: []
      },
      smallC: {
        loading: true,
        tableData: []
      },
      brandC: {
        loading: true,
        tableData: []
      }
    }
  },
  components: {
    addModel
  },
  mounted () {
    this.getBigC()
    this.getSmallC()
    this.getBrandC()
  },
  methods: {
    tabClick (tab) {
      console.log(tab.label)
      switch (tab.label) {
        case '产品大类':
        this.getBigC()
        break
        case '产品子类':
        this.getSmallC()
        break
        case '产品系列':
        this.getBrandC()
        break
        default:
        break

      }
    },
    getBigC () {
      axios.get('/config/getBigC')
      .then(data => {
        if(data && data.status==200){
          this.bigC.tableData = data.data
        }
        this.bigC.loading = false
      })
      .catch(error => {
        this.bigC.loading = false
        this.$message({
          message: '获取列表失败！',
          type: 'error'
        });
      })
    },
    getSmallC () {
      axios.get('/config/getSmallC')
      .then(data => {
        if(data && data.status==200){
          this.smallC.tableData = data.data
          this.smallC.tableData.forEach(el => {
            this.bigC.tableData.forEach(el2 => {
              if(el.big_id == el2.big_id) {
                el.big_name = el2.big_name
              }
            })
          })
        }
        this.smallC.loading = false
      })
      .catch(error => {
        this.smallC.loading = false
        this.$message({
          message: '获取列表失败！',
          type: 'error'
        });
      })
    },
    getBrandC () {
      axios.get('/config/getBrandC')
      .then(data => {
        if(data && data.status==200){
          this.brandC.tableData = data.data
        }
        this.brandC.loading = false
      })
      .catch(error => {
        this.brandC.loading = false
        this.$message({
          message: '获取列表失败！',
          type: 'error'
        });
      })
    },
    addEditBig (str,params) {
      this.formModel.visible = true
      this.formModel.action = str
      switch (str) {
        case 'editBig':
        this.formModel.receiveForm = params
        break
        case 'editSmall':
        this.bigC.tableData.forEach(el => {
          if(el.big_id == params.big_id) {
            params.big_id = el.big_name
          }
        })
        this.formModel.receiveForm = params
        break
        case 'editBrand':
        // this.smallC.tableData.forEach(el => {
        //   el.big_id = parseInt(el.big_id)
        // })
        this.formModel.receiveForm = params
        break
        default:
        break
      }
    },
    deleteOne (str, params) {
      let delData = {}
      switch (str) {
        case 'delBig':
        delData = {
          action: str,
          big_id: params.big_id
        }
        break
        case 'delSmall':
        delData = {
          action: str,
          small_id: params.small_id
        }
        break
        case 'delBrand':
        delData = {
          action: str,
          brand_id: params.brand_id
        }
        break
        default:
        break
      }
      axios.post('/config/delMenu',delData)
      .then(data => {
        if(data.status == 200) {
          this.$message({
            message: data.data.message || '成功!',
            type: 'success'
          });
          switch (str) {
            case 'delBig':
            this.getBigC()
            break
            case 'delSmall':
            this.getSmallC()
            break
            default:
            break
          }

        } else {
          this.$message({
            message: data.data.message || '失败!',
            type: 'error'
          });
          switch (str) {
            case 'delBig':
            this.getBigC()
            break
            case 'delSmall':
            this.getSmallC()
            break
            default:
            break
          }
        }

      })
    },
    getList (str) {
      switch (str) {
        case 'addBig':
        case 'editBig':
        this.getBigC()
        break
        case 'addSmall':
        case 'editSmall':
        this.getSmallC()
        break
        case 'addBrand':
        case 'editBrand':
        this.getBrandC()
        break
        default:
        break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.breadcrumb{
  margin-bottom: 15px;
}
</style>


