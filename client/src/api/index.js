import axios from "axios"

const API =axios.create({baseURL:process.env.REACT_APP_API})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPosts=(page)=>{
    return API.get(`/posts?page=${page}`)
}
export const fetchPost=(id)=>API.get(`/posts/${id}`)
export const createPost=(newPost)=> API.post("/posts",newPost)
export const fetchPostsBySearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search||"none"}&tags=${searchQuery.tags}`)
export const updatePost=(id,updatedPost)=>API.patch(`/posts/${id}`,updatedPost)
export const deletePost=(id)=>API.delete(`/posts/${id}`)
export const comment=(value,id)=>API.post(`/posts/${id}/commentPost`,{value})

export const likePost=(id)=>API.patch(`/posts/${id}/likePost`)


export const signin=(formData)=>API.post("/user/signin",formData);

export const signup=(formData)=>API.post("/user/signup",formData);