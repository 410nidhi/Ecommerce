import React from 'react'
import { Link } from 'react-router-dom'
import { Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css"

const Login = () => {
  return (
    <Link className='login' to="/login">
        <div className="LoginBox">
            <Button variant="outline-dark">Login</Button>
        </div>
    </Link>
  )
}

export default Login