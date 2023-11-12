import { library } from '@fortawesome/fontawesome-svg-core';
import { faBasketShopping, faCoffee, faDove, faProcedures, faUser, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useState } from 'react';

library.add(faCoffee);

function UserPanel() {
  const [showHidden, setShowHidden] = useState(false);

  return (
    <>
      <div className="d-flex">
        <ul className="row nav col-sm-3 h-50 ">
          <li className="nav-item m-auto p-2 shadow-sm">
            <a className="nav-link text-black" href="#" onClick={() => setShowHidden(1)}>
            <i className="px-2" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faUser} /></i>
              حساب کاربری
            </a>
          </li>
          {/* <li className="nav-item m-auto p-2 shadow-sm">
            <a className="nav-link text-black" href="#" onClick={() => setShowHidden(2)}>
            <i className="px-2" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faWarehouse} /></i>
              انبار
            </a>
            
          </li> */}
          <li className="nav-item m-auto p-2 shadow-sm">
            <a className="nav-link text-black" href="#" onClick={() => setShowHidden(2)}>
            <i className="px-2" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faBasketShopping} /></i>
              سبد خرید
              </a>
          </li>
        </ul>

        <div className="container-fluid col-sm-11 p-4" style={{ display: showHidden ==1 ? 'block' : 'none' }}>
          <div className="p-2 shadow-sm">
            <p className="">نام:</p>
            <p className="">رضا</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className=""> نام خانوادگی:</p>
            <p className="">رضا</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">ایمیل:</p>
            <p className="">rezaaaa.z.1991@gmail.com</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">شماره تماس:</p>
            <p className="">09308374636</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">آدرس:</p>
            <p className="">ارسنجان</p>
          </div>
        </div>

        <div className="container-fluid col-sm-11 p-4" style={{ display: showHidden ==2 ? 'block' : 'none' }}>
          <div className="p-2 shadow-sm">
            <p className=""> نام محصول:</p>
            <p className="">موبایل</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">تعداد:</p>
            <p className="">1</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">قیمت:</p>
            <p className="">۱۲۳۴۵۰۰۰ تومان</p>
          </div>
        </div>


      </div>
    </>
  );
}

export default UserPanel;
