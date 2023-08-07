import { apiPoster } from "../interceptor/interceptor";

export const uploadImages = async (props: {
  images: File[];
}): Promise<string[]> => {
  const { images } = props;

  const formData = new FormData();

  images.forEach((image) => {
    formData.append("files", image);
  });

  const { data } = await apiPoster<string[]>("/image/upload", formData);

  return data;
};
