import Banner from "./components/banner";
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
    </div>
  );
}

export default App;
