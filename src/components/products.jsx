import React, {useContext, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faFaceAngry, faGolfBall, faLaughWink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import p1 from "./../images/p1.jpeg"
import AppContext from '../context/context';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


function Products() {
  const{
    server,
    //admin
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
    setCategory,
    setNumberOfProduct,
    serialNumber,
    setSerialNumber,
    //producti ke dakhele admine
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
    updateCategory,
    setUpdateCategory,
    updateNumberOfProduct ,
    setUpdateNumberOfProduct,
    isFormVisible,
    setIsFormVisible,
    updateProduct,
    middleFunction,
    closeForm,
    openForm,
    deleteProduct,
    useEffect,
    selectedProducts,
    setSelectedProducts,
    discountType,
    setDiscountType,
    discountValue, 
    setDiscountValue,
    discountExpireTime, 
    setDiscountExpireTime,
    createDiscount,
    addDiscountToProduct,
    removeDiscount,
    handleToggleProduct,
    handleDiscountSelection,
    updateSerialNumber , 
    setUpdateSerialNumber,
    //user product
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
    moreDataAboutProduct,
    allDataAboutProduct,
    setAllDataAboutProduct,
    commentResponse,
    setCommentResponse,
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
    //user panel
    user,
    setUser,
    userPanelShowHidden,
    setUserPanelShowHidden,
    userPanelGetUser,
    deleteFromBasket,
    orderMeesage,setOrderResponseMessage,
    orderId,
    setOrderId,
    factor , 
    setFactor,
    totalPrice , 
    setTotalPrice,
    sendingPostalInformation,
    IssuingInvoice,
    middleFunction1,
    clientFName , 
    setClientFName,
    clientLName , 
    setClientLName,
    clientEmail , 
    setClientEmail,
    clientMobile , 
    setClientMobile,
    clientAddress , 
    setClientAddress,
    clientPostalCode , 
    setClientPostalCode,
    //register
    fName,
    lName,
    email,
    mobile,
    address,
    password,
    repeatPassword,
    postalCode,
    setRegisterName,
    setLastName,
    setEmail,
    setMobile,
    setAddress ,
    setPassword,
    setRepeatPassword,
    setPostalCode,
    //login
    setLogInLogUot,
    //navbar
    logInLogUot,
    //contact
    senderName,
    setSenderName,
    senderEmail,
    setSenderEmail,
    content,
    setContent,
    sendMessageResponse,
    setSendMessageResponse,
    sendMessage,
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
                    <input
                      type="checkbox"
                      onChange={() => handleToggleProduct(product._id)}
                      checked={selectedProducts.includes(product._id)}
                    />
                      <button onClick={() => middleFunction(product._id)} className="btn btn-outline-success my-1 w-100">بروزرسانی</button>
                      <button onClick={()=>deleteProduct(product._id)} className="btn btn-outline-danger my-1 w-100">۴حذف</button>


                      <button className='btn text-muted' onClick={() => handleClick(product._id)} style={{display: id1.includes(product._id ) ? "none" : "block"}}>دیدن نظرات  ⇓</button>
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
                    </form>

                    {/* response comment meesage */}
                    <div className="bg-light m-2 p-3 border rounded" style={{ display:commentResponse == null ? "none" : "block",    position: 'fixed',
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
                    </div>
                    

                    <div className="comments text-center mx-2 border mt-5 rounded" style={{ minHeight: "300px"}}>
                     
                      <p className="text-center text-lightbtn mt-3"> نظرات دیگران</p>

                      <div className="border mx-2" style={{  maxHeight: "220px",overflow: "auto"}}>

                          {product.comments?.map((comment)=>
                          <div className="row mx-1 border m-3 bg-light rounded">
                            <button className="btn" onClick={()=>deleteComment(comment._id)}>❌</button>
                            <button className="btn" onClick={()=>approveComment(comment._id)}>تایید</button>
                            <button className="btn" onClick={()=>likeComment(comment._id,userId)}>👍</button>
                            <p className="col-9 pt-3 text-end"style={{fontSize:"14px"}} >{comment?.text}</p>
                          <div className="">
                            <textarea
                              value={replyComment}
                              onChange={(e)=>handleRyplyComment(e.target.value)}
                              className="form-control"
                              id="message"
                              cols="30"
                              rows="1"
                              placeholder='ریپلای'
                            style={{outline:"none",boxShadow: "none"}}>
                            </textarea>
                            <div className="">
                              <button onClick={(e)=>replyToComment(replyComment,comment._id,userId,e)} className="btn btn-sm m-1 w-100">تایید </button>
                            </div>
                        
                          </div>
                            {/* <p className="col-2 bg-info p-1 m-1">{console.log("111",currentDate.toLocaleDateString() ,"222", new Date(coments?.updatedAt))}</p> */}
                            {comment.author?.map((author)=>
                            <p className="justify-content-end pt-3 col-3 text-start" style={{fontSize:"11px"}}>{author?.fName}</p>
                            
                            )}

                        </div>
                        
                        )}
                      </div>
                   </div>

                  </div>
                  <button className='btn text-muted' onClick={() => handleClick(product._id)} style={{display: id1.includes(product._id ) ? "block" : "none"}}>بستن نظرات  ⇑</button>



                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>



      {/* ایجاد تخفیف */}
      <div className="">
      <div className="">
      <p className="">ایجاد تخفیف</p>

      {/* چک باکس برای انتخاب نوع تخفیف */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={discountType === 'percentage'}
            onChange={() => handleDiscountSelection('percentage')}
          />
          تخفیف درصدی
        </label>
        <label>
          <input
            type="checkbox"
            checked={discountType === 'amount'}
            onChange={() => handleDiscountSelection('amount')}
          />
          تخفیف مقداری
        </label>
      </div>
      <input value={discountValue} onChange={(e)=>setDiscountValue (e.target.value)} type="text" placeholder='میزان تخفیف' className="" />
      <input value={discountExpireTime} onChange={(e)=>setDiscountExpireTime(e.target.value)} type="text" placeholder='زمان انقضا' className="" />
      <button onClick={() => createDiscount(discountType, discountValue, discountExpireTime,selectedProducts)} className="btn btn-outline-warning my-1 w-100">اعمال تخفیف</button>
      <button onClick={() => removeDiscount(selectedProducts)} className="btn btn-outline-warning my-1 w-100">حذف تخفیف</button>
      </div>
    </div>





      {/* Modal Form */}
      {isFormVisible && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">بروزرسانی محصول</h5>
            
              </div>
              <div className="modal-body">
              <input className="form-control my-1" type="text" value={updateNumberOfProduct} onChange={(e) => setUpdateNumberOfProduct(e.target.value)} placeholder="تعداد محصول" />
                <input className="form-control my-1" type="text" value={updateCategory} onChange={(e) => setUpdateCategory(e.target.value)} placeholder="دسته بندی محصول" />
                <input className="form-control my-1" type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} placeholder="نام محصول" />
                <input className="form-control my-1" type="text" value={updatePrice} onChange={(e) => setUpdatePrice(e.target.value)} placeholder="قیمت" />
                <input className="form-control my-1" type="text" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} placeholder="توضیحات" />
                <input className="form-control my-1" type="text" value={updateSerialNumber} onChange={(e) => setUpdateSerialNumber(e.target.value)} placeholder="شماره سریال" />
                {/* <input className="form-control my-1" type="text" value={updateImg} onChange={(e) => setUpdateImg(e.target.value)} placeholder="تصویر محصول" /> */}
                <div className="form-group mx-5 my-3">
                  <label htmlFor="image">آپلود عکس</label>
                  <input value={updateImg} onChange={(e) => setUpdateImg(e.target.value)} id="image" type="file" className="form-control"/>
                </div>
                
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
