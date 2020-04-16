import store from '../store'
import axios from 'axios'
import 'babel-polyfill';


export const get_user = async () => {
  let result = await axios(`http://127.0.0.1:8080/api/auth/user`, {
    method: "get",
    withCredentials: true
  })
  store.dispatch({
    type: 'GET_USER',
    payload: result.data
  })
};
