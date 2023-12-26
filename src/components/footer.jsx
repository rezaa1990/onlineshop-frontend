import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faDove, faShop} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import instagram from "./../images/instagram.png"
import whatsapp from "./../images/whatsapp.png"
import telegram from "./../images/telegram.png"


library.add(faCoffee);
function Footer() {
  return (
    <footer className="pb-4 border-top">
      <div className="text-center">        

        <div className="my-2 p-2">

        <a href="https://instagram.com" target="_blank">
            <img src={instagram} alt="" className="mx-2" style={{ cursor: 'pointer', width: '22px', height: '22px' }} />
          </a>
          <a href="https://whatsapp.com" target="_blank">
            <img src={whatsapp} alt="" className="mx-2" style={{ cursor: 'pointer', width: '22px', height: '22px' }} />
          </a>
          <a href="https://telegram.org" target="_blank">
            <img src={telegram} alt="" className="mx-2" style={{ cursor: 'pointer', width: '22px', height: '22px' }} />
          </a>

        </div>
        <div className="text-white">&copy; ایجاد شده توسط رضا</div>
      </div>
    </footer>
  );
}

export default Footer;