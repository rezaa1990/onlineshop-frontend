// App.js
import { useState,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom';
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


function App() {
  
  ///////////////////////////////////////////////////////////////////////////
  //admin component
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [numberOfLikes, setNumberOfLikes] = useState("");
  const [description, setDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [img, setImg] = useState();
  const [showHidden, setShowHidden] = useState();

  async function addProduct(e) {
    e.preventDefault();
    try {
      const addProduct = {
        name,
        price,
        numberOfLikes,
        description,
        img,
      };
      console.log(addProduct);
      const response = await axios.post(`http://localhost:5000/api/products/addproduct`,addProduct);
      console.log(response.data);
      setResponseMessage(response.data.message);
      setShowHidden(4);
      getProduct();
      console.log(showHidden);
    } catch (error) {
      console.error('خطا:', error);
    }
  }
  /////////////////////////////////////////////////////////////////////////////
  //producti ke dakhele admine
  const [products, setProducts] = useState([]);
  const [id, setId] = useState();
  const [updateName, setUpdateName] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateNumberOfLikes, setUpdateNumberOfLikes] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateImg, setUpdateImg] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  //در این تابع فقط هنگام رندر شدن اولیه ی کامپوننت مقادیر محصولات در استیت قرار میگیرد
  useEffect(() => {
  getProduct();
  }, []);

  //این تابع پس از آپدیت یا خذف یا اضافه کردن یک محصول توسط ادمین صدا زده میشود تا مقادیر جدید محصولات در استیت قرار بگیرد
  async function getProduct(id) {
    axios.get(`http://localhost:5000/api/products/getproducts`)
    .then(response => {
      console.log(response.data.message);
      console.log("pro", response.data.data.products);
      const p = response.data.data.products;
      setProducts(p);
      console.log(products);
    })
    .catch(error => {
      console.log(error);
    });
  };

  async function updateProduct(id) {
    try {
      const updateData = {
        name:updateName,
        price:updatePrice,
        numberOfLikes:updateNumberOfLikes,
        description:updateDescription,
        img:updateImg,
      }
      console.log(id);
      const response = await axios.put(`http://localhost:5000/api/products/updateproduct/${id}`, updateData)
      console.log(response.data.message);
      console.log(response.data);
      alert(response.data.message);
      getProduct();
      closeForm();
    } catch (error) {
      console.error('خطا:', error);
    }
  }

  async function deleteProduct(id) {
    try {
      console.log(id);
      const response = await axios.delete(`http://localhost:5000/api/products/deleteproduct/${id}`)
      console.log(response.data.message);
      console.log(response.data);
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
  const [userProducts, setUserProducts] = useState([]);
  const [userId, setUserId] = useState();
  const [comments, setComments] = useState({});

  const fetchData = async () => {
    try {
      const productResponse = await axios.get(`http://localhost:5000/api/products/getproducts`);
      console.log(productResponse.data.data.products);
      const productsData = productResponse.data.data.products;
      console.log(productsData);
      setUserProducts(productsData);
      console.log(userProducts);
      getUser();
    } catch (error) {
      console.error(error);
    }
  };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
async function getUser () {
    const userToken = localStorage.getItem('userToken');
    const config = {
      headers: {
        'token1': `${userToken}`
      }
    };
    console.log(config);
    axios.get(`http://localhost:5000/api/user/me`,config)
      .then(response => {
        // console.log("user",response);
        console.log("pro", response.data);
        const id = response.data.data._id;
        console.log(id);
        setUserId(id);
        console.log(userId);
      })
      .catch(error => {
        console.log(error);
      });
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async function addToBasket(productId) {
    try {
      const userToken = localStorage.getItem('userToken');
      const config = {
        headers: {
          'token1': `${userToken}`
        }
      };
      
      const updateData = {
        productId,

      };
      console.log(updateData);
      console.log(userId);
      const response = await axios.put(`http://localhost:5000/api/user/updateuser/${userId}`, updateData,config);
      console.log(response.data.message);
      console.log(response.data);
      fetchData();
      userPanelGetUser();//for updating navbar component
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function addLike(productId) {
    try {
      const userToken = localStorage.getItem('userToken');
      const config = {
        headers: {
          'token1': `${userToken}`
        }
      };
      
      const updateData = {
        userId,
  
      };
      console.log(updateData);
      console.log(userId);
      const response = await axios.put(`http://localhost:5000/api/products/addlike/${productId}`, updateData,config);
      console.log(response.data.message);
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
    }
  }
const handleCommentChange = (productId, value) => {
  setComments({ ...comments, [productId]: value });
};

async function addComment(productId,e) {
  e.preventDefault();
  try {
    const userToken = localStorage.getItem('userToken');
    const config = {
      headers: {
        'token1': `${userToken}`
      }
    };
    
    const data = {
      author:userId,
      text:comments[productId],

    };
    console.log(data);
    const response = await axios.post(`http://localhost:5000/api/comment/addcomment`, data,config);
    console.log(response.data);
    addThisCommentToProduct(response.data.data._id,productId);
  } catch (error) {
    console.error('خطا:', error);
  }
}

async function addThisCommentToProduct(commentId,productId) {
  try {
    const userToken = localStorage.getItem('userToken');
    const config = {
      headers: {
        'token1': `${userToken}`
      }
    };
    
    const data = {
      productId,
      commentId,

    };
    console.log(data);
    const response = await axios.put(`http://localhost:5000/api/products/addcomment`, data,config);
    console.log(response.data);
    setComments({});
    fetchData();
  } catch (error) {
    console.error('خطا:', error);
  }
}
  /////////////////////////////////////////////////////////////////////////////
//user panel
const [user, setUser] = useState({});
const [userPanelShowHidden, setUserPanelShowHidden] = useState(2);

function userPanelGetUser(){
  const userToken = localStorage.getItem('userToken');
  const config = {
  headers: {
    'token1': `${userToken}`
  }
  };

  axios.get(`http://localhost:5000/api/user/me`,config)
    .then(response => {
      console.log("user",response);
      console.log("pro", response.data.data);
      const p = response.data.data;
      setUser(p);
      console.log(user);
    })
    .catch(error => {
      console.log(error);
    })
  };


async function deleteFromBasket(userId,basketId) {
  console.log('userid:',userId,'basketid',basketId);

  const userToken = localStorage.getItem('userToken');
  const config = {
    headers: {
    'token1': `${userToken}`
    }
  };

  const data={
    userId,
    basketId
  }

  try {
    const response = await axios.put(`http://localhost:5000/api/user/deletebasket`,data,config)
    console.log(response.data.message);
    console.log(response.data);
    getUser();
    alert(response.data.message);
    userPanelGetUser();//for updating navbar
  } catch (error) {
    console.error('خطا:', error);
  }
}
  ///////////////////////////////////////////////////////////////////////////////////////////
  //register
  const[fName , setRegisterName ]= useState("fname");
  const[lName , setLastName ]= useState("lname");
  const[email , setEmail ]= useState("");
  const[mobile , setMobile ]= useState(0);
  const[address , setAddress ]= useState("address");
  const[password , setPassword ]= useState("");
  const[repeatPassword , setRepeatPassword ]= useState("");
  const[postalCode , setPostalCode ]= useState(0);
  const[showRegisterMessage , setShowRegisterMessage ]= useState(true);
  const[registerResponseMessage,setRegisterResponseMessage]=useState();

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  //login
  const[logInLogUot,setLogInLogUot]=useState(true);//for showing login and logout link in navbar
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const[admin , setadmin] = useState(true)
  return (
    <BrowserRouter>
      
        <div className="">
          <AppContext.Provider value={{
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
            isFormVisible,
            setIsFormVisible,
            updateProduct,
            middleFunction,
            closeForm,
            openForm,
            deleteProduct,
            useEffect,
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
            //user panel
            user,
            setUser,
            userPanelShowHidden,
            setUserPanelShowHidden,
            userPanelGetUser,
            deleteFromBasket,
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


          }}>
            {/* {admin === false ? (
                  <AdminPanel></AdminPanel>
                ) : ( */}
                  <>
                    <Navbar></Navbar>
                    <Routes>
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
  );
}

export default App;
