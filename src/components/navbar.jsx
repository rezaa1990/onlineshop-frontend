import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faDove, faLaptop, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




library.add(faCoffee);
function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm shadow-sm py-0">

      <a className="navbar-brand text-">
        <i className="m-2" style={{ fontSize: '20px' }}><FontAwesomeIcon icon={faLaptop} /></i>
      </a>
      <ul className="navbar-nav">
        <li className="nav-item mx-2">
          <a href="/home" className="nav-link">خانه</a>
        </li>

        <li className="nav-item mx-2">
          <a href="./gallery" className="nav-link">سبد خرید</a>
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
      <i className="" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faUser} /></i>
      <a href="./login" className="text-secondary py-2"> <button className='btn'>ثبت نام / ورود</button></a>
      </div>
    </nav>
  );
}

export default Navbar;
