<template>
  <div class="content">
    <div class="breadcrumb">
      <span>系统管理</span>
      <i class="el-icon-arrow-right"></i>
      <span>展厅管理</span>
    </div>
    <div class="content-tabs">
      <el-tabs type="border-card">
        <el-tab-pane label="产品大类">产品大类</el-tab-pane>
        <el-tab-pane label="产品子类">产品子类</el-tab-pane>
        <el-tab-pane label="产品系列">产品系列</el-tab-pane>
        <el-tab-pane label="交付周期">交付周期</el-tab-pane>
        <el-tab-pane label="仓库名称">仓库名称</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.breadcrumb{
  margin-bottom: 15px;
}
</style>


