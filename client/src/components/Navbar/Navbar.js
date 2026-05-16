import React, { use, useEffect, useState } from 'react'
import { Button, Toolbar } from '@material-ui/core'
import { AppBar,Typography ,Avatar} from '@material-ui/core'
import {Link,useLocation} from 'react-router-dom'
import useStyles from "./style.js"
import memorieslogo from "../../images/memories-Logo.png"
import memoriesText from "../../images/memories-Text.png"
import { jwtDecode } from 'jwt-decode'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Navbar = () => {
    const history =useHistory();
    const [user, setUser] = useState(null);
    const location = useLocation();
    const dispatch=useDispatch();
        const logout=()=>{
        dispatch({type:'LOGOUT'});
        setUser(null)
        history.push('/')
    }
    React.useEffect(() => {

    const profile = JSON.parse(localStorage.getItem('profile'));
    if(profile){
        const token=profile.token;
        if(token)
        {
            const decodedtoken=jwtDecode(token);
            if(decodedtoken.exp*1000<new Date().getTime())
            {
                logout();
            }
            else{
        const temp = profile.result
            ? profile.result
            : jwtDecode(profile.token);
        setUser(temp);
        }
        }
    }
    }, [location]);

    const classes=useStyles()
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height='45px'/>
        <img src={memorieslogo} alt="icon" height="40px" className={classes.image}/>
        </Link>
        <Toolbar className={classes.toolbar}>
            {user?(
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.name} src={user.picture} >{user.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant='h6'>{user.name}</Typography>
                    <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                </div>
            ):(
                <div>
                    <Button component={Link} to="/auth" variant='contained' color='primary'>sign in</Button>
                </div>
            )}
        </Toolbar>
      </AppBar>
  )
}

export default Navbar
