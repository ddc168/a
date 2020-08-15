const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/meteor'

// MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('数据库已创建!')
//     db.db('meteor').collection('page').find().toArray((err, result) => {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(result)
//       }
//     })
//     db.close()
//   }
// })

export function getNews (obj) {
  console.log(obj)
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      console.log(err)
    } else {
      console.log('数据库---已创建!')
      db.db('meteor').collection('page').find().toArray((err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log(result)
          obj.$store.commit('Loading', result)
        }
      })
      db.close()
    }
  })
}
