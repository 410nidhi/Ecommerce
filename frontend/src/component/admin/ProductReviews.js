import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import "./ProductReviews.css";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import StarIcon from "@mui/icons-material/Star";
import Sidebar from "./Sidebar";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const { user: adminUser, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {
    error,
    reviews,
    loading: reviewLoading,
  } = useSelector((state) => state.productReviews);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const [productId, setProductId] = useState("");

  // id == reviewId
  const deleteReviewsHandler = (id) => {
    dispatch(deleteReviews(id, productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, alert, deleteError, navigate, isDeleted, productId]);

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReviews(productId));
  };

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewsHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      {loading === undefined || loading ? (
        <Loader />
      ) : (
        <Fragment>
          {adminUser.role !== "admin" ? (
            <Navigate to="/login" />
          ) : (
            <Fragment>
              <MetaData title="ALL REVIEWS - Admin" />
              <div className="dashboard">
                <Sidebar />
                <div className="productReviewsContainer">
                  <form
                    className="productReviewsForm"
                    onSubmit={productReviewsSubmitHandler}
                  >
                    <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
                    <div>
                      <StarIcon />
                      <input
                        type="text"
                        placeholder="Enter Product Id"
                        required
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                      />
                    </div>

                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={
                        reviewLoading
                          ? true
                          : false || productId === ""
                          ? true
                          : false
                      }
                    >
                      Search
                    </Button>
                  </form>

                  {reviews && reviews.length > 0 ? (
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      disableSelectionOnClick
                      className="productListTable"
                      autoHeight
                    />
                  ) : (
                    <h1 className="productReviewsFormHeading">
                      No Reviews Yet
                    </h1>
                  )}
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductReviews;
