<template>
  <div class="content">
    <div class="breadcrumb">
      <span>系统管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>展厅管理</span>
    </div>
    <div class="content-tabs">
      <el-tabs type="border-card">
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
                fixed
                prop="name"
                label="大类名称">
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
        </el-tab-pane>
        <el-tab-pane label="产品子类">
          <div class="content-tabs-bigC-btn">
            <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="addEditBig('addSmall')">新增子类</el-button>
          </div>
          <template>
            <el-table
              v-loading="bigC.loading"
              :data="bigC.tableData"
              stripe
              size="mini"
              style="width: 100%">
              <el-table-column
                fixed
                prop="name"
                label="大类名称">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addEditBig('editSmall',scope.row)">编辑</el-button>
                  <el-button @click="deleteOne(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="产品系列">
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
                fixed
                prop="name"
                label="大类名称">
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
        </el-tab-pane>
      </el-tabs>
    </div>
    <add-model :visible.sync="formModel.visible" :action="formModel.action" :receiveForm="formModel.receiveForm" @getList="getList"></add-model>
  </div>
</template>

<script>
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
        loading: 'true',
        tableDate: []
      }
    }
  },
  components: {
    addModel
  },
  methods: {
    addEditBig (str,params) {
      this.formModel.visible = true
    },
    deleteOne () {

    },
    getList () {

    }
  }
}
</script>
<style lang="scss" scoped>
.breadcrumb{
  margin-bottom: 15px;
}
</style>


