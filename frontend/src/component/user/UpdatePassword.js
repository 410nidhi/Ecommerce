import React, { useState, Fragment, useEffect } from 'react'
import "./UpdatePassword.css"
import Loader from '../layout/loader/Loader'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import { updatePassword, clearErrors} from '../../actions/userAction';
import {useAlert} from "react-alert"
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const UpdatePassword = (props) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const {error, isUpdated, loading} = useSelector((state)=>state.profile)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const updatePasswordSubmit = (e)=>{
        e.preventDefault()
        
        const myForm = new FormData()

        myForm.set("oldPassword",oldPassword)
        myForm.set("newPassword",newPassword)
        myForm.set("confirmPassword",confirmPassword)

        dispatch(updatePassword(myForm))
    }

    const navigate = useNavigate()

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isUpdated){
            alert.success("Password Changed Successfully")

            navigate("/account")

            dispatch({type: UPDATE_PASSWORD_RESET})
        }
    },[dispatch, alert, error, navigate, isUpdated])

  return (
    <Fragment>
        {loading ? <Loader/> : (
        <Fragment>
            <MetaData title="Change Password"/>
            <div className='updatePasswordContainer'>
                <div className='updatePasswordBox'>
                    <h2 className='updatePasswordHeading'>Update Profile</h2>
                    <form className='updatePasswordForm' encType="multipart/form-data" onSubmit={updatePasswordSubmit}>
                        <div className="signUpPassword">
                            <VpnKeyIcon />
                            <input
                            type="password"
                            placeholder="Old Password"
                            required
                            name='password'
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="signUpPassword">
                            <LockOpenIcon />
                            <input
                            type="password"
                            placeholder="New Password"
                            required
                            name='password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="signUpPassword">
                            <LockIcon />
                            <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            name='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <input
                        type="submit"
                        value= "Change"
                        className='updatePasswordBtn'
                        // disabled={loading ? true: false}
                        />
                    </form>
                </div>
            </div>
        </Fragment>
        )}
    </Fragment>
  )
}

export default UpdatePassword