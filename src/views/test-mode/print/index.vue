<!--
 * @Author      : Mr.bin
 * @Date        : 2022-10-09 11:29:24
 * @LastEditTime: 2022-10-14 17:58:21
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
        <div class="item">年龄：{{ testData.currentAge }}</div>
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
                :src="cvRearProtractionLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ cvRearProtractionEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.cvRearProtraction }}kg
                </div>
                <div class="val-item">
                  推荐值: {{ cvRearProtractionRecommend }}kg
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>颈椎后伸得分: {{ cvRearProtractionScore }}</div>
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
                :src="cvAnteflexionLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ cvAnteflexionEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.cvAnteflexion }}kg
                </div>
                <div class="val-item">
                  推荐值: {{ cvAnteflexionRecommend }}kg
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>颈椎前屈得分: {{ cvAnteflexionScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="score-img"
                :src="oneRateLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ oneRateEvaluate }}</div>
                <div class="val-item">
                  测量比 {{ cvRearProtractionRate }}：{{ 100 }}
                </div>
                <div class="val-item">
                  推荐比 {{ testData.sex === '男' ? 140 : 170 }}：{{ 100 }}
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>肌力比得分: {{ oneRateScore }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 颈椎左侧屈、右侧屈 -->
    <div
      v-if="testData.resultValue.cvLeftSide && testData.resultValue.cvRightSide"
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
        <div class="item">年龄：{{ testData.currentAge }}</div>
        <div class="item">测试日期：{{ testData.pdfTime }}</div>
      </div>
      <div class="divider"></div>
      <div class="main">
        <div class="title">颈椎：侧屈</div>
        <div class="content">
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="cvLeftSideImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="cvLeftSideLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ cvLeftSideEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.cvLeftSide }}kg
                </div>
                <div class="val-item">推荐值: {{ cvLeftSideRecommend }}kg</div>
              </div>
            </div>
            <div class="bottom">
              <div>颈椎左侧屈得分: {{ cvLeftSideScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="cvRightSideImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="cvRightSideLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ cvRightSideEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.cvRightSide }}kg
                </div>
                <div class="val-item">推荐值: {{ cvRightSideRecommend }}kg</div>
              </div>
            </div>
            <div class="bottom">
              <div>颈椎右侧屈得分: {{ cvRightSideScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="score-img"
                :src="twoRateLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ twoRateEvaluate }}</div>
                <div class="val-item">
                  测量比 {{ cvLeftSideRate }}：{{ 100 }}
                </div>
                <div class="val-item">推荐比 {{ 100 }}：{{ 100 }}</div>
              </div>
            </div>
            <div class="bottom">
              <div>肌力比得分: {{ twoRateScore }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 躯干后伸、前屈 -->
    <div
      v-if="
        testData.resultValue.tRearProtraction &&
        testData.resultValue.tAnteflexion
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
        <div class="item">年龄：{{ testData.currentAge }}</div>
        <div class="item">测试日期：{{ testData.pdfTime }}</div>
      </div>
      <div class="divider"></div>
      <div class="main">
        <div class="title">躯干：后伸/前屈</div>
        <div class="content">
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="tRearProtractionImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="tRearProtractionLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ tRearProtractionEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.tRearProtraction }}kg
                </div>
                <div class="val-item">
                  推荐值: {{ tRearProtractionRecommend }}kg
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>躯干后伸得分: {{ tRearProtractionScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="tAnteflexionImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="tAnteflexionLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ tAnteflexionEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.tAnteflexion }}kg
                </div>
                <div class="val-item">
                  推荐值: {{ tAnteflexionRecommend }}kg
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>躯干前屈得分: {{ tAnteflexionScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="score-img"
                :src="threeRateLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ threeRateEvaluate }}</div>
                <div class="val-item">
                  测量比 {{ tRearProtractionRate }}：{{ 100 }}
                </div>
                <div class="val-item">
                  推荐比 {{ testData.sex === '男' ? 130 : 150 }}：{{ 100 }}
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>肌力比得分: {{ threeRateScore }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 躯干左侧屈、右侧屈 -->
    <div
      v-if="testData.resultValue.tLeftSide && testData.resultValue.tRightSide"
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
        <div class="item">年龄：{{ testData.currentAge }}</div>
        <div class="item">测试日期：{{ testData.pdfTime }}</div>
      </div>
      <div class="divider"></div>
      <div class="main">
        <div class="title">躯干：侧屈</div>
        <div class="content">
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="tLeftSideImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="tLeftSideLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ tLeftSideEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.tLeftSide }}kg
                </div>
                <div class="val-item">推荐值: {{ tLeftSideRecommend }}kg</div>
              </div>
            </div>
            <div class="bottom">
              <div>躯干左侧屈得分: {{ tLeftSideScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="tRightSideImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="tRightSideLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ tRightSideEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.tRightSide }}kg
                </div>
                <div class="val-item">推荐值: {{ tRightSideRecommend }}kg</div>
              </div>
            </div>
            <div class="bottom">
              <div>躯干右侧屈得分: {{ tRightSideScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="score-img"
                :src="fourRateLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ fourRateEvaluate }}</div>
                <div class="val-item">
                  测量比 {{ tLeftSideRate }}：{{ 100 }}
                </div>
                <div class="val-item">推荐比 {{ 100 }}：{{ 100 }}</div>
              </div>
            </div>
            <div class="bottom">
              <div>肌力比得分: {{ fourRateScore }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 上肢推、拉 -->
    <div
      v-if="testData.resultValue.ulPush && testData.resultValue.ulPull"
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
        <div class="item">年龄：{{ testData.currentAge }}</div>
        <div class="item">测试日期：{{ testData.pdfTime }}</div>
      </div>
      <div class="divider"></div>
      <div class="main">
        <div class="title">上肢：推/拉</div>
        <div class="content">
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="ulPushImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="ulPushLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ ulPushEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.ulPush }}kg
                </div>
                <div class="val-item">推荐值: {{ ulPushRecommend }}kg</div>
              </div>
            </div>
            <div class="bottom">
              <div>上肢推得分: {{ ulPushScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="ulPullImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="ulPullLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ ulPullEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.ulPull }}kg
                </div>
                <div class="val-item">推荐值: {{ ulPullRecommend }}kg</div>
              </div>
            </div>
            <div class="bottom">
              <div>上肢拉得分: {{ ulPullScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="score-img"
                :src="fiveRateLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ fiveRateEvaluate }}</div>
                <div class="val-item">测量比 {{ ulPushRate }}：{{ 100 }}</div>
                <div class="val-item">推荐比 {{ 150 }}：{{ 100 }}</div>
              </div>
            </div>
            <div class="bottom">
              <div>肌力比得分: {{ fiveRateScore }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 上肢左外展、右外展 -->
    <div
      v-if="
        testData.resultValue.ulLeftAbducent &&
        testData.resultValue.ulRightAbducent
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
        <div class="item">年龄：{{ testData.currentAge }}</div>
        <div class="item">测试日期：{{ testData.pdfTime }}</div>
      </div>
      <div class="divider"></div>
      <div class="main">
        <div class="title">上肢：外展</div>
        <div class="content">
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="ulLeftAbducentImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="ulLeftAbducentLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ ulLeftAbducentEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.ulLeftAbducent }}kg
                </div>
                <div class="val-item">
                  推荐值: {{ ulLeftAbducentRecommend }}kg
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>上肢左外展得分: {{ ulLeftAbducentScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="ulRightAbducentImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="ulRightAbducentLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ ulRightAbducentEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.ulRightAbducent }}kg
                </div>
                <div class="val-item">
                  推荐值: {{ ulRightAbducentRecommend }}kg
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>上肢右外展得分: {{ ulRightAbducentScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="score-img"
                :src="sixRateLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ sixRateEvaluate }}</div>
                <div class="val-item">
                  测量比 {{ ulLeftAbducentRate }}：{{ 100 }}
                </div>
                <div class="val-item">推荐比 {{ 100 }}：{{ 100 }}</div>
              </div>
            </div>
            <div class="bottom">
              <div>肌力比得分: {{ sixRateScore }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 下肢左后伸、右后伸 -->
    <div
      v-if="
        testData.resultValue.llAfterLeftOut &&
        testData.resultValue.llAfterRightOut
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
        <div class="item">年龄：{{ testData.currentAge }}</div>
        <div class="item">测试日期：{{ testData.pdfTime }}</div>
      </div>
      <div class="divider"></div>
      <div class="main">
        <div class="title">下肢：后伸</div>
        <div class="content">
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="llAfterLeftOutImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="llAfterLeftOutLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ llAfterLeftOutEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.llAfterLeftOut }}kg
                </div>
                <div class="val-item">
                  推荐值: {{ llAfterLeftOutRecommend }}kg
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>下肢左后伸得分: {{ llAfterLeftOutScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="llAfterRightOutImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="llAfterRightOutLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ llAfterRightOutEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.llAfterRightOut }}kg
                </div>
                <div class="val-item">
                  推荐值: {{ llAfterRightOutRecommend }}kg
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>下肢右后伸得分: {{ llAfterRightOutScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="score-img"
                :src="sevenRateLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ sevenRateEvaluate }}</div>
                <div class="val-item">
                  测量比 {{ llAfterLeftOutRate }}：{{ 100 }}
                </div>
                <div class="val-item">推荐比 {{ 100 }}：{{ 100 }}</div>
              </div>
            </div>
            <div class="bottom">
              <div>肌力比得分: {{ sevenRateScore }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 下肢左外展、右外展 -->
    <div
      v-if="
        testData.resultValue.llLeftAbducent &&
        testData.resultValue.llRightAbducent
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
        <div class="item">年龄：{{ testData.currentAge }}</div>
        <div class="item">测试日期：{{ testData.pdfTime }}</div>
      </div>
      <div class="divider"></div>
      <div class="main">
        <div class="title">下肢：外展</div>
        <div class="content">
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="llLeftAbducentImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="llLeftAbducentLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ llLeftAbducentEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.llLeftAbducent }}kg
                </div>
                <div class="val-item">
                  推荐值: {{ llLeftAbducentRecommend }}kg
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>下肢左外展得分: {{ llLeftAbducentScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="llRightAbducentImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="llRightAbducentLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ llRightAbducentEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.llRightAbducent }}kg
                </div>
                <div class="val-item">
                  推荐值: {{ llRightAbducentRecommend }}kg
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>下肢右外展得分: {{ llRightAbducentScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="score-img"
                :src="eightRateLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ eightRateEvaluate }}</div>
                <div class="val-item">
                  测量比 {{ llLeftAbducentRate }}：{{ 100 }}
                </div>
                <div class="val-item">推荐比 {{ 100 }}：{{ 100 }}</div>
              </div>
            </div>
            <div class="bottom">
              <div>肌力比得分: {{ eightRateScore }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 下肢左内收、右内收 -->
    <div
      v-if="
        testData.resultValue.llLeftInsideCollect &&
        testData.resultValue.llRightInsideCollect
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
        <div class="item">年龄：{{ testData.currentAge }}</div>
        <div class="item">测试日期：{{ testData.pdfTime }}</div>
      </div>
      <div class="divider"></div>
      <div class="main">
        <div class="title">下肢：内收</div>
        <div class="content">
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="llLeftInsideCollectImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="llLeftInsideCollectLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ llLeftInsideCollectEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.llLeftInsideCollect }}kg
                </div>
                <div class="val-item">
                  推荐值: {{ llLeftInsideCollectRecommend }}kg
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>下肢左内收得分: {{ llLeftInsideCollectScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="body-img"
                :src="llRightInsideCollectImg"
                fit="scale-down"
              ></el-image>
              <el-image
                class="score-img"
                :src="llRightInsideCollectLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ llRightInsideCollectEvaluate }}</div>
                <div class="val-item">
                  测量值: {{ testData.resultValue.llRightInsideCollect }}kg
                </div>
                <div class="val-item">
                  推荐值: {{ llRightInsideCollectRecommend }}kg
                </div>
              </div>
            </div>
            <div class="bottom">
              <div>下肢右内收得分: {{ llRightInsideCollectScore }}</div>
            </div>
          </div>
          <div class="item">
            <div class="top">
              <el-image
                class="score-img"
                :src="nineRateLevel"
                fit="scale-down"
              ></el-image>
              <div class="val">
                <div class="level-text">{{ nineRateEvaluate }}</div>
                <div class="val-item">
                  测量比 {{ llLeftInsideCollectRate }}：{{ 100 }}
                </div>
                <div class="val-item">推荐比 {{ 100 }}：{{ 100 }}</div>
              </div>
            </div>
            <div class="bottom">
              <div>肌力比得分: {{ nineRateScore }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrapper-table">
      <!-- 表格 -->
      <div class="table">
        <table class="item" border="1">
          <tr :style="{ height: '40px' }" bgcolor="#E7E6E6" align="center">
            <td rowspan="2">测量名称</td>
            <td colspan="3">绝对肌力值</td>
            <td colspan="3">肌力比</td>
            <td colspan="2">总成绩</td>
          </tr>
          <tr :style="{ height: '40px' }" bgcolor="#E7E6E6" align="center">
            <td>测量值(kg)</td>
            <td>推荐值(kg)</td>
            <td>得分</td>
            <td>测量值</td>
            <td>推荐值</td>
            <td>得分</td>
            <td>得分</td>
          </tr>
          <!-- 颈椎后伸、前屈 -->
          <tr
            align="center"
            v-if="
              testData.resultValue.cvRearProtraction &&
              testData.resultValue.cvAnteflexion
            "
          >
            <td bgcolor="#E7E6E6">颈椎后伸</td>
            <td>{{ testData.resultValue.cvRearProtraction }}</td>
            <td>{{ cvRearProtractionRecommend }}</td>
            <td>
              {{ cvRearProtractionScore }}({{ cvRearProtractionEvaluate }})
            </td>
            <td rowspan="2">{{ cvRearProtractionRate }} : {{ 100 }}</td>
            <td rowspan="2">
              {{ testData.sex === '男' ? 140 : 170 }}：{{ 100 }}
            </td>
            <td rowspan="2">{{ oneRateScore }}({{ oneRateEvaluate }})</td>
            <td rowspan="2">
              {{
                parseFloat(
                  (
                    (cvRearProtractionScore +
                      cvAnteflexionScore +
                      oneRateScore) /
                    3
                  ).toFixed(1)
                )
              }}
            </td>
          </tr>
          <tr
            align="center"
            v-if="
              testData.resultValue.cvRearProtraction &&
              testData.resultValue.cvAnteflexion
            "
          >
            <td bgcolor="#E7E6E6">颈椎前屈</td>
            <td>{{ testData.resultValue.cvAnteflexion }}</td>
            <td>{{ cvAnteflexionRecommend }}</td>
            <td>{{ cvAnteflexionScore }}({{ cvAnteflexionEvaluate }})</td>
          </tr>
          <!-- 颈椎左侧屈、右侧屈 -->
          <tr
            align="center"
            v-if="
              testData.resultValue.cvLeftSide &&
              testData.resultValue.cvRightSide
            "
          >
            <td bgcolor="#E7E6E6">颈椎左侧屈</td>
            <td>{{ testData.resultValue.cvLeftSide }}</td>
            <td>{{ cvLeftSideRecommend }}</td>
            <td>{{ cvLeftSideScore }}({{ cvLeftSideEvaluate }})</td>
            <td rowspan="2">{{ cvLeftSideRate }} : {{ 100 }}</td>
            <td rowspan="2">{{ 100 }}：{{ 100 }}</td>
            <td rowspan="2">{{ twoRateScore }}({{ twoRateEvaluate }})</td>
            <td rowspan="2">
              {{
                parseFloat(
                  (
                    (cvLeftSideScore + cvRightSideScore + twoRateScore) /
                    3
                  ).toFixed(1)
                )
              }}
            </td>
          </tr>
          <tr
            align="center"
            v-if="
              testData.resultValue.cvLeftSide &&
              testData.resultValue.cvRightSide
            "
          >
            <td bgcolor="#E7E6E6">颈椎右侧屈</td>
            <td>{{ testData.resultValue.cvRightSide }}</td>
            <td>{{ cvRightSideRecommend }}</td>
            <td>{{ cvRightSideScore }}({{ cvRightSideEvaluate }})</td>
          </tr>
          <!-- 躯干后伸、前屈 -->
          <tr
            align="center"
            v-if="
              testData.resultValue.tRearProtraction &&
              testData.resultValue.tAnteflexion
            "
          >
            <td bgcolor="#E7E6E6">躯干后伸</td>
            <td>{{ testData.resultValue.tRearProtraction }}</td>
            <td>{{ tRearProtractionRecommend }}</td>
            <td>{{ tRearProtractionScore }}({{ tRearProtractionEvaluate }})</td>
            <td rowspan="2">{{ tRearProtractionRate }} : {{ 100 }}</td>
            <td rowspan="2">
              {{ testData.sex === '男' ? 130 : 150 }}：{{ 100 }}
            </td>
            <td rowspan="2">{{ threeRateScore }}({{ threeRateEvaluate }})</td>
            <td rowspan="2">
              {{
                parseFloat(
                  (
                    (tRearProtractionScore +
                      tAnteflexionScore +
                      threeRateScore) /
                    3
                  ).toFixed(1)
                )
              }}
            </td>
          </tr>
          <tr
            align="center"
            v-if="
              testData.resultValue.tRearProtraction &&
              testData.resultValue.tAnteflexion
            "
          >
            <td bgcolor="#E7E6E6">躯干前屈</td>
            <td>{{ testData.resultValue.tAnteflexion }}</td>
            <td>{{ tAnteflexionRecommend }}</td>
            <td>{{ tAnteflexionScore }}({{ tAnteflexionEvaluate }})</td>
          </tr>
          <!-- 躯干左侧屈、右侧屈 -->
          <tr
            align="center"
            v-if="
              testData.resultValue.tLeftSide && testData.resultValue.tRightSide
            "
          >
            <td bgcolor="#E7E6E6">躯干左侧屈</td>
            <td>{{ testData.resultValue.tLeftSide }}</td>
            <td>{{ tLeftSideRecommend }}</td>
            <td>{{ tLeftSideScore }}({{ tLeftSideEvaluate }})</td>
            <td rowspan="2">{{ tLeftSideRate }} : {{ 100 }}</td>
            <td rowspan="2">{{ 100 }}：{{ 100 }}</td>
            <td rowspan="2">{{ fourRateScore }}({{ fourRateEvaluate }})</td>
            <td rowspan="2">
              {{
                parseFloat(
                  (
                    (tLeftSideScore + tRightSideScore + fourRateScore) /
                    3
                  ).toFixed(1)
                )
              }}
            </td>
          </tr>
          <tr
            align="center"
            v-if="
              testData.resultValue.tLeftSide && testData.resultValue.tRightSide
            "
          >
            <td bgcolor="#E7E6E6">躯干右侧屈</td>
            <td>{{ testData.resultValue.tRightSide }}</td>
            <td>{{ tRightSideRecommend }}</td>
            <td>{{ tRightSideScore }}({{ tRightSideEvaluate }})</td>
          </tr>
          <!-- 上肢推、拉 -->
          <tr
            align="center"
            v-if="testData.resultValue.ulPush && testData.resultValue.ulPull"
          >
            <td bgcolor="#E7E6E6">上肢推</td>
            <td>{{ testData.resultValue.ulPush }}</td>
            <td>{{ ulPushRecommend }}</td>
            <td>{{ ulPushScore }}({{ ulPushEvaluate }})</td>
            <td rowspan="2">{{ ulPushRate }} : {{ 100 }}</td>
            <td rowspan="2">{{ 150 }}：{{ 100 }}</td>
            <td rowspan="2">{{ fiveRateScore }}({{ fiveRateEvaluate }})</td>
            <td rowspan="2">
              {{
                parseFloat(
                  ((ulPushScore + ulPullScore + fiveRateScore) / 3).toFixed(1)
                )
              }}
            </td>
          </tr>
          <tr
            align="center"
            v-if="testData.resultValue.ulPush && testData.resultValue.ulPull"
          >
            <td bgcolor="#E7E6E6">上肢拉</td>
            <td>{{ testData.resultValue.ulPull }}</td>
            <td>{{ ulPullRecommend }}</td>
            <td>{{ ulPullScore }}({{ ulPullEvaluate }})</td>
          </tr>
          <!-- 上肢左外展、右外展 -->
          <tr
            align="center"
            v-if="
              testData.resultValue.ulLeftAbducent &&
              testData.resultValue.ulRightAbducent
            "
          >
            <td bgcolor="#E7E6E6">上肢左外展</td>
            <td>{{ testData.resultValue.ulLeftAbducent }}</td>
            <td>{{ ulLeftAbducentRecommend }}</td>
            <td>{{ ulLeftAbducentScore }}({{ ulLeftAbducentEvaluate }})</td>
            <td rowspan="2">{{ ulLeftAbducentRate }} : {{ 100 }}</td>
            <td rowspan="2">{{ 100 }}：{{ 100 }}</td>
            <td rowspan="2">{{ sixRateScore }}({{ sixRateEvaluate }})</td>
            <td rowspan="2">
              {{
                parseFloat(
                  (
                    (ulLeftAbducentScore +
                      ulRightAbducentScore +
                      sixRateScore) /
                    3
                  ).toFixed(1)
                )
              }}
            </td>
          </tr>
          <tr
            align="center"
            v-if="
              testData.resultValue.ulLeftAbducent &&
              testData.resultValue.ulRightAbducent
            "
          >
            <td bgcolor="#E7E6E6">上肢右外展</td>
            <td>{{ testData.resultValue.ulRightAbducent }}</td>
            <td>{{ ulRightAbducentRecommend }}</td>
            <td>{{ ulRightAbducentScore }}({{ ulRightAbducentEvaluate }})</td>
          </tr>
          <!-- 下肢左后伸、右后伸 -->
          <tr
            align="center"
            v-if="
              testData.resultValue.llAfterLeftOut &&
              testData.resultValue.llAfterRightOut
            "
          >
            <td bgcolor="#E7E6E6">下肢左后伸</td>
            <td>{{ testData.resultValue.llAfterLeftOut }}</td>
            <td>{{ llAfterLeftOutRecommend }}</td>
            <td>{{ llAfterLeftOutScore }}({{ llAfterLeftOutEvaluate }})</td>
            <td rowspan="2">{{ llAfterLeftOutRate }} : {{ 100 }}</td>
            <td rowspan="2">{{ 100 }}：{{ 100 }}</td>
            <td rowspan="2">{{ sevenRateScore }}({{ sevenRateEvaluate }})</td>
            <td rowspan="2">
              {{
                parseFloat(
                  (
                    (llAfterLeftOutScore +
                      llAfterRightOutScore +
                      sevenRateScore) /
                    3
                  ).toFixed(1)
                )
              }}
            </td>
          </tr>
          <tr
            align="center"
            v-if="
              testData.resultValue.llAfterLeftOut &&
              testData.resultValue.llAfterRightOut
            "
          >
            <td bgcolor="#E7E6E6">下肢右后伸</td>
            <td>{{ testData.resultValue.llAfterRightOut }}</td>
            <td>{{ llAfterRightOutRecommend }}</td>
            <td>{{ llAfterRightOutScore }}({{ llAfterRightOutEvaluate }})</td>
          </tr>
          <!-- 下肢左外展、右外展 -->
          <tr
            align="center"
            v-if="
              testData.resultValue.llLeftAbducent &&
              testData.resultValue.llRightAbducent
            "
          >
            <td bgcolor="#E7E6E6">下肢左外展</td>
            <td>{{ testData.resultValue.llLeftAbducent }}</td>
            <td>{{ llLeftAbducentRecommend }}</td>
            <td>{{ llLeftAbducentScore }}({{ llLeftAbducentEvaluate }})</td>
            <td rowspan="2">{{ llLeftAbducentRate }} : {{ 100 }}</td>
            <td rowspan="2">{{ 100 }}：{{ 100 }}</td>
            <td rowspan="2">{{ eightRateScore }}({{ eightRateEvaluate }})</td>
            <td rowspan="2">
              {{
                parseFloat(
                  (
                    (llLeftAbducentScore +
                      llRightAbducentScore +
                      eightRateScore) /
                    3
                  ).toFixed(1)
                )
              }}
            </td>
          </tr>
          <tr
            align="center"
            v-if="
              testData.resultValue.llLeftAbducent &&
              testData.resultValue.llRightAbducent
            "
          >
            <td bgcolor="#E7E6E6">下肢右外展</td>
            <td>{{ testData.resultValue.llRightAbducent }}</td>
            <td>{{ llRightAbducentRecommend }}</td>
            <td>{{ llRightAbducentScore }}({{ llRightAbducentEvaluate }})</td>
          </tr>
          <!-- 下肢左内收、右内收 -->
          <tr
            align="center"
            v-if="
              testData.resultValue.llLeftInsideCollect &&
              testData.resultValue.llRightInsideCollect
            "
          >
            <td bgcolor="#E7E6E6">下肢左内收</td>
            <td>{{ testData.resultValue.llLeftInsideCollect }}</td>
            <td>{{ llLeftInsideCollectRecommend }}</td>
            <td>
              {{ llLeftInsideCollectScore }}({{ llLeftInsideCollectEvaluate }})
            </td>
            <td rowspan="2">{{ llLeftInsideCollectRate }} : {{ 100 }}</td>
            <td rowspan="2">{{ 100 }}：{{ 100 }}</td>
            <td rowspan="2">{{ nineRateScore }}({{ nineRateEvaluate }})</td>
            <td rowspan="2">
              {{
                parseFloat(
                  (
                    (llLeftInsideCollectScore +
                      llRightInsideCollectScore +
                      nineRateScore) /
                    3
                  ).toFixed(1)
                )
              }}
            </td>
          </tr>
          <tr
            align="center"
            v-if="
              testData.resultValue.llLeftInsideCollect &&
              testData.resultValue.llRightInsideCollect
            "
          >
            <td bgcolor="#E7E6E6">下肢右内收</td>
            <td>{{ testData.resultValue.llRightInsideCollect }}</td>
            <td>{{ llRightInsideCollectRecommend }}</td>
            <td>
              {{ llRightInsideCollectScore }}({{
                llRightInsideCollectEvaluate
              }})
            </td>
          </tr>
        </table>
      </div>

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
      cvLeftSideImg: require('@/assets/img/Test/body_maps/颈椎左侧屈.png'), // 颈椎左侧屈
      cvRightSideImg: require('@/assets/img/Test/body_maps/颈椎右侧屈.png'), // 颈椎右侧屈
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
          cvLeftSide: 0, // 颈椎左侧屈，cervical-vertebra-leftSide
          cvRightSide: 0, // 颈椎右侧屈，cervical-vertebra-rightSi
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
      cvLeftSideRecommend: '', // 颈椎左侧屈推荐值
      cvRightSideRecommend: '', // 颈椎右侧屈推荐值
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
      cvLeftSideRate: '', // 颈椎左侧屈比率
      tRearProtractionRate: '', // 躯干后伸比率
      tLeftSideRate: '', // 躯干左侧屈比率
      ulPushRate: '', // 上肢推比率
      ulLeftAbducentRate: '', // 上肢左外展比率
      llAfterLeftOutRate: '', // 下肢左后伸比率
      llLeftAbducentRate: '', // 下肢左外展比率
      llLeftInsideCollectRate: '', // 下肢左内收比率

      /* 得分 */
      cvRearProtractionScore: '', // 颈椎后伸得分
      cvAnteflexionScore: '', // 颈椎前屈得分
      oneRateScore: '', // 颈椎：后伸/前屈肌力比得分

      cvLeftSideScore: '', // 颈椎左侧屈得分
      cvRightSideScore: '', // 颈椎右侧屈得分
      twoRateScore: '', // 颈椎：侧屈肌力比得分

      tRearProtractionScore: '', // 躯干后伸得分
      tAnteflexionScore: '', // 躯干前屈得分
      threeRateScore: '', // 躯干：后伸/前屈肌力比得分

      tLeftSideScore: '', // 躯干左侧屈得分
      tRightSideScore: '', // 躯干右侧屈得分
      fourRateScore: '', // 躯干：侧屈肌力比得分

      ulPushScore: '', // 上肢推得分
      ulPullScore: '', // 上肢拉得分
      fiveRateScore: '', // 上肢：推/拉肌力比得分

      ulLeftAbducentScore: '', // 上肢左外展得分
      ulRightAbducentScore: '', // 上肢右外展得分
      sixRateScore: '', // 上肢：外展肌力比得分

      llAfterLeftOutScore: '', // 下肢左后伸得分
      llAfterRightOutScore: '', // 下肢右后伸得分
      sevenRateScore: '', // 下肢：后伸肌力比得分

      llLeftAbducentScore: '', // 下肢左外展得分
      llRightAbducentScore: '', // 下肢右外展得分
      eightRateScore: '', // 下肢：外展肌力比得分

      llLeftInsideCollectScore: '', // 下肢左内收得分
      llRightInsideCollectScore: '', // 下肢右内收得分
      nineRateScore: '', // 下肢：内收肌力比得分

      /* 等级评价 */
      cvRearProtractionLevel: '', // 颈椎后伸等级图
      cvAnteflexionLevel: '', // 颈椎前屈等级图
      oneRateLevel: '', // 颈椎：后伸/前屈肌力比等级图
      cvRearProtractionEvaluate: '', // 颈椎后伸评价
      cvAnteflexionEvaluate: '', // 颈椎前屈评价
      oneRateEvaluate: '', // 颈椎：后伸/前屈肌力比评价

      cvLeftSideLevel: '', // 颈椎左侧屈等级图
      cvRightSideLevel: '', // 颈椎右侧屈等级图
      twoRateLevel: '', // 颈椎：侧屈肌力比等级图
      cvLeftSideEvaluate: '', // 颈椎左侧屈评价
      cvRightSideEvaluate: '', // 颈椎右侧屈评价
      twoRateEvaluate: '', // 颈椎：侧屈肌力比评价

      tRearProtractionLevel: '', // 躯干后伸等级图
      tAnteflexionLevel: '', // 躯干前屈等级图
      threeRateLevel: '', // 躯干：后伸/前屈肌力比等级图
      tRearProtractionEvaluate: '', // 躯干后伸评价
      tAnteflexionEvaluate: '', // 躯干前屈评价
      threeRateEvaluate: '', // 躯干：后伸/前屈肌力比评价

      tLeftSideLevel: '', // 躯干左侧屈等级图
      tRightSideLevel: '', // 躯干右侧屈等级图
      fourRateLevel: '', // 躯干：侧屈肌力比等级图
      tLeftSideEvaluate: '', // 躯干左侧屈评价
      tRightSideEvaluate: '', // 躯干右侧屈评价
      fourRateEvaluate: '', // 躯干：侧屈肌力比评价

      ulPushLevel: '', // 上肢推等级图
      ulPullLevel: '', // 上肢拉等级图
      fiveRateLevel: '', // 上肢：推/拉肌力比等级图
      ulPushEvaluate: '', // 上肢推评价
      ulPullEvaluate: '', // 上肢拉评价
      fiveRateEvaluate: '', // 上肢：推/拉肌力比评价

      ulLeftAbducentLevel: '', // 上肢左外展等级图
      ulRightAbducentLevel: '', // 上肢右外展等级图
      sixRateLevel: '', // 上肢：外展肌力比等级图
      ulLeftAbducentEvaluate: '', // 上肢左外展评价
      ulRightAbducentEvaluate: '', // 上肢右外展评价
      sixRateEvaluate: '', // 上肢：外展肌力比评价

      llAfterLeftOutLevel: '', // 下肢左后伸等级图
      llAfterRightOutLevel: '', // 下肢右后伸等级图
      sevenRateLevel: '', // 下肢：后伸肌力比等级图
      llAfterLeftOutEvaluate: '', // 下肢左后伸评价
      llAfterRightOutEvaluate: '', // 下肢右后伸评价
      sevenRateEvaluate: '', // 下肢：后伸肌力比评价

      llLeftAbducentLevel: '', // 下肢左外展等级图
      llRightAbducentLevel: '', // 下肢右外展等级图
      eightRateLevel: '', // 下肢：外展肌力比等级图
      llLeftAbducentEvaluate: '', // 下肢左外展评价
      llRightAbducentEvaluate: '', // 下肢右外展评价
      eightRateEvaluate: '', // 下肢：外展肌力比评价

      llLeftInsideCollectLevel: '', // 下肢左内收等级图
      llRightInsideCollectLevel: '', // 下肢右内收等级图
      nineRateLevel: '', // 下肢：内收肌力比等级图
      llLeftInsideCollectEvaluate: '', // 下肢左内收评价
      llRightInsideCollectEvaluate: '', // 下肢右内收评价
      nineRateEvaluate: '' // 下肢：内收肌力比评价
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
          // 计算测量肌力比
          this.calculateMuscleRate()
        })
        .then(() => {
          // 计算推荐值
          this.calculateRecommend()
        })
        .then(() => {
          // 计算得分
          this.calculateScore()
        })
        .then(() => {
          // 计算分级评价
          this.calculateClassification()
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
      const currentAge = this.testData.currentAge // 当时测试时的岁数
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
            0.18 * weight * (1 - (currentAge - 40) * 0.01)
        } else {
          this.cvRearProtractionRecommend = 0.18 * weight
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
            0.106 * weight * (1 - (currentAge - 40) * 0.01)
        } else {
          this.cvAnteflexionRecommend = 0.106 * weight
        }
      }
      this.cvAnteflexionRecommend = parseFloat(
        this.cvAnteflexionRecommend.toFixed(1)
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
     * @description: 计算测量肌力比
     */
    calculateMuscleRate() {
      // 颈椎：后伸/前屈
      if (
        this.testData.resultValue.cvRearProtraction &&
        this.testData.resultValue.cvAnteflexion
      ) {
        this.cvRearProtractionRate = parseInt(
          (
            (100 / this.testData.resultValue.cvAnteflexion) *
            this.testData.resultValue.cvRearProtraction
          ).toFixed(0)
        )
      }

      // 颈椎：侧屈
      if (
        this.testData.resultValue.cvLeftSide &&
        this.testData.resultValue.cvRightSide
      ) {
        this.cvLeftSideRate = parseInt(
          (
            (100 / this.testData.resultValue.cvRightSide) *
            this.testData.resultValue.cvLeftSide
          ).toFixed(0)
        )
      }

      // 躯干：后伸/前屈
      if (
        this.testData.resultValue.tRearProtraction &&
        this.testData.resultValue.tAnteflexion
      ) {
        this.tRearProtractionRate = parseInt(
          (
            (100 / this.testData.resultValue.tAnteflexion) *
            this.testData.resultValue.tRearProtraction
          ).toFixed(0)
        )
      }

      // 躯干：侧屈
      if (
        this.testData.resultValue.tLeftSide &&
        this.testData.resultValue.tRightSide
      ) {
        this.tLeftSideRate = parseInt(
          (
            (100 / this.testData.resultValue.tRightSide) *
            this.testData.resultValue.tLeftSide
          ).toFixed(0)
        )
      }

      // 上肢：推/拉
      if (
        this.testData.resultValue.ulPush &&
        this.testData.resultValue.ulPull
      ) {
        this.ulPushRate = parseInt(
          (
            (100 / this.testData.resultValue.ulPull) *
            this.testData.resultValue.ulPush
          ).toFixed(0)
        )
      }

      // 上肢：外展
      if (
        this.testData.resultValue.ulLeftAbducent &&
        this.testData.resultValue.ulRightAbducent
      ) {
        this.ulLeftAbducentRate = parseInt(
          (
            (100 / this.testData.resultValue.ulRightAbducent) *
            this.testData.resultValue.ulLeftAbducent
          ).toFixed(0)
        )
      }

      // 下肢：后伸
      if (
        this.testData.resultValue.llAfterLeftOut &&
        this.testData.resultValue.llAfterRightOut
      ) {
        this.llAfterLeftOutRate = parseInt(
          (
            (100 / this.testData.resultValue.llAfterRightOut) *
            this.testData.resultValue.llAfterLeftOut
          ).toFixed(0)
        )
      }

      // 下肢：外展
      if (
        this.testData.resultValue.llLeftAbducent &&
        this.testData.resultValue.llRightAbducent
      ) {
        this.llLeftAbducentRate = parseInt(
          (
            (100 / this.testData.resultValue.llRightAbducent) *
            this.testData.resultValue.llLeftAbducent
          ).toFixed(0)
        )
      }

      // 下肢：内收
      if (
        this.testData.resultValue.llLeftInsideCollect &&
        this.testData.resultValue.llRightInsideCollect
      ) {
        this.llLeftInsideCollectRate = parseInt(
          (
            (100 / this.testData.resultValue.llRightInsideCollect) *
            this.testData.resultValue.llLeftInsideCollect
          ).toFixed(0)
        )
      }
    },

    /**
     * @description: 计算得分
     */
    calculateScore() {
      /* 颈椎：后伸/前屈 */
      // 颈椎后伸
      if (
        this.testData.resultValue.cvRearProtraction <
        this.cvRearProtractionRecommend * 2
      ) {
        this.cvRearProtractionScore =
          (this.testData.resultValue.cvRearProtraction /
            (this.cvRearProtractionRecommend * 2)) *
          10
      } else {
        this.cvRearProtractionScore = 10
      }
      this.cvRearProtractionScore = parseFloat(
        this.cvRearProtractionScore.toFixed(1)
      )
      // 颈椎前屈
      if (
        this.testData.resultValue.cvAnteflexion <
        this.cvAnteflexionRecommend * 2
      ) {
        this.cvAnteflexionScore =
          (this.testData.resultValue.cvAnteflexion /
            (this.cvAnteflexionRecommend * 2)) *
          10
      } else {
        this.cvAnteflexionScore = 10
      }
      this.cvAnteflexionScore = parseFloat(this.cvAnteflexionScore.toFixed(1))
      // 肌力比得分
      const one =
        this.testData.resultValue.cvRearProtraction /
        this.testData.resultValue.cvAnteflexion
      if (this.testData.sex === '男') {
        if (one >= 1.35 && one <= 1.45) {
          this.oneRateScore = 10
        } else if (one > 1.2 && one < 1.35) {
          this.oneRateScore = 3.33 * (one - 1.2) * 10 + 5
        } else if (one > 1.45 && one < 1.6) {
          this.oneRateScore = 10 - 3.33 * (one - 1.45) * 10
        } else if (one === 1.2 || one === 1.6) {
          this.oneRateScore = 5
        } else if (one > 1.05 && one < 1.2) {
          this.oneRateScore = 5 - 3.33 * (1.2 - one) * 10
        } else if (one > 1.6 && one < 1.75) {
          this.oneRateScore = 5 - 3.33 * (one - 1.6) * 10
        } else {
          this.oneRateScore = 0
        }
      } else {
        if (one >= 1.6 && one <= 1.75) {
          this.oneRateScore = 10
        } else if (one > 1.5 && one < 1.65) {
          this.oneRateScore = 3.33 * (one - 1.5) * 10 + 5
        } else if (one > 1.75 && one < 1.9) {
          this.oneRateScore = 10 - 3.33 * (one - 1.75) * 10
        } else if (one === 1.5 || one === 1.9) {
          this.oneRateScore = 5
        } else if (one > 1.35 && one < 1.5) {
          this.oneRateScore = 5 - 3.33 * (1.5 - one) * 10
        } else if (one > 1.9 && one < 2.05) {
          this.oneRateScore = 5 - 3.33 * (one - 1.9) * 10
        } else {
          this.oneRateScore = 0
        }
      }
      this.oneRateScore = parseFloat(this.oneRateScore.toFixed(1))

      /* 颈椎：侧屈 */
      // 颈椎左侧屈
      if (this.testData.resultValue.cvLeftSide < this.cvLeftSideRecommend * 2) {
        this.cvLeftSideScore =
          (this.testData.resultValue.cvLeftSide /
            (this.cvLeftSideRecommend * 2)) *
          10
      } else {
        this.cvLeftSideScore = 10
      }
      this.cvLeftSideScore = parseFloat(this.cvLeftSideScore.toFixed(1))
      // 颈椎右侧屈
      if (
        this.testData.resultValue.cvRightSide <
        this.cvRightSideRecommend * 2
      ) {
        this.cvRightSideScore =
          (this.testData.resultValue.cvRightSide /
            (this.cvRightSideRecommend * 2)) *
          10
      } else {
        this.cvRightSideScore = 10
      }
      this.cvRightSideScore = parseFloat(this.cvRightSideScore.toFixed(1))
      // 肌力比得分
      const two =
        this.testData.resultValue.cvLeftSide /
        this.testData.resultValue.cvRightSide
      if (two >= 0.95 && two <= 1.05) {
        this.twoRateScore = 10
      } else if (two > 0.8 && two < 0.95) {
        this.twoRateScore = 3.33 * (two - 0.8) * 10 + 5
      } else if (two > 1.05 && two < 1.2) {
        this.twoRateScore = 10 - 3.33 * (two - 1.05) * 10
      } else if (two === 0.8 || two === 1.2) {
        this.twoRateScore = 5
      } else if (two > 0.65 && two < 0.8) {
        this.twoRateScore = 5 - 3.33 * (0.8 - two) * 10
      } else if (two > 1.2 && two < 1.35) {
        this.twoRateScore = 5 - 3.33 * (two - 1.2) * 10
      } else {
        this.twoRateScore = 0
      }
      this.twoRateScore = parseFloat(this.twoRateScore.toFixed(1))

      /* 躯干：后伸/前屈 */
      // 躯干后伸
      if (
        this.testData.resultValue.tRearProtraction <
        this.tRearProtractionRecommend * 2
      ) {
        this.tRearProtractionScore =
          (this.testData.resultValue.tRearProtraction /
            (this.tRearProtractionRecommend * 2)) *
          10
      } else {
        this.tRearProtractionScore = 10
      }
      this.tRearProtractionScore = parseFloat(
        this.tRearProtractionScore.toFixed(1)
      )
      // 躯干前屈
      if (
        this.testData.resultValue.tAnteflexion <
        this.tAnteflexionRecommend * 2
      ) {
        this.tAnteflexionScore =
          (this.testData.resultValue.tAnteflexion /
            (this.tAnteflexionRecommend * 2)) *
          10
      } else {
        this.tAnteflexionScore = 10
      }
      this.tAnteflexionScore = parseFloat(this.tAnteflexionScore.toFixed(1))
      // 肌力比得分
      const three =
        this.testData.resultValue.tRearProtraction /
        this.testData.resultValue.tAnteflexion
      if (this.testData.sex === '男') {
        if (three >= 1.2 && three <= 1.35) {
          this.threeRateScore = 10
        } else if (three > 1.1 && three < 1.25) {
          this.threeRateScore = 3.33 * (three - 1.1) * 10 + 5
        } else if (three > 1.35 && three < 1.5) {
          this.threeRateScore = 10 - 3.33 * (three - 1.35) * 10
        } else if (three === 1.1 || three === 1.5) {
          this.threeRateScore = 5
        } else if (three > 0.95 && three < 1.1) {
          this.threeRateScore = 5 - 3.33 * (1.1 - three) * 10
        } else if (three > 1.5 && three < 1.65) {
          this.threeRateScore = 5 - 3.33 * (three - 1.5) * 10
        } else {
          this.threeRateScore = 0
        }
      } else {
        if (three >= 1.45 && three <= 1.55) {
          this.threeRateScore = 10
        } else if (three > 1.3 && three < 1.45) {
          this.threeRateScore = 3.33 * (three - 1.3) * 10 + 5
        } else if (three > 1.55 && three < 1.7) {
          this.threeRateScore = 10 - 3.33 * (three - 1.55) * 10
        } else if (three === 1.3 || three === 1.7) {
          this.threeRateScore = 5
        } else if (three > 1.15 && three < 1.3) {
          this.threeRateScore = 5 - 3.33 * (1.3 - three) * 10
        } else if (three > 1.7 && three < 1.85) {
          this.threeRateScore = 5 - 3.33 * (three - 1.7) * 10
        } else {
          this.threeRateScore = 0
        }
      }
      this.threeRateScore = parseFloat(this.threeRateScore.toFixed(1))

      /* 躯干：侧屈 */
      // 躯干左侧屈
      if (this.testData.resultValue.tLeftSide < this.tLeftSideRecommend * 2) {
        this.tLeftSideScore =
          (this.testData.resultValue.tLeftSide /
            (this.tLeftSideRecommend * 2)) *
          10
      } else {
        this.tLeftSideScore = 10
      }
      this.tLeftSideScore = parseFloat(this.tLeftSideScore.toFixed(1))
      // 躯干右侧屈
      if (this.testData.resultValue.tRightSide < this.tRightSideRecommend * 2) {
        this.tRightSideScore =
          (this.testData.resultValue.tRightSide /
            (this.tRightSideRecommend * 2)) *
          10
      } else {
        this.tRightSideScore = 10
      }
      this.tRightSideScore = parseFloat(this.tRightSideScore.toFixed(1))
      // 肌力比得分
      const four =
        this.testData.resultValue.tLeftSide /
        this.testData.resultValue.tRightSide
      if (four >= 0.95 && four <= 1.05) {
        this.fourRateScore = 10
      } else if (four > 0.8 && four < 0.95) {
        this.fourRateScore = 3.33 * (four - 0.8) * 10 + 5
      } else if (four > 1.05 && four < 1.2) {
        this.fourRateScore = 10 - 3.33 * (four - 1.05) * 10
      } else if (four === 0.8 || four === 1.2) {
        this.fourRateScore = 5
      } else if (four > 0.65 && four < 0.8) {
        this.fourRateScore = 5 - 3.33 * (0.8 - four) * 10
      } else if (four > 1.2 && four < 1.35) {
        this.fourRateScore = 5 - 3.33 * (four - 1.2) * 10
      } else {
        this.fourRateScore = 0
      }
      this.fourRateScore = parseFloat(this.fourRateScore.toFixed(1))

      /* 上肢：推/拉 */
      // 上肢推
      if (this.testData.resultValue.ulPush < this.ulPushRecommend * 2) {
        this.ulPushScore =
          (this.testData.resultValue.ulPush / (this.ulPushRecommend * 2)) * 10
      } else {
        this.ulPushScore = 10
      }
      this.ulPushScore = parseFloat(this.ulPushScore.toFixed(1))
      // 上肢拉
      if (this.testData.resultValue.ulPull < this.ulPullRecommend * 2) {
        this.ulPullScore =
          (this.testData.resultValue.ulPull / (this.ulPullRecommend * 2)) * 10
      } else {
        this.ulPullScore = 10
      }
      this.ulPullScore = parseFloat(this.ulPullScore.toFixed(1))
      // 肌力比得分
      const five =
        this.testData.resultValue.ulPush / this.testData.resultValue.ulPull
      if (five >= 1.45 && five <= 1.55) {
        this.fiveRateScore = 10
      } else if (five > 1.3 && five < 1.45) {
        this.fiveRateScore = 3.33 * (five - 1.3) * 10 + 5
      } else if (five > 1.55 && five < 1.7) {
        this.fiveRateScore = 10 - 3.33 * (five - 1.55) * 10
      } else if (five === 1.3 || five === 1.7) {
        this.fiveRateScore = 5
      } else if (five > 1.15 && five < 1.3) {
        this.fiveRateScore = 5 - 3.33 * (1.3 - five) * 10
      } else if (five > 1.7 && five < 1.85) {
        this.fiveRateScore = 5 - 3.33 * (five - 1.7) * 10
      } else {
        this.fiveRateScore = 0
      }
      this.fiveRateScore = parseFloat(this.fiveRateScore.toFixed(1))

      /* 上肢：外展 */
      // 上肢左外展
      if (
        this.testData.resultValue.ulLeftAbducent <
        this.ulLeftAbducentRecommend * 2
      ) {
        this.ulLeftAbducentScore =
          (this.testData.resultValue.ulLeftAbducent /
            (this.ulLeftAbducentRecommend * 2)) *
          10
      } else {
        this.ulLeftAbducentScore = 10
      }
      this.ulLeftAbducentScore = parseFloat(this.ulLeftAbducentScore.toFixed(1))
      // 上肢右外展
      if (
        this.testData.resultValue.ulRightAbducent <
        this.ulRightAbducentRecommend * 2
      ) {
        this.ulRightAbducentScore =
          (this.testData.resultValue.ulRightAbducent /
            (this.ulRightAbducentRecommend * 2)) *
          10
      } else {
        this.ulRightAbducentScore = 10
      }
      this.ulRightAbducentScore = parseFloat(
        this.ulRightAbducentScore.toFixed(1)
      )
      // 肌力比得分
      const six =
        this.testData.resultValue.ulLeftAbducent /
        this.testData.resultValue.ulRightAbducent
      if (six >= 0.95 && six <= 1.05) {
        this.sixRateScore = 10
      } else if (six > 0.8 && six < 0.95) {
        this.sixRateScore = 3.33 * (six - 0.8) * 10 + 5
      } else if (six > 1.05 && six < 1.2) {
        this.sixRateScore = 10 - 3.33 * (six - 1.05) * 10
      } else if (six === 0.8 || six === 1.2) {
        this.sixRateScore = 5
      } else if (six > 0.65 && six < 0.8) {
        this.sixRateScore = 5 - 3.33 * (0.8 - six) * 10
      } else if (six > 1.2 && six < 1.35) {
        this.sixRateScore = 5 - 3.33 * (six - 1.2) * 10
      } else {
        this.sixRateScore = 0
      }
      this.sixRateScore = parseFloat(this.sixRateScore.toFixed(1))

      /* 下肢：后伸 */
      // 下肢左后伸
      if (
        this.testData.resultValue.llAfterLeftOut <
        this.llAfterLeftOutRecommend * 2
      ) {
        this.llAfterLeftOutScore =
          (this.testData.resultValue.llAfterLeftOut /
            (this.llAfterLeftOutRecommend * 2)) *
          10
      } else {
        this.llAfterLeftOutScore = 10
      }
      this.llAfterLeftOutScore = parseFloat(this.llAfterLeftOutScore.toFixed(1))
      // 下肢右后伸
      if (
        this.testData.resultValue.llAfterRightOut <
        this.llAfterRightOutRecommend * 2
      ) {
        this.llAfterRightOutScore =
          (this.testData.resultValue.llAfterRightOut /
            (this.llAfterRightOutRecommend * 2)) *
          10
      } else {
        this.llAfterRightOutScore = 10
      }
      this.llAfterRightOutScore = parseFloat(
        this.llAfterRightOutScore.toFixed(1)
      )
      // 肌力比得分
      const seven =
        this.testData.resultValue.llAfterLeftOut /
        this.testData.resultValue.llAfterRightOut
      if (seven >= 0.95 && seven <= 1.05) {
        this.sevenRateScore = 10
      } else if (seven > 0.8 && seven < 0.95) {
        this.sevenRateScore = 3.33 * (seven - 0.8) * 10 + 5
      } else if (seven > 1.05 && seven < 1.2) {
        this.sevenRateScore = 10 - 3.33 * (seven - 1.05) * 10
      } else if (seven === 0.8 || seven === 1.2) {
        this.sevenRateScore = 5
      } else if (seven > 0.65 && seven < 0.8) {
        this.sevenRateScore = 5 - 3.33 * (0.8 - seven) * 10
      } else if (seven > 1.2 && seven < 1.35) {
        this.sevenRateScore = 5 - 3.33 * (seven - 1.2) * 10
      } else {
        this.sevenRateScore = 0
      }
      this.sevenRateScore = parseFloat(this.sevenRateScore.toFixed(1))

      /* 下肢：外展 */
      // 下肢左外展
      if (
        this.testData.resultValue.llLeftAbducent <
        this.llLeftAbducentRecommend * 2
      ) {
        this.llLeftAbducentScore =
          (this.testData.resultValue.llLeftAbducent /
            (this.llLeftAbducentRecommend * 2)) *
          10
      } else {
        this.llLeftAbducentScore = 10
      }
      this.llLeftAbducentScore = parseFloat(this.llLeftAbducentScore.toFixed(1))
      // 下肢右外展
      if (
        this.testData.resultValue.llRightAbducent <
        this.llRightAbducentRecommend * 2
      ) {
        this.llRightAbducentScore =
          (this.testData.resultValue.llRightAbducent /
            (this.llRightAbducentRecommend * 2)) *
          10
      } else {
        this.llRightAbducentScore = 10
      }
      this.llRightAbducentScore = parseFloat(
        this.llRightAbducentScore.toFixed(1)
      )
      // 肌力比得分
      const eight =
        this.testData.resultValue.llLeftAbducent /
        this.testData.resultValue.llRightAbducent
      if (eight >= 0.95 && eight <= 1.05) {
        this.eightRateScore = 10
      } else if (eight > 0.8 && eight < 0.95) {
        this.eightRateScore = 3.33 * (eight - 0.8) * 10 + 5
      } else if (eight > 1.05 && eight < 1.2) {
        this.eightRateScore = 10 - 3.33 * (eight - 1.05) * 10
      } else if (eight === 0.8 || eight === 1.2) {
        this.eightRateScore = 5
      } else if (eight > 0.65 && eight < 0.8) {
        this.eightRateScore = 5 - 3.33 * (0.8 - eight) * 10
      } else if (eight > 1.2 && eight < 1.35) {
        this.eightRateScore = 5 - 3.33 * (eight - 1.2) * 10
      } else {
        this.eightRateScore = 0
      }
      this.eightRateScore = parseFloat(this.eightRateScore.toFixed(1))

      /* 下肢：内收 */
      // 下肢左内收
      if (
        this.testData.resultValue.llLeftInsideCollect <
        this.llLeftInsideCollectRecommend * 2
      ) {
        this.llLeftInsideCollectScore =
          (this.testData.resultValue.llLeftInsideCollect /
            (this.llLeftInsideCollectRecommend * 2)) *
          10
      } else {
        this.llLeftInsideCollectScore = 10
      }
      this.llLeftInsideCollectScore = parseFloat(
        this.llLeftInsideCollectScore.toFixed(1)
      )
      // 下肢右内收
      if (
        this.testData.resultValue.llRightInsideCollect <
        this.llRightInsideCollectRecommend * 2
      ) {
        this.llRightInsideCollectScore =
          (this.testData.resultValue.llRightInsideCollect /
            (this.llRightInsideCollectRecommend * 2)) *
          10
      } else {
        this.llRightInsideCollectScore = 10
      }
      this.llRightInsideCollectScore = parseFloat(
        this.llRightInsideCollectScore.toFixed(1)
      )
      // 肌力比得分
      const nine =
        this.testData.resultValue.llLeftInsideCollect /
        this.testData.resultValue.llRightInsideCollect
      if (nine >= 0.95 && nine <= 1.05) {
        this.nineRateScore = 10
      } else if (nine > 0.8 && nine < 0.95) {
        this.nineRateScore = 3.33 * (nine - 0.8) * 10 + 5
      } else if (nine > 1.05 && nine < 1.2) {
        this.nineRateScore = 10 - 3.33 * (nine - 1.05) * 10
      } else if (nine === 0.8 || nine === 1.2) {
        this.nineRateScore = 5
      } else if (nine > 0.65 && nine < 0.8) {
        this.nineRateScore = 5 - 3.33 * (0.8 - nine) * 10
      } else if (nine > 1.2 && nine < 1.35) {
        this.nineRateScore = 5 - 3.33 * (nine - 1.2) * 10
      } else {
        this.nineRateScore = 0
      }
      this.nineRateScore = parseFloat(this.nineRateScore.toFixed(1))
    },

    /**
     * @description: 计算分级评价
     */
    calculateClassification() {
      const oneEvaluate = '差'
      const twoEvaluate = '较差'
      const threeEvaluate = '中'
      const fourEvaluate = '良'
      const fiveEvaluate = '优秀'

      /* 颈椎：后伸/前屈 */
      // 颈椎后伸
      if (this.cvRearProtractionScore < 4) {
        this.cvRearProtractionLevel = this.oneLevel
        this.cvRearProtractionEvaluate = oneEvaluate
      } else if (
        this.cvRearProtractionScore >= 4 &&
        this.cvRearProtractionScore < 5
      ) {
        this.cvRearProtractionLevel = this.twoLevel
        this.cvRearProtractionEvaluate = twoEvaluate
      } else if (
        this.cvRearProtractionScore >= 5 &&
        this.cvRearProtractionScore < 7
      ) {
        this.cvRearProtractionLevel = this.threeLevel
        this.cvRearProtractionEvaluate = threeEvaluate
      } else if (
        this.cvRearProtractionScore >= 7 &&
        this.cvRearProtractionScore < 8
      ) {
        this.cvRearProtractionLevel = this.fourLevel
        this.cvRearProtractionEvaluate = fourEvaluate
      } else {
        this.cvRearProtractionLevel = this.fiveLevel
        this.cvRearProtractionEvaluate = fiveEvaluate
      }
      // 颈椎前屈
      if (this.cvAnteflexionScore < 4) {
        this.cvAnteflexionLevel = this.oneLevel
        this.cvAnteflexionEvaluate = oneEvaluate
      } else if (this.cvAnteflexionScore >= 4 && this.cvAnteflexionScore < 5) {
        this.cvAnteflexionLevel = this.twoLevel
        this.cvAnteflexionEvaluate = twoEvaluate
      } else if (this.cvAnteflexionScore >= 5 && this.cvAnteflexionScore < 7) {
        this.cvAnteflexionLevel = this.threeLevel
        this.cvAnteflexionEvaluate = threeEvaluate
      } else if (this.cvAnteflexionScore >= 7 && this.cvAnteflexionScore < 8) {
        this.cvAnteflexionLevel = this.fourLevel
        this.cvAnteflexionEvaluate = fourEvaluate
      } else {
        this.cvAnteflexionLevel = this.fiveLevel
        this.cvAnteflexionEvaluate = fiveEvaluate
      }
      // 肌力比
      if (this.oneRateScore < 4) {
        this.oneRateLevel = this.oneLevel
        this.oneRateEvaluate = oneEvaluate
      } else if (this.oneRateScore >= 4 && this.oneRateScore < 5) {
        this.oneRateLevel = this.twoLevel
        this.oneRateEvaluate = twoEvaluate
      } else if (this.oneRateScore >= 5 && this.oneRateScore < 7) {
        this.oneRateLevel = this.threeLevel
        this.oneRateEvaluate = threeEvaluate
      } else if (this.oneRateScore >= 7 && this.oneRateScore < 8) {
        this.oneRateLevel = this.fourLevel
        this.oneRateEvaluate = fourEvaluate
      } else {
        this.oneRateLevel = this.fiveLevel
        this.oneRateEvaluate = fiveEvaluate
      }

      /* 颈椎：侧屈 */
      // 颈椎左侧屈
      if (this.cvLeftSideScore < 4) {
        this.cvLeftSideLevel = this.oneLevel
        this.cvLeftSideEvaluate = oneEvaluate
      } else if (this.cvLeftSideScore >= 4 && this.cvLeftSideScore < 5) {
        this.cvLeftSideLevel = this.twoLevel
        this.cvLeftSideEvaluate = twoEvaluate
      } else if (this.cvLeftSideScore >= 5 && this.cvLeftSideScore < 7) {
        this.cvLeftSideLevel = this.threeLevel
        this.cvLeftSideEvaluate = threeEvaluate
      } else if (this.cvLeftSideScore >= 7 && this.cvLeftSideScore < 8) {
        this.cvLeftSideLevel = this.fourLevel
        this.cvLeftSideEvaluate = fourEvaluate
      } else {
        this.cvLeftSideLevel = this.fiveLevel
        this.cvLeftSideEvaluate = fiveEvaluate
      }
      // 颈椎右侧屈
      if (this.cvRightSideScore < 4) {
        this.cvRightSideLevel = this.oneLevel
        this.cvRightSideEvaluate = oneEvaluate
      } else if (this.cvRightSideScore >= 4 && this.cvRightSideScore < 5) {
        this.cvRightSideLevel = this.twoLevel
        this.cvRightSideEvaluate = twoEvaluate
      } else if (this.cvRightSideScore >= 5 && this.cvRightSideScore < 7) {
        this.cvRightSideLevel = this.threeLevel
        this.cvRightSideEvaluate = threeEvaluate
      } else if (this.cvRightSideScore >= 7 && this.cvRightSideScore < 8) {
        this.cvRightSideLevel = this.fourLevel
        this.cvRightSideEvaluate = fourEvaluate
      } else {
        this.cvRightSideLevel = this.fiveLevel
        this.cvRightSideEvaluate = fiveEvaluate
      }
      // 肌力比
      if (this.twoRateScore < 4) {
        this.twoRateLevel = this.oneLevel
        this.twoRateEvaluate = oneEvaluate
      } else if (this.twoRateScore >= 4 && this.twoRateScore < 5) {
        this.twoRateLevel = this.twoLevel
        this.twoRateEvaluate = twoEvaluate
      } else if (this.twoRateScore >= 5 && this.twoRateScore < 7) {
        this.twoRateLevel = this.threeLevel
        this.twoRateEvaluate = threeEvaluate
      } else if (this.twoRateScore >= 7 && this.twoRateScore < 8) {
        this.twoRateLevel = this.fourLevel
        this.twoRateEvaluate = fourEvaluate
      } else {
        this.twoRateLevel = this.fiveLevel
        this.twoRateEvaluate = fiveEvaluate
      }

      /* 躯干：后伸/前屈 */
      // 躯干后伸
      if (this.tRearProtractionScore < 4) {
        this.tRearProtractionLevel = this.oneLevel
        this.tRearProtractionEvaluate = oneEvaluate
      } else if (
        this.tRearProtractionScore >= 4 &&
        this.tRearProtractionScore < 5
      ) {
        this.tRearProtractionLevel = this.twoLevel
        this.tRearProtractionEvaluate = twoEvaluate
      } else if (
        this.tRearProtractionScore >= 5 &&
        this.tRearProtractionScore < 7
      ) {
        this.tRearProtractionLevel = this.threeLevel
        this.tRearProtractionEvaluate = threeEvaluate
      } else if (
        this.tRearProtractionScore >= 7 &&
        this.tRearProtractionScore < 8
      ) {
        this.tRearProtractionLevel = this.fourLevel
        this.tRearProtractionEvaluate = fourEvaluate
      } else {
        this.tRearProtractionLevel = this.fiveLevel
        this.tRearProtractionEvaluate = fiveEvaluate
      }
      // 躯干前屈
      if (this.tAnteflexionScore < 4) {
        this.tAnteflexionLevel = this.oneLevel
        this.tAnteflexionEvaluate = oneEvaluate
      } else if (this.tAnteflexionScore >= 4 && this.tAnteflexionScore < 5) {
        this.tAnteflexionLevel = this.twoLevel
        this.tAnteflexionEvaluate = twoEvaluate
      } else if (this.tAnteflexionScore >= 5 && this.tAnteflexionScore < 7) {
        this.tAnteflexionLevel = this.threeLevel
        this.tAnteflexionEvaluate = threeEvaluate
      } else if (this.tAnteflexionScore >= 7 && this.tAnteflexionScore < 8) {
        this.tAnteflexionLevel = this.fourLevel
        this.tAnteflexionEvaluate = fourEvaluate
      } else {
        this.tAnteflexionLevel = this.fiveLevel
        this.tAnteflexionEvaluate = fiveEvaluate
      }
      // 肌力比
      if (this.threeRateScore < 4) {
        this.threeRateLevel = this.oneLevel
        this.threeRateEvaluate = oneEvaluate
      } else if (this.threeRateScore >= 4 && this.threeRateScore < 5) {
        this.threeRateLevel = this.twoLevel
        this.threeRateEvaluate = twoEvaluate
      } else if (this.threeRateScore >= 5 && this.threeRateScore < 7) {
        this.threeRateLevel = this.threeLevel
        this.threeRateEvaluate = threeEvaluate
      } else if (this.threeRateScore >= 7 && this.threeRateScore < 8) {
        this.threeRateLevel = this.fourLevel
        this.threeRateEvaluate = fourEvaluate
      } else {
        this.threeRateLevel = this.fiveLevel
        this.threeRateEvaluate = fiveEvaluate
      }

      /* 躯干：侧屈 */
      // 躯干左侧屈
      if (this.tLeftSideScore < 4) {
        this.tLeftSideLevel = this.oneLevel
        this.tLeftSideEvaluate = oneEvaluate
      } else if (this.tLeftSideScore >= 4 && this.tLeftSideScore < 5) {
        this.tLeftSideLevel = this.twoLevel
        this.tLeftSideEvaluate = twoEvaluate
      } else if (this.tLeftSideScore >= 5 && this.tLeftSideScore < 7) {
        this.tLeftSideLevel = this.threeLevel
        this.tLeftSideEvaluate = threeEvaluate
      } else if (this.tLeftSideScore >= 7 && this.tLeftSideScore < 8) {
        this.tLeftSideLevel = this.fourLevel
        this.tLeftSideEvaluate = fourEvaluate
      } else {
        this.tLeftSideLevel = this.fiveLevel
        this.tLeftSideEvaluate = fiveEvaluate
      }
      // 躯干右侧屈
      if (this.tRightSideScore < 4) {
        this.tRightSideLevel = this.oneLevel
        this.tRightSideEvaluate = oneEvaluate
      } else if (this.tRightSideScore >= 4 && this.tRightSideScore < 5) {
        this.tRightSideLevel = this.twoLevel
        this.tRightSideEvaluate = twoEvaluate
      } else if (this.tRightSideScore >= 5 && this.tRightSideScore < 7) {
        this.tRightSideLevel = this.threeLevel
        this.tRightSideEvaluate = threeEvaluate
      } else if (this.tRightSideScore >= 7 && this.tRightSideScore < 8) {
        this.tRightSideLevel = this.fourLevel
        this.tRightSideEvaluate = fourEvaluate
      } else {
        this.tRightSideLevel = this.fiveLevel
        this.tRightSideEvaluate = fiveEvaluate
      }
      // 肌力比
      if (this.fourRateScore < 4) {
        this.fourRateLevel = this.oneLevel
        this.fourRateEvaluate = oneEvaluate
      } else if (this.fourRateScore >= 4 && this.fourRateScore < 5) {
        this.fourRateLevel = this.twoLevel
        this.fourRateEvaluate = twoEvaluate
      } else if (this.fourRateScore >= 5 && this.fourRateScore < 7) {
        this.fourRateLevel = this.threeLevel
        this.fourRateEvaluate = threeEvaluate
      } else if (this.fourRateScore >= 7 && this.fourRateScore < 8) {
        this.fourRateLevel = this.fourLevel
        this.fourRateEvaluate = fourEvaluate
      } else {
        this.fourRateLevel = this.fiveLevel
        this.fourRateEvaluate = fiveEvaluate
      }

      /* 肢：推/拉 */
      // 上肢推
      if (this.ulPushScore < 4) {
        this.ulPushLevel = this.oneLevel
        this.ulPushEvaluate = oneEvaluate
      } else if (this.ulPushScore >= 4 && this.ulPushScore < 5) {
        this.ulPushLevel = this.twoLevel
        this.ulPushEvaluate = twoEvaluate
      } else if (this.ulPushScore >= 5 && this.ulPushScore < 7) {
        this.ulPushLevel = this.threeLevel
        this.ulPushEvaluate = threeEvaluate
      } else if (this.ulPushScore >= 7 && this.ulPushScore < 8) {
        this.ulPushLevel = this.fourLevel
        this.ulPushEvaluate = fourEvaluate
      } else {
        this.ulPushLevel = this.fiveLevel
        this.ulPushEvaluate = fiveEvaluate
      }
      // 上肢拉
      if (this.ulPullScore < 4) {
        this.ulPullLevel = this.oneLevel
        this.ulPullEvaluate = oneEvaluate
      } else if (this.ulPullScore >= 4 && this.ulPullScore < 5) {
        this.ulPullLevel = this.twoLevel
        this.ulPullEvaluate = twoEvaluate
      } else if (this.ulPullScore >= 5 && this.ulPullScore < 7) {
        this.ulPullLevel = this.threeLevel
        this.ulPullEvaluate = threeEvaluate
      } else if (this.ulPullScore >= 7 && this.ulPullScore < 8) {
        this.ulPullLevel = this.fourLevel
        this.ulPullEvaluate = fourEvaluate
      } else {
        this.ulPullLevel = this.fiveLevel
        this.ulPullEvaluate = fiveEvaluate
      }
      // 肌力比
      if (this.fiveRateScore < 4) {
        this.fiveRateLevel = this.oneLevel
        this.fiveRateEvaluate = oneEvaluate
      } else if (this.fiveRateScore >= 4 && this.fiveRateScore < 5) {
        this.fiveRateLevel = this.twoLevel
        this.fiveRateEvaluate = twoEvaluate
      } else if (this.fiveRateScore >= 5 && this.fiveRateScore < 7) {
        this.fiveRateLevel = this.threeLevel
        this.fiveRateEvaluate = threeEvaluate
      } else if (this.fiveRateScore >= 7 && this.fiveRateScore < 8) {
        this.fiveRateLevel = this.fourLevel
        this.fiveRateEvaluate = fourEvaluate
      } else {
        this.fiveRateLevel = this.fiveLevel
        this.fiveRateEvaluate = fiveEvaluate
      }

      /* 上肢：外展 */
      // 上肢左外展
      if (this.ulLeftAbducentScore < 4) {
        this.ulLeftAbducentLevel = this.oneLevel
        this.ulLeftAbducentEvaluate = oneEvaluate
      } else if (
        this.ulLeftAbducentScore >= 4 &&
        this.ulLeftAbducentScore < 5
      ) {
        this.ulLeftAbducentLevel = this.twoLevel
        this.ulLeftAbducentEvaluate = twoEvaluate
      } else if (
        this.ulLeftAbducentScore >= 5 &&
        this.ulLeftAbducentScore < 7
      ) {
        this.ulLeftAbducentLevel = this.threeLevel
        this.ulLeftAbducentEvaluate = threeEvaluate
      } else if (
        this.ulLeftAbducentScore >= 7 &&
        this.ulLeftAbducentScore < 8
      ) {
        this.ulLeftAbducentLevel = this.fourLevel
        this.ulLeftAbducentEvaluate = fourEvaluate
      } else {
        this.ulLeftAbducentLevel = this.fiveLevel
        this.ulLeftAbducentEvaluate = fiveEvaluate
      }
      // 上肢右外展
      if (this.ulRightAbducentScore < 4) {
        this.ulRightAbducentLevel = this.oneLevel
        this.ulRightAbducentEvaluate = oneEvaluate
      } else if (
        this.ulRightAbducentScore >= 4 &&
        this.ulRightAbducentScore < 5
      ) {
        this.ulRightAbducentLevel = this.twoLevel
        this.ulRightAbducentEvaluate = twoEvaluate
      } else if (
        this.ulRightAbducentScore >= 5 &&
        this.ulRightAbducentScore < 7
      ) {
        this.ulRightAbducentLevel = this.threeLevel
        this.ulRightAbducentEvaluate = threeEvaluate
      } else if (
        this.ulRightAbducentScore >= 7 &&
        this.ulRightAbducentScore < 8
      ) {
        this.ulRightAbducentLevel = this.fourLevel
        this.ulRightAbducentEvaluate = fourEvaluate
      } else {
        this.ulRightAbducentLevel = this.fiveLevel
        this.ulRightAbducentEvaluate = fiveEvaluate
      }
      // 肌力比
      if (this.sixRateScore < 4) {
        this.sixRateLevel = this.oneLevel
        this.sixRateEvaluate = oneEvaluate
      } else if (this.sixRateScore >= 4 && this.sixRateScore < 5) {
        this.sixRateLevel = this.twoLevel
        this.sixRateEvaluate = twoEvaluate
      } else if (this.sixRateScore >= 5 && this.sixRateScore < 7) {
        this.sixRateLevel = this.threeLevel
        this.sixRateEvaluate = threeEvaluate
      } else if (this.sixRateScore >= 7 && this.sixRateScore < 8) {
        this.sixRateLevel = this.fourLevel
        this.sixRateEvaluate = fourEvaluate
      } else {
        this.sixRateLevel = this.fiveLevel
        this.sixRateEvaluate = fiveEvaluate
      }

      /* 下肢：后伸 */
      // 下肢左后伸
      if (this.llAfterLeftOutScore < 4) {
        this.llAfterLeftOutLevel = this.oneLevel
        this.llAfterLeftOutEvaluate = oneEvaluate
      } else if (
        this.llAfterLeftOutScore >= 4 &&
        this.llAfterLeftOutScore < 5
      ) {
        this.llAfterLeftOutLevel = this.twoLevel
        this.llAfterLeftOutEvaluate = twoEvaluate
      } else if (
        this.llAfterLeftOutScore >= 5 &&
        this.llAfterLeftOutScore < 7
      ) {
        this.llAfterLeftOutLevel = this.threeLevel
        this.llAfterLeftOutEvaluate = threeEvaluate
      } else if (
        this.llAfterLeftOutScore >= 7 &&
        this.llAfterLeftOutScore < 8
      ) {
        this.llAfterLeftOutLevel = this.fourLevel
        this.llAfterLeftOutEvaluate = fourEvaluate
      } else {
        this.llAfterLeftOutLevel = this.fiveLevel
        this.llAfterLeftOutEvaluate = fiveEvaluate
      }
      // 下肢右后伸
      if (this.llAfterRightOutScore < 4) {
        this.llAfterRightOutLevel = this.oneLevel
        this.llAfterRightOutEvaluate = oneEvaluate
      } else if (
        this.llAfterRightOutScore >= 4 &&
        this.llAfterRightOutScore < 5
      ) {
        this.llAfterRightOutLevel = this.twoLevel
        this.llAfterRightOutEvaluate = twoEvaluate
      } else if (
        this.llAfterRightOutScore >= 5 &&
        this.llAfterRightOutScore < 7
      ) {
        this.llAfterRightOutLevel = this.threeLevel
        this.llAfterRightOutEvaluate = threeEvaluate
      } else if (
        this.llAfterRightOutScore >= 7 &&
        this.llAfterRightOutScore < 8
      ) {
        this.llAfterRightOutLevel = this.fourLevel
        this.llAfterRightOutEvaluate = fourEvaluate
      } else {
        this.llAfterRightOutLevel = this.fiveLevel
        this.llAfterRightOutEvaluate = fiveEvaluate
      }
      // 肌力比
      if (this.sevenRateScore < 4) {
        this.sevenRateLevel = this.oneLevel
        this.sevenRateEvaluate = oneEvaluate
      } else if (this.sevenRateScore >= 4 && this.sevenRateScore < 5) {
        this.sevenRateLevel = this.twoLevel
        this.sevenRateEvaluate = twoEvaluate
      } else if (this.sevenRateScore >= 5 && this.sevenRateScore < 7) {
        this.sevenRateLevel = this.threeLevel
        this.sevenRateEvaluate = threeEvaluate
      } else if (this.sevenRateScore >= 7 && this.sevenRateScore < 8) {
        this.sevenRateLevel = this.fourLevel
        this.sevenRateEvaluate = fourEvaluate
      } else {
        this.sevenRateLevel = this.fiveLevel
        this.sevenRateEvaluate = fiveEvaluate
      }

      /* 下肢：外展 */
      // 下肢左外展
      if (this.llLeftAbducentScore < 4) {
        this.llLeftAbducentLevel = this.oneLevel
        this.llLeftAbducentEvaluate = oneEvaluate
      } else if (
        this.llLeftAbducentScore >= 4 &&
        this.llLeftAbducentScore < 5
      ) {
        this.llLeftAbducentLevel = this.twoLevel
        this.llLeftAbducentEvaluate = twoEvaluate
      } else if (
        this.llLeftAbducentScore >= 5 &&
        this.llLeftAbducentScore < 7
      ) {
        this.llLeftAbducentLevel = this.threeLevel
        this.llLeftAbducentEvaluate = threeEvaluate
      } else if (
        this.llLeftAbducentScore >= 7 &&
        this.llLeftAbducentScore < 8
      ) {
        this.llLeftAbducentLevel = this.fourLevel
        this.llLeftAbducentEvaluate = fourEvaluate
      } else {
        this.llLeftAbducentLevel = this.fiveLevel
        this.llLeftAbducentEvaluate = fiveEvaluate
      }
      // 下肢右外展
      if (this.llRightAbducentScore < 4) {
        this.llRightAbducentLevel = this.oneLevel
        this.llRightAbducentEvaluate = oneEvaluate
      } else if (
        this.llRightAbducentScore >= 4 &&
        this.llRightAbducentScore < 5
      ) {
        this.llRightAbducentLevel = this.twoLevel
        this.llRightAbducentEvaluate = twoEvaluate
      } else if (
        this.llRightAbducentScore >= 5 &&
        this.llRightAbducentScore < 7
      ) {
        this.llRightAbducentLevel = this.threeLevel
        this.llRightAbducentEvaluate = threeEvaluate
      } else if (
        this.llRightAbducentScore >= 7 &&
        this.llRightAbducentScore < 8
      ) {
        this.llRightAbducentLevel = this.fourLevel
        this.llRightAbducentEvaluate = fourEvaluate
      } else {
        this.llRightAbducentLevel = this.fiveLevel
        this.llRightAbducentEvaluate = fiveEvaluate
      }
      // 肌力比
      if (this.eightRateScore < 4) {
        this.eightRateLevel = this.oneLevel
        this.eightRateEvaluate = oneEvaluate
      } else if (this.eightRateScore >= 4 && this.eightRateScore < 5) {
        this.eightRateLevel = this.twoLevel
        this.eightRateEvaluate = twoEvaluate
      } else if (this.eightRateScore >= 5 && this.eightRateScore < 7) {
        this.eightRateLevel = this.threeLevel
        this.eightRateEvaluate = threeEvaluate
      } else if (this.eightRateScore >= 7 && this.eightRateScore < 8) {
        this.eightRateLevel = this.fourLevel
        this.eightRateEvaluate = fourEvaluate
      } else {
        this.eightRateLevel = this.fiveLevel
        this.eightRateEvaluate = fiveEvaluate
      }

      /* 下肢：内收 */
      // 下肢左内收
      if (this.llLeftInsideCollectScore < 4) {
        this.llLeftInsideCollectLevel = this.oneLevel
        this.llLeftInsideCollectEvaluate = oneEvaluate
      } else if (
        this.llLeftInsideCollectScore >= 4 &&
        this.llLeftInsideCollectScore < 5
      ) {
        this.llLeftInsideCollectLevel = this.twoLevel
        this.llLeftInsideCollectEvaluate = twoEvaluate
      } else if (
        this.llLeftInsideCollectScore >= 5 &&
        this.llLeftInsideCollectScore < 7
      ) {
        this.llLeftInsideCollectLevel = this.threeLevel
        this.llLeftInsideCollectEvaluate = threeEvaluate
      } else if (
        this.llLeftInsideCollectScore >= 7 &&
        this.llLeftInsideCollectScore < 8
      ) {
        this.llLeftInsideCollectLevel = this.fourLevel
        this.llLeftInsideCollectEvaluate = fourEvaluate
      } else {
        this.llLeftInsideCollectLevel = this.fiveLevel
        this.llLeftInsideCollectEvaluate = fiveEvaluate
      }
      // 下肢右内收
      if (this.llRightInsideCollectScore < 4) {
        this.llRightInsideCollectLevel = this.oneLevel
        this.llRightInsideCollectEvaluate = oneEvaluate
      } else if (
        this.llRightInsideCollectScore >= 4 &&
        this.llRightInsideCollectScore < 5
      ) {
        this.llRightInsideCollectLevel = this.twoLevel
        this.llRightInsideCollectEvaluate = twoEvaluate
      } else if (
        this.llRightInsideCollectScore >= 5 &&
        this.llRightInsideCollectScore < 7
      ) {
        this.llRightInsideCollectLevel = this.threeLevel
        this.llRightInsideCollectEvaluate = threeEvaluate
      } else if (
        this.llRightInsideCollectScore >= 7 &&
        this.llRightInsideCollectScore < 8
      ) {
        this.llRightInsideCollectLevel = this.fourLevel
        this.llRightInsideCollectEvaluate = fourEvaluate
      } else {
        this.llRightInsideCollectLevel = this.fiveLevel
        this.llRightInsideCollectEvaluate = fiveEvaluate
      }
      // 肌力比
      if (this.nineRateScore < 4) {
        this.nineRateLevel = this.oneLevel
        this.nineRateEvaluate = oneEvaluate
      } else if (this.nineRateScore >= 4 && this.nineRateScore < 5) {
        this.nineRateLevel = this.twoLevel
        this.nineRateEvaluate = twoEvaluate
      } else if (this.nineRateScore >= 5 && this.nineRateScore < 7) {
        this.nineRateLevel = this.threeLevel
        this.nineRateEvaluate = threeEvaluate
      } else if (this.nineRateScore >= 7 && this.nineRateScore < 8) {
        this.nineRateLevel = this.fourLevel
        this.nineRateEvaluate = fourEvaluate
      } else {
        this.nineRateLevel = this.fiveLevel
        this.nineRateEvaluate = fiveEvaluate
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
  .wrapper {
    width: 100%;
    height: 100vh;
    @include flex(column, stretch, stretch);
    border-bottom: none !important;
  }
}

.test-print {
  width: 100%;

  .wrapper {
    width: 100%;
    height: 100vh;
    @include flex(column, stretch, stretch);
    border-bottom: 2px solid black;

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
      margin: 10px 30px;
      .item {
        width: 100%;
        height: 100%;
      }
    }
    .btn {
      @include flex(row, center, center);
      .item {
        margin: 10px 50px;
        font-size: 30px;
      }
    }
  }
}
</style>
