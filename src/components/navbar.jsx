import { library } from '@fortawesome/fontawesome-svg-core';
import { faBasketShopping, faCircleXmark, faCoffee, faDove, faLaptop, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useContext } from 'react';
import { Link} from 'react-router-dom';
import AppContext from '../context/context';

function Navbar() {
  const{
    user,
    setUser,
    logInLogUot,
    setLogInLogUot,
  }=useContext(AppContext);
  ///////////////////////////////////////////////////////////////////////////////////
    function handleExit(){
      localStorage.removeItem('userToken');
      setLogInLogUot(true)
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
          <Link to="./userdashboard" className="nav-link d-flex">

          <i className="text-light text-center px-1"
          style={{
            backgroundColor:"red",
            borderRadius:"50%",
            margin:"1px",
            display:logInLogUot == false ? "block" : "none"
          }}>
            {user?.basket?.length}
          </i>

            سبد خرید
          </Link>
        </li>

        <li className="nav-item mx-2 dropdown">
          <a href="" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">محصولات</a>
          <div className="dropdown-menu text-end">
            <a href="" className="dropdown-item my-1">لپ تاپ</a>
            <a href="" className="dropdown-item my-1">موبایل</a>
            <a href="#" className="dropdown-item my-1">لوازم جانبی</a>
          </div>
        </li>
      </ul>

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
      
      <Link to="./login" className="py-2" 
      style={{ 
        display:logInLogUot ==true ? 'block' : 'none'
        }}
        >
      <i className="text-secondary" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faUser} /></i>
        <button className='btn'>ثبت نام / ورود</button>
      </Link>
      </div>

      <div className="m-2 text-center" 
      style={{ 
        display:logInLogUot ==false ?'block' : 'none'
      }}
         >
        <Link to="./login" className="py-2" onClick={handleExit}>
          <i className="text-secondary" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faCircleXmark}/></i>
          <button className='btn'>خروج</button>
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
