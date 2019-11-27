<template>
    <div>
        <div class="myprogramme">
            <div class="order_header">
                <span></span>
                <div class="center">我的方案</div>
                <a href="#" class="make_programme">
                    方案制作>
                </a>
            </div>
            <noprogramme></noprogramme>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
    .myprogramme
        background-color #fff
        margin-top 20px
        .order_header
            position relative
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
            .make_programme
                font-family MicrosoftYaHei
                color #4B99FB
                font-size 16px
                position absolute
                right 62px
                top 27px
</style>

<script>
import Noprogramme from './noprogramme'
export default {
    name:'myprogramme',
    components: {
        Noprogramme
    },
    data(){
        return {

        }
    }
}
</script>

