<!--
 * @Author      : Mr.bin
 * @Date        : 2022-12-19 17:56:27
 * @LastEditTime: 2022-12-21 09:57:22
 * @Description : 训练-部位选择
-->
<template>
  <div class="train-position">
    <div class="wrapper">
      <div class="title">请选择训练部位</div>

      <div class="main">
        <el-radio-group
          class="radio-group"
          v-model="position"
          @input="handleChange"
        >
          <div class="row">
            <el-radio class="item" label="cvRearProtraction-颈椎后伸" border
              >颈椎后伸</el-radio
            >
            <el-radio class="item" label="cvAnteflexion-颈椎前屈" border
              >颈椎前屈</el-radio
            >
            <el-radio class="item" label="cvRightSide-颈椎右侧屈" border
              >颈椎右侧屈</el-radio
            >
            <el-radio class="item" label="cvLeftSide-颈椎左侧屈" border
              >颈椎左侧屈</el-radio
            >
            <el-radio class="item" label="tRearProtraction-躯干后伸" border
              >躯干后伸</el-radio
            >
            <el-radio class="item" label="tAnteflexion-躯干前屈" border
              >躯干前屈</el-radio
            >
          </div>

          <div class="row">
            <el-radio class="item" label="tLeftSide-躯干左侧屈" border
              >躯干左侧屈</el-radio
            >
            <el-radio class="item" label="tRightSide-躯干右侧屈" border
              >躯干右侧屈</el-radio
            >
            <el-radio class="item" label="ulPush-上肢推" border
              >上肢推</el-radio
            >
            <el-radio class="item" label="ulPull-上肢拉" border
              >上肢拉</el-radio
            >
            <el-radio class="item" label="ulLeftAbducent-上肢左外展" border
              >上肢左外展</el-radio
            >
            <el-radio class="item" label="ulRightAbducent-上肢右外展" border
              >上肢右外展</el-radio
            >
          </div>

          <div class="row">
            <el-radio class="item" label="llAfterLeftOut-下肢左后伸" border
              >下肢左后伸</el-radio
            >
            <el-radio class="item" label="llAfterRightOut-下肢右后伸" border
              >下肢右后伸</el-radio
            >
            <el-radio class="item" label="llLeftAbducent-下肢左外展" border
              >下肢左外展</el-radio
            >
            <el-radio class="item" label="llRightAbducent-下肢右外展" border
              >下肢右外展</el-radio
            >
            <el-radio class="item" label="llLeftInsideCollect-下肢左内收" border
              >下肢左内收</el-radio
            >
            <el-radio
              class="item"
              label="llRightInsideCollect-下肢右内收"
              border
              >下肢右内收</el-radio
            >
          </div>
        </el-radio-group>

        <div class="show-img">
          <div class="text">部位示意图</div>
          <el-image class="img" :src="imgSrc" fit="scale-down"></el-image>
        </div>
      </div>

      <div class="btn">
        <el-button class="item" type="primary" @click="handleTrain"
          >确 认</el-button
        >
        <el-button class="item" type="danger" @click="handleToHome"
          >返回首页</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'train-position',

  data() {
    return {
      imgSrc: require('@/assets/img/Train/Position/颈椎_后伸前屈.png'),
      imgSrc1: require('@/assets/img/Train/Position/颈椎_后伸前屈.png'),
      imgSrc2: require('@/assets/img/Train/Position/颈椎_侧屈.png'),
      imgSrc3: require('@/assets/img/Train/Position/躯干_后伸前屈.png'),
      imgSrc4: require('@/assets/img/Train/Position/躯干_侧屈.png'),
      imgSrc5: require('@/assets/img/Train/Position/上肢_推拉.png'),
      imgSrc6: require('@/assets/img/Train/Position/上肢_外展.png'),
      imgSrc7: require('@/assets/img/Train/Position/下肢_后伸.png'),
      imgSrc8: require('@/assets/img/Train/Position/下肢_外展.png'),
      imgSrc9: require('@/assets/img/Train/Position/下肢_内收.png'),

      position: 'cvRearProtraction-颈椎后伸'
    }
  },

  created() {
    // 初始化训练部位选择
    this.$store.dispatch('changeTrainPosition', '')
  },

  methods: {
    /**
     * @description: 绑定值变化时触发的事件，用于动态改变示意图显示
     * @param {String} value 选中的 Radio label 值
     */
    handleChange(value) {
      if (
        value === 'cvRearProtraction-颈椎后伸' ||
        value === 'cvAnteflexion-颈椎前屈'
      ) {
        this.imgSrc = this.imgSrc1
      } else if (
        value === 'cvRightSide-颈椎右侧屈' ||
        value === 'cvLeftSide-颈椎左侧屈'
      ) {
        this.imgSrc = this.imgSrc2
      } else if (
        value === 'tRearProtraction-躯干后伸' ||
        value === 'tAnteflexion-躯干前屈'
      ) {
        this.imgSrc = this.imgSrc3
      } else if (
        value === 'tLeftSide-躯干左侧屈' ||
        value === 'tRightSide-躯干右侧屈'
      ) {
        this.imgSrc = this.imgSrc4
      } else if (value === 'ulPush-上肢推' || value === 'ulPull-上肢拉') {
        this.imgSrc = this.imgSrc5
      } else if (
        value === 'ulLeftAbducent-上肢左外展' ||
        value === 'ulRightAbducent-上肢右外展'
      ) {
        this.imgSrc = this.imgSrc6
      } else if (
        value === 'llAfterLeftOut-下肢左后伸' ||
        value === 'llAfterRightOut-下肢右后伸'
      ) {
        this.imgSrc = this.imgSrc7
      } else if (
        value === 'llLeftAbducent-下肢左外展' ||
        value === 'llRightAbducent-下肢右外展'
      ) {
        this.imgSrc = this.imgSrc8
      } else if (
        value === 'llLeftInsideCollect-下肢左内收' ||
        value === 'llRightInsideCollect-下肢右内收'
      ) {
        this.imgSrc = this.imgSrc9
      }
    },

    /**
     * @description: 开始训练
     */
    handleTrain() {
      if (this.position) {
        this.$store.dispatch('changeTrainPosition', this.position)
        const trainPositionArray = this.$store.state.trainPosition.split('-')
        this.$router.push({
          path: '/train-' + trainPositionArray[0]
        })
      } else {
        this.$alert('训练部位不能为空，请选择训练部位！', '提示', {
          type: 'warning',
          center: true,
          confirmButtonText: '确定',
          showConfirmButton: false,
          closeOnClickModal: true,
          callback: () => {}
        })
      }
    },

    /**
     * @description: 返回首页
     */
    handleToHome() {
      this.$router.push({
        path: '/home'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.train-position {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 86%;
    height: 90%;
    border-radius: 34px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 20px 40px;
    @include flex(column, stretch, stretch);

    .title {
      font-size: 36px;
      font-weight: 700;
    }

    .main {
      flex: 1;
      @include flex(row, space-between, center);
      .radio-group {
        .row {
          margin: 70px 0;
          .item {
            width: 120px;
            height: 80px;
            font-size: 35px;
            font-weight: 700;
          }
        }
      }

      .show-img {
        @include flex(column, center, center);
        .text {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .img {
          width: 300px;
          box-shadow: 0 0 8px #0ca814;
        }
      }
    }

    .btn {
      @include flex(row, center, center);
      .item {
        font-size: 28px;
        margin: 0 50px;
      }
    }
  }
}
</style>
