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


function Login() {
  const {
    setLogInLogUot,
    server,
    handleLogin,

  }=useContext(AppContext);
  
  const  navigate = useNavigate();
  const[email , setEmail ]= useState("");
  const[password , setPassword ]= useState("");
  const[loginResponseMessage,setLoginResponseMessage]=useState();
  
  
  // const firebaseConfig = {
    
  //   apiKey: "AIzaSyBZMUlJZKzLF3sYE8L2OWQmf8YgbwZjk2c",
  //   authDomain: "rezshop.firebaseapp.com",
  //   projectId: "rezshop",
  // };
  
  // // بررسی اینکه آیا یک نمونه از Firebase App با نام '[DEFAULT]' ایجاد شده یا خیر
  // if (!firebase.apps.length) {
  //   firebase.initializeApp(firebaseConfig); // ایجاد یک نمونه از Firebase App
  // } else {
  //   firebase.app(); // استفاده از نمونه ایجاد شده اگر وجود دارد
  // }
  
  async function login(e) {
    e.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };
  
      console.log(loginData);
  
      const response = await axios.post(`http://${server}:5000/api/auth/login`, loginData);
      console.log(response.data);
      localStorage.setItem('userToken', response.data.data.token);
      handleLogin();
      const role = response.data.data.role;
      navigate(role === "adminUser" ? "/adminpanel" : "/");
    } catch (error) {
      console.log(error)
      setLoginResponseMessage(error.response?.data?.message);
    }
  }

  // const handleGoogleLogin = async (e) => {
  //   e.preventDefault();
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   try {
  //     const result = await firebase.auth().signInWithPopup(provider);
  //     // ورود موفقیت‌آمیز
  //     const user = result.user;
  //     console.log('Logged in user:', user);
  //     navigate("/userdashboard");
  //   } catch (error) {
  //     // خطا در ورود
  //     console.error('Login error:', error);
  //   }
  // };
  

  return (
    <div className="row containe justify-content-center login mx-0">
    <div className="col-lg-6">
      <h3 className="m-4 text-center text-light">ورود</h3>

      <div className="form-group mx-5">
       <p className="text-center text-danger ">{loginResponseMessage}</p>
      </div>

      <form action="" className="text-muted mb-5">
        <div className="form-group mx-5 text-light">
          <label htmlFor="">ایمیل</label>
          <input onChange={(e)=>setEmail(e.target.value)} id="login-input" type="text" className="form-control border-0 text-light" />
        </div>

        <div className="form-group mx-5 text-light">
          <label htmlFor="">رمز عبور</label>
          <input onChange={(e)=>setPassword(e.target.value)} id="login-input" type="password" className="form-control border-0 text-light" />
        </div>

        <div className="form-group mx-5">
          <button onClick={login} className="btn btn-success my-3 w-100">ورود</button>
        </div>

        {/* <div className="form-group mx-5">
          <button onClick={handleGoogleLogin} className="btn btn-outline-warning my-1 w-100">google</button>
        </div> */}

        <div className="text-center">
          <Link to="/register" className="text-light">ثبت نام</Link>
        </div>
      </form>


    </div>
  </div>
  );
}

export default Login;