/* eslint-disable */
import { showAlert } from './alert';
import axios from 'axios';

export const updateData = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://192.168.1.249:3000/api/v1/users/updateMe',
      data: {
        name,
        email,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Data update successfully');
    }
  } catch (err) {
    showAlert('error', err.respone.data.message);
  }
};
