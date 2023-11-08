import { library } from '@fortawesome/fontawesome-svg-core';
import { faAward, faCoffee, faDove, faHeartbeat, faLeaf, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import products from "./../images/products.png"




library.add(faCoffee);
function Features() {
  return (
    <section className="bg-light py-4">

      <div className="container">


        <div className="text-center">
          <h1 className="text-warning">مدیون اعتماد شماییم</h1>
          <p className="text-muted my-4">مواد شوینده از ترکیبات شیمیایی یا طبیعی تشکیل شده‌اند که برای تمیزی و شستشو مورد استفاده قرار می‌گیرند.</p>
          </div>

        <div className="my-4 text-center row">
          <div className="col-lg-4 col-md-6 px-4 mb-4">
            <i className="text-warning" style={{ fontSize: '100px' }}><FontAwesomeIcon icon={faAward} /></i>
            <h1 className="text-secondary">نشان برتر</h1>
            <p className="text-muted mt-2">این مواد باید به دقت استفاده شوند تا آسیب به محیط زیست و پوست انسانها جلوگیری شود</p>
          </div>

          <div className="col-lg-4 col-md-6 px-4 mb-4">
            <i className="text-success" style={{ fontSize: '100px' }}><FontAwesomeIcon icon={faLeaf} /></i>
            <h1 className="text-secondary">کاملا طبیعی</h1>
            <p className="text-muted mt-2">این مواد باید به دقت استفاده شوند تا آسیب به محیط زیست و پوست انسانها جلوگیری شود</p>
          </div>

          <div className="col-lg-4 col-md-12 px-4 mb-4">
            <i className="text-danger" style={{ fontSize: '100px' }}><FontAwesomeIcon icon={faHeartbeat} /></i>
            <h1 className="text-secondary">دوست دار سلامتی</h1>
            <p className="text-muted mt-2">این مواد باید به دقت استفاده شوند تا آسیب به محیط زیست جلوگیری شود</p>
          </div>
        </div>


      </div>

    </section>
  );
}

export default Features;
