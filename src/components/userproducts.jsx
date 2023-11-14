import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faFaceAngry, faGolfBall, faHeart, faLaughWink, faListCheck, faShoppingBasket, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import p1 from "./../images/p1.jpeg"

function UserProducts() {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [numberOfLikes, setNumberOfLikes] = useState("");
  const [description, setDescription] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/getproducts`)
      .then(response => {
        console.log(response.data.message);
        console.log("pro", response.data.data.products);
        const p = response.data.data.products;
        setProducts(p);
        console.log(products);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
                     <p className="col-6 text-end p-3"> <i className="" style={{ fontSize: '15px'}}><FontAwesomeIcon icon={faShoppingBasket} /></i></p>
                     
                     <div className="col-6 p-3 d-flex">
                      <p className="me-auto">{product.numberOfLikes}</p>
                      <i className="p-1" style={{ fontSize: '15px'}}><FontAwesomeIcon icon={faHeart} /></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProducts;
