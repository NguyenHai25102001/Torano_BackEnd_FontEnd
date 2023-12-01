import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, Navigation, FreeMode } from "swiper/modules";

import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import ProductQuickView from "../components/ProductQuickView";
import HomeCollection from "../components/HomeCollection";
import {Footer} from "../components/Footer";

function Home() {
  const [isOpen,setIsOpen]=React.useState(false)
  const handleIsOpen=()=>{
    setIsOpen(!isOpen)
  }
  return (
    <div className="wrapper__home">
      <div className="home-content">
        <Swiper
          loop={true}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              alt=""
              src="https://theme.hstatic.net/200000690725/1001078549/14/slide_1_img.jpg?v=216"
              className="d-block w-100 object-fit-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              alt=""
              src="https://theme.hstatic.net/200000690725/1001078549/14/slide_3_img.jpg?v=216"
              className="w-100 object-fit-cover d-block"
            />
          </SwiperSlide>
        </Swiper>
        <div className="py-5"></div>
        <section className="section-home-category">
          <div></div>
        </section>
        <div className="container">
          <div className="section-title d-flex justify-content-between align-items-center mb-3">
            <h2 className="text-start text-uppercase">
              <Link to={"#"}>Danh mục sản phẩm</Link>
            </h2>
            <div className="swiper-nav">
              <span className="swiper-button fs-3">
                <i className="bi bi-arrow-right"></i>
              </span>
              <span className="swiper-button-right swiper-button-left fs-3">
                <i class="bi bi-arrow-right"></i>
              </span>
            </div>
          </div>
          {/* content */}
          <div className="section-content" >
            <div>
              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
              >
                {[...Array(7)].map((item, index) => (
                  <SwiperSlide>
                    <div className="category-item__inner">
                      <div className="category-item__img">
                        <Link to={"#"}>
                          <img
                            src="https://theme.hstatic.net/200000690725/1001078549/14/home_category_1_img.jpg?v=216"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="category-item__content">
                        <div className="d-flex justify-content-between align-items-center">
                          {/* tên danh mục */}
                          <div>
                            <h3>
                              <Link to="">Áo khoắc</Link>
                            </h3>
                          </div>
                          <div className="info-icon">
                            <Link to="" className="fs-3">
                              <i className="bi bi-arrow-right"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/*  */}
        <section className="section-home-collection collection-flashsale my-5">
          <div className="container">
            <div className="section-title mb-3 d-flex align-items-center flex-wrap">
              <h2 className="text-start text-uppercase">
                <Link to={""}>Sale vô cực</Link>
              </h2>
              <div className="ms-3">
                <div className="soon-group--inner ms-2 d-inline-block text-center text-white rounded">
                  <span className="fs-6 fw-bolder">0</span>
                  <span className="d-block ">Ngày</span>
                </div>
                <div className="soon-group--inner ms-2 d-inline-block text-center text-white rounded">
                  <span className="fs-6 fw-bolder">00</span>
                  <span className="d-block ">Giờ</span>
                </div>
                <div className="soon-group--inner ms-2 d-inline-block text-center text-white rounded">
                  <span className="fs-6 fw-bolder">00</span>
                  <span className="d-block ">Phút</span>
                </div>
                <div className="soon-group--inner ms-2 d-inline-block text-center text-white rounded">
                  <span className="fs-6 fw-bolder">00</span>
                  <span className="d-block ">Giây</span>
                </div>
              </div>
              <div className="swiper-nav position-relative">
                <span className="fs-3 custom-next swiper-button-next-sale
                ">
                  <i className="bi bi-arrow-left"></i>
                </span>
                <span className="fs-3 swiper-button-pre-sale">
                  <i className="bi bi-arrow-right"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="container">
            <Swiper
                slidesPerView={6}
                spaceBetween={20}
                navigation={{
                  nextEl: '.swiper-button-next-sale',
                  prevEl: '.swiper-button-pre-sale',
                }}
                modules={[FreeMode,Pagination, Navigation]}>
              {[...Array(8)].map((item, index) => (
                <SwiperSlide
                        key={index}
                >
                  <ProductItem handleIsOpen={handleIsOpen}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

            <div className="d-flex  justify-content-center w-100 mt-5">
              <div className="wrap__btn">
                <Link to={'#'} className='button position-relative d-inline-block btnlight btn-see-more px-4 py-2 rounded text-uppercase'>Xem tất cả <strong >Sale vô cực</strong></Link>

            </div>
          </div>
        </section>
      </div>
      <ProductQuickView status={isOpen} handleIsOpen={handleIsOpen}/>

      <div className=""><HomeCollection handleIsOpen={handleIsOpen}/></div>
      <section className="section-home-policy py-4">
        <div className="container">
          <div className="list-policy-row row">
            <div className="col-xl-3  col-lg-6 col-12 policy-item">
              <div className="policy-item__inner d-flex align-items-center">
                <div className="policy-item__icon">
                  <img src="https://theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_1.png?v=228" alt=""/>
                </div>
                <div className="policy-item__info ms-3">
                  <h3 className='info-title'>Miễn phí vận chuyển</h3>
                  <div className="info-des">Áp dụng cho mọi đơn hàng từ 500k</div>
                </div>
              </div>
            </div>
            <div className="col-xl-3  col-lg-6 col-12 policy-item">
              <div className="policy-item__inner d-flex align-items-center">
                <div className="policy-item__icon">
                  <img src="https://theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_2.png?v=228" alt=""/>
                </div>
                <div className="policy-item__info ms-3">
                  <h3 className='info-title'>Đổi trả dễ dàng</h3>
                  <div className="info-des">7 ngày đổi trả vì bất kì lí do gì</div>
                </div>
              </div>
            </div>
            <div className="col-xl-3  col-lg-6 col-12 policy-item">
              <div className="policy-item__inner d-flex align-items-center">
                <div className="policy-item__icon">
                  <img src="https://theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_3.png?v=228" alt=""/>
                </div>
                <div className="policy-item__info ms-3">
                  <h3 className='info-title'>Hỗ trợ nhanh chóng</h3>
                  <div className="info-des">HOTLINE 24/7 : 0964942121</div>
                </div>
              </div>
            </div>
            <div className="col-xl-3  col-lg-6 col-12 policy-item">
              <div className="policy-item__inner d-flex align-items-center">
                <div className="policy-item__icon">
                  <img src="https://theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_4.png?v=228" alt=""/>
                </div>
                <div className="policy-item__info ms-3">
                  <h3 className='info-title'>Thanh toán đa dạng</h3>
                  <div className="info-des">Thanh toán khi nhận hàng, Napas, Visa, Chuyển Khoản</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>




    </div>
  );
}

export default Home;
