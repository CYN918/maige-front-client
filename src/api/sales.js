import ajax from './ajax'

// const BASE_URL = 'http://www.maige.com'
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://www.maige.com'
} else {
  BASE_URL = `http://${location.hostname}`
}

// C-售后单列表
export const aftersalepagec = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/after_sale_page_c.json', obj, 'POST',true)

// C-查看附件
export const findpicc = (complainId) => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/find_pic_c.json', { complainId }, 'GET', true)

// C-售后单商品列表
export const aftergoodslistc = (complainId) => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/after_goods_list_c.json', {complainId}, 'GET',true)

// C-查看进度表
export const findafterlogc = (complainId,returnType) => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/find_after_log_c.json', {complainId,returnType}, 'GET',true)

//C-查看物流详情
export const findlogisticsdetailc = (complainId,logisticsNo) => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/find_logistics_detail_c.json', {complainId,logisticsNo}, 'GET',true)

// C-根据订单号获取订单详情
export const findorderdetail = (orderSn) => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/find_order_detail.json', {orderSn}, 'GET',true)

// C-获取推送处理人
export const findpusher = (orderSn,returnType,skuId,amount) => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/find_pusher.json', {orderSn,returnType,skuId,amount}, 'GET',true)

// C-新增售后单
export const saveaftersalec = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/save_after_sale_c.json', obj, 'POST',true)

// C-加急处理
export const urgeresolvec = (afterId,sysUserId) => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/urge_resolve_c.json', {afterId,sysUserId}, 'GET',true)

// C-查找所有快递公司
export const shippingCompany = () => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/order/shippingCompany.json', {}, 'GET',true)

// C-用户寄回商品
export const userreturngoods = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/user_return_goods.json', obj, 'POST',true)

//C-买家签收快递
export const userreceivec = (complainId) => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/user_receive_c.json', {complainId}, 'GET',true)

//C-查看售后单
export const aftersaleetail = (afterId) => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/after_sale_etail.json', {afterId}, 'GET',true)

//C-升级客诉
export const againaftersalec = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/again_after_sale_c.json', obj, 'POST',true)

//C-二三四五六次客诉
export const savemanyc = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/save_many_c.json', obj, 'POST',true)

//C-取消售后
export const cancelafterSale = (complainId) => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/cancel_afterSale.json', {complainId}, 'GET',true)

//C-取消售后
export const updateaftersalec = obj => ajax(BASE_URL + '/api/open/c/b2b2c/orderservice/afterSale/update_after_sale_c.json', obj, 'POST',true)