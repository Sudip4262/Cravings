import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from './firebase'


export default function NavBar() {


  const[CurrentEmail,setCurrentEmail] = useState('')


  useEffect (() => {
          setTimeout(() => {
              if(auth.currentUser != null){
                  console.log(auth.currentUser)
                  setCurrentEmail(auth.currentUser.email)
              }
              console.log("Executed after 1 seconds");
            }, 1000);
      },[])


  return (
    <div className='NavigationBar' style={{height:(window.innerHeight)*10/100}}>
      <Link to={'/'} ><img src={'photos/Logo.svg'} className='NavBarLogo' /></Link>
      <div className='LoginSection' >
        <Link className='NavBarButtons' to={'/CartPage'} >
            <p className='NavBarButtonsText'>Cart</p>
        </Link>
        { auth.currentUser == null ? 
          <Link className='NavBarButtons' to={'/Loginpage'}>
            <p className='NavBarButtonsText'>Login</p>
          </Link>
          :
          <Link className='NavBarButtons' to={'/AccountPage'} state={{email:CurrentEmail}}>
            <p className='NavBarButtonsText'>{CurrentEmail.slice(0,4)}...</p>
          </Link>
        }
      </div>
    </div>
  )
}
