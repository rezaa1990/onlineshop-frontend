import React, { useContext, useState } from "react";
import {
  faWarehouse,
  faProcedures,
  faUpRightAndDownLeftFromCenter,
  faAdd,
  faMessage,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pp from "./../images/pp.jpg";
import AppContext from "../context/context";

const AdminSidebar = () => {
  const { setIsSubMenuVisible, setShowHidden, adminUserInfo } = useContext(
    AppContext
  );

  const toggleSubMenu = () => {
    setIsSubMenuVisible((prevSubMenuVisible) => !prevSubMenuVisible);
  };

  const sidebarItems = [
    {
      text: "انبار",
      icon: faWarehouse,
      onClick: () => setShowHidden(2),
    },
        {
          text: "بروز رسانی",
          icon: faUpRightAndDownLeftFromCenter,
          onClick: () => setShowHidden(5),
        },
        {
          text: "اضافه کردن",
          icon: faAdd,
          onClick: () => setShowHidden(3),
        },
    {
      text: "پیامها",
      icon: faMessage,
      onClick: () => setShowHidden(6),
    },
    {
      text: "سفارشها",
      icon: faReceipt,
      onClick: () => setShowHidden(7),
    },
  ];
console.log(adminUserInfo)
  return (
    <>
      <div
        className="pt-1 text-center"
        id="admin-sidebar-userinfo"
        style={{ cursor: "pointer" }}
        onClick={() => setShowHidden(1)}
      >
        <img
          src={pp}
          alt=""
          className="bg-light p-1"
          style={{ borderRadius: "50%", width: "12vh" }}
        />
        <div className="p-1 text-light">{adminUserInfo?.fName}</div>
      </div>

      {sidebarItems.map((item, index) => (
        <div
          key={index}
          className={`p-1 py-2 m-1 rounded ${
            item.submenu && setIsSubMenuVisible ? "show-submenu" : ""
          }`}
          id="admin-sidebar-ul-li"
        >
          <a className="nav-link text-light" href="#" onClick={item.onClick}>
            <i className="p-1" style={{ fontSize: "15px" }}>
              <FontAwesomeIcon icon={item.icon} />
            </i>
            {item.text}
          </a>
          {item.submenu && setIsSubMenuVisible && (
            <div className="submenu py-3">
              {item.submenu.map((subItem, subIndex) => (
                <div
                  key={subIndex}
                  className="text-light mx-3 p-1 rounded"
                  id="admin-sidebar-product-submenu"
                  style={{ cursor: "pointer" }}
                  onClick={subItem.onClick}
                >
                  <i className="ms-2 " style={{ fontSize: "15px" }}>
                    <FontAwesomeIcon icon={subItem.icon} />
                  </i>
                  {subItem.text}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default AdminSidebar;
