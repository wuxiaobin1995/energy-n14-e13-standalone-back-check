<!--
 * @Author      : Mr.bin
 * @Date        : 2022-12-19 09:45:12
 * @LastEditTime: 2022-12-19 10:23:01
 * @Description : 训练-数据记录
-->
<template>
  <div class="train-record">
    <div class="wrapper">
      <div class="btn">
        <el-button
          class="item"
          type="danger"
          round
          plain
          @click="handleFeedback"
          >反馈训练</el-button
        >
        <el-button
          class="item"
          type="warning"
          round
          plain
          @click="handleMuscularEndurance"
          >肌耐力训练</el-button
        >
        <el-button
          class="item"
          type="success"
          round
          plain
          @click="handleMuscleHypertrophy"
          >肌肥大训练</el-button
        >
      </div>

      <div class="divider"></div>

      <transition mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'train-record',

  methods: {
    /**
     * @description: 反馈训练
     */
    handleFeedback() {
      this.$router.push({ path: '/train-record/feedback' })
    },

    /**
     * @description: 肌耐力训练
     */
    handleMuscularEndurance() {
      this.$router.push({ path: '/train-record/muscular-endurance' })
    },

    /**
     * @description: 肌肥大训练
     */
    handleMuscleHypertrophy() {
      this.$router.push({ path: '/train-record/muscle-hypertrophy' })
    }
  }
}
</script>

<style lang="scss" scoped>
/* 路由过渡动效 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}

.train-record {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 96%;
    height: 94%;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 20px;

    .btn {
      @include flex(row, space-around, center);
      .item {
        width: 180px;
        font-size: 22px;
      }
    }

    .divider {
      margin-top: 20px;
      border: 1px solid rgb(204, 204, 204);
      width: 100%;
    }
  }
}
</style>
