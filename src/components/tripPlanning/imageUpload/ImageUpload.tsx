import { ENDPOINTS } from '@/constants/endpoints';
import { ImageUploadResponseData } from '@/types/api';

export const uploadImageToServer = async (
  file: File,
  post: (url: string, data: any) => Promise<any>,
): Promise<string> => {
  const imageData = {
    fileName: file.name,
    contentType: file.type,
    contentLength: file.size,
  };

  try {
    const uploadResponse = await post(ENDPOINTS.IMAGES.UPLOAD, imageData);
    if (uploadResponse.statusCode !== 200) {
      throw new Error('이미지 업로드 요청 실패');
    }

    const { presignedUrl, key } =
      uploadResponse.data as ImageUploadResponseData;

    const uploadToS3 = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    if (uploadToS3.status !== 200) {
      throw new Error('S3에 이미지 업로드 실패');
    }

    return key;
  } catch (error) {
    console.error('이미지 업로드 오류:', error);
    throw error;
  }
};
