import React ,{ useState, useEffect } from 'react'

export default function OrdersShow() {

  
  const[MenuModal,setMenuModal] = useState('none')



  useEffect(() => {
    
  },[])

  

  

      

    return (
      <div className='CartPageWhole' style={{height:(window.innerHeight)*80/100, backgroundColor:'#F1F3F6'}} >
            <div className='CartItemShowWhole' >
              
            </div>

            <div className='CartTotalProcessWhole' >
              <div className='CartTotalProcessBox' >
                
                <div className='CartCharges' >
                          <div className='CartChargesName' >
                              <p className='CartAddonTotal' >Total</p>
                          </div>
                          <div className='CartChargesPrice' >
                              <p className='CartAddonTotal' >₹</p>
                          </div>
                          <div></div>
                      </div>
              </div>
            </div>

            <div className='cartTotalSummary' style={{height:(window.innerHeight)*10/100}} onClick={() => {setMenuModal('flex')}} >
              <div className='CartSummarybox' >
                <p className='CartProceedTotal' >Proceed&nbsp;</p>
                <p className='CartProceedTotal' >₹</p>
              </div>
            </div>

             {/* Modal */}
            <div className='AddToCartMenuModal' style={{display: MenuModal , height:window.innerHeight}}>
                <div className='MenuModalWholeCard' >
                    <div className='MenuModalItemPart' >
                        <div className='CartProceedtoBuyBox' >
                        <p className='Captions' style={{color:'#FFF'}} >Confirm Order !</p>
                            <p className='CatagoryCaptions' style={{color:'#FFF'}} >Please pay ₹ </p>
                        </div>
                    </div>
                    <div className='MenuModalAddtoCart' >
                        <div className='MenuModalCancel' onClick={() => {
                          setMenuModal('none')
                        }} >
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
}
