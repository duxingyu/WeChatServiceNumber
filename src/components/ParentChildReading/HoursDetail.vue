<template>
    <div class="hours-detail">
      <h3>本周阅读时间段</h3>
      <chart :options="options"></chart>
      <p>全国有{{data.percent}}%的⽤用户选择{{data.common}}-{{data.common + 1}}点陪伴阅读。<br>稳定的阅读时间有助于养成良好的阅读习惯</p>
    </div>
</template>
<script>
import 'echarts/lib/chart/line';

export default {
  props: ['data'],
  computed: {
    options() {
      let DataTmep = this.data;
      if (!DataTmep) {
        DataTmep = {};
      }

      let seriesData = {
        time: [],
        num: [],
      };
      DataTmep.group.forEach((val, index) => {
        seriesData.time[index] = val.hourTime;
        seriesData.num[index] = val.num;
      });

      let line = {
        animation: false,
        xAxis: {
          type: 'category',
          data: seriesData.time,
          axisLine: {
            lineStyle: {
              // color: '#ccc',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            data: seriesData.num,
            type: 'line',
            symbolSize: 1,
            showAllSymbol: true,
            smooth: true,
            label: {
              show: true,
              distance: 10,
            },
          },
          {
            name: 'line',
            type: 'bar',
            barWidth: 1,
            itemStyle: {
              normal: {
                color: '#ccc',
              },
            },
            data: seriesData.num,
          },
        ],
      };
      return line;
    },
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.hours-detail {
  min-width: 280px;
  padding: 5px 0;
  box-sizing: border-box;
  .echarts {
    width: 100%;
    // height: 180px;
  }
}
</style>

