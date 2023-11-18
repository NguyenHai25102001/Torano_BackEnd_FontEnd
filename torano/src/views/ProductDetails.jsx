import React, {useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import {productImage} from '../components/test';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
function ProductDetails() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return(
        <div className='wrap__product-details'>
            <div className="list-name-category">
                <div className="container">
                    <ol className='d-flex align-items-center py-1'>
                        <li>Trang chủ</li>
                        <li>Áo Polo trơn</li>
                        <li>Áo Polo trơn hiệu ứng</li>
                    </ol>
                </div>
            </div>
            <div className="container">
                <div className="productDetails-main">
                    <div className="row">
                        <div className="col-lg-5 col-md-12 col-12 pt-3 product-gallery">

                                <div className="position-relative h-auto main-swiper">
                                    <Swiper

                                        spaceBetween={10}
                                        navigation={{
                                            nextEl: '.swiper-button-next-custom',
                                            prevEl: '.swiper-button-prev-custom',
                                        }}
                                        thumbs={thumbsSwiper != null ? { swiper: thumbsSwiper } : undefined}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper2 w-100"
                                    >
                                        {
                                            productImage.map((item,index)=>(
                                                <SwiperSlide>
                                                    <div className="d-flex justify-content-center align-items-start">
                                                        <img src={item.path} alt="" className='w-100 object-fit-cover'/>
                                                    </div>
                                                </SwiperSlide>
                                            ))
                                        }

                                    </Swiper>
                                    <div className="position-absolute d-flex w-100 justify-content-between  swp-btn px-2" >
                                        <div className="swiper-button-prev-custom " role={'button'}>
                                            <FontAwesomeIcon icon={faArrowLeft} size={'xl'}/>
                                        </div>
                                        <div className="swiper-button-next-custom" role={'button'}>
                                            <FontAwesomeIcon icon={faArrowRight} size={'xl'}/>

                                        </div>
                                    </div>

                                </div>
                                <div className="position-relative h-auto main-swiper mt-3">
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={10}
                                        slidesPerView={6}
                                        freeMode={true}
                                        navigation={{
                                            nextEl: '.swiper-button-next-thum',
                                            prevEl: '.swiper-button-prev-thum',
                                        }}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper w-100"
                                    >
                                        {
                                            productImage.map((item,index)=>(
                                                <SwiperSlide>
                                                    <div className="d-flex justify-content-center align-items-start">
                                                        <img src={item.path} alt="" className='w-100 object-fit-cover'/>
                                                    </div>
                                                </SwiperSlide>
                                            ))
                                        }

                                    </Swiper>
                                    <div className="position-absolute d-flex w-100 justify-content-between  swp-btn px-2" >
                                        <div className="swiper-button-prev-thum  btn-thum" role={'button'}>
                                            <FontAwesomeIcon icon={faArrowLeft} size={'xs'}/>
                                        </div>
                                        <div className="swiper-button-next-thum btn-thum" role={'button'}>
                                            <FontAwesomeIcon icon={faArrowRight} size={'xs'}/>

                                        </div>
                                    </div>

                                </div>



                        </div>
                        <div className="col-lg-7 col-md-12 col-12 pt-3 flex-grow-1">
                            <div className="row">
                                <div className="col-xl-8 col-lg-12 col-12">
                                    <div className="pro-info">
                                        <div className="pro-name">
                                            <h1 className='fs-4 fw-bolder'>Áo Polo trơn hiệu ứng ESTP041</h1>
                                        </div>
                                        <div className="pro-sku">
                                            <span>Mã sản phẩm: <strong>ESTP04172CV01SB_DCR-S</strong></span>
                                            <span>Tình trạng: <strong>Còn hàng</strong></span>
                                            <span>Thương hiệu: <strong>TORANO</strong></span>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-12 col-12">e</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )

}
export default ProductDetails;