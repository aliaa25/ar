"use client"
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { IProduct } from '@/types/types';

const fetchProducts = async (): Promise<IProduct[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products/getproducts`)
    return response.data
}


const useGetProducts = () => {
    const { data, isLoading, error } = useQuery({ queryKey: ['products'], queryFn: fetchProducts })

    return { data: data ?? [], isLoading, error }
}

export default useGetProducts;



