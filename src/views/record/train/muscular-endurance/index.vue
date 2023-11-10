<!--
 * @Author      : Mr.bin
 * @Date        : 2022-12-19 09:52:09
 * @LastEditTime: 2023-11-09 15:22:15
 * @Description : 肌耐力训练-数据记录
-->
<template>
  <div class="muscular-endurance-record">
    <!-- 顶部 -->
    <div class="top">
      <!-- 标题 -->
      <el-page-header
        class="page"
        title="返回首页"
        content="肌耐力训练-数据记录"
        @back="handleToHome"
      ></el-page-header>
      <!-- 日期筛选 -->
      <el-date-picker
        class="data-select"
        v-model="selectDateValue"
        type="daterange"
        :picker-options="pickerOptions"
        range-separator="——"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        :editable="false"
        :clearable="false"
        :unlink-panels="true"
        align="right"
        @change="changeData"
      >
      </el-date-picker>
    </div>

    <!-- 表格 -->
    <el-table
      class="table"
      :data="tableData"
      style="width: 100%"
      height="auto"
      :default-sort="{ prop: 'pdfTime', order: 'descending' }"
      :stripe="false"
      :border="true"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column type="index" width="50" align="center" />
      <!-- 训练时间 -->
      <el-table-column
        align="center"
        prop="pdfTime"
        label="训练时间"
        width="260"
        sortable
      />
      <!-- 训练部位 -->
      <el-table-column
        align="center"
        prop="trainName"
        label="训练部位"
        width="200"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.trainName.split('-')[1] }}</span>
        </template>
      </el-table-column>
      <!-- 训练目标 -->
      <el-table-column
        align="center"
        prop="target"
        label="训练目标(kg)"
        width="130"
      />
      <!-- 训练完成度 -->
      <el-table-column align="center" prop="resultRate" label="训练完成度%" />

      <!-- 查看报告 -->
      <el-table-column label="测试报告" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            icon="el-icon-search"
            @click="handleCheckPdf(scope.$index, scope.row)"
            >查看报告</el-button
          >
        </template>
      </el-table-column>
      <!-- 删除报告 -->
      <el-table-column label="删除操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
            >删 除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 长期趋势 -->
    <div class="btn">
      <!-- <el-button class="item" type="success" @click="handleTendencyPrint"
          >长期趋势报告</el-button
        > -->
      <el-button
        class="item"
        type="info"
        icon="el-icon-refresh"
        @click="handleRefresh"
        >刷 新</el-button
      >
    </div>
  </div>
</template>

<script>
import { initDB } from '@/db/index.js'

