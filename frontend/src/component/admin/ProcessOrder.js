import { Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import Loader from "../layout/loader/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./ProcessOrder.css";

const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    if (isUpdated) {
      alert.success("Order Status Updated Successfully");
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, alert, id, updateError, isUpdated]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  return (
    <Fragment>
      {loading === undefined || loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Process Order`} />
          <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
              <div
                className="confirmOrderPage"
                style={{
                  display: order.orderStatus === "Delivered" ? "block" : "grid",
                }}
              >
                <div>
                  <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p>Name:</p>
                        <span>{order.user && order.user.name}</span>
                      </div>
                      <div>
                        <p>Phone:</p>
                        <span>
                          {order.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                      </div>
                      <div>
                        <p>Address:</p>
                        <span>
                          {order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, 
                                    ${order.shippingInfo.state}, ${order.shippingInfo.pinCode},
                                    ${order.shippingInfo.country}`}
                        </span>
                      </div>
                    </div>

                    <Typography>Payment</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p
                          className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID "}
                        </p>
                      </div>

                      <div>
                        <p>Amount:</p>
                        <span>₹{order.totalPrice && order.totalPrice}</span>
                      </div>
                    </div>

                    <Typography>Order Status</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p
                          className={
                            order.orderStatus &&
                            order.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.orderStatus && order.orderStatus}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="confirmCartItems">
                    <Typography>Order Items</Typography>
                    <div className="confirmCartItemsContainer">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div key={item.product}>
                            <img src={item.image} alt="Product" />
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>{" "}
                            <span>
                              {item.quantity} X {item.price} ={" "}
                              <b>₹{item.quantity * item.price}</b>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display:
                      order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                >
                  <form
                    className="updateOrderForm"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h1>Process Order</h1>
                    <div>
                      <AccountTreeIcon />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose Category</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>
                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Update
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProcessOrder;
