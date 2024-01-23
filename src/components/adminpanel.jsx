import { library } from '@fortawesome/fontawesome-svg-core';
import { faAdd, faCoffee, faDove, faMessage, faProcedures, faReceipt, faUpDown, faUpRightAndDownLeftFromCenter, faUser, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useContext, useRef } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Products from "./products";
import { hover } from "@testing-library/user-event/dist/hover";
import css from "./../css/main.css";
import Navbar from "./navbar";
import AppContext from "../context/context";
import MessageList from "./message";
import OrderList from "./order";
import pp from "./../images/pp.jpg";
import userIcon from "./../images/user.png";
import search from "./../images/search.png";
import exit from "./../images/exit.png";
import AdminSidebar from "./sidebar";
import MyDatePicker from "./date";

function AdminPanel() {
  const {
    port,
    reqType,
    server,
    responseApi,
    config,
    //admin
    adminFilteredProducts,
    setAdminFilteredProducts,
    setUserRole,
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
    imageId,
    setImageId,
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

  const [selectedFile, setSelectedFile] = useState([]);
  // const handleFileInputChange = (event) => {
  //   setSelectedFile(event.target.files);
  // };

  const handleUpload = () => {
    if (!selectedFile || selectedFile.length === 0) {
      console.error("هیچ تصویری انتخاب نشده است.");
      responseApi("هیچ تصویری انتخاب نشده است.");
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append("images", selectedFile[i]);
    }
    console.log(formData);
    console.log(formData.get("images"));
    axios
      .post(`${reqType}://${server}:${port}/api/image/addimage`, formData , config)
      .then((response) => {
        console.log("تصویر با موفقیت ارسال شد!", response.data);
        console.log(response.data.data.images);
        const responseImageId = [];
        response.data.data.images.map((image) => {
          responseImageId.push(image._id);
        });
        console.log(responseImageId);
        setImageId(responseImageId);
        console.log(response.data.message);
        responseApi(response.data.message);
      })
      .catch((error) => {
        console.error("خطا در ارسال تصویر:", error);
        const status = error.response.status;
        console.log(status);
        if (status == 400 || status == 401) {
          setUserRole("") //اگر توکن معتبر نباشد و استاتوس ۴۰۰ یا ۴۰۱ برگردد userRole به مقدار خالی ست میشود تا کاربر به صفحه ی ورود هدایت شود.
        } else {
          responseApi(error.message);
        }
      });
  };
  function handleExit() {
    localStorage.removeItem("userToken");
    setUserRole("1")
    setToken();
  }

  const [collapsed, setCollapsed] = useState(true);
  const handleBodyClick = (e) => {
    // اگر روی بدنه صفحه کلیک شده و سایدبار باز است، آن را ببند
    if (!e.target.closest(".sidebar-wrapper") && !collapsed) {
      setCollapsed(true);
    }
  };

  const [files, setFiles] = useState();
  const fileInputRef = useRef();
  const handleFileInputChange = (event) => {
    const files = event.target.files;

    setFiles(files);
    setSelectedFile(event.target.files);
    console.log("Selected Files:", files);
  };

  const handleButtonClick = () => {
    // شبیه‌سازی کلیک بر روی دکمه انتخاب فایل
    fileInputRef.current.click();
  };

  const [showSearchInput, setShowSearchInput] = useState(false);
  const  showSearchInputFunc= () => {
    setShowSearchInput(!showSearchInput);
  };

  useEffect(() => {
    // فیلتر محصولات هنگامی که navSearchInputValue تغییر کند
    const filterProducts = () => {
      if (!navSearchInputValue) {
        // اگر navSearchInputValue خالی یا undefined باشد، همه محصولات نمایش داده شوند
        setAdminFilteredProducts(products);
      } else {
        // در غیر اینصورت، محصولات را براساس شرایط فیلتر کنید
        const filtered = products.filter(
          (product) =>
            product.name.includes(navSearchInputValue) ||
            product.serialNumber.includes(navSearchInputValue)
        );
        setAdminFilteredProducts(filtered);
      }
    };

    filterProducts();
  }, [navSearchInputValue, products]);

  console.log(navSearchInputValue);
  console.log(products);
  console.log(adminFilteredProducts);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);

      // اگر موقعیت اسکرول کمتر از 100px باشد، نوبار نمایش داده شود
      setNavbarVisible(currentPosition < 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div className="" style={{ height: "100vh" }}>
      {/* admin nav */}

      <div
        style={{
          transition: "opacity 0.3s ease", // اضافه کردن ترانزیشن
          // opacity: navbarVisible ? 1 : 0, // استفاده از اپاسیتی به عنوان حالت نمایانی
        }}
      >
        <div
          className="border-bottom position-fixed z-3 container-fluid px-0"
          id="admin-nav"
        >
          <nav className="">
            <div className="container">
              <div className="d-flex align-items-center">
                {/* user */}
                <div
                  className="col-3 text-white d-flex"
                  onClick={() => setShowHidden(1)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="d-flex m-1 p-2 rounded"
                    id="admin-nav-userinfo"
                  >
                    <img
                      src={userIcon}
                      className="text-dark"
                      style={{
                        cursor: "pointer",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                    <span className="d-none d-md-block"> حساب کاربری</span>
                  </div>
                </div>

                {/* search */}
                <form action="" className="col-xs-4 col-md-3 form-inline p-1">
                  <div className="input-group">
                    <div className="input-group-append pt-2 px-1">
                      <i
                        className=""
                        style={{ fontSize: "15px", cursor: "pointer" }}
                      >
                        <img
                          src={search}
                          onClick={() => showSearchInputFunc()}
                          className="mb-2"
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </i>
                    </div>
                    <input
                      value={navSearchInputValue}
                      onChange={(e) => setNavSearchInputValue(e.target.value)}
                      type="text"
                      placeholder="جست و جو"
                      className={`text-white form-control rounded border-0 search-input ${
                        showSearchInput ? "d-block" : "d-none"
                      } d-md-block`}
                      id="nav-search-input"
                      style={{
                        boxShadow: "none",
                      }}
                    />
                  </div>
                </form>

                {/* date */}
                <div
                  className={`col-3 d-flex ${
                    showSearchInput ? "d-none" : "d-block"
                  } d-md-block`}
                >
                  <div className="">
                    <i className="">
                      {/* <img src={calendar} className="" style={{width: '25px', height: '25px' }} /> */}
                    </i>
                  </div>
                  <div className="p-1 ">
                    <MyDatePicker></MyDatePicker>
                  </div>
                </div>

                {/* login/logout */}
                <div
                  className={`col-3 me-auto d-flex ${
                    showSearchInput ? "d-none" : "d-block"
                  } d-md-block`}
                >
                  <div className="">
                    <Link
                      to="/login"
                      onClick={handleLogin}
                      className=""
                      style={{
                        display: token ? "none" : "block",
                        textDecoration: "none",
                      }}
                    >
                      <i
                        className="text-white d-flex justify-content-end m-1"
                        style={{ fontSize: "15px", cursor: "pointer" }}
                      >
                        <div className="p-2 rounded lilo">
                          <img
                            src={userIcon}
                            className="col-3"
                            style={{
                              cursor: "pointer",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          ثبت نام/ورود
                        </div>
                      </i>
                    </Link>
                  </div>

                  <div className="text-center">
                    <Link
                      to="/login"
                      onClick={handleExit}
                      className=""
                      style={{
                        display: token ? "block" : "none",
                        textDecoration: "none",
                      }}
                    >
                      <i
                        className="text-white d-flex justify-content-end"
                        style={{ fontSize: "15px", cursor: "pointer" }}
                      >
                        <div className="p-2 rounded lilo">
                          <img
                            src={exit}
                            className="col-3 mx-1 mt-"
                            style={{
                              cursor: "pointer",
                              width: "18px",
                              height: "18px",
                            }}
                          />
                          خروج
                        </div>
                      </i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* menu btn */}
      <button
        className="btn px-1 position-fixed"
        id="menu-btn"
        style={{
          zIndex: 1001,
          top: 51,
          right: 1,
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="menu-icon">
          <div
            className="menu-line"
            style={{
              transition: "transform 0.3s ease",
              transformOrigin: "bottom right",
              transform: !collapsed ? "rotate(-37deg)" : "",
            }}
          ></div>
          <div
            className="menu-line"
            style={{ display: collapsed ? "block" : "none" }}
          ></div>
          <div
            className="menu-line"
            style={{
              transition: "transform 0.3s ease",
              transformOrigin: "top right",
              transform: !collapsed ? "rotate(37deg)" : "",
            }}
          ></div>
        </div>
      </button>

      <div className="d-flex h-100">
        {/* sidebar */}
        <div
          className="col-4 col-md-2 sidebar-wrapper fixed"
          style={{
            position: "fixed",
            top: 50,
            right: collapsed ? "-100%" : 0, // اگر منو بسته باشد، به چپ مخفی شود
            zIndex: 1000,
            height: "100%",
            transition: ".4s ease", // افزودن انیمیشن به حرکت
          }}
          id="admin-sidebar"
        >
          <div className="text-start"></div>
          <div className="pt-5">
            <AdminSidebar></AdminSidebar>
          </div>
        </div>

        {/* message */}
        <div
          className="col-12 mt-5"
          id="admin-message"
          style={{ display: showHidden == 6 ? "block" : "none" }}
        >
          <MessageList></MessageList>
        </div>

        {/* order */}
        <div
          className="col-12 mt-5"
          style={{ display: showHidden == 7 ? "block" : "none" }}
        >
          <OrderList></OrderList>
        </div>

        {/* user info */}
        <div
          className="col-12 mt-5 p-2"
          id="admin-userinfo"
          style={{ display: showHidden == 1 ? "block" : "none" }}
        >
          <div className="p-2">
            <div className="p-2">
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
          className="col-12"
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
          className="col-12 mt-5"
          id="admin-addproduct"
          style={{ display: showHidden == 3 ? "block" : "none" }}
        >
          <div className="col-11 mx-auto">
            <h5 htmlFor="" className="text-center text-light">
              افزودن محصول جدید
            </h5>
            <div className="bg-light rounded pb-2 px-2">
              <div className="text-center text-danger p-2">
                {responseMessage}
              </div>
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
                <div className="text-cente">
                  <div className="text-center">
                    <input
                      id="uploadInput"
                      ref={fileInputRef}
                      type="file"
                      multiple
                      style={{ display: "none" }}
                      onChange={(e) => handleFileInputChange(e)}
                    />
                    <label
                      htmlFor="uploadInput"
                      className="btn btn-sm btn-info mb-2"
                      style={{ cursor: "pointer" }}
                    >
                      انتخاب فایل
                    </label>
                    {files &&
                      Array.from(files).map((file, index) => (
                        <div className="">
                          <span key={index} className="text-muted">
                            {file.name}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-sm btn-primary mt-2"
                    onClick={handleUpload}
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

        {/* update product*/}
        <div
          className="col-12 mt-5"
          id="admin-updatproduct"
          style={{ display: showHidden == 5 ? "block" : "none" }}
        >
          <Products></Products>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
