import React, { useEffect ,useState,useRef} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';
import { OverlayPanel } from "primereact/overlaypanel";
import { Dialog } from 'primereact/dialog';
import Typography from "@mui/material/Typography";












function SaveRepo() {


  const [name, setName] = useState("");
  const[repositary,setRepositary]=useState("")
  const[code,setCode]=useState("")
  const[commitmsg,setCommitmsg]=useState("")
  const[newcommitmsg,setnewCommitmsg]=useState("")
  const[ownedby,setOwnedby]=useState("")
  const navigate = useNavigate();
  const op = useRef(null);

  const [visible, setVisible] = useState(false);



  const toast = useRef(null);
  const redir = () => {
    Cookies.remove("username");
    navigate("/login");
  };


  const showError = () => {
    toast.current.show({severity:'error', summary: 'Error', detail:'Fields cannot be empty', life: 3000});
  }

  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Success', detail:'Deleted Successfully !!', life: 3000});
}

  


  let id
  useEffect(()=>{
    let cook = Cookies.get("username");
    setName(cook);

   id= Cookies.get("id")
   let data = {'id':id}
   axios.post("http://localhost:8000/repo/seeRepo",data)
   .then((res)=>{
    let result=res.data.result
    setRepositary(result.repositaryName)
    setCode(result.code)
    setCommitmsg(result.commit_msg)
    setOwnedby(result.ownedby)
   })
   .catch((err)=>{
    console.log(err)
   })

    

  },[])

  const SubmitChanges= async()=>{
    try {
      if(newcommitmsg==='' || code ===''){
        throw('Error')
 
      }
      id= Cookies.get("id")

    let data={
    
      "id":id,
      "repositaryName": repositary,
      "code": code,
      "commit_msg": newcommitmsg
  
          

    }
     let res=await axios.put("http://localhost:8000/repo/update",data)  
     navigate(0)
     
      
    } catch (error) {
      console.log(error)
      showError()
      
      
    }

  }

  const handleDelete = async()=>{
    try {
      id= Cookies.get("id")

      let data1={
      
        "id":id
    
  
      }

       let res1 = await axios.post("http://localhost:8000/repo/delete", data1) 
       console.log(res1)
       showSuccess()
       setTimeout(() => {
           navigate('/DashBoard')
         }, 500);

  
      
    } catch (error) {
      console.log(error)

      
    }


  }

  const Clicked =()=>{
    navigate('/DashBoard')
  }
  



  return (
    <div >
    <Toast ref={toast} />

    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar className="vini1">
          <img
            onClick={Clicked}
            className="point"

            src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"
            alt="img"
            height={50}
          />
              <Typography
              className='set'
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            > Vini's Version Control System
            </Typography>

          <div className=" card flex justify-content-center">
            <i className="pi pi-user" style={{ fontSize: '1.rem' }}> 
            <button
                className="butt"
                type="button"
                onClick={(e) => op.current.toggle(e)}
              >
                {name}
              </button>
              <OverlayPanel ref={op}>
                <div className="cursor" onClick={redir}>
                  Logout
                </div>
              </OverlayPanel>
</i>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
    <div>
      <div className="card flex justify-content-center">
        <div className="flex flex-column gap-2">
          <div className='deletebx'>
          <h2 >Your Repositary</h2>
          <Button  severity="danger" text raised className="dangerbutt" disabled={name === ownedby ? false : true}
           onClick={() => setVisible(true)}>Delete this Repositary</Button>
          <Dialog className='putcenter' header="Are you sure?" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)} >
          <Button className='my-4 putcenter'label="Yes, Delete" onClick={handleDelete} severity="danger" />

            </Dialog>
          </div>
          <div className="line"></div>


          <label htmlFor="username">Repositary name</label>
          <InputText
            className="reponame"
            id="repositaryname"
            aria-describedby="username-help"
            value={repositary}
            // onChange={e => setRepositary(e.target.value)}
            disabled
          />
          <label htmlFor="description" className='editcode'><p>You can read or update the code here if this is your repositary...</p></label>

          <span className=" my-10">
            <InputTextarea
              className="saverepotextbox"
              id="code"
              value={code}
              onChange={e => setCode(e.target.value)}
              rows={12}
              cols={80}
              disabled={name === ownedby ? false : true}
            />
          </span>
          <label htmlFor="username">Old Commit Message </label>

          <InputText
            className="oldcomit"
            id="commit_msg"
            aria-describedby="username-help"
            value={commitmsg}
            disabled
          />
        <label htmlFor="newcommit">Enter New Commit Message </label>

        <InputText
          className="newcomit"
          id="newcommit"
          aria-describedby="username-help"
          value={newcommitmsg}
          onChange={e => setnewCommitmsg(e.target.value)}
          disabled={name === ownedby ? false : true}
        />


         <Button className='savebut' label="Save"   disabled={name === ownedby ? false : true}  
 onClick={SubmitChanges} severity="success" />


          
          </div>
          </div>
          </div>
          </div>

  )
}

export default SaveRepo