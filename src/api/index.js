import ajax from './ajax'

// const BASE_URL = 'http://www.maige.com'
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://www.maige.com'
} else {
  BASE_URL = `http://${location.hostname}`
}

// 首页
// 1.分类列表
export const reqProNameList = parentId => ajax(BASE_URL + '/api/open/c/b2b2c/goodsservice/navigation_bar/tree.json', { parentId })

// 2.banner广告
export const reqBannerImg = positionId => ajax(BASE_URL + '/api/open/c/b2b2c/contentservice/ad/find_by_position.json', { positionId })

// 3.商品列表页
export const reqProList = obj => ajax(BASE_URL + '/api/open/c/b2b2c/goodsservice/goods/find_list.json', obj)

// 4.商品详情页
export const getProDetail = goodsId => ajax(BASE_URL + '/api/open/c/b2b2c/goodsservice/goods/find_detail.json', { goodsId })

// 5.热销商品
export const getTopFive = obj => ajax(BASE_URL + '/api/open/c/b2b2c/goodsservice/goods/find_top_five.json', obj)

// 6.注册页
export const sendRegisterInfo = goodsId => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/register.json', { goodsId }, 'POST')

// 7.登录页
export const goLogin = dataform => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/login.json', dataform, 'POST')

// 8.通过密保问题找回密码
export const sendCodeQuest = dataform => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/retrieve_pwd_by_question.json', dataform, 'POST')

// 9.修改用户信息
export const editUserInfo = dataform => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/edit.json', dataform, 'PUT')

// 10.根据用户账号获取该名称是否存在
export const checkAccount = userAccount => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/exits_by_account.json', { userAccount })

// 11.根据用户ID查询用户详细信息
export const reqUserInfo = dataform => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/find_info_by_id.json', dataform)

// 12.根据用户ID查询用户余额
export const reqUserBalance = dataform => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/find_money_by_userId.json', dataform, 'POST')

// 13.获取当前用户数据
export const getCurrentUserData = dataform => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/current.json', dataform, 'POST')

// 14.手机验证
export const getVerificationCode = telephone => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/send_login_captcha_message.json', { telephone })

// 15.根据catId获取商品信息
export const getInfoByCatId = barId => ajax(BASE_URL + '/api/open/c/b2b2c/goodsservice/navigation_bar/find_by_id.json', { barId })

// 16.C端商品详情显示评论
export const getComments = obj => ajax(BASE_URL + '/api/open/c/b2b2c/goodsservice/comment/find_list_by_goodsid.json', obj)

// 17.C端添加购物车
export const addShoppingCart = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/cart/save.json', obj, 'POST', true)

// 18.查询购物车信息
export const queryShop = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/cart/findDetail.json', obj, 'GET', true)

// 19.查询购物车信息
export const checkShop = (cartIds, checked) => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/cart/checked.json', { cartIds, checked }, 'GET', true)

// 20.修改购物车信息
export const updateShop = formdata => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/cart/update.json', formdata, 'PUT', true)

// 21.删除购物车信息
export const deleteShop = cartIds => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/cart/delete.json', { cartIds }, 'DELETE', true)

// 22.获取送礼场景
export const reqGiftScene = () => ajax(BASE_URL + '/api/open/c/b2b2c/goodsservice/scene/find_tree.json')

// 23.注销登录状态
export const logout = token => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/logout.json', { token }, 'DELETE', true)

// 24.所有地址
export const reqAddress = () => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/ship_address/find_all.json', {}, 'GET', true)

// 24.删除地址
export const reqDeleteAddress = addressId => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/ship_address/delete_by_id.json', { addressId }, 'DELETE', true)

// 25.订单结算
export const calcOrder = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/findPrice.json', obj, 'GET', true)

// 26.添加地址
export const addAddress = obj => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/ship_address/save.json', obj, 'POST', true)

// 27.设置默认地址
export const setDefaultAddress = addressId => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/ship_address/set_def.json', { addressId }, 'PUT', true)

// 28.购物车商品确认下单
export const confirmOrderFromShoppingCart = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/saveMultipleOrder.json', obj, 'POST', true)

// 29.立即购买商品确认下单
export const confirmOrderFromJustBuy = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/saveSingleOrder.json', obj, 'POST', true)

// 30.立即购买商品确认下单
export const findAddressById = addressId => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/ship_address/find_by_id.json', { addressId }, 'GET', true)

// 31.发送短信验证码
export const sendRegisterCaptcha = telephone => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/send_register_captcha_message.json', { telephone })

// 32.查询订单详情
export const reqOrderDetail = totalOrderNo => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/findDetail.json', { totalOrderNo }, 'GET', true)

// 33.校验手机验证码
export const checkRegisterCaptcha = (captcha, telephone) => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/verify_short_message.json', { captcha, telephone })

// 34.短信注册
export const registerByMessage = obj => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/register_by_short_message.json', obj, 'POST')

// 35.编辑地址
export const editAddress = obj => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/ship_address/update.json', obj, 'PUT', true)

