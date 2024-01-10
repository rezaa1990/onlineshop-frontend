// App.js
import { useState,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter, useNavigate, Navigate } from 'react-router-dom';
import AppContext from "./context/context.js";
import AdminPanel from "./components/adminpanel";
import Navbar from "./components/navbar";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Login from "./components/login";
import Register from "./components/register";
import UserProducts from "./components/userproducts.jsx";
import UserPanel from "./components/userpanel";
import axios from "axios";
import OneProduct from "./components/oneproduct.jsx";
import { Button } from "bootstrap";
import { useLocation,} from 'react-router-dom';
import RouteGuard from "./components/routhguard.jsx";

function App() {
  const server = "localhost" || "192.168.169.166";

  const userToken = localStorage.getItem('userToken');
  const config = {
    headers: {
       'token1': `${userToken}`
    }
  };
  ///////////////////////////////////////////////////////////////////////////
  //admin component
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [numberOfLikes, setNumberOfLikes] = useState("");
  const [description, setDescription] = useState("");
  const [category,setCategory] = useState();
  const [numberOfProduct,setNumberOfProduct] = useState();
  const [serialNumber,setSerialNumber] = useState();
  const [responseMessage, setResponseMessage] = useState("");
  const [imageId, setImageId] = useState();
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [img, setImg] = useState();
  const [showHidden, setShowHidden] = useState();
  const [adminUserInfo, setAdminUserInfo] = useState();
  //producti ke dakhele admine
  const [products, setProducts] = useState([]);
  const [id, setId] = useState();
  const [updateName, setUpdateName] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateNumberOfLikes, setUpdateNumberOfLikes] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateImg, setUpdateImg] = useState("");
  const [updateCategory , setUpdateCategory] = useState();
  const [updateSerialNumber , setUpdateSerialNumber] = useState();
  const [updateNumberOfProduct , setUpdateNumberOfProduct] = useState();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [discountType, setDiscountType] = useState('');
  const [discountValue, setDiscountValue] = useState();
  const [discountExpireTime, setDiscountExpireTime] = useState();
  //user product
  const [userProducts, setUserProducts] = useState([]);
  const [userId, setUserId] = useState();
  const [comments, setComments] = useState({});
  const [allDataAboutProduct,setAllDataAboutProduct] = useState();
  const [fullDescription, setFullDescription] = useState([]);
  const [replyComment, setReplyComments] = useState();
  const [numberOfSelectedProduct, setNumberOfSelectedProduct] = useState(0);
  const [indexOfSelectedProduct , setIndexOfSelectedProducts] = useState();
  const [id1 , setId1] = useState([]);
  const [oneProduct, setOneProduct] = useState();
  const [searchValue, setSearchValue] = useState();
  const [navSearchInputValue,setNavSearchInputValue ] = useState();
  //user panel
  const [user, setUser] = useState({});
  const [userPanelShowHidden, setUserPanelShowHidden] = useState(2);
  const [clientFName , setClientFName]= useState();
  const [clientLName , setClientLName]= useState();
  const [clientEmail , setClientEmail]= useState();
  const [clientMobile , setClientMobile]= useState();
  const [clientAddress , setClientAddress]= useState();
  const [clientPostalCode , setClientPostalCode]= useState();
  const [orderMeesage,setOrderResponseMessage] = useState();
  const [orderId,setOrderId] = useState();
  const [factor , setFactor] = useState();
  const [totalPrice , setTotalPrice] = useState();
  //register
  const[fName , setRegisterName ]= useState("");
  const[lName , setLastName ]= useState("");
  const[email , setEmail ]= useState("");
  const[mobile , setMobile ]= useState();
  const[address , setAddress ]= useState("");
  const[password , setPassword ]= useState("");
  const[repeatPassword , setRepeatPassword ]= useState("");
  const[postalCode , setPostalCode ]= useState();
  const[showRegisterMessage , setShowRegisterMessage ]= useState(true);
  const[registerResponseMessage,setRegisterResponseMessage]=useState();
  //login
  const [token, setToken] = useState();//for showing login and logout link in navbar
  // contact
  const [senderName,setSenderName]=useState('');
  const [senderEmail,setSenderEmail]=useState('');
  const [content,setContent]=useState('');
  const [sendMessageResponse,setSendMessageResponse]=useState('')
 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  function responseApi(response) {
    setResponseMessage(response);
    setTimeout(() => {
      setResponseMessage('');
    }, [5000]);
  };

  const [component, setReRenderComponent] = useState(false);
  
  function reRenderComponentFunc() {
    setReRenderComponent(true);
  }
