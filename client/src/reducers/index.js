import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import authErrorsReducer from './authErrorsReducer';

export default combineReducers({
  auth: authReducer,
  authErrors: authErrorsReducer,
  form: formReducer,
  surveys: surveysReducer
})
