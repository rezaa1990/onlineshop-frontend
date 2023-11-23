import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


library.add(faCoffee);
function Contact() {
  return (
    <section className='p-5'>
      <div className="container-fluid">
      <div className="text-center">
            <h1 className="text">ارتباط با ما</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h3 className="text-secondary my-5">آیا سوالی دارید؟</h3>
              <form action="" className="text-muted">


                <div className="form-group">
                  <label htmlFor="name">نام</label>
                  <input id="name" type="text" className="form-control" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">ایمیل</label>
                  <input id="email" type="text" className="form-control" />
                </div>

                <div className="form-group">
                  <label htmlFor="message">پیام</label>
                  <textarea className="form-control" name="" id="message" cols="30" rows="3"></textarea>
                </div>
                <button className="btn btn-outline-success my-1 w-100">ارسال</button>

              </form>
            </div>
          </div>
      </div>
    </section>
  );
}

export default Contact;