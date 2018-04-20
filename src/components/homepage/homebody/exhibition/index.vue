<template>
  <div class="content">
    <div class="breadcrumb">
      <span>系统管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>网上展厅</span>
    </div>
    <div class="ex">
      <div class="ex-menu">
        <div class="ex-menu-classify">
          <div class="ex-menu-classify-content">
            <div class="ex-menu-classify-content-bigC">
              <span>产品大类</span>
              <ul>
                <li @click="bigCList(0,'')" :class="{caseChangeClick:choose.big_name==''}">不限</li>
                <li v-for="(item,index) in bigCLists" :class="{caseChangeClick:choose.big_name==item.big_name}" @click="bigCList(item.big_id, item.big_name)">{{item.big_name}}</li>
              </ul>
            </div>
            <div class="ex-menu-classify-content-dashed"></div>
            <div class="ex-menu-classify-content-smallC">
              <span>产品小类</span>
              <ul>
                <li @click="smallCList(0,'')" :class="{caseChangeClick:choose.small_name==''}">不限</li>
                <li v-for="(item,index) in smallCLists" :class="{caseChangeClick:choose.small_name==item.small_name}" @click="smallCList(item.small_id, item.small_name)">{{item.small_name}}</li>
              </ul>
            </div>
            <div class="ex-menu-classify-content-dashed"></div>
            <div class="ex-menu-classify-content-brand">
              <span>产品系列</span>
              <ul>
                <li @click="brandList(0,'')" :class="{caseChangeClick:choose.brand_name==''}">不限</li>
                <li v-for="(item,index) in brandLists" :class="{caseChangeClick:choose.brand_name==item.brand_name}" @click="brandList(item.brand_id, item.brand_name)">{{item.brand_name}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="ex-menu-choose" v-if="choose.big_name!=''||choose.small_name!=''||choose.brand_name!=''">
          <span>已选条件</span>
          <ul>
            <li v-if="choose.big_name!=''"><span>{{choose.big_name}}</span><span @click="deleteBigC"><i class="el-icon-close"></i></span></li>
            <li v-if="choose.small_name!=''"><span>{{choose.small_name}}</span><span @click="deleteSmallC"><i class="el-icon-close"></i></span></li>
            <li v-if="choose.brand_name!=''"><span>{{choose.brand_name}}</span><span @click="deleteBrand"><i class="el-icon-close"></i></span></li>
          </ul>
          <span @click="emptyChoose"><i class="el-icon-delete"></i><span>清空条件</span></span>
        </div>
      </div>
      <div class="ex-goods">
        <el-row>
          <el-col :span="6" v-for="(item, index) in goodsList.data" :key="index">
            <div class="ex-goods-list">
              <img :src="'http://localhost/laravel-manage/storage/app/uploads/'+item.photoPath.split(',')[0]" class="ex-goods-list-image">
              <div style="padding: 14px;">
                <span>{{item.name}}</span>
                <p>价格：{{item.price}}</p>
                <p>库存：{{item.stock}}</p>
                <div class="ex-goods-list-bottom ex-goods-list-clearfix">
                  <!-- <time class="ex-goods-list-bottom-time">2018-3-1</time> -->
                  <el-button type="text" class="ex-goods--list-bottom-button" @click="detailModel(item)">更多详情</el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="getTerm.page"
            :page-sizes="[8, 12, 16, 20, 40]"
            :page-size="5"
            layout="total, sizes, prev, pager, next"
            :total="goodsList.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <detail-model :visible.sync="formModel.visible" :action="formModel.action" :receiveForm="formModel.receiveForm"></detail-model>
  </div>
</template>
<script>
import axios from '../../../../axios'
import detailModel from './detailModel'
export default {
  data () {
    return {
      getTerm: {
        page: 1,
        size: 8,
        big_id: 0,
        small_id: 0,
        brand_id: 0
      },
      bigCLists: [],
      smallCLists: [],
      smallCLists2: [],
      brandLists: [],
      brandLists2: [],
      goodsList: {},
      choose: { big_name: '', small_name: '', brand_name: '' },
      formModel: {
        visible: false,
        receiveForm: {},
        action: 'add'
      }
    }
  },
  components: {
    detailModel
  },
  mounted () {
    this.getBigC()
    this.getSmallC()
    this.getBrandC()
    this.getGoods()
  },
  methods: {
    detailModel (item) {
      this.formModel.visible = true
      console.log(item)
    },
    bigCList (id,name) {
      console.log(id+'---'+name)
      if(id) {
        this.smallCLists = this.smallCLists2.filter(el => parseInt(el.big_id) == id)
      } else {
        this.smallCLists = this.smallCLists2
      }
      this.choose.big_name = name
      this.getTerm.big_id = id
      this.getGoods()
    },
    smallCList (id,name) {
      if(id) {
        this.brandLists = this.brandLists2.filter(el => {
          let smallIdArr = el.small_id.split(',')
          smallIdArr.forEach(function(data,index,arr){
            smallIdArr.push(+data);
          });
          return smallIdArr.indexOf(id) != -1
        })
      } else {
        this.brandLists = this.brandLists2
      }
      this.choose.small_name = name
      this.getTerm.small_id = id
      this.getGoods()

    },
    brandList (id,name) {
      this.choose.brand_name = name
      this.getTerm.big_id = id
      this.getGoods()
    },
    deleteBigC () {
      this.smallCLists = this.smallCLists2
      this.choose.big_name = ''
      this.getTerm.big_id = 0
      this.getGoods()
    },
    deleteSmallC () {
      this.brandLists = this.brandLists2
      this.choose.small_name = ''
      this.getTerm.small_id = 0
      this.getGoods()
    },
    deleteBrand () {
      this.choose.brand_name = ''
      this.getTerm.brand_id = 0
      this.getGoods()
    },
    emptyChoose () {
      this.deleteBigC()
      this.deleteSmallC()
      this.deleteBrand()
    },
    getGoods () {
      axios.get('/config/getGoodsExhibition?page=' + this.getTerm.page + '&size=' + this.getTerm.size + '&big_id=' + this.getTerm.big_id + '&small_id=' + this.getTerm.small_id+'&brand_id=' + this.getTerm.brand_id)
      .then(data => {
        if(data.status==200){
          console.log(data)
          this.goodsList = data.data
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
    handleSizeChange(val) {
      // this.loading = true
      this.getTerm.size = val
      this.getGoods()
    },
    handleCurrentChange(val) {
      // this.loading = true
      this.getTerm.page = val
      this.getGoods()
    },
    getBigC () {
      axios.get('/config/getBigC')
      .then(data => {
        if(data && data.status==200){
          this.bigCLists = data.data
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
          this.smallCLists = data.data
          this.smallCLists2 = data.data
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
          this.brandLists = data.data
          this.brandLists2 = data.data
        }
      })
      .catch(error => {
        this.$message({
          message: '获取列表失败！',
          type: 'error'
        });
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.caseChangeClick {
  background: #409EFF;
  color: #FFFFFF;
  padding-right: 5px;
  padding-left: 5px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  border-radius: 3px;
}
.ex {
  margin-top: 15px;
  &-menu {
    &-classify {
      border-top: 2px solid #409EFF;
      border-right: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      border-left: 1px solid #e6e6e6;
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      padding-left: 10px;
      padding-right: 10px;
      &-content {
        &-dashed {
          height: 0;
          width: 100%;
          margin: 0 auto;
          border-top: 1px dashed #d8d8d8;
        }
        & ul {
          overflow: auto;
          & li {
            list-style-type: none;
            float: left;
            cursor: pointer;
            margin-left: 5px;
            margin-bottom: 5px;
            padding-right: 5px;
            padding-left: 5px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            border-radius: 3px;
            &:hover {
              transition: 0.2s;
              background: #409EFF;
              color: #FFFFFF;
            }
          }
        }
        &-bigC,&-smallC,&-brand {
          margin-top: 10px;
          margin-bottom: 5px;
          overflow: auto;
          &>span {
            display: inline-block;
            margin-right: 5px;
            float: left;
            padding-right: 5px;
            padding-left: 5px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            border-radius: 3px;
            background: #EBEEF5;
          }
        }
        // &-bigC {

        // }
      }
    }
    &-choose {
      margin-top: 15px;
      border: 1px solid #e6e6e6;
      border-radius: 3px;
      padding: 10px;
      display: flex;
      justify-content: flex-start;
      &>span:nth-child(1) {
        margin-right: 10px;
        height: 24px;
        line-height: 24px;
        border-radius: 3px;
        padding-left: 5px;
        padding-right: 5px;
        background: #EBEEF5;
      }
      //清空条件
      &>span:nth-child(3) {
        cursor: pointer;
        margin-left: 10px;
        height: 24px;
        color: #409EFF;
        line-height: 24px;
        & span {
          margin-right: 2px;
        }
      }
      & ul {
        overflow: auto;
        & li {
          list-style-type: none;
          float: left;
          margin-right: 5px;
          border: 1px solid #409EFF;
          border-radius: 3px;
          & span {
            display: inline-block;
            float: left;
            &:nth-child(1) {
              height: 22px;
              line-height: 22px;
              padding-left: 5px;
              padding-right: 5px;
            }
            &:nth-child(2) {
              cursor: pointer;
              width: 22px;
              text-align: center;
              height: 22px;
              line-height: 22px;
              background: #409EFF;
              & i {
                color: #FFFFFF;
              }
            }
          }
        }
      }
    }
  }
  &-goods{
    margin-top: 15px;
    &-list{
      padding: 5px;
      border: 1px solid #fff;
      &:hover {
        border: 1px solid #e6e6e6;
        transition: 0.3s;
      }
      &-image {
        width: 100%;
        height: 260px;
        // border: 1px solid #e6e6e6;
        display: block;
      }
      &-bottom {
        margin-top: 13px;
        line-height: 12px;
        &-time {
          font-size: 13px;
          color: #999;
        }
        .clearfix:before,
        .clearfix:after {
          display: table;
          content: "";
        }

        .clearfix:after {
          clear: both
        }
        .button {
          padding: 0;
          float: right;
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


