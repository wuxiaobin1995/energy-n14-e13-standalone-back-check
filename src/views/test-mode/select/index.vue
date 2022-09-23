<!--
 * @Author      : Mr.bin
 * @Date        : 2022-09-16 11:38:38
 * @LastEditTime: 2022-09-22 11:15:09
 * @Description : 测试项目选择
-->
<template>
  <div class="test-select">
    <div class="wrapper">
      <!-- 项目选择 -->
      <el-checkbox-group
        class="checkbox-wrapper"
        v-model="selectGroup"
        @change="handleChange"
      >
        <el-checkbox
          class="checkbox-reset"
          label="颈椎：后伸/前屈"
          border
        ></el-checkbox>
        <el-checkbox
          class="checkbox-reset"
          label="颈椎：侧屈"
          border
        ></el-checkbox>
        <el-checkbox
          class="checkbox-reset"
          label="躯干：后伸/前屈"
          border
        ></el-checkbox>
        <el-checkbox
          class="checkbox-reset"
          label="躯干：侧屈"
          border
        ></el-checkbox>
        <el-checkbox
          class="checkbox-reset"
          label="上肢：推/拉"
          border
        ></el-checkbox>
        <el-checkbox
          class="checkbox-reset"
          label="上肢：外展"
          border
        ></el-checkbox>
        <el-checkbox
          class="checkbox-reset"
          label="下肢：后伸"
          border
        ></el-checkbox>
        <el-checkbox
          class="checkbox-reset"
          label="下肢：外展"
          border
        ></el-checkbox>
        <el-checkbox
          class="checkbox-reset"
          label="下肢：内收"
          border
        ></el-checkbox>
      </el-checkbox-group>

      <!-- 设备图 -->
      <div class="img-wrapper">
        <el-image class="img" :src="imgSrc" fit="scale-down"></el-image>
      </div>

      <!-- 右半部 -->
      <div class="right-wrapper">
        <!-- 展示窗 -->
        <div class="show-wrapper">
          <el-table :data="tableData" style="width: 100%" stripe>
            <el-table-column
              align="center"
              type="index"
              label="No"
              width="50"
            />
            <el-table-column
              align="center"
              prop="name"
              label="选定的测试类型"
            />
          </el-table>
        </div>
        <!-- 按钮组 -->
        <div class="btn">
          <el-button class="item" type="primary" @click="handleTest"
            >开始测试</el-button
          >
          <el-button class="item" type="danger" @click="handleToHome"
            >返回首页</el-button
          >
        </div>
      </div>

      <!-- 身高、体重确认弹窗 -->
      <el-dialog
        class="dialog"
        title="请确认身高、体重"
        :visible.sync="centerDialogVisible"
        width="30%"
        top="30vh"
        center
      >
        <div class="content">
          <div class="item">
            身高：<span :style="{ color: 'red' }">{{
              this.$store.state.currentUserInfo.height
            }}</span>
            cm
          </div>
          <div class="item">
            体重：<span :style="{ color: 'red' }">{{
              this.$store.state.currentUserInfo.weight
            }}</span>
            kg
          </div>
        </div>
        <span slot="footer">
          <el-button
            class="btn-item"
            type="danger"
            plain
            round
            icon="el-icon-circle-close"
            @click="handleToUser"
            >有误，前往修改</el-button
          >
          <el-button
            class="btn-item"
            type="primary"
            plain
            round
            icon="el-icon-circle-check"
            @click="handleToTest"
            >无误，开始测试</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-select',

  data() {
    return {
      imgSrc: require('@/assets/img/Home/设备实物.png'),

      centerDialogVisible: false, // 弹窗显隐

      selectGroup: [], // 选项数组
      tableData: [] // 展示窗数组
    }
  },

  created() {
    // 初始化测试最终结果
    this.$store.dispatch('changeResultValue', {
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
    })
    // 初始化测试项目选择
    this.$store.dispatch('changeSelectResult', [])
    // 初始化中文名项目选择结果
    window.sessionStorage.setItem('chineseSelectResult', JSON.stringify([]))
  },

  methods: {
    /**
     * @description: 选项改变时触发，用于实时显示所选择的项
     * @param {*} value 多选数组更新后的值
     */
    handleChange(value) {
      const data = []
      for (let i = 0; i < value.length; i++) {
        const item = value[i]
        data.push({ name: item })
      }
      this.tableData = data
    },

    /**
     * @description: 开始测试按钮
     */
    handleTest() {
      if (this.selectGroup.length) {
        // 测试项目选择结果
        const selectResult = []
        for (let i = 0; i < this.selectGroup.length; i++) {
          const item = this.selectGroup[i]
          if (item === '颈椎：后伸/前屈') {
            selectResult.push('cvRearProtraction') // 颈椎后伸，cervical-vertebra-rearProtraction
            selectResult.push('cvAnteflexion') // 颈椎前屈，cervical-vertebra-anteflexion
          } else if (item === '颈椎：侧屈') {
            selectResult.push('cvLeftSide') // 颈椎左侧屈，cervical-vertebra-leftSide
            selectResult.push('cvRightSide') // 颈椎右侧屈，cervical-vertebra-rightSide
          } else if (item === '躯干：后伸/前屈') {
            selectResult.push('tRearProtraction') // 躯干后伸，trunk-rearProtraction
            selectResult.push('tAnteflexion') // 躯干前屈，trunk-anteflexion
          } else if (item === '躯干：侧屈') {
            selectResult.push('tLeftSide') // 躯干左侧屈，trunk-leftSide
            selectResult.push('tRightSide') // 躯干右侧屈，trunk-rightSide
          } else if (item === '上肢：推/拉') {
            selectResult.push('ulPush') // 上肢推，upper-limb-push
            selectResult.push('ulPull') // 上肢拉，upper-limb-pull
          } else if (item === '上肢：外展') {
            selectResult.push('ulLeftAbducent') // 上肢左外展，upper-limb-leftAbducent
            selectResult.push('ulRightAbducent') // 上肢右外展，upper-limb-rightAbducent
          } else if (item === '下肢：后伸') {
            selectResult.push('llAfterLeftOut') // 下肢左后伸，lower-limb-afterLeftOut
            selectResult.push('llAfterRightOut') // 下肢右后伸，lower-limb-afterRightOut
          } else if (item === '下肢：外展') {
            selectResult.push('llLeftAbducent') // 下肢左外展，lower-limb-leftAbducent
            selectResult.push('llRightAbducent') // 下肢右外展，lower-limb-rightAbducent
          } else if (item === '下肢：内收') {
            selectResult.push('llLeftInsideCollect') // 下肢左内收，lower-limb-leftInsideCollect
            selectResult.push('llRightInsideCollect') // 下肢右内收，lower-limb-rightInsideCollect
          }
        }
        // 测试项目选择结果，放到Vuex中
        this.$store
          .dispatch('changeSelectResult', selectResult)
          .then(() => {
            // 中文名项目选择结果，放到sessionStorage中，用于后面数据记录表的测试项目列
            window.sessionStorage.setItem(
              'chineseSelectResult',
              JSON.stringify(this.tableData)
            )
          })
          .then(() => {
            // 身高、体重弹窗确认
            this.centerDialogVisible = true
          })
      } else {
        this.$alert('测试项目不能为空，请选择测试项目！', '提示', {
          type: 'warning',
          center: true,
          confirmButtonText: '确定',
          showConfirmButton: false,
          closeOnClickModal: true,
          callback: () => {}
        })
      }
    },

    /**
     * @description: 有误，前往修改
     */
    handleToUser() {
      this.centerDialogVisible = false
      this.$router.push({
        path: '/user'
      })
    },

    /**
     * @description: 无误，开始测试
     */
    handleToTest() {
      this.centerDialogVisible = false
      this.$router.push({
        path: '/' + this.$store.state.selectResult[0]
      })
    },

    /**
     * @description: 返回首页
     */
    handleToHome() {
      this.$router.push({
        path: '/home'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test-select {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 86%;
    height: 90%;
    border-radius: 34px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 20px 40px;
    @include flex(row, space-between, stretch);

    /* 多项选择容器 */
    .checkbox-wrapper {
      width: 30%;
      @include flex(column, stretch, stretch);
      .checkbox-reset {
        margin: 12px 0;
      }
    }

    /* 设备图 */
    .img-wrapper {
      width: 38%;
      @include flex(row, center, center);
      .img {
        width: 100%;
      }
    }

    /* 右半部 */
    .right-wrapper {
      width: 30%;
      @include flex(column, stretch, stretch);
      // 展示窗
      .show-wrapper {
        margin-top: 20px;
        flex: 1;
        border: 1px solid black;
      }
      // 按钮组
      .btn {
        @include flex(row, center, center);
        margin-top: 40px;
        .item {
          font-size: 28px;
          margin: 0 30px;
        }
      }
    }

    /* 确认弹窗相关 */
    .dialog {
      .content {
        @include flex(column, center, center);
        .item {
          margin: 5px 0;
        }
      }
      .btn-item {
        margin: 0 10px;
      }
    }
  }
}
</style>
