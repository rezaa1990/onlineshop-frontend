import React, {useContext } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faFaceAngry, faGolfBall, faLaughWink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import p1 from "./../images/p1.jpeg"
import AppContext from '../context/context';

function Products() {
  const{
    products,
    setProducts,
    id,
    setId,
    updateName,
    setUpdateName,
    updatePrice,
    setUpdatePrice,
    updateNumberOfLikes,
    setUpdateNumberOfLikes,
    updateDescription,
    setUpdateDescription,
    updateImg,
    setUpdateImg,
    isFormVisible,
    setIsFormVisible,
    updateProduct,
    middleFunction,
    closeForm,
    openForm,
    deleteProduct,
    useEffect,
  }=useContext(AppContext);

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
                
                <input className="form-control my-1" type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} placeholder="نام محصول" />
                <input className="form-control my-1" type="text" value={updatePrice} onChange={(e) => setUpdatePrice(e.target.value)} placeholder="قیمت" />
                <input className="form-control my-1" type="text" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} placeholder="توضیحات" />
                <input className="form-control my-1" type="text" value={updateImg} onChange={(e) => setUpdateImg(e.target.value)} placeholder="تصویر محصول" />
                
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
