import React, {useContext, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faFaceAngry, faGolfBall, faLaughWink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import p1 from "./../images/p1.jpeg"
import AppContext from '../context/context';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


function Products() {
  const {
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
    updateNumberOfProduct,
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
    updateSerialNumber,
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
    indexOfSelectedProduct,
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
    id1,
    setId1,
    //user panel
    user,
    setUser,
    userPanelShowHidden,
    setUserPanelShowHidden,
    userPanelGetUser,
    deleteFromBasket,
    orderMeesage,
    setOrderResponseMessage,
    orderId,
    setOrderId,
    factor,
    setFactor,
    totalPrice,
    setTotalPrice,
    sendingPostalInformation,
    IssuingInvoice,
    middleFunction1,
    clientFName,
    setClientFName,
    clientLName,
    setClientLName,
    clientEmail,
    setClientEmail,
    clientMobile,
    setClientMobile,
    clientAddress,
    setClientAddress,
    clientPostalCode,
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
    setAddress,
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
  } = useContext(AppContext);

  const [commentId, setCommentId] = useState();
  function middleFunc(commentid, order) {
    setCommentId(commentid);
    if (order === 1) {
      approveComment(commentid);
    } else {
      deleteComment(commentid);
    }
  }

  console.log(products);
  return (
    <section className="p-2">
      <div className="bg-primary rounded-4">
        <h3 className="text-center text-light">محصولات</h3>
        <div className="bg-light p-2 " id='custom-height'style={{overflow:"auto"}}>
          <div className="container-fluid">
            {/* product */}
            <div className="row">
              {products.map((product) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-1 px-3">
                  <div className="card " id="admin-card">
                    <img src={require(`./../images/panel-img/${product.images[0].imagePath.substring(55)}`)} alt="" className="card-img-top" />
                    <div className="card-body pb-0">
                      <div className="card-title">
                        <h3 className="text-light text-center">
                          {product.name}
                        </h3>
                      </div>

                      <div className="card-discount d-flex text-warning bg-secondary pt-2 rounded">
                        <h6
                          className="col-6 text-center"
                          style={{
                            display: product.discount?.value ? "block" : "none",
                          }}
                        >
                          {" "}
                          تخفیف {product.discount?.value * 100}%
                        </h6>

                        {product.discount ? (
                          <h6 className="col-6 text-center">
                            {(product.price * product.discount?.value).toFixed(
                              2
                            )}{" "}
                            تومان{" "}
                          </h6>
                        ) : (
                          <h6 className="col-6 text-center">
                            {product.price} تومان{" "}
                          </h6>
                        )}
                      </div>

                      <div className="text-right">
                        <input
                          className=""
                          type="checkbox"
                          onChange={() => handleToggleProduct(product._id)}
                          checked={selectedProducts.includes(product._id)}
                        />

                        <div className="d-flex justify-content-between">
                          <button
                            onClick={() => middleFunction(product._id)}
                            className="btn btn-success btn-sm m-1"
                          >
                            بروزرسانی
                          </button>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="btn btn-danger btn-sm m-1"
                          >
                            حذف
                          </button>
                        </div>

                        <button
                          className="btn text-light mx-auto btn-sm"
                          onClick={() => handleClick(product._id)}
                          style={{
                            display: id1.includes(product._id)
                              ? "none"
                              : "block",
                          }}
                        >
                          دیدن نظرات ⇓
                        </button>
                        <div
                          className="comments text-center"
                          style={{
                            minHeight: "200px",
                            display: id1.includes(product._id)
                              ? "block"
                              : "none",
                          }}
                        >
                          <form className="m-2">
                            <div className="">
                              <div className=""></div>
                            </div>
                          </form>
                          <div className="comments text-center p-1 border rounded bg-secondary">
                            <p className="text-center text-light"> نظرات</p>

                            <div
                              className=""
                              style={{ maxHeight: "220px", overflow: "auto" }}
                            >
                              {product.comments?.map((comment) => (
                                <div className="rounded bg-light">
                                  <div className="d-flex">
                                    <button
                                      className="btn btn-close p-2"
                                      style={{ fontSize: "7px" }}
                                      onClick={() => middleFunc(comment._id, 0)}
                                    ></button>
                                    <p
                                      className="text-warning mx-auto"
                                      style={{
                                        display:
                                          commentId == comment._id
                                            ? "block"
                                            : "none",
                                      }}
                                    >
                                      {responseMessage}
                                    </p>
                                    <button
                                      className="btn me-auto"
                                      onClick={() => middleFunc(comment._id, 1)}
                                      style={{
                                        display:
                                          comment.isApproved == true
                                            ? "none"
                                            : "block",
                                        fontSize: "10px",
                                      }}
                                    >
                                      ✅
                                    </button>
                                  </div>
                                  <p className="" style={{ fontSize: "14px" }}>
                                    {comment?.text}
                                  </p>
                                  <div className="">
                                    <div className=""></div>
                                  </div>

                                  <p className="" style={{ fontSize: "11px" }}>
                                    {comment.author?.fName}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn text-light mx-auto btn-sm"
                          onClick={() => handleClick(product._id)}
                          style={{
                            display: id1.includes(product._id)
                              ? "block"
                              : "none",
                          }}
                        >
                          بستن نظرات ⇑
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* update product Form */}
          {isFormVisible && (
            <div
              className="modal"
              tabIndex="-1"
              role="dialog"
              style={{ display: "block" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content" id="admin-updateproduct-form">
                  <div className="modal-header">
                    <h5 className="modal-title text-light mx-auto">
                      بروزرسانی محصول
                    </h5>
                  </div>
                  <div className="modal-body">
                    <input
                      className="form-control my-1 border-0"
                      id="admin-updateproduct-input"
                      type="text"
                      value={updateNumberOfProduct}
                      onChange={(e) => setUpdateNumberOfProduct(e.target.value)}
                      placeholder="تعداد محصول"
                    />
                    <input
                      className="form-control my-1 border-0"
                      id="admin-updateproduct-input"
                      type="text"
                      value={updateCategory}
                      onChange={(e) => setUpdateCategory(e.target.value)}
                      placeholder="دسته بندی محصول"
                    />
                    <input
                      className="form-control my-1 border-0"
                      id="admin-updateproduct-input"
                      type="text"
                      value={updateName}
                      onChange={(e) => setUpdateName(e.target.value)}
                      placeholder="نام محصول"
                    />
                    <input
                      className="form-control my-1 border-0"
                      id="admin-updateproduct-input"
                      type="text"
                      value={updatePrice}
                      onChange={(e) => setUpdatePrice(e.target.value)}
                      placeholder="قیمت"
                    />
                    <input
                      className="form-control my-1 border-0"
                      id="admin-updateproduct-input"
                      type="text"
                      value={updateDescription}
                      onChange={(e) => setUpdateDescription(e.target.value)}
                      placeholder="توضیحات"
                    />
                    <input
                      className="form-control my-1 border-0"
                      id="admin-updateproduct-input"
                      type="text"
                      value={updateSerialNumber}
                      onChange={(e) => setUpdateSerialNumber(e.target.value)}
                      placeholder="شماره سریال"
                    />
                    {/* <input className="form-control my-1" type="text" value={updateImg} onChange={(e) => setUpdateImg(e.target.value)} placeholder="تصویر محصول" /> */}
                    <div className="form-group mx-5 my-3 ">
                      <label htmlFor="image" className="text-light">
                        آپلود عکس
                      </label>
                      <input
                        value={updateImg}
                        onChange={(e) => setUpdateImg(e.target.value)}
                        id="image"
                        type="file"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="modal-footer justify-content-between">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => updateProduct(id)}
                    >
                      تایید
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeForm}
                    >
                      بستن
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* ایجاد تخفیف */}
        <div className="bg-light p-1">
          <div className="">
            <div className="p-2 rounded" id="discount">
              <div className="col-md-6 mx-auto">
              <p className="text-center">ایجاد تخفیف</p>

              {/* چک باکس برای انتخاب نوع تخفیف */}
              <div className="d-flex col-md-8 mx-auto rounded border p-2">
                <div className="">
                  <label>
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={discountType === "percentage"}
                      onChange={() => handleDiscountSelection("percentage")}
                    />
                    درصدی
                  </label>
                </div>
                <div className="m-auto">
                  <label>
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={discountType === "amount"}
                      onChange={() => handleDiscountSelection("amount")}
                    />
                    مقداری
                  </label>
                </div>
              </div>
              <div className="col-md-8 mx-auto d-flex">
                <input
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  type="text"
                  placeholder="میزان تخفیف"
                  className="container rounded border-0 p-2 m-1"
                />
                <input
                  value={discountExpireTime}
                  onChange={(e) => setDiscountExpireTime(e.target.value)}
                  type="text"
                  placeholder="زمان انقضا"
                  className="container rounded border-0 p-2 m-1"
                />
              </div>
              <div className="d-flex col-md-8 mx-auto justify-content-around">
                <button
                  onClick={() =>
                    createDiscount(
                      discountType,
                      discountValue,
                      discountExpireTime,
                      selectedProducts
                    )
                  }
                  className="btn btn-sm btn-success my-1"
                >
                  اعمال تخفیف
                </button>
                <button
                  onClick={() => removeDiscount(selectedProducts)}
                  className="btn btn-sm btn-warning my-1"
                >
                  حذف تخفیف
                </button>
              </div>
              <p
                className="text-danger text-center"
                style={{ display: responseMessage ? "block" : "none" }}
              >
                {responseMessage}
              </p>
            </div>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