////////////////////////////////////////////////////
//admin component
  async function addProduct(e) {
    e.preventDefault();
    try {
      const addProduct = {
        category,
        name,
        price,
        description,
        numberOfProduct,
        serialNumber,
        imageId,
      };
      console.log(addProduct)
      const response = await axios.post(`http://${server}:5000/api/products/addproduct`,addProduct,config);
      responseApi(response.data.message);
      setShowHidden(4);
      getProduct();
    } catch (error) {
      console.log(error)
      responseApi(error.response.data.data ? error.response.data.data : error.response.data);
    }
  }
  /////////////////////////////////////////////////////////////////////////////
  //producti ke dakhele admine
  async function createDiscount(type,value,expirationTime,selectedProducts) {
    try {
      const data = {
        type,
        value,
        expirationTime
      };
      const response = await axios.post(`http://${server}:5000/api/discount/creatediscount`, data,config);
      const discountId = response.data.data._id;
      addDiscountToProduct(selectedProducts,discountId)
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
      responseApi("خطا در اعمال تخفیف");
    }
  }


  async function addDiscountToProduct(selectedProducts,discountId) {
    try {
      const data = {
        selectedProducts,
        discountId
      };
      const response = await axios.put(`http://${server}:5000/api/products/adddiscount`,data,config);
      getProduct();
      responseApi("تخفیف اعمال شد");
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
      responseApi("خطا در اعمال تخفیف");
    }
  }

  async function removeDiscount(selectedProducts) {
    try {
      const data = {
        selectedProducts,
      };

      const response = await axios.put(`http://${server}:5000/api/products/removediscount`,data,config);
      getProduct();
      responseApi("تخفیف حذف شد");
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
      responseApi("خطا در حذف تخفیف");
    }
  }

  async function deleteComment(commentId) {
    try {
      const response = await axios.delete(`http://${server}:5000/api/comment/deletecomment/${commentId}`,config);
      getProduct();
    } catch (error) {
      console.error('خطا:', error);
      responseApi("خطا در حذف کامنت")

    }
  }

  async function approveComment(commentId) {
    try {
      const data =  {
      }
      const response = await axios.put(`http://${server}:5000/api/comment/approvecomment/${commentId}`,data,config);
      getProduct();
      console.log(response);
      responseApi(response.data.message)
    } catch (error) {
      console.error('خطا:', error);
      responseApi("خطا در تایید کردن کامنت")
    }
  }

  // متد برای اضافه کردن یا حذف آیدی محصول از استیت
  const handleToggleProduct = (productId) => {
    const currentIndex = selectedProducts.indexOf(productId);
    const newSelectedProducts = [...selectedProducts];

    if (currentIndex === -1) {
      newSelectedProducts.push(productId);
    } else {
      newSelectedProducts.splice(currentIndex, 1);
    }

    setSelectedProducts(newSelectedProducts);
  };


  const handleDiscountSelection = (type) => {
      if (type === discountType) {
        setDiscountType('');
      } else {
        setDiscountType(type);
      }
  };

  //در این تابع فقط هنگام رندر شدن اولیه ی کامپوننت مقادیر محصولات در استیت قرار میگیرد
  useEffect(() => {
    getProduct();
    setToken(localStorage.getItem("userToken"))//در اینجا مقدار استیت برای token ست میشود تا دکمه ی ورود و خروج بر اساس آن نمایش داده شود
  }, []);

  //این تابع پس از آپدیت یا خذف یا اضافه کردن یک محصول توسط ادمین صدا زده میشود تا مقادیر جدید محصولات در استیت قرار بگیرد
  async function getProduct(id) {
    axios.get(`http://${server}:5000/api/products/getproducts`)
    .then(response => {
      const p = response.data.data.products;
      setProducts(p);
    })
    .catch(error => {
      console.log(error);
    });
  };

  async function updateProduct(id) {
    try {
      const updateData = {
        category:updateCategory,
        name:updateName,
        serialNumber:updateSerialNumber,
        // updateImages,
        price:updatePrice,
        description:updateDescription,
        numberOfProduct:updateNumberOfProduct,
      }
      const response = await axios.put(`http://${server}:5000/api/products/updateproduct/${id}`, updateData,config)
      alert(response.data.message);
      getProduct();
      closeForm();
    } catch (error) {
      console.error('خطا:', error);
    }
  }

  async function deleteProduct(id) {
    try {
      const response = await axios.delete(`http://${server}:5000/api/products/deleteproduct/${id}`,config)
      alert(response.data.message);
      getProduct();
    } catch (error) {
      console.error('خطا:', error);
    }
  }

  const middleFunction = (id) => {
    setId(id);
    openForm()
  }

  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };
  /////////////////////////////////////////////////////////////////////////////
  //user product
  const handleClick = (productId) => {
    if(id1.includes(productId)){
      const cards = id1.filter((id)=>id != productId)
    setId1(cards)
    }else{
      const cards = [...id1,productId];
      setId1(cards)
    }
  };
  const toggleDescription = (productId) => {
    if(fullDescription.includes(productId)){
      const fullDescriptionId = fullDescription.filter((id)=>id != productId)
      setFullDescription(fullDescriptionId);
    }else{
      const fullDescriptionId = [...fullDescription,productId]
      setFullDescription(fullDescriptionId);
    }
  };


  async function likeComment(commentId,userId,oneProductId) {
    try {
      const data =  {
        oneProductId
      }
      console.log(data);
      const response = await axios.put(`http://${server}:5000/api/comment/likecomment/${commentId}/${userId}`,data,config);
      getProduct();
      console.log(response.data.data.commentedProduct);
      setOneProduct(response.data.data.commentedProduct);
    } catch (error) {
      console.error('خطا:', error);
      setCommentResponse("برای لایک کردن ابتدا باید وارد شوید یا ثبت نام کنید")
    }
  }

  async function replyToComment(replyComment,commentId,userId,oneProductId,e) {
    try {
      const data =  {
        author:userId,
        text:replyComment
      }
  
      const response = await axios.post(`http://${server}:5000/api/comment/makereplycomment`,data,config);
      const replyCommentId = response.data.data.id;
      console.log(response)
      addReplyToComment(replyCommentId,commentId,oneProductId);
    } catch (error) {
      console.error('خطا:', error);
      setCommentResponse("برای ثبت نظر خود باید وارد شوید یا ثبت نام کنید")
    }
  }

  const handleRyplyComment = (value) => {
    setReplyComments(value);
  };

  async function addReplyToComment(replyCommentId,commentId,oneProductId) {
    try {
      const data =  {
        replyCommentId,
        commentId,
        oneProductId
      }
      console.log(data)
      const response = await axios.put(`http://${server}:5000/api/comment/addReplyComment`,data,config);
      getProduct();
      console.log(response.data);
      setOneProduct(response.data.data.oneProduct);
      setReplyComments('');
    } catch (error) {
      console.error('خطا:', error);
      setCommentResponse("برای ثبت نظر خود باید وارد شوید یا ثبت نام کنید")
    }
  }

  const setProductId = (id,o)=>{
    setIndexOfSelectedProducts(id);
    changeNumber(id,o);
  }

  const changeNumber = (id,o) => {
  if(o === 1){
      setNumberOfSelectedProduct(numberOfSelectedProduct + 1)
  }else
      if(numberOfSelectedProduct <= 1 ){
        setNumberOfSelectedProduct(1)
      }else{
        setNumberOfSelectedProduct(numberOfSelectedProduct - 1)
      }
      

}
  const fetchData = async () => {
    try {
      const productResponse = await axios.get(`http://${server}:5000/api/products/getproducts`);
      const productsData = productResponse.data.data.products;
      console.log(productsData);
      setUserProducts(productsData);
      getUser();
    } catch (error) {
      console.error(error);
    }
  };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
