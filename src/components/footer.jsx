import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faDove, faShop} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';
// import 'bootstrap-icons/bootstrap-icons.css';


library.add(faCoffee);
function Footer() {
  return (
    <footer className="py-5">
      <div className="container text-center">
        <h1 className="display-3">
          <a href="" className="text-secondary">
          <i className="" style={{ fontSize: '50px' }}><FontAwesomeIcon icon={faShop} /></i>
          </a>
        </h1>
        <h2 className='text-secondary'>با ما بروز باشید</h2>
        <div className="my-5">
          <a href=""></a>
          <i className="ml-3 text-info" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faDove} /></i>

          <a href=""></a>
          <i className="ml-3 text-info" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faDove} /></i>
          <a href="">
          <i className="ml-3 text-danger" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faDove} /></i>
          </a>
        </div>
        <div className="text-secondary">&copy; ایجاد شده توسط رضا</div>
      </div>
    </footer>
  );
}

export default Footer;