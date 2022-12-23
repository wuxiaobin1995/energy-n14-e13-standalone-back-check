<!--
 * @Author      : Mr.bin
 * @Date        : 2022-12-19 10:00:41
 * @LastEditTime: 2022-12-23 10:36:13
 * @Description : 肌耐力训练-参数设置
-->
<template>
  <div class="muscular-endurance-set">
    <div class="left">
      <!-- 介绍说明 -->
      <div class="introduce">
        <div class="item">训练部位：{{ trainPosition.split('-')[1] }}</div>
        <div class="item">
          训练推荐：最大力量的50%，重复10次，训练3组，每组休息45秒。
        </div>
      </div>
      <!-- 示意图 -->
      <el-image class="img" :src="imgSrc" fit="scale-down"></el-image>
    </div>

    <div class="right">
      <!-- 参数设置 -->
      <div class="set">
        <el-image class="set-img" :src="setBgSrc" fit="scale-down"></el-image>
        <div class="set-item item1">
          <span>单组重复次数：</span>
          <el-input-number
            v-model="frequency"
            :min="1"
            :max="30"
            :precision="0"
          ></el-input-number>
        </div>
        <div class="set-item item2">
          <span>组数：</span>
          <el-input-number
            v-model="groupCount"
            :min="1"
            :max="10"
            :precision="0"
          ></el-input-number>
        </div>
        <div class="set-item item3">
          <span>组间隔时长(s)：</span>
          <el-input-number
            v-model="intervalTime"
            :min="10"
            :max="120"
            :precision="0"
          ></el-input-number>
        </div>
        <div class="set-item item4">
          <span>训练目标(kg)：</span>
          <el-input-number
            v-model="target"
            :min="10"
            :max="1000"
            :precision="0"
          ></el-input-number>
        </div>
        <div class="set-item item5">
          <span>向心比：</span>
          <el-input-number
            v-model="entadRate"
            :min="1"
            :max="10"
            :precision="0"
          ></el-input-number>
        </div>
        <div class="set-item item6">
          <span>等长比：</span>
          <el-input-number
            v-model="keepdRate"
            :min="0"
            :max="10"
            :precision="0"
          ></el-input-number>
        </div>
        <div class="set-item item7">
          <span>离心比：</span>
          <el-input-number
            v-model="offcenterRate"
            :min="1"
            :max="10"
            :precision="0"
          ></el-input-number>
        </div>
      </div>
      <!-- 按钮组 -->
      <div class="btn">
        <el-button
          class="item"
          type="success"
          plain
          icon="el-icon-video-play"
          @click="handleStart"
          >开始训练</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { initDB } from '@/db/index.js'

export default {
  name: 'muscular-endurance-set',

  data() {
    return {
      imgSrc: require('@/assets/img/Train/Set/通用示例图.png'),
      setBgSrc: require('@/assets/img/Train/Set/参数设置背景.png'),

      trainPosition: this.$store.state.trainPosition, // 训练部位，格式如'cvRearProtraction-颈椎后伸'

      frequency: 10, // 单组重复次数（1~30）
      groupCount: 3, // 组数（1~10）
      intervalTime: 45, // 组间隔时长（10~120）（秒）（即休息时长）
      target: 10, // 训练目标（kg）（训练目标不能低于10kg）
      entadRate: 2, // 向心比（1~10）
      keepdRate: 0, // 等长比（0~10）
      offcenterRate: 2 // 离心比（1~10）
    }
  },

  created() {
    this.getTargetData()
  },

  methods: {
    /**
     * @description: 获取推荐训练目标函数
     */
    getTargetData() {
      const db = initDB()
      db.test_data
        .where({
          userId: this.$store.state.currentUserInfo.userId
        })
        .toArray()
        .then(res => {
          const len = res.length
          const trainPositionEn = this.trainPosition.split('-')[0]
          if (len) {
            if (res[len - 1].resultValue[trainPositionEn]) {
              this.target = parseInt(
                (res[len - 1].resultValue[trainPositionEn] * 0.5).toFixed(0)
              )
              // 训练目标不能低于10kg
              if (this.target < 10) {
                this.target = 10
              }
            } else {
              this.target = 10
            }
          } else {
            this.target = 10
          }
        })
        .catch(err => {
          this.$confirm(
            `获取推荐训练目标值失败，点击"重试"或"使用默认值"！`,
            '提示',
            {
              type: 'warning',
              center: true,
              showClose: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              confirmButtonText: '重 试',
              cancelButtonText: '使用默认值(10kg)'
            }
          )
            .then(() => {
              this.getTargetData()
            })
            .catch(() => {
              this.target = 10
            })
        })
    },

    /**
     * @description: 开始训练
     */
    handleStart() {
      this.$router.push({
        path: '/train-measure',
        query: {
          frequency: JSON.stringify(this.frequency),
          groupCount: JSON.stringify(this.groupCount),
          intervalTime: JSON.stringify(this.intervalTime),
          target: JSON.stringify(this.target),
          entadRate: JSON.stringify(this.entadRate),
          keepdRate: JSON.stringify(this.keepdRate),
          offcenterRate: JSON.stringify(this.offcenterRate),
          type: JSON.stringify('肌耐力训练'),
          trainName: JSON.stringify(this.trainPosition),
          routerName: JSON.stringify('/train-select/muscular-endurance-set')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.muscular-endurance-set {
  width: 100%;
  height: 100%;
  @include flex(row, space-between, stretch);

  .left {
    flex: 1;
    .introduce {
      .item {
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
    .img {
      margin-top: 50px;
    }
  }

  .right {
    width: 33%;
    @include flex(column, center, center);
    .set {
      position: relative;
      @include flex(row, center, center);
      .set-img {
        width: 100%;
      }
      .set-item {
        width: 78%;
        position: absolute;
        @include flex(row, space-between, center);
      }
      .item1 {
        top: 15%;
      }
      .item2 {
        top: 25%;
      }
      .item3 {
        top: 35%;
      }
      .item4 {
        top: 45%;
      }
      .item5 {
        top: 55%;
      }
      .item6 {
        top: 65%;
      }
      .item7 {
        top: 75%;
      }
    }
    .btn {
      @include flex(column, center, stretch);
      width: 66%;
      .item {
        font-size: 34px;
      }
    }
  }
}
</style>
