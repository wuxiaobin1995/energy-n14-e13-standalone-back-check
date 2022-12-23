<!--
 * @Author      : Mr.bin
 * @Date        : 2022-12-23 10:18:15
 * @LastEditTime: 2022-12-23 14:43:46
 * @Description : 训练报告-导出PDF
-->
<template>
  <div class="train-pdf" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- PDF区域 -->
    <div id="pdf" class="pdf-wrapper">
      <div class="top">
        <el-image class="logo" :src="logoSrc" fit="scale-down"></el-image>

        <div class="title">{{ pdfData.trainName.split('-')[1] }}-训练报告</div>

        <div class="divider"></div>

        <div class="info-1">
          <div class="item">{{ hospital }}</div>
          <div class="item">姓名：{{ pdfData.userName }}</div>
          <div class="item">性别：{{ pdfData.sex }}</div>
          <div class="item">训练模式：{{ pdfData.type }}</div>
          <div class="item">训练日期：{{ pdfData.pdfTime }}</div>
        </div>

        <div class="info-2">
          <div class="item">
            训练节奏：<span class="rate">{{ pdfData.entadRate }}</span> -
            <span class="rate">{{ pdfData.keepdRate }}</span> -
            <span class="rate">{{ pdfData.offcenterRate }}</span>
          </div>
          <div class="item">单组重复次数：{{ pdfData.frequency }}次</div>
          <div class="item">组数：{{ pdfData.groupCount }}组</div>
          <div class="item">组间隔时长：{{ pdfData.intervalTime }}秒</div>
          <div class="item">训练目标：{{ pdfData.target }}kg</div>
        </div>

        <div class="info-3">
          <div class="item">训练完成度：{{ pdfData.resultRate }}%</div>
          <div>推荐单次训练完成度达到85%以上</div>
        </div>
      </div>

      <!-- 图形 -->
      <div class="chart">
        <div id="chart" :style="{ width: '100%', height: '100%' }"></div>
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="btn">
      <el-button class="item" type="primary" @click="handlePdf"
        >保存PDF</el-button
      >
      <el-button class="item" type="warning" @click="handleGoBack"
        >返 回</el-button
      >
    </div>
  </div>
</template>

<script>
import { initDB } from '@/db/index.js'

export default {
  name: 'train-pdf',

  data() {
    return {
      /* 路由传参 */
      userId: JSON.parse(this.$route.query.userId),
      pdfTime: JSON.parse(this.$route.query.pdfTime),
      routerName: JSON.parse(this.$route.query.routerName),

      /* 图形相关变量 */
      myChart: null,
      option: {},
      xData: [], // 横坐标数组

      fullscreenLoading: false, // 全屏加载
      logoSrc: require('@/assets/img/Company_Logo/logo_1.png'), // 公司商标

      /* 数据相关 */
      pdfData: {
        trainName: ''
      }, // 训练报告源数据
      hospital: window.localStorage.getItem('hospital')
        ? window.localStorage.getItem('hospital')
        : '未设置医院'
    }
  },

  mounted() {
    this.getTrainData()
  },

  methods: {
    /**
     * @description: 获取对应 [ID、训练时间] 的训练报告源数据，并做相关计算
     */
    getTrainData() {
      this.fullscreenLoading = true
      const db = initDB()
      db.train_data
        .where({
          userId: this.userId,
          pdfTime: this.pdfTime
        })
        .toArray()
        .then(res => {
          this.pdfData = res[0]
        })
        .then(() => {
          this.initChart()
        })
        .catch(err => {
          this.$confirm(
            `${err}。获取ID为 [${this.userId}] 的训练数据失败，请重试！`,
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
              this.getTrainData()
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
     * @description: 图形初始化
     */
    initChart() {
      // 参考图形
      const referenceGraph = []
      for (
        let i = 0;
        i < this.pdfData.frequency * this.pdfData.groupCount;
        i++
      ) {
        referenceGraph.push(...this.pdfData.standardGraph)
      }

      // 计算横坐标数组
      this.xData = []
      for (let i = 0; i < referenceGraph.length; i++) {
        this.xData.push(parseFloat((i * 0.1).toFixed(1)))
      }

      this.myChart = this.$echarts.init(document.getElementById('chart'))
      this.option = {
        xAxis: {
          type: 'category',
          name: '秒',
          data: this.xData,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          name: '单位：kg',
          min: 0
        },
        tooltip: {},
        series: [
          {
            data: this.pdfData.weightDataArray,
            type: 'line',
            lineStyle: {
              color: 'rgba(255, 0, 0, 1)'
            },
            smooth: true,
            showSymbol: false
          },
          {
            data: referenceGraph,
            type: 'line',
            smooth: false,
            showSymbol: false,
            lineStyle: {
              // width: 40,
              opacity: 0.8
              // join: 'miter'
            }
          }
        ],
        animation: false
      }

      this.myChart.setOption(this.option)
    },

    /**
     * @description: 保存PDF
     */
    handlePdf() {
      this.$htmlToPdf(
        'pdf',
        `训练报告 ${this.$moment().format('YYYY-MM-DD HH_mm_ss')}`,
        500
      )
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
.train-pdf {
  width: 100vw;
  height: 100vh;
  padding: 10px;
  @include flex(column, stretch, stretch);

  /* PDF区域 */
  .pdf-wrapper {
    flex: 1;
    @include flex(column, stretch, stretch);
    padding: 10px 20px;

    .top {
      position: relative;
      @include flex(column, stretch, center);
      .logo {
        position: absolute;
        top: 6px;
        right: 5px;
        width: 150px;
      }
      .title {
        font-size: 40px;
      }
      .divider {
        margin-top: 10px;
        border: 1px solid rgb(204, 204, 204);
        width: 100%;
      }
      .info-1 {
        width: 100%;
        margin-top: 15px;
        @include flex(row, flex-start, center);
        font-weight: 700;
        .item {
          margin-right: 6%;
          font-size: 20px;
          padding: 4px 10px;
          border: 1px solid #7a7a7a;
          border-radius: 4px;
        }
      }
      .info-2 {
        width: 100%;
        margin-top: 15px;
        @include flex(row, flex-start, center);
        font-weight: 700;
        .item {
          margin-right: 6%;
          font-size: 20px;
        }
        .rate {
          padding: 4px 20px;
          border: 1px solid #7a7a7a;
          border-radius: 4px;
        }
      }
      .info-3 {
        width: 100%;
        margin-top: 15px;
        @include flex(row, flex-start, center);
        .item {
          margin-right: 20px;
          font-size: 20px;
          font-weight: 700;
          padding: 4px 4px;
          border: 1px solid #7a7a7a;
          border-radius: 4px;
          box-shadow: 0 0 4px #0ca814;
        }
      }
    }

    /* 图形 */
    .chart {
      margin-top: 60px;
      flex: 1;
    }
  }

  /* 按钮组 */
  .btn {
    @include flex(row, center, center);
    margin: 20px 0;
    .item {
      font-size: 28px;
      margin: 0 50px;
    }
  }
}
</style>
