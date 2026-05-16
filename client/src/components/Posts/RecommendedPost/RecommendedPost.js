import React from 'react';
import {Card,CardMedia,CardContent,Typography} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles.js';

const RecommendedPost = ({title,message,name,likes,selectedFile,_id,}) => {
  const classes = useStyles();
  const history=useHistory()
  const openPost=(_id)=>{
      history.push(`/posts/${_id}`)
    }
  return (
    <Card
      className={classes.card}
      onClick={() => openPost(_id)}
      elevation={4}
    >
      <CardMedia
        className={classes.media}
        image={selectedFile}
        title={title}
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          className={classes.title}
        >
          {title}
        </Typography>

        <Typography
          gutterBottom
          variant="subtitle2"
          color="textSecondary"
        >
          {name}
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.message}
        >
          {message}
        </Typography>

        <Typography
          variant="subtitle1"
          className={classes.likes}
        >
          Likes: {likes.length}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecommendedPost;