import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faFaceAngry, faGolfBall, faLaughWink} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import b1 from "./../images/b1.jpg"
import b2 from "./../images/b2.jpg"
import b3 from "./../images/b3.jpg"
import b4 from "./../images/b4.jpg"

library.add(faCoffee);
function Blog() {
  return (
    <section className='bg-secondary p-5'>
      <div className="container-fluid">
        <h1 className="text-warning text-center mb-5">تازه های وبلاگ</h1>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-5 px-3">
            <div className="card">
              <img src={b1} alt="" className="card-img-top" />
              <div className="card-body">
                <div className="card-title">
                  <h3 className="text-secondary">تست تست تست </h3>
                </div>
                <div className="card-subtitle my-4">
                  <p className="text-muted">این مواد باید به دقت استفاده شوند تا آسیب به محیط زیست و پوست انسانها جلوگیری شود</p>
                </div>
                <div className="text-right">
                  <a href=""><i className="ml-3 text-primary" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faFaceAngry} /></i></a>
                  <a href=""><i className="ml-3 text-info" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faGolfBall} /></i></a>
                  <a href=""><i className="ml-3 text-danger" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faLaughWink} /></i></a>
                </div>
              </div>
            </div>
          </div>


          <div className="col-lg-3 col-md-6 mb-5 px-3">
            <div className="card">
              <img src={b2} alt="" className="card-img-top" />
              <div className="card-body">
                <div className="card-title">
                  <h3 className="text-secondary">تست تست تست </h3>
                </div>
                <div className="card-subtitle my-4">
                  <p className="text-muted">این مواد باید به دقت استفاده شوند تا آسیب به محیط زیست و پوست انسانها جلوگیری شود</p>
                </div>
                <div className="text-right">
                  <a href=""><i className="ml-3 text-primary" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faFaceAngry} /></i></a>
                  <a href=""><i className="ml-3 text-info" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faGolfBall} /></i></a>
                  <a href=""><i className="ml-3 text-danger" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faLaughWink} /></i></a>
                </div>
              </div>
            </div>
          </div>




          <div className="col-lg-3 col-md-6 mb-5 px-3">
            <div className="card">
              <img src={b3} alt="" className="card-img-top" />
              <div className="card-body">
                <div className="card-title">
                  <h3 className="text-secondary">تست تست تست </h3>
                </div>
                <div className="card-subtitle my-4">
                  <p className="text-muted">این مواد باید به دقت استفاده شوند تا آسیب به محیط زیست و پوست انسانها جلوگیری شود</p>
                </div>
                <div className="text-right">
                  <a href=""><i className="ml-3 text-primary" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faFaceAngry} /></i></a>
                  <a href=""><i className="ml-3 text-info" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faGolfBall} /></i></a>
                  <a href=""><i className="ml-3 text-danger" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faLaughWink} /></i></a>
                </div>
              </div>
            </div>
          </div>




          <div className="col-lg-3 col-md-6 mb-5 px-3">
            <div className="card">
              <img src={b4} alt="" className="card-img-top" />
              <div className="card-body">
                <div className="card-title">
                  <h3 className="text-secondary">تست تست تست </h3>
                </div>
                <div className="card-subtitle my-4">
                  <p className="text-muted">این مواد باید به دقت استفاده شوند تا آسیب به محیط زیست و پوست انسانها جلوگیری شود</p>
                </div>
                <div className="text-right">
                  <a href=""><i className="ml-3 text-primary" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faFaceAngry} /></i></a>
                  <a href=""><i className="ml-3 text-info" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faGolfBall} /></i></a>
                  <a href=""><i className="ml-3 text-danger" style={{ fontSize: '30px' }}><FontAwesomeIcon icon={faLaughWink} /></i></a>
                </div>
              </div>
            </div>
          </div>




        </div>
      </div>
    </section>
  );
}

export default Blog;