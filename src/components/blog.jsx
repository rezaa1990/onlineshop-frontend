import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import p1 from "./../images/p1.jpg"
import p2 from "./../images/p2.jpg"
import p3 from "./../images/p3.jpg"

function Products() {
  return (
    <section className='py-5'>
      <div className="container">
          <div className="text-center">
            <h1 className="text-warning">کیفیت معین محصولات ماست</h1>
            <p className="text-muted my-5">این مواد باید به دقت استفاده شوند تا آسیب به محیط زیست جلوگیری شود</p>
          </div>
          <div className="row my-5 text-center">

            <div className="col-lg-4 col-md-6 p-5">
              <img src={p1} alt="" className="img-thumbnail" />
              <h2 className="my-3 text-secondary">نرم کننده</h2>
              <p className="text-muted">این مواد باید به دقت استفاده شوند تا آسیب به محیط زیست جلوگیری شود</p>
            </div>

            <div className="col-lg-4 col-md-6 p-5">
              <img src={p2} alt="" className="img-thumbnail" />
              <h2 className="my-3 text-secondary">پکیج داو</h2>
              <p className="text-muted">این مواد باید به دقت استفاده شوند تا آسیب به محیط زیست جلوگیری شود</p>
            </div>

            <div className="col-lg-4 col-md-12 p-5">
              <img src={p3} alt="" className="img-thumbnail" />
              <h2 className="my-3 text-secondary">صابونها</h2>
              <p className="text-muted">این مواد باید به دقت استفاده شوند تا آسیب به محیط زیست جلوگیری شود</p>
            
            </div>

          </div>
      </div>
    </section>
  );
}

export default Products;