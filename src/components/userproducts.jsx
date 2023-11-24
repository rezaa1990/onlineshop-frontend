import React, {useEffect,useContext } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faFaceAngry, faGolfBall, faHeart, faLaughWink, faListCheck, faShoppingBasket, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import p1 from "./../images/p1.jpeg"
import AppContext from '../context/context';

function UserProducts() {
  const{
    userProducts,
    setUserProducts,
    userId,
    setUserId,
    comments,
    setComments,
    addComment,
    addThisCommentToProduct,
    handleCommentChange,
    addLike,
    addToBasket,
    getUser,
    fetchData,
  }=useContext(AppContext);

  useEffect(()=>{
    fetchData();
  },[]);

return (
    <>
      <section className='p-5'>
        <div className="container-fluid">
          <h1 className="text-center mb-5">محصولات</h1>
          <div className="row">
            {userProducts.map((product) =>
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
                          {product.numberOfLikes?.length}                        
                          <i className="p-2 buylike" onClick={()=>addLike(product._id)} style={{ fontSize: '15px',cursor:'pointer'}}><FontAwesomeIcon icon={faHeart} /></i>
                        </p>
                      </div>

                    </div>


                  </div>


                  <div className="comments" style={{  minHeight: "200px"}}>

                    <form className="m-2">
                      <div className="input-group">
                        {/* <input placeholder='نظر خود را بنویسید ...' onChange={(e) => addComment(e.target.value)} id="" type="text" className="form-control" /> */}
                        <textarea
                          value={comments[product._id] || ''}
                          onChange={(e)=>handleCommentChange(product._id, e.target.value)}
                          className="form-control"
                          id="message"
                          cols="30"
                          rows="1"
                          placeholder='نظر خود را بنویسید ...'>
                        </textarea>
                        <div className=""><button onClick={(e)=>addComment(product._id,e)} className="btn btn-secondary">ثبت نظر</button></div>
                      </div>
                    </form>

                    <div className="m-1" style={{  maxHeight: "100px"}}>
                      <p className="text-secondary text-center"> نظرات دیگران</p>

                      <div className="shadow-sm" style={{  maxHeight: "100px",overflow: "auto"}}>

                        {product.comments?.map((coments)=>
                        <div className="row mx-1 shadow-sm">
                          <p className="col-6">{coments?.text}</p>
                          {coments.author?.map((author)=>
                          <p className="col-6 text-start">{author?.fName}</p>
                          )}
                        </div>
                        )}

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
