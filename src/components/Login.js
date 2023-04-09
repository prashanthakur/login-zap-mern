import React, { useContext, useEffect, useState } from 'react'
import userImage from '../user.png'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { UserDetails } from './Context';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const navigate = useNavigate();
  useEffect(() => {
    // let loggedIn = localStorage.getItem('logintoken')
    // if(loggedIn){
    //     navigate('/home')
    // }
    let loggedIn = Cookies.get('auth')
    console.log("cookie", loggedIn)
    if (loggedIn) {
      navigate('/home')
    }
  }, [])

  const { userData, setuserData } = useContext(UserDetails)

  const [email, setmail] = useState('')
  const [validEmail, setvalidEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setshowPassword] = useState(false)

  const notify = () => toast.error('Please fill all the fields!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });;
    const Errornotify = () => toast.error('Email or Password is not valid !', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });;

  const handleEmailChange = (e) => {
    console.log(e.target.value)
    setmail(e.target.value)
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (e.target.value.match(mailformat)) {
      // alert('matched')
      setvalidEmail(true)
    } else {
      // alert('not matched')
      setvalidEmail(false)
    }
  }
  const handlePasswordChange = (e) => {
    console.log(e.target.value)
    setPassword(e.target.value)
    console.log(e.target.value.length >= 8)
    if (e.target.value.length >= 8) {
      setValidPassword(true)
    } else {
      setValidPassword(false)
    }
  }

  const handleSignin = async () => {

    setLoading(true)

    if (password && email) {
      if(validEmail && validPassword){
        await fetch('http://localhost:4000/signin', {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      }).then(response => response.json())
        .then(res => {
          localStorage.setItem('logintoken', res.token)
          localStorage.setItem('userInfo', res.user.name)
          var date = new Date();
          date.setTime(date.getTime() + (30 * 1000));
          Cookies.set('auth', 'true', { expires: date })
          Cookies.set('authToken', res.token, { expires: date })
          setuserData(res)
          console.log(res)
        })
      navigate('/home')
      }else{
        Errornotify()
      }
      
    } else {
      notify()
      console.log('ELSE_________________-------------')
    }
    setLoading(false)
    console.log(loading)
    // navigate('/home')
  }

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className='main-login-container'>
        <div className='user-icon'>
          <img src={userImage} />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
        <div>
          <div className='welcome-text'>Welcome !</div>
          <div className='sub-text-div'>
            <p className='sub-text'>Lets connect to your workspace</p>
            <p className='sub-text'>Please enter your email to continue</p>
          </div>

          <TextField id="outlined-basic" label="Email Address" variant="outlined"
            helperText={validEmail ? '' : 'Please enter valid email'}
            onChange={(e) => handleEmailChange(e)}
            error={!validEmail}
          /><br /><br />
          {/* <TextField id="outlined-basic" label="Password" variant="outlined" type='password' 
            helperText={validPassword ? '' :'Password MUST be a minimium of 8 letters' }
            error={!validPassword}
            onChange={(e)=>handlePasswordChange(e)}  
            endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            /> */}

          <TextField
            label="Password"
            variant='outlined'
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword()}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => handlePasswordChange(e)}
            helperText={validPassword ? '' : 'Password MUST be a minimium of 8 letters'}
            error={!validPassword}
          />

          <p className='fg'>forget Password ?</p>
          <div>
            <Button variant="contained" className='btn' onClick={() => handleSignin()}>
              {loading ? <CircularProgress style={{ color: "#fff" }} /> : "Sign in"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login