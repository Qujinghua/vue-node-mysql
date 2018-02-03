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
                <li @click="bigCList('0')" :class="{caseChangeClick:choose.big_classify==0}">不限</li>
                <li v-for="(item,index) in bigCLists" :class="{caseChangeClick:choose.big_classify==item.id}" @click="bigCList(item.id)">{{item.big_classify}}</li>
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
        {id:1,big_classify:'办公桌'},
        {id:2,big_classify:'办公椅'},
        {id:3,big_classify:'会议桌'},
        {id:4,big_classify:'文件柜'},
        {id:5,big_classify:'沙发'},
        {id:6,big_classify:'茶几'},
        {id:7,big_classify:'高隔断'},
        {id:8,big_classify:'其他产品'},
        {id:9,big_classify:'配件'}
      ],
      choose: {big_classify:'',small_classify:'',product:'',city:''}, 
    }
  },
  mounted () {

  },
  methods: {
    bigCList () {

    }
  }
}
</script>
<style lang="scss" scoped>
.caseChangeClick {

}
</style>


