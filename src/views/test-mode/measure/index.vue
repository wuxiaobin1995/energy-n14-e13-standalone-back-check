<!--
 * @Author      : Mr.bin
 * @Date        : 2022-09-27 16:51:05
 * @LastEditTime: 2022-12-21 17:20:00
 * @Description : 测试具体测量
-->
<template>
  <div class="test-measure">
    <div class="wrapper">
      <el-page-header
        class="page"
        title="返回"
        :content="chineseName"
        @back="handleGoBack"
      ></el-page-header>

      <div class="left">
        <!-- 图形 -->
        <div class="chart">
          <div id="chart" :style="{ width: '100%', height: '100%' }"></div>
        </div>
        <!-- 按钮 -->
        <div class="btn">
          <el-button
            class="item"
            type="success"
            round
            icon="el-icon-video-play"
            :disabled="testValueArray.length === 3 || isStart ? true : false"
            @click="handleStart"
            >开始测量</el-button
          >
        </div>
      </div>

      <div class="divider"></div>

      <div class="right">
        <!-- 倒计时 -->
        <div class="time">
          <el-image class="img" :src="timeBgSrc" fit="scale-down"></el-image>
          <div class="text">倒计时</div>
          <div class="value">{{ time }}</div>
        </div>

        <!-- 测量结果 -->
        <div class="result">
          <el-image :src="testValueSrc" fit="scale-down"></el-image>
          <div class="title">测量数值</div>
          <div class="item1">
            <el-input class="value" v-model="testValueArray[0]" disabled>
              <template slot="prepend">1</template>
            </el-input>
          </div>
          <div class="item2">
            <el-input class="value" v-model="testValueArray[1]" disabled>
              <template slot="prepend">2</template>
            </el-input>
          </div>
          <div class="item3">
            <el-input class="value" v-model="testValueArray[2]" disabled>
              <template slot="prepend">3</template>
            </el-input>
          </div>
          <el-button
            class="confirm-btn"
            type="success"
            round
            :disabled="testValueArray.length === 3 ? false : true"
            @click="handleFinish"
            >{{
              this.$store.state.selectResult.length === 1
                ? '查看报告'
                : '下一项'
            }}</el-button
          >
        </div>

        <!-- 其他按钮组 -->
        <div class="btn">
          <el-button
            class="item"
            type="danger"
            round
            icon="el-icon-circle-close"
            :disabled="!isStart"
            @click="handleOver"
            >结束测量</el-button
          >
          <el-button
            class="item"
            type="warning"
            round
            icon="el-icon-refresh-right"
            :disabled="!isRestart"
            @click="handleRestart"
            >重新测量</el-button
          >
          <el-button
            class="item"
            type="primary"
            round
            icon="el-icon-loading"
            @click="handleRefresh"
            >刷 新</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* 串口通信库 */
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

/* 数据库 */
import { initDB } from '@/db/index.js'

