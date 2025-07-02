"use client";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface ArFileResponse {
  arFile: string;
}

// هنا بنعمل GET مع الاسم في الرابط بدل POST مع body
const fetchArFile = async (modelName: string): Promise<ArFileResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/model-link/${modelName}`
  );
  return response.data;
};

const useGetArFile = () => {
  // لأن هنا اسم الموديل بيتبعت في وقت الاستدعاء للـ mutate
  return useMutation({
    mutationFn: fetchArFile,
  });
};

export default useGetArFile;
