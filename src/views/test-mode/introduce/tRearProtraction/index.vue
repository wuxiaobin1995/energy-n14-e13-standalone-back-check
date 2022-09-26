<!--
 * @Author      : 吴晓斌
 * @Date        : 2021-05-30 12:07:39
 * @LastEditTime: 2022-09-26 10:11:47
 * @Description : 躯干后伸-介绍页
-->
<template>
  <div class="container">
    <!-- 左半部 -->
    <div class="left-wrapper">
      <img class="img" src="@/assets/img/Test/introduce/躯干后伸.png" />
      <img class="img" src="@/assets/img/Test/introduce/图标说明.png" />
    </div>
    <!-- 右半部 -->
    <div class="right-wrapper">
      <!-- 介绍文本 -->
      <div class="introduce">
        <h2>躯干后伸</h2>
        <p>
          1、如图所示，受试者站在底板中央，腰背挺直，双脚自然分开，调整软垫高度：
        </p>
        <p>- P2与胸骨柄中段平齐，P4与髂前上棘平齐；</p>
        <p>- P1与肩胛骨中段平齐、P3与4等高，P5与腘窝平齐；</p>
        <p>
          2、高度调整完毕之后，确认后方软垫横杆卡槽分别为8、9、13，使得受试者微屈膝，随后将P4向内推动、卡紧，防止出现代偿动作；
        </p>
        <p>3、向后轻压P1，确认可以正常发力即可。</p>
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
  name: 'tRearProtraction',

  methods: {
    /**
     * @description: 开始测量按钮
     */
    handleTest() {
      this.$router.push({
        path: '/test-measure',
        query: { testName: 'tRearProtraction', chineseName: '躯干后伸' }
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
