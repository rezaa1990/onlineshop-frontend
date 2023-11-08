import Banner from "./components/banner";
import Blog from "./components/blog";
import Contact from "./components/contact";
import Features from "./components/features";
import Navbar from "./components/navbar";
import Products from "./components/products";
import css from "./css/main.css"
function App() {
  return (
    <div className="">
      <Navbar></Navbar>
      <Banner></Banner>
      <Features></Features>
      <Products></Products>
      <Blog></Blog>
      <Contact></Contact>
    </div>
  );
}

export default App;
