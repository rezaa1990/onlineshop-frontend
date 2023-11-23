// App.js
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import AppContext, { AppProvider } from "./context/context.js";
import AdminPanel from "./components/adminpanel";
import Navbar from "./components/navbar";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Login from "./components/login";
import Register from "./components/register";
import UserProducts from "./components/userproducts.jsx";
import UserPanel from "./components/userpanel";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="">
          <AppContext.Consumer value={{}}>
            {({ admin }) => (
              <>
                {!admin ? (
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
              </>
            )}
          </AppContext.Consumer>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
