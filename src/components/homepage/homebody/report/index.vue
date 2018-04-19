<template>
  <div class="content">
    <div class="breadcrumb">
      <span>财务管理/报表</span>
      <i class="el-icon-arrow-right"></i>
      <span>业绩报表</span>
    </div>
    <div class="content-detail">
      <el-card class="box-card" :body-style="{padding:'15px'}">
        <div slot="header" class="clearfix">
          <span>业绩报表</span>
        </div>
        <div class="content-detail-body">
          <div id="main" :style="{width: '1200px', height: '400px'}"></div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import axios from '../../../../axios'
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts
// 引入 ECharts 主模块
// var echarts = require('echarts/lib/echarts');
// // 引入柱状图
// require('echarts/lib/chart/bar');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');


export default {

  data () {
    return {
      dateList: ["2000-06-05","2000-06-06","2000-06-07","2000-06-08","2000-06-09"],
      valueList: [116,129,135,86,73],
      getTerm: {
        page: 1,
        size: 10,
        keyword: ''
      },
    }
  },
  created () {
    this.getCustomer()
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    getCustomer () {
      axios.get('/config/getCustomer')
      .then(data => {
        if(data.status==200){
          console.log(data)
          // this.tableData = data.data
        }
        this.loading = false
      })
      .catch(error => {
        console.log(error)
      })
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'));
      // 绘制图表
      myChart.setOption({
        visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
        }],


        title: [{
            left: 'center',
            text: '近期业绩曲线图'
        }],
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [{
            data: this.dateList
        }],
        yAxis: [{
            splitLine: {show: false}
        }],
        grid: [{
            bottom: '10%'
        }],
        series: [{
            type: 'line',
            showSymbol: false,
            data: this.valueList
        }]
      });
    }

  }
}
</script>
<style lang="scss" scoped>
.breadcrumb{
  margin-bottom: 15px;
}
</style>


