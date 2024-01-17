import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faDove} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useContext } from 'react';
import AppContext from '../context/context';
import{useNavigate } from 'react-router-dom';

function Register() {
  const navigate  = useNavigate();
  const[registerResponseMessage,setRegisterResponseMessage]=useState();

  const {
    port,
    reqType,
    server,
    fName,
    lName,
    email,
    mobile,
    address,
    password,
    repeatPassword,
    postalCode,
    setRegisterName,
    setLastName,
    setEmail,
    setMobile,
    setAddress ,
    setPassword,
    setRepeatPassword,
    setPostalCode,

  }=useContext(AppContext);

  async function register(e) {
    e.preventDefault();
    try {
      const registerData = {
        fName,
        lName,
        mobile,
        email,
        password,
        repeatPassword,
      };
  
      console.log(registerData);
  
      const response = await axios.post(`${reqType}://${server}:${port}/api/auth/register`, registerData);
      console.log(response.data.message);
      console.log(response.data);
      navigate("/login")
    } catch (error) {
      console.log(error.response)
      setRegisterResponseMessage(error.response.data.data);
    }
  }

  // const [googleUserData,setGoogleUserData] = useState();





// const firebaseConfig = {
//   apiKey: "AIzaSyAolIs0-QmQYJhmK-WKIkoKAluX_CMp3ZE",
//   authDomain: "shoptest-fe6b7.firebaseapp.com",
//   projectId: "shoptest-fe6b7",
//   storageBucket: "shoptest-fe6b7.appspot.com",
//   messagingSenderId: "350382528617",
//   appId: "1:350382528617:web:d89c226b7cc1473fcd6af8",
//   measurementId: "G-FCWC766RRB"
// };

// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig); // firebaseConfig باید شامل تنظیمات مربوط به Firebase شما باشد
// }

// const handleGoogleRegister = async (e) => {
//   e.preventDefault();
//   const provider = new firebase.auth.GoogleAuthProvider();
//   try {
//     const result = await firebase.auth().signInWithPopup(provider);
//     const userData = result.user;
//     // console.log(userData.multiFactor.user);
//     console.log(userData.multiFactor.user.email);
//     console.log(userData.multiFactor.user.uid);

//     setEmail(userData.multiFactor.user.email);
//     setPassword(userData.multiFactor.user.uid);

//     console.log(email);
//     console.log(password);

//     const registerData = {
//       fName,
//       lName,
//       mobile,
//       email,
//       address,
//       postalCode,
//       password,
//     };

//     console.log(registerData);

//     const response = await axios.post(`http://localhost:5000/api/auth/register`, registerData);
//     console.log(response.data.message);
//     console.log(response.data);
//     navigate("/login");
//   } catch (error) {
//     console.error('خطا در ثبت‌نام با گوگل:', error);
//   }
// };

  return (
    <div className="row justify-content-center register">
    <div className="col-lg-6">
      <h3 className="m-5 text-center text-white">ثبت نام</h3>

      <div className="form-group mx-5">
       <p className="text-center text-danger ">{registerResponseMessage}</p>
      </div>

      <form action="" className=" text-white mb-5">
        <div className="form-group mx-5">
          <label htmlFor="name">نام</label>
          <input onChange={(e)=> setRegisterName(e.target.value)} id="register-input" type="text" className="form-control border-0 text-light" />
        </div>

        {/* <div className="form-group mx-5">
          <label htmlFor="name">نام خانوادگی</label>
          <input onChange={(e)=>setLastName(e.target.value)} id="lname" type="text" className="form-control" />
        </div> */}

        <div className="form-group mx-5">
          <label htmlFor="name">* ایمیل</label>
          <input onChange={(e)=>setEmail(e.target.value)} id="register-input" type="text" className="form-control border-0 text-light" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="name">موبایل</label>
          <input onChange={(e)=>setMobile(e.target.value)} id="register-input" type="text" className="form-control border-0 text-light" />
        </div>
{/* 
        <div className="form-group mx-5">
          <label htmlFor="name">آدرس</label>
          <input onChange={(e)=>setAddress(e.target.value)} id="address" type="text" className="form-control" />
        </div> */}

        {/* <div className="form-group mx-5">
          <label htmlFor="name">کد پستی</label>
          <input onChange={(e)=>setPostalCode(e.target.value)} id="postalcode" type="number" className="form-control" />
        </div> */}

        <div className="form-group mx-5">
          <label htmlFor="email">* رمز عبور</label>
          <input onChange={(e)=>setPassword(e.target.value)} id="register-input" type="password" className="form-control border-0 text-light" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="email">* تکرار رمز عبور</label>
          <input onChange={(e)=>setRepeatPassword(e.target.value)} id="register-input" type="password" className="form-control border-0 text-light" />
        </div>

        <div className="form-group mx-5">
          <button onClick={register} className="btn btn-success my-3 w-100">ثبت نام</button>
        </div>

        {/* <div className="form-group mx-5">
          <button onClick={handleGoogleRegister} className="btn btn-outline-success my-1 w-100">google</button>
        </div> */}

      </form>


    </div>

  </div>
  );
}

export default Register;