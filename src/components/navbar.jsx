import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faDove, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




library.add(faCoffee);
function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm shadow-sm py-0">

      <a className="navbar-brand text-warning">
        <i className="m-2" style={{ fontSize: '20px' }}><FontAwesomeIcon icon={faDove} /></i>
      </a>
      {/* <button className='navbar-toggler' data-toggle="collapse" data-target="#mynav">
        <span className="navbar-toggler-icon"></span>
      </button> */}
      {/* <div className='collapse navbar-collapse' id='mynav'> */}
      <ul className="navbar-nav">
        <li className="nav-item mx-2">
          <a href="/home" className="nav-link">خانه</a>
        </li>

        <li className="nav-item mx-2">
          <a href="./gallery" className="nav-link">گالری</a>
        </li>

        <li className="nav-item mx-2">
          <a href="client" className="nav-link">مشتری</a>
        </li>

        <li className="nav-item mx-2 dropdown">
          <a href="" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">محصولات</a>
          <div className="dropdown-menu text-end">
            <a href="" className="dropdown-item my-1">مرطوب کننده</a>
            <a href="" className="dropdown-item my-1">صابون</a>
            <a href="#" className="dropdown-item my-1">پک داو</a>
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
      <button className='btn'>ثبت نام / ورود</button>
      </div>
    </nav>
  );
}

export default Navbar;
