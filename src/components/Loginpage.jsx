import React, { useEffect, useState } from 'react'
import {signInWithEmailAndPassword , createUserWithEmailAndPassword } from 'firebase/auth'
import { auth , db } from './firebase'
import { Button, Input } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export default function Loginpage() {

  const[Email, setEmail] = useState('')
  const[PassWd, setPassWd ] = useState('')
  const[Page,setPage] = useState('Login')

  const navigate = useNavigate()

  useEffect(() => {
    if(auth.currentUser != null){
      navigate('/AccountPage', { state: { email : auth.currentUser.email } })
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
      <div className='LoginPageWhole' >
        <p className='Captions' >Login</p>
        <div className='LoginCredentials' >
          <Input className='inputs' placeholder="Enter your email" onChange={(txt) => { setEmail(txt.target.value) }} />
          <Input className='inputs' placeholder="Enter your Password" onChange={(txt) => { setPassWd(txt.target.value) }} />
          <Button className='LoginSubmitButton' onClick={() => {Login()}} >
            <p>Proceed</p>
          </Button>
        </div>
        <Link className='LoginNewUser' onClick={() => {setPage('CreateUser')}}>New User?</Link>
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