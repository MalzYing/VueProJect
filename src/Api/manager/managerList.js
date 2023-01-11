import axiosInstance from "../../request/secondAxios.js";

export const getManagers=(token)=>
{

     return axiosInstance.request(
        {
            method:'get',
            url:'/admin/list',

        })

}


export const deleteManager=(adminid)=>
{

     return axiosInstance.request(
        {
            method:'get',
            url:'/admin/list?adminid='+adminid,
        })

}

export const addManager=(data)=>
{

     return axiosInstance.request(
        {
            method:'get',
            url:'/admin/add',
            params:data
        })

}