import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Search.css"
import {useNavigate} from "react-router-dom"

const Search = (props) => {
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState("")

const searchSubmitHandler = (e) =>{
  e.preventDefault()
  if(keyword.trim()) {
    navigate(`/products/${keyword}`)
  } else {
    navigate(`/products`)
  }
}

  return (
    <div className='Search' >
          <Form className="d-flex"  >
            <Form.Control
              type="search"
              placeholder="Type to Search..."
              className="me-2"
              aria-label="Search"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button variant="outline-success" onClick={searchSubmitHandler}>Search</Button>
          </Form>
      </div>
  )
}

export default Search