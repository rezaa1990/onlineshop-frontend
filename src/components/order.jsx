import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import jMoment from "moment-jalaali";
import pp from "./../images/pp.jpg";
import p1 from "./../images/p1.jpeg";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterPostalCode, setFilterPostalCode] = useState("");
  const [filterSendToPost, setFilterSendToPost] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);
  useEffect(() => {
    async function fetchOrders() {
      try {
        const userToken = localStorage.getItem("userToken");
        const config = {
          headers: {
            token1: `${userToken}`,
          },
        };

        const response = await axios.get(
          "http://localhost:5000/api/order/getorder",
          config
        );
        const allOrders = response.data.data.orders;
        setOrders(allOrders);
        setFilteredOrders(allOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, [forceUpdate]);

  const handleNameFilter = (name) => {
    setFilterName(name);
    filterOrdersByName(name);
  };

  const handlePostalCodeFilter = (postalCode) => {
    setFilterPostalCode(postalCode);
    filterOrdersByPostalCode(postalCode);
  };

  const handleSendToPostFilter = (value) => {
    setFilterSendToPost(value);
  };

  const filterOrdersByName = (name) => {
    const filteredByName = orders.filter(
      (item) => item.FName.includes(name) || item.LName.includes(name)
    );
    setFilteredOrders(filteredByName);
  };

  const filterOrdersByPostalCode = (postalCode) => {
    const filteredByPostalCode = orders.filter((item) =>
      item.postalCode.includes(postalCode)
    );
    setFilteredOrders(filteredByPostalCode);
  };

  useEffect(() => {
    const filteredByName = orders.filter(
      (item) =>
        item.FName.includes(filterName) || item.LName.includes(filterName)
    );
    const filteredByPostalCode = orders.filter((item) =>
      item.postalCode.includes(filterPostalCode)
    );
    const filteredBySendToPost = orders.filter(
      (item) =>
        filterSendToPost === "" ||
        item.sendToPost === (filterSendToPost === "yes")
    );

    const filteredOrders = filteredByName.filter(
      (item) =>
        filteredByPostalCode.includes(item) &&
        filteredBySendToPost.includes(item)
    );

    const sortedOrders = filteredOrders.slice().sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    setFilteredOrders(sortedOrders);
  }, [filterName, filterPostalCode, filterSendToPost, orders]);

  const breakText = (text, maxLength) => {
    if (text.length > maxLength) {
      const firstPart = text.slice(0, maxLength);
      const remainingPart = text.slice(maxLength);
      return (
        <>
          {firstPart}
          <br />
          {breakText(remainingPart, maxLength)}
        </>
      );
    }
    return text;
  };
  const OrderDetails = ({ order }) => {
    return (
      <div className="d-flex rounded-4 shadow">
        <div className="col-6 col-md-3 p-1 mt-1">
          <p className="p-1 m-0">
            <strong>نام: </strong>
            {order.FName}
          </p>
          <p className="p-1 m-0">
            <strong>نام خانوادگی: </strong>
            {order.LName}
          </p>
          <p className="p-1 m-0" style={{ wordBreak: "break-word" }}>
            <strong>آدرس: </strong>
            {breakText(order.address, 20)}
          </p>

          <p className="p-1 m-0">
            <strong>ایمیل: </strong>
            {breakText(order.email, 8)}
          </p>
          <p className="p-1 m-0">
            <strong>موبایل: </strong>
            {order.mobile}
          </p>
          <p className="p-1 m-0">
            <strong>کد پستی: </strong>
            {order.postalCode}
          </p>
        </div>
        <div className="col-6 col-md-3 p-1 mt-1">
          <p className="p-1 m-0">
            <strong>پرداخت شده: </strong>
            {order.payment ? "بله" : "خیر"}
          </p>
          <p className="p-1 m-0">
            <strong>ارسال: </strong>
            {order.sendToPost ? "بله" : "خیر"}
          </p>
          <p className="p-1 m-0">
            <strong>تعداد: </strong>
            {order.numberOfEachProductInBasket}
          </p>
          <p className="p-1 m-0">
            <strong>نام کالا: </strong>
            {order.productsId?.map((product) => product.name).join(", ")}
          </p>
          <p className="p-1 m-0" style={{ wordBreak: "break-word" }}>
            <strong>تاریخ ثبت: </strong>
            {jMoment(moment(order.createdAt).format()).format(
              "jYYYY/jMM/jDD HH:mm"
            )}
          </p>
        </div>
      </div>
    );
  };

  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleOrderSelection = (orderIdd) => {
    console.log(orderIdd);
    if (selectedOrders.includes(orderIdd)) {
      const filteredorder = selectedOrders.filter((id) => id !== orderIdd);
      setSelectedOrders(filteredorder);
      console.log("1",filteredorder)
    } else {
      const orders = [...selectedOrders, orderIdd];
      setSelectedOrders(orders);
      console.log("2",orders)
    }
  };

  async function handleSendToPostOrder() {
    try {
      const userToken = localStorage.getItem("userToken");
        const config = {
          headers: {
            token1: `${userToken}`,
          },
        };
      
      const data = {
        selectedOrders
      };
      const response = await axios.put(`http://localhost:5000/api/order/sendtopostorder`, data, config);
      console.log(response);
      setSelectedOrders([]);
      setForceUpdate(prevState => !prevState);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="" id="order">
      <div className="bg-primary rounded-4">
        <h3 className="pt-1 text-center text-light">سفارشها</h3>
        <div className="bg-light pt-3 rounded-4 ">
          {/* filters */}
          <div className="bg-secondary mx-auto d-flex col-md-8 justify-content-center filters align-items-center mt-3">
            <input
              className="col-4 rounded border-0 m-1 p-1"
              type="text"
              placeholder="فیلتر/نام"
              onChange={(e) => handleNameFilter(e.target.value)}
            />
            <input
              className="col-4 rounded border-0 m-1 p-1"
              type="text"
              placeholder="فیلتر/کد پستی"
              onChange={(e) => handlePostalCodeFilter(e.target.value)}
            />
            <div className="col-3 bg-light rounded m-1 p-1">
              <div className="d-flex">
                <label className="col-5 col-md-6 text-muted" htmlFor="">
                  وضعیت
                </label>
                <select
                  className="col-7 col-md-6 btn btn-sm border-0"
                  onChange={(e) => handleSendToPostFilter(e.target.value)}
                >
                  <option className="" value="">
                    همه
                  </option>
                  <option className="" value="yes">
                    ارسال شده
                  </option>
                  <option className="" value="no">
                    ارسال نشده
                  </option>
                </select>
              </div>
            </div>
            {/* سایر فیلترها را اضافه کنید... */}
          </div>

          {/* table */}
          <div className="container">
  <div className="row">
    <div className="col">
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <span>نام</span>
          <span>نام خانوادگی</span>
          <span>موبایل</span>
          <span>کد پستی</span>
          <span>پرداخت شده</span>
          <span>ارسال</span>
          <span>تاریخ ثبت</span>
          <span>انتخاب</span>
        </li>
        {filteredOrders?.map((order, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
            id="admin-order-row"
            style={{cursor:"pointer"}}
            
          >
            <span onClick={() => setSelectedOrder(order)}>{order.FName.slice(0, 20)}</span>
            <span onClick={() => setSelectedOrder(order)}>{order.LName.slice(0, 20)}</span>
            <span onClick={() => setSelectedOrder(order)}>{order.mobile.slice(0, 20)}</span>
            <span onClick={() => setSelectedOrder(order)}>{order.postalCode.slice(0, 20)}</span>
            <span onClick={() => setSelectedOrder(order)}>{order.payment ? "بله" : "خیر"}</span>
            <span onClick={() => setSelectedOrder(order)}>{order.sendToPost ? "بله" : "خیر"}</span>
            <span onClick={() => setSelectedOrder(order)}>
              {jMoment(moment(order.createdAt).format()).format(
                "jYYYY/jMM/jDD HH:mm"
              )}
            </span>
            <span>
              <input
                type="checkbox"
                onChange={() => handleOrderSelection(order._id)}
                checked={selectedOrders.includes(order._id)}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
            </div>
           <div className="text-center"> <button onClick={handleSendToPostOrder} className="btn btn-sm btn-primary m-1">ارسال به پست</button></div>
</div>


          <div className="col-md-8 mx-auto rounded-4" id="order-detail">
            {selectedOrder && (
              <div className="popup">
                <div className="popup-content">
                  <span
                    className="close-btn px-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedOrder(null)}
                  >
                    &times;
                  </span>
                  <h5 className="text-center">جزئیات سفارش</h5>
                  <div className="">
                    {selectedOrder && <OrderDetails order={selectedOrder} />}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderList;
