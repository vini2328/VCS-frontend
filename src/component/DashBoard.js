import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import axios from "axios";
import git2 from '../asset/git2.webp'
import Cookies from 'js-cookie'
import 'primeicons/primeicons.css';


function DashBoard() {
  const [data, setData] = useState("");
  const[ownedby,setOwnedby]=useState("")

  useEffect(() => {
    axios
      .post("https://vcs-backend.onrender.com/repo/seeAllRepos")
      .then((response) => {
        setData(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const redir = () => {
    Cookies.remove("username");
    navigate("/login");
  };

  const redir3=(id)=>{
    // console.log('gfhgf',e.target)
    Cookies.set('id',id)

    navigate("/saverepo");

  }

  const Repopage = () => {
    navigate("/repopage");
  };
  const navigate = useNavigate();

  const op = useRef(null);
  const [name, setName] = useState("");
  useEffect(() => {
    let cook = Cookies.get("username");
    setName(cook);
  });
  return (
    <div className="set">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="vini1">
            <img
             src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"
              alt="img"
              height={50}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            > Vini's Version Control System
            </Typography>
            <div className=" card flex justify-content-center">
            <i className="pi pi-user" style={{ fontSize: '1.5rem' }}></i>
              <button
                className="butt"
                type="button"
                onClick={(e) => op.current.toggle(e)}
              >
                {name}
              </button>
              <OverlayPanel ref={op} >
                <div className=" m-3 cursor" onClick={redir}>
                  Logout
                </div>
                <div className="cursor m-3" onClick={()=>{navigate('/sendresetlink')}}>
                  Reset-Password
                </div>
              </OverlayPanel>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="rg">
      <Button onClick={Repopage} label="Create New Repo" severity="success" text raised className="repobutton"/>

        {data ? (
          data.map((repos) => (
            <div className="" >
         

              <div className="cards ">
                <div className="chec">
                <div>
                <img className="imgg" src={git2} />

                  </div>
                  <div>
                  <p className="color1">{repos.repositaryName}</p>                
                <p className="m-4 color1">{repos.commit_msg}</p>
                <Button onClick={()=>redir3(repos._id)} label="click" severity="success" />
                <p >Owned By-<span className="owndby"> {repos.ownedby}</span></p>
                    </div>
                  </div>
    
            
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default DashBoard;
