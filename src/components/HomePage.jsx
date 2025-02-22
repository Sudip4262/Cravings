import React, { use, useEffect , useState} from 'react'
import { Input } from "@chakra-ui/react"
import { collection, doc, setDoc , getDoc, getDocs } from "firebase/firestore";
import { Link , useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SetCounterValue } from '../features/counter/CounterSlice';
import { SetSkeletonView} from '../features/skeletonview/SkeletonView';
import { 
    SetAuthenticationName, 
    SetAuthenticationEmail, 
    SetAuthenticationPhone , 
    SetAuthenticationAddress, 
    SetAuthenticationCart, 
    SetAuthenticationOrders, 
    SetAuthenticationPetName, 
    SetAuthenticationLocation
 } from '../features/authenticationData/AuthenticationData';
import { HStack, Stack } from "@chakra-ui/react"
import { Skeleton, SkeletonCircle, SkeletonText} from '../components/ui/skeleton'

import { IoAddCircle } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { FaCaretSquareDown } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { db, auth } from './firebase';


export default function HomePage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const data = [
        {name:'Biryani', value : 1},
        {name:'Regular Thali', value : 2},
        {name:'Noodles', value : 3},
        {name:'Veg Starters', value : 4},
        {name:'NonVeg Starters', value : 5},
        {name:'Veg Main Course', value : 6},
        {name:'NonVeg Main Course', value : 7},
        {name:'Fish Dishes', value : 8},
        {name:'Combo', value : 9},
        {name:'Roti', value : 10},
        {name:'Roll', value : 11},
        {name:'Rice', value : 12},
        {name:'Special Dishes', value : 13},
        {name:'Beverages', value : 14},
        {name:'addon', value : 15},
        ]


    const[Recom,setRecom] = useState(data)
    const[OpeningModal,setOpeningModal]=useState('flex')
    const[SearchActive, setSearchActive] = useState('no')
    const[HotDeals,setHotDeals] = useState([])
    const AuthEmail = useSelector((state) => state.authenticationData.email)
    const PetAddress = useSelector((state) => state.authenticationData.petname)
    const Location = useSelector((state) => state.authenticationData.location)
    // console.log(AuthEmail)
    // console.log(Location)


    useEffect (() => {
        getData()
        setTimeout(() => {
            // console.log(auth.currentUser)
            if(auth.currentUser != null){
                console.log(auth.currentUser.email)
                dispatch(SetCounterValue(auth.currentUser.email))
                getAccountData(auth.currentUser.email)
                dispatch(SetSkeletonView(true))
            }
            // console.log("Executed after 1 seconds");
          }, 600);
    },[])

    const AllThingsToDoFirst = () => {
        setOpeningModal('none')
    }


    const getAccountData = async(Email) => {
        const Ref = doc(db,'Users',Email)
        const docSnap = await getDoc(Ref)
        if (docSnap.exists()) {
          const Data = docSnap.data()
            // console.log("Document data:", Data);
            dispatch(SetAuthenticationName(Data.name))
            dispatch(SetAuthenticationEmail(Data.email))
            dispatch(SetAuthenticationPhone(Data.phone))
            dispatch(SetAuthenticationAddress(Data.address))
            dispatch(SetAuthenticationCart(Data.cart))
            dispatch(SetAuthenticationOrders(Data.orders))
            dispatch(SetAuthenticationPetName(Data.address[0].petname))
            dispatch(SetAuthenticationLocation(Data.address[0].loc))
            // console.log(Data.address)
          } else {
            console.log("No such document!");
          }
      }


