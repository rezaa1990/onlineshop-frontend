import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    async function fetchMessages() {
      try {
        const userToken = localStorage.getItem('userToken');
        const config = {
          headers: {
            'token1': `${userToken}`
          }
        };
        
        const response = await axios.get('http://localhost:5000/api/message/getmessages', config);
        const allMessages = response.data.data.message;
        console.log("message" ,allMessages)
        // const lastStoredDate = localStorage.getItem('lastmessagedate');
        // const filteredMessages = lastStoredDate
        //   ? allMessages.filter(message => message.updatedAt > lastStoredDate)
        //   : allMessages;
        // console.log(filteredMessages)
        // setMessages(filteredMessages);
        setMessages(allMessages);
        // if (allMessages.length > 0) {
        //   const latestMessage = allMessages[allMessages.length - 1];
        //   localStorage.setItem('lastmessagedate', latestMessage.updatedAt);
        // }
      } catch (error) {
        console.error('Error fetching messages:', error);
        // Handle error here and display a user-friendly message
      }
    }

    fetchMessages();
  }, []);

  const [expandedMessageIndex, setExpandedMessageIndex] = useState(-1);

  const toggleMessageExpand = (index) => {
    if (expandedMessageIndex === index) {
      setExpandedMessageIndex(-1);
    } else {
      setExpandedMessageIndex(index);
    }
  };
  console.log(messages)
  return (
    <div className="">
      <div className="bg-primary rounded-4">
        <h3 className="text-center text-light p-1">پیامها</h3>
        <div className="border rounded bg-light p-2 ">
          <ul
            className="col-md-8 mx-auto"
            style={{
              maxHeight: "300px",
              overflow: "auto",
              listStyleType: "none",
              padding: 0,
            }}
          >
            {messages.map((message, index) => (
              <li
                key={index}
                id="message-list"
                className="rounded m-1"
                style={{ borderBottom: "1px solid #ccc" }}
              >
                <div className="text-muted">
                  <div className="d-flex">
                    <strong className="px-1">فرستنده:</strong>
                    <div className="">{message.sender}</div>
                  </div>
                  <div className="d-flex">
                    <strong className="px-1">ایمیل:</strong>
                    <div className="">{message.email}</div>
                  </div>
                </div>
                <div className="mt-2" style={{ wordWrap: "break-word" }}>
                  <strong className="px-1 text-muted">متن پیام:</strong>
                  <div className="text-center px-2">
                    {expandedMessageIndex === index
                      ? message.content
                      : message.content.substring(0, 20)}
                  </div>

                  {message.content.length > 20 && (
                    <div className="text-center">
                      <button
                        className="btn btn-link p-0"
                        onClick={() => toggleMessageExpand(index)}
                      >
                        {expandedMessageIndex === index ? "بستن" : "بیشتر"}
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
};

export default MessageList;
