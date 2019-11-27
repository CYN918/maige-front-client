<template>
  <div class="box" id="box-veil">
    <!-- <detail-left :data='Detail'></detail-left> -->
    <detail-middle :data='Detail' :skuList ='skuList' @getShoppingCartNum="getShoppingCartNum"></detail-middle>
  </div>
</template>

<script>
import DetailMiddle from './detail/DetailMiddle'

export default {
  name: 'Detail',
  props: ['Detail','skuList'],
  data() {
    return {
      proDetail: [],
    }
  },
  methods: {
    getShoppingCartNum() {
      this.$emit('getShoppingCartNum')
    },
  },
  components: {
    DetailMiddle,
  },
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .box
    background white
    display flex
    padding 0 20px
    background white
    autoMargin()
    box-sizing border-box
    margin-bottom 36px
    padding-top:30px;
</style>
