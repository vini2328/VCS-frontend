import React,{useState,useRef} from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';




function SendResetEmail() {
    const navigate = useNavigate();


    const redir=()=>{
        navigate('/login')
      }


    const toast = useRef(null);


    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Invalid Email ID ', life: 3000});
      }
    
    const [resetmail,setResetmail]=useState({
        email:''
    })

    
    const handleSubmit =async()=>{
        console.log("hi",resetmail)
        try {

            let resetdata= await axios.post('https://vcs-backend.onrender.com/api/user/resetpasswordemail',resetmail)
            console.log(resetdata.data.status)
                          
            if(resetdata.data.status!=='failed'){
                let link =`${resetdata.data.info}`
                let data =window.confirm("Click on OK to reset password \n",link) 
                if(data===true){
                    window.location = link
                }
            }else{
                showError()
            }


        } catch (error) {
            console.log('errr',error)

        }
    }


  return (
    <div className='signup'>
                <Toast ref={toast} />
                <h2>SEND VERIFICATION TO RESET PASSWORD</h2>

        <div className='formit'>
       <div className='my-2'>Email </div>
            <div> <InputText value={resetmail.email} onChange={(e)=>setResetmail({...resetmail, email:e.target.value})} /></div>
            <div className='submit'><Button  onClick={handleSubmit} label="Send Verification Link" /></div>
            <div><Button className='cancel ' onClick={redir} label="Cancel" /></div>

        </div>
 
    </div>
  )
}

export default SendResetEmail