async function getUser () {
    axios.get(`http://${server}:5000/api/user/me`,config)
      .then(response => {
        const id = response.data.data._id;
        setUserId(id);
      })
      .catch(error => {
        console.log(error);
      });
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async function addToBasket(productId,numberOfproduct) {
    try {
      const updateData = {
        productId,
        numberOfproduct
      };
      const response = await axios.put(`http://${server}:5000/api/user/updateuser/${userId}`, updateData,config);
      fetchData();
      userPanelGetUser();//for updating navbar component
      getUser();
      console.log(response.data.message);
      responseApi(response.data.message);
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
      responseApi(error.response.data);
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function addLike(productId) {
    try {
      const updateData = {
        userId,
      };
      const response = await axios.put(`http://${server}:5000/api/products/addlike/${productId}`, updateData, config);
      console.log(response.data.data.updatedProduct);
      fetchData();
      getUser();
      setOneProduct(response.data.data.updatedProduct);//برای ری رندر شدن oneproduct و آپدیت نمایش تعداد لایکها
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
      setCommentResponse("برای لایک کردن ابتدا باید وارد شوید یا ثبت نام کنید")
    }
  }
const handleCommentChange = (productId, value) => {
  setComments({ ...comments, [productId]: value });
};



const[commentResponse,setCommentResponse]= useState(null);

async function addComment(productId,e) {
  e.preventDefault();
  try {
    const data = {
      text: comments[productId],
      userId,
    };
    const response = await axios.post(`http://${server}:5000/api/comment/makecomment/${productId}`,data,config);
    addThisCommentToProduct(response.data.data._id,productId);
  } catch (error) {
    console.error('خطا:', error);
    setCommentResponse(error.response.data.data)
  }
}


async function addThisCommentToProduct(commentId,productId) {
  try {
    const data = {
      commentId,
    };
    const response = await axios.put(`http://${server}:5000/api/products/addcomment/${productId}`, data,config);
    setComments({});
    fetchData();
    console.log(response);
    setOneProduct(response.data.data.product);//برای ری رندر شدن oneproduct و آپدیت نمایش  امنتها
    responseApi("نظر شما بعد از تایید توسط ادمین نمایش داده خواهد شد")
  } catch (error) {
    console.error('خطا:', error);
  }
}

function moreDataAboutProduct(productId){
  setAllDataAboutProduct(productId);
}
  /////////////////////////////////////////////////////////////////////////////
//user panel
  // دریافت مشخصات مشتری برای اضافه کردن به داکیومنت سفارشها)(order)
  async function sendingPostalInformation(orderId,e) {
    e.preventDefault();
    try {
     const data = {
      FName:clientFName,
      LName:clientLName,
      mobile:clientMobile,
      email:clientEmail,
      address:clientAddress,
      postalCode:clientPostalCode,
     }
      console.log(data);
      const response = await axios.put(`http://localhost:5000/api/order/addpostalinformation/${orderId}`, data);
      console.log(response.data);
      responseApi(response.data.message);
    } catch (error) {
      console.error('خطا:', error);
      responseApi(error.response.data.data);
    }
  }
  //ساخت و صدور فاکتور
    async function IssuingInvoice(userBasket,numberOfEachProductInBasket,e) {
      e.preventDefault();
      try {
       const data = {
        productsId:userBasket,
        numberOfEachProductInBasket
       }
        console.log(data);
        const response = await axios.post(`http://localhost:5000/api/order/addorder`,data);
        console.log(response);
        setTotalPrice(response.data.data.totalPrice)
        setFactor(response.data.data.factors)
        const newOrderId = response.data.data.order._id
        setOrderId(newOrderId);
        getUser();
      } catch (error) {
        console.error('خطا:', error);
        responseApi(error.response.data.data);
      }
    }

    function middleFunction1(userBasket,userNumberOfEachProductInBasket,e){
    IssuingInvoice(userBasket,userNumberOfEachProductInBasket,e);
    setUserPanelShowHidden(4);
    }

async function userPanelGetUser(){
 await axios.get(`http://${server}:5000/api/user/me`,config)
    .then(response => {
      const user = response.data.data;
      console.log(user);
      //بر حسب نقش کاربر اطلاعات کاربری در یک استیت جدا قرار میگیرد
      if (user.role === "adminUser") {
        setAdminUserInfo(user);
      } else {
        setUser(user);
      };
      
    })
    .catch(error => {
      console.log(error);
    })
  }; 

async function deleteFromBasket(userId,basketId) {
  const data={
    userId,
    basketId
  }
  console.log(data)
  try {
    const response = await axios.put(`http://${server}:5000/api/user/deletebasket`,data,config)
    alert(response.data.message);
    userPanelGetUser();//for updating navbar
    getUser();
    console.log(response.data)
  } catch (error) {
    console.error('خطا:', error);
  }
}
  ///////////////////////////////////////////////////////////////////////////////////////////
  //register

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  //login
  function handleLogin() {
    const userToken = localStorage.getItem('userToken');
    setToken(userToken);
    console.log(token)
    console.log(userToken)
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // contact
  async function sendMessage(e) {
    e.preventDefault();
    try {
      const addMessage = {
        senderName,
        senderEmail,
        content,
      };
      const response = await axios.post(`http://localhost:5000/api/message/addmessage`,addMessage);
      setSendMessageResponse(response.data.message);
      setSenderName('')
      setSenderEmail('')
      setContent('')
      setTimeout(() => setSendMessageResponse(''), 3000);    
    } catch (error) {
      console.error('خطا:', error);
      setSendMessageResponse(error.response.data.data);
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const[admin , setadmin] = useState(true);
  return (
    <div className="">
      <BrowserRouter>
        <RouteGuard></RouteGuard>
        <div className="">
        <AppContext.Provider
          value={{
            server,
            responseApi,
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
            imageId,
            setImageId,
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
            navSearchInputValue,
            setNavSearchInputValue,
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
          }}>
            {/* {admin === false ? ( */}
                  {/* <AdminPanel></AdminPanel> */}
                {/* ) : ( */}
                  <>
                    <Navbar></Navbar>
                    {/* <AdminPanel></AdminPanel> */}
                     <Routes>
                      <Route path="/oneproduct" element={<OneProduct />} />
                      <Route path="/adminpanel" element={<AdminPanel />} />
                      <Route path="/userdashboard" element={<UserPanel />} />
                      <Route path="/" element={<UserProducts />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                    </Routes> 
                    <Contact></Contact>
                    <Footer></Footer>
                  </>
                {/* )} */}
          </AppContext.Provider>
        </div>
      
      </BrowserRouter>
    </div>
  );
}

export default App;

