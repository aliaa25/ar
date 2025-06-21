import { IArFile } from "@/types/types";
import axios from "axios";

import { useMutation } from "@tanstack/react-query";

const fetchArFile = async (name :string): Promise<IArFile> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/ar-file-url`,
        {
            name
        }


    )
    return response.data
}

 const  usePostArFile =()=>{

 return   useMutation(
 {mutationFn :fetchArFile}
 )
}


export  default usePostArFile