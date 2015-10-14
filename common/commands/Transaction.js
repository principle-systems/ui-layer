import Device, { StorageItem } from '../js/device'

class Transaction {

  constructor(device, payload) {
    this.device = device
    this.actions = payload.actions
  }

  up() { 
    this._run('up') 
  } 

  down() { 
    this._run('down') 
  }

  _run(method) {
    let actions = []
    const queue = 'up' === method ? this.actions : this.actions.slice().reverse()
    try {
      queue.forEach(action => {
        this.device.run(action, method, false)
        actions.push(action)
      })
    } catch(e) {
      console.log(e)
      actions.reverse().forEach(action => {
        this.device.run(action, 'up' === method ? 'down' : 'up', false)
      })
      throw(e) 
    }
  }

}

export default Transaction
