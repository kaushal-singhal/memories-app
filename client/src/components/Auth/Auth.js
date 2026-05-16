import React from 'react'
import { useState } from 'react'
import {Avatar,Button,Paper , Grid , Typography ,Container} from "@material-ui/core"
import useStyles from "./styles"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Input from './Input.js'
import Icon from './icon.js'
import { GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js'
import {signup,signin} from '../../actions/auth.js'

const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

const Auth = () => {
    const history=useHistory();
    const dispatch=useDispatch()
    const [formData,setformData]=useState(initialState)
    const [showPassword,setshowPassword]=useState(false)
    const classes=useStyles()
    const [isSignup,setisSignup]=useState(false)

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(isSignup)
        {
            dispatch(signup(formData,history))
        }
        else{
            dispatch(signin(formData,history))
        }
    }
    const switchMode=()=>{
        setisSignup((prevIssignup)=>!prevIssignup)
        handleShowPassword(false)
    }
    const handleChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }
    const handleShowPassword=()=>setshowPassword((prevShowPassword)=>!prevShowPassword)
    const googlesuccess = async (res) => {
    const token = res?.credential;

    try {
        
        dispatch({
            type: 'AUTH',
            data: { token }
        });
        history.push('/')

    } catch (error) {
        console.log(error);
    }
}
    const googlefailure=(error)=>{
        console.log(error)
        console.log("Google Sign in was unsuccessful.Try again later")
    }
  return (
    <Container component="main"  maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant='h5'>
                {isSignup?'Sign Up':'Sign In'}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup&&(
                            <>
                            <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half/>
                            <Input name='lastName' label="Last Name" handleChange={handleChange} half/>
                         
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
                    {isSignup&&<Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}  >
                    {isSignup?"Sign Up":"Sign In"}
                </Button>
                <GoogleLogin
                clientId='1073613656766-hcfrjivs4hmop3d5fk4ll7n06uoldtfj.apps.googleusercontent.com'
                render={(renderProps)=>(
                    <Button 
                    className={classes.googleButton} 
                    color='primary' 
                    fullWidth 
                    onClick={renderProps.onClick} 
                    disabled={renderProps.disabled} 
                    startIcon={<Icon/>} 
                    variant='contained'>
                        Google Sign In
                    </Button>
                )}
                onSuccess={googlesuccess}
                onFailure={googlefailure}
                uxMode='popup'
                cookiePolicy='single_host_origin'
                />
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode} style={{ textTransform: 'none' }} >
                            {isSignup?"Already have an account? Sign In":"Don't have an account"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>

    </Container>
  )
}

export default Auth
