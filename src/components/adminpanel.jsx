import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faDove, faProcedures, faUser, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import axios from 'axios';

library.add(faCoffee);

function AdminPanel() {
  const [showHidden, setShowHidden] = useState();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [numberOfLikes, setNumberOfLikes] = useState("");
  const [description, setDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  async function handleClick(e) {
    e.preventDefault();
    try {
      const addProduct = {
        name,
        price,
        numberOfLikes,
        description,
      };
  
      console.log(addProduct);
  
      const response = await axios.post(`http://localhost:5000/api/products/addproduct`,addProduct);
      console.log(response.data.message);
      console.log(response.data);
      setResponseMessage(response.data.message)
      setShowHidden(4)
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
    }
  }

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
          <li className="nav-item m-auto p-2 shadow-sm">
            <a className="nav-link text-black" href="#" onClick={() => setShowHidden(3)}>
            <i className="px-2" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faProcedures} /></i>
              محصولات
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
            <p className="">۳۳۴</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">قیمت:</p>
            <p className="">۱۲۳۴۵۰۰۰ تومان</p>
          </div>
        </div>


        <div className="container-fluid col-sm-10 px-5" style={{ display: showHidden ==3 ? 'block' : 'none' }}>

          <div className="form-group mx-5 my-3">
          <label htmlFor="email">نام</label>
          <input onChange={(e)=>setName(e.target.value)} id="email" type="text" className="form-control" />
        </div>
        <div className="form-group mx-5 my-3">
          <label htmlFor="email">قیمت</label>
          <input onChange={(e)=>setPrice(e.target.value)} id="email" type="text" className="form-control" />
        </div>
        <div className="form-group mx-5 my-3">
          <label htmlFor="email">لایک</label>
          <input onChange={(e)=>setNumberOfLikes(e.target.value)} id="email" type="text" className="form-control" />
        </div>
        <div className="form-group mx-5 my-3">
          <label htmlFor="email">مشخصات</label>
          <textarea className="form-control" onChange={(e)=>setDescription(e.target.value)}  name="" id="message" cols="30" rows="3"></textarea>
        </div>
        <div className="mx-5">
            <button className="btn btn-success w-100" onClick={handleClick}>افزودن محصول</button>
          </div>
        </div>

        <div className="container-fluid col-sm-11 p-4" style={{ display:'block'}}>
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
            <p className="">توضیحات</p>
            <p className="">{description}</p>
          </div>
        </div>

      </div>
    </>
  );
}

export default AdminPanel;
