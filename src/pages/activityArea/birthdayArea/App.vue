<template>
    <div>
      <top-nav></top-nav>
			<Header></Header>
      <BirthdayEvent/>
      <Footer></Footer>
    </div>
</template>

<script>
// 折扣专区
import TopNav from '../../common/TopNav'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import BirthdayEvent from './birthdayEvent.vue'
export default {
  name: 'App',
  components: {
    TopNav,
    Header,
		Footer,
		BirthdayEvent
  },
  methods:{
    //获取当前登录者 的信息
    getCookie(cname){
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++)
      {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
      }
      return "";
    },
  },
  created(){
    let  cookie_val = this.getCookie('userData');
    const gifterUserId =JSON.parse(cookie_val)
    this.$store.commit('handelegifterUserId',gifterUserId)
  },

}
</script>

<style lang="stylus" scoped>

</style>
