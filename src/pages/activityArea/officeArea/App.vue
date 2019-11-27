<template>
    <div>
        <TopNav/>
        <Header/>
        <BannerNav/>
        <OfficeContent/>
    </div>
</template>
<script>
import TopNav from '../../common/TopNav'
import Header from '../../common/Header'
import BannerNav from './components/bannerNav'
import OfficeContent from "./components/officeContent"
export default {
    components:{
        Header,
        BannerNav,
        OfficeContent,
        TopNav
    }
}
</script>>
<style lang="stylus" scoped>

</style>