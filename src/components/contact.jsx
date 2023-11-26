import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';


function Contact() {
  const [senderName,setSenderName]=useState('');
  const [senderEmail,setSenderEmail]=useState('');
  const [content,setContent]=useState('');
  const [sendMessageResponse,setSendMessageResponse]=useState('')

  async function sendMessage(e) {
    e.preventDefault();
    try {
      const addMessage = {
        senderName,
        senderEmail,
        content,

      };
      console.log(addMessage);
      const response = await axios.post(`http://localhost:5000/api/message/addmessage`,addMessage);
      console.log(response.data);
      setSendMessageResponse(response.data.message);
      setSenderName('')
      setSenderEmail('')
      setContent('')
    } catch (error) {
      console.error('خطا:', error);
    }
  }

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
                  <p className="text-center text-success">{sendMessageResponse}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="name">نام</label>
                  <input value={senderName} onChange={(e)=>setSenderName(e.target.value)} id="name" type="text" className="form-control" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">ایمیل</label>
                  <input value={senderEmail} onChange={(e)=>setSenderEmail(e.target.value)} id="email" type="text" className="form-control" />
                </div>

                <div className="form-group">
                  <label htmlFor="message">پیام</label>
                  <textarea value={content} onChange={(e)=>setContent(e.target.value)} className="form-control" name="" id="message" cols="30" rows="3"></textarea>
                </div>
                <button className="btn btn-outline-success my-1 w-100" onClick={(e)=>sendMessage(e)}>ارسال</button>

              </form>
            </div>
          </div>
      </div>
    </section>
  );
}

export default Contact;