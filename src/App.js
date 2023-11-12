import { useState } from "react";
import AdminPanel from "./components/adminpanel";
import Banner from "./components/banner";
import Blog from "./components/blog";
import Contact from "./components/contact";
import Features from "./components/features";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Products from "./components/products";
import css from "./css/main.css";
import Register from "./components/register";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from "./components/login";

function App() {
  const [admin, setAdmin] = useState(true);

  return (
    <BrowserRouter>
    <div className="">
      <Navbar></Navbar>
      {admin === false ? (
        <AdminPanel></AdminPanel>
      ) : (
        <>
          <Banner></Banner>
          
          <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          </Routes>
          
          <Features></Features>
          <Products></Products>
          <Blog></Blog>
          <Contact></Contact>
          <Footer></Footer>
        </>
      )}
    </div>
    </BrowserRouter>
  );
}

export default App;
