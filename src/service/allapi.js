import { BASE_URL } from "./baseurl";
import { commonRequest } from "./commonRequest";

//add videos
 //function definition for add video
 export const addVideo=async(body)=>{

 return  await  commonRequest("POST",`${BASE_URL}/videos`,body)
}
//get video
//function define for get video from back end
 export const getVideo=async()=>{
   return   await commonRequest("GET",`${BASE_URL}/videos`,"") //no need of body
}
//delete video
 export const deleteVideo=async(id)=>{
 return await  commonRequest("DELETE",`${BASE_URL}/videos/${id}`,{})
}

//add category
export const addCategory=async(body)=>{
  return await   commonRequest("POST",`${BASE_URL}/category`,body)
}
//get category
//function define for get category from back end
export const getCategory=async()=>{
  return   await commonRequest("GET",`${BASE_URL}/category`,"") //no need of body
}
//delete category
export const deleteCategory=async(id)=>{
return await  commonRequest("DELETE",`${BASE_URL}/category/${id}`,{})
}
//get watch history
 export const getHistory=async()=>{
return await  commonRequest("GET",`${BASE_URL}/watchhistory`,"")
}
//add history

 export const addHistory=async(body)=>{
 return await commonRequest("POST",`${BASE_URL}/watchhistory`,body)
}
//To get a specific video data from resource 
export const getVideos=async(id)=>{
  return   await commonRequest("GET",`${BASE_URL}/videos/${id}`,"") //no need of body
}
//To update video details in category
export const updateCategory=async(id,body)=>{
  return   await commonRequest("PUT",`${BASE_URL}/category/${id}`,body) //no need of body
}