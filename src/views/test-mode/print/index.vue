<!--
 * @Author      : Mr.bin
 * @Date        : 2022-10-09 11:29:24
 * @LastEditTime: 2022-10-11 17:58:22
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
        <div class="item">
          {{ testData.hospital ? testData.hospital : '未设置所在医院' }}
        </div>
        <div class="item">姓名：{{ testData.userName }}</div>
        <div class="item">性别：{{ testData.sex }}</div>
        <div class="item">测试日期：{{ testData.pdfTime }}</div>
      </div>
      <div class="divider"></div>
      <div class="main">
        <div class="title">颈椎：后伸/前屈</div>
        <div class="content">
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="cvRearProtractionImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="threeLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ '中' }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.cvRearProtraction }}kg
                </div>
                <div class="val-item">
                  推荐值: {{ cvRearProtractionRecommend }}kg
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>颈椎后伸得分: {{ 5.7 }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="cvAnteflexionImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="threeLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ '中' }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.cvAnteflexion }}kg
                </div>
                <div class="val-item">
                  推荐值: {{ cvAnteflexionRecommend }}kg
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>颈椎前屈得分: {{ 5.7 }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="score-img"
                :src="threeLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ '中' }}</div>
                <div class="val-item">
                  测量比 {{ cvRearProtractionRate }}：{{ 100 }}
                </div>
                <div class="val-item">推荐比 {{ 140 }}：{{ 100 }}</div>
              </div>
            </div>
            <div class="bottom">
              <div>肌力比得分: {{ 9.8 }}</div>
            </div>
          </div>
        </div>
      </div>
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

      /* 评分图 */
      oneLevel: require('@/assets/img/Test/score_color/差.png'),
      twoLevel: require('@/assets/img/Test/score_color/较差.png'),
      threeLevel: require('@/assets/img/Test/score_color/中.png'),
      fourLevel: require('@/assets/img/Test/score_color/良.png'),
      fiveLevel: require('@/assets/img/Test/score_color/优秀.png'),

      /* 人体图 */
      cvRearProtractionImg: require('@/assets/img/Test/body_maps/颈椎后伸.png'), // 颈椎后伸
      cvAnteflexionImg: require('@/assets/img/Test/body_maps/颈椎前屈.png'), // 颈椎前屈
      cvRightSideImg: require('@/assets/img/Test/body_maps/颈椎右侧屈.png'), // 颈椎右侧屈
      cvLeftSideImg: require('@/assets/img/Test/body_maps/颈椎左侧屈.png'), // 颈椎左侧屈
      tRearProtractionImg: require('@/assets/img/Test/body_maps/躯干后伸.png'), // 躯干后伸
      tAnteflexionImg: require('@/assets/img/Test/body_maps/躯干前屈.png'), // 躯干前屈
      tLeftSideImg: require('@/assets/img/Test/body_maps/躯干左侧屈.png'), // 躯干左侧屈
      tRightSideImg: require('@/assets/img/Test/body_maps/躯干右侧屈.png'), // 躯干右侧屈
      ulPushImg: require('@/assets/img/Test/body_maps/上肢推.png'), // 上肢推
      ulPullImg: require('@/assets/img/Test/body_maps/上肢拉.png'), // 上肢拉
      ulLeftAbducentImg: require('@/assets/img/Test/body_maps/上肢左外展.png'), // 上肢左外展
      ulRightAbducentImg: require('@/assets/img/Test/body_maps/上肢右外展.png'), // 上肢右外展
      llAfterLeftOutImg: require('@/assets/img/Test/body_maps/下肢左后伸.png'), // 下肢左后伸
      llAfterRightOutImg: require('@/assets/img/Test/body_maps/下肢右后伸.png'), // 下肢右后伸
      llLeftAbducentImg: require('@/assets/img/Test/body_maps/下肢左外展.png'), // 下肢左外展
      llRightAbducentImg: require('@/assets/img/Test/body_maps/下肢右外展.png'), // 下肢右外展
      llLeftInsideCollectImg: require('@/assets/img/Test/body_maps/下肢左内收.png'), // 下肢左内收
      llRightInsideCollectImg: require('@/assets/img/Test/body_maps/下肢右内收.png'), // 下肢右内收

      // 测试报告源数据
      testData: {
        hospital: '',
        userId: '',
        userName: '',
        sex: '',
        height: '',
        weight: '',
        birthday: '',
        currentAge: '',
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

      /* 推荐值 */
      cvRearProtractionRecommend: '', // 颈椎后伸推荐值
      cvAnteflexionRecommend: '', // 颈椎前屈推荐值
      cvRightSideRecommend: '', // 颈椎右侧屈推荐值
      cvLeftSideRecommend: '', // 颈椎左侧屈推荐值
      tRearProtractionRecommend: '', // 躯干后伸推荐值
      tAnteflexionRecommend: '', // 躯干前屈推荐值
      tLeftSideRecommend: '', // 躯干左侧屈推荐值
      tRightSideRecommend: '', // 躯干右侧屈推荐值
      ulPushRecommend: '', // 上肢推推荐值
      ulPullRecommend: '', // 上肢拉推荐值
      ulLeftAbducentRecommend: '', // 上肢左外展推荐值
      ulRightAbducentRecommend: '', // 上肢右外展推荐值
      llAfterLeftOutRecommend: '', // 下肢左后伸推荐值
      llAfterRightOutRecommend: '', // 下肢右后伸推荐值
      llLeftAbducentRecommend: '', // 下肢左外展推荐值
      llRightAbducentRecommend: '', // 下肢右外展推荐值
      llLeftInsideCollectRecommend: '', // 下肢左内收推荐值
      llRightInsideCollectRecommend: '', // 下肢右内收推荐值

      /* 肌力比 */
      cvRearProtractionRate: '', // 颈椎后伸比率
      cvRightSideRate: '', // 颈椎右侧屈比率
      tRearProtractionRate: '', // 躯干后伸比率
      tLeftSideRate: '', // 躯干左侧屈比率
      ulPushRate: '', // 上肢推比率
      ulLeftAbducentRate: '', // 上肢左外展比率
      llAfterLeftOutRate: '', // 下肢左后伸比率
      llLeftAbducentRate: '', // 下肢左外展比率
      llLeftInsideCollectRate: '' // 下肢左内收比率
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
        })
        .then(() => {
          // 计算肌力比
          this.calculateMuscleRate()
        })
        .then(() => {
          // 计算推荐值
          this.calculateRecommend()
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
     * @description: 计算推荐值
     */
    calculateRecommend() {
      const sex = this.testData.sex // 性别
      const weight = this.testData.weight // 体重（kg）
      const height = parseFloat((this.testData.height / 100).toFixed(2)) // 身高（m）
      const currentAge = this.testData.currentAge // 当时的岁数
      const bmi = parseInt((weight / height ** 2).toFixed(0))
      const sqrtWeight = Math.sqrt(weight / 23) // 开根号

      // 颈椎后伸
      if (sex === '男') {
        if (currentAge >= 41) {
          this.cvRearProtractionRecommend =
            0.2 * weight * (1 - (currentAge - 40) * 0.01)
        } else {
          this.cvRearProtractionRecommend = 0.2 * weight
        }
      } else {
        if (currentAge >= 41) {
          this.cvRearProtractionRecommend =
            0.16 * weight * (1 - (currentAge - 40) * 0.01)
        } else {
          this.cvRearProtractionRecommend = 0.16 * weight
        }
      }
      this.cvRearProtractionRecommend = parseFloat(
        this.cvRearProtractionRecommend.toFixed(1)
      )

      // 颈椎前屈
      if (sex === '男') {
        if (currentAge >= 41) {
          this.cvAnteflexionRecommend =
            0.143 * weight * (1 - (currentAge - 40) * 0.01)
        } else {
          this.cvAnteflexionRecommend = 0.143 * weight
        }
      } else {
        if (currentAge >= 41) {
          this.cvAnteflexionRecommend =
            0.115 * weight * (1 - (currentAge - 40) * 0.01)
        } else {
          this.cvAnteflexionRecommend = 0.115 * weight
        }
      }
      this.cvAnteflexionRecommend = parseFloat(
        this.cvAnteflexionRecommend.toFixed(1)
      )

      // 颈椎右侧屈
      if (sex === '男') {
        if (currentAge >= 41) {
          this.cvRightSideRecommend =
            0.15 * weight * (1 - (currentAge - 40) * 0.01)
        } else {
          this.cvRightSideRecommend = 0.15 * weight
        }
      } else {
        if (currentAge >= 41) {
          this.cvRightSideRecommend =
            0.12 * weight * (1 - (currentAge - 40) * 0.01)
        } else {
          this.cvRightSideRecommend = 0.12 * weight
        }
      }
      this.cvRightSideRecommend = parseFloat(
        this.cvRightSideRecommend.toFixed(1)
      )

      // 颈椎左侧屈
      if (sex === '男') {
        if (currentAge >= 41) {
          this.cvLeftSideRecommend =
            0.15 * weight * (1 - (currentAge - 40) * 0.01)
        } else {
          this.cvLeftSideRecommend = 0.15 * weight
        }
      } else {
        if (currentAge >= 41) {
          this.cvLeftSideRecommend =
            0.12 * weight * (1 - (currentAge - 40) * 0.01)
        } else {
          this.cvLeftSideRecommend = 0.12 * weight
        }
      }
      this.cvLeftSideRecommend = parseFloat(this.cvLeftSideRecommend.toFixed(1))

      // 躯干后伸
      if (sex === '男') {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.tRearProtractionRecommend =
              (0.7 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.tRearProtractionRecommend =
              0.7 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.tRearProtractionRecommend =
              (0.7 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.tRearProtractionRecommend =
              0.7 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.tRearProtractionRecommend = 0.7 * weight
          } else {
            this.tRearProtractionRecommend =
              0.7 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      } else {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.tRearProtractionRecommend =
              (0.56 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.tRearProtractionRecommend =
              0.56 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.tRearProtractionRecommend =
              (0.56 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.tRearProtractionRecommend =
              0.56 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.tRearProtractionRecommend = 0.56 * weight
          } else {
            this.tRearProtractionRecommend =
              0.56 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      }
      this.tRearProtractionRecommend = parseFloat(
        this.tRearProtractionRecommend.toFixed(1)
      )

      // 躯干前屈
      if (sex === '男') {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.tAnteflexionRecommend =
              (0.54 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.tAnteflexionRecommend =
              0.54 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.tAnteflexionRecommend =
              (0.54 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.tAnteflexionRecommend =
              0.54 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.tAnteflexionRecommend = 0.54 * weight
          } else {
            this.tAnteflexionRecommend =
              0.54 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      } else {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.tAnteflexionRecommend =
              (0.37 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.tAnteflexionRecommend =
              0.37 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.tAnteflexionRecommend =
              (0.37 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.tAnteflexionRecommend =
              0.37 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.tAnteflexionRecommend = 0.37 * weight
          } else {
            this.tAnteflexionRecommend =
              0.37 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      }
      this.tAnteflexionRecommend = parseFloat(
        this.tAnteflexionRecommend.toFixed(1)
      )

      // 躯干左侧屈
      if (sex === '男') {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.tLeftSideRecommend =
              (0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.tLeftSideRecommend =
              0.5 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.tLeftSideRecommend =
              (0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.tLeftSideRecommend =
              0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.tLeftSideRecommend = 0.5 * weight
          } else {
            this.tLeftSideRecommend =
              0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      } else {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.tLeftSideRecommend =
              (0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.tLeftSideRecommend =
              0.4 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.tLeftSideRecommend =
              (0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.tLeftSideRecommend =
              0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.tLeftSideRecommend = 0.4 * weight
          } else {
            this.tLeftSideRecommend =
              0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      }
      this.tLeftSideRecommend = parseFloat(this.tLeftSideRecommend.toFixed(1))

      // 躯干右侧屈
      if (sex === '男') {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.tRightSideRecommend =
              (0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.tRightSideRecommend =
              0.5 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.tRightSideRecommend =
              (0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.tRightSideRecommend =
              0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.tRightSideRecommend = 0.5 * weight
          } else {
            this.tRightSideRecommend =
              0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      } else {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.tRightSideRecommend =
              (0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.tRightSideRecommend =
              0.4 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.tRightSideRecommend =
              (0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.tRightSideRecommend =
              0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.tRightSideRecommend = 0.4 * weight
          } else {
            this.tRightSideRecommend =
              0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      }
      this.tRightSideRecommend = parseFloat(this.tRightSideRecommend.toFixed(1))

      // 上肢推
      if (sex === '男') {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.ulPushRecommend =
              (1 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.ulPushRecommend = 1 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.ulPushRecommend =
              (1 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.ulPushRecommend =
              1 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.ulPushRecommend = 1 * weight
          } else {
            this.ulPushRecommend =
              1 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      } else {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.ulPushRecommend =
              (0.67 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.ulPushRecommend =
              0.67 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.ulPushRecommend =
              (0.67 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.ulPushRecommend =
              0.67 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.ulPushRecommend = 0.67 * weight
          } else {
            this.ulPushRecommend =
              0.67 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      }
      this.ulPushRecommend = parseFloat(this.ulPushRecommend.toFixed(1))

      // 上肢拉
      if (sex === '男') {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.ulPullRecommend =
              (0.67 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.ulPullRecommend =
              0.67 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.ulPullRecommend =
              (0.67 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.ulPullRecommend =
              0.67 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.ulPullRecommend = 0.67 * weight
          } else {
            this.ulPullRecommend =
              0.67 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      } else {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.ulPullRecommend =
              (0.45 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.ulPullRecommend =
              0.45 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.ulPullRecommend =
              (0.45 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.ulPullRecommend =
              0.45 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.ulPullRecommend = 0.45 * weight
          } else {
            this.ulPullRecommend =
              0.45 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      }
      this.ulPullRecommend = parseFloat(this.ulPullRecommend.toFixed(1))

      // 上肢左外展
      if (sex === '男') {
        if (currentAge >= 41) {
          this.ulLeftAbducentRecommend =
            0.3 * weight * (1 - (currentAge - 40) * 0.01)
        } else {
          this.ulLeftAbducentRecommend = 0.3 * weight
        }
      } else {
        if (currentAge >= 41) {
          this.ulLeftAbducentRecommend =
            0.2 * weight * (1 - (currentAge - 40) * 0.01)
        } else {
          this.ulLeftAbducentRecommend = 0.2 * weight
        }
      }
      this.ulLeftAbducentRecommend = parseFloat(
        this.ulLeftAbducentRecommend.toFixed(1)
      )

      // 上肢右外展
      if (sex === '男') {
        if (currentAge >= 41) {
          this.ulRightAbducentRecommend =
            0.3 * weight * (1 - (currentAge - 40) * 0.01)
        } else {
          this.ulRightAbducentRecommend = 0.3 * weight
        }
      } else {
        if (currentAge >= 41) {
          this.ulRightAbducentRecommend =
            0.2 * weight * (1 - (currentAge - 40) * 0.01)
        } else {
          this.ulRightAbducentRecommend = 0.2 * weight
        }
      }
      this.ulRightAbducentRecommend = parseFloat(
        this.ulRightAbducentRecommend.toFixed(1)
      )

      // 下肢左后伸
      if (sex === '男') {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.llAfterLeftOutRecommend =
              (0.6 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.llAfterLeftOutRecommend =
              0.6 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.llAfterLeftOutRecommend =
              (0.6 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.llAfterLeftOutRecommend =
              0.6 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.llAfterLeftOutRecommend = 0.6 * weight
          } else {
            this.llAfterLeftOutRecommend =
              0.6 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      } else {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.llAfterLeftOutRecommend =
              (0.48 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.llAfterLeftOutRecommend =
              0.48 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.llAfterLeftOutRecommend =
              (0.48 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.llAfterLeftOutRecommend =
              0.48 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.llAfterLeftOutRecommend = 0.48 * weight
          } else {
            this.llAfterLeftOutRecommend =
              0.48 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      }
      this.llAfterLeftOutRecommend = parseFloat(
        this.llAfterLeftOutRecommend.toFixed(1)
      )

      // 下肢右后伸
      if (sex === '男') {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.llAfterRightOutRecommend =
              (0.6 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.llAfterRightOutRecommend =
              0.6 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.llAfterRightOutRecommend =
              (0.6 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.llAfterRightOutRecommend =
              0.6 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.llAfterRightOutRecommend = 0.6 * weight
          } else {
            this.llAfterRightOutRecommend =
              0.6 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      } else {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.llAfterRightOutRecommend =
              (0.48 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.llAfterRightOutRecommend =
              0.48 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.llAfterRightOutRecommend =
              (0.48 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.llAfterRightOutRecommend =
              0.48 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.llAfterRightOutRecommend = 0.48 * weight
          } else {
            this.llAfterRightOutRecommend =
              0.48 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      }
      this.llAfterRightOutRecommend = parseFloat(
        this.llAfterRightOutRecommend.toFixed(1)
      )

      // 下肢左外展
      if (sex === '男') {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.llLeftAbducentRecommend =
              (0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.llLeftAbducentRecommend =
              0.4 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.llLeftAbducentRecommend =
              (0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.llLeftAbducentRecommend =
              0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.llLeftAbducentRecommend = 0.4 * weight
          } else {
            this.llLeftAbducentRecommend =
              0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      } else {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.llLeftAbducentRecommend =
              (0.32 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.llLeftAbducentRecommend =
              0.32 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.llLeftAbducentRecommend =
              (0.32 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.llLeftAbducentRecommend =
              0.32 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.llLeftAbducentRecommend = 0.32 * weight
          } else {
            this.llLeftAbducentRecommend =
              0.32 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      }
      this.llLeftAbducentRecommend = parseFloat(
        this.llLeftAbducentRecommend.toFixed(1)
      )

      // 下肢右外展
      if (sex === '男') {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.llRightAbducentRecommend =
              (0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.llRightAbducentRecommend =
              0.4 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.llRightAbducentRecommend =
              (0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.llRightAbducentRecommend =
              0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.llRightAbducentRecommend = 0.4 * weight
          } else {
            this.llRightAbducentRecommend =
              0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      } else {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.llRightAbducentRecommend =
              (0.32 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.llRightAbducentRecommend =
              0.32 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.llRightAbducentRecommend =
              (0.32 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.llRightAbducentRecommend =
              0.32 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.llRightAbducentRecommend = 0.32 * weight
          } else {
            this.llRightAbducentRecommend =
              0.32 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      }
      this.llRightAbducentRecommend = parseFloat(
        this.llRightAbducentRecommend.toFixed(1)
      )

      // 下肢左内收
      if (sex === '男') {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.llLeftInsideCollectRecommend =
              (0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.llLeftInsideCollectRecommend =
              0.5 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.llLeftInsideCollectRecommend =
              (0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.llLeftInsideCollectRecommend =
              0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.llLeftInsideCollectRecommend = 0.5 * weight
          } else {
            this.llLeftInsideCollectRecommend =
              0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      } else {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.llLeftInsideCollectRecommend =
              (0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.llLeftInsideCollectRecommend =
              0.4 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.llLeftInsideCollectRecommend =
              (0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.llLeftInsideCollectRecommend =
              0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.llLeftInsideCollectRecommend = 0.4 * weight
          } else {
            this.llLeftInsideCollectRecommend =
              0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      }
      this.llLeftInsideCollectRecommend = parseFloat(
        this.llLeftInsideCollectRecommend.toFixed(1)
      )

      // 下肢右内收
      if (sex === '男') {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.llRightInsideCollectRecommend =
              (0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.llRightInsideCollectRecommend =
              0.5 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.llRightInsideCollectRecommend =
              (0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.llRightInsideCollectRecommend =
              0.5 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.llRightInsideCollectRecommend = 0.5 * weight
          } else {
            this.llRightInsideCollectRecommend =
              0.5 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      } else {
        if (currentAge >= 41) {
          if (bmi > 23) {
            this.llRightInsideCollectRecommend =
              (0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          } else if (bmi >= 20 && bmi <= 23) {
            this.llRightInsideCollectRecommend =
              0.4 * weight * (1 - (currentAge - 40) * 0.01)
          } else {
            this.llRightInsideCollectRecommend =
              (0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight) *
              (1 - (currentAge - 40) * 0.01)
          }
        } else {
          if (bmi > 23) {
            this.llRightInsideCollectRecommend =
              0.4 * weight - ((height - sqrtWeight) / sqrtWeight) * weight
          } else if (bmi >= 20 && bmi <= 23) {
            this.llRightInsideCollectRecommend = 0.4 * weight
          } else {
            this.llRightInsideCollectRecommend =
              0.4 * weight + ((height - sqrtWeight) / sqrtWeight) * weight
          }
        }
      }
      this.llRightInsideCollectRecommend = parseFloat(
        this.llRightInsideCollectRecommend.toFixed(1)
      )
    },

    /**
     * @description: 计算肌力比
     */
    calculateMuscleRate() {
      if (
        this.testData.resultValue.cvRearProtraction &&
        this.testData.resultValue.cvAnteflexion
      ) {
        this.cvRearProtractionRate = (
          (100 / this.testData.resultValue.cvAnteflexion) *
          this.testData.resultValue.cvRearProtraction
        ).toFixed(0)
      }

      if (
        this.testData.resultValue.cvRightSide &&
        this.testData.resultValue.cvLeftSide
      ) {
        this.cvRightSideRate = (
          (100 / this.testData.resultValue.cvLeftSide) *
          this.testData.resultValue.cvRightSide
        ).toFixed(0)
      }

      if (
        this.testData.resultValue.tRearProtraction &&
        this.testData.resultValue.tAnteflexion
      ) {
        this.tRearProtractionRate = (
          (100 / this.testData.resultValue.tAnteflexion) *
          this.testData.resultValue.tRearProtraction
        ).toFixed(0)
      }

      if (
        this.testData.resultValue.tLeftSide &&
        this.testData.resultValue.tRightSide
      ) {
        this.tLeftSideRate = (
          (100 / this.testData.resultValue.tRightSide) *
          this.testData.resultValue.tLeftSide
        ).toFixed(0)
      }

      if (
        this.testData.resultValue.ulPush &&
        this.testData.resultValue.ulPull
      ) {
        this.ulPushRate = (
          (100 / this.testData.resultValue.ulPull) *
          this.testData.resultValue.ulPush
        ).toFixed(0)
      }

      if (
        this.testData.resultValue.ulLeftAbducent &&
        this.testData.resultValue.ulRightAbducent
      ) {
        this.ulLeftAbducentRate = (
          (100 / this.testData.resultValue.ulLeftAbducent) *
          this.testData.resultValue.ulRightAbducent
        ).toFixed(0)
      }

      if (
        this.testData.resultValue.llAfterLeftOut &&
        this.testData.resultValue.llAfterRightOut
      ) {
        this.llAfterLeftOutRate = (
          (100 / this.testData.resultValue.llAfterRightOut) *
          this.testData.resultValue.llAfterLeftOut
        ).toFixed(0)
      }

      if (
        this.testData.resultValue.llLeftAbducent &&
        this.testData.resultValue.llRightAbducent
      ) {
        this.llLeftAbducentRate = (
          (100 / this.testData.resultValue.llRightAbducent) *
          this.testData.resultValue.llLeftAbducent
        ).toFixed(0)
      }

      if (
        this.testData.resultValue.llLeftInsideCollect &&
        this.testData.resultValue.llRightInsideCollect
      ) {
        this.llLeftInsideCollectRate = (
          (100 / this.testData.resultValue.llRightInsideCollect) *
          this.testData.resultValue.llLeftInsideCollect
        ).toFixed(0)
      }
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
        font-size: 42px;
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
        font-size: 18px;
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
      @include flex(column, stretch, center);
      .title {
        font-size: 40px;
        color: green;
        padding: 60px 0 80px 0;
      }
      .content {
        flex: 1;
        width: 100%;
        @include flex(row, space-around, flex-start);
        .item {
          width: 30%;
          .top {
            @include flex(row, center, center);
            .body-img {
              width: 110px;
              margin-right: 20px;
            }
            .score-img {
              width: 50px;
              margin-right: 20px;
            }
            .val {
              @include flex(column, stretch, flex-start);
              .level-text {
                font-size: 50px;
                margin-bottom: 60px;
              }
              .val-item {
                margin-top: 5px;
              }
            }
          }
          .bottom {
            margin-top: 40px;
            @include flex(row, center, center);
            font-size: 22px;
          }
        }
      }
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
