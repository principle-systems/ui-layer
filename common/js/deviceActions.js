export function createResource(data, resource) {
  return {
    action : 'create_resource',
    data,
    resource
  }
}
