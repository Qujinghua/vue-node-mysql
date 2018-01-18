<template>
  <div class="content">
    <div class="breadcrumb">
      <span>系统管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>部门管理</span>
    </div>
    <div class="content-detail">
      <el-card class="box-card" :body-style="{padding:'15px'}">
        <div slot="header" class="clearfix">
          <span>部门管理</span>
        </div>
        <div class="content-detail-body">
          <div class="content-detail-body-btn">
            <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="addEdit('add')">新增部门</el-button>
            <el-button type="primary" plain size="mini" icon="el-icon-delete">批量删除</el-button>
          </div>

          <template>
            <el-table
              :data="tableData"
              size="mini"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                fixed
                prop="name"
                label="部门名称"
                width="300">
              </el-table-column>
              <el-table-column
                prop="address"
                label="部门地址">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addEdit('edit')">编辑</el-button>
                  <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-card>
    </div>
    <add-model></add-model>
  </div>
</template>
<script>
import axios from 'axios'
import addModel from './addModel'
export default {
  data () {
    return {
      tableData: [],
      show: false,
      form: {}
    }
  },
  components: {
    addModel
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    addEdit (str) {
      if(str == 'add') {
        this.show = true
      }
    },
    getDepartment () {
      axios.get('/getDepartment')
      .then(data => {
        this.tableData = data.data
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getDepartment()
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
    }
  }
}
</style>


