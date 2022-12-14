import { Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";

const Dashboard = () => {
  const { user, loading } = useSelector((state) => state.user);

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <Fragment>
      {loading === undefined || loading ? (
        <Loader />
      ) : (
        <Fragment>
          {user.role !== "admin" ? (
            <Navigate to="/login" />
          ) : (
            <div className="dashboard">
              <Sidebar />
              <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                  <div>
                    <p>
                      Total Amount <br /> ???{totalAmount}
                    </p>
                  </div>
                  <div className="dashboardSummaryBox2">
                    <Link to="/admin/products">
                      <p>Product</p>
                      <p>{products && products.length}</p>
                    </Link>
                    <Link to="/admin/orders">
                      <p>Orders</p>
                      <p>{orders && orders.length}</p>
                    </Link>
                    <Link to="/admin/users">
                      <p>Users</p>
                      <p>{users && users.length}</p>
                    </Link>
                  </div>
                </div>

                <div className="lineChart">
                  <Line data={lineState} />
                </div>

                <div className="doughnutChart">
                  <Doughnut data={doughnutState} />
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
