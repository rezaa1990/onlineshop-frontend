import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faDove} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import axios from 'axios';

// library.add(faCoffee);
function Login() {
  // const emailInput=useRef();

  const[email , setEmail ]= useState("");
  const[password , setPassword ]= useState("");


  async function login(e) {
    e.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };
  
      console.log(loginData);
  
      const response = await axios.post(`http://localhost:5000/api/auth/login`, loginData);
      console.log(response.data.message);
      console.log(response.data);
      localStorage.setItem('userToken', response.data.data.token);
      window.location = '/dashboard';
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
    }
  }

  return (
    <div className="row justify-content-center">
    <div className="col-lg-6">
      <h3 className="m-5">ورود</h3>


      <form action="" className="text-muted mb-5">
        <div className="form-group mx-5">
          <label htmlFor="name">ایمیل</label>
          <input onChange={(e)=>setEmail(e.target.value)} id="name" type="text" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="email">رمز عبور</label>
          <input onChange={(e)=>setPassword(e.target.value)} id="email" type="password" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <button onClick={login} className="btn btn-outline-success my-1 w-100">ورود</button>
        </div>
        <div className="text-center">
          <a href="./register" className="">ثبت نام</a>
        </div>
      </form>


    </div>
  </div>
  );
}

export default Login;