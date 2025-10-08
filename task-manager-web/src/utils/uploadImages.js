import axios from 'axios';
import { BASE_URL } from './apiPaths';

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const res = await axios.post(`${BASE_URL}/auth/upload-image`, formData, {
      withCredentials: true, // send cookie along with request
    });
    return res.data; // { imageUrl: '...' }
  } catch (error) {
    console.error('Error uploading the image', error);
    throw error;
  }
};

export default uploadImage;
