<!--
 * @Author      : 吴晓斌
 * @Date        : 2021-05-30 12:07:39
 * @LastEditTime: 2022-09-26 10:11:55
 * @Description : 上肢拉-介绍页
-->
<template>
  <div class="container">
    <!-- 左半部 -->
    <div class="left-wrapper">
      <img class="img" src="@/assets/img/Test/introduce/上肢拉.png" />
      <img class="img" src="@/assets/img/Test/introduce/图标说明.png" />
    </div>
    <!-- 右半部 -->
    <div class="right-wrapper">
      <!-- 介绍文本 -->
      <div class="introduce">
        <h2>上肢拉</h2>
        <p>1、在上肢前推测量的基础上，受试者转身，面对P1；</p>
        <p>
          2、手握P1附近的扶手，调整P1，使得受试者保持肩关节外展90度，肘关节屈曲90度；
        </p>
        <p>3、将扶手向后拉，确认可以正常发力即可。</p>
      </div>
      <!-- 按钮 -->
      <div class="btn">
        <el-button
          type="primary"
          icon="el-icon-caret-right"
          class="yes"
          @click="handleTest"
          >开始测试</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ulPull',

  methods: {
    /**
     * @description: 开始测量按钮
     */
    handleTest() {
      this.$router.push({
        path: '/test-measure',
        query: { testName: 'ulPull', chineseName: '上肢拉' }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-wrapper {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img {
      width: 60%;
    }
  }
  .right-wrapper {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .introduce {
      font-size: 20px;
    }
    .btn {
      margin-top: 40px;
      .yes {
        font-size: 26px;
      }
    }
  }
}
</style>