// 36.倒计时自动取消订单
export const autoCancelOrder = totalOrderNo => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/bulkCancel.json', { totalOrderNo }, 'GET', true)

// 37.C-端订单列表
export const getAllorder = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/orderPageToC.json', obj, 'POST', true)

// 38.C-端订单标记
export const markOrder = orderId => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/saveOrderMark.json', { orderId }, 'PUT', true)

// 39.C-端订单删除
export const cancelOrder = (index, orderId, orderStatus) => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/update.json', { index, orderId, orderStatus }, 'GET', true)

// 40.查询购物车商品数量
export const reqShoppingCartNum = () => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/cart/sumCount.json', {}, 'GET', true)

// 41.申请售后
export const applyAfterSale = () => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/cart/sumCount.json', {}, 'GET', true)

// 42.底部内容
export const reqFooterData = obj => ajax(BASE_URL + '/api/open/b/b2b2c/contentservice/articleCategory/find_by_list.json', obj, 'GET')

// 43.C-提醒发货
export const getdelivery = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/urgeDelivery.json', obj, 'GET', true)

// 44.C-端确认收货
export const suergoods = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/update.json', obj, 'GET', true)

// 45.C-端物流详情
export const getLogistics = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/logistics/info.json', obj, 'GET', true)

// 46.地址级联查询
export const reqAddressCascader = parentId => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/region/find_by_parent.json', { parentId })

// 47.C-订单详情
export const orderDetails = orderId => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/orderDetail.json', { orderId }, 'GET', true)

// 48.C-保存订单商品评价
export const savEvaluation = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/saveComment.json', obj, 'POST', true)

// 49.提交多地址
export const postMultipleAddress = obj => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/ship_address/save_multiple.json', obj, 'POST', true)

// 50.C-评价页面订单商品基础数据
export const getBasis = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/CommentOrderDetail.json', obj, 'GET', true)

// 51.C-查看评价详情
export const getThedetails = commentId => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/findComment.json', commentId, 'GET', true)

// 52.C-模拟订单支付
export const payOrderIds = orderIds => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/payment.json', orderIds, 'GET', true)

// 52.C-活动首页
export const activityHome = () => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/list.json')

// 53.上传多地址表格
export const uploadMultipleAddressExcel = formData => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/cart/uploading.json', formData, 'POST', true)

// 54.将多地址放入缓存
export const downloadMultipleAddressExcel1Step = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/cart/saveManyAddress.json', obj, 'POST', true)

// 55.将多地址放入缓存
export const downloadMultipleAddressExcel2Step = key => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/cart/download.json', { key }, 'GET', true)

// 56.获取短信发送时间
export const getSmsSendTime = telephone => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/find_sms_send_time.json', { telephone })

// 57.下载多地址表格
export const downloadMultipleAddressExcel = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/cart/download.json', obj, 'POST', true)


// 56.限时秒杀
export const timelimitedSpike = (activityId, activityTypeId) => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/same_type_activity.json', { activityId, activityTypeId })

// 57. 获取活动商品
export const eventGoods = obj => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activityGoods/page.json', obj,'GET')

// 58.周周精选
export const weeklySelection = (activityId, activityTypeId) => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/selected_activity.json', { activityId, activityTypeId })

// 58.底部导航栏跳转
export const bottomNavJunk = categoryName => ajax(BASE_URL + '/api/open/b/b2b2c/contentservice/articleCategory/find_article_by_name.json', { categoryName }, 'GET')

// 59.C端用户找回密码 (短信方式)
export const findCodeByMsm = obj => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/retrieve_pwd_by_short_message.json', obj, 'PUT')

// 60.发送找回密码短信验证码
export const sendRetrievePasswordCaptchaMessage = telephone => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/send_retrieve_password_captcha_message.json', { telephone })

export const findCurrentUserInfo = () => ajax(`${BASE_URL}/api/open/c/b2b2c/userservice/user/current.json`)

export const editUser = obj => ajax(`${BASE_URL}/api/open/c/b2b2c/userservice/user/edit.json`, obj, 'PUT')

export const sendEditTelephoneCaptchaMessage = telephone => ajax(`${BASE_URL}/api/open/c/b2b2c/userservice/user/send_edit_telephone_captcha_message.json`, { telephone })

export const editTelephone = (telephone, captcha) => ajax(`${BASE_URL}/api/open/c/b2b2c/userservice/user/edit_telephone.json?telephone=${telephone}&captcha=${captcha}`, {}, 'PUT')

// 62.C-端查询订单支付状态
export const checkedPayStatus = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/pay/queryOrder.json', obj, 'POST', true)

// 63.C-端多地址拆单
export const submitAddress = (multipleAddress, orderId, shippingAddressParams) => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/splittingOrder.json', { multipleAddress, orderId, shippingAddressParams }, 'POST', true)

// 61.特惠专区
export const specialOffer = obj => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/discount_activity.json', obj )

// 62.折扣专区
export const discountArea = activityId => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activityGoods/rebate_activity_type.json', { activityId })

