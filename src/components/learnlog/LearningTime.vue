<template>
    <div class="learn-curve">
        <div class="title">{{data.time}} 学习时长</div>
        <p class="summary">{{grade}}</p>
        <chart :options="options" height=""></chart>
    </div>
</template>
<script>
import 'echarts/lib/chart/bar'

import { parseTime } from '@common'

export default {
    props:["data"],
    computed:{
        options(){
            let DataTmep = this.data
            if(!DataTmep){
                DataTmep = {}
            }
            let AppUsingNum = [
                    {
                        value:DataTmep.studyTime,
                        itemStyle:{
                            normal:{
                                color:'#ff7f3d',
                            }
                        },
                        label:{
                            normal:{
                                color:"#ff7f3d"
                            }
                        },
                    }, 
                    {
                        value:DataTmep.studyMaxTime,
                        itemStyle:{
                            normal:{
                                color:'#ffb700',
                            }
                        },
                         label:{
                            normal:{
                                color:"#ffb700"
                            }
                        },
                    },
                    {
                        value:DataTmep.studyAvgTime,
                        itemStyle:{
                            normal:{
                                color:'#13b5b1',
                            }
                        },
                         label:{
                            normal:{
                                color:"#13b5b1"
                            }
                        },
                    }
                ]
            let polar = {
                grid:{
                    bottom:'15%',
                    x:"0",
                    width:'100%',
                    height:'74%',
                },
                xAxis: {
                    data: ["总时间","最长时间","平均时间"],
                    axisLine:{
                        lineStyle:{
                            color:"#ccc"
                        }
                    },
                    axisTick:{
                        show:false
                    }
                },
                yAxis: {
                    show:false,
                },
                textStyle:{
                    color:"#979797",
                    fontSize:"14"
                },
                series: [
                    {
                        name: '宝宝学习时长',
                        type: 'bar',
                        symbolSize:6,
                        hoverAnimation:false,
                        barWidth:"30",
                        label:{
                            normal:{
                                show:true,
                                position:'top',
                                distance :2,
                                fontSize:'13',
                                formatter:'{c}min'
                            }
                        },
                        data:AppUsingNum,
                    },
                ],
            }
            return polar
        },
        grade(){
            let time = this.data.studyTime
            if(!time){
                return "小朋友，今天的学习之旅，你还没有迈开步哦，加把劲走起！"
            }
            if(time <= 5){
                return "小朋友，今天的学习之旅，你还没有迈开步哦，加把劲走起！"
            }else if(5 < time && time <=15){
                return "小朋友，学习就像品尝一块脆香米，你才咬掉一小口哦！"
            }else if(15 < time && time <=25){
                return "小朋友，还差一小步，你就圆满完成今天的学习任务了，继续学习吧！"
            }else if(25 < time && time <=30){
                return "小朋友，你完美的掌握了学习节奏，是管理时间的小能手！"
            }else{
                return "小朋友，虽然你爱学习，但更要劳逸结合，让自己休息休息再来学习吧！"
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.learn-curve{
    min-width: 280px;
    background: #fff;
    padding: 5px 0;
    box-sizing: border-box;
    .title{
        color:@blue1;
        font-size: 15px;
        font-weight: bold
    }
    .summary{
        width: 100%;
        font-size: 12px;
        color:@blue1;
        margin:2px 0 5px;
    }
    .echarts{
        width: 100%;
        height: 150px;
    }
}
</style>
