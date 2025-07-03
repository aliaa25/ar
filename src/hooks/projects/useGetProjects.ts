"use client"
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {  IProjects } from '@/types/types';

const fetchProjects = async (): Promise<IProjects[]> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects/projects`,
    {
      userEmail: "lzayd927@gmail.com", 
    }
  );

  return response.data;
};

const useGetProjects = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  return { data: data ?? [], isLoading, error };
};

export default useGetProjects;
