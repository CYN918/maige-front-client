<template>
  <div class="top-nav" :style="{background:content.color||bgolor}" v-if="componentStatuTopNav&&componentStatuTopNav.componentStatus==0">
    <div style="display: flex;width: 109px;justify-content: space-around;position: absolute;left: 300px">
      <a v-if="showPosition" href="javasrcipt:;" class="location" @mouseenter="getZoom" @mouseleave="block1 = false">
        <span class="cityName" :title="location"><i class="el-icon-location"></i>{{location}}</span>
        <div class="city_wrap" ref="city" @mouseenter="block2 = true" @mouseleave="block2 = false">
          <ul class="chose-title">
            <li @click="title_index = 0" :class="{title:true, title_selected:title_index===0}" data-title_index='0'>省份</li>
            <li @click="title_index = 1" :class="{title:true, title_selected:title_index===1}" data-title_index='1' v-if="cities.length">城市</li>
          </ul>
          <div class="cities">
            <ul class="city_list" v-show="title_index===0">
              <li :class="{city_item: true, city_selected: province_index===index}"
                  v-for="(item, index) in provinces" :key="item.regionId"
                  :title="item.regionName"
                  @click="toChoseCity(item.regionId,index, item.regionName)"
              >
                {{item.regionName}}
              </li>
            </ul>
            <ul class="city_list" v-show="cities.length && title_index===1">
              <li :class="{city_item: true, city_selected: city_index===index}"
                  v-for="(city, index) in cities" :key="city.regionId"
                  :title="city.regionName"
                  @click="ChoseCity(index, city.regionName)"
              >
                {{city.regionName}}
              </li>
            </ul>
          </div>
        </div>
      </a>
      <p> <a class="link-word" href="index.html" style="color:#4C86F4;font-weight: bold;vertical-align: middle">首页</a></p>
    </div>
    <div style="display: flex">
      <p v-for="(item,index) in tableData" :key="index" style="display: inline">
        <i class="line" style="margin: 0 7px" v-if="index==0"></i>
          <a class="link-word" :href=item.classifiedLink style="vertical-align: middle">
            <img :src=item.imgUrl alt="" class="imgUrl">
            <span style="vertical-align: middle"> {{item.categoryName}}</span>
          </a>
        <i class="line" style="margin: 0 7px"></i>
      </p>
    </div>
     <div v-if="false">
       <a class="link-word" href="index.html" style="color:#4C86F4;font-weight: bold">首页</a><i class="line"></i>
       <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/qiye@2x.png" alt=""></i>企业集采</a><i class="line"></i>
       <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/jifen@2x.png" alt=""></i>积分商城</a><i class="line"></i>
       <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/bangong@2x.png" alt=""></i>办公用品</a><i class="line"></i>
       <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/jingdong@2x.png" alt=""></i>京东商城</a><i class="line"></i>
       <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/suning@2x.png" alt=""></i>苏宁易购</a><i class="line"></i>
       <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/yanxuan 65@2x.png" alt=""></i>网易严选</a><i class="line"></i>
       <a class="link-word" href="">关于我们</a><i class="line"></i>
     </div>
    <div class="login-wrap" v-if="!isLogin">
      <a class="text-word" href="">您好，欢迎您来到{{title}}！</a>
      <a class="link-word"  @click="showLoginPop">
        <i class="iconfont icon-gerenzhongxin1"></i>
        请登录
      </a><i class="line"></i>
      <a class="link-word" href="login.html#/register">
        免费注册
      </a>
    </div>
    <div class="login-wrap" v-else>
      <a class="text-word" href="">您好，欢迎您来到{{title}}！</a>
      <a href="person_center.html" class="link-word" >
        {{username}}
      </a>
      <a @click="handleLogout">
        退出
      </a>
    </div>
    <el-dialog
      title="请登录"
      :visible.sync="dialogVisible"
      width="720px"
      :before-close="handleClose">
      <div class="login-form">
        <div class="toggle-login" @click="toggleLogin">
          <span :class="{'active':slide}">手机号登录</span>
          <span :class="{'active':!slide}">员工登录</span>
        </div>
        <form action1="" v-show="!slide" ref="account_login">
          <div class="row" >
            <i class="iconfont icon-zhanghao"></i>
            <input type="text" v-model="employeeName" placeholder="请输入员工姓名~" name="employeeName"
                   @keyup="showClear1">
            <div class="logintip" v-show="showEmployeeNameTip">
              <i class="iconfont icon-iconfontxiaogantanhao"></i>
              <span  v-text="employeeNameTip"></span>
            </div>
            <i style="font-size: 14px;" class="clear iconfont icon-qingchu" @click="clearEmployeeName" v-show="showClearEmployeeName"></i>
          </div>
          <div class="row">
            <i class="iconfont icon-gonghao"></i>
            <input type="text"  v-model="employeeSn" placeholder="请输入员工工号~" name="employeeSn">
            <div class="logintip" v-show="showEmployeeSnTip">
              <i class="iconfont icon-iconfontxiaogantanhao"></i>
              <span  v-text="employeeSnTip"></span>
            </div>
            <i style="font-size: 14px;" class="clear iconfont icon-qingchu" @click="clearEmployeeSn" v-show="showClearEmployeeSn"></i>
          </div>
          <div class="row">
            <i class="iconfont icon-mima"></i>
            <input type="password" ref="password"  v-model="password" placeholder="请输入登录密码~" name="password"
                   @keyup.enter="reqLogin(2)">
            <i class="iconfont icon-xianshimima" v-show="showIndex2===true" @click="showPassword2"></i>
            <i class="iconfont icon-yincangmima" v-show="showIndex2===false" @click="hiddenPassword2"></i>
            <div class="logintip" v-show="showPasswordTip">
              <i class="iconfont icon-iconfontxiaogantanhao"></i>
              <span  v-text="passwordTip"></span>
            </div>
          </div>
          <div class="btn-wrap">
            <input class="my-btn" type="button" value="马上登录" @click="reqLogin(2)">
          </div>
          <div class="bottom">
            <a href="login.html#/foundCode">忘记密码</a>
            <a href="login.html#/register">注册</a>
          </div>
        </form>
        <form action2="" v-show="slide" ref="phone_login">
          <div class="row">
            <i class="iconfont icon-shouji"></i>
            <input type="text"  v-model="phoneNum" placeholder="请输入手机号码~">
            <div class="logintip" v-if="showPhoneNumTip">
              <i class="iconfont icon-iconfontxiaogantanhao"></i>
              <span  v-text="phoneNumTip"></span>
            </div>
          </div>
          <div class="row" v-if="isLoginByVC">
            <i class="iconfont icon-yanzhengma"></i>
            <input  @keyup.enter="reqLogin(1)" type="text" v-model="verification" placeholder="请输入验证码~">
            <div class="logintip" v-show="showVerificationTip">
              <i class="iconfont icon-iconfontxiaogantanhao"></i>
              <span  v-text="verificationTip"></span>
            </div>
            <div style="position:absolute; color: #999;top: 77px;left: 2px;" v-if="isSendVC">
              <i style="font-size:18px" class="iconfont icon-iconfontxiaogantanhao"></i>
              <span style="position: relative;left: -26px;top: -2px;margin-left: 0;">验证码已发送，120秒内输入有效</span>
            </div>
            <el-button v-if="!isSendVC" type="text" @click="getVerificationCode" style="margin-left: 70px;border: 1px solid;padding: 8px;">
              <span style="margin-left: 0" v-if="!isSendVC">获取验证码</span>
            </el-button>
            <el-button v-else type="text" style="margin-left: 70px;border: 1px solid;padding: 8px;">
              <span style="margin-left: 0">{{seconds}}s后重新获取</span>
            </el-button>
          </div>
          <div class="row" v-else>
            <i class="iconfont icon-mima"></i>
            <input type="password" ref="password2"  v-model="password2" placeholder="请输入登录密码~" name="password2"
                   @keyup.enter="reqLogin(1)">
            <i class="iconfont icon-xianshimima" v-show="showIndex3===true" @click="showPassword3"></i>
            <i class="iconfont icon-yincangmima" v-show="showIndex3===false" @click="hiddenPassword3"></i>
            <div class="logintip" v-show="showCodeTip">
              <i class="iconfont icon-iconfontxiaogantanhao"></i>
              <span  v-text="codeTip"></span>
            </div>
          </div>
          <div class="btn-wrap" style="margin-top: 48px">
            <input class="my-btn" type="button" value="马上登录" @click="reqLogin(1)">
          </div>
          <div class="bottom">
            <a v-if="isLoginByVC" @click="toLoginByCode">密码登录</a>
            <a v-else @click="toLoginByVC">短信快捷登录</a>
            <a class="middle" href="login.html#/foundCode">忘记密码</a>
            <a href="login.html#/register">注册</a>
          </div>
        </form>
      </div>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
    <div class="user_save">
      <el-dialog
        title="提示"
        :visible.sync="userSave"
        width="450px"
        :before-close="handleClose">
        <span>是否保存用户信息？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="userSavefunc(false)" size="small" type="danger">取 消</el-button>
          <el-button type="primary" @click="userSavefunc(true)" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import getCurrentCityName from '@/assets/utils/location'
  import { reqSystemConfig, logout, goLogin, getVerificationCode, getSmsSendTime, reqAddressCascader } from '@/api/index'
  import { handleCrypt, getCookie, setCookie, delCookie } from '@/assets/utils/utils'
  import PubSub from 'pubsub-js'
  import { SHOW_LOGINPOP } from '@/assets/utils/pubsubEvent'

  export default {
    name: 'TopNav',
    props:['componentStatus'],
    data() {
      return {
        showPosition: true, // 显示地址
        bgolor:'#f9fbff',
        title:'',
        componentStatuTopNav:'',
        provinceName: '',
        block1: false,
        block2: false,
        title_index: null,
        province_index: 0,
        city_index: 0,
        subdivide_index: 0,
        district_index: 0,
        city_selected: false,
        selected: false,
        provinces: [], // 省
        cities: [], // 市
        location: '定位中...',
        codeTip: false, // 密码错误提示内容
        showCodeTip: false, // 显示密码错误提示
        verificationTip: false, // 验证码错误提示内容
        showVerificationTip: false, // 显示验证码错误提示
        showPhoneNumTip: false, // 显示手机号错误提示
        phoneNumTip: '', // 手机号错误提示内容
        showEmployeeSnTip: false, // 显示员工工号错误提示
        employeeSnTip: '', // 员工工号错误提示内容
        showEmployeeNameTip: false, // 显示员工姓名错误提示
        employeeNameTip: '', // 员工姓名错误提示内容
        showPasswordTip: '', // 密码错误提示
        passwordTip: '', // 密码错误提示内容
        showClearEmployeeSn: false, // 显示删除员工工号
        showClearEmployeeName: false, // 显示删除员工姓名
        isLoginByVC: true,
        isLogin: false,
        username: '',
        dialogVisible: false,
        userSave: false,
        // 登录相关
        isSendVC: false,
        seconds: 120,
        slide: true,
        phoneNum: '',
        employeeSn: '',
        employeeName: '',
        password: '',
        password2: '',
        verification: '',
        showLogin: true,
        token: '',
        index: 0,
        tip: '',
        icon: '&#xe621;',
        tipIndex: 0,
        loginIndex: 0,
        showIndex: 0,
        showIndex2: true,
        showIndex3: true,
        alldata: '',
        content:{},
        tableData:[]
      }
    },
    created() {
      PubSub.subscribe(SHOW_LOGINPOP, this.showLoginPop)
      const userData = getCookie('userData')
      const userInfo = userData && JSON.parse(userData)
      this.phoneNum = getCookie('userPhone')
      this.calculateTime()
      if (userInfo) {
        this.username = userInfo.userAccount
        this.isLogin = true
      }
      // const url = window.location.search
    },
    mounted() {
      this.getSystemConfig()
      this.componentStatuTopNav =  JSON.parse(window.localStorage.getItem('headerNav'))
      this.title = this.componentStatuTopNav.componentContents[0].title
      this.content =  JSON.parse(this.componentStatuTopNav.componentContents[0].content)||{}
      this.tableData = this.content.tableData.sort(this.compare('sortOrder'))
      if (sessionStorage.getItem('cityName')) {
        this.provinceName = sessionStorage.getItem('provinceName')
        this.location = sessionStorage.getItem('cityName')
      } else {
        this.getCurrentCity()
      }
    },
    beforeDestroy() {
      // 取消订阅事件
      PubSub.unsubscribe(SHOW_LOGINPOP)
    },
    watch: {
      block1(val) {
        if (val) {
          this.$refs.city.style.display = 'block'
        } else if (!this.block2) {
          this.$refs.city.style.display = 'none'
        }
      },
      block2(val) {
        if (val) {
          this.$refs.city.style.display = 'block'
        } else if (!this.block1) {
          this.$refs.city.style.display = 'none'
        }
      },
      isSendVC(newVal) {
        if (newVal) {
          const timer = setInterval(() => {
            this.seconds = this.seconds - 1
            if (this.seconds === 0) {
              clearInterval(timer)
              this.isSendVC = false
              this.seconds = 120
            }
          }, 1000)
        }
      },
      password2(newVal) { // 手机号登录密码输入
        this.password = newVal.replace(/^\s/g, '')
        if (!newVal.replace(/^\s/g, '')) {
          this.showCodeTip = true
          this.codeTip = '请输入密码'
        } else {
          this.showCodeTip = false
        }
      },
      phoneNum(newVal) { // 手机号输入变化
        if (newVal.length < 11 || newVal.length > 11 || !(/^1[3456789]\d{9}$/.test(newVal))) {
          this.showPhoneNumTip = true
          this.phoneNumTip = '手机号格式不正确'
        } else {
          this.showPhoneNumTip = false
        }
      },
      verification(newVal) { // 验证码输入变化
        this.verification = newVal.replace(/^\s/g, '')
        if (!newVal.replace(/^\s/g, '')) {
          this.showVerificationTip = true
          this.verificationTip = '请输入验证码'
        } else {
          this.showVerificationTip = false
        }
      },
      password(newVal) { // 登录密码输入
        this.password = newVal.replace(/^\s/g, '')
        if (!newVal.replace(/^\s/g, '')) {
          this.showPasswordTip = true
          this.passwordTip = '请输入密码'
        } else {
          this.showPasswordTip = false
        }
      },
      employeeName(newVal) { // 员工姓名输入变化
        this.employeeName = newVal.replace(/^\s/g, '')
        if (!newVal.replace(/^\s/g, '')) {
          this.showClearEmployeeName = false
          this.showEmployeeNameTip = true
          this.employeeNameTip = '请输入员工姓员'
        } else {
          this.showClearEmployeeName = true
          this.showEmployeeNameTip = false
        }
      },
      employeeSn(newVal) { // 员工工号输入变化
        this.employeeSn = newVal.replace(/^\s/g, '')
        if (!newVal.replace(/^\s/g, '')) {
          this.showClearEmployeeSn = false
          this.showEmployeeSnTip = true
          this.employeeSnTip = '请输入员工工号'
        } else {
          this.showClearEmployeeSn = true
          this.showEmployeeSnTip = false
        }
      },
    },
    methods: {
      // 获取系统配置，是否显示地址定位
      async getSystemConfig() {
        const res = await reqSystemConfig('sys_index_city_position')
        if (res.code === 200) {
          if (res.data.settingInfoList[0].key === 'open') {
            if (res.data.settingInfoList[0].checkValue === 'false') {
              this.showPosition = false
            } else {
              this.showPosition = true
            }
          } else if (res.data.settingInfoList[0].key === 'close') {
            if (res.data.settingInfoList[0].checkValue === 'true') {
              this.showPosition = false
            } else {
              this.showPosition = true
            }
          } else {
            this.showPosition = true
          }
        }
      },

      //排序
      compare(property){
        return function(a,b){
          let value1 = a[property];
          let value2 = b[property];
          return value1 - value2;
        }
      },

      // ###定位相关开始
      async initSelectedCityStyle(province, city) {
        // 定位省
        let selectedProvinceId = ''
        const res = await reqAddressCascader(1)
        if (res.code === 200) {
          this.provinces = res.data.list
          this.provinces.forEach((item, index) => {
            if (item.regionName === province) {
              this.province_index = index
              selectedProvinceId = item.regionId
            }
          })
        }
        console.log(selectedProvinceId)
        // 定位市
        const res2 = await reqAddressCascader(selectedProvinceId)
        if (res2.code === 200) {
          this.title_index = 1
          this.cities = res2.data.list
          this.cities.forEach((item, index) => {
            if (item.regionName === city) {
              this.city_index = index
            }
          })
        }
      },
      async getZoom() {
        this.block1 =true
        this.initSelectedCityStyle(this.provinceName, this.location)
      },
      getCurrentCity() {
        getCurrentCityName.init().then(BMap => {
          const geolocation = new BMap.Geolocation()
          var _this = this
          geolocation.getCurrentPosition(
            function getinfo(position) {
              let city = position.address.city
              let province = position.address.province
              city = city.replace('市', '')
              province = province.replace('省', '')
              console.log(city)
              console.log(province)
              sessionStorage.setItem('cityName', city)
              sessionStorage.setItem('provinceName', province)
              _this.location = city
              _this.provinceName = province
            },
            function (e) {
              _this.LocationCity  = '定位失败'
            },
            { provider: 'baidu' }
          )
        })
      },
      // 隐藏区域选择
      async toChoseCity(id, index, province) {
        const res = await reqAddressCascader(id)
        if (res.code === 200) {
          this.province_index = index
          this.cities = res.data.list
          this.title_index = 1
          sessionStorage.setItem('provinceName', province)
          this.provinceName = province
        }
      },
      // 选择城市
      ChoseCity(index, text) {
        this.city_index = index
        this.location = text
        this.$refs.city.style.display = 'none'
        this.block1 = false
        this.block2 = false
        sessionStorage.setItem('cityName', text)
      },

      // ###定位相关结束

      // 显示登录弹窗
      showLoginPop() {
        this.dialogVisible = true
      },
      // 关闭登录
      handleClose(done) {
        done()
      },
      // 是否保存用戶手机号
      userSavefunc(state) {
        if (state) {
          setCookie('userPhone', this.phoneNum, 7)
          this.loginAndLinkTo(this.alldata)
        } else {
          this.loginAndLinkTo(this.alldata)
        }
      },
      // 退出
      async handleLogout() {
        const userData = getCookie('userData')
        const userInfo = JSON.parse(userData)
        const token = userInfo.token
        try {
          await logout(token)
          delCookie('userData')
          window.location.reload()
        } catch (e) {
          delCookie('userData')
          window.location.reload()
        }
      },
      // 登录相关
      // 显示登录密码
      showPassword2() {
        this.$refs.password.type = 'text'
        this.showIndex2 = false
      },
      // 加密码登录密码
      hiddenPassword2() {
        this.$refs.password.type = 'password'
        this.showIndex2 = true
      },
      showPassword3() {
        this.$refs.password2.type = 'text'
        this.showIndex3 = false
      },
      // 加密码登录密码
      hiddenPassword3() {
        this.$refs.password2.type = 'password'
        this.showIndex3 = true
      },
      // 去到手机验证码登录
      toLoginByVC() {
        this.isLoginByVC = true
      },
      // 去到密码登录
      toLoginByCode() {
        this.isLoginByVC = false
      },
      // 计算倒计时
      async calculateTime() {
        if (sessionStorage.getItem('loginPhoneInPopup')) {
          this.phoneNum = sessionStorage.getItem('loginPhoneInPopup')
          const res = await getSmsSendTime(this.phoneNum)
          if (res.code === 200) {
            const currentTime = Date.parse(new Date(res.data.currentTime)) / 1000
            const sendTime = Date.parse(new Date(res.data.sendTime)) / 1000
            if (currentTime - sendTime < 120) {
              this.isSendVC = true
              this.seconds = 120 - currentTime + sendTime
            }
          }
        }
      },
      async getVerificationCode() {
        // 判断手机号是否为空
        if (!this.phoneNum) {
          this.phoneNumTip = '请输入手机号码'
          this.showPhoneNumTip = true
          // 判断手机号位数是否正确
        } else if (this.phoneNum.length < 11 || this.phoneNum.length > 11 || !(/^1[3456789]\d{9}$/.test(this.phoneNum))) {
          this.phoneNumTip = '手机号格式不正确'
          this.showPhoneNumTip = true
        } else if (this.phoneNum) {
          try {
            const res = await getVerificationCode(this.phoneNum);
            if (res.code === 200) {
              sessionStorage.setItem('loginPhoneInPopup', this.phoneNum)
              this.isSendVC = true;
              this.phoneNumTip = ''
              this.showPhoneNumTip = false
            } else {
              this.phoneNumTip = res.message;
              this.showPhoneNumTip = true;
            }
          } catch (e) {
            this.phoneNumTip = '操作频繁，请稍后重试';
            this.showPhoneNumTip = true;
          }
        }
      },
      toggleLogin() {
        this.slide = !this.slide
      },
      addByEnterKey1(e) {
        this.reqLogin(2);
      },
      addByEnterKey2(e) {
        this.reqLogin(1);
      },
      // 登录方式
      async reqLogin(loginMode) {
        const formData = new FormData()
        // 账号登录
        if (loginMode === 2) {
          if (!this.password.replace(/^\s/g, '')) {
            this.showPasswordTip = true
            this.passwordTip = '请输入密码'
          }
          if (!this.employeeSn.replace(/^\s/g, '')) {
            this.showEmployeeSnTip = true
            this.employeeSnTip = '请输入员工工号'
          }
          if (!this.employeeName.replace(/^\s/g, '')) {
            this.showEmployeeNameTip = true
            this.employeeNameTip = '请输入员工姓员'
          }
          if (!this.employeeName || !this.employeeSn || !this.password) {
            return
          }
          formData.append('employeeName', this.employeeName)
          formData.append('employeeSn', this.employeeSn)
          formData.append('password', handleCrypt.encrypt(this.password2))
          formData.append('loginMode', 2)
          // 判定信息是否为空
        } else if (loginMode === 1) {
          if (this.phoneNum.length < 11 || this.phoneNum.length > 11 || !(/^1[3456789]\d{9}$/.test(this.phoneNum))) {
            this.showPhoneNumTip = true
            this.phoneNumTip = '手机号格式不正确'
            return
          }
          if (this.isLoginByVC) {
            if (!this.verification) {
              this.showVerificationTip = true
              this.verificationTip = '请输入验证码'
              return
            }
            if (!(/^\d{6}$/.test(this.verification))) {
              this.showVerificationTip = true
              this.verificationTip = '验证码格式错误'
              return
            }
            // 验证码登录
            formData.append('loginMode', 1)
            formData.append('telephone', this.phoneNum)
            formData.append('captcha', this.verification)
          } else {
            if (!this.password.replace(/^\s/g, '')) {
              this.showCodeTip = true
              this.codeTip = '请输入密码'
              return
            }
            formData.append('loginMode', 0)
            formData.append('username', this.phoneNum)
            formData.append('password', handleCrypt.encrypt(this.password))
          }
        }
        const res = await goLogin(formData)
        if (res.code === 200) {
          const phone = getCookie('userPhone')
          if (phone !== this.phoneNum && loginMode === 1) {
            this.userSave = true
            this.alldata = res
            // this.$confirm('是否保存用户名？', '提示', {
            //   confirmButtonText: '是',
            //   cancelButtonText: '否',
            // }).then(() => {
            //   setCookie('userPhone', this.phoneNum, 7)
            //   this.loginAndLinkTo(res)
            // }).catch(() => {
            //   this.loginAndLinkTo(res)
            // })
          } else {
            this.loginAndLinkTo(res)
          }
        } else if (loginMode === 1) {
          if (res.message === '账户不存在，请先注册') {
            this.showPhoneNumTip = true
            this.phoneNumTip = res.message
          } else if (res.message === '验证码已失效, 请重新获取验证码') {
            this.showVerificationTip = true
            this.verificationTip = res.message
          } else if (res.message === '验证码不正确, 请重试') {
            this.showVerificationTip = true
            this.verificationTip = res.message
          } else if (res.message === '账户已锁定,请联系管理员') {
            this.showPhoneNumTip = true
            this.phoneNumTip = res.message
          } else if (res.message === '密码不正确!') {
            this.showCodeTip = true
            this.codeTip = res.message
          } else if (this.isLoginByVC) {
            this.showVerificationTip = true;
            this.verificationTip = res.message;
          } else {
            this.showCodeTip = true;
            this.codeTip = res.message;
          }
        } else if (res.message === '该员工不存在，请联系管理员') {
          this.showEmployeeNameTip = true
          this.employeeNameTip = res.message
        } else if (res.message === '密码不正确!') {
          this.showPasswordTip = true
          this.passwordTip = res.message
        } else if (res.message === '账户已锁定,请联系管理员') {
          this.showEmployeeNameTip = true
          this.employeeNameTip = res.message
        } else {
          this.showEmployeeNameTip = true
          this.employeeNameTip = res.message
        }
      },
      loginAndLinkTo(res) {
        setCookie('userData', JSON.stringify(res.data), 1)
        // 判断是否从详情页跳转过来
        window.location.reload()
      },
      // 清除员工姓名
      clearEmployeeName() {
        this.employeeName = ''
        this.showIndex = 0
      },
      // 清除员工工号
      clearEmployeeSn() {
        this.employeeSn = ''
        this.showIndex = 0
      },
      // 清除密码
      clearPassword() {
        this.password = ''
        this.showIndex = 0
      },
      // 按下键盘按键显示清除样式
      showClear1() {
        this.showIndex = 1
      },
      showClear2() {
        this.showIndex = 2
      },
      showClear3() {
        this.showIndex = 3
      },
    },
  }
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .location
    .cityName
      display inline-block
      width: 70px;
      ellipsis()
      color #409eff
      font-size: 14px;
  .city_wrap
    display none
    position absolute
    top 80px
    left 0px
    width 394px;
    min-height: 343px;
    padding 20px 6px 8px
    background rgba(255,255,255,1);
    border 1px solid rgba(204,204,204,1);
    z-index 109
    box-sizing border-box
    .chose-title
      display flex
      padding  0 12px
      border-bottom 2px solid #1E9FFF
      margin-bottom 15px
      .title
        width 67px;
        height 30px;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color #666
        line-height:30px;
        text-align center
        cursor pointer
      .title_selected
        background rgba(30,159,255,1);
        color #fff
    .city_list
      display flex
      flex-wrap wrap
      .city_item
        width:67px;
        height:26px;
        line-height 26px
        background:rgba(243,245,248,1);
        margin-bottom 12px
        margin-left 8px
        color #666
        text-align center
        cursor pointer
        ellipsis()
        font-size: 14px;
        padding: 0 6px;
        box-sizing: border-box;
      .city_selected
        background:rgba(30,159,255,1)
        color #fff
  .icon
    margin-right 6px
  .line
    display inline-block
    width:1px;
    height:13px;
    background:rgba(102,102,102,1);
  /deep/ .el-dialog__headerbtn{
    display: block;
    font-size: 24px;
  }
  a
    cursor pointer
  .top-nav
    min-width 1200px
    height 38px
    background #f9fbff
    display flex
    justify-content center
    align-items center
    color #e4e3e3
    font-size 24px
    padding 0 calc((100% - 1200px)/2)
    .link-word
      font-size 14px
      line-height 18px
      color #333
      .iconfont
        position relative
        top 1px
        display inline-block
        width 18px
        height 18px
        line-height 18px
        text-align center
        color #fff
        margin-right 6px
      .icon-jicai
        background #6a82ff
      .icon-jifen
        background #ffc550
      .icon-bangongyongpin
        background #42d4ff
    .login-wrap
      position absolute
      right 200px
      font-size 14px
      color #333
      .text-word
        color #999
        font-size 14px
        margin-right 20px
      .icon-gerenzhongxin1
        position relative
        top 2px
        color #ff4e7c
      .link-word
        font-size 14px
        line-height 18px
        color #333
        margin-right 6px
        cursor pointer
  ::-webkit-input-placeholder
    color #C3C3C3
  .login-form
    width 450px
    margin auto
    .title
      position relative
      display flex
      align-items center
      margin-bottom 46px
      .login-word
        position absolute
        left -14px
        top -30px
      .horizontal-stroke
        display inline-block
        width 5px
        height 23px
        background #4A99FA
        margin-right 6px
      .horizontal-stroke:nth-of-type(2)
        opacity 0.4
      .horizontal-stroke:nth-of-type(3)
        opacity 0.1
      span
        margin-left 8px
        font-size:24px;
        color:rgba(51,129,255,1);
    .toggle-login
      width 452px
      height 48px
      background rgba(247,250,255,1)
      border-radius 24px
      margin-bottom 46px
      span
        padding 0 35px
        display inline-block
        line-height 47px
        color #4C86F4
        cursor pointer
      .active
        height:47px;
        background:rgba(82,154,255,1);
        border-radius:24px;
        color #fff
    .row
      display flex
      align-items center
      width:431px;
      padding-bottom 18px
      background #fff
      border-bottom:1px solid rgba(223,231,242,1);
      margin-bottom 35px
      position relative
      .iconfont
        color #b6c1dc
        font-size 24px
        margin-right 32px
      .logintip
        position absolute
        bottom -20px
        left 2px
        color red
        text-align  left
        .icon-iconfontxiaogantanhao
          color red
          font-size 16px
      span
        margin-left -30px
    .btn-wrap
      .my-btn
        position relative
        width:448px;
        height:70px;
        background:linear-gradient(90deg,rgba(111,178,255,1),rgba(9,95,255,1));
        box-shadow:0px 7px 27px 0px rgba(50,129,255,0.51);
        border-radius:2px;
        font-size:30px;
        color #fff
        margin-bottom 20px
        cursor pointer
      .my-btn:active
        top 2px
    .bottom
      display flex
      justify-content space-between
      a
        color #999
        cursor pointer
      .middle
        margin-left 220px
.imgUrl
  margin 0 5px
  width 20px
  height 20px
  border-radius 50%
  vertical-align :middle
</style>
