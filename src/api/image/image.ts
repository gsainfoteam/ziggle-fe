import { ziggleApi } from '..';

export const uploadImages = async (images: File[]) => {
  const fd = new FormData();
  images.forEach((image) => fd.append('images', image));
  const { data } = await ziggleApi.post<string[]>('/image/upload', fd);
  return data;
};
