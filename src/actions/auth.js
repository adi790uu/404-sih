import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

//Action creator
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    if(data.userType === 'agency'){
      navigate('/agencydashboard');
    }else if(data.userType === 'normal-user'){
      navigate('/');
    }else if(data.userType === 'worker'){
      navigate('/memberhelppage')
    }
  } catch (error) {
    console.log(error);
  }
};
export const workersignin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.workersignIn(formData);
    dispatch({ type: AUTH, data });
    if(data?.userType === 'agency'){
      navigate('/agencydashboard');
    }else if(data?.userType === 'normal-user'){
      navigate('/');
    }else{
      navigate('/memberhelppage')
    }

    // if(data.userType === 'worker')
    
  } catch (error) {
    console.log(error);
  }
};
export const agencysignin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.agencysignIn(formData);
    dispatch({ type: AUTH, data });
    if(data.userType === 'agency'){
      navigate('/agencydashboard');
    }else if(data.userType === 'normal-user'){
      navigate('/');
    }else if(data.userType === 'worker'){
      navigate('/memberhelppage')
    }
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    if(data.userType === 'agency'){
      navigate('/agencydashboard');
    }else if(data.userType === 'normal-user'){
      navigate('/');
    }else if(data.userType === 'worker'){
      navigate('/memberhelppage')
    }
  } catch (error) {
    console.log(error);
  }
};
export const workersignup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.workersignUp(formData);
    dispatch({ type: AUTH, data });
    if(data.userType === 'agency'){
      navigate('/agencydashboard');
    }else if(data.userType === 'normal-user'){
      navigate('/');
    }else if(data.userType === 'worker'){
      navigate('/memberhelppage')
    }
  } catch (error) {
    console.log(error);
  }
};
export const agencysignup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.agencysignUp(formData);
    console.log(data);
    dispatch({ type: AUTH, data });
    if(data.userType === 'agency'){
      navigate('/agencydashboard');
    }else if(data.userType === 'normal-user'){
      navigate('/');
    }else if(data.userType === 'worker'){
      navigate('/memberhelppage')
    }
  } catch (error) {
    console.log(error);
  }
};
