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

import { MdOutlineNavigateNext } from "react-icons/md";


export default function Loginpage() {

  const[Email, setEmail] = useState('')
  const[PassWd, setPassWd ] = useState('')
  const[Page,setPage] = useState('Login')

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
      <div className='ProfileWhole'>
      <div className='AddsSection' style={{width: (window.innerWidth - 500)}} >
        <Swiper
          // install Swiper modules  
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          style={{height:'100%',width:'100%'}}>
          <SwiperSlide style={{backgroundColor:'#000', height:'100%' , width:'100%'}}>
            <img src='https://i.pinimg.com/736x/de/16/a1/de16a1c47cd42fce3957cb18ffd4df18.jpg' style={{height:'100%', width:'100%'}} />
          </SwiperSlide>
          <SwiperSlide style={{backgroundColor:'#000', height:'100%' , width:'100%'}}>
            <img src='https://i.pinimg.com/736x/71/7d/93/717d930dfe836e8bbcd15ddb45faabda.jpg' style={{height:'100%', width:'100%'}} />
          </SwiperSlide>
          <SwiperSlide style={{backgroundColor:'#000', height:'100%' , width:'100%'}}>
            <img src='https://i.pinimg.com/736x/86/d9/64/86d9643db38735c4382f2cfbb747a66a.jpg' style={{height:'100%', width:'100%'}} />
          </SwiperSlide>
          <SwiperSlide style={{backgroundColor:'#000', height:'100%' , width:'100%'}}>
            <img src='https://i.pinimg.com/736x/f5/b3/91/f5b391ae08f34ca283a70c6c81ffe8cd.jpg' style={{height:'100%', width:'100%'}} />
          </SwiperSlide>
          ...
        </Swiper>
      </div>
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
      <div className='LoginPageWhole' >
        <p className='Captions' >Sign in</p>
        <div className='LoginCredentials' >
          <Input className='inputs' placeholder="Enter your email" onChange={(cba) => { setEmail(cba.target.value) }} />
          <Input className='inputs' placeholder="Enter your Password" onChange={(cba) => { setPassWd(cba.target.value) }} />
          <Button className='LoginSubmitButton' onClick={() => {Authentication()}} >
            <p>Proceed</p>
          </Button>
        </div>
        <Link className='LoginNewUser' onClick={() => {setPage('Login')}} >Already have an  account ?</Link>
      </div>
    )
  } 

}