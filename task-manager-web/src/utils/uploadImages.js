import axios from 'axios';
import { BASE_URL } from './apiPaths';

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const res = await axios.post(BASE_URL + '/auth/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (error) {
    console.error('Error uploading the image', error);
    throw error;
  }
};

export default uploadImage;
