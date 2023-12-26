import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faDove, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import products from "./../images/products.png"

function Banner() {
  return (
    <section>

      <div className="container-fluid">
        <div className="row bg-warning align-items-center text-center" style={{ height: '95vh' }}>
          <div className="col-md-6 col-lg-8">
            <h1 className='display-3 text-white'><span className='display-2'> داو</span> دوست دار پوست شما</h1>
            <h2 className='display-4 my-4'>داو فرق میکنه</h2>
            <a className='btn btn-light btn-lg mx-1' href="">باشگاه مشتریان</a>
            <a className='btn btn-outline-light btn-lg mx-1' href="">وبلاگ</a>
          </div>
        
          <div className="col-lg-4">
            <img src={products} alt="" className="img-fluid d-none d-lg-block" />
          </div>
        </div>
      </div>


    </section>
  );
}

export default Banner;
