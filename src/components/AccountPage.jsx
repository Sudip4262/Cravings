import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from './firebase'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';



import { MdOutlineNavigateNext } from "react-icons/md";

export default function AccountPage() {


  const[Name, setName] = useState('')
  const[Email, setEmail] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      console.log(location.state)
      DataCall(location.state.email)
    },[])

    const DataCall = async(X) => {
      const Ref = doc(db,'Users',X)
        const docSnap = await getDoc(Ref)
        if (docSnap.exists()) {
          const Data = docSnap.data()
            console.log(Data)
            setName(Data.name)
            setEmail(Data.email)
          } else {
            console.log("No such document!");
          }
    }


    const SigningOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('Successful Sign Out')
            navigate("/")
            window.location.reload()
          }).catch((error) => {
            // An error happened.
            console.log(error)
          });
    }



  return (
    <div className='ProfileWhole'>
        <p className='Captions' >{Name}</p>
        <p className='ProfileEmail' >{Email}</p>
        <button className='ProfileButton'>
          <p className='ProfileAddress' >Address</p>
          <MdOutlineNavigateNext size={30} color='#fff' style={{marginRight:20}} />
        </button>
        <button className='ProfileButton'>
          <p className='ProfileAddress' >Orders</p>
          <MdOutlineNavigateNext size={30} color='#fff' style={{marginRight:20}} />
        </button>
        <Link className='ProfileButton' to={'/CartPage'} >
          <p className='ProfileAddress' >Cart</p>
          <MdOutlineNavigateNext size={30} color='#fff' style={{marginRight:20}} />
        </Link>
        <button className='LogOutButton' onClick={() => {SigningOut()}} >
            <p style={{fontSize:22, color:'#FFF', fontFamily:'Outfit' }} > LogOut </p>
        </button>
    </div>
  )
}
