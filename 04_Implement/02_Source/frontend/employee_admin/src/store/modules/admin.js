import store from "@/store"
import {getEmployee,createStaff,activeStaff,deactiveStaff,resetPassword,updateStaffInfo,getTransactionInterbank} from "@/api/admin.js"
import {checkIsExpired} from "@/utils/check.js"
const state = {
    listEmployee: [],
    listTransactionInterbank: []
}

const mutations = {
    SET_LIST_EMPLOYEE(state,data) {
        state.listEmployee = data
    },
    SET_EXPIRED(state,data) {
        store.commit('SET_EXPIRED',data)
    },
    SET_LIST_TRANSACTION_INTERBANK(state,data) {
      state.listTransactionInterbank = data
    }
}

const actions = {
    getAllEmployee(ctx, payload) {
        return new Promise((resolve,reject) => {
            getEmployee(payload).then(response => {
                if (response && !response.error) {
                    if (!payload.noCommitState) {
                      ctx.commit('SET_LIST_EMPLOYEE',response.data.data)
                    }
                } else {
                    if (checkIsExpired(response)) {
                        ctx.commit('SET_LIST_EMPLOYEE',[])
                        ctx.commit('SET_EXPIRED',true)
                        resolve(response)
                        return
                    } else {
                        if (!payload.noCommitState) {
                            ctx.commit('SET_LIST_EMPLOYEE',[])
                        }
                    }
                }
                resolve(response)
            }).catch(err => reject(err))
        })
    },
    createStaff(ctx, payload) {
        return new Promise((resolve, reject) => {
            createStaff(payload).then(response => {
                if (response && !response.error) {

                } else {
                    if (checkIsExpired(response)) {
                        ctx.commit('SET_EXPIRED',true)
                    }
                }
                resolve(response)
            }).catch(err => reject(err))
        })
    },
    activeStaff(ctx, payload) {
        return new Promise((resolve, reject) => {
            activeStaff(payload).then(response => {
            if (response && !response.error) {
  
            } else {
              if (checkIsExpired(response)) {
                ctx.commit('SET_EXPIRED',true)
                resolve(response)
                return
              }
            }
            resolve(response)
          }).catch(err => reject(err))
        })
    },
    deactiveStaff(ctx, payload) {
        return new Promise((resolve, reject) => {
            deactiveStaff(payload).then(response => {
            if (response && !response.error) {
  
            } else {
              if (checkIsExpired(response)) {
                ctx.commit('SET_EXPIRED',true)
                resolve(response)
                return
              }
            }
            resolve(response)
          }).catch(err => reject(err))
        })
    },
    resetPassword(ctx, payload) {
        return new Promise((resolve, reject) => {
            resetPassword(payload).then(response => {
            if (response && !response.error) {
  
            } else {
              if (checkIsExpired(response)) {
                ctx.commit('SET_EXPIRED',true)
                resolve(response)
                return
              }
            }
            resolve(response)
          }).catch(err => reject(err))
        })
    },
    updateStaffInfo(ctx, payload) {
        return new Promise((resolve, reject) => {
            updateStaffInfo(payload).then(response => {
            if (response && !response.error) {
  
            } else {
              if (checkIsExpired(response)) {
                ctx.commit('SET_EXPIRED',true)
                resolve(response)
                return
              }
            }
            resolve(response)
          }).catch(err => reject(err))
        })
    },
    getTransactionInterbank(ctx, payload) {
      return new Promise((resolve,reject) => {
        getTransactionInterbank(payload).then(response => {
              if (response && !response.error) {
                  if (!payload.noCommitState) {
                    ctx.commit('SET_LIST_TRANSACTION_INTERBANK',response.data.data)
                  }
              } else {
                  if (checkIsExpired(response)) {
                      ctx.commit('SET_LIST_TRANSACTION_INTERBANK',[])
                      ctx.commit('SET_EXPIRED',true)
                      resolve(response)
                      return
                  } else {
                      if (!payload.noCommitState) {
                          ctx.commit('SET_LIST_TRANSACTION_INTERBANK',[])
                      }
                  }
              }
              resolve(response)
          }).catch(err => reject(err))
      })
  }
}

export default ({
    namespaced: true,
    state,
    mutations,
    actions
})
