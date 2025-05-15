import { AxiosError } from "axios"
import axiosInstance from "../utils/axiosInstance"




export const registerUser=async(name:string,email:string,password:string)=>{
    try {
        const response=await axiosInstance.post('/api/auth/register',{name,email,password},{withCredentials:true})
        return response
    }catch (error:unknown) {

      if(error instanceof AxiosError){
         return error.response
      }else{
        throw new Error("unknown error occured")
      }

    }
}
