<template>
  <div class="groupActivityWrap">
    <!--团购-->
    <div v-if="componentStatus&&componentStatus[1].componentStatus==0">
      <div class="groupBuy" v-if="isfightGroup">
        <div class="header" :style="{backgound:activityList[0].bgcolor||bgcolor1}">
          <span class="shandian"></span>
          <span>拼团</span>
        </div>
        <div class="newActivity">
          <div
            class="newActivityLeft"
            :style="`background: url('${componentStatus[0]?componentStatus[0].componentContents[0].picture:fightGroup.bannerUrl}'); background-size: 100% 100%`"
            @click="fightGrouphandle"
          ></div>
          <div class="newActivityRight groupBuyRight">
            <div
              class="phoneEnterprise"
              v-for="(item,index) in ((activityList[0].activityGoods.length>0?activityList[0].activityGoods:fightGroup && fightGroup.assembleGoodsList)||[]).slice(0,2)"
              :key="index"
            >
              <a
                :href="`product_details.html?&goodsId=${item.goodsId}&activityTypeNum=${fightGroup && fightGroup.activityTypeNum}&activityId=${fightGroup && fightGroup.activityId}`"
              >
                <img
                  :src="item.skuImg||item.imgUrl"
                  :title="item.goodsName"
                  width="170px"
                  height="170px"
                />
              </a>
              <div class="text">
                <span class="miaoshu">{{item.goodsName}}</span>
                <p class="price">
                  <span>拼团价</span>
                  <span style="font-size:15px;font-weight: 800 ">￥{{item.salePrice}}</span>
                  <span>{{item.ustomaryPrice}}</span>
                </p>
                <!-- <p class="persona" v-if="item.lackNumber">
                <span class="personaLeft">还差{{item.lackNumber}}人</span>
                <span class="personaRight" @click="goToLegation(item)">去参团</span>
                </p>-->
                <p>
                  <a
                    class="gotoGroup"
                    style="color:white"
                    :href="`product_details.html?groupId=${item.groupId}&goodsId=${item.goodsId}&activityId=${fightGroup && fightGroup.activityId}&activityGoodsId=${item.activityGoodsId}&activityTypeNum=${fightGroup && fightGroup.activityTypeNum}`"
                  >去开团</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--好货抢先购-->
    <div v-if="componentStatus&&componentStatus[0].componentStatus==0">
      <div class="preemptivePurchase" v-if="ispurchase">
        <div class="header" :style="{backgound:activityList[1].bgcolor||bgcolor2}">
          <span class="shandian"></span>
          <span>好货抢先购</span>
        </div>
        <div class="newActivity">
          <div
            class="newActivityLeft"
            :style="`background: url('${componentStatus[1]?componentStatus[1].componentContents[0].picture:purchase.bannerUrl}'); background-size: 100% 100%`"
            @click="purchasehandle"
          ></div>
          <div class="newActivityRight">
            <div
              class="phoneEnterprise"
              v-for="(item,index) in   ((activityList[1].activityGoods.length>0?activityList[1].activityGoods:purchase && purchase.assembleGoodsList)||[]).slice(0,2)"
              :key="index"
            >
              <a
                :href="`preemptivePurchase.html?activityId=${ purchase && purchase.activityId}&activityTypeNum=${purchase &&  purchase.activityTypeNum}`"
              >
                <img
                  :src="item.skuImg||item.goodsTypeImgUrl"
                  alt
                  :title="item.goodsName||item.goodsTypeName"
                  width="170px"
                  height="170px"
                />
              </a>
              <div class="text">
                <p class="purchaseone">{{item.goodsName||item.goodsTypeName}}</p>
                <p class="details" @click="goToDetails" style="color: white;">去抢购</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PubSub from "pubsub-js";
import { SHOW_LOGINPOP } from "@/assets/utils/pubsubEvent";
import { isLogin } from "@/assets/utils/utils";
import { preemptivePurchase, fightGroup, activityHome } from "@/api/index";

