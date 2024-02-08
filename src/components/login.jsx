import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faDove} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useContext } from 'react';
import AppContext from '../context/context';
import { error } from 'jquery';
import { Button, Spinner } from "react-bootstrap";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

function Login() {
  const {
    port,
    reqType,
    setLogInLogUot,
    server,
    handleLogin,
    setUserRole,
    setUser,
    setAdminUserInfo,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [RepeatNewPassword, setRepeatNewPassword] = useState("");
  const [loginResponseMessage, setLoginResponseMessage] = useState();
  const [resetCode, setResetCode] = useState();
  const [display, setDisplay] = useState(1);
  const [buttonState, setButtonState] = useState(false);
  const [loading, setLoading] = useState(false);

  // loginstate
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // sendemailstate
  const [loadingE, setLoadingE] = useState(false);
  // resetpasswordstate
  const [loadingResetPass, setLoadingResetPass] = useState(false);

  function handleClick(order, e) {
    e.preventDefault();
    setDisplay(order);
  }
  async function login(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const loginData = {
        email,
        password,
      };

      console.log(loginData);

      const response = await axios.post(
        `${reqType}://${server}:${port}/api/auth/login`,
        loginData
      );
      console.log(response.data);
      localStorage.setItem("userToken", response.data.data.token);
      handleLogin();
      const role = response.data.data.role;
      setUserRole(role); //برای مشخص شدن نقش کاربر و رندر شدن پنل ادمین یا کاربر معمولی بر اساس آن
      if (role == "adminUser") {
        navigate("/");
      } else {
        navigate("/userdashboard");
      } //اگر نقش کاربر برابر با ادمین نبود برو به صفحه ی کاربری کاربر معمولی
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      setLoginResponseMessage(error.response?.data?.message);
      setLoading(false);
    }
  }

  async function resetPasswordEmail(e) {
    setLoadingE(true);
    e.preventDefault();
    try {
      const loginData = {
        email,
      };
      console.log(loginData);
      const response = await axios.put(
        `${reqType}://${server}:${port}/api/auth/resetpasswordemail`,
        loginData
      );
      console.log(response);
      setLoginResponseMessage(response?.data?.message);
      setLoadingE(false);
    } catch (error) {
      console.log(error);
      setLoginResponseMessage(error.response?.data?.message);
      setLoadingE(false);
    }
  }

  async function resetPassword(
    newPassword,
    RepeatNewPassword,
    email,
    resetCode,
    e
  ) {
    setLoadingResetPass(true);
    e.preventDefault();
    try {
      const data = {
        newPassword,
        RepeatNewPassword,
        email,
        resetCode,
      };
      console.log(data);
      const response = await axios.put(
        `${reqType}://${server}:${port}/api/auth/resetpasswor`,
        data
      );
      console.log(response);
      setLoginResponseMessage(response.data?.message);
      setDisplay(
        response.data?.message == "رمز عبور با موفقیت تغییر یافت" ? 1 : 3
      );
      setLoadingResetPass(false);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.data);
      setLoginResponseMessage(error.response?.data?.data);
      setLoadingResetPass(false);
    }
  }

  return (
    <div className="row containe justify-content-center login mx-0 pt-5">
      {/* login */}
      <div
        className="col-lg-6 pt-5"
        style={{ display: display === 1 ? "block" : "none" }}
      >
        <h3 className="m-4 text-center text-light pt-5">ورود</h3>

        <div className="form-group mx-5">
          <p className="text-center text-danger ">{loginResponseMessage}</p>
        </div>

        <form action="" className="text-muted mb-5">
          <div className="form-group mx-5 text-light">
            <label htmlFor="">ایمیل</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="login-input"
              type="text"
              className="form-control border-0 text-light"
            />
          </div>

          <div className="form-group mx-5 text-light">
            <label htmlFor="">رمز عبور</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="login-input"
              type="password"
              className="form-control border-0 text-light"
            />
          </div>

          <div className="form-group mx-5">
            <Button
              onClick={login}
              variant="success"
              className="my-3 w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    variant=""
                    role="status"
                    aria-hidden="true"
                    className="mx-2"
                    style={{
                      animationDuration: "1.5s", // زمان انیمیشن را تنظیم کنید
                      border: "0.2em solid", // نوع حاشیه را تنظیم کنید
                      borderTopColor: "transparent", // رنگ حاشیه بالا را تنظیم کنید
                    }}
                  />
                  <span className="text-light"> درانتظار ورود به سایت</span>
                </>
              ) : (
                "ورود"
              )}
            </Button>
          </div>

          <div className="text-center">
            <Link to="/register" className="text-light mx-2">
              ثبت نام
            </Link>
            <Link onClick={() => setDisplay(2)} className="text-light mx-2">
              فراموشی رمز عبور
            </Link>
          </div>
        </form>
      </div>
      {/* send email */}
      <div
        className="col-lg-6 pt-5"
        style={{ display: display === 2 ? "block" : "none" }}
      >
        <div className="text-center pt-5">
          <h3 className="my-4 text-light pt-5">
            {" "}
            ارسال ایمیل بازیابی رمز عبور
          </h3>
          <div className="form-group mx-5">
            <p className="text-center text-danger ">{loginResponseMessage}</p>
          </div>
          <form action="" className="text-muted mb-5">
            <div className="form-group mx-5 text-light">
              <label htmlFor="">ایمیل</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="login-input"
                type="text"
                className="form-control border-0 text-light"
              />
            </div>
            <div className="form-group mx-5 text-center">
              <Button
                onClick={resetPasswordEmail}
                variant="success"
                className="btn btn-success mt-4 ms-1"
                disabled={loadingE}
              >
                {loadingE ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      variant=""
                      role="status"
                      aria-hidden="true"
                      className="mx-2"
                      style={{
                        animationDuration: "1.5s", // زمان انیمیشن را تنظیم کنید
                        border: "0.2em solid", // نوع حاشیه را تنظیم کنید
                        borderTopColor: "transparent", // رنگ حاشیه بالا را تنظیم کنید
                      }}
                    />
                    <span className="text-light"> درانتظار ارسال ایمیل</span>
                  </>
                ) : (
                  "بازیابی"
                )}
              </Button>

              <button
                onClick={(e) => handleClick(1, e)}
                className="btn btn-warning mt-4 me-1"
              >
                بازگشت
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* reset password */}
      <div
        className="col-lg-6"
        style={{ display: display === 3 ? "block" : "none" }}
      >
        <div className="">
          <h3 className="m-4 text-center text-light">تعیین رمز عبور جدید</h3>
          <div className="form-group mx-5">
            <p className="text-center text-danger ">{loginResponseMessage}</p>
          </div>
          <form action="" className="text-muted mb-5">
            <div className="form-group mx-5 text-light">
              <label htmlFor="">ایمیل</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="login-input"
                type="text"
                className="form-control border-0 text-light"
              />
            </div>
            <div className="form-group mx-5 text-light">
              <label htmlFor="">کد بازیابی</label>
              <input
                onChange={(e) => setResetCode(e.target.value)}
                value={resetCode}
                id="login-input"
                type="text"
                className="form-control border-0 text-light"
              />
            </div>
            <div className="form-group mx-5 text-light">
              <label htmlFor="">رمز جدید</label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type="password"
                id="login-input"
                className="form-control border-0 text-light"
              />
            </div>
            <div className="form-group mx-5 text-light">
              <label htmlFor="">تکرار رمز جدید</label>
              <input
                onChange={(e) => setRepeatNewPassword(e.target.value)}
                value={RepeatNewPassword}
                type="password"
                id="login-input"
                className="form-control border-0 text-light"
              />
            </div>
            <div className="form-group mx-5 text-center">
              <Button
                onClick={(e) =>
                  resetPassword(
                    newPassword,
                    RepeatNewPassword,
                    email,
                    resetCode,
                    e
                  )
                }
                variant="success"
                className="btn btn-success ms-1 mt-4"
                disabled={loadingResetPass}
              >
                {loadingResetPass ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      variant=""
                      role="status"
                      aria-hidden="true"
                      className="mx-2"
                      style={{
                        animationDuration: "1.5s", // زمان انیمیشن را تنظیم کنید
                        border: "0.2em solid", // نوع حاشیه را تنظیم کنید
                        borderTopColor: "transparent", // رنگ حاشیه بالا را تنظیم کنید
                      }}
                    />
                    <span className="text-light"> درانتظار تغییر رمز</span>
                  </>
                ) : (
                  "تغییر رمز"
                )}
              </Button>
              <button
                onClick={(e) => handleClick(2, e)}
                className="btn btn-warning me-1 mt-4"
              >
                بازگشت
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;