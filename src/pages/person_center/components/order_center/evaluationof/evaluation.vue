<template>
  <div class="evaluation">
    <div class="header">
      <p class="orderNo">
        <span>订单号:</span>
        <span>{{description.orderSn}}</span>
        <span>确认收货时间: {{description.completeTime}}</span>
      </p>
    </div>
    <div class="evaluation_container">
      <div class="evaluationTop">
        <div class="evaluationTop_left">
          <div class="evaluation_center">
            <img src="@/assets/images/person_center/image/物流服务评价@2x.png" alt />
            <div class="evaluation">
              <span>物流服务评价</span>
              <span>{{description.shippingName}}</span>
            </div>
          </div>
        </div>
        <div class="evaluationTop_right">
          <ul class="start_item">
            <li v-for="(item,index) in sundrying.score" :key="index">
              <div class="start_list">
                <span>{{item.package}}</span>
                <el-rate
                  v-model="item.value"
                  show-text
                  text-color="#999999"
                  :colors="['#4C86F4', '#4C86F4', '#4C86F4']"
                ></el-rate>
                <!-- 评分星星 -->
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="evaluationBottom">
        <div class="evaluationBottom_l">
          <img :src="description.thumbnailImgUrl" alt />
          <p class="text">
            <span>{{description.goodsName}}</span>
            <span>{{description.goodsAttr}}</span>
          </p>
        </div>
        <div class="evaluationBottom_r">
          <p class="caveat">
            <img src="@/assets/images/person_center/image/感叹号@2x.png" alt />
            <span>请至少填写一款商品的评价</span>
          </p>
          <div class="kuaidi">
            <span>商品评价</span>
            <el-rate
              v-model="Couriervalue"
              show-text
              text-color="#999999"
              :colors="['#4C86F4', '#4C86F4', '#4C86F4']"
            ></el-rate>
            <!-- 评分星星 -->
          </div>
          <div class="pinglun">
            <span class="sunDrying">评价晒单</span>
            <el-input
              type="textarea"
              :rows="5"
              resize="none"
              placeholder="分享体验心得，给千万想买的人一个参考吧~"
              v-model="textarea"
            ></el-input>
            <span class="tip">
              {{(500-textarea.length)>0?500-textarea.length:0}}/500（评价字数最多
              <span
                class="tip_color"
              >500</span> 个字哦~）
            </span>
          </div>
          <div class="updata">
            <el-upload
              class="avatar-uploader"
              :action="action"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-error="handleerr"
              :on-success="handlSuccess"
              :limit="9"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <div class="num">
              <span>共</span>
              <span class="updataNum">{{updataimg}}</span>
              <span>张，还能上传</span>
              <span class="updataNum">{{updataimgs}}</span>
              <span>张</span>
            </div>
            <el-button type="primary" style="width:200px;text-align:center" @click="published">发表</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Star from "./star";
import { getBasis, savEvaluation } from "@/api/index";
import { throttleTipPop } from "@/assets/utils/utils";
export default {
  components: {
    Star
  },
  data() {
    return {
      action: "http://www.maige.com/api/open/c/b2b2c/fileservice/uploadFile?",
      num: 9, //限制上传照片的个数
      imgArr: [], // 上传的图片
      updataimg: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      textarea: "", //评价晒单的value
      score: 8, //用户评论的分数
      orderId: "", // 订单id
      goodsId: "", // 商品id
      skuId: "", // skuid
      Couriervalue: 0, //快递评分
      description: {},
      sundrying: {
        orderNo: "98637034502",
        orderNo: "98637034502",
        orderTime: "2019-06-29 14:33:34",
        kuaidi: "顺丰快递",
        star: require("@/assets/images/person_center/image/staron.png"),
        score: [
          {
            package: "快递包装",
            value: 0
          },
          {
            package: "送货速度",
            value: 0
          },
          {
            package: "配送员服务",
            value: 0
          }
        ]
      }
    };
  },
  computed: {
    updataimgs() {
      return this.num - this.updataimg;
    }
  },
  methods: {
    async published() {
      if (this.textarea.length > 500) {
        throttleTipPop(
          this,
          "error",
          "评论内容不能超过500字数,当前已超出" +
            (this.textarea.length - 500) +
            "字"
        );
      } else {
        if (this.textarea) {
          try {
            let obj = {
              comment: {
                commentRank:
                  this.Couriervalue > 2 ? (this.Couriervalue < 5 ? 1 : 0) : 2,
                commentType: 0,
                content: this.textarea,
                goodsId: this.goodsId,
                orderId: this.orderId,
                packRank:
                  this.sundrying.score[0].value > 2
                    ? this.sundrying.score[0].value < 5
                      ? 1
                      : 0
                    : 2,
                serviceRank:
                  this.sundrying.score[1].value > 2
                    ? this.sundrying.score[1].value < 5
                      ? 1
                      : 0
                    : 2,
                speedRank:
                  this.sundrying.score[2].value > 2
                    ? this.sundrying.score[2].value < 5
                      ? 1
                      : 0
                    : 2,
                skuId: this.skuId,
                email: ""
              },
              goodsGalleryes: {
                galleryes: this.imgArr
              }
            };
            const res = await savEvaluation(obj);
            if (res.code != 200) {
              throttleTipPop(this, "error", res.message);
            } else {
              this.$message({
                message: "恭喜你，评论成功",
                type: "success"
              });
              this.$router.push({ name: "myorder" });
            }
            this.description = res.data;
          } catch (e) {
            throttleTipPop(this, "error", "未知错误，请联系管理员");
          }
        } else {
          throttleTipPop(this, "error", "请填写评论内容");
        }
      }
    },
    async getBasis(id) {
      let obj = {};
      obj.orderId = this.orderId;
      obj.goodsId = this.goodsId;
      obj.skuId = this.skuId;
      try {
        const res = await getBasis(obj);
        this.description = res.data;
      } catch (e) {
        this.$message("未知错误，请联系管理管理人员");
      }
    },
    //移除文件的回调
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.updataimg--;
    },
    //点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传成功的回调
    handlSuccess(res, file, fileList) {
      this.updataimg++;
      this.imgArr.push({
        imgUrl: res.data.domain + res.data.filePath,
        imgDesc: res.data.filePath
      });
      console.log(this.imgArr);
    },
    //上传失败的回调
    handleerr(err, file, fileList) {
      console.log(err, file, fileList);
    }
  },
  mounted() {
    this.orderId = this.$route.query.orderId;
    this.goodsId = this.$route.query.goodsId;
    this.skuId = this.$route.query.skuId;
    this.getBasis();
  }
};
</script>
<style lang="stylus" scoped>
.evaluation {
  background: white;
  margin-left: 20px;
  margin-top: 15px;
}

