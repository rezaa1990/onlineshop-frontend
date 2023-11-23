import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faDove} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function Register() {
  const navigate  = useNavigate();
  
  const[fName , setName ]= useState("fname");
  const[lName , setLastName ]= useState("lname");
  const[email , setEmail ]= useState("");
  const[mobile , setMobile ]= useState(0);
  const[address , setAddress ]= useState("address");
  const[password , setPassword ]= useState("");
  const[repeatPassword , setRepeatPassword ]= useState("");
  const[postalCode , setPostalCode ]= useState(0);

  const [googleUserData,setGoogleUserData] = useState();

async function register(e) {
  e.preventDefault();
  if (password !== repeatPassword) {
    console.log('مقادیر پسورد یکسان نیست');
    return;
  }

  try {
    const registerData = {
      fName,
      lName,
      mobile,
      email,
      address,
      postalCode,
      password,
    };

    console.log(registerData);

    const response = await axios.post(`http://localhost:5000/api/auth/register`, registerData);
    console.log(response.data.message);
    console.log(response.data);
    navigate("/login");
    // localStorage.setItem('userToken', response.data.data.token);
  } catch (error) {
    console.error('خطا در ارسال درخواست:', error);
  }
}



const firebaseConfig = {
  apiKey: "AIzaSyAolIs0-QmQYJhmK-WKIkoKAluX_CMp3ZE",
  authDomain: "shoptest-fe6b7.firebaseapp.com",
  projectId: "shoptest-fe6b7",
  storageBucket: "shoptest-fe6b7.appspot.com",
  messagingSenderId: "350382528617",
  appId: "1:350382528617:web:d89c226b7cc1473fcd6af8",
  measurementId: "G-FCWC766RRB"
};

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); // firebaseConfig باید شامل تنظیمات مربوط به Firebase شما باشد
}

const handleGoogleRegister = async (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const userData = result.user;
    // console.log(userData.multiFactor.user);
    console.log(userData.multiFactor.user.email);
    console.log(userData.multiFactor.user.uid);

    setEmail(userData.multiFactor.user.email);
    setPassword(userData.multiFactor.user.uid);

    console.log(email);
    console.log(password);

    const registerData = {
      fName,
      lName,
      mobile,
      email,
      address,
      postalCode,
      password,
    };

    console.log(registerData);

    const response = await axios.post(`http://localhost:5000/api/auth/register`, registerData);
    console.log(response.data.message);
    console.log(response.data);
    navigate("/login");
  } catch (error) {
    console.error('خطا در ثبت‌نام با گوگل:', error);
  }
};




  

  return (
    <div className="row justify-content-center">
    <div className="col-lg-6">
      <h3 className="m-5">ثبت نام</h3>


      <form action="" className="text-muted mb-5">
        <div className="form-group mx-5">
          <label htmlFor="name">نام</label>
          <input onChange={(e)=>setName(e.target.value)} id="name" type="text" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="name">نام خانوادگی</label>
          <input onChange={(e)=>setLastName(e.target.value)} id="fname" type="text" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="name">* ایمیل</label>
          <input onChange={(e)=>setEmail(e.target.value)} id="lname" type="text" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="name">موبایل</label>
          <input onChange={(e)=>setMobile(e.target.value)} id="mobile" type="number" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="name">آدرس</label>
          <input onChange={(e)=>setAddress(e.target.value)} id="address" type="text" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="name">کد پستی</label>
          <input onChange={(e)=>setPostalCode(e.target.value)} id="postalcode" type="number" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="email">* رمز عبور</label>
          <input onChange={(e)=>setPassword(e.target.value)} id="number" type="password" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="email">* تکرار رمز عبور</label>
          <input onChange={(e)=>setRepeatPassword(e.target.value)} id="repeatpassword" type="password" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <button onClick={register} className="btn btn-outline-success my-1 w-100">ثبت نام</button>
        </div>

        <div className="form-group mx-5">
          <button onClick={handleGoogleRegister} className="btn btn-outline-success my-1 w-100">google</button>
        </div>

      </form>


    </div>
  </div>
  );
}

export default Register;