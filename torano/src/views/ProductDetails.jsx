import React, {useEffect, useState} from "react";
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
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductQuickView, setProductId} from "../redux/slices/productQuickViewSlice";
import {ImageUrl, urlCreateCartItem} from "../Admin/components/dataApi";
import axios from "axios";
import Swal from "sweetalert2";

function ProductDetails() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [quantity,setQuantity]=React.useState(1);

    const url='https://www.youtube.com/watch?v=-LoPYVsBpc0&ab_channel=MiuMusic';

    const [sizeId, setSizeId] = useState('');

    const [colorId, setColorId] = useState('');


    const[color,setColor]=useState('');

    const[size,setSize]=useState('');

    const {id}=useParams();

    const getFirstAvailableSize = () => {
        const sizes = productDetails?.colors?.find((item) => item.name === color)?.sizes;
        if (sizes) {

            for (let i = 0; i < sizes.length; i++) {
                const currentSize = sizes[i];
                if (currentSize.quantity > 0) {
                    setSizeId(currentSize.id);
                    return currentSize.name; // Return the name of the first available size
                }
            }
        }
    };
    React.useEffect(()=>{
        const initialSize = getFirstAvailableSize();
        setSize(initialSize);
    },[color]);

    const handleColorChange=(id,name)=>{
        setColorId(id);
        setColor(name);
        const firstAvailableSize = getFirstAvailableSize();
        setSize(firstAvailableSize);
    }

    const dispatch = useDispatch();

    const productDetails = useSelector(
        (state) => state.productQuickView.product
    );

    const productId = useSelector((state) => state.productQuickView.productId);

    useEffect(() => {
        dispatch(setProductId(id))
    }, [id]);

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductQuickView({ productId }));
        }
    }, [dispatch, productId]);

    useEffect(() => {
        if(productDetails?.colors && productDetails.colors?.length>0 ){
            setColor(productDetails?.colors[0]?.name);
            setColorId(productDetails?.colors[0]?.id)
        }

    }, [productDetails]);



    const handleSize=(id,name)=>{
        setSizeId(id);
        setSize(name);
    }

    const handleCreateCartItem=(select)=>{
        const guestCartId=localStorage.getItem('guestCartId');
        console.log(guestCartId);
        const user=JSON.parse(sessionStorage.getItem('user'));
        const data=new FormData();
        data.append('quantity',quantity);
        data.append('productId',productDetails?.id)
        data.append('guestCartId',guestCartId);
        data.append('userId',user?.id);
        data.append('colorId',colorId);
        data.append('colorName',color);
        data.append('sizeId',sizeId);
        data.append('sizeName',size);

        try {
            axios.post(urlCreateCartItem(),data).then((res)=>{

                if(select==='buy'){
                    window.location.href='/cart'
                }
                sessionStorage.setItem('quantityCartItem',res.data?.quantityCartItem);
                localStorage.setItem('guestCartId',res.data?.data?.guest_cart_id);
                if(JSON.parse( res.data.status)){
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Cập nhật giỏ hàng thành công.",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }else {
                    Swal.fire({
                        position: "top",
                        icon: "error",
                        title: res.data?.error,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }).catch((e)=>{
                console.log(e.response.data)
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: "Có lỗi xảy ra!",
                    showConfirmButton: false,
                    timer: 1500
                });

            })
        }catch (e) {

        }

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
                        <div className="col-lg-5 col-md-12 col-12 pt-3 product-gallery d-flex flex-column">

                                <div className="position-relative h-auto main-swiper d-inline ">
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
                                            productDetails?.images?.map((item)=>(
                                                <SwiperSlide key={item.id}>
                                                    <div className="d-flex justify-content-center align-items-start">
                                                        <img src={ImageUrl+ item.path} alt="" className='w-100 object-fit-cover'/>
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
                                <div className="position-relative h-auto main-swiper mt-3 ">
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
                                            productDetails?.images?.map((item)=>(
                                                <SwiperSlide key={item.id}>
                                                    <div className="d-inline-block">
                                                        <img src={ImageUrl+item.path} alt="" className='w-100 object-fit-cover h-100'/>
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
                                            <h1 className='fs-4 fw-bolder'>{productDetails?.name}</h1>
                                        </div>
                                        <div className="pro-sku">
                                            <span>Mã sản phẩm: <strong>{productDetails?.code}</strong></span>
                                            <span>Tình trạng: <strong>Còn hàng</strong></span>
                                            <span>Thương hiệu: <strong className='text-uppercase'>{productDetails?.brand}</strong></span>
                                        </div>
                                       <div className="pro-info mt-4">
                                           <div className="pro-price d-flex align-items-center flex-wrap p-3 rounded">
                                               <span className='pro-title'>Giá:</span>
                                               <span className='fs-5 fw-bolder price  '>{formatPrice(productDetails?.price -   productDetails?.discount*productDetails?.price || 0)}</span>
                                               {
                                                   productDetails?.discount>0 &&
                                                   <del className="fs-6 ms-2 ">{formatPrice(productDetails?.price || 0)}</del>

                                               }
                                               {
                                                   productDetails?.discount>0 &&   <span className="pro-percent ">-{productDetails?.discount * 100}%</span>
                                               }

                                           </div>
                                           <div className="product-variants my-4 ">
                                              <div className="d-flex align-items-center">
                                                  <div className="pro-color me-4 ">
                                                      <span className='variant-title'>Màu sắc: <br/><strong className='color-name ms-1'>{color}</strong></span>
                                                  </div>
                                                  <div className="select-color  mt-1 ">
                                                      {
                                                          productDetails?.colors?.map((item)=>(
                                                              <div className="d-inline-block me-1 mb-1" key={item.id}>
                                                                  <label
                                                                      onClick={()=>handleColorChange(item.id,item.name)}
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
                                                       {productDetails?.colors?.find((item) => item.name === color)
                                                           ?.sizes.map((item) => (
                                                               <div className="d-inline-block me-1 mb-1 " key={item.id}>
                                                                   <label
                                                                       onClick={()=>handleSize(item.id,item.name)}
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
                                                   <button type='submit' className=" btn-addtocart rounded"
                                                           onClick={()=>handleCreateCartItem('create')}>
                                                       <span>THÊM VÀO GIỎ HÀNG</span>
                                                   </button>
                                                   <button type='submit' className="ms-4 btnred  btn-buynow rounded"
                                                   onClick={()=>handleCreateCartItem('buy')}>
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