import Device, { StorageItem } from '../js/device'

import CreateResource from './CreateResource'

export default class StockMovement extends CreateResource {

  constructor(device, payload) {
    super(device, payload)
  }

  up() {
    const { id, device, data } = this
    StorageItem.insert(id, device, data) 
    this._adjust(true)
  } 

  down() {
    const { id, device } = this
    device.removeItem(id)
    this._adjust(false)
  }

  _adjust(positive) {
    const { type, item, quantity } = this.data
    const stock = new StorageItem(item.href, this.device)
    stock.load()
    if (!stock.hasProperty('actual')) {
      stock.set('actual', 0)
    }
    if (!stock.hasProperty('available')) {
      stock.set('available', 0)
    }
    stock.set(type, stock.get(type) + (positive ? quantity : -quantity)).save()
  }

}
