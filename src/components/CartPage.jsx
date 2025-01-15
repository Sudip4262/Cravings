import React, { useEffect, useState } from 'react'
import { db, auth } from './firebase'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion, deleteField } from 'firebase/firestore'
import { NumberInputField, NumberInputRoot } from "./ui/number-input"


import { FaCaretSquareUp } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { GrFormNextLink } from "react-icons/gr";

export default function CartPage() {

  const navigate = useNavigate()

  const[Cart,setCart] = useState([])
  const[ItemTotal,setItemTotal] = useState(0)
  const[MenuModal,setMenuModal] = useState('none')
  const[Name,setName] = useState('')
  const[AddonNames,setAddonNames] = useState('')



  let charges = [
    {
      name: 'Item Total',
      value: Number(ItemTotal)
    },
    {
      name: 'CGST',
      value: (Number(ItemTotal)*9)/100
    },
    {
      name: 'SGST',
      value: (Number(ItemTotal)*9)/100
    },
    {
      name: 'Delivery Charge',
      value: 20
    }
  ]


  useEffect(() => {
    setTimeout(() => {
                if(auth.currentUser != null){
                  getData()
                }
                console.log("Executed after 1 seconds");
              }, 1000);
  },[])

  const getData = async() => {
    const Ref = doc(db,'Users',auth.currentUser.email)
        const docSnap = await getDoc(Ref)
        if (docSnap.exists()) {
          const Data = docSnap.data()
          setCart(Data.cart)
          if( Data.cart != null ){
            const sum = Data.cart.reduce((acc, item) => Number(acc) + (Number(item.quantity)*Number(item.price)), 0);
            setItemTotal(sum)
            console.log(sum)
          }
          } else {
            console.log("No such document!");
          }
  }

  const CartItemDelete = async(name,productType,catagory,price,desc, img1,OrderAddonArray,quantity,cartId) => {
          const Arr = {
              name : name ,
              productType : productType,
              catagory : catagory,
              price : price,
              desc : desc,
              img1 : img1,
              Addons : OrderAddonArray,
              quantity:quantity,
              cartId: cartId
          }
          const UserCart = doc(db, "Users", auth.currentUser.email)
          await updateDoc(UserCart, {
              cart: arrayRemove(Arr)
          });
          window.location.reload()
      }

      const ArrayQuantityUpdate = async(value,cartId) => {
        try {
          console.log(value)
          const UserCart = doc(db, "Users", auth.currentUser.email)
          const docSnap = await getDoc(UserCart);
          if (docSnap.exists()) {
            const currentItems = docSnap.data().cart;
            const updatedItems = currentItems.map((item) => 
              item.cartId === cartId ? { ...item, quantity: value.valueAsNumber } : item
            )
            await updateDoc(UserCart, { cart: updatedItems });
          }
          window.location.reload()
        } catch (error) {
          console.log(error)
        }
    }

    const ConfirmOrder = async() => {
      const d = new Date();
      let time = d.getTime();
      const OrderId = time.toString().slice(-10)
      const UserCart = doc(db, "Users", auth.currentUser.email)
      const OrderItems = Cart.map(({ name,quantity, price,Addons }) => ({ name, quantity ,price,Addons }));
      const TotalBill = charges.reduce((sum, item) => Number(sum) + Number(item.value), 0);
      const Arr = {
        orderId : OrderId,
        orderItems : OrderItems,
        itemTotal : ItemTotal,
        totalBill: TotalBill,
      }

      await updateDoc(UserCart, {
          orders: arrayUnion(Arr)
      }).then(async() => {
        await updateDoc(UserCart, {
          cart: deleteField()
      })
        navigate('/OrdersShow')
      })
    }

  
  if (Cart != null) {
    const TotalBill = charges.reduce((sum, item) => Number(sum) + Number(item.value), 0);
    return (
      <div className='CartPageWhole' style={{height:(window.innerHeight)*80/100, backgroundColor:'#F1F3F6'}} >
            <div className='CartItemShowWhole' >
              {
                Cart.map((item) => {
                  {/* const[Quantity,setQuantity] = useState('') */}
                  return(
                        <div className='CartEachitemSpace' >
                          <div className='CartImgContainer'>
                            <img src={item.img1} style={{height:'80%', borderRadius:10, }} />
                            <div style={{display:'flex', flexDirection:'column', height:'100%', justifyContent:'space-around', overflow:'hidden'}} >
                              <div style={{display:'flex', flexDirection:'column'}} >
                                <p className='CartItemName' >{item.name}</p>
                                <p className='CartItemPrice'>₹ {Number(item.quantity)*Number(item.price)}</p>
                              </div>
                              <p className='CartItemDesc'>{item.desc}</p>
                            </div>
                          </div> 

                          <div className='CartAddonsContainer' >
                            {
                              item.Addons.map((addon) => {
                                return(
                                  <p className='CartAddonNames' >&nbsp;&nbsp; | {addon.name}  </p>
                                )
                              })
                            }
                          </div>
                          <div className='CartDeleteView'>
                            <NumberInputRoot width="70px" defaultValue={item.quantity} min={1} max={10} 
                            onValueChange={(value) => {
                              ArrayQuantityUpdate(value,item.cartId)
                            }} >
                              <NumberInputField className='CartNumberOfItem' />
                            </NumberInputRoot>

                            <button className='CartDeleteButton' onClick={()=>{CartItemDelete(item.name,item.productType,item.catagory,item.price,item.desc, item.img1,item.Addons,item.quantity,item.cartId)}} >
                              <MdDeleteOutline color='#FFF' size={30} />
                            </button>
                          </div>
                        </div>
                  )
                })
              }
            </div>

            <div className='CartTotalProcessWhole' >
              <div className='CartTotalProcessBox' >
                {
                  charges.map((item) => {
                    return(
                      <div className='CartCharges' >
                          <div className='CartChargesName' >
                              <p className='CartChargesNameText' >{item.name}</p>
                          </div>
                          <div className='CartChargesPrice' >
                              <p className='CartChargesNameText' >₹ {item.value}</p>
                          </div>
                          <div></div>
                      </div>
                    )
                  })
                }
                <div className='CartCharges' >
                          <div className='CartChargesName' >
                              <p className='CartAddonTotal' >Total</p>
                          </div>
                          <div className='CartChargesPrice' >
                              <p className='CartAddonTotal' >₹ {TotalBill.toFixed(2)}</p>
                          </div>
                          <div></div>
                      </div>
              </div>
            </div>

            <div className='cartTotalSummary' style={{height:(window.innerHeight)*10/100}} onClick={() => {setMenuModal('flex')}} >
              <div className='CartSummarybox' >
                <p className='CartProceedTotal' >Proceed&nbsp;</p>
                <p className='CartProceedTotal' >(₹ {TotalBill.toFixed(2)})</p>
                <GrFormNextLink color='#FFF' size={50} />
              </div>
            </div>

             {/* Modal */}
            <div className='AddToCartMenuModal' style={{display: MenuModal , height:window.innerHeight}}>
                <div className='MenuModalWholeCard' >
                    <div className='MenuModalItemPart' >
                        <div className='CartProceedtoBuyBox' >
                        <p className='Captions' style={{color:'#FFF'}} >Confirm Order !</p>
                            <p className='CatagoryCaptions' style={{color:'#FFF'}} >Please pay ₹ {(Number(ItemTotal)+(Number(ItemTotal)*9)/100+(Number(ItemTotal)*9)/100+20).toFixed(2)} at your Doorstep!</p>
                        </div>
                    </div>
                    <div className='MenuModalAddtoCart' >
                        <div className='MenuModalCancel' onClick={() => {
                          setMenuModal('none')
                        }} >
                            <p className='CancelButton' >Cancel</p>
                        </div>
                        <div className='MenuAddToCart' onClick={() => { ConfirmOrder() }} >
                            <p className='AddtoCartButton' >Confirm</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
      </div>
    )
  } else {
    console.log("Nothing added in the cart yet")
  }
}
