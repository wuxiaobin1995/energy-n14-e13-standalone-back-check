<!--
 * @Author      : Mr.bin
 * @Date        : 2022-07-27 10:39:06
 * @LastEditTime: 2022-09-17 10:26:56
 * @Description : 根组件
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
/* 串口通信库 */
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

export default {
  name: 'App',

  data() {
    return {
      /* 串口相关 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200, // 默认波特率115200

      /* 其他 */
      oneStandard: 0, // P1负重数字量
      twoStandard: 0 // P2负重数字量
    }
  },

  created() {
    /* 初始化P1的的K值 */
    if (!window.localStorage.getItem('oneK')) {
      window.localStorage.setItem('oneK', '82.243')
    }
    /* 初始化P2的的K值 */
    if (!window.localStorage.getItem('twoK')) {
      window.localStorage.setItem('twoK', '82.243')
    }
    /* 初始化医院名称 */
    if (!window.localStorage.getItem('hospital')) {
      window.localStorage.setItem('hospital', '')
    }

    this.initSerialPort()
  },
  beforeDestroy() {
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
            this.$notify({
              title: '通知',
              message: `连接到串口：${comPath}；波特率为：${this.scmBaudRate}`,
              type: 'success',
              position: 'bottom-right',
              duration: 4000
            })

            /**
             * @description: 创建串口实例
             * @param {String} comPath 串行端口的系统路径。例如：在Mac、Linux上的/dev/tty.XXX或Windows上的COM1
             * @param {Object} 配置项
             */
            this.usbPort = new SerialPort(comPath, {
              baudRate: this.scmBaudRate, // 默认波特率115200
              autoOpen: true // 是否自动开启串口
            })
            /* 调用 this.usbPort.open() 成功时触发（开启串口成功） */
            this.usbPort.on('open', () => {})
            /* 调用 this.usbPort.open() 失败时触发（开启串口失败） */
            this.usbPort.on('error', () => {
              this.$alert(
                `请重新连接USB线，然后点击"刷新页面"按钮！`,
                '串口开启失败',
                {
                  type: 'error',
                  showClose: false,
                  center: true,
                  confirmButtonText: '刷新页面',
                  callback: () => {
                    window.location.reload()
                  }
                }
              )
            })

            this.parser = this.usbPort.pipe(new Readline({ delimiter: '\n' }))
            this.parser.on('data', data => {
              // console.log(data) // {String} 00326740032826,125

              const dataArray = data.split(',') // 将原始数据以逗号作为分割符，组成一个数组
              const weightDigital = dataArray[0] // 负重数字量，比如00327640032720
              // const distancePulse = dataArray[1] // 位移脉冲量，需要乘2才是mm值

              this.oneStandard = parseInt(weightDigital.slice(2, 7))
              this.twoStandard = parseInt(weightDigital.slice(9, 14))
              /* 数据校验 */
              if (!isNaN(this.oneStandard) && !isNaN(this.twoStandard)) {
                /* 关闭串口 */
                if (this.usbPort) {
                  if (this.usbPort.isOpen) {
                    this.usbPort.close()
                  }
                }
                /* 设置Vuex中的传感器基准值 */
                this.$store
                  .dispatch('setZeroStandard', {
                    oneStandard: this.oneStandard,
                    twoStandard: this.twoStandard
                  })
                  .then(() => {
                    this.$message({
                      message: '开机调零成功',
                      type: 'success',
                      duration: 2500
                    })
                  })
                  .catch(err => {
                    this.$alert(
                      `${err}。请重新连接USB线，然后点击"刷新页面"按钮！`,
                      '开机调零失败',
                      {
                        type: 'error',
                        showClose: false,
                        center: true,
                        confirmButtonText: '刷新页面',
                        callback: () => {
                          window.location.reload()
                        }
                      }
                    )
                  })
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
                cancelButtonText: '忽 略'
              }
            )
              .then(() => {
                window.location.reload()
              })
              .catch(() => {})
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
              cancelButtonText: '忽 略'
            }
          )
            .then(() => {
              window.location.reload()
            })
            .catch(() => {})
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
