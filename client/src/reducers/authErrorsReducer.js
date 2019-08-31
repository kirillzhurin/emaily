import { 
  LOGIN_USER_FAILURE,
  REGISTER_USER_FAILURE,
  CLEAR_AUTH_ERRORS
} from '../actions/types';

const initialState = {
  register: null,
  login: null
}

export default (state = initialState, action) =>{
  switch (action.type) {
    case REGISTER_USER_FAILURE:
      return state.register = action.payload || null;
    case LOGIN_USER_FAILURE:
      return { ...state, login: true };
    case CLEAR_AUTH_ERRORS:
      return initialState;
    default:
      return state;
  }
}