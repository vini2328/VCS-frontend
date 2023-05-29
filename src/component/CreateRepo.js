import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRef } from "react";
import { InputText } from "primereact/inputtext";
import "../App.css";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';
import { OverlayPanel } from "primereact/overlaypanel";
import Typography from "@mui/material/Typography";









function CreateRepo() {

  const [name, setName] = useState("");
  const navigate = useNavigate();

  const redir = () => {
    Cookies.remove("username");
    navigate("/login");
  };



  const[repodetail,setRepodetail]=useState({repositaryName:"", code:"", commit_msg:"",ownedby:""})
  const op = useRef(null);
  useEffect(() => {
    let cook = Cookies.get("username");
    setName(cook);

  });

  const [visible, setVisible] = useState(false);

  const toast = useRef(null);


  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Success', detail:'Repositarty Created Successfully !!', life: 3000});
}

const showError = () => {
  toast.current.show({severity:'error', summary: 'Error', detail:'Please fill required details', life: 3000});
}

const setIt=()=>{
      setVisible(true)
      setRepodetail({...repodetail , ownedby:name})

}


  const HandleRepo = async()=>{
    try {
            let result= await axios.post(`http://localhost:8000/repo/createRepo`,repodetail)
            console.log(result)
            if(result.data.status === 200){
                showSuccess()
                setTimeout(() => {
                  navigate('/DashBoard')
                }, 500);

 
            }else{
                showError()

            }
            
    
        
    
        
    } catch (error) {
      console.log(error)
        
    }


}
const Clicked =()=>{
  navigate('/DashBoard')
}


  return (
    <div >
      <Box sx={{ flexGrow: 1}}>
      <Toast ref={toast} />

        <AppBar position="static">
          <Toolbar className="vini1">
            <img
              className="point"
              onClick={Clicked}
              src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"
              alt="img"
              height={50}
            />
            <Typography
            className="set"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            > Vini's Version Control System
            </Typography>




            <div className=" card flex justify-content-center">
              <i className="pi pi-user" style={{ fontSize: '1.3rem' }}></i>
              <button
                className="butt"
                type="button"
                onClick={(e) => op.current.toggle(e)}
              >{name}
              <OverlayPanel ref={op}>
                <div className="cursor" onClick={redir}>
                  Logout
                </div>
              </OverlayPanel>

              </button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="m">
        <div className="card flex justify-content-center">
          <div className="flex flex-column gap-2">
            <h2 className="">Create a new repositary</h2>
            <p>
              A repository contains all project files, including the revision
              history. Already have a project repository elsewhere?
            </p>
            <div className="line"></div>

            <label htmlFor="username">Repositary name * </label>
            <InputText
              className="inputlen"
              id="repositaryname"
              aria-describedby="username-help"
              value={repodetail.repositaryname}
              onChange={e => setRepodetail({...repodetail , repositaryName:e.target.value})}
            />
            <p id="username-help" className="my-4">
              Great repository names are short and memorable. Need inspiration?
              How about potential-waffle?
            </p>

            <span className="p-float-label">
              <InputTextarea
                className="codebox"
                id="code"
                value={repodetail.code}
                onChange={e => setRepodetail({...repodetail , code:e.target.value})}
                rows={10}
                cols={60}
              />
              <label htmlFor="description">Add your code here...</label>
            </span>
            <div className="card flex justify-content-center viniset">
              <Button
                className="createbutton"
                label="Create"
                icon="pi pi-external-link"
                severity="success" text raised
                onClick={setIt}
              />
              <Dialog
                header="Confirmation"
                visible={visible}
                style={{ width: "30vw" ,height:"250px",textAlign:"center" }}
                onHide={() => setVisible(false)}
              >
                <label className='my-1'htmlFor="commit_msg">Enter commit message here</label>
                <InputText className='dialogbx my-2 mx-8'id="commit_msg" aria-describedby="username-help" value={repodetail.commit_msg}
                 onChange={e => setRepodetail({...repodetail , commit_msg:e.target.value})}

                  />
                <Button className='my-2 submitbut'label="Submit" onClick={HandleRepo}  severity="success" text raised
 />
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRepo;
