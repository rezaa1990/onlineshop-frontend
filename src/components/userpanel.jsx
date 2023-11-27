import { library } from '@fortawesome/fontawesome-svg-core';
import { faBasketShopping, faCoffee, faDove, faProcedures, faUser, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect,useContext, useState } from 'react';
import pp from "./../images/pp.jpg";
import p1 from "./../images/p1.jpeg"
import AppContext from '../context/context';
import axios from 'axios';

function UserPanel() {

  const[clientFName , setClientFName]= useState();
  const[clientLName , setClientLName]= useState();
  const[clientEmail , setClientEmail]= useState();
  const[clientMobile , setClientMobile]= useState();
  const[clientAddress , setClientAddress]= useState();
  const[clientPostalCode , setClientPostalCode]= useState();
  const[clientOrder , setClientOrder]= useState();
  const[clientCash , setClientCash]= useState();
  const[clientSendToPost , setClientSendToPost]= useState();
  const[order,setOrder] = useState();
  const[orderMeesage,setOrderResponseMessage] = useState();

  const{
    user,
    setUser,
    userPanelShowHidden,
    setUserPanelShowHidden,
    userPanelGetUser,
    deleteFromBasket,
  }=useContext(AppContext);

  useEffect(() => {
    userPanelGetUser();
  },[]);

  async function makeInvoice(e) {
    e.preventDefault();
    try {
      const addInvoice = {
        FName:clientFName,
        LName:clientLName,
        mobile:clientMobile,
        email:clientEmail,
        address:clientAddress,
        postalCode:clientPostalCode,
        productsId:user.basket
      };
      console.log(addInvoice);
      const response = await axios.post(`http://localhost:5000/api/order/addorder`,addInvoice);
      console.log(response.data);
      console.log(response.data.data.products);
      setOrder(response.data.data.products);
      console.log(order);
      setUserPanelShowHidden(4)
      setClientFName();
      setClientLName();
      setClientEmail();
      setClientMobile();
      setClientAddress();
      setClientPostalCode();
    } catch (error) {
      console.error('خطا:', error);
      console.log(error.response.data.message);
      setOrderResponseMessage(error.response.data.message)
    }
  }

  return (
    <>
      <div className="d-flex">
        <ul className="row nav col-sm-2 col-md-3 h-50">

        <li className="nav-item m-auto p-2 shadow-sm row">
          <img src={pp} alt="" className="w-50" style={{}}/>
          <div className="">
            <a href="" className="ps-1 text-muted">{user?.fName}</a>
            <a href="" className="ps-1 text-muted">{user?.lName}</a>
          </div>
        </li>

        <li className="nav-item m-auto p-2 shadow-sm">
            <a className="nav-link text-black" href="#" onClick={() => setUserPanelShowHidden(1)}>
            <i className="px-2" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faUser} /></i>
               اطلاعات کاربری
            </a>
        </li>
       
        <li className="nav-item m-auto p-2 shadow-sm">
            <a className="nav-link text-black" href="#" onClick={() => setUserPanelShowHidden(2)}>
            <i className="px-2" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faBasketShopping} /></i>
              سبد خرید
              </a>
          </li>
        </ul>

        <div className="container-fluid col-sm-10 col-md-9 p-4" style={{ display: userPanelShowHidden ==1 ? 'block' : 'none' }}>
          <div className="p-2 shadow-sm">
            <p className="">نام:</p>
            <p className="">{user?.fName}</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className=""> نام خانوادگی:</p>
            <p className="">{user?.lName}</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">ایمیل:</p>
            <p className="">{user?.email}</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">شماره تماس:</p>
            <p className="">{user?.mobile}</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">آدرس:</p>
            <p className="">{user?.address}</p>
          </div>
        </div>

        <div className="container-fluid col-sm-10 col-md-9 p-4" style={{ display: userPanelShowHidden ==2 ? 'block' : 'none' }}>
          <section className='p-5'>
            <div className="container-fluid">
            <h1 className="text-center mb-5">سبد خرید</h1>
            <div className="row">
            {user?.basket?.map((basket) =>
              <div className="col-lg-3 col-md-6 mb-5 px-3">
                <div className="card">
                  <img src={p1} alt="" className="card-img-top" />
                  <div className="card-body">
                    <div className="card-title">
                      <h3 className="text-secondary">{basket.name}</h3>
                    </div>
                    <div className="card-subtitle my-4">
                      <p className="text-muted">{basket.description}</p>
                    </div>
                    <div className="text-right">
                      <button onClick={()=>deleteFromBasket(user._id,basket._id)} className="btn btn-outline-danger my-1 w-100">حذف از سبد</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </div>
            <div className="text-right">
              <button onClick={() => setUserPanelShowHidden(3)} className="btn btn-outline-success my-1 w-100"> ادامه </button>
              </div>
            </div>
          </section>
        </div>

        <div className="container-fluid col-sm-10 col-md-9 p-4" style={{ display: userPanelShowHidden ==3 ? 'block' : 'none' }}>
          <div className="container">

    <div className="row justify-content-center">
    <div className="col-lg-6">
      <h3 className="m-5">مشخصات</h3>

      <div className="form-group mx-5">
       <p className="text-center text-danger ">{''}</p>
      </div>

      <form action="" className="text-muted mb-5">

      <div className="form-group mx-5 text-danger text-center">{orderMeesage}</div>

        <div className="form-group mx-5">
          <label htmlFor="name">نام</label>
          <input value={clientFName} onChange={(e)=>setClientFName(e.target.value)} id="name" type="text" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="name">نام خانوادگی</label>
          <input value={clientLName} onChange={(e)=>setClientLName(e.target.value)} id="fname" type="text" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="name">ایمیل</label>
          <input value={clientEmail} onChange={(e)=>setClientEmail(e.target.value)} id="lname" type="text" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="name">موبایل</label>
          <input value={clientMobile} onChange={(e)=>setClientMobile(e.target.value)} id="mobile" type="number" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="name">آدرس</label>
          <input value={clientAddress} onChange={(e)=>setClientAddress(e.target.value)} id="address" type="text" className="form-control" />
        </div>

        <div className="form-group mx-5">
          <label htmlFor="name">کد پستی</label>
          <input value={clientPostalCode} onChange={(e)=>setClientPostalCode(e.target.value)} id="postalcode" type="number" className="form-control" />
        </div>
        <div className="form-group mx-5 d-flex">
          <button onClick={makeInvoice} className="btn btn-outline-success m-1 w-100">صدور فاکتور</button>
          <button onClick={() => setUserPanelShowHidden(2)} className="btn btn-outline-success m-1 w-100"> بازگشت </button>
        </div>
      </form>
    </div>
  </div>

          </div>
        </div>

        <div className="container-fluid col-sm-10 col-md-9 p-4" style={{ display: userPanelShowHidden ==4 ? 'block' : 'none' }}>
          <div className="container">
          <h4>فاکتور</h4>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>نام کالا</th>
                <th>تعداد</th>
                <th>قیمت واحد</th>
                <th>قیمت کل</th>
      {/* سایر ستون‌ها */}
              </tr>
            </thead>
            <tbody>
              {order?.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.name}</td>
                <td>{1}</td>
                <td>{order.price}</td>
                <td>{order.price}</td>
                
              </tr>
              ))}
              <tr>
                <td className='' colSpan="4">جمع کل</td>
                <td className='bg-secondary'>
                {order?.reduce((total, product) => total + product.price * 1, 0)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="form-group mx-5 d-flex">
          <button onClick={() => setUserPanelShowHidden(4)} className="btn btn-outline-success m-1 w-100">پرداخت و ثبت سفارش</button>
          <button onClick={() => setUserPanelShowHidden(3)} className="btn btn-outline-success m-1 w-100"> بازگشت </button>
        </div>

          </div>
        </div>
  
      </div>
    </>
  );
}

export default UserPanel;
