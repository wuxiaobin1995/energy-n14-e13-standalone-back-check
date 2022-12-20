<!--
 * @Author      : Mr.bin
 * @Date        : 2022-12-19 09:56:02
 * @LastEditTime: 2022-12-19 17:57:55
 * @Description : 训练-类型选择
-->
<template>
  <div class="train-select">
    <div class="btn">
      <el-button
        class="item"
        :class="[isActiveFeedback]"
        :icon="isActiveFeedback === 'btn__active' ? 'el-icon-circle-check' : ''"
        type="danger"
        round
        @click="handleFeedback"
        >反馈训练</el-button
      >
      <el-button
        class="item"
        :class="[isActiveMuscularEndurance]"
        :icon="
          isActiveMuscularEndurance === 'btn__active'
            ? 'el-icon-circle-check'
            : ''
        "
        type="warning"
        round
        @click="handleMuscularEndurance"
        >肌耐力训练</el-button
      >
      <el-button
        class="item"
        :class="[isActiveMuscularHypertrophy]"
        :icon="
          isActiveMuscularHypertrophy === 'btn__active'
            ? 'el-icon-circle-check'
            : ''
        "
        type="success"
        round
        @click="handleMuscularHypertrophy"
        >肌肥大训练</el-button
      >
    </div>

    <div class="wrapper">
      <transition mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'train-select',

  data() {
    return {
      /* 动态css */
      isActiveFeedback: '',
      isActiveMuscularEndurance: '',
      isActiveMuscularHypertrophy: ''
    }
  },

  watch: {
    '$route.path': {
      handler(newVal, oldval) {
        if (newVal === '/train-select/feedback-set') {
          this.isActiveFeedback = 'btn__active'
        } else {
          this.isActiveFeedback = ''
        }
        if (newVal === '/train-select/muscular-endurance-set') {
          this.isActiveMuscularEndurance = 'btn__active'
        } else {
          this.isActiveMuscularEndurance = ''
        }
        if (newVal === '/train-select/muscular-hypertrophy-set') {
          this.isActiveMuscularHypertrophy = 'btn__active'
        } else {
          this.isActiveMuscularHypertrophy = ''
        }
      },
      immediate: true
    }
  },

  methods: {
    /**
     * @description: 反馈训练
     */
    handleFeedback() {
      this.$router.push({ path: '/train-select/feedback-set' })
    },

    /**
     * @description: 肌耐力训练
     */
    handleMuscularEndurance() {
      this.$router.push({ path: '/train-select/muscular-endurance-set' })
    },

    /**
     * @description: 肌肥大训练
     */
    handleMuscularHypertrophy() {
      this.$router.push({ path: '/train-select/muscular-hypertrophy-set' })
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

.train-select {
  width: 100%;
  height: 100%;
  position: relative;
  @include flex(row, center, center);

  .btn {
    position: absolute;
    left: -16px;
    top: 0;
    margin-top: 13px;
    @include flex(column, stretch, stretch);
    .item {
      margin: 6px 0;
      width: 180px;
      font-size: 22px;
    }
    .btn__active {
      width: 230px;
    }
  }

  .wrapper {
    width: 96%;
    height: 96%;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 20px 20px 20px 198px;
  }
}
</style>
