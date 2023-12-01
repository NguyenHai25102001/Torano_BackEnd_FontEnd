import React, {useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import {productImage} from '../components/testAPI';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {product} from "../components/testAPI";
import formatPrice from "../components/FormatPrice";
import {
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon,
    TwitterShareButton
} from "react-share";

function ProductDetails() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [quantity,setQuantity]=React.useState(1);

    const url='https://www.youtube.com/watch?v=-LoPYVsBpc0&ab_channel=MiuMusic';
    const[color,setColor]=useState(()=>(
        product.color[0].name
    ))
    const[size,setSize]=useState();
    const getFirstAvailableSize = () => {
        const sizes = product.color.find((item) => item.name === color)?.sizes;
        if (sizes) {
            // Use a for loop to iterate through sizes
            for (let i = 0; i < sizes.length; i++) {
                const currentSize = sizes[i];
                if (currentSize.quantity > 0) {
                    return currentSize.name; // Return the name of the first available size
                }
            }
        }
    };
    React.useEffect(()=>{
        const initialSize = getFirstAvailableSize();
        setSize(initialSize);
    },[color])
    const handleColorChange=(color)=>{
        setColor(color);
        const firstAvailableSize = getFirstAvailableSize();
        setSize(firstAvailableSize);
    }
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
                                                <SwiperSlide key={index}>
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
                                    <div className="">
                                        <div className="pro-name">
                                            <h1 className='fs-4 fw-bolder'>Áo Polo trơn hiệu ứng ESTP041</h1>
                                        </div>
                                        <div className="pro-sku">
                                            <span>Mã sản phẩm: <strong>ESTP04172CV01SB_DCR-S</strong></span>
                                            <span>Tình trạng: <strong>Còn hàng</strong></span>
                                            <span>Thương hiệu: <strong>TORANO</strong></span>
                                        </div>
                                       <div className="pro-info mt-4">
                                           <div className="pro-price d-flex align-items-center flex-wrap p-3 rounded">
                                               <span className='pro-title'>Giá:</span>
                                               <span className='fs-5 fw-bolder text-danger  '>{formatPrice(290000)}đ</span>
                                               <del className="fs-6 ms-2 ">{formatPrice(490000)}đ</del>
                                               <span className="pro-percent ">-25%</span>
                                           </div>
                                           <div className="product-variants my-4 ">
                                              <div className="d-flex align-items-center">
                                                  <div className="pro-color me-4 ">
                                                      <span className='variant-title'>Màu sắc: <br/><strong className='color-name ms-1'>{color}</strong></span>
                                                  </div>
                                                  <div className="select-color  mt-1 ">
                                                      {
                                                          product.color.map((item,index)=>(
                                                              <div className="d-inline-block me-1 mb-1" key={index}>
                                                                  <label
                                                                      onClick={()=>handleColorChange(item.name)}
                                                                      className={(color === item.name ? 'active fw-bolder' : '')}>{item.name}</label>

                                                              </div>

                                                          ))

                                                      }
                                                  </div>
                                              </div>
                                               <div className="d-flex align-items-center flex-wrap mt-4 ">
                                                   <div className="pro-color me-4 ">
                                                       <span className='variant-title'>Kích thước:</span>
                                                   </div>
                                                   <div className="">
                                                       {product.color
                                                           .find((item) => item.name === color)
                                                           ?.sizes.map((item, index) => (
                                                               <div className="d-inline-block me-1 mb-1 " key={index}>
                                                                   <label
                                                                       onClick={()=>setSize(item.name)}
                                                                       className={(size === item.name ? 'active fw-bolder' : '') + (item.quantity>0?'':'pe-none opacity-75')} >{item.name}</label>
                                                               </div>
                                                           ))}
                                                   </div>
                                                   <div className="size-guide ms-auto">
                                                       <button ><span className='text-decoration-underline'>Hướng dẫn chọn size</span></button>
                                                   </div>
                                               </div>
                                               {/*Số lượng chọn mua*/}
                                               <div className="my-4 d-flex align-items-center ">
                                                   <div className="variant-title">Số lượng:</div>
                                                   <div className="d-flex align-items-center ms-4">
                                                       <button type={'button'} className='qty-btn' onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}>
                                                           <FontAwesomeIcon icon={faMinus} />
                                                       </button>
                                                       <input value={quantity} className='qty-value' onChange={(e)=>setQuantity(e.target)}/>
                                                       <button type={'button'} className='qty-btn' onClick={()=>setQuantity(quantity+1)}>
                                                           <FontAwesomeIcon icon={faPlus} />
                                                       </button>
                                                   </div>

                                               </div>
                                               {/*btn  chọn mua*/}
                                               <div className="d-flex mb-4">
                                                   <button type='submit' className=" btn-addtocart rounded">
                                                       <span>THÊM VÀO GIỎ HÀNG</span>
                                                   </button>
                                                   <button type='submit' className="ms-4 btnred  btn-buynow rounded">
                                                       <span className='z-2'>MUA NGAY</span>
                                                   </button>
                                               </div>
                                               <div className="d-block text-center ">
                                                 <button className='btn w-100 py-2 btn-dark'>
                                                     <span className='text-uppercase'>click vào đây đây nhận ưu đãi</span>
                                                 </button>
                                               </div>
                                               {/*Share*/}
                                               <div className="pro-share d-flex mt-4 align-items-center">
                                                   <div className="fw-bolder">Chia sẻ</div>
                                                   <div className="ms-4 d-flex gap-2">
                                                       <FacebookShareButton url={url}>
                                                           <FacebookIcon size={30} round={true} />
                                                       </FacebookShareButton>
                                                       <FacebookMessengerShareButton url={url}>
                                                           <FacebookMessengerIcon size={30} round={true} />
                                                       </FacebookMessengerShareButton>
                                                       <TwitterShareButton url={url}>
                                                           <TwitterIcon size={30} round={true} />
                                                       </TwitterShareButton>
                                                       <TelegramShareButton url={url}>
                                                           <TelegramIcon size={30} round={true} />
                                                       </TelegramShareButton>
                                                   </div>
                                               </div>

                                           </div>

                                       </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-12 col-12"></div>
                                <div className="pro-subinfo d-md-block ">
                                    <div className="row p-2">
                                        <div className="col-md-4 col-12 p-0">
                                            <div className="d-flex align-items-center">
                                                <div className="" style={{width:'30px'}}><img className='w-100 object-fit-cover' src="	https://theme.hstatic.net/200000690725/1001078549/14/product_info1_desc1_img.png?v=228" alt=""/></div>
                                                <div className="px-2">Miễn phí giao hàng cho đơn hàng từ 500K</div>
                                            </div>

                                        </div>
                                        <div className="col-md-4 col-12 p-0">
                                            <div className="d-flex align-items-center">
                                                <div className="" style={{width:'30px'}}><img className='w-100 object-fit-cover' src="	https://theme.hstatic.net/200000690725/1001078549/14/product_info1_desc2_img.png?v=228" alt=""/></div>
                                                <div className="px-2">Hàng phân phối chính hãng 100%</div>
                                            </div>

                                        </div>
                                        <div className="col-md-4 col-12 p-0">
                                            <div className="d-flex align-items-center">
                                                <div className="" style={{width:'30px'}}><img className='w-100 object-fit-cover' src="https://theme.hstatic.net/200000690725/1001078549/14/product_info1_desc3_img.png?v=228" alt=""/></div>
                                                <div className="px-2">TỔNG ĐÀI 24/7 : 0964942121</div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row p-2">
                                        <div className="col-md-4 col-12 p-0">
                                            <div className="d-flex align-items-center">
                                                <div className="" style={{width:'30px'}}><img className='w-100 object-fit-cover' src="	https://theme.hstatic.net/200000690725/1001078549/14/product_info2_desc1_img.png?v=228" alt=""/></div>
                                                <div className="px-2">ĐỔI SẢN PHẨM DỄ DÀNG (Trong vòng 7 ngày khi còn nguyên tem mác)</div>
                                            </div>

                                        </div>
                                        <div className="col-md-4 col-12 p-0">
                                            <div className="d-flex align-items-center">
                                                <div className="" style={{width:'30px'}}><img className='w-100 object-fit-cover' src="	https://theme.hstatic.net/200000690725/1001078549/14/product_info2_desc2_img.png?v=228" alt=""/></div>
                                                <div className="px-2">Kiểm tra, thanh toán khi nhận hàng COD</div>
                                            </div>

                                        </div>
                                        <div className="col-md-4 col-12 p-0">
                                            <div className="d-flex align-items-center">
                                                <div className="" style={{width:'30px'}}><img className='w-100 object-fit-cover' src="https://theme.hstatic.net/200000690725/1001078549/14/product_info2_desc3_img.png?v=228" alt=""/></div>
                                                <div className="px-2">Hỗ trợ bảo hành, đổi sản phẩm tại tất cả store TORANO</div>
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
    )

}
export default ProductDetails;