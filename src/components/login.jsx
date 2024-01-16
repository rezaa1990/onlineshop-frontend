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


function Login() {
  const {
    setLogInLogUot,
    server,
    handleLogin,
    setUserRole,
    setUser,
    setAdminUserInfo,
  } = useContext(AppContext);
  
  const  navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [RepeatNewPassword, setRepeatNewPassword] = useState("");
  const [loginResponseMessage, setLoginResponseMessage] = useState();
  const [resetCode, setResetCode] = useState();
  const [display, setDisplay] = useState(1);
  const [buttonState, setButtonState] = useState(false);

  function handleClick(order,e) {
    e.preventDefault();
    setDisplay(order)
  }
  async function login(e) {
    e.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };

      console.log(loginData);

      const response = await axios.post(
        `http://${server}:5000/api/auth/login`,
        loginData
      );
      console.log(response.data);
      localStorage.setItem("userToken", response.data.data.token);
      handleLogin();
      const role = response.data.data.role;
      setUserRole(role); //برای مشخص شدن نقش کاربر و رندر شدن پنل ادمین یا کاربر معمولی بر اساس آن
      if (role !== "adminUser") {
        navigate("/userdashboard");
      } //اگر نقش کاربر برابر با ادمین نبود برو به صفحه ی کاربری کاربر معمولی
    } catch (error) {
      console.log(error);
      setLoginResponseMessage(error.response?.data?.message);
    }
  }

  async function resetPasswordEmail(e) {
    setButtonState(true);
    e.preventDefault();
    try {
      const loginData = {
        email,
      };
      console.log(loginData);
      const response = await axios.put(
        `http://${server}:5000/api/auth/resetpasswordemail`,
        loginData
      );
      console.log(response);
      setButtonState(false);
      setLoginResponseMessage(response?.data?.message);
      setDisplay(3);
    } catch (error) {
      console.log(error);
      setLoginResponseMessage(error.response?.data?.message);
      setButtonState(false);
    }
  }

  async function resetPassword(
    newPassword,
    RepeatNewPassword,
    email,
    resetCode,
    e
  ) {
    setButtonState(true);
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
        `http://${server}:5000/api/auth/resetpasswor`,
        data
      );
      console.log(response);
      setLoginResponseMessage(response.data?.message);
      setButtonState(false);
      setDisplay(response.data?.message == "رمز عبور با موفقیت تغییر یافت" ? 1 : 3)
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.data)
      setLoginResponseMessage(error.response?.data?.data);
      setButtonState(false);
    }
  }

  return (
    <div className="row containe justify-content-center login mx-0">
      {/* login */}
      <div
        className="col-lg-6"
        style={{ display: display === 1 ? "block" : "none" }}
      >
        <h3 className="m-4 text-center text-light">ورود</h3>

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
            <button onClick={login} className="btn btn-success my-3 w-100">
              ورود
            </button>
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
        className="col-lg-6"
        style={{ display: display === 2 ? "block" : "none" }}
      >
        <div className="text-center">
          <h3 className="my-4 text-light">
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
              <button
                onClick={resetPasswordEmail}
                disabled={buttonState}
                className="btn btn-success btn-sm my-1 w-50"
              >
                بازیابی
              </button>
              <button
                onClick={(e)=>handleClick(1,e)}
                className="btn btn-warning btn-sm my-1 w-50"
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
              <button
                onClick={(e) =>
                  resetPassword(
                    newPassword,
                    RepeatNewPassword,
                    email,
                    resetCode,
                    e
                  )
                }
                disabled={buttonState}
                className="btn btn-success btn-sm my-1 w-50"
              >
                تغییر رمز
              </button>
              <button
                onClick={(e)=>handleClick(2,e)}
                className="btn btn-warning btn-sm my-1 w-50"
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