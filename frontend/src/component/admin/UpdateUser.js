import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { Button } from "@material-ui/core";
import { useAlert } from "react-alert";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../actions/userAction";

const UpdateUser = () => {
  const { user: adminUser, loading: userLoading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, id]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  };

  return (
    <Fragment>
      {userLoading === undefined || userLoading ? (
        <Loader />
      ) : (
        <Fragment>
          {adminUser.role !== "admin" ? (
            <Navigate to="/login" />
          ) : (
            <Fragment>
              <MetaData title={`Update user`} />
              <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                  {loading === undefined || loading ? (
                    <Loader />
                  ) : (
                    <form
                      className="createProductForm"
                      onSubmit={updateUserSubmitHandler}
                    >
                      <h1>Update User</h1>
                      <div>
                        <PersonIcon />
                        <input
                          type="text"
                          placeholder="Name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <MailOutlineIcon />
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <VerifiedUserIcon />
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="">Choose Role</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </div>

                      <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={
                          updateLoading
                            ? true
                            : false || role === ""
                            ? true
                            : false
                        }
                      >
                        Update
                      </Button>
                    </form>
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

export default UpdateUser;
