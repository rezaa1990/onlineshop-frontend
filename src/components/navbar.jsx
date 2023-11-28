import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/context';
import onLineshop from '../images/onlineshop.png';
import userIcon from '../images/user.png';
import search from '../images/search.png';
import home from '../images/home.png';
import exit from '../images/exit.png';
import basket from '../images/basket.png';

function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { user, setLogInLogUot, logInLogUot } = useContext(AppContext);

  function handleExit() {
    localStorage.removeItem('userToken');
    setLogInLogUot(true);
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light h-md-100">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={onLineshop} alt="Online Shop" className="basket me-2" style={{ cursor: 'pointer', width: '25px', height: '25px' }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <Link to="./userdashboard" className="nav-link">
                <i className="" style={{ fontSize: '15px', cursor: 'pointer' }}>
                  <img src={userIcon} className="basket" style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
                </i>
                حساب کاربری
              </Link>
            </li>
            <li className="nav-item mx-2">
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
                <i className="" style={{ fontSize: '15px', cursor: 'pointer' }}>
                  <img src={search} className="basket" style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
                </i>
              </button>
              <input type="text" placeholder='جست و جو' className="form-control rounded" />
              <div className="input-group-append">
              </div>
            </div>
          </form>
          <div className="m-2 text-center">
            <Link to="./login" className="py-2" style={{ display: logInLogUot === true ? 'block' : 'none', textDecoration: 'none' }}>
              <i className="" style={{ fontSize: '15px', cursor: 'pointer' }}>
                <img src={userIcon} className="basket" style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
              </i>
              <p className="text-muted">ثبت نام / ورود</p>
            </Link>
          </div>
          <div className="m-2 text-center" style={{ display: logInLogUot === false ? 'block' : 'none' }}>
            <Link to="./login" className="py-2" onClick={handleExit}>
              <i className="" style={{ fontSize: '15px', cursor: 'pointer' }}>
                <img src={exit} className="basket" style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
              </i>
              <button className='btn'>خروج</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
