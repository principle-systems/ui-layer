import Device, { StorageItem } from '../js/device'

class CreateResource {

  constructor(device, payload) {
    this.device = device
    let { data, resource } = payload
    if (!data.id && resource) {
      data.id = `${resource}/${device.generateId()}`
    }
    this.data = data
    this.id = data.id
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
