import Device, { StorageItem } from '../../common/js/device'

class CreateResource {

  constructor(device, payload) {
    this.device = device
    this.data = payload.data
    this.id = payload.data.id
  }

  up() {
    const { id, device, data } = this
    StorageItem.insert(id, device, data) 
  } 

  down() {
    const { id, device } = this
    device.removeItem(id)
  }

}

export default CreateResource
