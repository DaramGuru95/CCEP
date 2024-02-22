import axios from "axios";
import APIConstants, {
  API_URL_V1,
} from "../../../../../Constants/apiConstants";

export const uploadImageApi = async ({
  file,
  user_id,
}: {
  file: File;
  user_id: string | null;
}) => {
  try {
    const formData = new FormData();
    formData.append("file", file, file?.name);
    if (user_id !== null) {
      formData.append("user_id", user_id);
    }
    console.log(formData, "formData");
    const response = await axios.post(
      API_URL_V1 + APIConstants.uploadImage,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const responseData = response.data;
    return responseData;
  } catch (error: any) {
    throw error.response?.data?.error || "Image upload failed";
  }
};
