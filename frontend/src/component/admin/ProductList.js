import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import Loader from '../layout/loader/Loader'
import "./ProductList.css"
import { DataGrid } from '@material-ui/data-grid'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { clearErrors, getAdminProduct } from '../../actions/productAction'

const ProductList = () => {

    const {user, loading} = useSelector(state=> state.user)

    const dispatch = useDispatch()
    const alert = useAlert()
    const {error, products} = useSelector(state=> state.products)

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getAdminProduct())
    },[dispatch, error, alert])

    const columns = [
        { field:"id" , headerName:"Product ID" , minWidth:200 , flex:0.5},
        { field:"name" , headerName:"Name" , minWidth:350 , flex:1},
        { field:"stock" , headerName:"Stock" , type:"number" , minWidth:150 , flex:0.3},
        { field:"price" , headerName:"Price" , type:"number" , minWidth:270 , flex:0.5},
        { field:"actions" , headerName:"Actions" , type:"number" , minWidth:150 , flex:0.3 , 
            sortable:false, renderCell:(params)=>{
                return(
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon/>
                        </Link>
                        <Button>
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                )
            }}
    ]

    const rows = []

    products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name
        })
    })

  return (
    <Fragment>
        {(loading === undefined || loading) ? <Loader/> : (
            <Fragment>
            {user.role!=="admin"? (<Navigate to="/login"/>) : (
                <Fragment>
                    <MetaData title="ALL PRODUCTS - Admin"/>
                    <div className='dashboard'>
                        <Sidebar/>
                        <div className='productListContainer'>
                            <h1 id='productListHeading'>ALL PRODUCTS</h1>

                            <DataGrid
                             rows={rows}
                             columns={columns}
                             pageSize={10}
                             disableSelectionOnClick
                             className='productListTable'
                             autoHeight
                            />
                        </div>
                    </div>
                </Fragment>
            )}
            </Fragment>
        )}
    </Fragment>
  )
}

export default ProductList



{/* <Fragment>
        {(loading === undefined || loading) ? <Loader/> : (
            <Fragment>
            {user.role!=="admin"? (<Navigate to="/login"/>) : (
                <div></div>
            )}
            </Fragment>
        )}
    </Fragment> */}