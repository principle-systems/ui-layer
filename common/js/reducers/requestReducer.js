const initialRequestState = {
  active : false
}

export default function(state = initialRequestState, action) {
  switch (action.type) {
    case 'request_start':
      return {
        active : true
      }
    case 'request_complete':
      return initialRequestState
    default:
      return state
  }
}
