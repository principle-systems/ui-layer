import Device, { StorageItem } from '../js/device'

class CreateResource {

  constructor(device, data, resource) {
    this._device = device
    if (!data.id && resource) {
      data.id = `${resource}/${++CreateResource.ix}`
    }
    this._data = data
  }

  up() {
    StorageItem.insert(this._data.id, this._device, this._data) 
  } 

  down() {
    this._device.removeItem(this._data.id)
  }

}

CreateResource.ix = 0

export default CreateResource
