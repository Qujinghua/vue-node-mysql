<template>
  <div class="content">
    <div class="breadcrumb">
      <span>系统管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>商品管理</span>
    </div>
    <div class="content-detail">
      <el-card class="box-card" :body-style="{padding:'15px'}">
        <div slot="header" class="clearfix">
          <span>商品管理</span>
        </div>
        <div class="content-detail-body">
          <div class="content-detail-body-btn">
            <el-button type="primary" plain size="mini" icon="el-icon-plus" @click="addEdit('add')">新增商品</el-button>
            <!-- <el-button type="primary" plain size="mini" icon="el-icon-delete" @click="deleteList">批量删除</el-button> -->
            <div class="content-detail-body-btn-search">
              <el-input placeholder="商品名" v-model="searchInput" @keyup.enter.native="search" size="mini" width="100px" class="content-detail-body-btn-search-input"></el-input>
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
                prop="name"
                label="名称">
              </el-table-column>
              <el-table-column
                prop="price"
                label="报价">
              </el-table-column>
              <el-table-column
                prop="spec"
                label="规格">
              </el-table-column>
              <el-table-column
                prop="color"
                label="颜色">
              </el-table-column>
              <el-table-column
                prop="configure"
                label="配置">
              </el-table-column>
              <el-table-column
                prop="material"
                label="材质">
              </el-table-column>
              <el-table-column
                prop="stock"
                label="库存">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope" v-if="!scope.row.inoperable">
                  <el-button type="text" size="small" @click="addEdit('edit',scope.row)">编辑</el-button>
                  <el-button @click="deleteOne(scope.row)" type="text" size="small">删除</el-button>
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
    <add-model :visible.sync="formModel.visible" :action="formModel.action" :receiveForm="formModel.receiveForm" :bigC="bigC" :smallC="smallC" :brandC="brandC" @getList="getList"></add-model>
  </div>
</template>
<script>
import axios from '../../../../../axios'
import addModel from './addModel'
export default {
  data () {
    return {
      loading: true,
      tableData: {
        data: [
          // {
          //   name: 'Kano-Yoo1 慕驰高管桌',
          //   price: '34888-45888',
          //   spec: '3200W*2550D*760H',
          //   color: '灰色',
          //   configure: '常规',
          //   material: '木饰面',
          //   stock: '7'
          // }
        ]
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
        action: 'add'
      },
      bigC: [],
      smallC: [],
      brandC: []

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
      // console.log(params)
      this.formModel.action = action
      this.formModel.receiveForm = {}
      if(action == 'edit') {
        this.formModel.receiveForm = params
        this.formModel.receiveForm.fileLists = []
        let nameArr = params.photoName.split(',')
        let pathArr = params.photoPath.split(',')
        let urlArr = params.photoUrl.split(',')
        for(let i = 0;i<nameArr.length;i++){
          let fileList = {}
          fileList.name = nameArr[i]
          fileList.url = urlArr[i]
          fileList.path = pathArr[i]
          this.formModel.receiveForm.fileLists.push(fileList)
        }
      }
      this.formModel.visible = true
    },
    getGoods () {
      axios.get('/config/getGoods?page=' + this.getTerm.page + '&size=' + this.getTerm.size+'&keyword=' + this.getTerm.keyword)
      .then(data => {
        if(data.status==200){

          this.tableData = data.data
          // this.tableData.data.forEach(el => {
          //   if(el.isSuperAdmin) {
          //     el.isSuperAdmin = '超级管理员'
          //   } else {
          //     el.isSuperAdmin = '普通管理员'
          //   }
          //   if(el.id == 1) {
          //     el.inoperable = true
          //   }
          // })
        }
        this.loading = false
      })
      .catch(error => {
        console.log(error)
      })
    },
    getList (action) {
      // console.log(action)
      this.getGoods()
    },
    selectList (val) {
      this.selectArr = []
      val.forEach(el => {
        this.selectArr.push(el.id)
      })
    },
    deleteOp (delId) {
      return axios.post('/config/delGoods',{id:delId})
    },
    deletePhoto (delFile) {
      delFile.forEach(el => {
        axios.post('/config/deleteFile',{file: el})
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.log(error)
        })
      })
      return
    },
    deleteOne(row) {
      console.log(row)
      let delId = row.id
      let photoArr = row.photoPath.split(',')
      this.$confirm('此操作将永久删除该家具信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletePhoto(photoArr)
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
        })
        this.getGoods()
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
        this.$confirm('此操作将永久删除已选中的商品信息, 是否继续?', '提示', {
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
            })
          })

          this.getGoods()
        }).catch(() => {
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
      this.getGoods()
    },
    handleCurrentChange(val) {
      this.loading = true
      this.getTerm.page = val
      this.getGoods()
    },
    search () {
      this.loading = true
      this.getTerm.keyword = this.searchInput
      this.getGoods()
    },
    getBigC () {
      axios.get('/config/getBigC')
      .then(data => {
        if(data && data.status==200){
          this.bigC = data.data
          // console.log(this.bigC)
        }
      })
      .catch(error => {
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
          this.smallC = data.data
          // console.log(this.smallC)
        }
      })
      .catch(error => {
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
          this.brandC = data.data
          // console.log(this.brandC)
        }
      })
      .catch(error => {
        this.$message({
          message: '获取列表失败！',
          type: 'error'
        });
      })
    }

  },

  mounted () {
    this.getBigC()
    this.getSmallC()
    this.getBrandC()
    this.getGoods()
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


