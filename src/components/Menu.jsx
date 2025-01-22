import React, { useEffect, useState } from 'react'
import { Link , useLocation, useNavigate } from 'react-router-dom';
import { collection, doc, setDoc , getDoc, getDocs,arrayUnion, updateDoc } from "firebase/firestore";
import { db, auth } from './firebase';


import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegStopCircle } from "react-icons/fa";
import { FaCaretSquareUp } from "react-icons/fa";
import { Center } from '@chakra-ui/react';


export default function Menu() {

    const navigate = useNavigate()
    const location = useLocation()

    let Data = location.state;
    console.log(Data)

    const [VegArray, setVegArray] = useState([])
    const [NonvegArray, setNonvegArray] = useState([])
    const [Cart, setCart] = useState([])
    const [MenuModal, setMenuModal] = useState('none')
    const [AddOnModal, setAddOnModal] = useState('none')
    const [LastSelectionModal, setLastSelectionModal] = useState('none')
    const[Img1,setImg1]=useState('')
    const[Name,setName]=useState('')
    const[Price,setPrice]=useState('')
    const[Desc,setDesc]=useState('')
    const[Catagory,setCatagory] = useState('')
    const[ProductType,setProductType] = useState('')
    const[AddonArray,setAddonArray] = useState([])
    const[OrderAddonArray,setOrderAddonArray] = useState([])
    const[AddonName,setAddonName] = useState('')
    const[AddonPrice, setAddonPrice] = useState('')
    const[AddonImg, setAddonImg] = useState('')
    const[AddonCatagory,setAddonCatagory] = useState('')
    const[FinalPrice,setFinalPrice] = useState('')
    const[Quantity,setQuantity]=useState('')

   
    

    useEffect(() => {
        if (Data.new) {
            setImg1(Data.new.img1)
            setName(Data.new.name)
            setDesc(Data.new.desc)
            setPrice(Data.new.offprice)
            setCatagory(Data.new.catagory)
            setProductType(Data.new.productType)
            setAddonArray(Data.new.addonArray)
            setMenuModal('flex')
            getData(Data.new.productType)
            
        } else {
            getData(Data)
            // console.log(Data.productType)
        }
    },[])


    const getData = async(Data) => {
        let nonvegArray = []
        let vegArray = []
        const querySnapshot1 = await getDocs(collection(db, "Products",Data,"nonveg"));
        const querySnapshot2 = await getDocs(collection(db, "Products",Data,"veg"));
            querySnapshot1.forEach((doc) => {
                // console.log(doc.data());
                nonvegArray = nonvegArray.concat(doc.data())
            });
            querySnapshot2.forEach((doc) => {
                // console.log(doc.data());
                vegArray = vegArray.concat(doc.data())
            });
            // console.log(nonvegArray)
            // console.log(vegArray)
            setNonvegArray(nonvegArray)
            setVegArray(vegArray)
    }


    const AddToCart = async(name,productType,catagory,price,desc, img1) => {
        const d = new Date();
        let time = d.getTime();
        const CartId = time.toString().slice(-5)
        const Arr = {
            name : name ,
            productType : productType,
            catagory : catagory,
            price : price,
            desc : desc,
            img1 : img1,  
            Addons : OrderAddonArray ,
            quantity : 1,
            cartId: CartId
        }
        const UserCart = doc(db, "Users", auth.currentUser.email)
        await updateDoc(UserCart, {
            cart: arrayUnion(Arr)
        });
        window.location.reload()
    }

    const OrderAddonArraySet = (name,price) => {
        let SelectedAddOn = {
            name:name,
            price:price
        }
        const positions = OrderAddonArray.findIndex(item => item.name == name)
        if (positions == -1) {
            OrderAddonArray.push(SelectedAddOn)
            console.log(OrderAddonArray)
            setFinalPrice(newprice => Number(newprice)+Number(price))
        } else {
            OrderAddonArray.splice(positions,1)
            console.log(OrderAddonArray)
            setFinalPrice(newprice => Number(newprice)-Number(price))
        }
    }



  if (NonvegArray != ['']) {
    return (
        <div className='wholeContainerMenu' >
            <div className='VegNonvegSection'>
                <div style={{display:'flex', flexDirection:'row'}} >
                    <p className='MenuCaptions' >Non-Veg</p>
                    <FaRegStopCircle className='MenuCaptions' style={{alignSelf:'center'}} color='#f00' />
                </div>
                <div className='MenuItemShowBox' >
                    {
                        NonvegArray.map((item) => {
                            return(
                                <div className='MenuItemBox' key={item.name} >
                                    <div className='MenuItemBoxDescPart'>
                                        <p> .</p>
                                        <p className='MenuName' style={{color:'#000'}}>{item.name}</p>
                                        <p className='Menuprice' style={{color:'#000'}}>₹{item.price}</p>
                                        <p> .</p>
                                        <p className='MenuDesc' style={{color:'#000'}}>{item.desc}</p>
                                    </div>
                                    <div className='MenuItemBoxImgPart'>
                                        <div className='MenuImageStyling'  style={{backgroundImage:`url(${item.img1})`, backgroundSize:'cover'}} >
                                            <div className='MenuAddCart' 
                                            onClick={() => {
                                                    setImg1(item.img1)
                                                    setName(item.name)
                                                    setDesc(item.desc)
                                                    setPrice(item.price)
                                                    setCatagory(item.catagory)
                                                    setProductType(item.productType)
                                                    setAddonArray(item.addonArray)
                                                    setMenuModal('flex')
                                                }} >
                                                <div style={{display:'flex', flexDirection:'row'}} >
                                                    <p className='AddCartText' >Cart</p>
                                                    <IoIosAddCircleOutline className='AddCartText' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='VegNonvegSection'>
                <div style={{display:'flex', flexDirection:'row'}} >
                    <p className='MenuCaptions' >Veg</p>
                    <FaRegStopCircle className='MenuCaptions' style={{alignSelf:'center'}} color='#0f0' />
                </div>
                <div className='MenuItemShowBox' >
                    {
                        VegArray.map((item) => {
                            return(
                                <div className='MenuItemBox' key={item.name} >
                                    <div className='MenuItemBoxDescPart'>
                                        <p> .</p>
                                        <p className='MenuName' style={{color:'#000'}}>{item.name}</p>
                                        <p className='Menuprice' style={{color:'#000'}}>₹{item.price}</p>
                                        <p> .</p>
                                        <p className='MenuDesc' style={{color:'#000'}}>{item.desc}</p>
                                    </div>
                                    <div className='MenuItemBoxImgPart'>
                                        <div className='MenuImageStyling'  style={{backgroundImage:`url(${item.img1})`, backgroundSize:'cover'}} >
                                            <div className='MenuAddCart' 
                                            onClick={() => {
                                                    setImg1(item.img1)
                                                    setName(item.name)
                                                    setDesc(item.desc)
                                                    setPrice(item.price)
                                                    setCatagory(item.catagory)
                                                    setProductType(item.productType)
                                                    setAddonArray(item.addonArray)
                                                    setMenuModal('flex')
                                                }} >
                                                <div style={{display:'flex', flexDirection:'row'}} >
                                                    <p className='AddCartText' >Cart</p>
                                                    <IoIosAddCircleOutline className='AddCartText' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='AddToCartMenuModal' style={{display: MenuModal , height:window.innerHeight}}>
                <div className='MenuModalWholeCard' >
                    <div className='MenuModalItemPart' >
                        <div className='ModalItem' >
                            <img src={Img1} className='ModalImage' />
                            <div className='ModalProductDesc' >
                                <div>
                                  <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <p className='CartItemName' style={{color:'#FFF',marginRight:10}} >{Name}</p>
                                    <FaCaretSquareUp color={Catagory == 'veg'? '#00bd39' : '#ad0000'} size={25} />
                                  </div>
                                  <p className='CartItemPrice' style={{color:'#FFF'}}>₹ {Price}</p>
                                </div>
                                <p className='CartItemDesc' style={{color:'#FFF'}}>{Desc}</p>
                            </div>
                        </div>
                    </div>
                    <div className='MenuModalAddtoCart' >
                        <div className='MenuModalCancel' onClick={() => {
                            setMenuModal('none')
                            setOrderAddonArray([])
                            setFinalPrice('')
                            }} >
                            <p className='CancelButton' >Cancel</p>
                        </div>
                        <div className='MenuAddToCart' onClick={() => {setFinalPrice(Price) ; setAddOnModal('flex')}} >
                            <p className='AddtoCartButton' >Add to Cart</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='AddToCartMenuModal' style={{display: AddOnModal , height:window.innerHeight}}>
              <div className='MenuModalWholeCard2' >
                <div className='MenuModalItemPart' >
                    {
                        AddonArray.map((item) => {
                            return(
                                <div className={OrderAddonArray.findIndex(data => data.name == item.name) == -1 ? 'AddonBoxMenu' : 'AddonBoxMenuSelected'} key={item.name}  
                                onClick={() => {
                                    setAddonName(item.name)
                                    setAddonPrice(item.price)
                                    setAddonImg(item.img1)
                                    setAddonCatagory(item.catagory)
                                    setLastSelectionModal('flex')
                                }} >
                                    <img src={item.img1} className='AddonImageMenu' />
                                    <p className='addonButtonText'>{item.name}</p>
                                    <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}} >
                                        <FaCaretSquareUp color={ item.catagory == 'veg' ? '#00bd39' : '#ad0000'} size={18} />
                                        <p className='addonButtonText'>₹{item.price}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='MenuModalAddtoCart' >
                    <div className='MenuModalCancel' onClick={() => {setAddOnModal('none') ; setAddonName('') ; setAddonPrice('') ;Data=ProductType; window.location.reload()}} >
                        <p className='CancelButton' >Cancel</p>
                    </div>
                    <div className='MenuAddToCart' onClick={() => { AddToCart(Name,ProductType,Catagory,FinalPrice,Desc, Img1) }} >
                        <p className='AddtoCartButton' >Add to Cart</p>
                        <p className='AddtoCartButton' >₹{FinalPrice}</p>
                    </div>
                </div>
              </div>
            </div>

            <div className='AddToCartMenuModal' style={{display: LastSelectionModal , height:window.innerHeight}}>
                <div className='MenuModalWholeCard' >
                    <div className='MenuModalItemPart' style={{justifyContent:'center', alignItems:'center'}} >
                        <div >
                            <img src={AddonImg} className='AddonImageMenu' />
                            <p className='addonButtonText'>{Name}</p>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}} >
                                <FaCaretSquareUp color={ AddonCatagory == 'veg' ? '#00bd39' : '#ad0000'} size={18} />
                                <p className='addonButtonText'>₹{AddonPrice}</p>
                            </div>
                        </div>
                    </div>
                    <div className='MenuModalAddtoCart' >
                        <div className='MenuModalCancel' onClick={() => {
                            setLastSelectionModal('none')
                            }} >
                            <p className='CancelButton' >Cancel</p>
                        </div>
                        <div className='MenuAddToCart' onClick={() => { OrderAddonArraySet(AddonName,AddonPrice) ; setLastSelectionModal('none') }} >
                            <p className='AddtoCartButton' >
                                {
                                    OrderAddonArray.findIndex(data => data.name == AddonName) == -1 ? 'Select' : 'Deselect'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      )
  } else {
    console.log("There might be a problem of data fetching")
  }
}



//AddToCart(Name,ProductType,Catagory,Price,Desc, Img1)