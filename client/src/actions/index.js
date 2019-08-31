import axios from 'axios';
import { 
  FETCH_USER, 
  FETCH_SURVEYS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  CLEAR_AUTH_ERRORS,
  REGISTER_USER_FAILURE } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data }); 
}

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
}

export const submitSurvey = (values, history) =>  async dispatch => {
  const res = await axios.post('/api/surveys', values);
  dispatch({ type: FETCH_USER, payload: res.data });
  history.push('/');
}

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
}

export const loginUser = (values, history) => async dispatch => {
  dispatch({ type: CLEAR_AUTH_ERRORS });
  try {
    const res = await axios.post('/api/login', values);
    dispatch({ type:  FETCH_USER, payload: res.data })
    history.push('/');
  } catch({ response: res }) {
    dispatch({ type: LOGIN_USER_FAILURE });
  }
  
}

export const registerUser = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/register', values);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: res.data });
  } catch({ response: res }) {
    console.log('ERROR REGISTRATION', res.data);
    dispatch({ type: REGISTER_USER_FAILURE, payload: res.data });
  }
  
  
}