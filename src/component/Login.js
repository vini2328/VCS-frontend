import React, { useState } from 'react'
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from "axios";
import  { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'




        

function Login() {
    const [checked1,setChecked1] = useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate();

    const toast = useRef(null);

    const showSuccess = () => {
      toast.current.show({severity:'success', summary: 'Success', detail:'LoggedIn Successfully !!', life: 3000});
  }

  const showError = () => {
    toast.current.show({severity:'error', summary: 'Error', detail:'Email ID and Password doesnt match', life: 3000});
  }

  const redir=()=>{
    navigate('/Signup')
  }




    const handleSubmit= async()=> {
        


        // try {
          let datas = {
            "email":email,
            "password":password,
          }
          if(datas.email && datas.password !== '' ){
            let result= await axios.post(`https://vcs-backend.onrender.com/api/user/login`,datas)
            console.log(result.data.status)
            if(result.data.status === "success"){
                showSuccess()
                Cookies.set('username',datas.email)
                setTimeout(() => {
                    navigate('/DashBoard')
                  }, 500);
          
  
            }else{
                showError()
 
            }
          }
    
        // } catch (error) {
        //   console.log('err',error)
        // }
     
    
    
      };
    
    
  return (
<div className='vini'>
<Toast ref={toast} />
<div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <div className="text-center mb-5">
        <img src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png" alt="img" height={50} className="mb-3" />
        <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span className="text-600 font-medium line-height-3">Don't have an account?</span>
        <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" onClick={redir}>Create today!</a>
    </div>

    <div className='justify-content-center'>
        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
        <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" value={email} onChange={(e)=>setEmail(e.target.value)} />

        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
        <InputText type="password" placeholder="Password" className="w-full mb-3" value={password} onChange={(e)=>setPassword(e.target.value)} />

        <div className="flex align-items-center justify-content-between mb-6">
            <div className="flex align-items-center">
                <Checkbox id="rememberme" className="mr-2" checked={checked1} onChange={(e) => setChecked1(e.checked)} />
                <label htmlFor="rememberme">Remember me</label>
            </div>
        </div>

        <Button label="Login"  onClick={handleSubmit} icon="pi pi-user" className="w-full" />
    </div>
</div> 
</div> 
)
}

export default Login