import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState,useContext } from 'react';
import AppContext from '../context/context';


function Contact() {
  const{
    senderName,
    setSenderName,
    senderEmail,
    setSenderEmail,
    content,
    setContent,
    sendMessageResponse,
    setSendMessageResponse,
    sendMessage,
  }=useContext(AppContext);

  return (
    <section className='p-5 contact' style={{borderTop:"1px white solid"}}>
      <div className="container-fluid">
      <div className="text-center">
            <h1 className="text text-light">ارتباط با ما</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h3 className="text-light my-5 ">آیا سوالی دارید؟</h3>
              <form action="" className="text-muted">

              <div className="form-group">
                  <p className="text-center text-warning">{sendMessageResponse}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="name" className='text-light'>نام</label>
                  <input value={senderName} onChange={(e)=>setSenderName(e.target.value)} id="contact-input" type="text" className="form-control border-0 text-light" />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className='text-light'>ایمیل</label>
                  <input value={senderEmail} onChange={(e)=>setSenderEmail(e.target.value)} id="contact-input" type="text" className="form-control border-0 text-light" />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className='text-light'>پیام</label>
                  <textarea value={content} onChange={(e)=>setContent(e.target.value)} className="form-control border-0 text-light" name="" id="contact-input" cols="30" rows="3"></textarea>
                </div>
                <button className="btn btn-success my-1 w-100" onClick={(e)=>sendMessage(e)}>ارسال</button>

              </form>
            </div>
          </div>
      </div>
    </section>
  );
}

export default Contact;