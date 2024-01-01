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

  return (
    <div className="" id="order">
      <div className="bg-primary rounded-4">
        <h3 className="pt-1 text-center text-light">سفارشها</h3>
        <div className="bg-light pt-3 rounded-4 ">
          {/* filters */}
          <div className="d-flex col-md-8 mx-auto filters align-items-center justify-content-center mt-3">
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
            <div className="col-4 bg-light rounded m-1">
              <div className="d-flex p-1">
                <label className="col-6 text-muted" htmlFor="">
                  وضعیت
                </label>
                <select
                  className="col-6 btn btn-sm border-0"
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
          <div className="table-responsive  col-md-8 mx-auto">
            <table className="border table table-stripe table-hover">
              <thead className="">
                <tr className="">
                  <th className="p-2 m-1 text-center">نام</th>
                  <th className="p-2 m-1 text-center">نام خانوادگی</th>
                  <th className="p-2 m-1 text-center">موبایل</th>
                  <th className="p-2 m-1 text-center">کد پستی</th>
                  <th className="p-2 m-1 text-center">پرداخت شده</th>
                  <th className="p-2 m-1 text-center">ارسال</th>
                  <th className="p-2 m-1 text-center">تاریخ ثبت</th>
                  {/* ... ادامه هدر */}
                </tr>
              </thead>
              <tbody id="">
                {filteredOrders?.map((order, index) => (
                  <tr
                    key={index}
                    className=""
                    onClick={() => setSelectedOrder(order)}
                  >
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
