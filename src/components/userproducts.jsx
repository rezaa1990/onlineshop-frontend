import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faFaceAngry, faGolfBall, faHeart, faLaughWink, faListCheck, faShoppingBasket, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import p1 from "./../images/p1.jpeg"
import { Await } from 'react-router-dom';
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UserProducts() {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
useEffect(() => {
  const fetchData = async () => {
    try {
      const productResponse = await axios.get(`http://localhost:5000/api/products/getproducts`);
      console.log(productResponse.data.message);
      const productsData = productResponse.data.data.products;
      setProducts(productsData);
      getUser();
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
async function getUser () {
    const userToken = localStorage.getItem('userToken');
    const config = {
      headers: {
        'token1': `${userToken}`
      }
    };
    console.log(config);
    axios.get(`http://localhost:5000/api/user/me`,config)
      .then(response => {
        // console.log("user",response);
        console.log("pro", response.data);
        const id = response.data.data._id;
        console.log(id);
        setUserId(id);
        console.log(userId);
      })
      .catch(error => {
        console.log(error);
      });
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async function addToBasket(productId) {
    try {
      const userToken = localStorage.getItem('userToken');
      const config = {
        headers: {
          'token1': `${userToken}`
        }
      };
      
      const updateData = {
        productId,

      };
      console.log(updateData);
      console.log(userId);
      const response = await axios.put(`http://localhost:5000/api/user/updateuser/${userId}`, updateData,config);
      console.log(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <section className='p-5'>
        <div className="container-fluid">
          <h1 className="text-center mb-5">محصولات</h1>
          <div className="row">
            {products.map((product) =>
              <div className="col-lg-3 col-md-6 mb-5 px-3">
                <div className="card">
                  <img src={p1} alt="" className="card-img-top" />
                  <div className="card-body">
                    <div className="card-title">
                      <h3 className="text-secondary">{product.name}</h3>
                    </div>
                    <div className="card-subtitle my-4">
                      <p className="text-muted">{product.description}</p>
                    </div>


                    <div className="row" style={{borderTop: '1px solid' }}>

                      <p className="col-6 text-end p-3" onClick={()=>addToBasket(product._id)}>
                        <i className="buylike p-2" style={{ fontSize: '15px',cursor:'pointer'}}><FontAwesomeIcon icon={faShoppingBasket} /></i>
                      </p>
                     
                      <div className="col-6 p-3 d-flex">
                        <p className="me-auto">
                          {product.numberOfLikes}                        
                          <i className="p-2 buylike" style={{ fontSize: '15px',cursor:'pointer'}}><FontAwesomeIcon icon={faHeart} /></i>
                        </p>
                      </div>

                    </div>


                  </div>
                </div>
              </div>
            )}buylike
          </div>
        </div>
      </section>
    </>
  );
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default UserProducts;
