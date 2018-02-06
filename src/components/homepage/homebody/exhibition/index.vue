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
                <li @click="bigCList(0,'')" :class="{caseChangeClick:choose.big_name==0}">不限</li>
                <li v-for="(item,index) in bigCLists" :class="{caseChangeClick:choose.big_name==item.id}" @click="bigCList(item.id, item.big_name)">{{item.big_name}}</li>
              </ul>
            </div>
            <div class="ex-menu-classify-content-dashed"></div>
            <div class="ex-menu-classify-content-smallC">
              <span>产品小类</span>
              <ul>
                <li @click="smallCList(0,'')" :class="{caseChangeClick:choose.small_name==0}">不限</li>
                <li v-for="(item,index) in smallCLists" :class="{caseChangeClick:choose.small_name==item.id}" @click="smallCList(item.id, item.small_name)">{{item.small_name}}</li>
              </ul>
            </div>
            <div class="ex-menu-classify-content-dashed"></div>
            <div class="ex-menu-classify-content-brand">
              <span>产品系列</span>
              <ul>
                <li @click="brandList(0,'')" :class="{caseChangeClick:choose.brand_name==0}">不限</li>
                <li v-for="(item,index) in brandLists" :class="{caseChangeClick:choose.brand_name==item.id}" @click="brandList(item.id, item.brand_name)">{{item.brand_name}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="ex-menu-choose" v-if="choose.big_name!=0||choose.small_name!=0||choose.brand_name!=0">
          <span>已选条件</span>
          <ul>
            <li v-if="choose.big_name!=0"><span>{{chooseShow.big_name}}</span><span @click="deleteBigC"><i class="el-icon-close"></i></span></li>
            <li v-if="choose.small_name!=0"><span>{{chooseShow.small_name}}</span><span @click="deleteSmallC"><i class="el-icon-close"></i></span></li>
            <li v-if="choose.brand_name!=0"><span>{{chooseShow.brand_name}}</span><span @click="deleteBrand"><i class="el-icon-close"></i></span></li>
          </ul>
          <span @click="emptyChoose"><i class="el-icon-delete"></i><span>清空条件</span></span>
        </div>
      </div>
      <div class="ex-"></div>
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
        {id:1,brand_name:'KANO'},
        {id:2,brand_name:'YESCOCO'}
      ],
      choose: {big_name: 0, small_name: 0, brand_name: 0, city: ''},
      chooseShow: {big_name: '', small_name: '', brand_name: '', city: ''},
    }
  },
  mounted () {

  },
  methods: {
    bigCList (id, name) {
      this.choose.big_name = id
      this.chooseShow.big_name = name
    },
    smallCList (id, name) {
      this.choose.small_name = id
      this.chooseShow.small_name = name
    },
    brandList (id, name) {
      this.choose.brand_name = id
      this.chooseShow.brand_name = name
    },
    deleteBigC () {
      this.choose.big_name = 0
      this.chooseShow.big_name = ''
    },
    deleteSmallC () {
      this.choose.small_name = 0
      this.chooseShow.small_name = ''
    },
    deleteBrand () {
      this.choose.brand_name = 0
      this.chooseShow.brand_name = ''
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
}
</style>