export default {
  name: 'muscular-endurance-record',

  data() {
    return {
      tableData: [],
      loading: false, // 加载动画
      // 日期选择器的筛选值
      selectDateValue: [
        this.$moment().format('YYYY-MM-DD 00:00:00'),
        this.$moment().format('YYYY-MM-DD 23:59:59')
      ],
      /* 日期选择器快捷选项 */
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const start = new Date(new Date().setHours(0, 0, 0))
              const end = new Date(new Date().setHours(23, 59, 59))
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const start = new Date(new Date().setHours(0, 0, 0))
              const end = new Date(new Date().setHours(23, 59, 59))
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const start = new Date(new Date().setHours(0, 0, 0))
              const end = new Date(new Date().setHours(23, 59, 59))
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const start = new Date(new Date().setHours(0, 0, 0))
              const end = new Date(new Date().setHours(23, 59, 59))
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const start = new Date(new Date().setHours(0, 0, 0))
              const end = new Date(new Date().setHours(23, 59, 59))
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一年',
            onClick(picker) {
              const start = new Date(new Date().setHours(0, 0, 0))
              const end = new Date(new Date().setHours(23, 59, 59))
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '该用户所有数据',
            onClick(picker) {
              const start = new Date(new Date().setHours(0, 0, 0))
              const end = new Date(new Date().setHours(23, 59, 59))
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 36000)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },

  created() {
    this.initTrainData()
  },

  methods: {
    /**
     * @description: 回到首页
     */
    handleToHome() {
      this.$router.push({
        path: '/home'
      })
    },

    /**
     * @description: 表格数据初始化
     */
    initTrainData() {
      const db = initDB()
      this.loading = true
      db.train_data
        .where({
          userId: this.$store.state.currentUserInfo.userId,
          type: '肌耐力训练'
        })
        .toArray()
        .then(res => {
          this.tableData = res
        })
        .catch(err => {
          this.$confirm(`获取表格数据失败，请点击刷新按钮重试！`, '提示', {
            type: 'warning',
            center: true,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            confirmButtonText: '刷 新',
            cancelButtonText: '返回首页'
          })
            .then(() => {
              this.handleRefresh()
            })
            .catch(() => {
              this.handleToHome()
            })
        })
        .finally(() => {
          this.loading = false
        })
    },

    /**
     * @description: 根据日期选择获取表格数据
     */
    getTrainData() {
      const db = initDB()
      this.loading = true
      db.train_data
        .where(['userId', 'type', 'pdfTime'])
        .between(
          [
            this.$store.state.currentUserInfo.userId,
            '肌耐力训练',
            this.selectDateValue[0]
          ],
          [
            this.$store.state.currentUserInfo.userId,
            '肌耐力训练',
            this.selectDateValue[1]
          ],
          true,
          true
        )
        .toArray()
        .then(res => {
          this.tableData = res
        })
        .catch(err => {
          this.$confirm(`获取表格数据失败，请点击刷新按钮重试！`, '提示', {
            type: 'warning',
            center: true,
            showClose: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            confirmButtonText: '刷 新',
            cancelButtonText: '返回首页'
          })
            .then(() => {
              this.handleRefresh()
            })
            .catch(() => {
              this.handleToHome()
            })
        })
        .finally(() => {
          this.loading = false
        })
    },

    /**
     * @description: 用户确认选定的值时触发
     * @param {*} value 选择的日期数组
     */
    changeData(value) {
      this.selectDateValue = value
      this.getTrainData()
    },

    /**
     * @description: 查看报告
     * @param {*} index
     * @param {*} row
     */
    handleCheckPdf(index, row) {
      this.$router.push({
        path: '/train-pdf',
        query: {
          userId: JSON.stringify(row.userId),
          pdfTime: JSON.stringify(row.pdfTime),
          routerName: JSON.stringify('/train-record/muscular-endurance-record')
        }
      })
    },

    /**
     * @description: 删除按钮
     * @param {*} index
     * @param {*} row
     */
    handleDelete(index, row) {
      this.$confirm('此操作将"永久删除"该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          const db = initDB()
          db.train_data
            .where({
              userId: row.userId,
              pdfTime: row.pdfTime
            })
            .delete()
            .then(() => {
              this.$message({
                message: '数据删除成功',
                type: 'success',
                duration: 2000
              })
            })
            .then(() => {
              this.initTrainData()
            })
            .catch(() => {
              this.$alert(`数据删除失败，请刷新页面后重试！`, '警告', {
                type: 'error',
                showClose: false,
                confirmButtonText: '刷新页面',
                callback: () => {
                  this.handleRefresh()
                }
              })
            })
        })
        .catch(() => {})
    },

    /**
     * @description: 长期趋势报告
     */
    handleTendencyPrint() {
      // this.$router.push({
      //   path: '/secular-trend-print',
      //   query: {
      //     userId: JSON.stringify(this.$store.state.currentUserInfo.userId)
      //   }
      // })
    },

    /**
     * @description: 刷新页面
     */
    handleRefresh() {
      this.$router.push({
        path: '/refresh',
        query: {
          routerName: JSON.stringify('/train-record/muscular-endurance-record'),
          duration: JSON.stringify(300)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.muscular-endurance-record {
  width: 100%;
  height: 90%;
  padding: 0 20px;
  @include flex(column, stretch, stretch);

  /* 顶部 */
  .top {
    margin: 10px 0;
    @include flex(row, space-between, center);
  }

  /* 表格 */
  .table {
    flex: 1;
  }

  /* 长期趋势 */
  .btn {
    margin-top: 20px;
    @include flex(row, center, center);
    .item {
      font-size: 24px;
      margin: 0 80px;
    }
  }
}
</style>
