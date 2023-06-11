import React,{useEffect, useState,useRef} from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';




function Confrimpass() {

    const toast = useRef(null);

    const showSuccess = () => {
      toast.current.show({severity:'success', summary: 'Success', detail:'Password Changed Successfully !!', life: 3000});
  }

  const showError = () => {
    toast.current.show({severity:'error', summary: 'Error', detail:' Password  doesnt match ', life: 3000});
  }


    const navigate = useNavigate();

    const [passworddata,setPassworddata]=useState({
        password:"",
        password_confirmation:""
    })
    const [url,setURL]=useState('')

    useEffect(()=>{
        setURL(window.location.href)

    
    })

    const handlesubmit= async()=>{
        try {

            let allurl= url.split('confirmpassword')
            let data=allurl[1].split('/')
            console.log(data)

            let id=data[1]
            let token=data[2]

            if(passworddata.password && passworddata.password_confirmation !== "" && passworddata.password === passworddata.password_confirmation){
                let resetPass =await axios.post('https://vcs-backend.onrender.com/api/user/reset-password'+`/${id}/${token}`,passworddata)
                console.log(resetPass)
                showSuccess()
                setTimeout(() => {
                  navigate('/login')
                }, 3000);

            }else{
                showError()
            }
            

            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='signup'>
        <Toast ref={toast} />

    <div className='formit'>
       <div className='my-2'>Enter New Password </div>
            <div> <Password value={passworddata.password} onChange={(e)=>setPassworddata({...passworddata, password:e.target.value})} feedback={false} /></div>
        <div className='my-2'>Confrim New Password </div>
            <div> <Password value={passworddata.password_confirmation} onChange={(e)=>setPassworddata({...passworddata, password_confirmation:e.target.value})}  feedback={false}/></div>
    
            <div className='submit'><Button onClick={handlesubmit}  label="Continue" /></div>

        </div>

    </div>
  )
}

export default Confrimpass