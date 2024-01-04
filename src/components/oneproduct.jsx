import React, { useEffect, useContext, useState } from "react";
import p1 from "./../images/p1.jpeg";
import redHeart from "./../images/redheart.png";
import defaultHeart from "./../images/defaultheart.png";
import basket from "./../images/basket.png";
import AppContext from "../context/context";
import { Navigate, useNavigate } from "react-router-dom";
import like from "./../images/like.png";
import unfold from "./../images/unfold.png"

function OneProduct() {
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
    oneProduct,
    setOneProduct,
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
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  console.log("oneproducts", oneProduct);
  console.log(userId);
  console.log("id", allDataAboutProduct);

  const product = products.filter((p) => p._id == allDataAboutProduct);
  
  
  const [visibleComments,setVisibleComments] = useState([]);
  function showReplysOfCommentFunc(commentId) {
    console.log(visibleComments)
    if(visibleComments.includes(commentId)) {
      setVisibleComments(visibleComments.filter((c)=>c !== commentId));
      console.log(visibleComments)
    } else {
      setVisibleComments([...visibleComments,commentId]);
      console.log(visibleComments)
    }
  }

  function oneProductMiddleFunc(navigateDestination) {
    setCommentResponse(null);
    navigate(navigateDestination);
  }

  return (
    <div className="" id="oneproduct">
      {/* card img */}
      <div className="d-flex justify-content-center">
        <img src={p1} alt="" style={{width: "350px",height: "350px"}} className="mt-3 rounded"/>
      </div>
      {/* card body */}
      <div className="pb-5 mx-2 mt-2 rounded-5">
        <div className="card-body">
          <div className="card-discount d-flex col-8 m-auto">
            <h6
              className="text-warning col-6 text-center p-2 m-2"
              style={{ display: oneProduct.discount ? "block" : "none" }}
            >
              
              تخفیف {oneProduct.discount?.value * 100}%
            </h6>

            {oneProduct?.discount ? (
              <h6 className="text-warning col-6 text-center p-2 m-2">
                {oneProduct?.price * oneProduct?.discount?.value} تومان{" "}
              </h6>
            ) : (
              <h6 className="text-warning col-6 text-center p-2 m-2">
                {oneProduct?.price} تومان{" "}
              </h6>
            )}
          </div>

        <div className="col-8 m-auto p-1">
              {/* name */}
              <div className="text-center">
              
                <div className="card-title">
                  <h3 className="text-light">{oneProduct?.name}</h3>
                </div>
                  {/* card description */}
                <div className="card-subtitle my-4 text-center">
                  <p className="container-fluid text-light">
                    <h6 className="">مشخصات</h6>
                    <p className="p-1 m-1" style={{wordWrap:"break-word"}}>{oneProduct?.description}</p>
                  </p>
                </div>
              </div>
          
              {/*add to basket and like */}
            <div className="d-flex align-items-center">
              


              {/* + , -  */}
              <div className="col-6 d-flex align-items-center py-3 px-0">
                <div className="pt-3">
                <p
                  className=""
                  onClick={() =>
                    addToBasket(
                      oneProduct._id,
                      indexOfSelectedProduct == oneProduct._id
                        ? numberOfSelectedProduct
                        : 1
                    )
                  }
                >
                  <i
                    className="p-2 rounded"
                    id="add-to-basket"
                    style={{ fontSize: "15px", cursor: "pointer" }}
                  >
                    <img
                      src={basket}
                      className="basket"
                      id="basket-image"
                      style={{
                        cursor: "pointer",
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </i>
                </p>
                </div>
                <button
                  className="btn btn-sm rounded-5 text-light"
                  id="basket-button"
                  style={{ border: "1px white solid" }}
                  onClick={() => setProductId(oneProduct._id, 0)}
                >
                  -
                </button>
                <span className="text-light p-1">
                  {numberOfSelectedProduct || 1 } 
                </span>
                <button
                  className="btn btn-sm rounded-4 text-light"
                  id="basket-button"
                  style={{ border: "1px white solid" }}
                  onClick={() => setProductId(oneProduct._id, 1)}
                >
                  +
                </button>
              </div>

              {/* like */}
              <div className="col-6 pt-4 text-start">
                <p className="me-auto text-light">
                  {oneProduct?.numberOfLikes?.length}
                  <i
                    className=""
                    onClick={() => addLike(oneProduct?._id)}
                    style={{ fontSize: "10px", cursor: "pointer" }}
                  >
                    <img
                      src={
                        oneProduct?.numberOfLikes?.includes(userId)
                          ? redHeart
                          : defaultHeart
                      }
                      className="heart"
                      style={{
                        cursor: "pointer",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  </i>
                </p>
              </div>
                      
            </div>
            <div className="text-warning text-center" style={{ display: responseMessage ? "block" : "none" }}>{responseMessage}</div>
        </div>
          
        </div>

        <form className="col-8 m-auto p-1">
          <div className="">
            <textarea
              id="text-area"
              value={comments[oneProduct?._id] || ""}
              onChange={(e) =>
                handleCommentChange(oneProduct?._id, e.target.value)
              }
              className="form-control text-light"
              cols="30"
              rows="2"
              placeholder="نظر خود را بنویسید ..."
              style={{ outline: "none", boxShadow: "none" ,border:"none"}}
            ></textarea>
            <div className="text-center">
              <button
                onClick={(e) => addComment(oneProduct._id,e)}
                className="btn btn-sm text-light m-1"
                id="add-comment-button"
                style={{ border: "1px solid white" }}
              >
                ثبت نظر
              </button>
            </div>
          </div>
        </form>

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

        <p className="text-center text-light mt-4 "> نظرات دیگران</p>
        <div id="" className="col-8 mx-auto p-1 rounded">
          <div
            className=""
            style={{ maxHeight: "400px", overflow: "auto" }}
          >
            {oneProduct?.comments?.map((comment) => (
              <div id="comment" className="mx-1 m-2 rounded" style={{display:comment.isApproved === true ? "block" : "none"}}>
                <div className="">
                <p className="text-light p-1 m-0">{comment?.author.fName}</p>
                <p
                    className="text-light text-center m-0"
                    style={{ fontSize: "15px" , wordWrap:"break-word"}}
                  >
                    {comment?.text}
                </p>
                  
                  <div className="d-flex justify-content-end">
                    <p
                      className="text-light"
                      style={{ fontSize: "14px" }}
                    >
                      {comment?.likes?.length}
                    </p>
                    <i
                      className="text-light pe-0 ms-2"
                      style={{ fontSize: "12px" ,cursor:"pointer"}}
                      onClick={() => likeComment(comment._id, userId,oneProduct._id)}
                    >
                      <img src={like} alt="" className=""
                        style={{
                        cursor: "pointer",
                        width: "20px",
                        height: "20px",
                      }}/>
                    </i>
                  </div>
                  <div className="text-light" style={{ display: visibleComments.includes(comment._id) ? "block" : "none" }}>
                    {comment.reply?.map((t) => (
                      <div id="reply-comment" className="text-center mx-4 rounded" style={{ wordWrap: "break-word"}}>
                        <p className="text-end p-1" style={{ fontSize: "11px" }} >{t?.author.fName}</p>
                        <p className="">{t?.text}</p>
                      </div>
                    ))}
                  <div className="">
                  <div className="mx-2">
                  <textarea
                    value={replyComment}
                    onChange={(e) => handleRyplyComment(e.target.value)}
                    className="form-control text-light p-1"
                    id="text-area"
                    cols="30"
                    rows="1"
                    placeholder="پاسخ ..."
                    style={{ outline: "none", boxShadow: "none" ,border:"none"}}
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={(e) =>
                        replyToComment(replyComment, comment._id, userId,oneProduct._id, e)
                      }
                      className="btn btn-sm text-light border mb-3 mt-1"
                    >
                      ثبت
                    </button>
                  </div>
                </div>
                  </div>
                  <div className="text-center">
                    <button className="btn" onClick={() => showReplysOfCommentFunc(comment._id)}>
                    <img src={unfold} alt="" className="" style={{
                        cursor: "pointer",
                        width: "20px",
                        height: "20px",
                      }}/>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
        <div className="text-center my-1">
            <button className="text-light btn border" onClick={()=>navigate("/")}>بازگشت</button>
        </div>
      </div>
    </div>
  );
}

export default OneProduct;
