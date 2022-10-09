<!--
 * @Author      : Mr.bin
 * @Date        : 2022-10-09 11:29:24
 * @LastEditTime: 2022-10-09 16:51:08
 * @Description : 测试报告
-->
<template>
  <div class="test-print" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- 颈椎后伸、前屈 -->
    <div
      v-if="
        testData.resultValue.cvRearProtraction &&
        testData.resultValue.cvAnteflexion
      "
      class="wrapper"
    >
      <div class="title">
        <div class="text">全身等长肌力测试报告</div>
        <el-image class="logo" :src="logoSrc" fit="scale-down"></el-image>
      </div>
      <div class="divider"></div>
      <div class="info">
        <div class="item">{{ testData.hospital }}</div>
        <div class="item">姓名：{{ testData.userName }}</div>
        <div class="item">性别：{{ testData.sex }}</div>
        <div class="item">测试日期：{{ testData.pdfTime }}</div>
      </div>
      <div class="divider"></div>
      <div class="main">颈椎后伸、前屈</div>
    </div>

    <!-- 颈椎右侧屈、左侧屈 -->

    <!-- 躯干后伸、前屈 -->

    <!-- 躯干左侧屈、右侧屈 -->

    <!-- 上肢推、拉 -->

    <!-- 上肢左外展、右外展 -->

    <!-- 下肢左后伸、右后伸 -->

    <!-- 下肢左外展、右外展 -->

    <!-- 下肢左内收、右内收 -->

    <div class="wrapper-table">
      <!-- 表格 -->
      <div class="table">表格</div>

      <!-- 按钮组 -->
      <div class="btn-print btn">
        <el-button type="primary" class="item" @click="handlePrint"
          >打 印</el-button
        >
        <el-button type="danger" class="item" @click="handleGoBack"
          >返 回</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { initDB } from '@/db/index.js'

export default {
  name: 'test-print',

  data() {
    return {
      /* 路由传参 */
      userId: JSON.parse(this.$route.query.userId),
      pdfTime: JSON.parse(this.$route.query.pdfTime),
      routerName: JSON.parse(this.$route.query.routerName),

      /* 其他 */
      fullscreenLoading: false, // 全屏加载
      logoSrc: require('@/assets/img/Company_Logo/logo_1.png'), // 公司logo

      // 测试报告源数据
      testData: {
        hospital: '',
        userId: '',
        userName: '',
        sex: '',
        height: '',
        weight: '',
        birthday: '',
        pdfTime: '',
        resultValue: {
          cvRearProtraction: 0, // 颈椎后伸，cervical-vertebra-rearProtraction
          cvAnteflexion: 0, // 颈椎前屈，cervical-vertebra-anteflexion
          cvRightSide: 0, // 颈椎右侧屈，cervical-vertebra-rightSi
          cvLeftSide: 0, // 颈椎左侧屈，cervical-vertebra-leftSide
          tRearProtraction: 0, // 躯干后伸，trunk-rearProtraction
          tAnteflexion: 0, // 躯干前屈，trunk-anteflexion
          tLeftSide: 0, // 躯干左侧屈，trunk-leftSide
          tRightSide: 0, // 躯干右侧屈，trunk-rightSi
          ulPush: 0, // 上肢推，upper-limb-push
          ulPull: 0, // 上肢拉，upper-limb-pull
          ulLeftAbducent: 0, // 上肢左外展，upper-limb-leftAbducent
          ulRightAbducent: 0, // 上肢右外展，upper-limb-rightAbduce
          llAfterLeftOut: 0, // 下肢左后伸，lower-limb-afterLeftOut
          llAfterRightOut: 0, // 下肢右后伸，lower-limb-afterRightOut
          llLeftAbducent: 0, // 下肢左外展，lower-limb-leftAbducent
          llRightAbducent: 0, // 下肢右外展，lower-limb-rightAbducent
          llLeftInsideCollect: 0, // 下肢左内收，lower-limb-leftInsideCollect
          llRightInsideCollect: 0 // 下肢右内收，lower-limb-rightInsideCollect
        }
      },
      age: '' // 化成岁数
    }
  },

  created() {
    this.getTestData()
  },

  methods: {
    /**
     * @description: 获取对应 [ID、测试时间] 的测试报告源数据，并做相关计算
     */
    getTestData() {
      this.fullscreenLoading = true
      const db = initDB()
      db.test_data
        .where({
          userId: this.userId,
          pdfTime: this.pdfTime
        })
        .toArray()
        .then(res => {
          this.testData = res[0]
          this.age = this.$moment().diff(this.testData.birthday, 'years')
        })
        .catch(err => {
          this.$confirm(
            `${err}。获取ID为 [${this.userId}] 的用户数据失败，请重试！`,
            '提示',
            {
              type: 'warning',
              center: true,
              showClose: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              confirmButtonText: '重 试',
              cancelButtonText: '返 回'
            }
          )
            .then(() => {
              this.getTestData()
            })
            .catch(() => {
              this.handleGoBack()
            })
        })
        .finally(() => {
          this.fullscreenLoading = false
        })
    },

    /**
     * @description: 打印报告
     */
    handlePrint() {
      window.print()
    },

    /**
     * @description: 返回上一页
     */
    handleGoBack() {
      this.$router.push({
        path: this.routerName
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* 打印时触发的CSS */
@media print {
  @page {
    // size: portrait; // 纵向打印
    size: landscape; // 横向打印
  }
  .btn-print {
    display: none !important;
  }
}

.test-print {
  width: 100%;

  .wrapper {
    width: 100%;
    height: 100vh;
    @include flex(column, stretch, stretch);

    .title {
      @include flex(row, space-between, center);
      .text {
        font-size: 40px;
      }
      .logo {
        width: 160px;
      }
    }

    .info {
      width: 100%;
      margin-top: 8px;
      @include flex(row, space-around, center);
      .item {
        font-size: 16px;
      }
    }

    .divider {
      margin-top: 8px;
      border: 1px solid rgb(204, 204, 204);
      width: 100%;
    }

    .main {
      flex: 1;
      width: 100%;
    }
  }

  .wrapper-table {
    width: 100%;
    height: 100vh;
    @include flex(column, stretch, stretch);
    .table {
      flex: 1;
    }
    .btn {
      @include flex(row, center, center);
      .item {
        margin: 0 50px;
        font-size: 30px;
      }
    }
  }
}
</style>
