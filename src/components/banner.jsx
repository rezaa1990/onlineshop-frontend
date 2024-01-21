import { useState, useEffect } from 'react';
// import './Banner.css'; // فایل CSS جدید

import b1 from './../images/b1.jpg';
import b2 from './../images/b2.jpg';
import b3 from './../images/b3.jpg';

function Banner() {
  const images = [b1, b2, b3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, images.length]);

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="container-fluid" id="banner">
      <div className="">
        <div className={`row bg-primary align-items-center text-center`}>
          <div className="col-md-6 col-lg-8">
            <h1 className='display-3 text-white'><span className=''>ما </span>همیشه با شما هستیم</h1>
            <h2 className='display-4 my-4'>جدیدترین محصولات</h2>
          </div>
          <div className="col-md-4 position-relative py-1">
            <img
              src={images[currentImageIndex]}
              alt="تصویر"
              className="container-fluid rounded-5 fade"
            />
            <div className="dots-container">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
