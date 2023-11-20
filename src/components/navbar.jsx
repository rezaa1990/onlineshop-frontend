import { library } from '@fortawesome/fontawesome-svg-core';
import { faBasketShopping, faCircleXmark, faCoffee, faDove, faLaptop, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//////////////////////////////////////////////////////////////////////////////////

function Navbar(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [rerender, setRerender] = useState(false);
///////////////////////////////////////////////////////////////
    function getUser(){
    const userToken = localStorage.getItem('userToken');
    const config = {
    headers: {
      'token1': `${userToken}`
    }
    };

    axios.get(`http://localhost:5000/api/user/me`,config)
      .then(response => {
        console.log("user",response);
        console.log("pro", response.data.data);
        const p = response.data.data;
        setUser(p);
        setRerender(props.rerender);
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
    }
    useEffect(() => {
      getUser();
      },[]);
  ///////////////////////////////////////////////////////////////////////////////////
    function handleExit(){
      localStorage.removeItem('userToken');
    };
  ///////////////////////////////////////////////////////////////////////////////////
  return (
    <nav className="navbar navbar-expand-sm shadow-sm py-0">

      <a className="navbar-brand text-">
        <i className="m-2" style={{ fontSize: '20px' }}><FontAwesomeIcon icon={faLaptop} /></i>
      </a>
      <ul className="navbar-nav">


      <li className="nav-item mx-2">
          <Link to="./userdashboard" className="nav-link">حساب کاربری</Link>
        </li>

        <li className="nav-item mx-2">
          <Link to="/" className="nav-link">خانه</Link>
        </li>

        <li className="nav-item mx-2">
          <Link to="./userdashboard" className="nav-link">
          <i className="text-light" style={{backgroundColor:"red",borderRadius:"50%",margin:"3px"}}>{user?.basket?.length}</i>
            سبد خرید
          </Link>
        </li>

        {/* <li className="nav-item mx-2">
          <a href="client" className="nav-link">مشتری</a>
        </li> */}

        <li className="nav-item mx-2 dropdown">
          <a href="" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">محصولات</a>
          <div className="dropdown-menu text-end">
            <a href="" className="dropdown-item my-1">لپ تاپ</a>
            <a href="" className="dropdown-item my-1">موبایل</a>
            <a href="#" className="dropdown-item my-1">لوازم جانبی</a>
          </div>
        </li>
      </ul>
      {/* </div> */}

      <form action="" className="form-inline mx-auto">
        <div className="input-group">
        <button className="btn">
          <i className="" style={{ fontSize: '20px' }}><FontAwesomeIcon icon={faSearch} /></i>
          </button>
          <input type="text" placeholder='جست و جو' className="form-control rounded" />
          <div className="input-group-append">
          </div>
        </div>
      </form>

      <div className="m-2 text-center">
      
      <Link to="./login" className="py-2">
      <i className="text-secondary" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faUser} /></i>
        <button className='btn'>ثبت نام / ورود</button>
      </Link>
      </div>

      <div className="m-2 text-center">
        <Link to="./login" className="py-2" onClick={handleExit}>
          <i className="text-secondary" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faCircleXmark}/></i>
          <button className='btn'>خروج</button>
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
