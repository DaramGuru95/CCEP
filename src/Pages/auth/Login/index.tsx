// import { connect } from "react-redux";
// import { doPOST } from "../../../Helpers/apiHelper";
// import APIConstants, { API_URL_V4 } from "../../../Constants/apiConstants";
import TrusttLogo from "../../../assets/logo/trustt-logo.svg";
import UserIcon from "../../../assets/icons/user.svg";
import PasswordIcon from "../../../assets/icons/password.svg";
import { useEffect, useState } from "react";
// import {
//   getLocalStorage,
//   setLocalStorage,
// } from "../../../Helpers/commonHelper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../Config/Store";
import { useSelector } from "react-redux";
import { login } from "../../../Config/Store/Slices/actions/auth/login.actions";
import { showAlert } from "../../../Config/Store/Slices/reducers/alerts";
import { Typography } from "@mui/material";
import { resetWarnMessage } from "../../../Config/Store/Slices/reducers/appState";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, status, message } = useSelector(
    (state: RootState) => state.appState
  );

  console.log(isAuthenticated, status, message, "isAuthenticated");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (message !== "") {
      dispatch(resetWarnMessage());
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const { username, password } = formData;
    dispatch(login({ username, password }));
    if (!isAuthenticated && message !== "") {
      dispatch(showAlert({ message, status: "error" }));
    }
  };

  // useEffect(() => {
  //   if (!isAuthenticated ) {
  //     dispatch(showAlert({ message:"An Error Occured!", status: "error" }));
  //   }
  // }, [dispatch, isAuthenticated, message]);

  return (
    <div className=" h-460 mt-10 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 flex items-center bg-white rounded-lg    justify-center">
      <form className="	w-11/12">
        <div className="relative mb-6" data-te-input-wrapper-init>
          <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
            <img
              src={TrusttLogo}
              width={10}
              height={10}
              className="inline-block h-6 w-6 rounded mr-1 ring-2 ring-white"
              alt="logo"
            />
            Trustt
          </p>
        </div>
        <div style={{ display: "flex", gap: 5, flexDirection: "column" }}>
          <h1
            style={{ fontWeight: "bold", color: "#001e27", paddingBottom: 3 }}
          >
            Conversational Customer Engagement <br />
            Platform
          </h1>
          <Typography
            variant="subtitle1"
            style={{
              fontSize: "0.9rem",
              color: "#001e27",
              paddingBottom: 8,
            }}
          >
            Sign In
          </Typography>
        </div>

        <div className="relative mb-6" data-te-input-wrapper-init>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <img src={UserIcon} className="rounded" alt="" />
          </span>
          <input
            type="text"
            className="peer pl-10 text-xs block min-h-[auto] w-full rounded border-1 ring-1 ring-slate-300 px-3 py-[0.32rem] leading-[2.15]  transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 "
            placeholder="User Name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ height: 40 }}
          />
        </div>

        <div className="relative mb-6" data-te-input-wrapper-init>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <img src={PasswordIcon} className="rounded" alt="" />
          </span>
          <input
            type="password"
            className="peer pl-10 text-xs block min-h-[auto] w-full rounded border-1 ring-1 ring-slate-300 px-3 py-[0.32rem] leading-[2.15]  transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 "
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ height: 40 }}
          />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative top-1 -ml-[1.5rem] mr-[6px] h-[1.125rem] w-[1.125rem]  rounded-[0.25rem]  border-solid "
              type="checkbox"
              value=""
              id="remember"
            />
            <label
              htmlFor="remember"
              className="inline-block pl-[0.15rem]  text-xs hover:cursor-pointer"
            >
              Remember me
            </label>
          </div>

          <p className="text-xs text-color-sky font-medium">Forgot password?</p>
        </div>

        <div className="text-center lg:text-left">
          <button
            type="button"
            onClick={handleLogin}
            className="inline-block rounded btn-color w-full  px-7 pb-2.5 pt-3 text-sm font-medium  leading-normal text-white   hover:bg-primary-600 "
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Sign in
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#6b7280",
              fontWeight: 600,
              margin: 5,
              padding: 5,
              fontSize: "12px",
            }}
          >
            <p>
              Powered by{" "}
              <span style={{ margin: 1 }}>
                <img
                  src={TrusttLogo}
                  width={10}
                  height={10}
                  className="inline-block h-6 w-6 rounded mr-1 ring-2 ring-white"
                  alt="logo"
                  color="#6b7280"
                />
              </span>{" "}
              Trustt GPT{" "}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
