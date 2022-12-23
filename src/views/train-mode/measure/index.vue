<!--
 * @Author      : Mr.bin
 * @Date        : 2022-12-20 20:37:20
 * @LastEditTime: 2022-12-23 11:42:35
 * @Description : 训练-具体测量
-->
<template>
  <div class="train-measure">
    <div class="wrapper">
      <div class="left">
        <!-- 标题 -->
        <div class="title">
          <el-button
            class="item"
            icon="el-icon-location-information"
            type="info"
            round
            >{{ type }}</el-button
          >
        </div>

        <!-- 按钮组 -->
        <div class="btn">
          <el-button
            class="item"
            type="success"
            :disabled="!pdfAllow"
            @click="handlePdf"
            >查看报告</el-button
          >
          <el-button class="item" type="danger" @click="handleGoBack"
            >返回上一页</el-button
          >
          <el-button
            class="item"
            type="warning"
            :disabled="startAllow"
            v-show="scShow"
            @click="handleStop"
            >暂停</el-button
          >
          <el-button
            class="item"
            type="warning"
            :disabled="startAllow"
            v-show="!scShow"
            @click="handleContinue"
            >继续</el-button
          >
          <el-button
            class="item"
            type="primary"
            :disabled="!startAllow"
            @click="handleStart"
            >开始训练</el-button
          >
        </div>
      </div>

      <div class="right">
        <div class="top">
          <div class="train-name">
            <div class="title">训练部位</div>
            <div class="num">{{ trainName.split('-')[1] }}</div>
          </div>

          <div class="result-rate">
            <div class="title">完成度</div>
            <div class="num">{{ resultRate }} %</div>
          </div>

          <div class="num-wrapper">
            <div class="title">剩余次数</div>
            <div class="num">
              <span class="now-num">{{ nowFrequency }}</span> /
              {{ frequency * nowGroupCount }}
            </div>
          </div>
        </div>

        <div class="chart">
          <div id="chart" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>

      <el-dialog
        title="休息倒计时"
        :visible.sync="dialogVisible"
        width="16%"
        top="32vh"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :center="true"
      >
        <div class="dialog">
          <div class="dialog-value">
            {{ nowIntervalTime }}
          </div>
          <el-button class="dialog-btn" type="warning" @click="handlePass"
            >跳 过</el-button
          >
        </div>
      </el-dialog>
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
  name: 'train-measure',

  data() {
    return {
      /* 路由传参 */
      frequency: JSON.parse(this.$route.query.frequency), // 单组重复次数
      groupCount: JSON.parse(this.$route.query.groupCount), // 组数
      intervalTime: JSON.parse(this.$route.query.intervalTime), // 组间隔时长（秒）
      target: JSON.parse(this.$route.query.target), // 训练目标（kg）
      entadRate: JSON.parse(this.$route.query.entadRate), // 向心比
      keepdRate: JSON.parse(this.$route.query.keepdRate), // 等长比
      offcenterRate: JSON.parse(this.$route.query.offcenterRate), // 离心比
      type: JSON.parse(this.$route.query.type), // 训练类型
      trainName: JSON.parse(this.$route.query.trainName), // 训练部位，格式如'cvRearProtraction-颈椎后伸'
      routerName: JSON.parse(this.$route.query.routerName), // 上一个的路由地址

      /* 串口相关变量 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200, // 默认波特率115200

      /* 图形相关变量 */
      myChart: null,
      option: {},
      xData: [], // 横坐标数组

      /* 控制相关 */
      scShow: true, // 暂停、继续按钮的显隐
      startAllow: true, // 开始按钮的禁用与否
      pdfAllow: false, // 查看PDF按钮的禁用与否

      /* 其他 */
      oneK: 0, // P1的K
      twoK: 0, // P2的K
      oneStandard: 0, // P1调零值
      twoStandard: 0, // P2调零值
      oneWeight: 0, // P1负重（kg），精确到0.01kg
      twoWeight: 0, // P2负重（kg），精确到0.01kg

      useP1: [
        'cvRearProtraction',
        'cvAnteflexion',
        'cvRightSide',
        'cvLeftSide',
        'tRearProtraction',
        'ulPush',
        'ulPull'
      ], // 使用P1的训练项目
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
      ], // 使用P2的训练项目

      weightDataOneArray: [], // 单个的压力数组，用于计算次数
      weightDataShowArray: [], // 展示的压力数组
      weightDataArray: [], // 完整的压力数组
      pdfTime: null, // 该次训练完成时间
      resultRate: 0, // 最终完成比例

      nowIntervalTime: 0, // 目前的组间隔时间
      nowFrequency: 0, // 目前的单组重复次数
      nowGroupCount: JSON.parse(this.$route.query.groupCount), // 目前的组数
      original: 2, // 起始位置（kg），暂定2kg

      dialogVisible: false, // 休息倒计时弹窗
      timeClock: null, // 计时器

      /* 参考曲线 */
      standardGraph: [], // 单个基准图形
      referenceGraph: [] // 最终图形
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
              this.$alert(
                `请重新连接USB线，然后点击"返回上一页"按钮！`,
                '串口开启失败',
                {
                  type: 'error',
                  showClose: false,
                  center: true,
                  confirmButtonText: '返回上一页',
                  callback: () => {
                    this.handleGoBack()
                  }
                }
              )
            })

            this.parser = this.usbPort.pipe(new Readline({ delimiter: '\n' }))
            this.parser.on('data', data => {
              // console.log(data) // {String} 00326740032826,125

              const dataArray = data.split(',') // 将原始数据以逗号作为分割符，组成一个数组
              const weightDigital = dataArray[0] // 负重数字量，比如00327640032720
              // const distancePulse = dataArray[1] // 位移脉冲量

              /* 暂停或继续按钮 */
              if (this.scShow) {
                /* 计算P1、P2负重，精确到0.1kg */
                this.oneWeight = parseFloat(
                  (
                    (parseInt(weightDigital.slice(2, 7)) - this.oneStandard) /
                    -this.oneK
                  ).toFixed(1)
                )
                this.twoWeight = parseFloat(
                  (
                    (parseInt(weightDigital.slice(9, 14)) - this.twoStandard) /
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
                    let weight = 0
                    if (this.useP1.includes(this.trainName.split('-')[0])) {
                      // 使用P1
                      weight = this.oneWeight
                    } else if (
                      this.useP2.includes(this.trainName.split('-')[0])
                    ) {
                      // 使用P2
                      weight = this.twoWeight
                    }
                    this.weightDataOneArray.push(weight) // 单个的压力数组，用于计算次数
                    this.weightDataShowArray.push(weight) // 展示的压力数组
                    this.weightDataArray.push(weight) // 完整的压力数组

                    /* 渲染图形 */
                    this.option.series[0].data = this.weightDataShowArray
                    this.myChart.setOption(this.option)

                    /* 实时递增次数 */
                    if (
                      this.weightDataOneArray.length ===
                      this.standardGraph.length
                    ) {
                      this.weightDataOneArray = []
                      this.nowFrequency += 1
                    }

                    /* 曲线走到终点重新开始 */
                    if (
                      this.weightDataShowArray.length ===
                      this.referenceGraph.length
                    ) {
                      this.weightDataShowArray = []
                    }

                    /* 完成一组 */
                    if (this.nowFrequency === this.frequency) {
                      this.handleStop()

                      this.nowGroupCount -= 1

                      // 弹出休息倒计时窗口
                      if (this.nowGroupCount > 0) {
                        this.nowIntervalTime = this.intervalTime
                        this.dialogVisible = true
                        this.timeClock = setInterval(() => {
                          this.nowIntervalTime -= 1
                          if (this.nowIntervalTime === 0) {
                            /* 清除定时器 */
                            if (this.timeClock) {
                              clearInterval(this.timeClock)
                            }
                            this.nowFrequency = 0
                            this.dialogVisible = false
                            this.handleContinue()
                          }
                        }, 1000)
                      }
                    }

                    /* 该次训练全部完成 */
                    if (this.nowGroupCount === 0) {
                      if (this.usbPort) {
                        if (this.usbPort.isOpen) {
                          /* 关闭串口通信 */
                          this.usbPort.close()
                          /* 清除定时器 */
                          if (this.timeClock) {
                            clearInterval(this.timeClock)
                          }
                          /* 计算完成度 */
                          const matchArray = [] // 参考曲线数组
                          const yesArray = [] // 达标数据数组
                          for (let i = 0; i < this.nowFrequency; i++) {
                            matchArray.push(...this.standardGraph)
                          }
                          for (let i = 0; i < matchArray.length; i++) {
                            const relative = Math.abs(
                              this.weightDataArray[i] - matchArray[i]
                            )
                            // 暂定单边2kg范围
                            if (relative <= 2) {
                              yesArray.push(relative)
                            }
                          }
                          this.resultRate = parseFloat(
                            (
                              (yesArray.length / matchArray.length) *
                              100
                            ).toFixed(1)
                          )
                          this.startAllow = true

                          /* 验证一下结果正确性 */
                          if (this.resultRate) {
                            /* 保存到数据库 */
                            this.saveData()
                          } else {
                            this.$message({
                              message: `完成比例为${this.resultRate}，数值不正常，请点击"开始训练"按钮重新训练`,
                              type: 'error'
                            })
                          }
                        }
                      }
                    }
                  }
                }
              }
            })
          } else {
            this.$getLogger('没有检测到USB连接')
            this.$alert(
              `请重新连接USB线，然后点击"返回上一页"按钮！`,
              '没有检测到USB连接',
              {
                type: 'error',
                showClose: false,
                center: true,
                confirmButtonText: '返回上一页',
                callback: () => {
                  this.handleGoBack()
                }
              }
            )
          }
        })
        .catch(err => {
          this.$getLogger(err)
          this.$alert(
            `${err}。请重新连接USB线，然后点击"返回上一页"按钮！`,
            '初始化SerialPort.list失败',
            {
              type: 'error',
              showClose: false,
              center: true,
              confirmButtonText: '返回上一页',
              callback: () => {
                this.handleGoBack()
              }
            }
          )
        })
    },

    /**
     * @description: 图形初始化
     */
    initChart() {
      /* 计算最终参考图形 */
      // 开始段
      for (let i = 0; i <= 5; i++) {
        this.standardGraph.push(this.original)
      }
      // 中间段，这里的15目前是固定的，后续可能会改其他值
      const intervalUp = (this.target - this.original) / (this.entadRate * 15) // 上升间隔值
      const intervalDown =
        (this.target - this.original) / (this.offcenterRate * 15) // 下降间隔值
      let sum = this.original
      for (let i = 0; i < this.entadRate * 15; i++) {
        sum = parseFloat(sum + intervalUp)
        this.standardGraph.push(sum)
      }
      for (let i = 0; i < this.keepdRate * 15; i++) {
        this.standardGraph.push(sum)
      }
      for (let i = 0; i < this.offcenterRate * 15 - 1; i++) {
        sum = parseFloat(sum - intervalDown)
        this.standardGraph.push(sum)
      }
      // 结束段
      for (let i = 0; i < 5; i++) {
        this.standardGraph.push(this.original)
      }
      // 最终复制3个
      for (let i = 0; i < 3; i++) {
        this.referenceGraph.push(...this.standardGraph)
      }

      // 计算横坐标数组
      this.xData = []
      for (let i = 0; i < this.referenceGraph.length; i++) {
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
            data: [],
            type: 'line',
            lineStyle: {
              color: 'rgba(255, 0, 0, 1)'
            },
            smooth: true,
            showSymbol: false
          },
          {
            data: this.referenceGraph,
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
     * @description: 保存数据函数
     */
    saveData() {
      this.pdfTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      const db = initDB()
      db.train_data
        .add({
          userId: this.$store.state.currentUserInfo.userId,
          userName: this.$store.state.currentUserInfo.userName,
          sex: this.$store.state.currentUserInfo.sex,
          height: this.$store.state.currentUserInfo.height,
          weight: this.$store.state.currentUserInfo.weight,
          birthday: this.$store.state.currentUserInfo.birthday,

          frequency: this.frequency,
          groupCount: this.groupCount,
          intervalTime: this.intervalTime,
          target: this.target,
          entadRate: this.entadRate,
          keepdRate: this.keepdRate,
          offcenterRate: this.offcenterRate,
          trainName: this.trainName,
          type: this.type,

          pdfTime: this.pdfTime,
          standardGraph: this.standardGraph,
          weightDataArray: this.weightDataArray,
          resultRate: this.resultRate
        })
        .then(() => {
          this.$message({
            message: '数据保存成功',
            type: 'success',
            duration: 2000
          })
          this.pdfAllow = true
        })
        .catch(() => {
          this.$alert(`请点击"返回上一页"按钮，重新训练！`, '数据保存失败', {
            type: 'error',
            showClose: false,
            center: true,
            confirmButtonText: '返回上一页',
            callback: () => {
              this.handleGoBack()
            }
          })
          this.pdfAllow = false
        })
    },

    /**
     * @description: 开始按钮
     */
    handleStart() {
      this.scShow = true
      this.startAllow = false
      this.pdfAllow = false

      this.weightDataOneArray = []
      this.weightDataShowArray = []
      this.weightDataArray = []

      this.nowFrequency = 0
      this.nowGroupCount = this.groupCount
      this.pdfTime = null
      this.resultRate = 0

      if (this.usbPort) {
        if (!this.usbPort.isOpen) {
          this.usbPort.open()
        }
      }
    },

    /**
     * @description: 暂停按钮
     */
    handleStop() {
      this.scShow = false
    },

    /**
     * @description: 继续按钮
     */
    handleContinue() {
      this.scShow = true
    },

    /**
     * @description: 跳过休息时间
     */
    handlePass() {
      /* 清除定时器 */
      if (this.timeClock) {
        clearInterval(this.timeClock)
      }
      this.nowIntervalTime === 0
      this.nowFrequency = 0
      this.dialogVisible = false
      this.handleContinue()
    },

    /**
     * @description: 查看PDF按钮
     */
    handlePdf() {
      this.$router.push({
        path: '/train-pdf',
        query: {
          userId: JSON.stringify(this.$store.state.currentUserInfo.userId),
          pdfTime: JSON.stringify(this.pdfTime),
          routerName: JSON.stringify(this.routerName)
        }
      })
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
.train-measure {
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
    @include flex(row, space-between, stretch);

    .left {
      position: relative;
      width: 15%;
      .title {
        position: absolute;
        left: -70px;
        top: -15px;
        @include flex(row, center, center);
        .item {
          width: 220px;
          font-size: 26px;
        }
      }
      .btn {
        height: 100%;
        width: 100%;
        @include flex(column, flex-end, center);
        .item {
          margin: 20px 0 0 0;
          width: 190px;
        }
      }
    }

    .right {
      flex: 1;
      @include flex(column, stretch, center);
      .top {
        width: 100%;
        height: 80px;
        border: 1px solid rgb(140, 180, 134);
        box-shadow: 0 0 6px #929292;
        border-radius: 16px;
        @include flex(row, space-around, center);
        padding-bottom: 5px;
        .train-name {
          @include flex(column, center, center);
          .title {
            font-size: 22px;
            margin-bottom: 5px;
          }
          .num {
            background-color: rgba(155, 155, 155, 0.6);
            border-radius: 4px;
            padding: 2px 10px;
            font-size: 18px;
          }
        }
        .result-rate {
          @include flex(column, center, center);
          .title {
            font-size: 22px;
            margin-bottom: 5px;
          }
          .num {
            background-color: rgba(155, 155, 155, 0.6);
            border-radius: 4px;
            padding: 2px 10px;
            font-size: 18px;
          }
        }
        .num-wrapper {
          @include flex(column, center, center);
          .title {
            font-size: 22px;
            margin-bottom: 5px;
          }
          .num {
            font-size: 18px;
            .now-num {
              background-color: rgba(155, 155, 155, 0.6);
              border-radius: 4px;
              padding: 2px 10px;
            }
          }
        }
      }
      .chart {
        flex: 1;
        width: 100%;
      }
    }

    .dialog {
      @include flex(column, stretch, stretch);
      .dialog-value {
        @include flex(row, center, center);
        height: 130px;
        font-size: 60px;
        color: #ffffff;
        border-radius: 9px;
        background: linear-gradient(
          180deg,
          #2d809e 0%,
          #2d809e 0%,
          #2aa06d 100%,
          #2aa06d 100%
        );
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
      }
      .dialog-btn {
        margin-top: 20px;
        font-size: 24px;
      }
    }
  }
}
</style>
