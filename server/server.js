import Hashids          from 'hashids'
import bodyParser       from 'body-parser'
import cors             from 'cors'
import express          from 'express'
import Api              from './Api'

const app        = express()
const jsonParser = bodyParser.json()
const hashids    = new Hashids('8uWOVQCB45GVNB8vlXbOjK104g8hPxBH')

let server = new Api()

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.post('/restart', (request, response) => {
  server = new Api()
  server.clearStorage()
  console.log('*** Restarting service')
  response.sendStatus(200)
})

app.post('/reset', jsonParser, (request, response) => {
  if (!request.body) {
    return response.sendStatus(400)
  }
  const { node } = request.body
  server.resetDevice(node)
  console.log(`*** Device reset (${node})`)
  response.send({
    message : 'OK'
  })
})

app.post('/sync', jsonParser, (request, response) => {
  if (!request.body) {
    return response.sendStatus(400)
  }
  const { node, commit } = request.body
  console.log('*** Sync')

  // temp
  setTimeout(() => {
    response.send(server.commit(node, commit))
  }, 2500)
  // temp

  //response.send(server.commit(node, commit))

})

app.listen(8081)
