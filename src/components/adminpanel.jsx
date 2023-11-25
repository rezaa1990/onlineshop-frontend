import { library } from '@fortawesome/fontawesome-svg-core';
import { faAdd, faCoffee, faDove, faProcedures, faUpDown, faUpRightAndDownLeftFromCenter, faUser, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState ,useContext} from 'react';
import axios from 'axios';
import ImageUpload from './uploadeimg';
import { useNavigate } from 'react-router-dom';
import Products from './products';
import { hover } from '@testing-library/user-event/dist/hover';
import css from "./../css/main.css";
import Navbar from "./navbar";
import AppContext from '../context/context';


function AdminPanel() {
  const{
    price,
    setPrice,
    name,
    setName,
    numberOfLikes,
    setNumberOfLikes,
    description,
    setDescription,
    responseMessage,
    setResponseMessage,
    imgPath,
    setImgPath,
    img,
    setImg,
    isSubMenuVisible,
    setIsSubMenuVisible,
    showHidden,
    setShowHidden,
    addProduct,

  }=useContext(AppContext);

  const navigate = useNavigate();

  const toggleSubMenu = () => {
    setIsSubMenuVisible(!isSubMenuVisible);
  };

  const navigation = () => {
    navigate("./products");
  };
////////////////////////////////////////////////////////////////////////////////////////
const handleFileInputChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    // عکس با موفقیت خوانده شده و آماده ذخیره در state است
    setImg(reader.result);
    console.log(img);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}; 


////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      
      <div className="d-flex p-2">
        <ul className="row nav col-sm-3 h-50 ">
          <li className="nav-item m-auto p-2 shadow-sm">
            <a className="nav-link text-black" href="#" onClick={() => setShowHidden(1)}>
            <i className="px-2" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faUser} /></i>
              حساب کاربری
            </a>
          </li>
          
          <li className="nav-item m-auto p-2 shadow-sm">
            <a className="nav-link text-black" href="#" onClick={() => setShowHidden(2)}>
            <i className="px-2" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faWarehouse} /></i>
              انبار
            </a>
          </li>

          <li className={`nav-item m-auto p-2 shadow-sm ${isSubMenuVisible ? 'show-submenu' : ''}`}>
            <a className="nav-link text-black" href="#" onClick={toggleSubMenu}>
              <i className="px-2" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faProcedures} /></i>
              محصولات
            </a>
            {/* Submenu */}
            {isSubMenuVisible && (
              <ul className="submenu">

                <li className="list-unstyled p-2 shadow-sm my-1 submenu1" onClick={() => setShowHidden(5)} ><i className="px-2" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter}/></i>
                 بروز رسانی
                </li>

                <li className="list-unstyled p-2 shadow-sm mb-1 submenu1" onClick={() => setShowHidden(3)} ><i className="px-2" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faAdd} /></i>
                  اضافه کردن
                </li>
                 {/* Add more submenu items as needed */}
              </ul>
            )}
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
            <p className="">۳۳۴</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">قیمت:</p>
            <p className="">۱۲۳۴۵۰۰۰ تومان</p>
          </div>
        </div>


        <div className="container-fluid col-sm-10 px-5 mt-3" style={{ display: showHidden ==3 ? 'block' : 'none' }}>افزودن محصول جدید

          <div className="form-group mx-5 my-3">
          <label htmlFor="email">نام</label>
          <input onChange={(e)=>setName(e.target.value)} id="email" type="text" className="form-control" />
        </div>
        <div className="form-group mx-5 my-3">
          <label htmlFor="email">قیمت</label>
          <input onChange={(e)=>setPrice(e.target.value)} id="email" type="text" className="form-control" />
        </div>
   
        <div className="form-group mx-5 my-3">
          <label htmlFor="email">مشخصات</label>
          <textarea className="form-control" onChange={(e)=>setDescription(e.target.value)}  name="" id="message" cols="30" rows="3"></textarea>
        </div>
        <div className="form-group mx-5 my-3">
          <label htmlFor="image">آپلود عکس</label>
          <input onChange={(e) => handleFileInputChange(e)} id="image" type="file" className="form-control" />
        </div>


        <div className="mx-5">
            <button className="btn btn-success w-100" onClick={addProduct}>افزودن محصول</button>
          </div>
        </div>

        <div className="container-fluid col-sm-10 p-4" style={{ display: showHidden ==4 ? 'block' : 'none' }}>
            <div className="p-2">
            <p className="text-success">{responseMessage}</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">نام:</p>
            <p className="">{name}</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">قیمت</p>
            <p className="">{price}</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">مسیر عکس</p>
            <p className="">{imgPath}</p>
          </div>

          <div className="p-2 shadow-sm">
            <p className="">توضیحات</p>
            <p className="">{description}</p>
          </div>
        </div>

        <div className="container-fluid col-sm-10 p-4" style={{ display: showHidden ==5 ? 'block' : 'none' }}>
          <Products></Products>
        </div>

      </div>
    </>
    );
}

export default AdminPanel;
