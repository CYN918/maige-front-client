<template>
    <div>
        <div class="myordersub">
            <div class="order_header">
                <span></span>
                <div class="center">我的订单</div>
            </div>
            <myordertable></myordertable>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
    .myordersub
        background-color #fff
        margin-top 20px
        padding-bottom 30px
        .order_header
            padding-top 27px
            span 
                display inline-block
                width 4px
                height 18px
                background-color #4A99FA
            .center
                display inline-block
                vertical-align top
                color #3C3C3C
                font-size 16px
                margin-left 18px
                font-family MicrosoftYaHei
</style>

<script>
import Myordertable from './myordertable'
export default {
    name:'myordersub',
    components: {
        Myordertable
    },
    data() {
        return {

        }
    }
}
</script>

