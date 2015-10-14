import Device, { StorageItem } from '../../common/js/device'

class UpdateResource {

  constructor(device, payload) {
    this.device = device
    this.data = payload.data
    this.id = payload.id
  }

  up() {
    const { id, device } = this
    const data = StorageItem.fetch(id, device)
    StorageItem.insert(id, device, this.data) 
    this.data = data
  }

  down() {
    this.up()
  }

}
