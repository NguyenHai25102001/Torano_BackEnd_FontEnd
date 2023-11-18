import { Link } from "react-router-dom";
import Header from "../components/Header";
import React from "react";
import AppContent from "../components/AppContent";
import {Footer} from "../components/Footer";

function DefaultLayout() {
  const [cart, setCart] = React.useState(false);
  const handleCart = () => {
    setCart(true);
  };

  return (
    <div className="wrapper__layout">
      <div className="topbar">
        <div className="topbar-bottom bg-black text-white">
          <div className="container">
            <div className="box-content d-flex justify-content-between align-items-center p-1 flex-wrap ">
              <div className="box-left d-flex flex-wrap align-items-center">
                <div className="hotline">
                  <span>
                    Hotline mua hàng: <Link to={"/"}>03545833467</Link>
                    8:30-21:30, Tất cả các ngày trong tuần
                  </span>
                </div>
                <div className="contact">
                  <span>
                    <Link to="/">Liên hệ</Link>
                  </span>
                </div>
              </div>
              <div className="box-right">
                <div className="notify position-relative">
                  <div className="notify-title">
                    <div className="notify-tt">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 32 32"
                        className="me-2"
                      >
                        <g fill="#FFFFFF">
                          <g fill="#FFFFFF">
                            <path
                              d="m29.39355 22.24194c0-1.85809-1.32587-3.40649-3.07745-3.76453v-7.15167c0-5.70001-4.62579-10.32574-10.3161-10.32574s-10.3161 4.62573-10.3161 10.32574v7.15167c-1.75159.35803-3.07745 1.90643-3.07745 3.76453 0 2.10968 1.7226 3.83221 3.84192 3.83221h19.10327c2.11932.00001 3.84191-1.72253 3.84191-3.83221z"
                              fill="#FFFFFF"
                            ></path>
                            <path
                              d="m16 31c2.32263 0 4.32581-1.43231 5.15808-3.47424h-10.31616c.83227 2.04193 2.83545 3.47424 5.15808 3.47424z"
                              fill="#FFFFFF"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <span className="noti-numb">0</span>
                      Thông báo của tôi
                    </div>
                  </div>
                  <div className="notify-container">
                    <div className="sitenav-wrapper sitenav-notify">
                      <div className="sitenav-content">
                        <div className=" t text-dark p-3">
                          Hiện không có thông báo nào
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Header handleCart={handleCart} />
      {/* main default */}
      <div className="wrapper_layout--main">
        <AppContent/>

      </div>
      {/* emd main fault main */}

      {/* Đóng mở Cart */}
      <div className="sidebar-main">
        <div
          className={
            "sitenav-wrapper sitenav-right sitenav-cart cart-empty " +
            (cart ? "is-opened" : "")
          }
        >
          <div className="sitenav-inner">
            <div className="p-3 d-flex  justify-content-between border-bottom ">
              <p className="sitenav-header__title">Giỏ hàng</p>
              <div
                className="d-flex align-items-center"
                role="button"
                onClick={() => setCart(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 19 19"
                  role="presentation"
                  width="19"
                  height="19"
                >
                  <path
                    d="M9.1923882 8.39339828l7.7781745-7.7781746 1.4142136 1.41421357-7.7781746 7.77817459 7.7781746 7.77817456L16.9705627 19l-7.7781745-7.7781746L1.41421356 19 0 17.5857864l7.7781746-7.77817456L0 2.02943725 1.41421356.61522369 9.1923882 8.39339828z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="sitenav-content">
              <div className="cart-view">
                <div className="mini-cart__empty">
                  <div className="svgico-mini-cart">
                    <img
                      src="https://theme.hstatic.net/200000690725/1001078549/14/cart_banner_image.jpg?v=202"
                      alt=""
                    />
                    <p>Chưa có san phẩm giỏ hàng...</p>
                    <div className="d-flex justify-content-around mt-2">
                      <Link
                        to={"#"}
                        className="text-primary text-decoration-underline"
                      >
                        Trở về trang sản phẩm
                      </Link>
                      <Link
                        to={"#"}
                        className="text-primary text-decoration-underline"
                      >
                        Khuyến mãi dành cho bạn
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sitenav-mask" onClick={() => setCart(false)}></div>
        <div></div>
      </div>
      {/* end open Cart */}
    {/*  Footer*/}
      <div className="mt-5"></div>
      <Footer/>
    {/*  end Footer*/}
    </div>
  );
}

export default DefaultLayout;
