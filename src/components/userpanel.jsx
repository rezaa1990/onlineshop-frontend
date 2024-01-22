import {useContext} from 'react';
import pp from "./../images/pp.jpg";
import p1 from "./../images/p1.jpeg"
import AppContext from '../context/context';
import userIcon from '../images/user.png';
import basket from '../images/basket.png';
import emptybox from '../images/empty-box.png';

function UserPanel() {

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
    oneProduct , 
    setOneProduct,
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
    middleFunction1,
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
  
  useEffect(() => {
    userPanelGetUser();
  }, []);
  console.log("uuuuserrrr",user);
  return (
    <>
      <div className="d-md-flex">
        {/* sidebar */}
        <div className="col-12 col-md-3 p-2 usersidebar pt-5"
        
        >
          
          <div className="p-1 pt-5">
            <div className="pt-5">
              <div className="pt-4">
                <img src={require("./../images/pp.jpg")} alt="سسس" className="" style={{ borderRadius: "50%", width: "12vh" }} /></div>
              <div className="m-1 text-light">
                {user?.fName}
              </div>
            </div>
          </div>

          <div id='side-user-information' className="d-flex align-items-center mx-2 rounded" style={{cursor: 'pointer'}} onClick={() => setUserPanelShowHidden(1)}>
              <img src={userIcon} alt="" className="mt-1 me-1" style={{width: '20px', height: '20px' }}/>
              <div  className="text-light my-2 p-2">
              اطلاعات کاربری
              </div>   
          </div>
       
          <div id='side-basket' className="d-flex align-items-center mx-2 mt-2 rounded" style={{cursor: 'pointer'}} onClick={() => setUserPanelShowHidden(2)}>
              <img src={basket} alt="" className="mt-1 me-1" style={{cursor: 'pointer', width: '25px', height: '25px'}}/>
              <div  className="text-light my-2 p-2">
                سبد خرید
              </div>
          </div>

        </div>

              {/* user info */}
        <div className="col-12 col-md-9 py-1 userinfo pt-5" style={{ display: userPanelShowHidden == 1 ? 'block' : 'none' }}>
          <h1 className="text-center text-light mb-3 pt-5">اطلاعات کاربری</h1>
          <div className="p-2 m-1 rounded d-flex col-8 mx-auto" id='user-info'>
            <p className="mx-2 text-light">نام:</p>
            <p className="text-light">{user?.fName}</p>
          </div>
          <div className="p-2 m-1 rounded d-flex col-8 mx-auto" id='user-info'>
            <p className="mx-2 text-light"> نام خانوادگی:</p>
            <p className="text-light">{user?.lName}</p>
          </div>
          <div className="p-2 m-1 rounded d-flex col-8 mx-auto" id='user-info'>
            <p className="mx-2 text-light">ایمیل:</p>
            <p className="text-light">{user?.email}</p>
          </div>
          <div className="p-2 m-1 rounded d-flex col-8 mx-auto" id='user-info'>
            <p className="mx-2 text-light">شماره تماس:</p>
            <p className="text-light">{user?.mobile}</p>
          </div>
          <div className="p-2 m-1 rounded d-flex col-8 mx-auto" id='user-info'>
            <p className="mx-2 text-light">آدرس:</p>
            <p className="text-light">{user?.address}</p>
          </div>
        </div>

              {/* basket */}
        <div className="col-12 col-md-9 basket" style={{ display: userPanelShowHidden ==2 ? 'block' : 'none' }}>
          <section className='h-100' id='basket'>
            <div className="pt-5">
              
            <h1 className="text-center text-light mb-5 pt-5">سبد خرید</h1>
              
            <div className="d-md-flex" style={{display:user.basket?.length > 0 ? "block" : "none"}}>
                
            {user?.basket?.map((basket,index) =>
                <div className="col-lg-3 col-md-6 mb-5 px-3">
                <div className="card p-1" id='basket-card'> 
                  <img src={require(`./../images/panel-img/${basket.images[0].imagePath.substring(55)}`)} alt="" className="card-img-top" />
                  <div className="card-body">
                    <div className="card-title">
                      <h3 className="text-light text-center">{basket.name}</h3>
                    </div>
                    <div className="card-subtitle mt-4">
                      <p className="text-light text-center">تعداد:{user.numberOfEachProductInBasket.filter((n,i)=>i == index )}</p>
                    </div>
                    <div className="text-center">
                      <button onClick={()=>deleteFromBasket(user._id,basket._id)} className="btn btn-warning btn-sm">حذف از سبد</button>
                    </div>
                  </div>
                </div> 
              </div>
            )}
            </div>
            
            <div className="d-flex justify-content-center">
                {/* <img src={emptybox} alt="" className="" style={{display:user.basket?.length > 0 ? "none" : "block" , width:"30vh", height:"30vh"}}/> */}
                <p className="text-warning py-5" style={{ display: user.basket?.length > 0 ? "none" : "block" }}>سبد شما خالی است</p>
            </div>
              
            <div className="text-center mt-4">
              <button disabled={user.basket?.length > 0 ? false : true } onClick={(e) => middleFunction1(user.basket,user.numberOfEachProductInBasket,e)} className="btn mb-4 w-50 text-light btn-success"> صدور فاکتور </button>
            </div>
              
            </div>
          </section>
        </div>

              {/* postal info */}
        <div className="col-12 col-md-9" id='postal-info' style={{ display: userPanelShowHidden ==3 ? 'block' : 'none' }}>
          <div className="container">

          <div className="row justify-content-center">
          <div className="col-lg-6">
            <h3 className="m-5 text-light">اطلاعات پستی</h3>

           <div className="form-group mx-5">
             <p className="text-center text-danger ">{''}</p>
           </div>

            <form action="" className="text-muted mb-5">

            <div className="form-group mx-5 text-danger text-center">{orderMeesage}</div>
                  <p className="text-warning text-center">{responseMessage}</p>
            <div className="form-group mx-5">
              <label htmlFor="name" className='text-light'>نام</label>
              <input value={clientFName} onChange={(e)=>setClientFName(e.target.value)} id="postal-info-input" type="text" className="form-control text-light border-0" />
            </div>

            <div className="form-group mx-5">
              <label htmlFor="name" className='text-light'>نام خانوادگی</label>
              <input value={clientLName} onChange={(e)=>setClientLName(e.target.value)} id="postal-info-input" type="text" className="form-control text-light border-0" />
            </div>

            <div className="form-group mx-5">
              <label htmlFor="name" className='text-light'>ایمیل</label>
              <input value={clientEmail} onChange={(e)=>setClientEmail(e.target.value)} id="postal-info-input" type="text" className="form-control text-light  border-0"/>
            </div>

            <div className="form-group mx-5">
              <label htmlFor="name" className='text-light'>موبایل</label>
              <input value={clientMobile} onChange={(e)=>setClientMobile(e.target.value)} id="postal-info-input" type="text" className="form-control text-light border-0" />
           </div>

            <div className="form-group mx-5">
             <label htmlFor="name" className='text-light'>آدرس</label>
              <input value={clientAddress} onChange={(e)=>setClientAddress(e.target.value)} id="postal-info-input" type="text" className="form-control text-light border-0" />
           </div>

            <div className="form-group mx-5">
              <label htmlFor="name" className='text-light'>کد پستی</label>
              <input value={clientPostalCode} onChange={(e)=>setClientPostalCode(e.target.value)} id="postal-info-input" type="text" className="form-control text-light border-0" />
            </div>
           <div className="text-center m-1">
              <button onClick={(e)=>sendingPostalInformation(orderId,e)} disabled={''} className="btn btn-success btn-sm">ثبت و پرداخت فاکتور</button>
          <button onClick={() => setUserPanelShowHidden(2)} className="btn btn-warning btn-sm"> بازگشت </button>
            </div>
          </form>
          </div>
           </div>

           </div>
        </div>

        {/* factor info */}
        <div className="col-12 col-md-9" id='factor' style={{ display: userPanelShowHidden ==4 ? 'block' : 'none' }}>
          <div className="container table-responsive">
            <h4 className='text-light text-center pt-2'>فاکتور</h4>
            <table className="mx-auto container border table-responsive mb-4">
              <thead className=''>
              <tr className=''>
                <th id='table-head' className='text-light p-1 col-1'>#</th>
                <th id='table-head' className='text-light p-1 col-1'>نام کالا</th>
                <th id='table-head' className='text-light p-1 col-1'>تعداد</th>
                <th id='table-head' className='text-light p-1 col-1'>قیمت + تخفیف</th>
                <th id='table-head' className='text-light p-1 col-1'>تخفیف </th>
                <th id='table-head' className='text-light p-1 col-1'>قیمت * تعداد</th>
                {/* سایر ستون‌ها */}
              </tr>
              </thead>
              <tbody>
              {factor?.map((factor, index) => (
                
              <tr key={index} className='border'>
                <td className='text-light' id='table-head' >{index + 1}</td>
                <td className='text-light' id='table-head' >{factor.productName}</td>
                <td className='text-light' id='table-head' >{factor.numberOfEachProduct}</td>
                <td className='text-light' id='table-head' >{parseFloat(factor.pricePerUnit).toFixed(2)}</td>
                <td className='text-light' id='table-head' >{factor.discount ? factor.discount* 100 : 0 } درصد </td>
                <td className='text-light' id='table-head' >{parseFloat(factor.priceMNumber).toFixed(2)}</td>
                
              </tr>
              ))}
              <tr>
                <td className='text-warning' id='factor-sum' colSpan="4">جمع کل</td>
                <td className='' id='factor-sum'>
                </td>
                <td className='text-warning' id='factor-sum'>
                  {parseFloat(totalPrice).toFixed(2)}
                </td>
              </tr>
              

              </tbody>
            </table>
            <div className="text-center pt-5">
          <button onClick={() => setUserPanelShowHidden(3)} className="btn btn-success btn-sm m-1">دریافت اطلاعات پستی</button>
          <button onClick={() => setUserPanelShowHidden(2)} className="btn btn-warning btn-sm  m-1"> بازگشت </button>
            </div>
          </div>
        </div>
              {/* payment page */}
        <div className="col-12 col-md-9" id='postal-info' style={{ display: userPanelShowHidden ==5 ? 'block' : 'none' }}>
          <div className="container">
                <h1 className="">صفحه ی پرداخت</h1>
           </div>
        </div>
  
      </div>
    </>
  );
}

export default UserPanel;
