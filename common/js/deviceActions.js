export function createResource(data, resource) {
  return {
    action  : 'create_resource',
    payload : { data, resource }
  }
}

export function destroyResource(id) {
  return { 
    action  : 'destroy_resource',
    payload : { id }
  }
}

export function updateResource(id, data) {
  return {
    action  : 'update_resource',
    payload : { id, data }
  }
}

export function addLastItemToCollection(collection, resource) {
  if (!resource) {
    resource = collection
  }
  return {
    action  : 'add_last_item_to_collection',
    payload : { collection, resource }
  }
}

export function addItemToCollection(item, collection, resource) {
  if (!resource) {
    resource = collection
  }
  return {
    action  : 'add_to_collection',
    payload : { item, collection, resource }
  }
}

export function removeItemFromCollection(item, collection, resource) {
  if (!resource) {
    resource = collection
  }
  return {
    action  : 'remove_from_collection',
    payload : { item, collection, resource }
  }
}

export function transaction(actions) {
  return {
    action  : 'transaction',
    payload : { actions }
  }
}

export function registerStockMovement(data) {
  return {
    action  : 'stock_movement',
    payload : {
      resource : 'stock-movements',
      data
    }
  }
}
