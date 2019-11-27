<template>
    <div>
        <div class="noprogramme">
            <div class="main">
                <img src="@/assets/images/person_center/image/noprogramme.png" alt="">
                
                <div class="text">您还没有添加新方案，快去制作方案看看吧</div>
            </div>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
    .noprogramme
        height 298px
        display flex
        justify-content center
        align-items center
        .main
            img
                margin-left 46px
                margin-bottom 29px
                box-sizing border-box
            .text
                font-size 14px
                color #909399
</style>

<script>
export default {
    name:'noprogramme',
    data(){
        return {

        }
    }
}
</script>

