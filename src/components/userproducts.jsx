import React, {useEffect,useContext, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faFaceAngry, faGolfBall, faHeart, faLaughWink, faListCheck, faShoppingBasket, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import p1 from "./../images/p1.jpeg"
import redHeart from "./../images/redheart.png"
import defaultHeart from "./../images/defaultheart.png"
import basket from "./../images/basket.png"
import fullBasket from "./../images/full-basket.png"
import emptyBasket from "./../images/empty-basket.png"
import AppContext from '../context/context';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Banner from './banner';
const apiUrl = process.env.REACT_APP_CUSTOM_URL;// "http://localhost:5000"
// import eee from "http://localhost:5000/home/reza/Desktop/node-shop/src/routes/image/uploads/m1.jpeg"

function UserProducts() {
  let currentDate = new Date();
  const navigate = useNavigate();
  const {
    user,
    products, 
    setProducts,
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
    likeIconColors,
    moreDataAboutProduct,
    allDataAboutProduct,
    setAllDataAboutProduct,
    commentResponse,
    setCommentResponse,
    server,
    fullDescription, 
    setFullDescription,
    replyComment, 
    setReplyComments,
    numberOfSelectedProduct, 
    setNumberOfSelectedProduct,
    indexOfSelectedProduct , 
    setIndexOfSelectedProducts,
    handleClick,
    toggleDescription,
    deleteComment,
    approveComment,
    likeComment,
    replyToComment,
    handleRyplyComment,
    addReplyToComment,
    setProductId,
    changeNumber,
    id1 , 
    setId1,
    oneProduct , 
    setOneProduct,
    searchValue,
    setSearchValue,
    component,
    reRenderComponentFunc,
    navSearchInputValue,
    responseMessage
  }=useContext(AppContext);

  useEffect(()=>{
    fetchData();
  },[]);

  function setOneProductMiddleFunction(product,e){
    e.preventDefault();
    setOneProduct(product);
    navigate("/oneproduct");
  }

  function oneProductMiddleFunc(navigateDestination) {
    setCommentResponse(null);
    navigate(navigateDestination);
  }

  const [addToBasketSelectedProduct, setAddToBasketSelectedProduct] = useState();
  async function addToBasketMiddleFunction(productId, numberOfproduct) {
    await addToBasket(productId, numberOfproduct)
    if (addToBasketSelectedProduct && addToBasketSelectedProduct == productId) {
      console.log(addToBasketSelectedProduct)
    } else {
      setAddToBasketSelectedProduct(productId);
    }
  }

return (
    <>
    <section className='userproduct'>
      <Banner></Banner>
        <div className="container-fluid pt-5">
          <h1 className="text-center text-light mb-5">محصولات</h1>
          <div className="row" id='user-product-custom-height' style={{overflow:"auto"}}>

          {userProducts
            
            .filter(product => {
              const searchString = navSearchInputValue;
              return (
                (!searchValue || product.category === searchValue)
                &&
                (!searchString || product.category.includes(searchString) || product.name.includes(searchString))
              )
            })
            .map((product, index) => (
              <div className="col-12 col-md-6 col-lg-4 mb-5 px-3" key={index}>
                {/* card */}
                <div className="card p-1" id='card'>
                  {/* card img */}
                    <img
                      className='w-100'
                      key={index}
                      src={require(`./../images/panel-img/${product.images[0].imagePath.substring(55)}`)}
                      alt={`image_${index}`}
                    />


                  {/* card body */}
                  <div className="card-body">

                  <div className="card-discount d-flex">
                      <h6 className="text-warning col-6 text-center" style={{display:(product?.discount?.value ? "block" : "none")}}> تخفیف {(product?.discount?.value)*100}%</h6>
                      
                      {
                        product?.discount ?  
                        <h6 className="text-warning col-6 text-center">{product.price * product?.discount?.value} تومان </h6> 
                        :
                        <h6 className="text-warning col-6 text-center">{product.price} تومان </h6>
                      }
                     
                  </div>

                    {/* card title */}
                    <div className="card-title">
                      <h3 className="text-light text-center">{product.name}</h3>
                    </div>

                      {/* card description */}
                    {/* <div className="card-subtitle my-4 text-center">
                      
                    <p className="text-light" onClick={() => toggleDescription(product._id)} style={{cursor:"context-menu"}}>
                      {fullDescription.includes(product._id)
                        ? 
                        (
                          <p className='text-center'>
                            {product.description} 
                            <span className="text-light row me-1"> بستن توضیحات </span>
                          </p>
                        )
                        : 
                        (
                         <>
                            {product.description.substring(0, 5)}
                           {product.description?.length > 5 && (
                             <span className="text-light me-1">مشاهده ی توضیحات ...</span>
                            )}
                          </>
                       )
                      }
                    </p>

                    </div> */}
                        {/*add to basket and like */}
                    <div className="d-flex align-items-center">

                      <div className="col-7 p-3 text-center">
                        <p className="ms-auto" onClick={()=>addToBasketMiddleFunction(product._id , indexOfSelectedProduct == product._id ?  numberOfSelectedProduct : 1)}>
                          <i className="" style={{ fontSize: '15px',cursor:'pointer'}}>
                            {/* <img
                           src={
                            (user.basket?.map((b) => b._id) || []).includes(product._id)
                              ? fullBasket
                              : emptyBasket
                          }
                              className="basket" style={{ cursor: 'pointer', width: '45px', height: '40px' }}
                            /> */}
                            <button className="btn btn-sm text-light rounded-3 border mt-3">افزودن به سبد</button>
                          </i>
                        </p>
                        
                      </div>

                      <div className="col-3 p-3 d-flex align-items-center justify-content-center">
                          <button className='btn btn-sm text-light rounded-3 border' id='basket-button' style={{border:"1px white solid", fontSize:"15px"}} onClick={()=>setProductId(product._id,0)}>-</button>
                          <span className='text-light text-center col- p-1' style={{fontSize:"22px"}}>{indexOfSelectedProduct == product._id ?  numberOfSelectedProduct : 1}</span>
                          <button className='btn btn-sm text-light rounded-3 border' id='basket-button' style={{}} onClick={()=>setProductId(product._id,1)}>+</button>
                      </div>

                      <div className="col-2 p-3 text-center mt-3">
                        <p className="d-flex me-auto text-light">
                          <span className='col-4'>{product.numberOfLikes?.length}</span>                       
                          <i className="col-8 m-md-1" onClick={()=>addLike(product._id,product)} style={{ fontSize: '10px',cursor:'pointer'}}>
                            <img src={product.numberOfLikes?.includes(userId) ? redHeart : defaultHeart} className="heart" style={{cursor:'pointer', width: '20px', height: '20px'}}/>
                          </i>
                        </p>
                      </div>
                      <div className="text-warning text-center" style={{ display: addToBasketSelectedProduct === product._id ? "block" : "none" }}>{responseMessage}</div>

                    </div>
                  </div>

                  {/* card comment  */}
                  {/* <button className='btn text-muted' onClick={() => handleClick(product._id)} style={{display: id1.includes(product._id ) ? "none" : "none"}}>دیدن نظرات  ⇓</button>
                  <div className="comments text-center" style={{ minHeight: "200px",display: id1.includes(product._id ) ? "block" : "none"}}>
                    <form className="m-2">
                      <div className="">
                        <textarea
                          value={comments[product._id] || ''}
                          onChange={(e)=>handleCommentChange(product._id, e.target.value)}
                          className="form-control"
                          id="comment-text-area"
                          cols="30"
                          rows="2"
                          placeholder='نظر خود را بنویسید ...'
                          style={{outline:"none",boxShadow: "none"}}>
                        </textarea>
                        <div className="">
                          <button onClick={(e)=>addComment(product._id,e)} className="btn btn-sm text-light m-1 w-50" id='add-comment-button' style={{border:"1px solid white"}}>ثبت نظر</button>
                        </div>
                        
                      </div>
                    </form> */}

                    {/* response comment meesage */}
                    {/* <div className="bg-light m-2 p-3 border rounded" style={{ display:commentResponse == null ? "none" : "block",    position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 9999}}>
                      <p className="m-1">{commentResponse}</p>
                      <div>
                        <div className="">
                          <button className='btn btn-primary btn-sm  m-1' onClick={()=>Navigate("/login")}>ورود</button>
                          <button className='btn btn-primary btn-sm  m-1' onClick={()=>Navigate("/register")}>ثبت نام</button>
                        </div>
                      </div>
                      <div style={{ position: 'absolute', top: '0', right: '0' }}>
                        <button className='btn btn-sm' onClick={()=>setCommentResponse(null)}>×</button>
                      </div>
                    </div> */}
                    

                    {/* <div className="comments text-center mx-2 border mt-5 rounded" style={{ minHeight: "300px"}}>
                     
                      <p className="text-center text-light mt-3"> نظرات دیگران</p>

                      <div className="border mx-2" style={{  maxHeight: "220px",overflow: "auto"}}>

                          {product.comments?.map((comment)=>
                      <div className="mx-1 border m-3 rounded">
                          <div className="">
                            <p className="text-light pt-2 rounded"style={{fontSize:"14px"}} >{comment?.text}</p>
                            <div className="d-flex justify-content-end">
                              <p className="text-light rounded pt-3"style={{fontSize:"14px"}} >{comment?.likes.length}</p>
                              <button className="btn pe-0 text-light" onClick={()=>likeComment(comment._id,userId)}>پسندیدن</button>
                            </div>
                          </div>
                          <div className="">
                            <textarea
                              value={replyComment}
                              onChange={(e)=>handleRyplyComment(e.target.value)}
                              className="form-control"
                              id="reply-comment-text-area"
                              cols="30"
                              rows="1"
                              placeholder='ریپلای'
                            style={{outline:"none",boxShadow: "none"}}>
                            </textarea>
                            <div className="">
                              <button onClick={(e)=>replyToComment(replyComment,comment._id,userId,e)} className="btn btn-sm m-1 w-100">تایید </button>
                            </div>
                          </div>
                            <p className="col-2 bg-info p-1 m-1">{console.log("111",currentDate.toLocaleDateString() ,"222", new Date(coments?.updatedAt))}</p>
                            {comment.author?.map((author)=>
                            <p className="justify-content-end pt-3 col-3 text-start" style={{fontSize:"11px"}}>{author?.fName}</p>
                            )}
                        </div>
                        )}
                        </div>
                    </div> */}

                  {/* </div> */}
                  <button className='btn text-muted' onClick={() => handleClick(product._id)} style={{display: id1.includes(product._id ) ? "none" : "none"}}>بستن نظرات  ⇑</button>
                  <button className='btn text-light' onClick={(e)=>setOneProductMiddleFunction(product,e)}>بیشتر ... </button>
                </div>
                
              </div>
            ))
          }

        </div>
        
          {/* response comment meesage */}
          <div
          className="bg-light m-2 p-3 rounded "
          style={{
            display: commentResponse == null ? "none" : "block",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <p className="m-1">{commentResponse}</p>
          <div>
            <div className="d-flex">
              <div className="me-auto">
                <button
                className="btn btn-primary btn-sm  m-1"
                onClick={() => oneProductMiddleFunc("/login")}
              >
                ورود
                </button>
              </div>
              <div className="ms-auto">
                <button
                className="btn btn-primary btn-sm  m-1"
                onClick={() => oneProductMiddleFunc("/register")}
              >
                ثبت نام
                </button>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", top: "0", right: "0" }}>
            <button
              className="btn btn-sm"
              onClick={() => setCommentResponse(null)}
            >
              ×
            </button>
          </div>
          </div>
        
        </div>
      </section>
    </>
  );
}

export default UserProducts;
