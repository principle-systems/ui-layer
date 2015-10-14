import { combineReducers } 
  from 'redux'
import { reducer as formReducer } 
  from 'redux-form'
import syncReducer 
  from '../../common/js/reducers/syncReducer'
import requestReducer 
  from '../../common/js/reducers/requestReducer'

const reducers = {
  form    : formReducer,
  sync    : syncReducer,
  request : requestReducer
}

export default combineReducers(reducers)