// 63.节日专区
export const holidayArea = activityId => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activityGoods/festival_activity.json', { activityId })

// 64.活动配图
export const matching = activityId => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/activity_gallery.json', { activityId })

export const reqPayInfo = orderNo => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/pay/to_pay.json', { orderNo }, 'GET', true)

// 65.生日活动分页获取30生日
export const getBirthday = activityId => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/birthday_people_page.json', { activityId })

// 66.赠送礼物
export const getGift = obj => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/give_present.json', obj)

// 67.收到祝福语getaddBlessings
export const getReceivGift = obj => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/received_blessing_words.json', obj)


// 68.收到的祝福统计
export const getaddBlessing = obj => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/personal_bless.json', obj)

// 69.收到的礼物
export const getReceiveGift = obj => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/received_present.json', obj)

// 68.发送修改手机号短信验证码
export const getphoneMessage = telephone => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/user/send_edit_telephone_captcha_message.json', { telephone }, 'GET', true)

// 69 红包支付接口
export const redEnvelopePayment = obj => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/pay.json', obj, 'GET', true)

// 70 生活专区生成二维码
export const qRCode = codeUrl => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/qr_code.json', { codeUrl }, 'GET', true)

// 71 生日专区查询支付状态
export const paymentStatus = obj => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/queryOrder.json', obj)

// 72 喜事连连子评论
export const subComment = obj => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/save_child_comment.json', obj, 'GET', true)

// 72 获取除了生日的用户信息
export const userInfo = obj => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/activity_event_people_page.json', obj)

// 73.获取商品sku列表信息
export const obtainSku = (activityGoodsId) => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activityGoods/find_sku_list.json', { activityGoodsId })

// 74.商场首页好货抢先购
export const preemptivePurchase = () => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/goodStuffBuy/home_page_good_stuff.json', {}, 'GET', true)

// 75 .商场首页拼团返回
export const fightGroup = () => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/assemble/home_page_assemble.json', {}, 'GET', true)

// 76好货抢先购详情页
export const preemptivePurchaseDetails = (activityId, pageSize) => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/goodStuffBuy/good_stuff_activity_detail.json', { activityId, pageSize }, 'GET', true)

// 77.团购详情页
export const groupBuy = obj => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activityGoods/page.json', obj)

// 78.团购分页获取商品
export const pagination = obj => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activityGoods/page.json', obj)

// 79查询拼团
export const queryGroup = obj => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/assemble/find_assemble_page.json', obj, 'POST')

//80 获取拼团主键ID
export const getPrimaryKeyId = () => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/assemble/assemble_key.json')

//81 按类型查询排行商品
export const goodsfindbasictotype =  (catId,goodsName,typeCode,showNumber) => ajax(BASE_URL + '/api/open/c/b2b2c/goodsservice/goods/find_basic_to_type.json',{catId,goodsName,typeCode,showNumber},'GET')
//获取拼团时间
export const getGroupTime = (activityId) => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activity/activity_search_by_id.json',{activityId},'GET',true)

//82活动详情页
export const getActivityDetail = (activityGoodsId) => ajax(BASE_URL + '/api/open/c/b2b2c/acvitityservice/activityGoodsDetail/find_detail.json',{activityGoodsId},'GET',true)

//根据项目id获取首页面详情
export const findindexbyproject = (projectId) => ajax(BASE_URL + '/api/open/c/b2b2c/projectservice/projectPage/find_index_by_project.json',{projectId},'GET')

//根据项目id获取首页面详情
export const getprojectid = () => ajax(BASE_URL + '/api/open/c/b2b2c/projectservice/project/get_project_id.json',{},'GET')

// 商品点击数
export const calcProClickNum = (goodsId) => ajax(BASE_URL + '/api/open/c/b2b2c/goodsservice/goodsStats/update.json?goodsId=' +　goodsId,　{} ,'PUT')

// 用户反馈新增
export const addfeedback = (contact,feedbackContent,feedbackImg) => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/feedback/save.json?feedbackContent='+ feedbackContent + "&feedbackImg="+ feedbackImg+ "&contact="+contact ,{},'POST')

//个人中心
export const personalcenter = obj => ajax(BASE_URL + '/api/open/c/b2b2c/userservice/accountinfo/findUserAllAccountInfo.json',obj,'GET')

//查询流水
export const queryrunningwater = obj => ajax(BASE_URL + '/api/open/p/b2b2c/orderservice/balance_account/find_page.json',obj,'GET')

//根据code查询单个系统配置信息
export const reqSystemConfig = (code) => ajax(BASE_URL + '/api/open/c/b2b2c/settingservice/systemSetting/findByCode.json',{code}, 'GET')

//0元支付更新订单状态
export const updatePayStatus = (orderNo) => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/updatePayStatus.json',　{orderNo} ,'GET', true)

//查询流水订单明细
export const findorderpage = obj => ajax(BASE_URL + '/api/open/p/b2b2c/orderservice/balance_account/find_order_page.json',obj,'GET')

