/*
 * @Author      : Mr.bin
 * @Date        : 2022-07-27 10:39:06
 * @LastEditTime: 2022-10-09 14:50:40
 * @Description : vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [
  //   createPersistedState({
  //     key: 'vuex-persistedstate', // 自定义Storage中的Key名，默认是vuex
  //     storage: window.sessionStorage, // 使用sessionStorage来固化数据
  //     reducer(val) {
  //       return {
  //         aaa: val.aaa,
  //         bbb: val.bbb,
  //         ccc: val.ccc
  //       }
  //     }
  //   })
  // ],

  state: {
    // P1、P2调零基准值
    zeroStandard: {
      oneStandard: null,
      twoStandard: null
    },

    // 当前选择的用户及其信息
    currentUserInfo: {
      userId: '', // 唯一id
      userName: '', // 姓名
      sex: '', // 性别
      height: '', // 身高
      weight: '', // 体重
      birthday: '', // 出生日期
      remarks: '', // 备注
      lastLoginTime: '' // 最后登录时间
    },

    // 测试项目选择
    selectResult: [],
    // 测试最终结果
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
    },

    /* 语音开关 */
    voiceSwitch: true
  },

  mutations: {
    // P1、P2调零基准值
    SET_ZEROSTANDARD(state, zeroStandard) {
      state.zeroStandard = zeroStandard
    },

    // 当前选择的用户及其信息
    CHANGE_CURRENTUSERINFO(state, currentUserInfo) {
      state.currentUserInfo = currentUserInfo
    },

    // 测试项目选择
    CHANGE_SELECTRESULT(state, selectResult) {
      state.selectResult = selectResult
    },

    // 测试最终结果
    CHANGE_RESULTVALUE(state, resultValue) {
      state.resultValue = resultValue
    },

    /* 语音开关 */
    SET_VOICESWITCH(state, voiceSwitch) {
      state.voiceSwitch = voiceSwitch
    }
  },

  actions: {
    // P1、P2调零基准值
    setZeroStandard({ commit }, zeroStandard) {
      return new Promise((resolve, reject) => {
        commit('SET_ZEROSTANDARD', zeroStandard)
        resolve()
      })
    },

    // 当前选择的用户及其信息
    changeCurrentUserInfo({ commit }, currentUserInfo) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_CURRENTUSERINFO', currentUserInfo)
        resolve()
      })
    },

    // 测试项目选择
    changeSelectResult({ commit }, selectResult) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_SELECTRESULT', selectResult)
        resolve()
      })
    },

    // 测试最终结果
    changeResultValue({ commit }, resultValue) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_RESULTVALUE', resultValue)
        resolve()
      })
    },

    /* 语音开关 */
    setVoiceSwitch({ commit }, voiceSwitch) {
      return new Promise((resolve, reject) => {
        commit('SET_VOICESWITCH', voiceSwitch)
        resolve()
      })
    }
  }
})
