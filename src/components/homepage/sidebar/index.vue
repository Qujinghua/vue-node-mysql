<template>
<div class="container-sidebar">
  <el-col :span="8">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
      @select="selectMenu">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span>工作计划管理</span>
        </template>
        <el-menu-item index="1-1">新添工作计划</el-menu-item>
        <el-menu-item index="1-2">未完成工作计划</el-menu-item>
        <el-menu-item index="1-3">需要我协同计划</el-menu-item>
        <el-menu-item index="1-4">已完成工作计划</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>客户管理</span>
        </template>
        <!-- <el-menu-item index="2-1">新增客户信息</el-menu-item> -->
        <el-menu-item index="/home-page/customer">我的客户列表</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>销售订单管理</span>
        </template>
        <el-menu-item index="3-1">进行中报价单</el-menu-item>
        <el-menu-item index="3-2">已签销售订单</el-menu-item>
        <el-menu-item index="3-3">已归档销售订单</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-view"></i>
          <span>财务管理/报表</span>
        </template>
        <el-menu-item index="4-1">业绩报表</el-menu-item>
        <el-menu-item index="4-2">客户来源分析</el-menu-item>
      </el-submenu>
      <el-submenu index="5" v-if="superAdmin">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/home-page/usermanage">员工管理</el-menu-item>
        <el-menu-item index="/home-page/departmentmanage">部门管理</el-menu-item>
        <el-menu-item index="/home-page/">选项3</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</div>
</template>
<script>
export default {
  data () {
    return {
      superAdmin: false
    }
  },
  mounted () {
    this.getIsSuperAdmin()
  },
  methods: {
    getIsSuperAdmin () {
      let sessionIsSuperAdmin = sessionStorage.getItem('isSuperAdmin')
      if(sessionIsSuperAdmin!=0) {
        this.superAdmin = true
      } else {
        this.superAdmin = false
      }
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    selectMenu(key, keyPath) {
      // this.$router.push(keyPath[1])
      // let menuObj = {
      //   classA: ['工作计划管理','客户管理','销售订单管理','财务管理/报表','系统管理'],
      //   classB: [
      //     ['新添工作计划','未完成工作计划','需要我协同计划','已完成工作计划'],
      //     ['新增客户信息','我的客户列表'],
      //     ['进行中的报价','已签销售订单','已归档销售订单'],
      //     ['业绩报表','客户来源分析'],
      //     ['员工管理','部门管理']
      //   ]
      // }
      // let menuArr = keyPath[1].split('-')
      // menuArr.forEach(function(data,index,arr){
      //   menuArr.push(+data);
      // });
      // this.$store.dispatch({type:'breadCrumbOne', breadCrumbOne: menuObj.classA[menuArr[0]-1]})
      // this.$store.dispatch({type:'breadCrumbTwo', breadCrumbTwo: menuObj.classB[menuArr[0]-1][menuArr[1]-1]})

    }
  }
}
</script>
<style lang="scss" scoped>
.container-sidebar{
  float: left;
  position: fixed;
  top: 51px;
  height: 100%;
  overflow: auto;
  &>div{
    height: 100%;
    &>ul{
      height: 100%;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  text-align: left;
  // min-height: 400px;
}
// .container-sidebar {
  // float: left;
  // height: -moz-calc(100% - 30px);
  // height: -webkit-calc(100% - 30px);
  // height: calc(100%-30px);
  // overflow: auto;
// }
</style>



