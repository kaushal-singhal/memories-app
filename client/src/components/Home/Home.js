import React from 'react'
import { Container,Grow,Grid,Paper,AppBar,TextField,Button  } from '@material-ui/core'
import Posts from '../Posts/Posts'
import { useHistory,useLocation } from 'react-router-dom/cjs/react-router-dom.min.js'
import ChipInput from "material-ui-chip-input"
import Form from "../Form/Form"
import {useDispatch} from "react-redux"
import { getPosts,getPostsBySearch } from '../../actions/posts'
import { useState,useEffect } from 'react'
import Paginate from '../pagination.jsx'
import useStyles from "./styles.js"
function useQuery(){
  return new URLSearchParams(useLocation().search);
}


const Home = () => {
  const [tags,settags]=useState([])
  const [search,setsearch]=useState('');
  const classes=useStyles();
  const dispatch=useDispatch();
  const query=useQuery();
  const history=useHistory();
  const page=query.get('page')||1;
  const searchQuery=query.get('searchQuery')
  const [currentId , setcurrentId]=useState(null);
  const searchPost=()=>{
    if(search.trim()||tags)
    {
      dispatch(getPostsBySearch({search,tags:tags.join(',')}))
      history.push(`/posts/search?searchQuery=${search||"none"}&tags=${tags.join(',')}`)
    }
    else{
      history.push('/');
    }
  }
  const handlekeypress=(e)=>{
    if(e.keyCode===13)
    {
      searchPost()
    }
  }
  const handleadd=(tag)=>settags([...tags,tag])
  const handledelete=(tagtodelete)=>settags(tags.filter((tag)=>tag!==tagtodelete))
  return (
    <Grow in>
        <Container maxWidth="xl">
          <Grid container justifyContent='space-between' className={classes.gridContainer}  alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setcurrentId={setcurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                <TextField 
                name='search' 
                variant='outlined' 
                label="Search Memories"
                fullWidth
                onKeyPress={handlekeypress}
                value={search}
                onChange={(e)=>setsearch(e.target.value)}
                />
                <ChipInput
                style={{margin:"10p 0"}}
                value={tags}
                onAdd={handleadd}
                onDelete={handledelete}
                label="Search Tags"
                variant='outlined'
                />
                <Button onClick={searchPost} variant='contained' className={classes.appBarSearch} color='primary'>Search</Button>
              </AppBar>
              <Form currentId={currentId} setcurrentId={setcurrentId}/>
              {(!searchQuery&&!tags.length)&&
              <Paper className elevation={6} className={classes.pagination }>

                <Paginate page={page}/>
              </Paper>
              }
              
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home
