<!--
 * @Author      : Mr.bin
 * @Date        : 2022-09-16 11:39:12
 * @LastEditTime: 2022-09-27 14:17:03
 * @Description : 测试具体测量
-->
<template>
  <div class="test-measure">
    <div class="wrapper">
      <!-- 主区域 -->
      <div class="main">
        <!-- 图形 -->
        <div class="chart-wrapper">
          <div id="chart" :style="{ width: '100%', height: '100%' }"></div>
        </div>
        <!-- 倒计时 -->
        <div class="time-wrapper">
          <div class="time">{{ time }}</div>
        </div>
        <!-- 测量数值 -->
        <div class="result-wrapper">
          <div class="title">测量数值</div>
          <div class="result-item">
            <span>1：</span>
            <el-input class="val" v-model="testValueArray[0]" disabled />
          </div>
          <div class="result-item">
            <span>2：</span>
            <el-input class="val" v-model="testValueArray[1]" disabled />
          </div>
          <div class="result-item">
            <span>3：</span>
            <el-input class="val" v-model="testValueArray[2]" disabled />
          </div>
        </div>
      </div>

      <!-- 按钮组 -->
      <div class="btn">
        <div class="btn-left">
          <el-button
            class="size start"
            type="primary"
            icon="el-icon-caret-right"
            :disabled="
              this.testValueArray.length === 3 || isStart ? true : false
            "
            @click="handleStart"
            >开始测量</el-button
          >
          <el-button
            class="size over"
            type="danger"
            :disabled="!isStart"
            @click="handleOver"
            >结束测量</el-button
          >
          <el-button
            class="size restart"
            type="warning"
            :disabled="!isRestart"
            @click="handleRestart"
            >重新测量</el-button
          >
          <el-button
            class="size refresh"
            round
            type="info"
            @click="handleRefresh"
            >刷新</el-button
          >
        </div>
        <div class="btn-right">
          <el-button
            class="size finish"
            type="success"
            icon="el-icon-check"
            :disabled="this.testValueArray.length === 3 ? false : true"
            @click="handleFinish"
            >完 成</el-button
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

      /* 按钮禁用控制 */
      isStart: false,
      isRestart: false,

      /* 图形相关变量 */
      myChart: null,
      option: {},
      xData: [], // 横坐标数组

      /* 串口相关变量 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200, // 默认波特率115200

      /* 其他 */
      timeClock: null, // 计时器
      time: 10, // 倒计时
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
      testValueArray: [], // 测量值数组
      testResult: 0 // 最终测量结果
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
    this.initChart() // 图形初始化
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
  },

  methods: {
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
              this.$notify({
                title: '串口开启失败',
                message: '请重新连接USB线，然后重新进入该页面',
                type: 'error',
                position: 'bottom-right'
              })
            })

            this.parser = this.usbPort.pipe(new Readline({ delimiter: '\n' }))
            this.parser.on('data', data => {
              const dataArray = data.split(',') // 将原始数据以逗号作为分割符，组成一个数组
              const weightDigital = dataArray[0] // 负重数字量，比如00327640032720

              // 计算P1、P2负重
              this.oneWeight = parseFloat(
                (
                  (parseInt(weightDigital.slice(2, 7)) - this.oneStandard) /
                  -this.oneK
                ).toFixed(2)
              )
              this.twoWeight = parseFloat(
                (
                  (parseInt(weightDigital.slice(9, 14)) - this.twoStandard) /
                  -this.twoK
                ).toFixed(2)
              )
              if (this.oneWeight < 0) {
                this.oneWeight = 0
              }
              if (this.twoWeight < 0) {
                this.twoWeight = 0
              }
              // 验证数据是否为数字类型
              if (!isNaN(this.oneWeight) && !isNaN(this.twoWeight)) {
                // 过滤掉突变值
                if (this.oneWeight > 200 || this.twoWeight > 200) {
                } else {
                  this.oneWeightArray.push(this.oneWeight)
                  this.twoWeightArray.push(this.twoWeight)
                  // 实时渲染图形
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
            this.$notify({
              title: '没有检测到USB连接',
              message: '请重新连接USB线，然后重新进入该页面',
              type: 'error',
              position: 'bottom-right'
            })
            this.$getLogger('没有检测到USB连接')
          }
        })
        .catch(err => {
          this.$notify({
            title: `初始化SerialPort.list失败：${err}`,
            message: '请重新连接USB线，然后重新进入该页面',
            type: 'error',
            position: 'bottom-right',
            duration: 10000
          })
          this.$getLogger(err)
        })
    },

    /**
     * @description: 图形初始化
     */
    initChart() {
      // 计算横坐标数组
      this.xData = []
      for (let i = 0; i < 101; i++) {
        this.xData.push(parseFloat((i * 0.1).toFixed(1)))
      }

      this.myChart = this.$echarts.init(document.getElementById('chart'))
      this.option = {
        title: {
          text: this.chineseName,
          left: 'center',
          textStyle: {
            fontSize: 28
          }
        },
        xAxis: {
          type: 'category',
          name: '单位：秒',
          data: this.xData
        },
        yAxis: {
          type: 'value',
          name: '单位：kg',
          min: 0,
          max: 200
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{c} kg'
        },
        series: [
          {
            data: [' '],
            type: 'line',
            smooth: true,
            showSymbol: false
          }
        ],
        animation: false
      }

      this.myChart.setOption(this.option)
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
     * @description: 结束测量按钮
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
              this.testValueArray.push(
                Math.max.apply(null, this.oneWeightArray)
              )
            } else if (this.useP2.includes(this.testName)) {
              this.testValueArray.push(
                Math.max.apply(null, this.twoWeightArray)
              )
            }
          }

          this.isStart = false
          this.isRestart = true
        }
      }
    },

    /**
     * @description: 重新测量按钮
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
     * @description: 刷新页面按钮。通过路由跳转的方式，实现页面刷新，注意传参等问题
     */
    handleRefresh() {
      // this.$router.push({
      //   path: '/refresh',
      //   query: {
      //     routerName: 'test-measure',
      //     testName: this.testName,
      //     chineseName: this.chineseName
      //   }
      // })
    },

    /**
     * @description: 完成按钮
     */
    handleFinish() {
      // 取数组中的最大值
      this.testResult = Math.max.apply(null, this.testValueArray)

      // 只有不为NaN和不为零，才能够结束
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
              const chineseSelectResult = JSON.parse(
                window.localStorage.getItem('chineseSelectResult')
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
                  userId: this.$store.state.currentUserInfo.userId,
                  sex: this.$store.state.currentUserInfo.sex,
                  userName: this.$store.state.currentUserInfo.userName,
                  pdfTime: pdfTime,
                  data: this.$store.state.resultValue,
                  testType: testType // 数据记录表的测试项目列，字符串
                })
                .catch(() => {
                  this.$message({
                    message: '数据保存失败，请重启软件。',
                    type: 'error'
                  })
                })
                .finally(() => {
                  // 生成报告
                  this.$router.push({
                    path: '/test-pdf',
                    query: {
                      result: this.$store.state.resultValue,
                      pdfTime: pdfTime,
                      userName: this.$store.state.currentUserInfo.userName,
                      sex: this.$store.state.currentUserInfo.sex,
                      goRouter: '/test-select'
                    }
                  })
                })
            } else {
              this.$router.push({
                path: '/' + this.$store.state.selectResult[0]
              })
            }
          })
        })
      }
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
    padding: 20px;
    @include flex(row, stretch, stretch);

    /* 主区域 */
    .main {
      flex: 1;
      @include flex(row, stretch, stretch);
      // 图形
      .chart-wrapper {
        flex: 1;
      }
      // 倒计时
      .time-wrapper {
        width: 20%;
        @include flex(row, center, center);
        font-size: 100px;
        .time {
          @include flex(row, center, center);
          background-color: rgba(8, 197, 49, 0.7);
          width: 60%;
          padding: 20px;
          border-radius: 50%;
        }
      }
      // 测量数值
      .result-wrapper {
        width: 20%;
        @include flex(column, center, center);
        .title {
          font-size: 34px;
        }
        .result-item {
          width: 50%;
          margin: 28px 0;
          font-size: 18px;
          @include flex(row, stretch, center);
          .val {
            font-size: 32px;
          }
        }
      }
    }

    /* 按钮组 */
    .btn {
      margin-top: 20px;
      width: 300px;
      @include flex(row, space-between, center);
      .btn-left {
        width: 60%;
        @include flex(row, center, center);
      }
      .btn-right {
        width: 20%;
        @include flex(row, center, center);
      }
      .size {
        font-size: 22px;
      }
      .start {
        margin-right: 30px;
      }
      .over {
        margin-right: 30px;
      }
      .restart {
        margin-right: 30px;
      }
      // .finish {
      // }
    }
  }
}
</style>
