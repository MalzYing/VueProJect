import axiosInstance from "../request/secondAxios.js";

export const getUser=(data)=>
{
    return axiosInstance.request(
        {
            method:"POST",
            url:'/admin/login',
            data
        })
}