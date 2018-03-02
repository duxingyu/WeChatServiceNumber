<template>
    <div class="learning-time-ratio">
        <div class="title">
            总学习时长占比
        </div>
        <div class="ratio">
            <chart :options="options"></chart>
        </div>
    </div>
</template>
<script>
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'

import { parseTime } from '@common'

export default {
    props:["data"],
    computed:{
        options(){
            let data = []
            for(var i = 0; i < this.data.length; i++){
                let dataItemTemp = {value:0,name:""}
                dataItemTemp.value = this.data[i].time
                dataItemTemp.name = "第" + parseInt(this.data[i].clzId.replace(/[a-zA-Z]/g,'')) + "单元"
                data.push(dataItemTemp)
            }
            let polar = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} :<br/>{c}分钟 ({d}%)"
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        center:["center","center"],
                        radius:"60%",
                        data,
                        label:{
                            normal:{
                                fontSize:"12",
                            }
                        },
                    },
                ],
            }
            return polar
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.learning-time-ratio{
    background: #fff;
    .title{
        color:@blue1;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .ratio{
        width: 100%;
        overflow: auto;
        overflow-x:scroll;
        .echarts{
            min-width: 320px;
            width: 100%;
            height: 200px;
        }
    }
    
}
</style>
