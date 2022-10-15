<!--
 * @Author      : Mr.bin
 * @Date        : 2022-10-09 11:36:48
 * @LastEditTime: 2022-10-15 11:42:07
 * @Description : 长期趋势测试报告
-->
<template>
  <div
    class="secular-trend-print"
    v-loading.fullscreen.lock="fullscreenLoading"
  >
    <div class="title">
      <div class="text">全身等长肌力测试趋势报告</div>
      <el-image class="logo" :src="logoSrc" fit="scale-down"></el-image>
    </div>

    <div class="divider"></div>

    <div class="info">
      <div class="item">{{ hospital }}</div>
      <div class="item">
        姓名：{{ this.$store.state.currentUserInfo.userName }}
      </div>
      <div class="item">性别：{{ this.$store.state.currentUserInfo.sex }}</div>
      <div class="item">
        出生日期：{{ this.$store.state.currentUserInfo.birthday }}
      </div>
    </div>

    <div class="divider"></div>

    <div class="select select-print">
      <el-select
        v-model="selectValue"
        placeholder="请选择项目"
        @change="handleSelectChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="chart chart-print">
      <div id="chart" :style="{ width: '100%', height: '100%' }"></div>
    </div>

    <!-- 按钮组 -->
    <div class="btn btn-print">
      <el-button type="primary" class="item" @click="handlePrint"
        >保存pdf</el-button
      >
      <el-button type="danger" class="item" @click="handleToRecord"
        >返回</el-button
      >
    </div>
  </div>
</template>

<script>
import { initDB } from '@/db/index.js'

