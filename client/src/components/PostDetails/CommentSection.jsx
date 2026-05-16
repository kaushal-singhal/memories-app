import React,{useState,useRef} from "react";
import {Typography ,TextField,Button, ButtonGroup} from "@material-ui/core"
import {useDispatch} from "react-redux";
import useStyles from "./styles"
import {commentPost} from "../../actions/posts"
import {jwtDecode} from "jwt-decode"

const CommentSection=({post})=>{
    const classes=useStyles();
    const dispatch=useDispatch();
    const [comments,setcomments]=useState(post?.comments);
    const [comment,setcomment]=useState('');
    const temp=JSON.parse(localStorage.getItem('profile'))
    let user;
    if(temp)
    {
        user=(temp?.result)?(temp?.result):jwtDecode(temp?.token)
    }

    const handleClick=async()=>{
        const finalComment =`${user.name}: ${comment}`
        const newComments=await dispatch(commentPost(finalComment,post._id))
        setcomments(newComments)
        setcomment('')
    }
    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c,i)=>{
                        return (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                        )
                    })}
                </div>
                {user&&
                <div style={{width:"70%"}}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField
                    fullWidth
                    minRows ={4}
                    variant="outlined"
                    label="Comment"
                    multiline
                    value={comment}
                    onChange={(e)=>setcomment(e.target.value)}
                    />
                    <Button style={{marginTop:"10px"}} fullWidth color="primary"  variant="contained" onClick={handleClick} disabled={!comment||!user}>
                        Comment
                    </Button>
                </div>
                }
            </div>
        </div>
    )
}
export default CommentSection;