.header {
  width: 100%;
  height: 63px;
  line-height: 63px;
  border-bottom: 1px solid rgba(242, 242, 242, 1);

  .orderNo {
    height: 13px;
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);

    span {
      &:nth-child(1) {
        margin-left: 20px;
      }

      &:nth-child(2) {
        color: rgba(51, 51, 51, 1);
      }

      &:nth-child(3) {
        margin-left: 40px;
      }
    }
  }
}

.evaluation_container {
  .evaluationTop {
    border-bottom: 1px solid rgba(242, 242, 242, 1);
    padding-bottom: 20px;
    display: flex;
    width: 100%;

    .evaluationTop_left {
      width: 228px;

      .evaluation_center {
        margin-top: 26px;
        margin-left: 38px;
        display: flex;

        .evaluation {
          width: 100px;
          margin-top: 25px;
          margin-left: 18px;

          span {
            &:nth-child(2) {
              margin-top: 10px;
              display: inline-block;
              font-size: 13px;
              color: rgba(153, 153, 153, 1);
            }
          }
        }
      }
    }

    .evaluationTop_right {
      width: 100%;

      .start_item {
        margin-left: 68px;
        width: 90%;
        display: flex;
        justify-content: space-around;
        margin-top: 67px;
        color: rgba(136, 136, 136, 1);
        font-size: 13px;

        .start_list {
          display: flex;

          span {
            word-break: keep-all;
            vertical-align: middle;

            &:nth-child(1) {
              padding-right: 12px;
            }
          }

          .pdl {
            padding-left: 12px;
          }
        }
      }
    }
  }

  .evaluationBottom, .evaluationBottom {
    width: 100%;
    display: flex;

    .evaluationBottom_l {
      width: 182px;
      margin: 72px;
      text-align: center;

      img {
        width: 122px;
        height: 122px;
      }

      .text {
        width: 100%;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-top: 15px;

        span {
          margin-top: 15px;

          &:nth-child(2) {
            margin-top: 10px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            display: inline-block;
            width: 100%;
            text-align: center;
          }
        }
      }
    }

    .evaluationBottom_r {
      width: 100%;
      margin: 72px;

      .caveat {
        width: 100%;

        span {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(76, 134, 244, 1);
        }
      }

      .kuaidi {
        display: flex;
        margin: 20px 0;

        .starimg {
          margin-top: -2px;
        }

        span {
          margin-right: 60px;
          font-size: 13px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(136, 136, 136, 1);
        }

        .pinfen {
          margin-left: 10px;
        }
      }

      .pinglun {
        display: flex;
        margin-top: 30px;
        position: relative;

        .sunDrying, display inline-block {
          font-size: 13px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(136, 136, 136, 1);
          width: 136px;
        }
      }

      .updata {
        margin-left: 114px;
        margin-top: 20px;

        .num {
          margin: 20px 0;

          span {
            font-size: 13px;
            color: rgba(197, 197, 197, 1);
            font-family: Microsoft YaHei;
            font-weight: 400;
          }

          .updataNum {
            color: RGBA(255, 112, 112, 1);
          }
        }

        .publish {
          width: 200px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          background: rgba(76, 134, 244, 1);
        }
      }
    }
  }
}

.tip {
  position: absolute;
  right: 0;
  bottom: 6px;
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #C5C5C5;
}

.tip_color {
  color: #FF2A2A;
}
</style>
