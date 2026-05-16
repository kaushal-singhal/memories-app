import React,{useEffect, useState} from 'react'
import useStyles from "./styles.js"
import moment from "moment"
import {Card,CardActions,CardContent,CardMedia,Button,Typography,ButtonBase } from "@material-ui/core"
import ThumbUpAlticon from "@material-ui/icons/ThumbUpAlt.js"
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined.js"
import DeleteIcon from "@material-ui/icons/Delete.js"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz.js"
import {useDispatch} from 'react-redux'
import { deletePost ,likePost } from '../../../actions/posts.js'
import { jwtDecode } from 'jwt-decode'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js'
const Post = ({post,setcurrentId}) => {
const history=useHistory();
const dispatch=useDispatch();
const [likes,setlikes]=useState(post?.like)
const user = JSON.parse(localStorage.getItem('profile'));
const handleLike=async()=>{
  dispatch(likePost(post._id))
}
const Likes=()=>{
  
  if(user)
  {
  if(post.likes.length>0)
  {
    return post.likes.find((like)=>like===(user?.result?._id||jwtDecode(user.token).sub))
    ?(
      <><ThumbUpAlticon fontSize='small'/>&nbsp; {post.likes.length}&nbsp;Like{post.likes.length>1?"s":""} </>
    ):(
      <><ThumbUpAltOutlined fontSize='small'/>&nbsp; {post.likes.length}&nbsp;Like{post.likes.length>1?"s":""} </>
    )
  }
  return <><ThumbUpAltOutlined fontSize='small'/>&nbsp;Like</>
}
if(post.likes.length==0)
{
  return <><ThumbUpAltOutlined fontSize='small'/>&nbsp;Like</>
}
if(post.likes.length==1)
{
  return <><ThumbUpAltOutlined fontSize='small'/>&nbsp;1&nbsp;Like</>
}
return <><ThumbUpAltOutlined fontSize='small'/>&nbsp;{post.likes.length}&nbsp;Likes</>
}



    const classes=useStyles()
    const openPost=()=>{
      history.push(`/posts/${post._id}`);
    }
  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase  onClick={openPost} className={classes.cardAction}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
      <div className={classes.overlay}>
        <Typography variant='h6' >{post.name}</Typography>
        <Typography variant='body2' >{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {user&&
        ((post.creator===user?.result?._id||post.creator===jwtDecode(user?.token)?.sub)&&<Button style={{color:"white"} } size='small' onClick={(e)=>{
          e.stopPropagation();
           setcurrentId(post._id)}}>
          <MoreHorizIcon fontSize='default'/>
        </Button>
  )}
        
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=>`#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} variant='h5' gutterBottom >{post.title}</Typography>
      <CardContent>
      <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
      </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color='primary' disabled={!user} onClick={handleLike}>
          <Likes/>
        </Button>
        {user&&
        ((post.creator===user?.result?._id||post.creator===jwtDecode(user?.token)?.sub)&&<Button size="small" color='primary' disabled={!user} onClick={()=>{dispatch(deletePost(post._id))}}>
          <DeleteIcon fontSize='small'/>
          Delete
        </Button>
  )}
      </CardActions>
    </Card>
  )
}

export default Post