export default {
  props: ["componentStatus"],
  data() {
    return {
      purchase: '',
      fightGroup: '',
      ispurchase: "",
      isfightGroup: "",
      activityTypeNum: "",
      activityList: [],
      bgcolor1: "linear-gradient(90deg,rgba(255,73,73,1),rgba(255,149,97,1))", // 拼团
      bgcolor2: "linear-gradient(90deg,rgba(88,105,231,1),rgba(121,219,255,1))" // 好货
    };
  },
  methods: {
    // 去详情
    goToDetails() {
      if(this.activityList[0].zoneLink){
        window.location.href = this.activityList[0].zoneLink;
      }else{
        window.location.href = `preemptivePurchase.html?activityId=${this.purchase.activityId}&activityTypeNum=${this.purchase.activityTypeNum}`;
      }
    },

    // 好货跳转
    purchasehandle() {
      if (this.activityList[1].zoneLink) {
        window.location.href = this.activityList[1].zoneLink;
      } else {
        window.location.href = `preemptivePurchase.html?activityId=${this.purchase.activityId}&activityTypeNum=${this.purchase.activityTypeNumber}`;
      }
    },

    // 拼团
    fightGrouphandle() {
      if (this.activityList[0].zoneLink) {
        window.location.href = this.activityList[0].zoneLink;
      } else {
        window.location.href = `fightGroup.html?activityId=${this.fightGroup.activityId}&groupMenber=${this.fightGroup.groupMenber}&activityTypeNum=${this.fightGroup.activityTypeNum}`;
      }
    },
    goToLegation(item) {
      const userInfo = isLogin();
      if (userInfo) {
        const obj = {
          quantity: 1,
          activityGoodsId: item.activityGoodsId,
          groupId: item.groupId,
          activityId: this.fightGroup.activityId,
          activityTypeNum: this.fightGroup.activityTypeNum,
          goodsId: item.goodsId,
          skuId: item.skuId
        };
        localStorage.setItem("justBuyProduct", JSON.stringify(obj));
        window.location.href = "shopping_cart.html?justBuy=true#/address";
      } else {
        // 需要登录
        PubSub.publish(SHOW_LOGINPOP);
      }
    }
  },

  mounted() {
    this.$nextTick(async () => {
      const data = await activityHome();
      if (data.code === 200) {
        data.data.find(item => {
          if (item.activityTypeNum === 9) {
            this.ispurchase = true;
          } else if (item.activityTypeNum === 7) {
            this.isfightGroup = true;
          }
        });
      }
      // 抢先购
      const result = await preemptivePurchase();
      if (result.code === 200) {
        this.purchase = result.data;
      }
      // 拼团
      const res = await fightGroup();
      if (res.code === 200) {
        this.fightGroup = res.data;
      }
    });
    this.componentStatus.forEach(item => {
      this.activityList.push(JSON.parse(item.componentContents[0].content));
    });
  }
};
</script>
<style lang="stylus">
.groupActivityWrap {
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;

  .preemptivePurchase, .groupBuy {
    width: 593px;

    .header {
      width: 100%;
      height: 44px;
      line-height: 44px;
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold;
      color: rgba(255, 255, 255, 1);
      background: linear-gradient(90deg, rgba(88, 105, 231, 1), rgba(121, 219, 255, 1));
      border-radius: 0 30px 0 0;
      font-weight: bold;

      .shandian {
        display: inline-block;
        width: 16px;
        height: 26px;
        background: url('~@/assets/images/groupBuy/shandian.png');
        vertical-align: middle;
        margin-left: 15px;
        margin-right: 9px;
      }
    }

    .newActivity {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 7px;

      .newActivityLeft {
        overflow: hidden;
        text-align: center;
        width: 288px;
        height: 384px;
        background-repeat: no-repeat;
        background-size: 100%;

        .autumn {
          margin-top: 248px;
          text-align: center;
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 14px;
        }

        .goto {
          display: inline-block;
          margin-top: 15px;
          text-align: center;
          width: 101px;
          height: 34px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 34px;
          background: rgba(88, 105, 231, 1);
        }
      }

      .newActivityRight {
        width: 292px;

        .phoneEnterprise, .computerEnterprise {
          background: white;
          display: flex;
          justify-content: space-around;
          width: 100%;
          height: 171px;

          &:nth-child(2) {
            margin-top: 9px;
          }

          .text {
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            p {
              text-align: center;
              &:nth-child(1) {
                margin-top: 28px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: inline-block;
                width: 118px;
                height: 39px;
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
              }

              &:nth-child(2) {
                margin-top: 15px;
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
              }
            }
          }

          img {
            width: 170px;
            height: 170px;
            margin-top: 32px;
          }
        }

        .computerEnterprise {
          margin-top: 9px;

          .text {
            .computer {
              color: rgba(100, 99, 223, 1);
            }
          }

          img {
            width: 170px;
            height: 170px;
          }
        }
      }
    }
  }

  .groupBuy {
    margin-right: 14px;
    .header {
      background: linear-gradient(90deg, rgba(255, 73, 73, 1), rgba(255, 149, 97, 1));
    }

    .newActivity {
      display: flex;
      justify-content: space-between;

      .newActivityLeft {
        background-repeat: no-repeat;
        background-size: 100%;

        .goto {
          background: linear-gradient(90deg, rgba(255, 73, 73, 1), rgba(255, 149, 97, 1));
        }
      }

      .groupBuyRight {
        .phoneEnterprise, .computerEnterprise {
          .text {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-top: 35px;
            height: 170px;

            .miaoshu {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: inline-block;
              width: 118px;
              height: 39px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
            }

            .price {
              margin-top: 12px;

              span {
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);

                &:nth-child(2) {
                  color: rgba(251, 11, 0, 1);
                }

                &:nth-child(3) {
                  text-decoration: line-through;
                }
              }
            }

            .persona {
              margin-top: 13px;
              width: 121px;
              height: 26px;
              line-height: 26px;
              display: flex;

              .personaLeft {
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(251, 11, 0, 1);
                display: inline-block;
                width: 56px;
                height: 26px;
                border: 1px solid rgba(255, 73, 73, 1);
                border-right: none;
                box-sizing: border-box;
              }

              .personaRight {
                cursor: pointer;
                display: inline-block;
                height: 26px;
                width: 64px;
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                background: linear-gradient(90deg, rgba(255, 73, 73, 1), rgba(255, 149, 97, 1));
              }
            }
          }

          img {
            margin-top: 35px;
            width: 170px;
            height: 170px;
          }
        }

        .computerEnterprise {
          img {
            width: 170px;
            height: 170px;
            margin-top: 4px;
          }
        }
      }
    }
  }
}

.gotoGroup {
  display: inline-block;
  margin-top: 13px;
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  background: linear-gradient(90deg, rgba(255, 73, 73, 1), rgba(255, 149, 97, 1));
  color: white;
  cursor: pointer;
}

.purchaseone {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  width: 118px;
  height: 39px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}

.details {
  width: 100px;
  height: 26px;
  line-height: 26px;
  cursor: pointer;
  background: linear-gradient(90deg, #ff4949, #ff9561);
  color: white;
}
</style>
