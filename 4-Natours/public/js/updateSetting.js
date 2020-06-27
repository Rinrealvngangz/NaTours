/* eslint-disable */
import { showAlert } from './alert';
import axios from 'axios';

export const updateSetting = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://192.168.1.249:3000/api/v1/users/updateMyPassword'
        : 'http://192.168.1.249:3000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} update successfully`);
    }
  } catch (err) {
    showAlert('error', err.respone.data.message);
  }
};
