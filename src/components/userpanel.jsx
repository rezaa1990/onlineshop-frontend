import { library } from '@fortawesome/fontawesome-svg-core';
import { faBasketShopping, faCoffee, faDove, faProcedures, faUser, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import pp from "./../images/pp.jpg";
import p1 from "./../images/p1.jpeg"

// library.add(faCoffee);

function UserPanel() {
  const [showHidden, setShowHidden] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const config = {
    headers: {
      'token1': `${userToken}`
    }
    };

    axios.get(`http://localhost:5000/api/user/me`,config)
      .then(response => {
        console.log("user",response);
        console.log("pro", response.data.data);
        const p = response.data.data;
        setUser(p);
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  async function deleteFromBasket(userId,basketId) {
    console.log('userid:',userId,'basketid',basketId);

    const userToken = localStorage.getItem('userToken');
    const config = {
      headers: {
      'token1': `${userToken}`
      }
    };

    const data={
      userId,
      basketId
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/user/deletebasket`,data,config)
      console.log(response.data.message);
      console.log(response.data);
      alert(response.data.message)
    } catch (error) {
      console.error('خطا:', error);
    }
  }

  return (
    <>
      <div className="d-flex">
        <ul className="row nav col-sm-2 col-md-3 h-50">

        <li className="nav-item m-auto p-2 shadow-sm row">
          <img src={pp} alt="" className="w-50" style={{}}/>
          <div className="">
            <a href="" className="ps-1 text-muted">{user.fName}</a>
            <a href="" className="ps-1 text-muted">{user.lName}</a>
          </div>
        </li>

        <li className="nav-item m-auto p-2 shadow-sm">
            <a className="nav-link text-black" href="#" onClick={() => setShowHidden(1)}>
            <i className="px-2" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faUser} /></i>
               اطلاعات کاربری
            </a>
        </li>
       
        <li className="nav-item m-auto p-2 shadow-sm">
            <a className="nav-link text-black" href="#" onClick={() => setShowHidden(2)}>
            <i className="px-2" style={{ fontSize: '15px' }}><FontAwesomeIcon icon={faBasketShopping} /></i>
              سبد خرید
              </a>
          </li>
        </ul>

        <div className="container-fluid col-sm-10 col-md-9 p-4" style={{ display: showHidden ==1 ? 'block' : 'none' }}>
          <div className="p-2 shadow-sm">
            <p className="">نام:</p>
            <p className="">{user.fName}</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className=""> نام خانوادگی:</p>
            <p className="">{user.lName}</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">ایمیل:</p>
            <p className="">{user.email}</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">شماره تماس:</p>
            <p className="">{user.mobile}</p>
          </div>
          <div className="p-2 shadow-sm">
            <p className="">آدرس:</p>
            <p className="">{user.address}</p>
          </div>
        </div>

        <div className="container-fluid col-sm-10 col-md-9 p-4" style={{ display: showHidden ==2 ? 'block' : 'none' }}>
        <section className='p-5'>
        <div className="container-fluid">
          <h1 className="text-center mb-5">سبد خرید</h1>
          <div className="row">
            {user.basket?.map((basket) =>
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
                      <button onClick={()=>deleteFromBasket(user._id,basket._id)} className="btn btn-outline-danger my-1 w-100">حذف</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="text-right">
                      <button onClick={''} className="btn btn-success my-1 w-100">ادامه و خرید</button>
                    </div>
        </div>
      </section>
        </div>


      </div>
    </>
  );
}

export default UserPanel;
