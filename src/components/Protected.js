import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const Protected = (props) => {
    const {Component} = props;
    const navigate = useNavigate()
    useEffect(()=>{
        // let login = localStorage.getItem("logintoken");
        // if(!login){
        //     navigate('/')
        // }
        let loggedIn = Cookies.get('auth')
        console.log("cookie",loggedIn)
        if(!loggedIn){
            navigate('/')
        }
    },[])
  return (
    <Component/>
  )
}

export default Protected