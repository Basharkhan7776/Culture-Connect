// uploadImage.js
import axios from 'axios';
import { uploadPreset, cloudName } from '@/envConfig'
const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset); // Replace with your upload preset

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // Replace 'your_cloud_name' with your actual cloud name
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export default uploadImageToCloudinary;
