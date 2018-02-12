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
                <li @click="bigCList('')" :class="{caseChangeClick:choose.big_name==''}">不限</li>
                <li v-for="(item,index) in bigCLists" :class="{caseChangeClick:choose.big_name==item.big_name}" @click="bigCList(item.big_name)">{{item.big_name}}</li>
              </ul>
            </div>
            <div class="ex-menu-classify-content-dashed"></div>
            <div class="ex-menu-classify-content-smallC">
              <span>产品小类</span>
              <ul>
                <li @click="smallCList('')" :class="{caseChangeClick:choose.small_name==''}">不限</li>
                <li v-for="(item,index) in smallCLists" :class="{caseChangeClick:choose.small_name==item.small_name}" @click="smallCList(item.small_name)">{{item.small_name}}</li>
              </ul>
            </div>
            <div class="ex-menu-classify-content-dashed"></div>
            <div class="ex-menu-classify-content-brand">
              <span>产品系列</span>
              <ul>
                <li @click="brandList('')" :class="{caseChangeClick:choose.brand_name==''}">不限</li>
                <li v-for="(item,index) in brandLists" :class="{caseChangeClick:choose.brand_name==item.brand_name}" @click="brandList(item.brand_name)">{{item.brand_name}}</li>
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
          <el-col :span="6" v-for="(o, index) in 4" :key="o"   >
            <div class="ex-goods-list">
              <img src="http://element.eleme.io/static/hamburger.50e4091.png" class="ex-goods-list-image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="ex-goods-list-bottom ex-goods-list-clearfix">
                  <time class="ex-goods-list-bottom-time">2018-2-9</time>
                  <el-button type="text" class="ex-goods--list-bottom-button">操作按钮</el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      bigCLists:[
        {id:1,big_name:'办公桌'},
        {id:2,big_name:'办公椅'},
        {id:3,big_name:'会议桌'},
        {id:4,big_name:'文件柜'},
        {id:5,big_name:'沙发'},
        {id:6,big_name:'茶几'},
        {id:7,big_name:'高隔断'},
        {id:8,big_name:'其他产品'},
        {id:9,big_name:'配件'}
      ],
      smallCLists:[
        {id:1, small_name:'班台'},
        {id:2, small_name:'大班椅'},
        {id:3, small_name:'实木会议桌'},
        {id:4, small_name:'钢木会议桌'},
        {id:5, small_name:'职员椅'},
        {id:6, small_name:'板式文件柜'},
        {id:7, small_name:'更衣柜'},
        {id:8, small_name:'布艺沙发'},
        {id:9, small_name:'板式茶几'},
        {id:10,small_name:'创意茶几'},
        {id:11,small_name:'开放式工作位'},
        {id:12,small_name:'培训桌'},
        {id:13,small_name:'会议椅'},
        {id:14,small_name:'培训椅'},
        {id:15,small_name:'经理主管桌'},
        {id:16,small_name:'班前椅'},
        {id:17,small_name:'板式会议桌'},
        {id:18,small_name:'屏风工作位'},
        {id:19,small_name:'实木文件柜'},
        {id:20,small_name:'钢制文件柜'},
        {id:21,small_name:'皮质沙发'},
        {id:22,small_name:'实木茶几'},
        {id:23,small_name:'玻璃茶几'},
        {id:24,small_name:'活动柜'},
        {id:25,small_name:'职员桌'},
        {id:26,small_name:'前台'},
        {id:27,small_name:'洽谈椅'},
        {id:28,small_name:'休闲椅'},
      ],
      brandLists:[
        {id: 1, brand_name: 'KANO'},
        {id: 2, brand_name: 'YESCOCO'}
      ],
      choose: { big_name: '', small_name: '', brand_name: '' },
    }
  },
  mounted () {

  },
  methods: {
    bigCList (name) {
      this.choose.big_name = name
    },
    smallCList (name) {
      this.choose.small_name = name
    },
    brandList (name) {
      this.choose.brand_name = name
    },
    deleteBigC () {
      this.choose.big_name = ''
    },
    deleteSmallC () {
      this.choose.small_name = ''
    },
    deleteBrand () {
      this.choose.brand_name = ''
    },
    emptyChoose () {
      this.deleteBigC()
      this.deleteSmallC()
      this.deleteBrand()
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
        &-bigC {

        }
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









  }
}
</style>


