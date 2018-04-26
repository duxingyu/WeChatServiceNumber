<template>
    <div class="hours-detail">
        <h3>本周陪伴孩⼦子度过了了 {{data.userMinute}}分钟亲⼦子阅读时光</h3>
        <p>超过了了全国{{data.percent}}%人</p>
        <table>
          <thead>
            <tr>
              <th>时间</th>
              <th>书目</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="val in data.readlist" :key="val.day">
              <td>周{{numToWord(val.day - 1)}}</td>
              <td>
                <p v-for="item in val.list" :key="item.clazz_id">{{item.title}}</p>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>
<script>
import {numToWord} from '@common';

export default {
    data() {
      return {
        readDays: [],
      }
    },
    props:["data"],
    methods: {
      numToWord,
      init() {
        this.data

      },
    },
    beforeMount(){
        // this.isLogin(true).then(res =>{
        //     this.init()
        // })
        this.init()
    },

}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.hours-detail {
    min-width: 280px;
    padding: 5px 0;
    box-sizing: border-box;
    .echarts{
        width: 100%;
    }
}
</style>

