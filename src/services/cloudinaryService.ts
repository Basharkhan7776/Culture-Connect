import axios from 'axios';

import { uploadPreset, cloudName } from '@/envConfig'

/**
 * Uploads an image file to Cloudinary and returns its secure URL.
 * @param file - The image file to upload.
 * @returns A promise that resolves to the secure URL.
 */
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    console.log('Cloudinary response:', response.data);
    return response.data.secure_url;
  } catch (error: any) {
    console.error('Error uploading image:', error.response?.data || error.message);
    throw new Error('Failed to upload image to Cloudinary');
  }
};
