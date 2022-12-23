/*
 * @Author      : Mr.bin
 * @Date        : 2022-09-15 09:55:06
 * @LastEditTime: 2022-12-23 15:16:23
 * @Description : Dexie
 */
import Dexie from 'dexie'

/* 联合查询时，pdfTime要放在最后面 */
export function initDB() {
  const db = new Dexie('Energy_N14_E13_Standalone_Back_Check') // 与项目名保持一致
  db.version(2).stores({
    user: 'userId,userName',
    test_data: '++,userId,pdfTime,[userId+pdfTime]',
    train_data:
      '++,userId,pdfTime,trainName,type,[userId+pdfTime],[userId+trainName+pdfTime],[userId+type+pdfTime],[userId+trainName],[userId+type],[userId+trainName+type+pdfTime]'
  })
  return db
}
