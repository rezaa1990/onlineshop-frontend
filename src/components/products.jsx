import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faFaceAngry, faGolfBall, faLaughWink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import p1 from "./../images/p1.jpeg"

function Products() {
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

  async function updateProduct(id) {
    try {
      const updateData = {
        name,
        price,
        numberOfLikes,
        description,
        imgPath
      }
      console.log(id);
      const response = await axios.put(`http://localhost:5000/api/products/updateproduct/${id}`, updateData)
      console.log(response.data.message);
      console.log(response.data);
      alert(response.data.message)
      closeForm();
    } catch (error) {
      console.error('خطا:', error);
    }
  }

  async function deleteProduct(id) {
    try {
      console.log(id);
      const response = await axios.delete(`http://localhost:5000/api/products/deleteproduct/${id}`)
      console.log(response.data.message);
      console.log(response.data);
      alert(response.data.message)
    } catch (error) {
      console.error('خطا:', error);
    }
  }

  const middleFunction = (id) => {
    setId(id);
    openForm()
  }

  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

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
                    <div className="text-right">
                      <button onClick={() => middleFunction(product._id)} className="btn btn-outline-success my-1 w-100">بروزرسانی</button>
                      <button onClick={()=>deleteProduct(product._id)} className="btn btn-outline-danger my-1 w-100">حذف</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal Form */}
      {isFormVisible && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">بروزرسانی محصول</h5>
            
              </div>
              <div className="modal-body">
                
                <input className="form-control my-1" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="نام محصول" />
                <input className="form-control my-1" type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="قیمت" />
                <input className="form-control my-1" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="توضیحات" />
                <input className="form-control my-1" type="text" value={imgPath} onChange={(e) => setImgPath(e.target.value)} placeholder="مسیر ذخیر سازی" />
                
              </div>
              <div className="modal-footer justify-content-between">
                <button type="button" className="btn btn-success" onClick={() => updateProduct(id)}>
                  تایید
                </button>
                <button type="button" className="btn btn-secondary" onClick={closeForm}>
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
