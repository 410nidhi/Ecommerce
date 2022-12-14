import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import Loader from '../layout/loader/Loader'
import "./Profile.css"

const Profile = (props) => {

    const {user,loading, isAuthenticated} = useSelector((state)=>state.user)
    const navigate = useNavigate()
    useEffect(()=>{
        console.log("Auth ", isAuthenticated);
        if(isAuthenticated===false){
            navigate("/login")
        }
    },[navigate, isAuthenticated])

  return (
    <Fragment>
        {/* Another way to ensure that user is loaded frist and then the function is returned (loading Undefined) */}
        {(loading === undefined || loading) || !isAuthenticated ? <Loader/> : (
            <Fragment>
            <MetaData title={`${user.name}'s Profile`} />
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src={user.avatar.url} alt={user.name} />
                    <Link to="/me/update">Edit Profile</Link>
                </div>
    
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>{String(user.createdAt).substr(0,10)}</p>
                    </div>
                    <div>
                        <Link to="/orders">My Orders</Link>
                        <Link to="/password/update">Change Password</Link>
                    </div>
                </div>
            </div>
        </Fragment>
        )}
    </Fragment>
  )
}

export default Profile