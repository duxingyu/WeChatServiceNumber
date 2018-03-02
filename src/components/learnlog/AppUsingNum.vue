<template>
    <div class="learn-curve">
        <div class="title">麦田课程当前使用人数</div>
        <div class="legend">
            <div class="using">
                <i></i>
                <span>宝宝已使用</span>
            </div>
            <div class="unuse">
                <i></i>
                <span>宝宝未使用</span>
            </div>
        </div>
        <chart :options="options" height=""></chart>
    </div>
</template>
<script>
import 'echarts/lib/chart/bar'

import { AppUsingNum } from "@js/learnlog/index.js"

export default {
    props:(["data"]),
    computed:{
        options(){
            let UnusedStyle = {
                itemStyle:{
                    normal:{
                        color:'#ddd',
                    }
                },
                label:{
                    normal:{
                        color:'#979797'
                    }
                },
            }
            let data1 =  []
            let data2 = []
            let list = this.data.allUserClassCount?this.data.allUserClassCount:[]
            for(var i = 0; i < list.length; i++){
                let ClassTemp = list[i].studyClassVO
                data1.push(AppUsingNum[ClassTemp.className].name)
                let ObjTemp = {value:0}
                ObjTemp.value = Math.ceil(ClassTemp.studyUserCount / 1000)/10
                if(!ClassTemp.isStudy){
                    ObjTemp = Object.assign(ObjTemp,UnusedStyle)
                }
                data2.push(ObjTemp)
            }
            let polar = {
                grid:{
                    bottom:'15%',
                    x:'5%',
                    width:'90%',
                    height:'74%',
                },
                xAxis: {
                    data:data1,
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
                        name: '宝宝学习成绩',
                        type: 'bar',
                        symbolSize:6,
                        hoverAnimation:false,
                        barWidth:"26",
                        label:{
                            normal:{
                                show:true,
                                position:'top',
                                distance :2,
                                fontSize:'13',
                                formatter:'{c}万',
                                color:'#13b5b1'
                            }
                        },
                        itemStyle:{
                            normal:{
                                color:'#13b5b1',
                            }
                        },
                        data:data2,
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
.learn-curve{
    background: #fff;
    padding: 18px 0 10px;
    border-radius: 8px;
    box-shadow: 0 0 5px 0px @darkGray;
    .title{
        text-align: center;
        font-size: 19px;
        color:@blue1;
        font-weight: bold;
    }
    .legend{
        display: flex;
        justify-content: center;
        margin:5px 0 12px;
        &>div{
            margin:0 5px;
            font-size: 12px;
            i{
                display: inline-block;
                width: 20px;
                height: 10px;
                border-radius:10px;
            }
        }
        .using{
            color:@green1;
            i{
                background: @green1;
            }
        }
        .unuse{
            color:@darkerGray;
            i{
                background: @darkGray;
            }
        }
    }
    .echarts{
        width: 100%;
        height: 150px;
    }
}
</style>