export default {
  name: 'test-measure',

  data() {
    return {
      /* 路由传参 */
      testName: JSON.parse(this.$route.query.testName),
      chineseName: JSON.parse(this.$route.query.chineseName),

      timeBgSrc: require('@/assets/img/Test/Measure/倒计时背景.png'), // 倒计时背景
      testValueSrc: require('@/assets/img/Test/Measure/测量数值背景.png'), // 测量数值背景

      /* 按钮禁用控制 */
      isStart: false,
      isRestart: false,

      /* 串口相关变量 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200, // 默认波特率115200

      /* 图形相关变量 */
      myChart: null,
      option: {},
      xData: [], // 横坐标数组

      /* 其他 */
      timeClock: null, // 计时器
      time: 10, // 倒计时10秒
      useP1: [
        'cvRearProtraction',
        'cvAnteflexion',
        'cvRightSide',
        'cvLeftSide',
        'tRearProtraction',
        'ulPush',
        'ulPull'
      ], // 使用P1的测试项目
      useP2: [
        'tAnteflexion',
        'tLeftSide',
        'tRightSide',
        'ulLeftAbducent',
        'ulRightAbducent',
        'llAfterLeftOut',
        'llAfterRightOut',
        'llLeftAbducent',
        'llRightAbducent',
        'llLeftInsideCollect',
        'llRightInsideCollect'
      ], // 使用P2的测试项目
      oneK: 0, // P1的K
      twoK: 0, // P2的K
      oneStandard: 0, // P1调零值
      twoStandard: 0, // P2调零值
      oneWeight: 0, // P1负重（kg），精确到0.01kg
      twoWeight: 0, // P2负重（kg），精确到0.01kg
      oneWeightArray: [], // P1负重数组
      twoWeightArray: [], // P2负重数组

      /* 结果相关 */
      testValueArray: [], // 该项目测量值数组
      testResult: 0 // 该项目最终测量结果（取三次的最大值），kg
    }
  },

  created() {
    this.oneK = parseFloat(window.localStorage.getItem('oneK'))
    this.twoK = parseFloat(window.localStorage.getItem('twoK'))
    this.oneStandard = this.$store.state.zeroStandard.oneStandard
    this.twoStandard = this.$store.state.zeroStandard.twoStandard

    this.initSerialPort()
  },
  mounted() {
    this.initChart()
    // 监听父容器的宽高变化，目的是实现echarts图形自适应父容器的宽高变化
    window.addEventListener('resize', this.resizeCharts)
  },
  beforeDestroy() {
    // 清除计时器
    if (this.timeClock) {
      clearInterval(this.timeClock)
    }
    // 关闭串口
    if (this.usbPort) {
      if (this.usbPort.isOpen) {
        this.usbPort.close()
      }
    }
    // 注销echarts图形自适应监听事件
    window.removeEventListener('resize', this.resizeCharts)
  },

  methods: {
    /**
     * @description: 回到项目选择页面
     */
    handleGoBack() {
      this.$router.push({
        path: '/test-select'
      })
    },

    /**
     * @description: 初始化串口对象
     */
    initSerialPort() {
      SerialPort.list()
        .then(ports => {
          /* 遍历设备的USB串口，目标设备需安装驱动 */
          let comPath = ''
          for (const port of ports) {
            if (/^USB/.test(port.pnpId)) {
              comPath = port.path
              break
            }
          }

          /* 验证USB有没有连接到电脑，但不能验证有无数据发送给上位机 */
          if (comPath) {
            /**
             * @description: 创建串口实例
             * @param {String} comPath 串行端口的系统路径。例如：在Mac、Linux上的/dev/tty.XXX或Windows上的COM1
             * @param {Object} 配置项
             */
            this.usbPort = new SerialPort(comPath, {
              baudRate: this.scmBaudRate, // 默认波特率115200
              autoOpen: false // 是否自动开启串口
            })
            /* 调用 this.usbPort.open() 成功时触发（开启串口成功） */
            this.usbPort.on('open', () => {})
            /* 调用 this.usbPort.open() 失败时触发（开启串口失败） */
            this.usbPort.on('error', () => {
              if (this.timeClock) {
                clearInterval(this.timeClock)
              }
              this.time = 10

              this.$alert(
                `请重新连接USB线，然后点击"刷新页面"按钮！`,
                '串口开启失败',
                {
                  type: 'error',
                  showClose: false,
                  center: true,
                  confirmButtonText: '刷新页面',
                  callback: () => {
                    this.handleRefresh()
                  }
                }
              )
            })

            this.parser = this.usbPort.pipe(new Readline({ delimiter: '\n' }))
            this.parser.on('data', data => {
              // console.log(data) // {String} 00326740032826,125

              /* 计算P1、P2负重 */
              this.oneWeight = parseFloat(
                (
                  (parseInt(data.slice(2, 7)) - this.oneStandard) /
                  -this.oneK
                ).toFixed(1)
              )
              this.twoWeight = parseFloat(
                (
                  (parseInt(data.slice(9, 14)) - this.twoStandard) /
                  -this.twoK
                ).toFixed(1)
              )
              if (this.oneWeight < 0) {
                this.oneWeight = 0
              }
              if (this.twoWeight < 0) {
                this.twoWeight = 0
              }

              /* 数据校验 */
              if (!isNaN(this.oneWeight) && !isNaN(this.twoWeight)) {
                /* 过滤掉突变值 */
                if (this.oneWeight <= 200 && this.twoWeight <= 200) {
                  /* 数据插入数组中 */
                  this.oneWeightArray.push(this.oneWeight)
                  this.twoWeightArray.push(this.twoWeight)

                  /* 实时渲染图形 */
                  if (this.useP1.includes(this.testName)) {
                    this.option.series[0].data = this.oneWeightArray
                  } else if (this.useP2.includes(this.testName)) {
                    this.option.series[0].data = this.twoWeightArray
                  }
                  this.myChart.setOption(this.option)
                }
              }
            })
          } else {
            this.$getLogger('没有检测到USB连接')
            this.$confirm(
              `请重新连接USB线，然后点击"刷新页面"按钮！`,
              '没有检测到USB连接',
              {
                type: 'error',
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                center: true,
                confirmButtonText: '刷新页面',
                cancelButtonText: '返回上一页'
              }
            )
              .then(() => {
                this.handleRefresh()
              })
              .catch(() => {
                this.handleGoBack()
              })
          }
        })
        .catch(err => {
          this.$getLogger(err)
          this.$confirm(
            `${err}。请重新连接USB线，然后点击"刷新页面"按钮！`,
            `初始化SerialPort.list失败`,
            {
              type: 'error',
              showClose: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              center: true,
              confirmButtonText: '刷新页面',
              cancelButtonText: '返回上一页'
            }
          )
            .then(() => {
              this.handleRefresh()
            })
            .catch(() => {
              this.handleGoBack()
            })
        })
    },

    /**
     * @description: 图形初始化
     */
    initChart() {
      // 计算横坐标数组
      this.xData = []
      for (let i = 0; i < 100; i++) {
        this.xData.push(parseFloat((i * 0.1).toFixed(1)))
      }

      this.myChart = this.$echarts.init(document.getElementById('chart'))
      this.option = {
        title: {
          text: `${this.chineseName}`,
          left: 'center',
          textStyle: {
            fontSize: 26
          }
        },
        xAxis: {
          type: 'category',
          name: '单位：秒',
          data: this.xData,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          name: '单位：kg',
          min: 0
          // max: 200
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{c} kg'
        },
        series: [
          {
            data: [' '],
            type: 'line',
            areaStyle: {
              color: 'rgba(174, 217, 206, 1)'
            },
            lineStyle: {
              color: 'rgba(43, 151, 122, 1)'
            },
            markPoint: {
              data: [
                {
                  type: 'max'
                }
              ],
              symbol: 'pin'
            },
            smooth: true,
            showSymbol: false
          }
        ],
        animation: false
      }

      this.myChart.setOption(this.option)
    },

    /**
     * @description: 重新刷新画布（即重新获取父容器宽高），目的是实现echarts图形自适应父容器的宽高变化
     */
    resizeCharts() {
      if (this.myChart) {
        this.myChart.resize()
      }
    },

    /**
     * @description: 开始测量按钮
     */
    handleStart() {
      this.oneWeightArray = [0] // 此处保证第一个值是0，为了应付医院
      this.twoWeightArray = [0] // 此处保证第一个值是0，为了应付医院
      this.time = 10
      this.isStart = true
      this.isRestart = false

      if (this.usbPort) {
        if (!this.usbPort.isOpen) {
          this.usbPort.open()
        }
      }

      this.timeClock = setInterval(() => {
        this.time -= 1
        if (this.time === 0) {
          this.handleOver()
        }
      }, 1000)
    },

    /**
     * @description: 结束该次测量按钮
     */
    handleOver() {
      if (this.usbPort) {
        if (this.usbPort.isOpen) {
          this.usbPort.close()

          if (this.timeClock) {
            clearInterval(this.timeClock)
          }
          this.time = 10

          if (this.testValueArray.length <= 2) {
            if (this.useP1.includes(this.testName)) {
              this.testValueArray.push(Math.max(...this.oneWeightArray))
            } else if (this.useP2.includes(this.testName)) {
              this.testValueArray.push(Math.max(...this.twoWeightArray))
            }
          }

          this.isStart = false
          this.isRestart = true
        }
      }
    },

    /**
     * @description: 重新该次测量按钮
     */
    handleRestart() {
      this.isRestart = false
      if (this.testValueArray.length > 0) {
        this.testValueArray.pop()
        // 图形的数值清空一下
        this.option.series[0].data = [' ']
        this.myChart.setOption(this.option)
      }
    },

    /**
     * @description: 完成按钮
     */
    handleFinish() {
      /* 取数组中的最大值 */
      this.testResult = Math.max(...this.testValueArray)

      /* 只有不为NaN和不为零，才算完成本项测试 */
      if (isNaN(this.testResult)) {
        this.$confirm(
          `最终计算结果为${this.testResult}，请检查测量数值是否有误，然后点击“重新测量”按钮。`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showCancelButton: false,
            type: 'warning',
            center: true
          }
        )
          .then(() => {})
          .catch(() => {})
      } else if (this.testResult === 0) {
        this.$confirm(
          `最终计算结果为0，请检查测量数值是否有误，然后点击“重新测量”按钮。`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showCancelButton: false,
            type: 'warning',
            center: true
          }
        )
          .then(() => {})
          .catch(() => {})
      } else {
        let valueObj = JSON.parse(JSON.stringify(this.$store.state.resultValue))
        valueObj[`${this.testName}`] = this.testResult
        this.$store.dispatch('changeResultValue', valueObj).then(() => {
          /* 测试项目选择结果，更新到Vuex中 */
          let valueArr = JSON.parse(
            JSON.stringify(this.$store.state.selectResult)
          )
          valueArr.shift() // 移除第一个元素
          this.$store.dispatch('changeSelectResult', valueArr).then(() => {
            /* 测试项目全部完成 */
            if (this.$store.state.selectResult.length === 0) {
              const pdfTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
              const hospital = window.localStorage.getItem('hospital')
              const currentAge = this.$moment().diff(
                this.$store.state.currentUserInfo.birthday,
                'years'
              )

              const chineseSelectResult = JSON.parse(
                window.sessionStorage.getItem('chineseSelectResult')
              )
              // 只取字符串前面2位
              let testTypeArray = []
              for (let i = 0; i < chineseSelectResult.length; i++) {
                const item = chineseSelectResult[i]
                testTypeArray.push(item.name.substr(0, 2))
              }
              // 数组去重
              testTypeArray = testTypeArray.filter(
                (item, index, testTypeArray) => {
                  // 当前元素，在原始数组中的第一个索引===当前索引值，否则返回当前元素
                  return testTypeArray.indexOf(item, 0) === index
                }
              )
              // 组合成类似 躯干、颈椎、上肢 的字符串
              let testType = ''
              for (let i = 0; i < testTypeArray.length; i++) {
                if (testTypeArray.length - i === 1) {
                  testType = testType + testTypeArray[i]
                } else {
                  testType = testType + testTypeArray[i] + '、'
                }
              }

              // 保存数据到数据库
              const db = initDB()
              db.test_data
                .add({
                  hospital: hospital,
                  userId: this.$store.state.currentUserInfo.userId,
                  userName: this.$store.state.currentUserInfo.userName,
                  sex: this.$store.state.currentUserInfo.sex,
                  height: this.$store.state.currentUserInfo.height,
                  weight: this.$store.state.currentUserInfo.weight,
                  birthday: this.$store.state.currentUserInfo.birthday,
                  currentAge: currentAge, // 完成该次测试时的岁数
                  pdfTime: pdfTime,
                  resultValue: this.$store.state.resultValue,
                  testType: testType // 数据记录表的测试项目列，字符串
                })
                .then(() => {
                  // 查看报告
                  this.$router.push({
                    path: '/test-print',
                    query: {
                      userId: JSON.stringify(
                        this.$store.state.currentUserInfo.userId
                      ),
                      pdfTime: JSON.stringify(pdfTime),
                      routerName: JSON.stringify('/test-select')
                    }
                  })
                })
                .catch(() => {
                  this.$alert(
                    `请点击"返回项目选择页"按钮，然后重新测试！`,
                    '数据保存失败',
                    {
                      type: 'error',
                      showClose: false,
                      center: true,
                      confirmButtonText: '返回项目选择页',
                      callback: () => {
                        this.handleGoBack()
                      }
                    }
                  )
                })
            } else {
              this.$router.push({
                path: '/' + this.$store.state.selectResult[0]
              })
            }
          })
        })
      }
    },

    /**
     * @description: 刷新页面按钮
     */
    handleRefresh() {
      this.$router.push({
        path: '/refresh-special',
        query: {
          routerName: JSON.stringify('/test-measure'),
          duration: JSON.stringify(300),
          testName: JSON.stringify(this.testName),
          chineseName: JSON.stringify(this.chineseName)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test-measure {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 96%;
    height: 96%;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    position: relative;
    @include flex(row, stretch, stretch);

    .page {
      position: absolute;
      top: 15px;
      left: 30px;
    }

    .left {
      padding: 45px 5px 10px 5px;
      flex: 1;
      @include flex(column, stretch, stretch);
      .chart {
        flex: 1;
      }
      .btn {
        margin-bottom: 16px;
        @include flex(row, center, center);
        .item {
          font-size: 30px;
        }
      }
    }

    .divider {
      border: 1px solid #e0e0e0;
    }

    .right {
      width: 20%;
      @include flex(column, stretch, center);
      // 倒计时
      .time {
        position: relative;
        @include flex(column, center, center);
        transform: scale(0.8);
        .img {
          transform: scale(1.2);
        }
        .text {
          position: absolute;
          top: 6%;
          left: 50%;
          transform: translateX(-50%);
          color: #ffffff;
          font-size: 20px;
        }
        .value {
          position: absolute;
          color: #ffffff;
          font-size: 94px;
        }
      }
      // 测量结果
      .result {
        position: relative;
        @include flex(column, stretch, center);
        .title {
          position: absolute;
          top: 6%;
          color: #ffffff;
          font-size: 28px;
        }
        .item1 {
          position: absolute;
          @include flex(row, center, center);
          top: 22%;
        }
        .item2 {
          position: absolute;
          @include flex(row, center, center);
          top: 40%;
        }
        .item3 {
          position: absolute;
          @include flex(row, center, center);
          top: 58%;
        }
        .value {
          width: 70%;
          font-weight: 700;
          font-size: 22px;
        }
        .confirm-btn {
          position: absolute;
          @include flex(row, center, center);
          top: 75%;
          color: #000000;
          font-weight: 700;
        }
      }
      // 其他按钮组
      .btn {
        width: 80%;
        @include flex(column, center, stretch);
        .item {
          margin: 5px 0;
        }
      }
    }
  }
}
</style>
