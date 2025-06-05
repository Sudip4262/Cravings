import React, { useEffect, useState } from 'react'
import {signInWithEmailAndPassword , createUserWithEmailAndPassword } from 'firebase/auth'
import { auth , db } from './firebase'
import { Button, Input } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useDispatch, useSelector } from 'react-redux'
import { SetCurrentLogin } from '../features/counter/CounterSlice'
import { SetAuthenticationEmail } from '../features/authenticationData/AuthenticationData'
import { BeatLoader } from "react-spinners"

import { MdOutlineNavigateNext } from "react-icons/md";


export default function Loginpage() {

  const dispatch = useDispatch()

  const[Email, setEmail] = useState('')
  const[PassWd, setPassWd ] = useState('')
  const[Page,setPage] = useState('Login')
  const LoginStatus = useSelector((state) => state.counter.LoginStatus)
  const navigate = useNavigate()

  useEffect(() => {
    if(auth.currentUser != null){
      navigate('/AccountPage')
    }
  },[])
  
  

  const Authentication = async() => {
    try {
      await createUserWithEmailAndPassword(auth, Email, PassWd)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        navigate('/AccountSetupPage' , {state: { email : Email }} )

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
    } catch (error) {
      console.log(error)
    } 
  }


  const Login = async() => {
    try {
      await signInWithEmailAndPassword(auth, Email, PassWd)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        console.log("user is logged in" + user.providerData[0].email)
        dispatch(SetAuthenticationEmail(user.providerData[0].email))
        dispatch(SetCurrentLogin(true))
        navigate('/')
        window.location.reload()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
    } catch (error) {
      console.log(error)
    } 
  }



  if(Page == 'Login'){
    return (
      <div className='ProfileWhole' style={{height: window.innerHeight}}>
      <div className='ProfileSectionWhole' >
          <p className='Captions' >Login</p>
          <Input className='inputs' placeholder="Enter your email" onChange={(txt) => { setEmail(txt.target.value) }} />
          <Input className='inputs' placeholder="Enter your Password" onChange={(txt) => { setPassWd(txt.target.value) }} />
          <Button className='LoginSubmitButton' onClick={() => {Login()}} >
            <p>Proceed</p>
          </Button>
          <Link className='LoginNewUser' onClick={() => {setPage('CreateUser')}}>New User?</Link>
      </div>
    </div>
    )
  } else if(Page == 'CreateUser'){
    return (
      <div className='LoginPageWhole' style={{height: window.innerHeight}} >
        <p className='Captions' >Sign in</p>
        <div className='LoginCredentials' >
          <Input className='inputs' placeholder="Enter your email" onChange={(cba) => { setEmail(cba.target.value) }} />
          <Input className='inputs' placeholder="Enter your Password" onChange={(cba) => { setPassWd(cba.target.value) }} />
          <Button className='LoginSubmitButton'  onClick={() => {Authentication()}} 
          loading
          colorPalette="blue"
          spinner={<BeatLoader size={8} color="white" />}
          >
            <p>Proceed</p>
          </Button>
        </div>
        <Link className='LoginNewUser' onClick={() => {setPage('Login')}} >Already have an  account ?</Link>
      </div>
    )
  } 

}