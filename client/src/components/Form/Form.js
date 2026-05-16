import React from 'react'
import { useState ,useEffect } from 'react'
import useStyles from "./styles.js"
import {Paper,TextField,Button,Typography} from "@material-ui/core"
import FileBase from "react-file-base64"
import {useDispatch,useSelector} from "react-redux"
import { createPost , updatePost } from '../../actions/posts.js'
import { jwtDecode } from 'jwt-decode'


const Form = ({currentId,setcurrentId}) => {
  const temp=JSON.parse(localStorage.getItem('profile'))
  let user=null;
  if(temp)
  {
    user=temp.result?temp.result:jwtDecode(temp.token)
  }
    const post=useSelector((state)=>currentId?state.posts.posts.find((p)=>p._id===currentId):null)
    const [tagInput, setTagInput] = useState('');
    const [PostData,setPostData]=useState({
      title:'',message:'',tags:[' '],selectedFile:''
    })
    useEffect(() => {
  if (currentId && post) {
    setPostData(post);
    setTagInput(post.tags.join(' '));
  }
}, [currentId, post]);
    const classes=useStyles()
    const dispatch=useDispatch();
    const handleSubmit=(e)=>{
      e.preventDefault()

      if(currentId)
      {
        dispatch(updatePost(currentId,{...PostData,name:user?.name}))
      }
      else{
      dispatch(createPost({...PostData,name:user?.name}))
      }
      clear()
    }
    const clear=()=>{
      setcurrentId(null);
      setPostData({
        title:'',message:'',tags:[' '],selectedFile:''
    })
    setTagInput(' ');
    }

    if(!user)
    {
      return (
        <Paper className={classes.paper}>
          <Typography variant='h6' align='center'>
            Please Sign In to create your own memories and like other's memories.
          </Typography>
        </Paper>
      )
    }

  return (
    <div>
      <Paper className={classes.paper} elevation={6}>
        <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}  >
          <Typography variant='h6' >
            {currentId?"Editing":"Creating"} a Memory
          </Typography>
          <TextField name='title' variant='outlined' label="Title" fullWidth value={PostData.title}
           onChange={(e)=>setPostData({...PostData,title:e.target.value})}
           />
          <TextField name='message' variant='outlined' label="Message" fullWidth value={PostData.message}
           onChange={(e)=>setPostData({...PostData,message:e.target.value})}
           />
          <TextField name='tags' variant='outlined' label="Tags" fullWidth value={tagInput}
           onChange={(e)=>{
             const value = e.target.value;

             setTagInput(value);

            setPostData({
             ...PostData,
            tags: value.trim().split(/\s+/)
            });}}
           />
           <div className={classes.fileInput}>
            <FileBase
            key={PostData.selectedFile}
            type="file"
            multiple={false}
            onDone={({base64})=>setPostData({...PostData,selectedFile:base64})}
             />
           </div>
           <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
           <Button  variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
    </div>
  )
}

export default Form
