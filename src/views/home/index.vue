<!--
 * @Author      : Mr.bin
 * @Date        : 2022-09-16 10:42:07
 * @LastEditTime: 2022-12-19 17:58:05
 * @Description : home
-->
<template>
  <div class="home">
    <div class="wrapper">
      <div class="main-photo">
        <el-image class="item0" :src="src0" fit="scale-down"></el-image>
      </div>
      <div class="one">
        <el-image
          class="item item2"
          :src="src2"
          fit="scale-down"
          @click.native="handleClick('src2')"
        ></el-image>
        <el-image
          class="item item3"
          :src="src3"
          fit="scale-down"
          @click.native="handleClick('src3')"
        ></el-image>
      </div>
      <div class="two">
        <el-image
          class="item item1"
          :src="src1"
          fit="scale-down"
          @click.native="handleClick('src1')"
        ></el-image>
        <el-image
          class="item item4"
          :src="src4"
          fit="scale-down"
          @click.native="handleClick('src4')"
        ></el-image>
      </div>

      <!-- 语音相关 -->
      <div class="audio-control">
        <div class="title">语音功能</div>
        <el-switch
          v-model="switchValue"
          active-text="开"
          inactive-text="关"
          @change="handleSwitchChange"
        >
        </el-switch>
      </div>
    </div>

    <!-- 测试确认弹窗 -->
    <el-dialog
      class="dialog"
      :visible.sync="dialogVisibleTest"
      width="30%"
      center
    >
      <div class="title">测试-请确认受试者无以下禁忌症：</div>
      <div class="text">
        <div>- 术后3周内</div>
        <div>- 炎症及肿胀</div>
        <div>- 感染</div>
        <div>- 伤后未进行医学检查</div>
        <div>- 慢性疼痛急性发作</div>
        <div>- 运动或感觉功能异常</div>
        <div>- 不明原因发热</div>
        <div>- 夜间痛、静息痛</div>
        <div>- 恶性肿瘤</div>
        <div>- 颈部淋巴肿大</div>
        <div>- 未解释清楚的创伤、头痛、头晕</div>
      </div>
      <span slot="footer">
        <el-button class="btn" type="success" @click="handleToTestSelect"
          >已确认</el-button
        >
      </span>
    </el-dialog>

    <!-- 训练确认弹窗 -->
    <el-dialog
      class="dialog"
      :visible.sync="dialogVisibleTrain"
      width="30%"
      center
    >
      <div class="title">训练-请确认受试者无以下禁忌症：</div>
      <div class="text">
        <div>- 术后3周内</div>
        <div>- 炎症及肿胀</div>
        <div>- 感染</div>
        <div>- 伤后未进行医学检查</div>
        <div>- 慢性疼痛急性发作</div>
        <div>- 运动或感觉功能异常</div>
        <div>- 不明原因发热</div>
        <div>- 夜间痛、静息痛</div>
        <div>- 恶性肿瘤</div>
        <div>- 颈部淋巴肿大</div>
        <div>- 未解释清楚的创伤、头痛、头晕</div>
      </div>
      <span slot="footer">
        <el-button class="btn" type="success" @click="handleToTrainSelect"
          >已确认</el-button
        >
      </span>
    </el-dialog>

    <!-- 数据记录选择弹窗 -->
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="45%"
      center
      top="35vh"
      :show-close="false"
    >
      <div class="record-select-wrapper">
        <el-button class="btn" type="success" @click="handleGoTestRecord"
          >测试记录</el-button
        >
        <el-button class="btn" type="primary" @click="handleGoTrainRecord"
          >训练记录</el-button
        >
      </div>
    </el-dialog>

    <!-- 打开控制台按钮 -->
    <el-button
      class="btn-control"
      type="info"
      size="mini"
      @click="handleOpenDev"
      >Open Dev</el-button
    >
  </div>
</template>

<script>
/* 用于打开控制台 */
import { remote } from 'electron'

