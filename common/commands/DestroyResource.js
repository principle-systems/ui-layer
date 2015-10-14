import Device, { StorageItem } from '../js/device'

export default class DestroyResource {

  constructor(device, payload) {
    this.device = device
    this.id = payload.id
  }

  up() {
    const { id, device } = this
    this.data = StorageItem.fetch(id, device)
    device.removeItem(id)
  } 

  down() {
    const { id, device, data } = this
    StorageItem.insert(id, device, data) 
  }

}
