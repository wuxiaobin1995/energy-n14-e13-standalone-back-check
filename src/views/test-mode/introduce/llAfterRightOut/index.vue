<!--
 * @Author      : 吴晓斌
 * @Date        : 2021-05-30 12:07:39
 * @LastEditTime: 2022-09-26 10:11:28
 * @Description : 下肢右后伸-介绍页
-->
<template>
  <div class="container">
    <!-- 左半部 -->
    <div class="left-wrapper">
      <img class="img" src="@/assets/img/Test/introduce/下肢右后伸.png" />
      <img class="img" src="@/assets/img/Test/introduce/图标说明.png" />
    </div>
    <!-- 右半部 -->
    <div class="right-wrapper">
      <!-- 介绍文本 -->
      <div class="introduce">
        <h2>下肢右后伸</h2>
        <p>1、受试者向左侧迈步，使得P2位于右侧腘窝上方；</p>
        <p>2、双手轻扶P1扶手，向后轻压P2，确认可以正常发力即可。</p>
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
  name: 'llAfterRightOut',

  methods: {
    /**
     * @description: 开始测量按钮
     */
    handleTest() {
      this.$router.push({
        path: '/test-measure',
        query: { testName: 'llAfterRightOut', chineseName: '下肢右后伸' }
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
