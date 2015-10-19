import bodyParser       from 'body-parser'
import cors             from 'cors'
import express          from 'express'
//import orm              from 'orm'
import Api              from './Api'
//import { Schema }       from 'jugglingdb'
import Sequelize        from 'sequelize'

import { Stock, Transaction } 
  from './models'

//var models = require('./models')

const app        = express()
const jsonParser = bodyParser.json()
const db         = new Sequelize('postgres://sphere:sphere@localhost:5432/sphere')
const server     = new Api()

//const Transaction = db.define('transactions', {
//  action : {
//    type : Sequelize.STRING
//  },
//}, {})
//

Transaction.sync({force: true}).then(() => {
})

Stock.sync({force: true}).then(() => {
})

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

//const conn = orm.express('postgres://sphere:sphere@localhost/sphere', {
//  define: function(db, models, next) {
//
//    models.transactions = db.define('transactions', { 
//      action    : { type : 'text', required : true },
//      payload   : { type : 'text', required : true },
//      timestamp : { type : 'number', required : true }
//    })
//
//    models.stock = db.define('stock', {
//      actual      : { type : 'number', required : true },
//      available   : { type : 'number', required : true },
//      resource_id : { type : 'text', required : true }
//    })
//
//    next()
//
//  }
//})
//
//app.use(conn)

app.post('/restart', (request, response) => {
  //server = new Api()
  //server.clearStorage()
  console.log('*** Restarting service')
  response.sendStatus(200)
})

app.post('/reset', jsonParser, (request, response) => {
  if (!request.body) {
    return response.sendStatus(400)
  }
  const { node } = request.body
  //server.resetDevice(node)
  console.log(`*** Device reset (${node})`)
  response.send({
    message : 'OK'
  })
})

app.post('/sync', jsonParser, (request, response) => {
  if (!request.body) {
    return response.sendStatus(400)
  }
  const { body : { node, commit } } = request
  //const server = new Api(db, models)

  console.log('*** Sync')

  // temp
//  setTimeout(() => {
//    response.send(server.commit(node, commit))
//
//    // log transactions
//
//    // ---- force server sync
//    // run actions on server
//    // run post-commit hook (check for negative stock etc.)
//
//    // collect and send device response
//
//  }, 2500)
  // temp

  response.send(server.commit(node, commit))

})

app.listen(8081)
