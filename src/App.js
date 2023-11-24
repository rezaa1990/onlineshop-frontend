// App.js
import { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
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


  useEffect(() => {
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
  }, []);

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
      alert(response.data.message)
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
      alert(response.data.message)
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
  const[admin , setadmin] = useState(true)
  return (
    <BrowserRouter>
      
        <div className="">
          <AppContext.Provider value={{
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

          }}>
            {admin === true ? (
                  <AdminPanel></AdminPanel>
                ) : (
                  <>
                    <Navbar></Navbar>
                    <Routes>
                      <Route path="/userdashboard" element={<UserPanel />} />
                      <Route path="/" element={<UserProducts />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                    </Routes>
                    <Contact></Contact>
                    <Footer></Footer>
                  </>
                )}
          </AppContext.Provider>
        </div>
      
    </BrowserRouter>
  );
}

export default App;
