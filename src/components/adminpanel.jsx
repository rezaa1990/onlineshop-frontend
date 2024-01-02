import { library } from '@fortawesome/fontawesome-svg-core';
import { faAdd, faCoffee, faDove, faMessage, faProcedures, faReceipt, faUpDown, faUpRightAndDownLeftFromCenter, faUser, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState ,useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Products from './products';
import { hover } from '@testing-library/user-event/dist/hover';
import css from "./../css/main.css";
import Navbar from "./navbar";
import AppContext from '../context/context';
import MessageList from "./message";
import OrderList from './order';
import pp from "./../images/pp.jpg";
import AdminSidebar from "./sidebar";

function AdminPanel() {
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
    adminUserInfo,
    setAdminUserInfo,
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
    searchValue,
    setSearchValue,
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
    navSearchInputValue,
    setNavSearchInputValue,
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
    setAddress,
    setPassword,
    setRepeatPassword,
    setPostalCode,
    //login
    handleLogin,
    token,
    setToken,
    //navbar
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
    ////////
    component,
    reRenderComponentFunc,
    userInfo,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const toggleSubMenu = () => {
    setIsSubMenuVisible(!isSubMenuVisible);
  };

  const navigation = () => {
    navigate("./products");
  };

  useEffect(() => {
    userPanelGetUser();
  }, []);
  console.log("userInfo", userInfo);

  const [productImg, setProductImg] = useState();
  const handleUploadeImg = () => {
    const formData = new FormData();
    formData.append("image", productImg);
    console.log(productImg);
    console.log(formData.get("image"));

    axios
      .post(`http://${server}:5000/api/image/addimage`, formData)
      .then((response) => {
        console.log("تصویر با موفقیت ارسال شد!", response.data);
      })
      .catch((error) => {
        console.error("خطا در ارسال تصویر:", error);
      });
  };

  return (
    <div className="d-flex">
      {/* sidebar */}
      <div className="col-4 col-md-2 rounded-4" id="admin-sidebar">
        <AdminSidebar></AdminSidebar>
      </div>

      {/* message */}
      <div
        className="col-8 col-md-10"
        id="admin-message"
        style={{ display: showHidden == 6 ? "block" : "none" }}
      >
        <MessageList></MessageList>
      </div>

      {/* order */}
      <div
        className="col-8 col-md-10"
        style={{ display: showHidden == 7 ? "block" : "none" }}
      >
        <OrderList></OrderList>
      </div>

      {/* user info */}
      <div
        className="col-8 col-md-10"
        id="admin-userinfo"
        style={{ display: showHidden == 1 ? "block" : "none" }}
      >
        <div className="bg-primary rounded-4">
          <div className="">
            <h5 className="text-light text-center">اطلاعات کاربری</h5>
            <div className="p-2 my-2 rounded bg-light">
              <div className="col-md-8 mx-auto shadow p-2">
                <div className="d-flex">
                  <p className="px-1">نام:</p>
                  <p className="px-1">{adminUserInfo?.fName}</p>
                </div>
                <div className="d-flex">
                  <p className="px-1"> نام خانوادگی:</p>
                  <p className="px-1">{adminUserInfo?.LName}</p>
                </div>
                <div className="d-flex">
                  <p className="px-1"> سطح دسترسی :</p>
                  <p className="px-1">
                    {adminUserInfo?.role === "adminUser"
                      ? "ادمین"
                      : "کاربر معمولی"}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="px-1">ایمیل:</p>
                  <p className="px-1">{adminUserInfo?.email}</p>
                </div>
                <div className="d-flex">
                  <p className="px-1">شماره تماس:</p>
                  <p className="px-1">{adminUserInfo?.mobile}</p>
                </div>
                <div className="d-flex p-1">
                  <p className="px-1">آدرس:</p>
                  <p className="px-1">{adminUserInfo?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* anbar  */}
      <div
        className="col-8 col-md-10"
        style={{ display: showHidden == 2 ? "block" : "none" }}
      >
        <div className="p-2 shadow-sm">
          <p className=""> نام محصول:</p>
          <p className="">موبایل</p>
        </div>
        <div className="p-2 shadow-sm">
          <p className="">تعداد:</p>
          <p className="">۳۳۴</p>
        </div>
        <div className="p-2 shadow-sm">
          <p className="">قیمت:</p>
          <p className="">۱۲۳۴۵۰۰۰ تومان</p>
        </div>
      </div>

      {/* add product */}
      <div
        className="col-8 col-md-10"
        id="admin-addproduct"
        style={{ display: showHidden == 3 ? "block" : "none" }}
      >
        <div className="bg-primary rounded-4 pt-2">
          <h5 htmlFor="" className="text-center text-light">
            افزودن محصول جدید
          </h5>
          <div className="bg-light rounded pb-2 px-2">
            <div className="form-grou col-md-6 mx-auto">
              <label htmlFor="" className="text-muted">
                دسته بندی
              </label>
              <input
                onChange={(e) => setCategory(e.target.value)}
                id="category"
                type="text"
                className="form-control"
              />
            </div>

            <div className="form-group col-md-6 mx-auto">
              <label htmlFor="" className="text-muted">
                نام
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                id=""
                type="text"
                className="form-control"
              />
            </div>

            <div className="form-group col-md-6 mx-auto">
              <label htmlFor="" className="text-muted">
                قیمت
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                id=""
                type="text"
                className="form-control"
              />
            </div>

            <div className="form-group col-md-6 mx-auto">
              <label htmlFor="" className="text-muted">
                تعداد
              </label>
              <input
                onChange={(e) => setNumberOfProduct(e.target.value)}
                id="numberOfProduct"
                type="text"
                className="form-control"
              />
            </div>

            <div className="form-group col-md-6 mx-auto">
              <label htmlFor="" className="text-muted">
                مشخصات
              </label>
              <textarea
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                name=""
                id="message"
                cols="30"
                rows="3"
              ></textarea>
            </div>

            <div className="form-group col-md-6 mx-auto">
              <label htmlFor="" className="text-muted">
                شماره سریال
              </label>
              <input
                onChange={(e) => setSerialNumber(e.target.value)}
                id=""
                type="text"
                className="form-control"
              />
            </div>

            <div className="col-md-6 mx-auto m-1 p-1 border rounded">
              <label htmlFor="uploadInput" className="text-muted">
                بارگزاری تصویر
              </label>
              <div className="text-center">
                <input
                  id="uploadInput"
                  className=""
                  type="file"
                  onChange={(e) => setProductImg(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  className="btn btn-sm btn-primary "
                  onClick={handleUploadeImg}
                >
                  آپلود تصویر
                </button>
              </div>
            </div>

            <div className="text-center">
              <button className="btn btn-success " onClick={addProduct}>
                افزودن محصول
              </button>
            </div>
          </div>

          <div
            className="container-fluid col-sm-10 p-4"
            style={{ display: showHidden == 4 ? "block" : "none" }}
          >
            <div className="p-2">
              <p className="text-success">{responseMessage}</p>
            </div>
            <div className="p-2 shadow-sm">
              <p className="">نام:</p>
              <p className="">{name}</p>
            </div>
            <div className="p-2 shadow-sm">
              <p className="">قیمت</p>
              <p className="">{price}</p>
            </div>
            <div className="p-2 shadow-sm">
              <p className="">مسیر عکس</p>
              <p className="">{imgPath}</p>
            </div>

            <div className="p-2 shadow-sm">
              <p className="">توضیحات</p>
              <p className="">{description}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="col-8 col-md-10"
        id="admin-updatproduct"
        style={{ display: showHidden == 5 ? "block" : "none" }}
      >
        <Products></Products>
      </div>
    </div>
  );
}

export default AdminPanel;
