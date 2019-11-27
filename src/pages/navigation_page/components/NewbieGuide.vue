<template>
    <div class="inner">
        <div class="content">
            <div class="left_nav">
                 <ul class="left">
                    <router-link class="left_line" @click="handleLine(0)" :class="this.lineIndex==0?'active':''"  tag="li" :to='{path:"/"}' >
                        <i class="iconfont icon-zhinanzhen"></i>新手指南
                    </router-link>
                    <router-link class="left_line" @click="handleLine(1)" :class="this.lineIndex==1?'active':''"  tag="li" :to='{path:"Shipping"}'>
                        <i class="iconfont icon-peisong"></i>配送方式
                    </router-link>
                    <router-link class="left_line" @click="handleLine(2)" :class="this.lineIndex==2?'active':''"  tag="li" :to='{path:"PaymentMethod"}'>
                        <i class="iconfont icon-zhifu"></i>支付方式
                    </router-link>
                    <router-link class="left_line" @click="handleLine(3)" :class="this.lineIndex==3?'active':''"  tag="li" :to='{path:"AfterService"}'>  
                        <i class="iconfont icon-shouhou"></i>售后服务
                    </router-link>
                    <router-link class="left_line" @click="handleLine(4)" :class="this.lineIndex==4?'active':''"  tag="li" :to='{path:"AboutUs"}'> 
                        <i class="iconfont icon-guanyuwomen"></i>关于我们
                    </router-link>
                </ul>
            </div>
            <div class="right">
                <div class="right_title">
                    <h3><span class="slectStatus"></span>新手指南</h3>
                </div>
                <div class="right_nav">
                    <ul class="right_line">
                        <li  @click="handleRightLine(0,$event)" :class="this.rightIndex==0?'liActive':''">
                            <img  class="right_img" src="@/assets/images/navigation_page/img_03.jpg" alt=""/>
                            购物流程
                        </li>
                 <!--        <li @click="handleRightLine(1,$event)" :class="this.rightIndex==1?'liActive':''">
                            <img  class="right_img" src="@/assets/images/navigation_page/img_05.jpg" alt=""/>
                            账户注册
                        </li> -->
                        <li @click="handleRightLine(1,$event)" :class="this.rightIndex==1?'liActive':''">
                            <img  class="right_img" src="@/assets/images/navigation_page/img_07.jpg" alt=""/>
                            找回密码
                        </li>
                        <li @click="handleRightLine(2,$event)" :class="this.rightIndex==2?'liActive':''">
                            <img  class="right_img" src="@/assets/images/navigation_page/img_09.jpg" alt=""/>
                            注册问题
                        </li>
                        <li @click="handleRightLine(3,$event)" :class="this.rightIndex==3?'liActive':''">
                            <img  class="right_img" src="@/assets/images/navigation_page/img_11.jpg" alt=""/>
                            礼品卡使用
                        </li>
                       <!--  <li @click="handleRightLine(5,$event)" :class="this.rightIndex==5?'liActive':''"
                        style="margin-right:0">
                            <img  class="right_img" src="@/assets/images/navigation_page/img_13.jpg" alt=""/>
                            礼品卡兑换
                        </li> -->
                     
                    </ul>
                </div>
                <div class="right_content">
                    
                    <div class="right_bottom">
                        <ul class="right_message">
                            <li class="line_message" v-for="(item,index) in list" :key="index" v-html="item.content">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { bottomNavJunk } from '@/api/index'
export default {
    name: 'newbie_Guide',
    data(){
        return {
            categoryName:'新手指南',
            lineIndex:0,
            rightIndex:0,
            
            lineName:"",
            
            listLine:[
                "购物流程","账户注册","找回密码","注册问题","礼品卡使用","礼品卡兑换"
            ],
            list:[]
        }   
    },
    created(){
        this.getdata()
        this.bottomNavJunk()
        
    },
    methods:{
        handleLine(index){
            this.lineIndex = index;
            
           
        },
        handleRightLine(index,event){
            this.rightIndex = index
            this.lineName= event.currentTarget.innerText.replace(/(^\s*)|(\s*$)/g, "")
            console.log(this.lineName);
            
            this.bottomNavJunk()
        },
        getdata(){
            this.rightIndex =window.location.search.replace(/[^0-9]+/g, '')
            this.lineName = this.listLine[window.location.search.replace(/[^0-9]+/g, '')]           
        },
        async bottomNavJunk() {
            const res = await bottomNavJunk(this.lineName)
                
                this.list = res.data
                console.log(this.list);
                
            
        },

    }
}
</script>

<style lang="stylus" scoped>
    .inner
        background #F7FAFF
        
        .content
            margin 0 auto
            width 1200px
            display flex
            padding-top 43px
            .left_nav
                
                .left
                    background #fff
                    min-height 841px
                    .left_line
                        width 106px
                        height 54px
                        cursor pointer
                        font-size 14px
                        line-height 54px
                        padding 0 8px 0 8px
                        box-sizing border-box
                        color #555555
                        .iconfont
                            position relative
                            left -3px
                            top 1px
                .active 
                    background #4C86F4
                    color #fff!important
            .right_title    
                width 1076px
                height 53px
                background #ffffff
                border 1px solid #D7E0F1
                margin-left 21px
                box-sizing border-box
                line-height 53px
                margin-bottom 20px
                h3
                    font-size 18px
                    color #606060
                    padding-left 22px
                    position relative
                    .slectStatus
                        display block
                        position absolute
                        top 16px
                        left 0
                        width 4px
                        height 22px
                        background #4C86F4
            .right_nav
                width 1076px
                margin-left 21px
                box-sizing border-box
                line-height 86px
                .right_line
                        display flex
                        justify-content flex-start
                        li 
                            margin-right 18.4px
                            width 200px
                            height 86px
                            background #fff
                            text-align center
                            font-size  14px
                            color #333333
                            cursor pointer
                            .right_img
                                margin-top -15px
                        .liActive
                            height 112px
                            font-size 16px
                            color #508df4
            .right_content  
                width 1076px
                margin-left 21px
                box-sizing border-box
                background #ffffff
                padding-left 26px
                padding-bottom: 20px
                padding-top:42px
                min-height 656px
                .right_junk
                    line-height 68px
                    height 68px
                    .junk_content
                        color #777777
                        font-size 14px
                        margin-right 40px
                        maring-left 10px
                        cursor pointer
            .right_bottom
                width 954px
                min-height  284px
                border 1px solid #D7E0F1
                padding-left 48px
                padding-bottom: 20px
                padding-top:20px
                .right_message
                    .line_message
                      
                        color #666666
                        font-size 14px
                        line-height:32px
                        cursor pointer
</style>
