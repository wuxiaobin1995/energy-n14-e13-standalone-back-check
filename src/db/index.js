/*
 * @Author      : Mr.bin
 * @Date        : 2022-09-15 09:55:06
 * @LastEditTime: 2022-11-29 16:32:04
 * @Description : Dexie
 */
import Dexie from 'dexie'

export function initDB() {
  const db = new Dexie('Energy_N14_E13_Standalone_Back_Check') // 与项目名保持一致
  db.version(1).stores({
    user: 'userId,userName',
    test_data: '++,userId,pdfTime,[userId+pdfTime]',
    train_data:
      '++,userId,pdfTime,trainName,type,[userId+pdfTime],[userId+pdfTime+trainName],[userId+pdfTime+type],[userId+trainName],[userId+type],[userId+pdfTime+trainName+type]'
  })
  return db
}
