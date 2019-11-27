<template>
  <transition name="fade">
    <div class="back-top" @click="scrollToTop" v-show="toTopShow">
      <i style="display: block;width: 14px;margin: 0 auto 6px"><img src="@/assets/images/toTop@2x.png" alt=""></i>
      <p style="color: #fff">TOP</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ToTopScroll',
  data() {
    return {
      toTopShow: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll, true)
    })
  },
  destroyed() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    handleScroll() {
      const dom = document.documentElement
      this.scrollTop = dom.scrollTop
      if (this.scrollTop > 300) {
        this.toTopShow = true;
      } else {
        this.toTopShow = false;
      }
    },
    scrollToTop() {
      let timer = null
      const dom = document.documentElement
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (dom.scrollTop > 5000) {
          dom.scrollTop -= 1000
          timer = requestAnimationFrame(fn);
        } else if (dom.scrollTop > 1000 && dom.scrollTop <= 5000) {
          dom.scrollTop -= 500
          timer = requestAnimationFrame(fn);
        } else if (dom.scrollTop > 200 && dom.scrollTop <= 1000) {
          dom.scrollTop -= 100
          timer = requestAnimationFrame(fn);
        } else if (dom.scrollTop > 50 && dom.scrollTop <= 200) {
          dom.scrollTop -= 10
          timer = requestAnimationFrame(fn);
        } else if (dom.scrollTop <= 50 && dom.scrollTop !== 0) {
          dom.scrollTop = 0
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    },
  },
}
</script>

<style lang="stylus" scoped>
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s;
  .fade-enter, .fade-leave-to
    opacity: 0;
  .back-top
    width 28px
    text-align center
    margin 6px auto
    position fixed
    bottom 20px
    right 9px
    background: #000;
    .icon-xiala-copy
      font-size 20px
      color white
  .back-top:hover
    cursor pointer
</style>
