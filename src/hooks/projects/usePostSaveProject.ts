import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function base64ToFile(base64: string, filename: string): File {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const uploadProjectImage = async (base64Image: string, email: string) => {
  const formData = new FormData();
  const file = base64ToFile(base64Image, "scene.png");

  formData.append("image", file);
  formData.append("userEmail", email);

  // ✅ Debug: طباعة محتوى الفورم داتا
  for (const [key, value] of formData.entries()) {
    console.log(`📦 ${key}:`, value);
  }

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects/upload-project`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};

const usePostSaveProjects = () => {
  return useMutation({
    mutationFn: ({ image, userEmail }: { image: string; userEmail: string }) =>
      uploadProjectImage(image, userEmail),
  });
};

export default usePostSaveProjects;
