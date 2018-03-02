<template>
    <div class="learnlog-tabs" v-if="isShow">
        <div class="class" v-for="(val,index) in Type" @click="SelectType(index)">
            <span :class="{selected:val.select,disabled:!val.isOpen}">
                {{val.name}}
            </span>
            <i class="line"></i>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import { logoutMessage } from "@common"
import { TabsTypeList } from "@js/learnlog/index.js"


export default {
    data(){
        return {
            isShow:true
        }
    },
    props:(["data"]),
    computed:{
        ...mapState(["classId"]),
        TypeList(){
            return TabsTypeList
        },
        Type(){
            return this.GetType()
        },
    },
    methods:{
        ...mapMutations(["setClassType","setClassId","setLearnlogCurrentClassName"]),
        SelectType(index){
            if(!this.Type.length){
                return;
            }
            if(!this.Type[index].isOpen){
                logoutMessage("该课程还未学习")
                return;
            }
            this.isShow = false
            for(var i = 0; i < this.Type.length; i++){
                this.Type[i].select = false
            }
            this.Type[index].select = true
            this.isShow = true
            this.setClassType(this.Type[index].classTypeList)
            this.setClassId(this.Type[index].classId)
            this.setLearnlogCurrentClassName(this.Type[index].name)
            this.$emit("GetType",this.Type[index])
        },
        GetType(){
            let DataList = this.data.allUserClassCount
            if(!DataList){
                return []
            }
            let list1 = []
            let list2 = []
            for(var i = 0; i < this.TypeList.length; i++){
                let className = this.TypeList[i].type
                for(var j = 0; j < DataList.length; j++){
                    if(className == DataList[j].studyClassVO.className){
                        this.TypeList[i].isOpen = DataList[j].studyClassVO.isStudy
                        if(this.TypeList[i].isOpen){
                            list1.push(this.TypeList[i])
                        }else{
                            list2.push(this.TypeList[i])
                        }
                    }
                }
            }
            return  list1.concat(list2)
        },
        GetCurrentIndex(){
            for(var i = 0; i < this.Type.length; i++){
                if(this.classId ==  this.Type[i].classId){
                    return i
                }
            }
            return 0;
        }
    },
    watch:{
        data(){
            this.SelectType(this.GetCurrentIndex())
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/main.less';
.learnlog-tabs{
    display: flex;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 5px 0px @darkGray;
    height: 34px;
    .class{
        width: 20%;
        text-align: center;
        line-height: 34px;
        position: relative;
        .line{
            position: absolute;
            width: 1px;
            height: 40%;
            background: @darkGray;
            right: 0;
            top:50%;
            transform: translateY(-50%);
        }
        span{
            color:@blue;
        }
        .selected{
            padding:3px 6px;
            background: @darkOrange;
            box-sizing: border-box;
            color: @lightGray;
            border-radius: 5px;
        }
        .disabled{
            color:@darkerGray;
        }
    }
}
</style>
