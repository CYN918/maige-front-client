<template>
    <div class="upload_success">
        <div class="upload_main">
            <div class="upload_header">
                上传配送清单
            </div>
            <div class="upload_body">
                <div class="image">
                    <img src="@/assets/images/shopping_cart/success.png" alt="">
                    <div class="text">上传成功</div>
                </div>
            </div>
            <div class="buttom">
                <el-button type="danger" size="mini" style="width:96px;height:36px;">取消</el-button>
                <el-button type="primary" size="mini" style="width:96px;height:36px;">确定</el-button>
            </div>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
    .upload_success
        position fixed
        width 100%
        height 100%
        left 0px
        top 0px
        background rgba(0,0,0,0.5)
        z-index 999
        .upload_main
            position absolute
            left 50%
            top 200px
            transform translateX(-50%)
            z-index 10
            background-color #EBF4FE
            width 882px
            height 582px
            .upload_header
                height 47px
                font-family MicrosoftYaHei
                color #333333
                font-size 16px
                line-height 47px
                margin-left 20px
            .upload_body
                width 841px
                height 473px
                background-color #fff
                margin 0 auto 
                display flex
                justify-content center
                .image
                    width 257px
                    height 212px
                    border  1px dashed #000
                    margin-top 98px
                    .text
                        font-weight Bold
                        color #7CADF2
                        font-size 18px
                        margin-top 28px
                        margin-left 98px
            .buttom
                display flex
                justify-content center
                margin-top 13px
</style>>
<script>
export default {
    data(){
        return {

        }
    }
}
</script>>