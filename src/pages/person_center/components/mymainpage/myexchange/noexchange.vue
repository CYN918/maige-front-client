<template>
    <div>
        <div class="noprogramme">
            <div class="main">
                <img src="@/assets/images/person_center/image/noexchange.png" alt="">
                <div class="text">您暂时没有兑换</div>
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
                margin-bottom 29px
                box-sizing border-box
            .text
                font-size 14px
                color #909399
                text-align center
</style>

<script>
export default {
    name:'noexchange',
    data(){
        return {

        }
    }
}
</script>

