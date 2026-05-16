import React,{useEffect} from 'react'
import {Grid,CircularProgress} from "@material-ui/core"
import Post from './Post/Post.js'
import useStyles from "./styles.js"
import { getPosts } from '../../actions/posts.js'
import {useSelector,useDispatch} from "react-redux"


const Posts = ({setcurrentId}) => {
    const classes=useStyles()
    const dispatch=useDispatch
    const {posts,isLoading}=useSelector((state)=>{
      return state.posts
    })
    if(!posts.length&&!isLoading) return "No Posts"
  return (
    isLoading?<CircularProgress/>:(
      <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
        {
          posts.map((post)=>{
            return(
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setcurrentId={setcurrentId}/>
            </Grid>
            )
          })
        }
      </Grid>

    )
  )
}

export default Posts
