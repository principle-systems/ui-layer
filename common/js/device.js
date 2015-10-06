import { EventEmitter } from 'events'

class StorageItem {

  constructor(id, device, data = {}) {
    this.id = id
    this.data = data
    this.device = device
    this._sanitize()
  }

  static fetch(id, device) {
    let item = new StorageItem(id, device)
    item.load()
    return item.data
  }

  load() {
    this.data = this.device.getItem(this.id) || {}
    this._sanitize()
  }

  _sanitize() {
    if (!this.data.hasOwnProperty('_links')) {
      this.data['_links'] = {}
    }
    if (!this.data['_links'].hasOwnProperty('self')) {
      this.data['_links']['self'] = {}
    } 
    this.data['_links']['self'].href = this.id
  }

}

class Collection {

  constructor(id, device, resource) {
    this.id = id
    this.device = device
    this.resource = resource || id
    this.data = {}
    this._sanitize()
  }

  load() {
    this.data = this.device.getItem(this.id) || {}
    this._sanitize()
  }

  embed(resource) {
    const target = this.data['_links'][resource]
    if (!this.data.hasOwnProperty('_embedded')) {
      this.data['_embedded'] = {} 
    }
    if (Array.isArray(target)) {
      this.data['_embedded'][resource] = target.map(item => {
        return StorageItem.fetch(item.href, this.device)
      })
    } else {
      this.data['_embedded'][resource] = StorageItem.fetch(target.href, this.device)
    }
  }

  static fetch(id, device, resource) {
    const collection = new Collection(id, device, resource)
    collection.load()
    return collection.data['_links'][collection.resource]
  }

  static fetchAll(id, device, resource) {
    const collection = new Collection(id, device, resource)
    collection.load()
    collection.embed(collection.resource)
    return collection.data['_embedded'][collection.resource]
  }

  _sanitize() {
    if (!this.data.hasOwnProperty('_links')) {
      this.data['_links'] = {} 
    }
    if (!this.data['_links'].hasOwnProperty('self')) {
      this.data['_links']['self'] = {}
    } 
    this.data['_links']['self'].href = this.id
    if (!this.data['_links'].hasOwnProperty(this.resource)) {
      this.data['_links'][this.resource] = []
    }
  }

}

class Device extends EventEmitter {

  constructor(namespace) {
    super()
    this._namespace = namespace
  }

  fetchAll(resource) {
    return Collection.fetchAll(resource, this)
  }

  setItem(key, obj) {
    localStorage.setItem(`${this._namespace}.${key}`, JSON.stringify(obj))
  }

  getItem(key, def = null) {
    try {
      const str = localStorage.getItem(`${this._namespace}.${key}`)
      if (str) {
        return JSON.parse(str)
      }
    } catch(e) {
      console.log(e)
    }
    return def
  }

  removeItem(key) {
    localStorage.removeItem(`${this._namespace}.${key}`)
  }

  updateItem(key, edit, def) {
    let item = this.getItem(key, def)
    edit(item)
    this.setItem(key, item)
  }

  hasItem(key) {
    return !!this.getItem(key)
  }

  clearStorage() {
    localStorage.clear()
  }

}

export default Device
