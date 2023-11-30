import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/context';
// import onLineshop from '../images/onlineshop.png';
import userIcon from '../images/user.png';
import search from '../images/search.png';
import home from '../images/home.png';
import exit from '../images/exit.png';
import basket from '../images/basket.png';
import calendar from '../images/calendar.png';
import MyDatePicker from './date';

function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { user, setLogInLogUot, logInLogUot } = useContext(AppContext);

  function handleExit() {
    localStorage.removeItem('userToken');
    setLogInLogUot(true);
  }

  return (
    <nav className="navbar navbar-expand-lg"style={{borderBottom:"1px solid"}}>
      <div className="container-fluid">

        <div
          className="navbar-toggler mb-1 px-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </div>

        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
         
            <ul className="navbar-nav p-0">
            <li className="nav-item">
              <Link to="./userdashboard" className="nav-link">
                <i className="" style={{ fontSize: '15px', cursor: 'pointer' }}>
                  <img src={userIcon} className="basket " style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
                </i>
                حساب کاربری
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="" style={{ fontSize: '15px', cursor: 'pointer' }}>
                  <img src={home} className="basket mx-1" style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
                </i>
                خانه
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="./userdashboard" className="nav-link d-flex">
                <i className="text-light text-center px-1" style={{ backgroundColor: "red", borderRadius: "50%", margin: "1px", display: logInLogUot === true ? "none" : "block" }}>
                  {user?.basket?.length}
                </i>
                <i className="" style={{ fontSize: '15px', cursor: 'pointer' }}>
                  <img src={basket} className="basket" style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
                </i>
                سبد خرید
              </Link>
            </li>
            <li className="nav-item mx-2 dropdown">
              <a href="" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">محصولات</a>
              <div className="dropdown-menu text-end w-50 ">
                <Link to="/" className="dropdown-item m-1 ">لپ تاپ</Link>
                <Link to="/" className="dropdown-item my-1 ">موبایل</Link>
                <Link to="/" className="dropdown-item my-1 ">لوازم جانبی</Link>
              </div>
            </li>
            </ul>

        </div>

        <div className="d-flex align-items-center col-lg-7 col-sm-12 px-">

          <form action="" className="col-4 form-inline">
            <div className="input-group">           
              <div className="input-group-append pt-2 px-1">
                <i className="" style={{ fontSize: '15px', cursor: 'pointer' }}>
                  <img src={search} className="mb-2" style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
                </i>
              </div>
              <input type="text" placeholder='جست و جو' className="form-control rounded px-1 py-1 lilo" />
            </div>
          </form>

          <div className="d-flex col-4 text-center px-1 justify-content-center">
            <div className="">
              <i className="">
                <img src={calendar} className="" style={{width: '25px', height: '25px' }} />
              </i>
            </div>
            <div className="d-flex align-items-center ">
            <MyDatePicker></MyDatePicker>
            </div>
          </div>

          <div className="m- col-4 my-3">
            <div className="text-center">
              <Link to="./login" className="" style={{ display: logInLogUot === true ? 'block' : 'none', textDecoration: 'none' }}>
                <i className="text-muted d-flex justify-content-end" style={{ fontSize: '15px', cursor: 'pointer' }}>
                  <img src={userIcon} className="col-3" style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
                  {/* <p className="px-1 col-9 m-0 text-muted lilo"> */}
                    ثبت نام/ورود
                    {/* </p> */}
                </i>

              </Link>
            </div>

            <div className="text-center">
              <Link to="./" onClick={handleExit} className="" style={{ display: logInLogUot === false ? 'block' : 'none', textDecoration: 'none' }}>
                <i className="text-muted d-flex justify-content-end" style={{ fontSize: '15px', cursor: 'pointer' }}>
                  <img src={exit} className="col-3 mx-1 mt-" style={{ cursor: 'pointer', width: '18px', height: '18px' }} />
                  خروج
                </i>

              </Link>
            </div>

            

            {/* <div className="mx-2 text-center" style={{ display: logInLogUot === true ? 'block' : 'none' }}>
              <Link to="./login" className="py-2" onClick={handleExit}>
                <i className="" style={{ fontSize: '15px', cursor: 'pointer' }}>
                  <img src={exit} className="p-0 m-0" style={{ cursor: 'pointer', width: '18px', height: '18px' }} />
                </i>
                <button className='lilo'>خروج</button>
              </Link>
            </div> */}


          </div>
        
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