export default {
  name: 'secular-trend-print',

  data() {
    return {
      /* 路由传参 */
      userId: JSON.parse(this.$route.query.userId),

      logoSrc: require('@/assets/img/Company_Logo/logo_1.png'), // 公司logo
      fullscreenLoading: false, // 全屏加载
      hospital: window.localStorage.getItem('hospital')
        ? window.localStorage.getItem('hospital')
        : '未设置所在医院',

      /* 图形相关变量 */
      myChart: null,
      option: {},

      /* 数值相关变量 */
      allData: [], // 该用户的所有测试数据

      cvRearProtractionArray: [],
      cvAnteflexionArray: [],
      oneTimeArray: [],
      cvLeftSideArray: [],
      cvRightSideArray: [],
      twoTimeArray: [],
      tRearProtractionArray: [],
      tAnteflexionArray: [],
      threeTimeArray: [],
      tLeftSideArray: [],
      tRightSideArray: [],
      fourTimeArray: [],
      ulPushArray: [],
      ulPullArray: [],
      fiveTimeArray: [],
      ulLeftAbducentArray: [],
      ulRightAbducentArray: [],
      sixTimeArray: [],
      llAfterLeftOutArray: [],
      llAfterRightOutArray: [],
      sevenTimeArray: [],
      llLeftAbducentArray: [],
      llRightAbducentArray: [],
      eightTimeArray: [],
      llLeftInsideCollectArray: [],
      llRightInsideCollectArray: [],
      nineTimeArray: [],

      /* 选项相关变量 */
      selectValue: '', // 所选的选项
      options: [
        {
          value: 'cvRearProtraction-cvAnteflexion',
          label: '颈椎后伸/前屈'
        },
        {
          value: 'cvLeftSide-cvRightSide',
          label: '颈椎侧屈'
        },
        {
          value: 'tRearProtraction-tAnteflexion',
          label: '躯干后伸/前屈'
        },
        {
          value: 'tLeftSide-tRightSide',
          label: '躯干侧屈'
        },
        {
          value: 'ulPush-ulPull',
          label: '上肢推/拉'
        },
        {
          value: 'ulLeftAbducent-ulRightAbducent',
          label: '上肢外展'
        },
        {
          value: 'llAfterLeftOut-llAfterRightOut',
          label: '下肢后伸'
        },
        {
          value: 'llLeftAbducent-llRightAbducent',
          label: '下肢外展'
        },
        {
          value: 'llLeftInsideCollect-llRightInsideCollect',
          label: '下肢内收'
        }
      ]
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    /**
     * @description: 回到数据记录页
     */
    handleToRecord() {
      this.$router.push({
        path: '/test-record'
      })
    },

    /**
     * @description: 数据获取
     */
    getData() {
      this.fullscreenLoading = true
      const db = initDB()
      db.test_data
        .where({
          userId: this.userId
        })
        .toArray()
        .then(res => {
          this.allData = res
        })
        .then(() => {
          // 颈椎后伸/前屈
          this.cvRearProtractionArray = []
          this.cvAnteflexionArray = []
          this.oneTimeArray = []
          // 颈椎侧屈
          this.cvLeftSideArray = []
          this.cvRightSideArray = []
          this.twoTimeArray = []
          // 躯干后伸/前屈
          this.tRearProtractionArray = []
          this.tAnteflexionArray = []
          this.threeTimeArray = []
          // 躯干侧屈
          this.tLeftSideArray = []
          this.tRightSideArray = []
          this.fourTimeArray = []
          // 上肢推/拉
          this.ulPushArray = []
          this.ulPullArray = []
          this.fiveTimeArray = []
          // 上肢外展
          this.ulLeftAbducentArray = []
          this.ulRightAbducentArray = []
          this.sixTimeArray = []
          // 下肢后伸
          this.llAfterLeftOutArray = []
          this.llAfterRightOutArray = []
          this.sevenTimeArray = []
          // 下肢外展
          this.llLeftAbducentArray = []
          this.llRightAbducentArray = []
          this.eightTimeArray = []
          // 下肢内收
          this.llLeftInsideCollectArray = []
          this.llRightInsideCollectArray = []
          this.nineTimeArray = []

          for (let i = 0; i < this.allData.length; i++) {
            const item = this.allData[i]
            /* 颈椎后伸/前屈 */
            if (
              item.resultValue.cvRearProtraction &&
              item.resultValue.cvAnteflexion
            ) {
              this.cvRearProtractionArray.push(
                item.resultValue.cvRearProtraction
              )
              this.cvAnteflexionArray.push(item.resultValue.cvAnteflexion)
              this.oneTimeArray.push(item.pdfTime)
            }
            /* 颈椎侧屈 */
            if (item.resultValue.cvLeftSide && item.resultValue.cvRightSide) {
              this.cvLeftSideArray.push(item.resultValue.cvLeftSide)
              this.cvRightSideArray.push(item.resultValue.cvRightSide)
              this.twoTimeArray.push(item.pdfTime)
            }
            /* 躯干后伸/前屈 */
            if (
              item.resultValue.tRearProtraction &&
              item.resultValue.tAnteflexion
            ) {
              this.tRearProtractionArray.push(item.resultValue.tRearProtraction)
              this.tAnteflexionArray.push(item.resultValue.tAnteflexion)
              this.threeTimeArray.push(item.pdfTime)
            }
            /* 躯干侧屈 */
            if (item.resultValue.tLeftSide && item.resultValue.tRightSide) {
              this.tLeftSideArray.push(item.resultValue.tLeftSide)
              this.tRightSideArray.push(item.resultValue.tRightSide)
              this.fourTimeArray.push(item.pdfTime)
            }
            /* 上肢推/拉 */
            if (item.resultValue.ulPush && item.resultValue.ulPull) {
              this.ulPushArray.push(item.resultValue.ulPush)
              this.ulPullArray.push(item.resultValue.ulPull)
              this.fiveTimeArray.push(item.pdfTime)
            }
            /* 上肢外展 */
            if (
              item.resultValue.ulLeftAbducent &&
              item.resultValue.ulRightAbducent
            ) {
              this.ulLeftAbducentArray.push(item.resultValue.ulLeftAbducent)
              this.ulRightAbducentArray.push(item.resultValue.ulRightAbducent)
              this.sixTimeArray.push(item.pdfTime)
            }
            /* 下肢后伸 */
            if (
              item.resultValue.llAfterLeftOut &&
              item.resultValue.llAfterRightOut
            ) {
              this.llAfterLeftOutArray.push(item.resultValue.llAfterLeftOut)
              this.llAfterRightOutArray.push(item.resultValue.llAfterRightOut)
              this.sevenTimeArray.push(item.pdfTime)
            }
            /* 下肢外展 */
            if (
              item.resultValue.llLeftAbducent &&
              item.resultValue.llRightAbducent
            ) {
              this.llLeftAbducentArray.push(item.resultValue.llLeftAbducent)
              this.llRightAbducentArray.push(item.resultValue.llRightAbducent)
              this.eightTimeArray.push(item.pdfTime)
            }
            /* 下肢内收 */
            if (
              item.resultValue.llLeftInsideCollect &&
              item.resultValue.llRightInsideCollect
            ) {
              this.llLeftInsideCollectArray.push(
                item.resultValue.llLeftInsideCollect
              )
              this.llRightInsideCollectArray.push(
                item.resultValue.llRightInsideCollect
              )
              this.nineTimeArray.push(item.pdfTime)
            }
          }
        })
        .then(() => {
          this.initChart()
        })
        .catch(err => {
          this.$confirm(`获取表格数据失败，请点击刷新按钮重试！`, '提示', {
            type: 'warning',
            center: true,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            confirmButtonText: '刷 新',
            cancelButtonText: '返回上一页'
          })
            .then(() => {
              this.handleRefresh()
            })
            .catch(() => {
              this.handleToRecord()
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
      this.myChart = this.$echarts.init(document.getElementById('chart'))

      this.option = {
        title: {
          text: '',
          left: 'center',
          textStyle: {
            fontSize: 36
          }
        },
        grid: {
          left: '4%',
          right: '16%'
        },
        xAxis: {
          type: 'category',
          name: '测试日期',
          data: []
        },
        yAxis: {
          type: 'value',
          name: '单位：kg',
          nameGap: 26
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          icon: 'roundRect',
          orient: 'vertical',
          right: '0%',
          top: 'middle',
          itemGap: 30,
          itemWidth: 70,
          itemHeight: 30
        },
        series: [
          {
            name: '',
            data: [],
            type: 'line',
            lineStyle: {
              type: 'dashed'
            },
            smooth: false,
            showSymbol: false
          },
          {
            name: '',
            data: [],
            type: 'line',
            smooth: false,
            showSymbol: false
          }
        ],
        animation: false
      }

      this.myChart.setOption(this.option)
    },

    /**
     * @description: 选中值发生变化时触发
     * @param {String} value 所选值
     */
    handleSelectChange(value) {
      if (value === 'cvRearProtraction-cvAnteflexion') {
        // 颈椎后伸/前屈
        this.option.title.text = '颈椎后伸/前屈'
        this.option.series[0].data = this.cvRearProtractionArray
        this.option.series[0].name = '颈椎后伸'
        this.option.series[1].data = this.cvAnteflexionArray
        this.option.series[1].name = '颈椎前屈'
        this.option.xAxis.data = this.oneTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'cvLeftSide-cvRightSide') {
        // 颈椎侧屈
        this.option.title.text = '颈椎侧屈'
        this.option.series[0].data = this.cvLeftSideArray
        this.option.series[0].name = '颈椎左侧屈'
        this.option.series[1].data = this.cvRightSideArray
        this.option.series[1].name = '颈椎右侧屈'
        this.option.xAxis.data = this.twoTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'tRearProtraction-tAnteflexion') {
        // 躯干后伸/前屈
        this.option.title.text = '躯干后伸/前屈'
        this.option.series[0].data = this.tRearProtractionArray
        this.option.series[0].name = '躯干后伸'
        this.option.series[1].data = this.tAnteflexionArray
        this.option.series[1].name = '躯干前屈'
        this.option.xAxis.data = this.threeTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'tLeftSide-tRightSide') {
        // 躯干侧屈
        this.option.title.text = '躯干侧屈'
        this.option.series[0].data = this.tLeftSideArray
        this.option.series[0].name = '躯干左侧屈'
        this.option.series[1].data = this.tRightSideArray
        this.option.series[1].name = '躯干右侧屈'
        this.option.xAxis.data = this.fourTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'ulPush-ulPull') {
        // 上肢推/拉
        this.option.title.text = '上肢推/拉'
        this.option.series[0].data = this.ulPushArray
        this.option.series[0].name = '上肢推'
        this.option.series[1].data = this.ulPullArray
        this.option.series[1].name = '上肢拉'
        this.option.xAxis.data = this.fiveTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'ulLeftAbducent-ulRightAbducent') {
        // 上肢外展
        this.option.title.text = '上肢外展'
        this.option.series[0].data = this.ulLeftAbducentArray
        this.option.series[0].name = '上肢左外展'
        this.option.series[1].data = this.ulRightAbducentArray
        this.option.series[1].name = '上肢右外展'
        this.option.xAxis.data = this.sixTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'llAfterLeftOut-llAfterRightOut') {
        // 下肢后伸
        this.option.title.text = '下肢后伸'
        this.option.series[0].data = this.llAfterLeftOutArray
        this.option.series[0].name = '下肢左后伸'
        this.option.series[1].data = this.llAfterRightOutArray
        this.option.series[1].name = '下肢右后伸'
        this.option.xAxis.data = this.sevenTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'llLeftAbducent-llRightAbducent') {
        // 下肢外展
        this.option.title.text = '下肢外展'
        this.option.series[0].data = this.llLeftAbducentArray
        this.option.series[0].name = '下肢左外展'
        this.option.series[1].data = this.llRightAbducentArray
        this.option.series[1].name = '下肢右外展'
        this.option.xAxis.data = this.eightTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'llLeftInsideCollect-llRightInsideCollect') {
        // 下肢内收
        this.option.title.text = '下肢内收'
        this.option.series[0].data = this.llLeftInsideCollectArray
        this.option.series[0].name = '下肢左内收'
        this.option.series[1].data = this.llRightInsideCollectArray
        this.option.series[1].name = '下肢右内收'
        this.option.xAxis.data = this.nineTimeArray
        this.myChart.setOption(this.option)
      }
    },

    /**
     * @description: 打印pdf
     */
    handlePrint() {
      window.print()
    },

    /**
     * @description: 刷新页面
     */
    handleRefresh() {
      this.$router.push({
        path: '/refresh',
        query: {
          routerName: JSON.stringify('/secular-trend-print'),
          duration: JSON.stringify(300)
        }
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
  .chart-print {
    margin-top: 130px !important;
  }
  .select-print {
    display: none !important;
  }
}

.secular-trend-print {
  width: 100%;
  height: 100%;
  padding: 20px;
  @include flex(column, stretch, stretch);

  .divider {
    margin-top: 8px;
    border: 1px solid rgb(204, 204, 204);
    width: 100%;
  }

  .title {
    @include flex(row, space-between, center);
    .text {
      font-size: 42px;
    }
    .logo {
      width: 160px;
    }
  }

  .info {
    margin-top: 8px;
    @include flex(row, space-around, center);
    .item {
      font-size: 18px;
    }
  }

  .select {
    margin: 10px 0 0 0;
    @include flex(row, flex-end, center);
  }

  .chart {
    flex: 1;
    margin-top: 30px;
  }

  /* 按钮组 */
  .btn {
    @include flex(row, center, center);
    .item {
      font-size: 30px;
      margin: 0 40px;
    }
  }
}
</style>
