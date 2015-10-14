const initialSyncState = {
  running : false,
  current : 0,
  total   : 0
}

export default function(state = initialSyncState, action) {
  switch (action.type) {
    case 'sync_start':
      return {
        running : true,
        current : 0,
        total   : action.total
      }
    case 'sync_progress':
      return {
        running : true,
        current : state.total-action.remain,
        total   : state.total
      }
    case 'sync_complete':
      return {
        running : false,
        current : state.total,
        total   : state.total
      }
    default:
      return state
  }
}
