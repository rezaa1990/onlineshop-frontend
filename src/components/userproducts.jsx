import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faFaceAngry, faGolfBall, faHeart, faLaughWink, faListCheck, faShoppingBasket, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import p1 from "./../images/p1.jpeg"
import { Await } from 'react-router-dom';
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UserProducts() {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState();
  // const [reRender, setReRender] = useState(false);
  const [comments, setComments] = useState({});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const fetchData = async () => {
    try {
      const productResponse = await axios.get(`http://localhost:5000/api/products/getproducts`);
      console.log(productResponse.data.data.products);
      const productsData = productResponse.data.data.products;
      setProducts(productsData);
      getUser();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
async function getUser () {
    const userToken = localStorage.getItem('userToken');
    const config = {
      headers: {
        'token1': `${userToken}`
      }
    };
    console.log(config);
    axios.get(`http://localhost:5000/api/user/me`,config)
      .then(response => {
        // console.log("user",response);
        console.log("pro", response.data);
        const id = response.data.data._id;
        console.log(id);
        setUserId(id);
        console.log(userId);
      })
      .catch(error => {
        console.log(error);
      });
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async function addToBasket(productId) {
    try {
      const userToken = localStorage.getItem('userToken');
      const config = {
        headers: {
          'token1': `${userToken}`
        }
      };
      
      const updateData = {
        productId,

      };
      console.log(updateData);
      console.log(userId);
      const response = await axios.put(`http://localhost:5000/api/user/updateuser/${userId}`, updateData,config);
      console.log(response.data.message);
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function addLike(productId) {
    try {
      const userToken = localStorage.getItem('userToken');
      const config = {
        headers: {
          'token1': `${userToken}`
        }
      };
      
      const updateData = {
        userId,
  
      };
      console.log(updateData);
      console.log(userId);
      const response = await axios.put(`http://localhost:5000/api/products/addlike/${productId}`, updateData,config);
      console.log(response.data.message);
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const handleCommentChange = (productId, value) => {
  setComments({ ...comments, [productId]: value });
};


async function addComment(productId,e) {
  e.preventDefault();
  try {
    const userToken = localStorage.getItem('userToken');
    const config = {
      headers: {
        'token1': `${userToken}`
      }
    };
    
    const data = {
      author:userId,
      text:comments[productId],

    };
    console.log(data);
    const response = await axios.post(`http://localhost:5000/api/comment/addcomment`, data,config);
    console.log(response.data);
    addThisCommentToProduct(response.data.data._id,productId);
  } catch (error) {
    console.error('خطا:', error);
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function addThisCommentToProduct(commentId,productId) {
  try {
    const userToken = localStorage.getItem('userToken');
    const config = {
      headers: {
        'token1': `${userToken}`
      }
    };
    
    const data = {
      productId,
      commentId,

    };
    console.log(data);
    const response = await axios.put(`http://localhost:5000/api/products/addcomment`, data,config);
    console.log(response.data);
    setComments({});
    fetchData();
  } catch (error) {
    console.error('خطا:', error);
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
return (
    <>
      <section className='p-5'>
        <div className="container-fluid">
          <h1 className="text-center mb-5">محصولات</h1>
          <div className="row">
            {products.map((product) =>
              <div className="col-lg-3 col-md-6 mb-5 px-3">
                <div className="card">
                  <img src={p1} alt="" className="card-img-top" />
                  <div className="card-body">
                    <div className="card-title">
                      <h3 className="text-secondary">{product.name}</h3>
                    </div>
                    <div className="card-subtitle my-4">
                      <p className="text-muted">{product.description}</p>
                    </div>


                    <div className="row" style={{borderTop: '1px solid' }}>

                      <p className="col-6 text-end p-3" onClick={()=>addToBasket(product._id)}>
                        <i className="buylike p-2" style={{ fontSize: '15px',cursor:'pointer'}}><FontAwesomeIcon icon={faShoppingBasket} /></i>
                      </p>
                     
                      <div className="col-6 p-3 d-flex">
                        <p className="me-auto">
                          {product.numberOfLikes?.length}                        
                          <i className="p-2 buylike" onClick={()=>addLike(product._id)} style={{ fontSize: '15px',cursor:'pointer'}}><FontAwesomeIcon icon={faHeart} /></i>
                        </p>
                      </div>

                    </div>


                  </div>


                  <div className="comments" style={{  minHeight: "200px"}}>

                    <form className="m-2">
                      <div className="input-group">
                        {/* <input placeholder='نظر خود را بنویسید ...' onChange={(e) => addComment(e.target.value)} id="" type="text" className="form-control" /> */}
                        <textarea
                          value={comments[product._id] || ''}
                          onChange={(e)=>handleCommentChange(product._id, e.target.value)}
                          className="form-control"
                          id="message"
                          cols="30"
                          rows="1"
                          placeholder='نظر خود را بنویسید ...'>
                        </textarea>
                        <div className=""><button onClick={(e)=>addComment(product._id,e)} className="btn btn-secondary">ثبت نظر</button></div>
                      </div>
                    </form>

                    <div className="m-1" style={{  maxHeight: "100px"}}>
                      <p className="text-secondary text-center"> نظرات دیگران</p>

                      <div className="shadow-sm" style={{  maxHeight: "100px",overflow: "auto"}}>

                        {product.comments?.map((coments)=>
                        <div className="row mx-1 shadow-sm">
                          <p className="col-6">{coments?.text}</p>
                          {coments.author?.map((author)=>
                          <p className="col-6 text-start">{author?.fName}</p>
                          )}
                        </div>
                        )}

                      </div>
                   </div>

                  </div>
                  
                </div>
                
              </div>
              )}
            

          </div>

        </div>
      </section>
    </>
  );
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default UserProducts;
