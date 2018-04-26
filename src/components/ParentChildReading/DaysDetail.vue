<template>
    <div class="days-detail">
      <h3>本周连续阅读 {{data.lianxu_days}}天</h3>
      <p>连续阅读次数超过了{{data.percent}}%人</p>
      <chart :options="options" height=""></chart>
    </div>
</template>
<script>
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legend';

import { numToWord } from '@common';

export default {
  props: ['data'],
  computed: {
    options() {
      let DataTmep = this.data;
      if (!DataTmep) {
        DataTmep = {};
      }

      let seriesData = [];
      DataTmep.group.forEach((val, index) => {
        seriesData[index] = {};
        seriesData[index].value = val.num;
        let day = this.numToWord(val.lianxu_days - 1, '一周');
        seriesData[index].name = `连续${day}${day === '一周' ? '' : '天'} ${seriesData[index].value}%`;
      });

      let pie = {
        animation: false,
        legend: {
          orient: 'vertical',
          x: 'right',
          data: seriesData,
          itemWidth: 14,
          formatter: seriesData[name],
          selectedMode: false,
          align: 'left',
        },
        series: [
          {
            name: '连续阅读天数',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold',
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: seriesData,
          },
        ],
      };
      return pie;
    },
  },
  methods: {
    numToWord,
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.days-detail {
  min-width: 280px;
  padding: 5px 0;
  box-sizing: border-box;
  .echarts {
    width: 100%;
    height: 180px;
  }
}
</style>

