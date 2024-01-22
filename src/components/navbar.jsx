import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/context';
// import onLineshop from '../images/onlineshop.png';
import userIcon from '../images/user.png';
import search from '../images/search.png';
import home from '../images/home.png';
import exit from '../images/exit.png';
import basket from '../images/basket.png';
import calendar from '../images/calendar.png';
import MyDatePicker from './date';
import { Dropdown } from 'react-bootstrap';

function Navbar() {

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
            setUser,
            userPanelShowHidden,
            setUserPanelShowHidden,
            userPanelGetUser,
            deleteFromBasket,
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
            orderMeesage,
            setOrderResponseMessage,
            orderId,
            setOrderId,
            factor , 
            setFactor,
            totalPrice , 
            setTotalPrice,
            sendingPostalInformation,
            IssuingInvoice,
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
            token,
            setToken,
            handleLogin,
            //navbar
            navSearchInputValue,
            setNavSearchInputValue,
            user,
            setLogInLogUot,
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
             ///////////
  } = useContext(AppContext);
  
  const [isCollapsed, setIsCollapsed] = useState(true);

  function handleExit() {
    localStorage.removeItem('userToken');
    setToken();
  }

  const [active, setActive] = useState();
  function handleActive(tagnumber) {
    setActive(tagnumber)
  };

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20; // 20px یا مقدار دلخواه شما
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg container-fluid position-fixed z-1 ${scrolled ? 'py-0' : 'py-3'}`}
      style={{
        opacity: '.9',
        transition: 'padding 0.3s ease-in-out', // افزودن انیمیشن به ترانزیشن
      }}
    >
      <div className="container-fluid">

        <div
          className="navbar-toggler px-1 bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </div>

        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
         
          <ul className="navbar-nav p-0">

            <li className="nav-item rounded">
              <Link to="./userdashboard" className="nav-link text-white rounded" style={{backgroundColor: active == 1 ? "rgb(37, 0, 122)" : ''}} onClick={()=>handleActive(1)}>
                <i className="" style={{ fontSize: '15px', cursor: 'pointer' }}>
                  <img src={userIcon} className="text-dark" style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
                </i>حساب کاربری
              </Link>
            </li>

            <li className="nav-item rounded">
              <Link to="/" className="nav-link text-white rounded" style={{backgroundColor: active == 2 ? "rgb(37, 0, 122)" : ''}} onClick={()=>handleActive(2)}>
                <i className="" style={{ fontSize: '15px', cursor: 'pointer' }}>
                  <img src={home} className="mx-1" style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
                </i>
                خانه
              </Link>
            </li>

            <li className="nav-item mx-2 d-flex align-items-start rounded" style={{backgroundColor: active == 3 ? "rgb(37, 0, 122)" : ''}} onClick={()=>handleActive(3)}>
              <div className="text-white text-center px-2" 
                  style={{ 
                  backgroundColor: "red",
                  borderTopLeftRadius: "40%",
                  borderTopRightRadius: "40%",
                  borderBottomRightRadius:"40%",
                  display:"block"
                  }}>
                  {user?.basket?.length || 0}
              </div>

              <Link to="./userdashboard" className="nav-link text-white rounded">                
                <i className="" style={{ fontSize: '15px', cursor: 'pointer' }}>
                <img src={basket} className="" style={{ cursor: 'pointer', width: '25px', height: '25px' }} />
                سبد خرید
                </i>
              </Link>
            </li>

            <Dropdown className='rounded' style={{backgroundColor: active == 4 ? "rgb(37, 0, 122)" : ''}} onClick={()=>handleActive(4)}>
              <Dropdown.Toggle className='nav-item text-light border-0' variant="" id="nav-dropdown">
              محصولات
              </Dropdown.Toggle>

              <Dropdown.Menu className='border p-0' id='nav-drop-down-menu'>
              <Dropdown.Item className='text-end text-light rounded' onClick={()=>setSearchValue()} id='nav-drop-down-item' href="#/accessories">پیش فرض</Dropdown.Item>
                <Dropdown.Item className='text-end text-light rounded' onClick={()=>setSearchValue("لپ تاپ")} id='nav-drop-down-item' href="#/laptop">لپ تاپ</Dropdown.Item>
                <Dropdown.Item className='text-end text-light rounded' onClick={()=>setSearchValue("موبایل")} id='nav-drop-down-item' href="#/mobile">موبایل</Dropdown.Item>
                <Dropdown.Item className='text-end text-light rounded' onClick={() => setSearchValue("لوازم جانبی")} id='nav-drop-down-item' href="#/accessories">لوازم جانبی</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

          </ul>

        </div>

        <div className="d-flex align-items-center col-lg-7 col-sm-12">

          <form action="" className="col-5 form-inline p-1">
            <div className="input-group">           
              <div className="input-group-append pt-2 px-1">
                <i className="" style={{ fontSize: '15px', cursor: 'pointer' }}>
                  <img src={search} className="mb-2" style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
                </i>
              </div>
              <input
                value={navSearchInputValue}
                onChange={(e)=>setNavSearchInputValue(e.target.value)}
                type="text"
                placeholder="جست و جو"
                className="text-white form-control rounded border-0 search-input"
                id='nav-search-input'
                style={{
                  boxShadow: "none",
                }}
              />


            </div>
          </form>

          <div className="d-flex col-3 px-1">
            <div className="">
              <i className="">
                {/* <img src={calendar} className="" style={{width: '25px', height: '25px' }} /> */}
              </i>
            </div>
            <div className="p-1 ">
            <MyDatePicker ></MyDatePicker>
            </div>
          </div>

          <div className="m- col-4 my-3">
            <div className="">
              <Link to="./login" onClick={handleLogin} className="" style={{ display: token ? 'none' : 'block', textDecoration: 'none' }}>
                <i className="text-white d-flex justify-content-end m-1" style={{ fontSize: '15px', cursor: 'pointer' }}>
                  <div className="p-2 rounded lilo">
                    <img src={userIcon} className="col-3" style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
                    ثبت نام/ورود
                  </div>
                </i>

              </Link>
            </div>

            <div className="text-center" >
              <Link to="./" onClick={handleExit} className="" style={{ display: token ? 'block' : 'none', textDecoration: 'none'}}>
                <i className="text-white d-flex justify-content-end" style={{ fontSize: '15px', cursor: 'pointer'}}>
                  <div className="p-2 rounded lilo">
                    <img src={exit} className="col-3 mx-1 mt-" style={{ cursor: 'pointer', width: '18px', height: '18px'}} />
                    خروج
                  </div>
                </i>

              </Link>
          </div>

          </div>
        
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
