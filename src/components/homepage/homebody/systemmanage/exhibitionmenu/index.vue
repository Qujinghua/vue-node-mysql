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
        <!-- <el-tab-pane label="产品系列">
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
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addEditBig('editBig',scope.row)">编辑</el-button>
                  <el-button @click="deleteOne(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane> -->
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
      }
    }
  },
  components: {
    addModel
  },
  mounted () {
    this.getBigC()
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
        default:
        break

      }
    },
    getBigC () {
      axios.get('/config/getBigC')
      .then(data => {
        if(data.status==200){
          this.bigC.tableData = data.data
        }
        this.bigC.loading = false
      })
      .catch(error => {
        console.log(error)
      })
    },
    getSmallC () {
      axios.get('/config/getSmallC')
      .then(data => {
        if(data.status==200){
          this.smallC.tableData = data.data
        }
        this.smallC.loading = false
      })
      .catch(error => {
        console.log(error)
      })
    },
    addEditBig (str,params) {
      this.formModel.visible = true
      this.formModel.action = str
      switch (str) {
        case 'editBig':
        this.formModel.receiveForm = params
        break
        default:
        break
      }
    },
    deleteOne (str, params) {
      let delData = {
        action: str,
        big_id: params.big_id
      }
      axios.post('/config/delMenu',delData)
      .then(data => {
        if(data.status == 200) {
          this.$message({
            message: data.data.message || '成功!',
            type: 'success'
          });
          this.getBigC()
        } else {
          this.$message({
            message: data.data.message || '失败!',
            type: 'error'
          });
          this.getBigC()
        }

      })
    },
    getList (str) {
      switch (str) {
        case 'editBig':
        case 'addBig':
        this.getBigC()
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


