"use client";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface UploadResponse {
  message: string;
  modelName: string;
  arFile: string;
}
const uploadModel = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/models/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

const useUploadModel = () => {
  return useMutation({
    mutationFn: uploadModel,
  });
};

export default useUploadModel;
