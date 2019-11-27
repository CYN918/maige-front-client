<template>
    <div class="many_address">
      <div class="many_header">
        <div class="header_top" style="display:inline-block;">
          <span class="kuai"></span>
          <div class="text">多地址选择</div>
        </div>
        <span class="mulAddressTips">(选择多地址下单可先下单后补填地址信息)</span>
        <div class="buttom" style="float:right; margin-top:16px;margin-right:20px; display: flex">
          <el-button class="button" type="primary" style="position: relative;height:32px;line-height:0;font-size:14px;"
                     @click="add">添加多地址
          </el-button>
          <el-button class="button" @click="handleDownload" type="primary" style="position: relative;height:32px;line-height:7px;font-size:14px;margin-right: 10px">
            导出多地址表格模板
          </el-button>
          <label class="button" for="uploadMultipleAddress" title="温馨提示:为确保导入表格的格式正确，请先下载/导出多地址表格模板" style="position: relative; display:inline-block; background: #409EFF; cursor: pointer; height:32px;line-height:32px;padding: 0 20px; font-size:14px;border-radius:4px;color:#fff; text-align: center">
            <input @change="handleUpload" ref="uploadFile" style="position: absolute; top:-10000px;" type="file" id="uploadMultipleAddress" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
            导入多地址
          </label>
        </div>
      </div>
      <div class="many_body">
        <div class="many_table clearfix">
          <el-table
            ref="tableList"
            :data="multipleTableData"
            :max-height="maxHeight"
            border
            :cell-class-name="tableCellClassName"
            @select.once="handleSelect"
            @select-all.once="handleSelect"
            :row-style="{ height: '72px' }"
            @cell-click="tableMove"
            @selection-change="handleSelectionChange"
            :header-cell-style="getRowClass"
            style="width: 100%">
            <el-table-column align="center" type="selection" width="55" fixed="left"></el-table-column>
            <el-table-column style="color:red;" align="center" prop="gonsi" label="单位名称" width="213">
              <template slot-scope="scope">
                <input v-model="scope.row.unitName" maxlength="18">
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="收件人" width="80">
              <template slot-scope="scope">
                <input v-model="scope.row.consignee" maxlength="18">
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dianhua" label="电话" width="130">
              <template slot-scope="scope">
                <input v-model="scope.row.telephone" maxlength="18">
              </template>
            </el-table-column>
            <el-table-column align="center" prop="phone" label="手机" width="130">
              <template slot-scope="scope">
                <input v-model.number="scope.row.phone" @blur="checkPhoneNumber(scope.row.phone)" maxlength="11">
              </template>
            </el-table-column>
            <el-table-column align="center" prop="sheng" label="省" width="80">
              <template slot-scope="scope">
                <input v-model="scope.row.provinceName" maxlength="18">
              </template>
            </el-table-column>
            <el-table-column align="center" prop="city" label="市" width="80">
              <template slot-scope="scope">
                <input v-model="scope.row.cityName" maxlength="18">
              </template>
            </el-table-column>
            <el-table-column align="center" prop="xian" label="区县" width="80">
              <template slot-scope="scope">
                <input v-model="scope.row.districtName" maxlength="18">
              </template>
            </el-table-column>
            <el-table-column align="center" prop="zhen" label="街道" width="80">
              <template slot-scope="scope">
                <input v-model="scope.row.townName" maxlength="18">
              </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="详细地址" width="223">
              <template slot-scope="scope">
                <input v-model="scope.row.address" maxlength="18">
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              width="90" align="center">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, multipleTableData)"
                  type="text"
                  size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
            <!--<div v-for="(item, index) in goodsInfo" :key="`${item.goodsId} + ${Math.random()}`">
              <el-table-column align="center" :label="'商品名称'+ (index + 1)" width="120">
                <template slot-scope="scope">
                  <span :title="item.goodsName" class="goodsName">{{item.goodsName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="商品货号" width="160">
                <template slot-scope="scope">
                  <span>{{item.goodsSn}}</span>
                </template>
              </el-table-column>
              &lt;!&ndash;<el-table-column align="center" label="SKU" width="130">
                <template slot-scope="scope">
                  <span :title="item.skuId">{{item.skuId}}</span>
                </template>
              </el-table-column>&ndash;&gt;
              <el-table-column align="center" label="商品数量">
                <template slot-scope="scope">
                  <input type="number" min="0" v-model.number="multipleTableData[scope.$index].addressGoodsParams[index].quantity">
                </template>
              </el-table-column>
            </div>-->
          </el-table>
          <span v-if="show" style="float: left;color: #409EFF;margin: 20px 13px 0;cursor: pointer;}" @click="extendTable">点击展开</span>
          <span v-else style="float: left;color: #409EFF;margin: 20px 13px 0;cursor: pointer;}" @click="shrinkTable">点击收缩</span>
          <div class="determine" style="float:right;margin: 16px 28px 16px 0px;">
            <el-button class="button" type="primary" @click="keepMultipleAddress" style="position:relative;width:72px;height:32px;line-height:7px;">保存</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl"
  @import "~styles/mixins.styl"
  .mulAddressTips
    position relative
    top 3px
    margin-left: 20px
    color #999
  .goodsName
    display inline-block
    ellipsis()
  .clearfix:after {
    display: block;
    content: "";
    clear: both;
  }
  .many_table >>> .el-table__body-wrapper::-webkit-scrollbar {
    width:0px !important;
    height:14px !important;
  }

  .many_table >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background:$btnColor;
    border-radius:4px;
  }
  .button:active
    top 2px
  .many_table >>> .el-table__empty-block
    justify-content flex-start
  .many_table >>> .el-table__empty-text
    width 1142px
  .many_table >>> .el-table__fixed-right
    bottom 14px !important
    right 0px !important
  .many_table >>> .el-table__fixed
    bottom 14px !important
  .header_top
    padding-top 16px
    .kuai
      width 4px
      height 22px
      display inline-block
      background-color $btnColor
      vertical-align middle
    .text
      display inline-block
      font-family MicrosoftYaHei
      color #606060
      margin-left 21px
      vertical-align middle
      font-size 20px
  .many_address
    margin-top 20px
    background-color #ffffff
    .many_body
      margin-top 20px
      margin-left 35px
      margin-right 23px
  .many_table
    /deep/ .el-table__body-wrapper::-webkit-scrollbar
      width: 8px; // 横向滚动条
      height: 8px;
    // 纵向滚动条 必写
    /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb
      background-color $btnColor
      border-radius 3px
    input
      width 100%
      height 100%
      text-align center
      font-family MicrosoftYaHei
      font-size 14px
      color #939399
</style>

<script>
import { mapState } from 'vuex'
import { postMultipleAddress, reqDeleteAddress, uploadMultipleAddressExcel, downloadMultipleAddressExcel1Step } from '@/api/index'
import { throttleTipPop } from '@/assets/utils/utils'

let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://www.maige.com'
} else {
  BASE_URL = `http://${location.hostname}`
}

