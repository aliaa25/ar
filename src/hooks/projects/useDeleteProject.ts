import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-hot-toast";

const deleteProject = async (projectId: string) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/projects/delete-project/${projectId}`, {
    data: {
      userEmail: "lzayd927@gmail.com"
    }
  });
  return response.data;
};

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success(" Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      toast.error(" Failed to delete project");
      console.error(error);
    }
  });
};

export default useDeleteProject;
