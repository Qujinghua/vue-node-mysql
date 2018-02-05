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
                <li @click="bigCList('0')" :class="{caseChangeClick:choose.big_name==0}">不限</li>
                <li v-for="(item,index) in bigCLists" :class="{caseChangeClick:choose.big_name==item.id}" @click="bigCList(item.id)">{{item.big_name}}</li>
              </ul>
            </div>
            <div class="ex-menu-classify-content-smallC">
              <span>产品小类</span>
              <ul>
                <li @click="smallCList('0')" :class="{caseChangeClick:choose.big_name==0}">不限</li>
                <li v-for="(item,index) in smallCLists" :class="{caseChangeClick:choose.small_name==item.id}" @click="smallCList(item.id)">{{item.small_name}}</li>
              </ul>
            </div>
            <div class="ex-menu-classify-content-smallC">
              <span>产品系列</span>
              <ul>
                <li @click="brandLists('0')" :class="{caseChangeClick:choose.brand_name==0}">不限</li>
                <li v-for="(item,index) in brandLists" :class="{caseChangeClick:choose.brand_name==item.id}" @click="smallCList(item.id)">{{item.brand_name}}</li>
              </ul>
            </div>
          </div>
        </div>  
        <div class="ex-menu-choose">已选条件</div>  
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
      choose: {big_name:'',small_name:'',product:'',city:''}, 
    }
  },
  mounted () {

  },
  methods: {
    bigCList () {

    },
    bigCList () {

    }
  }
}
</script>
<style lang="scss" scoped>
.caseChangeClick {

}
.ex {
  &-menu {
    &-classify {
      &-content {
        & ul li {
          list-style-type: none;
          float: left;
        }
        &-bigC {

        }
      }
    }
  }
}
</style>


