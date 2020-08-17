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
        db.close()
      })
    }
  })
}
export function LogIn (obj, user) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      console.log(err)
    } else {
      console.log('数据库---已创建!')
      db.db('meteor').collection('user').find(user).toArray((err, result) => {
        if (err) {
          console.log(err)
        } else {
          // console.log(result)
          obj.$store.commit('LogIn', result)
        }
        db.close()
      })
    }
  })
}
export function SignIn (obj, user) {
  console.log(obj)
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      console.log(err)
    } else {
      console.log('数据库---已创建!')
      db.db('meteor').collection('user').find(user).toArray((err, result) => {
        if (err) {
          console.log(err)
        } else {
          if (result[0]) {
            window.alert('用户已存在')
          } else {
            db.db('meteor').collection('user').insertOne(user)
          }
          // console.log(result)
          // obj.$store.commit('Loading', result)
        }
        db.close()
      })
    }
  })
}
