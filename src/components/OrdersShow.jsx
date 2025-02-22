import React ,{ useState, useEffect } from 'react'
import { db } from './firebase';
import { doc,getDoc } from 'firebase/firestore';
import { HiOutlineLightBulb } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';



export default function OrdersShow() {


  const[OrderedList,setOrderedList] = useState([])
  const[MenuModal,setMenuModal] = useState('none')
  const AuthEmail = useSelector((state) => state.authenticationData.email)

  useEffect(() => {
    getData(AuthEmail);
  },[])


  const getData = async(X) => {
    const Ref = doc(db,'Users',X)
    const docSnap = await getDoc(Ref)
    setOrderedList(docSnap.data().orders)
    console.log(docSnap.data().orders)
  }

  if (OrderedList.length > 0) {
    return (
      <div className='CartPageWhole' style={{height:(window.innerHeight)*80/100, backgroundColor:'#F1F3F6'}} >

          <div className='CartTotalProcessWhole' >
              
          </div>

          <div className='CartItemShowWhole' >
              {
                OrderedList.map((item) => {
                  const OrderName = item.orderItems.reduce((sum,item) => sum +' | '+ item.name , '')
                  const TotalItem = item.orderItems.reduce((sum,item) => sum + Number(item.quantity),0)
                  {/* console.log(OrderName) */}
                  {/* console.log(TotalItem) */}
                  return(
                    <div className='CartEachitemSpace' key={item.orderId}>
                      <div className='OrdersImgContainer'>
                        <img src={item.orderItems[0].img1} style={{height:'80%', borderRadius:10, }} />
                        <div style={{display:'flex', flexDirection:'column', height:'100%', justifyContent:'space-around', overflow:'hidden'}} >
                          <div style={{display:'flex', flexDirection:'column'}} >
                            <p className='CartItemName' >{OrderName}</p>
                            <p className='OrderedItemPrice'>₹ {item.totalBill}</p>
                            <p className='OrderedItemTime'> {item.orderTime}, {item.orderDate}</p>
                          </div>
                        </div>
                      </div> 
                      
                       <div className='OrderStatusView'>
                         <button className='CartDeleteButton' onClick={()=>{}} >
                           <HiOutlineLightBulb color='#FFFFFF' size={30} />
                         </button>
                         <div className='OrderPendingView' >
                          <p className='CartItemDesc' >No. of Item : {TotalItem}</p>
                          <p className='CartItemDesc' >Order Status : pending</p>
                         </div>
                      </div>
                    </div>
                  )
                })
              }
          </div>

            

            <div className='cartTotalSummary' style={{height:(window.innerHeight)*10/100}} onClick={() => {}} >
              <div className='CartSummarybox' >
                <p className='CartProceedTotal' >Proceed&nbsp;</p>
                <p className='CartProceedTotal' >₹</p>
              </div>
            </div>

             {/* Modal */}
            <div className='AddToCartMenuModal' style={{display: 'none' , height:window.innerHeight}}>
                <div className='MenuModalWholeCard' >
                    <div className='MenuModalItemPart' >
                        <div className='CartProceedtoBuyBox' >
                        <p className='Captions' style={{color:'#FFF'}} >Confirm Order !</p>
                            <p className='CatagoryCaptions' style={{color:'#FFF'}} >Please pay ₹ </p>
                        </div>
                    </div>
                    <div className='MenuModalAddtoCart' >
                        <div className='MenuModalCancel' onClick={() => {}} >
                            <p className='CancelButton' >Cancel</p>
                        </div>
                        <div className='MenuAddToCart' onClick={() => {}} >
                            <p className='AddtoCartButton' >Confirm</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
      </div>
    )
  } else {
    // console.log("Something Not good here")
  }

    
}
