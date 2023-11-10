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

function App() {
  const [admin, setAdmin] = useState(true);

  return (
    <div className="">
      <Navbar></Navbar>
      {admin === false ? (
        <AdminPanel></AdminPanel>
      ) : (
        <>
          <Banner></Banner>
          <Features></Features>
          <Products></Products>
          <Blog></Blog>
          <Contact></Contact>
          <Footer></Footer>
        </>
      )}
    </div>
  );
}

export default App;
