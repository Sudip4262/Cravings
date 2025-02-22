import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from './firebase'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
  

import { MdOutlineNavigateNext } from "react-icons/md";

export default function AccountPage() {



  const[Name, setName] = useState('')
  const[Email, setEmail] = useState('')
  const AuthEmail = useSelector((state) => state.authenticationData.email)
  // console.log(AuthEmail)

    const navigate = useNavigate()

    useEffect(() => {
      
      DataCall(AuthEmail)
    },[])

    const DataCall = async(X) => {
      // console.log(X)
      const Ref = doc(db,'Users',X)
        const docSnap = await getDoc(Ref)
        if (docSnap.exists()) {
          const Data = docSnap.data()
            // console.log(Data)
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
        <p className='Captions' >{Name}</p>
        <p className='ProfileEmail' >{Email}</p>
        <Link className='ProfileButton' to={'/CartPage'} >
          <p className='ProfileAddress' >Cart</p>
          <MdOutlineNavigateNext size={30} color='#000' style={{marginRight:20}} />
        </Link>
        <Link className='ProfileButton' to={'/OrdersShow'}>
          <p className='ProfileAddress'  >Orders</p>
          <MdOutlineNavigateNext size={30} color='#000' style={{marginRight:20}} />
        </Link>
        <button className='ProfileButton'>
          <p className='ProfileAddress' >Address</p>
          <MdOutlineNavigateNext size={30} color='#000' style={{marginRight:20}} />
        </button>
        <Link className='ProfileButton' >
          <p className='ProfileAddress' >About Us</p>
          <MdOutlineNavigateNext size={30} color='#000' style={{marginRight:20}} />
        </Link>
        <button className='LogOutButton' onClick={() => {SigningOut()}} >
            <p style={{fontSize:22, color:'#000', fontFamily:'Outfit' }} > LogOut </p>
        </button>
      </div>
    </div>
  )
}