export default {
  name: 'manyAddress',
  data() {
    return {
      show: true,
      isPopup: false,
      maxHeight: 250,
    }
  },
  props: ['multipleTableData'],
  computed: {
    ...mapState(['goodsInfo']),
  },
  watch: {
    multipleTableData(newVal) {
      console.log(newVal)
    },
  },
  methods: {
    // 收缩多地址
    shrinkTable() {
      this.maxHeight = 250
      this.show = true
    },
    // 展开多地址
    extendTable() {
      this.maxHeight = 800
      this.show = false
    },
    // 验证手机号
    checkPhoneNumber(phone) {
      if (!(/^1[3456789]\d{9}$/.test(phone))) {
        this.$message.error('手机号格式不正确')
      }
      return true;
    },
    // 导出多地址表格
    async handleDownload() {
      if (this.multipleTableData.length === 0) {
        this.$alert('为确保获取正确的表格模板，请点击"添加多地址"按钮以获取至少一条多地址信息', '温馨提示', {
          confirmButtonText: '确定',
        })
        return
      }
      const addressArr = []
      this.multipleTableData.forEach((item) => {
        // item.addressGoodsParams.forEach((i) => { delete i.goodsId })
        delete item.addressGoodsParams
        const obj = {}
        obj.address = item.address
        obj.cartDownloadGoods = item.addressGoodsParams
        obj.city = item.cityName
        obj.companyName = item.unitName
        obj.consignee = item.consignee
        obj.district = item.districtName
        obj.mobile = item.phone
        obj.province = item.provinceName
        obj.tel = item.telephone
        obj.town = item.townName
        addressArr.push(obj)
      })
      let key = ''
      const res = await downloadMultipleAddressExcel1Step(addressArr)
      if (res.code === 200) {
        key = res.data
      }
      const url = BASE_URL + '/api/open/c/b2b2c/orderservice/cart/download.json?key=' + key
      const elink = document.createElement('a');
      elink.style.display = 'none';
      elink.href = url
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    },
    // 导入多地址表格
    async handleUpload() {
      const files = this.$refs.uploadFile.files[0]
      const formData = new FormData()
      let res = ''
      formData.append('multipartFile', files)
      try {
        res = await uploadMultipleAddressExcel(formData)
      } catch (e) {
        console.log(e)
        this.$refs.uploadFile.value = ''
      }
      if (res.code === 200) {
        let flag = false // 商品信息匹配，校验通过flag为false, 校验不通过为true
        const addressArr = []
        res.data.forEach((item) => {
          // 校验商品上传信息
          /* const goodsArr = [] // 获取商品信息
          this.goodsInfo.forEach((ite, index) => {
            if (ite.skuId !== item.cartDownloadGoods[index].skuId || ite.goodsSn !== item.cartDownloadGoods[index].goodsSn) {
              flag = true
            }
          })
          this.goodsInfo.forEach((goods) => {
            const obj = {}
            obj.goodsId = goods.goodsId
            obj.goodsName = goods.goodsName
            obj.goodsSn = goods.goodsSn
            obj.skuId = goods.skuId
            goodsArr.push(obj)
          })
          item.cartDownloadGoods.forEach((goods1, index) => {
            goodsArr[index].quantity = goods1.quantity
          }) */
          const obj = {}
          obj.addressName = ''
          obj.consignee = item.consignee
          obj.telephone = item.tel
          obj.unitName = item.companyName
          obj.phone = item.mobile
          obj.email = ''
          obj.country = 1
          obj.countryName = '中国'
          obj.province = 6
          obj.provinceName = item.province
          obj.city = 77
          obj.cityName = item.city
          obj.district = 705
          obj.districtName = item.district
          obj.town = 1561
          obj.townName = item.town
          obj.address = item.address
          obj.zipcode = ''
          obj.signBuilding = ''
          obj.sortOrder = 0
          // obj.addressGoodsParams = goodsArr
          addressArr.push(obj)
        })
        if (flag) {
          this.$message.error('上传的商品信息不匹配，请下载模板清单进行填写后上传')
          return
        }
        this.$message({
          type: 'success',
          message: '上传成功！',
        })
        this.$emit('multipleTableDataChange', addressArr)
        this.$refs.uploadFile.value = '' // 清空上传的文件
      }
    },
    // 选中提示
    handleSelect() {
      if (this.isPopup) {
        return
      }
      this.isPopup = true
      this.$alert('选中多地址选项即表示您将使用所选中的多个地址做为发货地点', '温馨提示', {
        confirmButtonText: '确定',
      })
    },
    // 获取选中的所有行 array
    handleSelectionChange(val) {
      if (val.length > 0) { // 表示有被选中的列，即选择多地址
        this.$store.commit('handleShippingAddressParams', val)
      } else {
        this.$store.commit('handleShippingAddressParams', [])
      }
    },
    // 删除行
    deleteRow(index, rows) {
      this.$confirm('是否确定移除此行多地址', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        if (rows[index].addressId) {
          const res = await reqDeleteAddress(rows[index].addressId)
          if (res.code === 200) {
            rows.splice(index, 1);
            this.$message({ type: 'success', message: '删除成功' })
          } else {
            this.$message(res.message)
          }
        } else {
          rows.splice(index, 1);
          this.$message({ type: 'success', message: '删除成功' })
        }
      })
    },
    // 多地址表格添加一行
    add() {
      this.addLine()
    },
    // 保存多地址
    async keepMultipleAddress() {
      const multipleAddArr = []
      let flag = 0
      this.multipleTableData.forEach(async (item, index) => {
        if (!item.consignee || !item.telephone || !item.unitName || !item.phone || !item.provinceName || !item.cityName || !item.districtName || !item.townName || !item.address) {
          flag = index + 1
          return
        }
        multipleAddArr.push({
          addressName: '',
          consignee: item.consignee,
          telephone: item.telephone,
          unitName: item.unitName,
          phone: item.phone,
          email: '',
          country: 1,
          countryName: '中国',
          province: 6,
          provinceName: item.provinceName,
          city: 77,
          cityName: item.cityName,
          district: 705,
          districtName: item.districtName,
          town: 1561,
          townName: item.townName,
          address: item.address,
          zipcode: '',
          signBuilding: '',
          sortOrder: 0,
        })
      })
      if (flag !== 0) {
        throttleTipPop(this, 'error', `第${flag}行地址有数据为空，请填写完整信息再保存`)
        return false
      }
      const res = await postMultipleAddress(multipleAddArr)
      if (res.code === 200) {
        throttleTipPop(this, 'success', '保存成功')
      }
    },
    // 添加多地址 加行
    addLine() {
      const newValue = {
        addressName: '',
        consignee: '',
        telephone: '',
        unitName: '',
        phone: '',
        email: '',
        country: 1,
        countryName: '中国',
        province: 6,
        provinceName: '',
        city: 77,
        cityName: '',
        district: 705,
        districtName: '',
        town: 1561,
        townName: '',
        address: '',
        zipcode: '',
        signBuilding: '',
        bestTime: '',
        def: true,
        sortOrder: 0,
      }
      newValue.addressGoodsParams = []
      if (this.goodsInfo) {
        this.goodsInfo.forEach((i) => {
          const obj = {}
          obj.goodsId = i.goodsId
          obj.goodsName = i.goodsName
          obj.goodsSn = i.goodsSn
          obj.skuId = i.skuId
          obj.quantity = 0
          newValue.addressGoodsParams.push(obj)
        })
      }
      console.log(this.goodsInfo)
      this.multipleTableData.push(newValue);
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;';
      }
      return '';
    },
    tableCellClassName({ row, column, rowIndex, columnIndex }) { // 注意这里是解构
      // 利用单元格的 className 的回调方法，给行列索引赋值
      row.index = rowIndex;
      column.index = columnIndex;
    },
    tableMove(row, column, cell, event) {
      const i = column.index // 9 13 17 21
      if (i >= 9 && (i - 9) % 4 === 0) {
        this.$refs.tableList.bodyWrapper.scrollLeft = cell.offsetLeft
      }
    },
  },
};
</script>
