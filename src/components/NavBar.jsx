import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from './firebase'
import { useSelector, useDispatch } from 'react-redux';
import { SetSkeletonView } from '../features/skeletonview/SkeletonView';
import { HStack, Stack } from "@chakra-ui/react"
import { Skeleton, SkeletonCircle, SkeletonText} from '../components/ui/skeleton';


export default function NavBar() {


  // const[CurrentEmail,setCurrentEmail] = useState('')
  const AuthEmail = useSelector((state) => state.authenticationData.email)
  const Name = useSelector((state) => state.authenticationData.name)
  const firstName = Name.split(" ")[0];

  // useEffect (() => {
  //         setTimeout(() => {
  //             if(auth.currentUser != null){
  //                 console.log(auth.currentUser)
  //                 setCurrentEmail(auth.currentUser.email)
  //             }
  //             console.log("Executed after 1 seconds");
  //           }, 1000);
  //     },[])

 
    return (
      <div className='NavigationBar' style={{height:(window.innerHeight)*10/100}}>
        <Link to={'/'} ><img src={`${process.env.PUBLIC_URL}/photos/Logo.svg`} className='NavBarLogo' /></Link>
        <div className='LoginSection' >
          <Link className='NavBarButtons' to={'/CartPage'} >
              <p className='NavBarButtonsText'>Cart</p>
          </Link>
          { AuthEmail == '' ? 
            <Link className='NavBarButtons' to={'/LoginPage'}>
              <p className='NavBarButtonsText'>Login</p>
            </Link> 
            :
            <Link className='NavBarButtons' to={'/AccountPage'}>
              <p className='NavBarButtonsText'>{firstName}</p>
            </Link>
          }
        </div>
      </div>
    )
  }  