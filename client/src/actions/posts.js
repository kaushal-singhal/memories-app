import * as api from "../api"
import {COMMENT,FETCH_POST,START_LOADING,END_LOADING, FETCH_BY_SEARCH,FETCH_ALL,CREATE,UPDATE,DELETE } from "../constants/actionTypes";

export const getPost=(id)=> async (dispatch)=>{
    try{
        dispatch({type:START_LOADING})
        const {data}=await api.fetchPost(id);
        dispatch({type:FETCH_POST,payload :data})
        dispatch({type:END_LOADING})
    }
    catch(error){
        console.log(error)
    }
}

export const getPosts=(page)=> async (dispatch)=>{
    try{
        dispatch({type:START_LOADING})
        const {data}=await api.fetchPosts(page);
        dispatch({type:FETCH_ALL,payload :data})
        dispatch({type:END_LOADING})
    }
    catch(error){
        console.log(error)
    }
}

export const commentPost=(value,id)=>async(dispatch)=>{
    try{
        const data=await api.comment(value,id)
        dispatch({type:COMMENT,payload:data.data})
        return data.data.comments;
    }
    catch(error){
        console.log(error)
    }
}

export const getPostsBySearch=(searchQuery)=>async(dispatch)=>{
    try{
        dispatch({type:START_LOADING})
        const {data:{data}}=await api.fetchPostsBySearch(searchQuery);
        dispatch({type:FETCH_BY_SEARCH,payload :data})
        dispatch({type:END_LOADING})
    }
    catch(error){
        console.log(error)
    }
}

export const createPost=(post)=>async(dispatch)=>{
    try{
        dispatch({type:START_LOADING})
        await api.createPost(post);
        const {data}=await api.fetchPosts(1);
        dispatch({type:FETCH_ALL,payload :data})
        dispatch({type:END_LOADING})
    }
    catch(error){
        console.log(error)
    }
}

export const updatePost=(id,post)=>async(dispatch)=>{
    try{
        const {data}=await api.updatePost(id,post)
        dispatch({type:UPDATE,payload:data})
        dispatch(getPosts())
    }
    catch(error){
        console.log(error)
    }
}

export const deletePost=(id)=>async (dispatch)=>{
    try{
        dispatch({type:START_LOADING})
        await api.deletePost(id)
        const {data}=await api.fetchPosts(1);
        dispatch({type:FETCH_ALL,payload :data})
        dispatch({type:END_LOADING})
    }
    catch(error){
        console.log(error)
    }
}


export const likePost=(id)=>async(dispatch)=>{
    try{
        const {data}=await api.likePost(id)
        dispatch({type:UPDATE,payload:data})
    }
    catch(error){
        console.log(error)
    }
}