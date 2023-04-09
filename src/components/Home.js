import React,{useContext} from 'react';
import { UserDetails } from './Context';
import userImage from '../user.png'


const Home = () => {
  const {userData}= useContext(UserDetails)
  console.log(useContext(UserDetails))
  const username = localStorage.getItem('userInfo')
  console.log(username)
  return (
    <div className='main-home-div'>
      <div className='user-icon'>
        <img src={userImage}/>
      </div>
    <h1>welcome {username}</h1>
    </div>
  )
}

export default Home