import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/message/getmessages');
        const allMessages = response.data.data.message;

        // Check if there's a last message date stored in localStorage
        const lastStoredDate = localStorage.getItem('lastmessagedate');
        if (lastStoredDate) {
          const filteredMessages = allMessages.filter(message => message.updatedAt > lastStoredDate);
          setNewMessages(filteredMessages);
        } else {
          setNewMessages(allMessages);
        }

        // Update localStorage with the latest message date
        if (allMessages.length > 0) {
          const latestMessage = allMessages[allMessages.length - 1];
          localStorage.setItem('lastmessagedate', latestMessage.updatedAt);
        }
        
        setMessages(allMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container-fluid bg-warning">
    <div className=" shadow-sm">
      {/* <h6>پیامهای جدید</h6> */}
      <div className="bg-warning text-center" style={{  maxHeight: "300px",overflow: "auto"}}>
        {newMessages.map((message, index) => (
          <div className='bg-info' key={index}>{message.sender}</div>
        ))}
      </div>
    </div>

    <div className=" shadow-sm bg-danger">
      {/* <h6>همه ی پیامها</h6> */}
      <div className="text-center" style={{  maxHeight: "300px",overflow: "auto"}}>
        {messages.map((message, index) => (
          <div className='' key={index}>{message.sender}</div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default MessageList;
