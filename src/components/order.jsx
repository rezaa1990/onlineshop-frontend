import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import jMoment from "moment-jalaali";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterPostalCode, setFilterPostalCode] = useState("");
  const [filterSendToPost, setFilterSendToPost] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

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
  }, []);

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
      <div className="d-flex rounded-4 shadow" id="order-detail">
        <div className="col-6 p-2 mt-4">
    <p className="p-1">
      <strong>نام: </strong>
      {order.FName}
    </p>
    <p  className="p-1">
      <strong>نام خانوادگی: </strong>
      {order.LName}
    </p>
    <p  className="p-1" style={{ wordBreak: "break-word" }}>
  <strong>آدرس: </strong>
  {breakText(order.address, 20)}
</p>

    <p  className="p-1" >
      <strong>ایمیل: </strong>
      {breakText(order.email, 8)}
    </p>
    <p  className="p-1">
      <strong>موبایل: </strong>
      {order.mobile}
    </p>
    <p  className="p-1">
      <strong>کد پستی: </strong>
      {order.postalCode}
    </p>
        </div>
        <div className="col-6 p-2 mt-4">
    <p className="p-1">
      <strong>پرداخت شده: </strong>
      {order.payment ? "بله" : "خیر"}
    </p>
    <p className="p-1">
      <strong>ارسال: </strong>
      {order.sendToPost ? "بله" : "خیر"}
    </p>
    <p className="p-1">
      <strong>تعداد: </strong>
      {order.numberOfEachProductInBasket}
    </p>
    <p className="p-1">
      <strong>نام کالا: </strong>
      {order.productsId?.map((product) => product.name).join(", ")}
    </p>
    <p className="p-1" style={{ wordBreak: "break-word" }}>
      <strong>تاریخ ثبت: </strong>
      {jMoment(moment(order.createdAt).format()).format(
        "jYYYY/jMM/jDD HH:mm"
      )}
    </p>
        </div>
      </div>
    );
  };

  return (
    <div className="" id="order">
      <h3 className="text-center">سفارشها</h3>

      {/* filters */}
      <div className="d-flex filters d-flex align-items-center justify-content-center px-4 py-1">
        <input
          className="col-4 rounded border-0 m-1 p-1"
          type="text"
          placeholder="فیلتر بر اساس نام"
          onChange={(e) => handleNameFilter(e.target.value)}
        />
        <input
          className="col-4 rounded border-0 m-1 p-1"
          type="text"
          placeholder="فیلتر بر اساس کد پستی"
          onChange={(e) => handlePostalCodeFilter(e.target.value)}
        />
        <div className="col-4 bg-light rounded m-1">
          <div className="d-flex">
            <label className="col-5 p-1 text-muted" htmlFor="">
            ارسال
            </label>
            <select
              className="col-5 btn btn-sm btn-secondar border-0"
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
      <div className="bg-primary mx-4 rounded-4 pt-2">
        <table className="table">
          <thead className="">
            <tr className="">
              <th className="p-2 m-1 text-center text-muted">نام</th>
              <th className="p-2 m-1 text-center text-muted">نام خانوادگی</th>
              <th className="p-2 m-1 text-center text-muted">موبایل</th>
              <th className="p-2 m-1 text-center text-muted">کد پستی</th>
              <th className="p-2 m-1 text-center text-muted">پرداخت شده</th>
              <th className="p-2 m-1 text-center text-muted">ارسال</th>
              <th className="p-2 m-1 text-center text-muted">تاریخ ثبت</th>
              {/* ... ادامه هدر */}
            </tr>
          </thead>
          <tbody id="">
            {filteredOrders?.map((order, index) => (
              <tr key={index} className="" onClick={() => setSelectedOrder(order)}>
                <td className="p-2 m-1 text-center" id="">
                  {order.FName.slice(0, 20)}
                </td>
                <td className="p-2 m-1 text-center" id="">
                  {order.LName.slice(0, 20)}
                </td>

                <td className="p-2 m-1 text-center" id="">
                  {order.mobile.slice(0, 20)}
                </td>
                <td className="p-2 m-1 text-center" id="">
                  {order.postalCode.slice(0, 20)}
                </td>
                <td className="p-2 m-1 text-center" id="">
                  {order.payment ? "بله" : "خیر"}
                </td>
                <td className="p-2 m-1 text-center" id="">
                  {order.sendToPost ? "بله" : "خیر"}
                </td>
                <td className="p-2 m-1 text-center" id="">
                  {jMoment(moment(order.createdAt).format()).format(
                    "jYYYY/jMM/jDD HH:mm"
                  )}
                </td>
                {/* ... نمایش سایر ستون‌ها */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-primary m-4 rounded-4">
        {selectedOrder && (
          <div className="popup">
            <div className="popup-content">
              <span
                className="close-btn px-2" style={{cursor:"pointer"}}
                onClick={() => setSelectedOrder(null)}
              >
                &times;
              </span>
              <h2 className="text-center">جزئیات سفارش</h2>
              <div className="">{selectedOrder && <OrderDetails order={selectedOrder} />}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
