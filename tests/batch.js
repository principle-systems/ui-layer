import installer from './installData'
import request   from 'request'
import Device, { SyncHandler } from '../common/js/device'

import { LocalStorage } 
  from 'node-localstorage'
import { createResource, destroyResource, updateResource, registerStockMovement, addLastItemToCollection, addItemToCollection, removeItemFromCollection, transaction }
  from '../common/js/deviceActions'

const device = new Device('install', new LocalStorage('./scratch'))
const remote = new SyncHandler(device)

remote.setRequestHandler((req, body) => {
  const { type, url } = req
  request({
    method : type,
    json   : true,
    url,
    body   
  }, (error, httpResponse, resp) => {
    if (error) {
      console.log(error)
    } else {
      if (('' + httpResponse.statusCode).match(/^2\d\d$/)) {
        req.success(resp)
      } else {
        req.error(httpResponse)
      }
    }
  })
})

request({
  method : 'POST',
  url    : 'http://localhost:8081/restart',
}, (error, httpResponse, resp) => {
  if (error) {
    console.log(error)
  } else {
    if (('' + httpResponse.statusCode).match(/^2\d\d$/)) {
      device.clearStorage()
      installer(device)
      remote.sync(response => {
        console.log(JSON.stringify(response, null, 2))
      })
    } else {
      console.log(httpResponse)
    }
  }
})
