import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faDove} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import axios from 'axios';


function Register() {
  const[fName , setName ]= useState("");
  const[lName , setLastName ]= useState("");
  const[email , setEmail ]= useState("");
  const[mobile , setMobile ]= useState();
  const[address , setAddress ]= useState("");
  const[password , setPassword ]= useState("");
  const[repeatPassword , setRepeatPassword ]= useState("");
  const[postalCode , setPostalCode ]= useState();



  // ...

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
    // localStorage.setItem('userToken', response.data.data.token);
  } catch (error) {
    console.error('خطا در ارسال درخواست:', error);
  }
}
  

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
          <label htmlFor="name">ایمیل</label>
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
          <label htmlFor="email">رمز عبور</label>
          <input onChange={(e)=>setPassword(e.target.value)} id="number" type="password" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="email">تکرار رمز عبور</label>
          <input onChange={(e)=>setRepeatPassword(e.target.value)} id="repeatpassword" type="password" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <button onClick={register} className="btn btn-outline-success my-1 w-100">ثبت نام</button>
        </div>

      </form>


    </div>
  </div>
  );
}

export default Register;