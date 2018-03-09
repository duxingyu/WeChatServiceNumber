<template>  
    <transition name="slideTop">
        <div id="bind-phone" v-show="bindPageShow">
            <topTitle title="绑定手机">
                <img v-show="!bindPageBackHide" class="back" src="../assets/images/shop/ic_back.png" @click="back">
            </topTitle>
            <div class="form center">
                <div class="phone input">
                    <img src="../assets/images/shop/ic_default_0.png" alt="" class="icon">
                    <input class="form-input" type="number" placeholder="请输入手机号" v-model='phone'
                        autocomplete="off" name="phone" @focus="focus(0,$event)" @blur="blur(0,$event)">
                </div>
                <div class="code input">
                    <img src="../assets/images/shop/ic_default_1.png" alt="" class="icon">
                    <input class="form-input" type="number" placeholder="请输入验证码" v-model='code'
                        autocomplete="off" name="code" @focus="focus(1,$event)"  @blur="blur(1,$event)">
                    <span class="send_code" @click="sendCode">{{codeState}}</span>
                </div>
                <!-- <div class="password input">
                    <img src="../assets/images/shop/ic_default_2.png" alt="" class="icon">
                    <input class="form-input" type="password" placeholder="密码仅支持6-16英文或数字" v-model='password' 
                        autocomplete="off" name="password" @focus="focus(2,$event)" @blur="blur(2,$event)">
                </div> -->
                <button class="button" @click='register'>绑定</button>
            </div>
            <Loading type="1" v-if="loadingShow"></Loading>  
        </div>
    </transition>
</template>
<script>
import TopTitle from '@components/shop/TopTitle'
import Loading from '@components/Loading'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import { yanzhen } from '@common'
import { logoutMessage } from '@common'
import { getCode } from '@interface'
import { register } from '@interface'

export default {
    data(){
        return{
            phone:'',
            code:'',
            codeState:'发送验证码',
            codeSecodes:60,
            codeKaig:true,
            password:'',
            loadingShow:''
        }
    },
    props:{
        backHide:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        ...mapState(['userOpenId','user',
        'bindPageShow','bindPageBackHide'])
    },
    components:{
        "topTitle":TopTitle,Loading
    },
    methods:{
        ...mapMutations(['setUserInfo','setBindPageShow']),
        back(){
            this.setBindPageShow(false)
        },
        focus(index,self){
           self.target.placeholder = ''
           self.target.style.color = '#ffa800'
           self.target.parentNode.style.borderColor = "#ffa800"
           self.target.previousSibling.previousSibling.src = require('../assets/images/shop/ic_input_'+index+'.png')
        },
        blur(index,self){
            let  placeholderArr = [
                '请输入手机号',
                '请输入验证码',
                '密码仅支持6-16英文或数字'
            ]
           if(!self.target.value){
                self.target.placeholder = placeholderArr[index]
                self.target.style.color = ''
                self.target.parentNode.style.borderColor = ""
                self.target.previousSibling.previousSibling.src = require('../assets/images/shop/ic_default_'+index+'.png')
            } 
        },
        sendCode(){
            if(yanzhen('phone',this.phone) && this.codeKaig){
                this.codeKaig = false
                this.codeState = '60s'
                let _this = this
                let timer = setInterval(function(){
                    _this.codeState = _this.codeSecodes-- + 's'
                    if(_this.codeSecodes == 0){
                        _this.codeSecodes = 60
                        _this.codeKaig = true
                        _this.codeState = '发送验证码'
                        clearInterval(timer)
                    }
                },1000)
                this.loadingShow = true
                getCode(this.phone).then(res =>{
                    this.loadingShow = false
                    if(res.result != 1){
                        clearInterval(timer)
                        this.codeSecodes = 60
                        this.codeKaig = true
                        this.codeState = '发送验证码'
                    }
                })
            }
        },
        register(){
            if(yanzhen('phone',this.phone) &&
            yanzhen('code',this.code)){
                this.loadingShow = true
                register({
                    openId:this.userOpenId,
                    phone:this.phone,
                    code:this.code,
                    password:this.password
                }).then(res =>{
                    this.loadingShow = false
                    if(res.result == 1){
                        if(res.password){
                            alert("默认密码:\n" + res.password)
                        }else{
                            logoutMessage("绑定成功!")
                        }
                        this.setUserInfo({
                            isLogin:true,
                            uid:res.uid,
                            token:res.token,
                            alias:res.alias,
                            phone:res.phone,
                            birthday:res.birthday,
                            wxAlias:res.alias,
                            wxHeadImg:res.wxUserInfo.headImg,
                            address:res.address
                        })
                        this.setBindPageShow(false)
                        
                    }else{
                        logoutMessage(res.description)
                    }
                })
            }
        },
        mounted(){
            console.log(this.$route.path)
        }
    }
}
</script>
<style lang="less" scoped>
    @import '../assets/css/main.less';
    #bind-phone{
        width: 100%;
        background-color: @lightGray;
        background-image: url('../assets/images/shop/pic_register.png');
        background-repeat: no-repeat;
        background-position: center bottom;
        background-size: 98%;
        display: block;
        position: fixed;
        top:0;left:0;
        min-height: 100%;
        z-index: 999;
    }
    .back{
        width: 30px;
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translateY(-50%) rotate(-90deg);
    }
    .form{
        position: absolute;
        left: 50%;
        top:40%;
        transform: translate(-50%,-50%);
        width: 80%;
    }
    .form .input{
        display: flex;
        align-items: center;
        padding: 0 5px 5px;
        margin-bottom: 20px;
        border-bottom: 1px solid #949494;
        box-sizing: border-box;
    }
    .form .input input{
        width: 100%;
        border: 0;
        outline: 0;
        color: #949494;
        background-color: rgba(0,0,0,0)
    }
    .form .input .send_code{
        display: block;
        padding:0 5px;
        height: 25px;
        border-radius: 5px;
        text-align: center;
        line-height: 25px;
        white-space: nowrap;
        font-size: 10px;
        background: #ffa800;
        color: #fff
    }
    .form .icon{
        display: block;
        margin-right: 10px;
        width: 15px;
    }

    .button{
        display: block;
        width: 80%;
        margin: 0 auto;
        background:#ffa800;
        border:0;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        color: #fff;
        outline: 0;
        text-align: center;
    }
</style>


