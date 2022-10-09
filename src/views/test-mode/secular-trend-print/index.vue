<!--
 * @Author      : Mr.bin
 * @Date        : 2022-10-09 11:36:48
 * @LastEditTime: 2022-10-09 11:38:02
 * @Description : 长期趋势测试报告
-->
<template>
  <div class="container">
    <!-- 主要区域 -->
    <div class="main-wrapper">
      <!-- 选项栏 -->
      <div class="nav-wrapper">
        <!-- 左半部 -->
        <div class="text-print left">
          <div>用户名：{{ this.$store.state.currentUserInfo.userName }}，</div>
          <div>性别：{{ this.$store.state.currentUserInfo.sex }}</div>
        </div>
        <!-- 右半部 -->
        <div class="no-print right">
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
      </div>
      <!-- 图形 -->
      <div class="chart-print chart-wrapper">
        <div id="chart" :style="{ width: '100%', height: '100%' }"></div>
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="no-print btn-wrapper">
      <el-button type="primary" class="yes" @click="handlePrint"
        >保存pdf</el-button
      >
      <el-button type="danger" class="cancel" @click="handleCancel"
        >返回</el-button
      >
    </div>
  </div>
</template>

<script>
import { initDB } from '@/db/index.js'

export default {
  name: 'secular-trend-pdf',

  data() {
    return {
      /* 数值相关变量 */
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
      allData: [], // 该用户的所有测试数据
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
      ],
      /* 图形相关变量 */
      myChart: null,
      option: {}
    }
  },

  created() {
    this.initData()
  },
  mounted() {
    this.initChart()
  },

  methods: {
    /**
     * @description: 用户数据获取
     */
    initData() {
      const db = initDB()
      db.test_data
        .where({
          userId: this.$store.state.currentUserInfo.userId
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
            // 颈椎后伸/前屈
            if (item.data.cvRearProtraction && item.data.cvAnteflexion) {
              this.cvRearProtractionArray.push(item.data.cvRearProtraction)
              this.cvAnteflexionArray.push(item.data.cvAnteflexion)
              this.oneTimeArray.push(item.pdfTime)
            }
            // 颈椎侧屈
            if (item.data.cvLeftSide && item.data.cvRightSide) {
              this.cvLeftSideArray.push(item.data.cvLeftSide)
              this.cvRightSideArray.push(item.data.cvRightSide)
              this.twoTimeArray.push(item.pdfTime)
            }
            // 躯干后伸/前屈
            if (item.data.tRearProtraction && item.data.tAnteflexion) {
              this.tRearProtractionArray.push(item.data.tRearProtraction)
              this.tAnteflexionArray.push(item.data.tAnteflexion)
              this.threeTimeArray.push(item.pdfTime)
            }
            // 躯干侧屈
            if (item.data.tLeftSide && item.data.tRightSide) {
              this.tLeftSideArray.push(item.data.tLeftSide)
              this.tRightSideArray.push(item.data.tRightSide)
              this.fourTimeArray.push(item.pdfTime)
            }
            // 上肢推/拉
            if (item.data.ulPush && item.data.ulPull) {
              this.ulPushArray.push(item.data.ulPush)
              this.ulPullArray.push(item.data.ulPull)
              this.fiveTimeArray.push(item.pdfTime)
            }
            // 上肢外展
            if (item.data.ulLeftAbducent && item.data.ulRightAbducent) {
              this.ulLeftAbducentArray.push(item.data.ulLeftAbducent)
              this.ulRightAbducentArray.push(item.data.ulRightAbducent)
              this.sixTimeArray.push(item.pdfTime)
            }
            // 下肢后伸
            if (item.data.llAfterLeftOut && item.data.llAfterRightOut) {
              this.llAfterLeftOutArray.push(item.data.llAfterLeftOut)
              this.llAfterRightOutArray.push(item.data.llAfterRightOut)
              this.sevenTimeArray.push(item.pdfTime)
            }
            // 下肢外展
            if (item.data.llLeftAbducent && item.data.llRightAbducent) {
              this.llLeftAbducentArray.push(item.data.llLeftAbducent)
              this.llRightAbducentArray.push(item.data.llRightAbducent)
              this.eightTimeArray.push(item.pdfTime)
            }
            // 下肢内收
            if (
              item.data.llLeftInsideCollect &&
              item.data.llRightInsideCollect
            ) {
              this.llLeftInsideCollectArray.push(item.data.llLeftInsideCollect)
              this.llRightInsideCollectArray.push(
                item.data.llRightInsideCollect
              )
              this.nineTimeArray.push(item.pdfTime)
            }
          }
        })
        .catch(err => {
          this.$message({
            message: `用户数据获取失败：${err}`,
            type: 'error'
          })
        })
    },

    /**
     * @description: 图形初始化
     */
    initChart() {
      this.myChart = this.$echarts.init(document.getElementById('chart'))
      this.option = {
        title: {
          text: '长期趋势报告',
          subtext: '',
          left: 'center',
          textStyle: {
            fontSize: 30
          },
          subtextStyle: {
            fontSize: 16
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
        // tooltip: {
        //   trigger: 'axis'
        // },
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
            smooth: true,
            showSymbol: false
          },
          {
            name: '',
            data: [],
            type: 'line',
            smooth: true,
            showSymbol: false
          },
          {
            name: '',
            data: [],
            type: 'line',
            smooth: true,
            showSymbol: false
          }
        ]
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
        this.option.title.subtext = '颈椎后伸/前屈'
        this.option.series[0].data = this.cvRearProtractionArray
        this.option.series[0].name = '颈椎后伸'
        this.option.series[1].data = this.cvAnteflexionArray
        this.option.series[1].name = '颈椎前屈'
        let recommendArray = []
        if (this.$store.state.currentUserInfo.sex === '男') {
          recommendArray = this.cvAnteflexionArray.map(item =>
            parseFloat((item * 1.4).toFixed(2))
          )
        } else {
          recommendArray = this.cvAnteflexionArray.map(item =>
            parseFloat((item * 1.7).toFixed(2))
          )
        }
        this.option.series[2].data = recommendArray
        this.option.series[2].name = '后伸推荐值'
        this.option.xAxis.data = this.oneTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'cvLeftSide-cvRightSide') {
        // 颈椎侧屈
        this.option.title.subtext = '颈椎侧屈'
        this.option.series[0].data = this.cvLeftSideArray
        this.option.series[0].name = '颈椎左侧屈'
        this.option.series[1].data = this.cvRightSideArray
        this.option.series[1].name = '颈椎右侧屈'
        this.option.series[2].data = []
        this.option.series[2].name = ''
        this.option.xAxis.data = this.twoTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'tRearProtraction-tAnteflexion') {
        // 躯干后伸/前屈
        this.option.title.subtext = '躯干后伸/前屈'
        this.option.series[0].data = this.tRearProtractionArray
        this.option.series[0].name = '躯干后伸'
        this.option.series[1].data = this.tAnteflexionArray
        this.option.series[1].name = '躯干前屈'
        let recommendArray = []
        if (this.$store.state.currentUserInfo.sex === '男') {
          recommendArray = this.tAnteflexionArray.map(item =>
            parseFloat((item * 1.3).toFixed(2))
          )
        } else {
          recommendArray = this.cvAnteflexionArray.map(item =>
            parseFloat((item * 1.5).toFixed(2))
          )
        }
        this.option.series[2].data = recommendArray
        this.option.series[2].name = '后伸推荐值'
        this.option.xAxis.data = this.threeTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'tLeftSide-tRightSide') {
        // 躯干侧屈
        this.option.title.subtext = '躯干侧屈'
        this.option.series[0].data = this.tLeftSideArray
        this.option.series[0].name = '躯干左侧屈'
        this.option.series[1].data = this.tRightSideArray
        this.option.series[1].name = '躯干右侧屈'
        this.option.series[2].data = []
        this.option.series[2].name = ''
        this.option.xAxis.data = this.fourTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'ulPush-ulPull') {
        // 上肢推/拉
        this.option.title.subtext = '上肢推/拉'
        this.option.series[0].data = this.ulPushArray
        this.option.series[0].name = '上肢推'
        this.option.series[1].data = this.ulPullArray
        this.option.series[1].name = '上肢拉'
        let recommendArray = this.ulPullArray.map(item =>
          parseFloat((item * 1.5).toFixed(2))
        )
        this.option.series[2].data = recommendArray
        this.option.series[2].name = '上肢推的推荐值'
        this.option.xAxis.data = this.fiveTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'ulLeftAbducent-ulRightAbducent') {
        // 上肢外展
        this.option.title.subtext = '上肢外展'
        this.option.series[0].data = this.ulLeftAbducentArray
        this.option.series[0].name = '上肢左外展'
        this.option.series[1].data = this.ulRightAbducentArray
        this.option.series[1].name = '上肢右外展'
        this.option.series[2].data = []
        this.option.series[2].name = ''
        this.option.xAxis.data = this.sixTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'llAfterLeftOut-llAfterRightOut') {
        // 下肢后伸
        this.option.title.subtext = '下肢后伸'
        this.option.series[0].data = this.llAfterLeftOutArray
        this.option.series[0].name = '下肢左后伸'
        this.option.series[1].data = this.llAfterRightOutArray
        this.option.series[1].name = '下肢右后伸'
        this.option.series[2].data = []
        this.option.series[2].name = ''
        this.option.xAxis.data = this.sevenTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'llLeftAbducent-llRightAbducent') {
        // 下肢外展
        this.option.title.subtext = '下肢外展'
        this.option.series[0].data = this.llLeftAbducentArray
        this.option.series[0].name = '下肢左外展'
        this.option.series[1].data = this.llRightAbducentArray
        this.option.series[1].name = '下肢右外展'
        this.option.series[2].data = []
        this.option.series[2].name = ''
        this.option.xAxis.data = this.eightTimeArray
        this.myChart.setOption(this.option)
      } else if (value === 'llLeftInsideCollect-llRightInsideCollect') {
        // 下肢内收
        this.option.title.subtext = '下肢内收'
        this.option.series[0].data = this.llLeftInsideCollectArray
        this.option.series[0].name = '下肢左内收'
        this.option.series[1].data = this.llRightInsideCollectArray
        this.option.series[1].name = '下肢右内收'
        this.option.series[2].data = []
        this.option.series[2].name = ''
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
     * @description: 返回数据记录页
     */
    handleCancel() {
      this.$router.push({ path: '/record' })
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
  .no-print {
    display: none !important;
  }
  .chart-print {
    margin-top: 130px !important;
  }
  .text-print {
    font-size: 36px !important;
  }
}

.container {
  width: 100vw;
  height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;

  /* 主要区域 */
  .main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    // 选项栏
    .nav-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        margin-left: 40px;
        font-size: 24px;
      }
      .right {
        margin-right: 40px;
      }
    }
    // 图形
    .chart-wrapper {
      width: 90%;
      margin-top: 40px;
      flex: 1;
    }
  }

  /* 按钮组 */
  .btn-wrapper {
    display: flex;
    justify-content: center;
    .yes {
      font-size: 30px;
      margin-right: 40px;
    }
    .cancel {
      font-size: 30px;
      margin-left: 40px;
    }
  }
}
</style>