export default {
  name: 'home',

  data() {
    return {
      src0: require('@/assets/img/Home/设备实物.png'),
      src1: require('@/assets/img/Home/用户.png'),
      src2: require('@/assets/img/Home/测试模块.png'),
      src3: require('@/assets/img/Home/训练模块.png'),
      src4: require('@/assets/img/Home/数据记录.png'),

      /* 语音相关 */
      switchValue: null,

      dialogVisibleTest: false, // 进入测试确认弹窗-控制显隐
      dialogVisibleTrain: false, // 进入训练确认弹窗-控制显隐

      centerDialogVisible: false // 数据记录选择弹窗
    }
  },

  created() {
    this.switchValue = this.$store.state.voiceSwitch
  },

  methods: {
    /**
     * @description: 页面跳转
     * @param {String} src
     */
    handleClick(src) {
      if (src === 'src1') {
        this.$router.push({
          path: '/user'
        })
      } else if (src === 'src2') {
        if (this.$store.state.currentUserInfo.userId) {
          this.dialogVisibleTest = true
        } else {
          this.$confirm(
            `检测到您还没有选择用户，请先到用户页面进行选择！`,
            '提示',
            {
              type: 'warning',
              center: true,
              showCancelButton: false,
              confirmButtonText: '确 定'
            }
          )
            .then(() => {
              this.$router.push({
                path: '/user'
              })
            })
            .catch(() => {})
        }
      } else if (src === 'src3') {
        if (this.$store.state.currentUserInfo.userId) {
          this.dialogVisibleTrain = true
        } else {
          this.$confirm(
            `检测到您还没有选择用户，请先到用户页面进行选择！`,
            '提示',
            {
              type: 'warning',
              center: true,
              showCancelButton: false,
              confirmButtonText: '确 定'
            }
          )
            .then(() => {
              this.$router.push({
                path: '/user'
              })
            })
            .catch(() => {})
        }
      } else if (src === 'src4') {
        if (this.$store.state.currentUserInfo.userId) {
          this.centerDialogVisible = true
        } else {
          this.$confirm(
            `检测到您还没有选择用户，请先到用户页面进行选择！`,
            '提示',
            {
              type: 'warning',
              center: true,
              showCancelButton: false,
              confirmButtonText: '确 定'
            }
          )
            .then(() => {
              this.$router.push({
                path: '/user'
              })
            })
            .catch(() => {})
        }
      }
    },

    /**
     * @description: 跳至测试选择页
     */
    handleToTestSelect() {
      this.$router.push({
        path: '/test-select'
      })
    },
    /**
     * @description: 跳至训练选择页
     */
    handleToTrainSelect() {
      this.$router.push({
        path: '/train-position'
      })
    },

    /**
     * @description: 跳转至测试记录页
     */
    handleGoTestRecord() {
      this.$router.push({ path: '/test-record' })
    },
    /**
     * @description: 跳转至训练记录页
     */
    handleGoTrainRecord() {
      this.$router.push({ path: '/train-record' })
    },

    /**
     * @description: 语音开关
     */
    handleSwitchChange() {
      if (this.switchValue === true) {
        this.$store.dispatch('setVoiceSwitch', true)
      } else {
        this.$store.dispatch('setVoiceSwitch', false)
      }
    },

    /**
     * @description: 打开控制台
     */
    handleOpenDev() {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^htpm$/,
        inputErrorMessage: '密码不正确',
        showClose: true,
        closeOnClickModal: false
      })
        .then(() => {
          try {
            remote.getCurrentWebContents().openDevTools()
          } catch (err) {
            this.$message({
              type: 'error',
              message: `打开控制台失败：${err}`
            })
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 86%;
    height: 90%;
    border-radius: 34px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    position: relative;

    .item0 {
      width: 560px;
    }
    .item {
      width: 130px;
    }

    .main-photo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;
    }
    .one {
      margin-top: 80px;
      @include flex(row, center, center);
      .item2 {
        margin-right: 130px;
      }
      .item3 {
        margin-left: 130px;
      }
    }
    .two {
      margin-top: 130px;
      @include flex(row, center, center);
      .item1 {
        margin-right: 380px;
      }
      .item4 {
        margin-left: 380px;
      }
    }

    /* 语音相关 */
    .audio-control {
      @include flex(column, center, center);
      position: absolute;
      left: 30px;
      top: 20px;
      .title {
        margin-bottom: 10px;
        font-size: 22px;
        font-weight: 700;
      }
    }
  }

  /* 确认弹窗 */
  .dialog {
    .title {
      padding-left: 30px;
      margin-bottom: 30px;
      font-size: 28px;
    }
    .text {
      padding-left: 40px;
      font-size: 20px;
    }
    .btn {
      font-size: 24px;
      margin-bottom: 15px;
    }
  }

  /* 数据记录选择弹窗 */
  .record-select-wrapper {
    @include flex(row, space-around, center);
    .btn {
      font-size: 30px;
      margin-bottom: 15px;
    }
  }

  /* 打开控制台按钮 */
  .btn-control {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
