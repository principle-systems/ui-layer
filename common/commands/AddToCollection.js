import Device, { StorageItem, Collection } from '../js/device'

export default class AddToCollection {

  constructor(device, payload) {
    this.device = device
    this.collection = payload.collection
    this.resource = payload.resource
    this.item = payload.item
  }

  up() {
    const { item, device, resource } = this
    const collection = new Collection(this.collection, device, resource)
    collection.addItem(item).save()
  }

  down() {
    const { item, device, resource } = this
    const collection = new Collection(this.collection, device, resource)
    collection.removeItem(item).save()
  }

}
