import React, { Fragment, useState } from 'react'
import "./Header.css"
import { SpeedDial, SpeedDialAction } from '@mui/material';
import {Backdrop} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch } from 'react-redux';

const UserOptions = ({user}) => {

    const [open, setOpen] = useState(false)
    const alert = useAlert()
    const dispatch = useDispatch()

    const options =[
        {icon: <ListAltIcon/>, name: "Orders", func: orders},
        {icon: <PersonIcon/>, name: "Profile", func: account},
        {icon: <ExitToAppIcon/>, name: "Logout", func: logoutUser}
    ]

    if (user.role === "admin"){
        options.unshift({icon: <DashboardIcon/>, name: "Dashboard", func: dashboard})
    }

    const navigate = useNavigate()
    function dashboard(){
        navigate("/dashboard")
    }
    function orders(){
        navigate("/orders")
    }
    function account(){
        navigate("/account")
    }
    function logoutUser(){
        dispatch(logout())
        alert.success("Logged Out Successfully")
    }

  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:"5"}}/>
        <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            onClose={()=>setOpen(false)}
            onOpen={()=>setOpen(true)}
            style={{zIndex:"10"}}
            open={open}
            direction="down"
            className='speedDial'
            icon={<img
                className='speedDialIcon'
                src={user.avatar.url ? user.avatar.url : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="}
                alt="Profile"
            />}
        >
            {options.map((item)=>(
                <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
            ))}
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions