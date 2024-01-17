import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import jMoment from "moment-jalaali";
import pp from "./../images/pp.jpg";
import p1 from "./../images/p1.jpeg";
import AppContext from "../context/context";

const OrderList = () => {
  const {
    port,
    reqType,
    server,
    responseApi,
    //admin
    setUser,
    setUserRole,
    price,
    setPrice,
    name,
    setName,
    numberOfLikes,
    setNumberOfLikes,
    description,
    setDescription,
    responseMessage,
    setResponseMessage,
    imageId,
    setImageId,
    img,
    setImg,
    isSubMenuVisible,
    setIsSubMenuVisible,
    showHidden,
    setShowHidden,
    addProduct,
    setCategory,
    setNumberOfProduct,
    serialNumber,
    setSerialNumber,
    adminUserInfo,
    setAdminUserInfo,
    //producti ke dakhele admine
    products,
    setProducts,
    id,
    setId,
    updateName,
    setUpdateName,
    updatePrice,
    setUpdatePrice,
    updateNumberOfLikes,
    setUpdateNumberOfLikes,
    updateDescription,
    setUpdateDescription,
    updateImg,
    setUpdateImg,
    updateCategory,
    setUpdateCategory,
    updateNumberOfProduct,
    setUpdateNumberOfProduct,
    isFormVisible,
    setIsFormVisible,
    updateProduct,
    middleFunction,
    closeForm,
    openForm,
    deleteProduct,
    useEffect,
    selectedProducts,
    setSelectedProducts,
    discountType,
    setDiscountType,
    discountValue,
    setDiscountValue,
    discountExpireTime,
    setDiscountExpireTime,
    createDiscount,
    addDiscountToProduct,
    removeDiscount,
    handleToggleProduct,
    handleDiscountSelection,
    updateSerialNumber,
    setUpdateSerialNumber,
    searchValue,
    setSearchValue,
    //user product
    userProducts,
    setUserProducts,
    userId,
    setUserId,
    comments,
    setComments,
    addComment,
    addThisCommentToProduct,
    handleCommentChange,
    addLike,
    addToBasket,
    getUser,
    fetchData,
    moreDataAboutProduct,
    allDataAboutProduct,
    setAllDataAboutProduct,
    commentResponse,
    setCommentResponse,
    fullDescription,
    setFullDescription,
    replyComment,
    setReplyComments,
    numberOfSelectedProduct,
    setNumberOfSelectedProduct,
    indexOfSelectedProduct,
    setIndexOfSelectedProducts,
    handleClick,
    toggleDescription,
    deleteComment,
    approveComment,
    likeComment,
    replyToComment,
    handleRyplyComment,
    addReplyToComment,
    setProductId,
    changeNumber,
    id1,
    setId1,
    oneProduct,
    setOneProduct,
    navSearchInputValue,
    setNavSearchInputValue,
    //user panel
    user,
    userPanelShowHidden,
    setUserPanelShowHidden,
    userPanelGetUser,
    deleteFromBasket,
    clientFName,
    setClientFName,
    clientLName,
    setClientLName,
    clientEmail,
    setClientEmail,
    clientMobile,
    setClientMobile,
    clientAddress,
    setClientAddress,
    clientPostalCode,
    setClientPostalCode,
    orderMeesage,
    setOrderResponseMessage,
    orderId,
    setOrderId,
    factor,
    setFactor,
    totalPrice,
    setTotalPrice,
    sendingPostalInformation,
    IssuingInvoice,
    middleFunction1,
    //register
    fName,
    lName,
    email,
    mobile,
    address,
    password,
    repeatPassword,
    postalCode,
    setRegisterName,
    setLastName,
    setEmail,
    setMobile,
    setAddress,
    setPassword,
    setRepeatPassword,
    setPostalCode,
    //login
    handleLogin,
    token,
    setToken,
    //navbar
    //contact
    senderName,
    setSenderName,
    senderEmail,
    setSenderEmail,
    content,
    setContent,
    sendMessageResponse,
    setSendMessageResponse,
    sendMessage,
    ////////
    component,
    reRenderComponentFunc,
  } = useContext(AppContext);
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
          `${reqType}://${server}:${port}/api/order/getorder`,
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
      (item) => item.FName?.includes(name) || item.LName?.includes(name)
    );
    setFilteredOrders(filteredByName);
  };

  const filterOrdersByPostalCode = (postalCode) => {
    const filteredByPostalCode = orders.filter((item) =>
      item.postalCode?.includes(postalCode)
    );
    setFilteredOrders(filteredByPostalCode);
  };

  useEffect(() => {
    const filteredByName = orders.filter(
      (item) =>
        item.FName?.includes(filterName) || item.LName?.includes(filterName)
    );
    const filteredByPostalCode = orders.filter((item) =>
      item.postalCode?.includes(filterPostalCode)
    );
    const filteredBySendToPost = orders.filter(
      (item) =>
        filterSendToPost === "" ||
        item.sendToPost === (filterSendToPost === "yes")
    );

    const filteredOrders = filteredByName.filter(
      (item) =>
        filteredByPostalCode?.includes(item) &&
        filteredBySendToPost?.includes(item)
    );

    const sortedOrders = filteredOrders?.slice().sort((a, b) => {
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
      <div className="d-flex border">
        <div className="col-6 p-2 mt-1 ">
          <p className="p-1 m-0 border-bottom">
            <strong>نام: </strong>
            {order.FName}
          </p>
          <p className="p-1 m-0 border-bottom">
            <strong>نام خانوادگی: </strong>
            {order.LName}
          </p>
          <p className="p-1 m-0 border-bottom" style={{ wordBreak: "break-word" }}>
            <strong>آدرس: </strong>
            {breakText(order.address, 20)}
          </p>

          <p className="p-1 m-0 border-bottom">
            <strong>ایمیل: </strong>
            {breakText(order.email, 8)}
          </p>
          <p className="p-1 m-0 border-bottom">
            <strong>موبایل: </strong>
            {order.mobile}
          </p>
          <p className="p-1 m-0 border-bottom">
            <strong>کد پستی: </strong>
            {order.postalCode}
          </p>
        </div>
        <div className="col-6 p-2 mt-1">
          <p className="p-1 m-0 border-bottom">
            <strong>پرداخت شده: </strong>
            {order.payment ? "بله" : "خیر"}
          </p>
          <p className="p-1 m-0 border-bottom">
            <strong>ارسال: </strong>
            {order.sendToPost ? "بله" : "خیر"}
          </p>
          <p className="p-1 m-0 border-bottom">
            <strong>تعداد: </strong>
            {order.numberOfEachProductInBasket}
          </p>
          <p className="p-1 m-0 border-bottom">
            <strong>نام کالا: </strong>
            {order.productsId?.map((product) => product.name).join(", ")}
          </p>
          <p className="p-1 m-0 border-bottom" style={{ wordBreak: "break-word" }}>
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
      // setSelectedOrder(filteredorder);
      console.log("1", filteredorder);
    } else {
      const orders = [...selectedOrders, orderIdd];
      setSelectedOrders(orders);
      // setSelectedOrder(orders);
      console.log("2", orders);
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
        selectedOrders,
      };
      const response = await axios.put(
        `http://localhost:5000/api/order/sendtopostorder`,
        data,
        config
      );
      console.log(response);
      setSelectedOrders([]);
      setForceUpdate((prevState) => !prevState);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-100" id="order">
      <div className="" id="admin-order">
        <h3 className="pt-1 text-center text-light">سفارشها</h3>
        <div className="col-11 mx-auto pt-3">
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
          <div className="table-responsive col-md-8 mx-auto">
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th scope="col">نام</th>
                  <th scope="col">نام خانوادگی</th>
                  <th scope="col">موبایل</th>
                  <th scope="col">کد پستی</th>
                  <th scope="col">پرداخت شده</th>
                  <th scope="col">ارسال</th>
                  <th scope="col">تاریخ ثبت</th>
                  <th scope="col">انتخاب</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders?.map((order, index) => (
                  <tr className="text-center" key={index} onClick={()=>setSelectedOrder(order)} style={{cursor:"pointer"}}>
                    <td className="">{order.FName?.slice(0, 20)}</td>
                    <td>{order.LName?.slice(0, 20)}</td>
                    <td>{order.mobile?.slice(0, 20)}</td>
                    <td>{order.postalCode?.slice(0, 20)}</td>
                    <td>{order.payment ? "بله" : "خیر"}</td>
                    <td>{order.sendToPost ? "بله" : "خیر"}</td>
                    <td>
                      {jMoment(moment(order.createdAt).format()).format(
                        "jYYYY/jMM/jDD HH:mm"
                      )}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleOrderSelection(order._id)}
                        checked={selectedOrders.includes(order._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center">
            <button
              onClick={handleSendToPostOrder}
              className="btn btn-sm btn-primary m-1"
            >
              ارسال به پست
            </button>
          </div>
          {/* order details */}
          <div className="col-md-8 mx-auto p-4" id="">
            {selectedOrder && (
              // <div className="bg-info p-2">
                <div className="bg-light rounded">
                  <span
                    className="close-btn px-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedOrder(null)}
                  >
                    &times;
                  </span>
                  <h5 className="text-center">جزئیات سفارش</h5>
                  {/* <div className="bg-danger p-2"> */}
                    {<OrderDetails order={selectedOrder} />}
                  {/* </div> */}
                </div>
              // </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default OrderList;