const getData = async() => {
    const docRef = doc(db, "Products", "HotDeals");
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data().items)
    setHotDeals(docSnap.data().items)
}


  const ShowSugg = (txt) => {
    let searchText = txt ? String(txt).toLowerCase() : "";
    let recommendations = data.filter((item) =>{
        return item.name.toLowerCase().includes(searchText)
    })
    // console.log(recommendations)
    setRecom(recommendations)
  }


 if (HotDeals.length > 0 ) {
    return (
        <>
            <div className='WholeContainerHome'  >
                <div className='SearchViewBackground' style={{height:(window.innerHeight)*35/100}} >
                    <div className='SearchView' >
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                            <p className='AddressIcon'>{PetAddress != '' ? PetAddress : 'Address' }  |</p>
                            {PetAddress != '' ?
                            <FaCaretSquareDown className='AddressIcon'/>
                            :
                            <IoAddCircle className='AddressIcon'/>
                            }
                        </div>
                        <p className='AddressText' >{Location != '' ? Location : 'Your address will be shown here...' }</p>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                            <Input className='SearchBox' placeholder='e.g.,Biryani' variant={"subtle"} style={{width:(window.innerWidth)*50/100}} 
                            onChange={(txt) => {
                                ShowSugg(txt.target.value)
                                }}
                            onClick={() => {
                                setSearchActive('yes')
                            }}
                            />
                            <div className='SearchIconBack' style={{width:(window.innerWidth)*7/100}}><LuSearch className='SearchIcon'/></div>
                        </div>
                        <div className={`SearchBoxSugg ${SearchActive == 'yes' ? 'active' : 'inactive'}`} style={{width:(window.innerWidth)*50/100}}  >
                            { 
                                Recom.map((item) => {
                                  return(
                                      <div className='searchSuggession' key={item.value} onClick={() => {navigate('/Menu',{state:item.name})}} >
                                          <p className='SuggessionItem' >{item.name}</p>
                                      </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='HotDealsContainer' onClick={() => {setSearchActive('no')}} >
                    <div className='HotDealsPart' >
                        <p className='Captions'>Hot Deals:</p>
                        <div className='HotDealsPartItems' style={{justifyContent:'flex-start',paddingLeft:50}} >
                            {
                                HotDeals.map((item) => {
                                    return(
                                        <Link key={item.name} style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}} to={'/Menu'} state = {{new:item}}>
                                            <div className='HotDealsItemBox' style={{backgroundImage:`url('${item.img1}')` , backgroundSize:'cover'}}>
                                                <div className='PriceTag' >
                                                    <p className='OfferText1'>get it @</p>
                                                    <p className='OfferText1'> ₹</p>
                                                    <p className='OfferText2'>{item.offprice}</p>
                                                </div>
                                            </div>
                                            <p className='CatagoryCaptions' style={{textAlign:'center'}} >{item.name}</p>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* <div className='BannerPart'></div> */}
                </div>
                <div className='HotDealsContainer' style={{flexDirection:'column'}} onClick={() => {setSearchActive('no')}} >
                    <p className='Captions'>Our Catagories:</p>
                    <div className='HotDealsPartItems' >
                        <Link style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}} 
                        to= '/Menu' state = 'Biryani'>
                            <div className='HotDealsItemBox' style={{backgroundImage:`url('${process.env.PUBLIC_URL}/photos/Biryani.jpg')` , backgroundSize:'cover'}}>
                                <div className='PriceTag' >
                                    <p className='OfferText1'>₹</p>
                                    <p className='OfferText2'>239</p>
                                    <p className='OfferText1'>onwards</p>
                                </div>
                            </div>
                            <p className='CatagoryCaptions' style={{textAlign:'center'}} >Biryani</p>
                        </Link>
    
                        <Link style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}
                        to= '/Menu' state = 'RegularThali'>
                            <div className='HotDealsItemBox' style={{backgroundImage:`url('${process.env.PUBLIC_URL}/photos/RegularThali.jpg')` , backgroundSize:'cover'}}>
                                <div className='PriceTag' >
                                    <p className='OfferText1'>₹</p>
                                    <p className='OfferText2'>119</p>
                                    <p className='OfferText1'>onwards</p>
                                </div>
                            </div>
                            <p className='CatagoryCaptions' style={{textAlign:'center'}} >Regular Thali</p>
                        </Link>
                        <Link style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}
                        to= '/Menu' state = 'Noodles'>
                            <div className='HotDealsItemBox' style={{backgroundImage:`url('${process.env.PUBLIC_URL}/photos/Noodles.jpg')` , backgroundSize:'cover'}}>
                                <div className='PriceTag' >
                                    <p className='OfferText1'>₹</p>
                                    <p className='OfferText2'>129</p>
                                    <p className='OfferText1'>onwards</p>
                                </div>
                            </div>
                            <p className='CatagoryCaptions' style={{textAlign:'center'}} >Noodles</p>
                        </Link>
                        <Link style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}
                        to= '/Menu' state = 'VegStarters'>
                            <div className='HotDealsItemBox' style={{backgroundImage:`url('${process.env.PUBLIC_URL}/photos/VegStarters.jpg')` , backgroundSize:'cover'}}>
                                <div className='PriceTag' >
                                    <p className='OfferText1'>₹</p>
                                    <p className='OfferText2'>99</p>
                                    <p className='OfferText1'>onwards</p>
                                </div>
                            </div>
                            <p className='CatagoryCaptions' style={{textAlign:'center'}} >Veg Starters</p>
                        </Link>
                        <Link style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}
                        to= '/Menu' state = 'NonVegStarters'>
                            <div className='HotDealsItemBox' style={{backgroundImage:`url('${process.env.PUBLIC_URL}/photos/NonVegStarters.jpg')` , backgroundSize:'cover'}}>
                                <div className='PriceTag' >
                                    <p className='OfferText1'>₹</p>
                                    <p className='OfferText2'>159</p>
                                    <p className='OfferText1'>onwards</p>
                                </div>
                            </div>
                            <p className='CatagoryCaptions' style={{textAlign:'center'}} >Non-veg Starters</p>
                        </Link>
                        <Link style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}
                        to= '/Menu' state = 'VegMainCourse'>
                            <div className='HotDealsItemBox' style={{backgroundImage:`url('${process.env.PUBLIC_URL}/photos/VegMainCourse.jpg')` , backgroundSize:'cover'}}>
                                <div className='PriceTag' >
                                    <p className='OfferText1'>₹</p>
                                    <p className='OfferText2'>159</p>
                                    <p className='OfferText1'>onwards</p>
                                </div>
                            </div>
                            <p className='CatagoryCaptions' style={{textAlign:'center'}} >Veg Main Course</p>
                        </Link>
                        <Link style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}
                        to= '/Menu' state = 'NonVegMainCourse'>
                            <div className='HotDealsItemBox' style={{backgroundImage:`url('${process.env.PUBLIC_URL}/photos/NonVegMainCourse.jpg')` , backgroundSize:'cover'}}>
                                <div className='PriceTag' >
                                    <p className='OfferText1'>₹</p>
                                    <p className='OfferText2'>219</p>
                                    <p className='OfferText1'>onwards</p>
                                </div>
                            </div>
                            <p className='CatagoryCaptions' style={{textAlign:'center'}} >NonVeg Main Course</p>
                        </Link>
                        <Link style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}
                        to= '/Menu' state = 'FishDishes'>
                            <div className='HotDealsItemBox' style={{backgroundImage:`url('${process.env.PUBLIC_URL}/photos/FishDishes.jpg')` , backgroundSize:'cover'}}>
                                <div className='PriceTag' >
                                    <p className='OfferText1'>₹</p>
                                    <p className='OfferText2'>189</p>
                                    <p className='OfferText1'>onwards</p>
                                </div>
                            </div>
                            <p className='CatagoryCaptions' style={{textAlign:'center'}} >Fish Dishes</p>
                        </Link>
                        <Link style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}
                        to= '/Menu' state = 'Rolls'>
                            <div className='HotDealsItemBox' style={{backgroundImage:`url('${process.env.PUBLIC_URL}/photos/Rolls.jpg')` , backgroundSize:'cover'}}>
                                <div className='PriceTag' >
                                    <p className='OfferText1'>₹</p>
                                    <p className='OfferText2'>89</p>
                                    <p className='OfferText1'>onwards</p>
                                </div>
                            </div>
                            <p className='CatagoryCaptions' style={{textAlign:'center'}} >Rolls</p>
                        </Link>
                        <Link style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}
                        to= '/Menu' state = 'RiceRoti'>
                            <div className='HotDealsItemBox' style={{backgroundImage:`url('${process.env.PUBLIC_URL}/photos/RiceRoti.jpg')` , backgroundSize:'cover'}}>
                                <div className='PriceTag' >
                                    <p className='OfferText1'>₹</p>
                                    <p className='OfferText2'>59</p>
                                    <p className='OfferText1'>onwards</p>
                                </div>
                            </div>
                            <p className='CatagoryCaptions' style={{textAlign:'center'}} >Rice & Roti</p>
                        </Link>
                        <Link style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}
                        to= '/Menu' state = 'Beverages'>
                            <div className='HotDealsItemBox' style={{backgroundImage:`url('${process.env.PUBLIC_URL}/photos/Beverages.jpg')` , backgroundSize:'cover'}}>
                                <div className='PriceTag' >
                                    <p className='OfferText1'>₹</p>
                                    <p className='OfferText2'>129</p>
                                    <p className='OfferText1'>onwards</p>
                                </div>
                            </div>
                            <p className='CatagoryCaptions' style={{textAlign:'center'}} >Beverages</p>
                        </Link>
                        <Link style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}
                        to= '/Menu' state = 'addon'>
                            <div className='HotDealsItemBox' style={{backgroundImage:`url('${process.env.PUBLIC_URL}/photos/Special.jpg')` , backgroundSize:'cover'}}>
                                <div className='PriceTag' >
                                    <p className='OfferText1'>₹</p>
                                    <p className='OfferText2'>300</p>
                                    <p className='OfferText1'>onwards</p>
                                </div>
                            </div>
                            <p className='CatagoryCaptions' style={{textAlign:'center'}} >Special Dish</p>
                        </Link>
    
    
    
    
                    </div>
                </div>

                {/* Modal */}
                {/* Modal */}


                <div className='HomeMenuModal' style={{display: OpeningModal , height:window.innerHeight}}>
                    <div className='CardInMiddle'>
                        <div className='HomePageCross' onClick={()=> {AllThingsToDoFirst()}}>
                            <ImCross className='HomeCancelIcon'/>
                        </div>
                        <div className='HomeMenuModalWholeCard' ></div>
                    </div>
                </div>

            {/* Modal */}
            {/* Modal */}



            </div>
        </>
      )
 } else {
    return (
        <Stack gap="6" maxW="full" height={window.innerHeight} width={window.innerWidth} style={{marginTop:20}} >
          <Stack height={(window.innerHeight*30)/100} width={(window.innerWidth*58)/100} style={{alignSelf:'center', justifyContent:'center'}}>
            <SkeletonText noOfLines={1} height="30px" width={(window.innerWidth)*10/100}  />
            <SkeletonText noOfLines={1} height="20px" width={(window.innerWidth)*30/100}  />
            <HStack gap="3" maxW="full" style={{}} >
              <Skeleton height="60px" style={{width:"80%"}} />
              <Skeleton height="60px"  style={{width:'15%'}} />
            </HStack>
          </Stack>

          <Stack height={(window.innerHeight*70)/100} width="full" >
            <SkeletonText noOfLines={1} height="50px" width={(window.innerWidth)*15/100} style={{marginLeft:30, marginTop:20}}  />
            <HStack style={{justifyContent:'space-between'}}>
              <HStack gap="7" style={{marginTop:30}} >
                <Skeleton height="200px" width="180px" style={{marginLeft:60}} />
                <Skeleton height="200px" width="180px" />
                <Skeleton height="200px" width="180px" />
              </HStack>
              <Skeleton height="230px" width={(window.innerWidth*40)/100} style={{marginRight:30}} />
            </HStack>
          </Stack>
        </Stack>
      )
 }
}
