import React , {useState} from 'react'
import { Button, Input } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { db } from './firebase'
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function AccountSetupPage() {

    const[Name,setName] = useState('')
    const[Address,setAddress] = useState('')
    const[PhoneNo,setPhoneNo] = useState('')
    const[PhotoDP,setPhotoDP] = useState('')
    const[AddressPetName,setAddressPetName] = useState('')


    const location = useLocation()
    console.log(location.state)
    const navigate = useNavigate()


    const AddCustomerData = async(Email) => {
        const Add = [{petname : AddressPetName, loc : Address }]
        await setDoc(doc(db, "Users", Email ), {
                name: Name,
                address: Add,
                phone: PhoneNo,
                email: Email,
                cart:[''],
                orders:['']
              }).then(() => {
                navigate('/')
                window.location.reload()
              }).catch((er) => {
                console.log(er)
              })
    }


    return (
        <div className='LoginPageWhole' >
          <p className='Captions' >Account Details</p>
          <div className='UserDetailsCredentials' >
            <Input className='inputs' placeholder="Enter your Name" onChange={(txt) => { setName(txt.target.value) }} />
            <Input className='inputs' defaultValue={location.state.email} contentEditable = 'false' />
            <Input className='inputs' placeholder="Enter your Phone No." onChange={(txt) => { setPhoneNo(txt.target.value) }} />
            <Input className='inputs' placeholder="Enter your Delivery Address" onChange={(txt) => { setAddress(txt.target.value) }} />
            <Input className='inputs' placeholder="your address petname" onChange={(txt) => { setAddressPetName(txt.target.value) }} />
            <Button className='LoginSubmitButton' onClick={() => {AddCustomerData(location.state.email)}} >
              <p>Proceed</p>
            </Button>
          </div>
        </div>
      )
}
