    import React, {useEffect, useRef, useState} from 'react';
    import { Swiper, SwiperSlide } from 'swiper/react';

    import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
    import FormatPrice from "./FormatPrice";
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import {
        faArrowLeft,
        faArrowRight,
        faChevronLeft,
        faChevronRight,
        faMinus,
        faPlus
    } from '@fortawesome/free-solid-svg-icons';
    import {
        FacebookMessengerShareButton,
        FacebookShareButton, FacebookShareCount,
        PinterestShareButton,
        TelegramShareButton,
        TwitterShareButton,
    } from "react-share";
    import {
        FacebookIcon,
        FacebookMessengerIcon,
        PinterestIcon,
        TelegramIcon,
        TwitterIcon,
    } from "react-share";
    import {Link} from "react-router-dom";
    import {product} from '../components/testAPI'
    import {useDispatch, useSelector} from "react-redux";
    import {
        closeProductQuickView,
        fetchProductQuickView,
        openProductQuickView
    } from "../redux/slices/productQuickViewSlice";
    import {ImageUrl, urlCreateCartItem} from "../Admin/components/dataApi";
    import axios from "axios";
    import Swal from "sweetalert2";


    function ProductQuickView({status,handleIsOpen}) {

        const [quantity,setQuantity]=React.useState(1);

        // url
        const url='https://www.youtube.com/watch?v=-LoPYVsBpc0&ab_channel=MiuMusic';

        const [thumbsSwiper, setThumbsSwiper] = useState(null);

        const dispatch = useDispatch();

        const productId = useSelector((state) => state.productQuickView.productId);

        const isProductQuickViewOpen = useSelector(
            (state) => state.productQuickView.isProductQuickViewOpen
        );

        const productDetails = useSelector(
            (state) => state.productQuickView.product
        );


        const [sizeId, setSizeId] = useState('');

        const [colorId, setColorId] = useState('');


        const[color,setColor]=useState('');

        const[size,setSize]=useState('');




        const getFirstAvailableSize = () => {
            const sizes = productDetails?.colors?.find((item) => item.name === color)?.sizes;
            if (sizes) {
                for (let i = 0; i < sizes.length; i++) {
                    const currentSize = sizes[i];
                    if (currentSize.quantity > 0) {
                        setSizeId(currentSize.id);
                        return currentSize.name;
                    }
                }
            }
        };


        React.useEffect(()=>{
            const initialSize = getFirstAvailableSize();
            setSize(initialSize);
        },[color]);


        const handleColorChange=(color)=>{
            setColor(color);
            const firstAvailableSize = getFirstAvailableSize();
            setSize(firstAvailableSize);
        };



        const handleClose = () => {
            dispatch(closeProductQuickView());
        };

        useEffect(() => {
            if (productId) {
                dispatch(fetchProductQuickView({ productId }));
            }
        }, [dispatch, productId]);

        useEffect(() => {
            if (productDetails?.colors && productDetails.colors.length > 0) {

                setColor(productDetails.colors[0].name);
                setColorId(productDetails?.colors[0]?.id)
            }
        }, [productDetails]);

        const handleSize=(id,name)=>{
            setSizeId(id);
            setSize(name);
        }

        const handleCreateCartItem=(select)=>{
            const guestCartId=localStorage.getItem('guestCartId');
            console.log(guestCartId)
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

    try{
        axios.post(urlCreateCartItem(),data).then((res)=>{

            if(JSON.parse( res.data.status)){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Cập nhật giỏ hàng thành công.",
                    showConfirmButton: false,
                    timer: 1500
                });
                sessionStorage.setItem('quantityCartItem',res.data?.quantityCartItem);
                localStorage.setItem('guestCartId',res.data?.data?.guest_cart_id);
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


        return (
            <div className={'wrapper_quick_view '+(isProductQuickViewOpen?'is-open-view':'')}>

                <div className="quick-view" onClick={handleClose}>
                </div>

                <div className="view-product-content rounded overflow-y-auto">
                    <form>
                        <div className="row">
                            <div className="col-6 ">
                                <div className="position-relative h-auto  main-swiper">

                                    <Swiper
                                        thumbs={thumbsSwiper != null ? { swiper: thumbsSwiper } : undefined}
                                        spaceBetween={10}
                                        navigation={{
                                            nextEl: '.swiper-button-next-custom',
                                            prevEl: '.swiper-button-prev-custom',
                                        }}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                    >
                                        {productDetails?.images?.map((item) => (
                                            <SwiperSlide key={item.id}>
                                                <div
                                                    className="product-image position-relative"
                                                >
                                                    <img src={ImageUrl+item.path} alt="" className='h-100 w-100 object-fit-cover position-absolute'/>
                                                    <div className="pt"></div>
                                                </div>
                                            </SwiperSlide>
                                        ))}

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
                                {/* Thumbnail Swiper */}
                                <div className="w-100 position-relative h-auto main-swiper mt-3">
                                    <Swiper

                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={15}
                                        slidesPerView={6}
                                        navigation={{
                                            nextEl: '.swiper-button-next-thum',
                                            prevEl: '.swiper-button-prev-thum',
                                        }}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                    >
                                        {productDetails?.images?.map((item) => (
                                            <SwiperSlide key={item.id}
                                            >
                                                <div className="">
                                                    <img src={ImageUrl+item.path} alt="" className="w-100" />
                                                </div>
                                            </SwiperSlide>
                                        ))}
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

                            <div className="col-6 px-2 py-4">
                                <div className="product-name">
                                    <h2 className='fs-4 fw-bolder'>Quần nỉ trơn basic EWBS002</h2>
                                </div>
                                <div className="product-sku mb-3">
                                    <span>Mã sản phẩm:<strong> EWBS00251CV03SB_BL-S</strong></span>
                                    <span className='pro-state'>Tình trạng: <strong>Còn hàng</strong></span>
                                    <span className='pro-vendor'>Thương hiệu:<strong className='text-uppercase'>Torano</strong></span>
                                </div>
                                <div className="info-body ps-2">
                                    <div className="pro-price d-flex  align-items-center flex-wrap p-3 rounded mb-2">
                                        <span className='fw-bolder me-1 '>Giá:</span>
                                        <div className="fs-6 fw-bolder  price">{FormatPrice(productDetails?.price || 0)}đ</div>
                                        <del className='ms-2'>{FormatPrice(400000)}đ</del>
                                        <span className="bg-price rounded-pill  text-white ms-3 sale">-25%</span>
                                    </div>
                                    <div className="product-variants mb-3">
                                        <div className="pro-color">
                                            <span className='variant-title'>Màu sắc:<strong className='color-name ms-1'>{color}</strong></span>
                                        </div>
                                        <div className="select-color w-100 mt-1 ">
                                            {
                                                productDetails?.colors?.map((item)=>(
                                                    <div className="d-inline-block me-1 mb-1" key={item.id}>
                                                        <label
                                                            onClick={()=>handleColorChange(item.name)}
                                                            className={(color === item.name ? 'active fw-bolder' : '')}>{item.name}</label>
                                                    </div>

                                                ))

                                            }
                                        </div>
                                        <div className="pro-color my-1">
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
                                        {/*Số lượng chọn mua*/}
                                        <div className="my-3 d-flex align-items-center ">
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


                                    </div>
                                </div>
                                {/*    btn Submit*/}
                                <div className=" w-100 px-3 mt-3">
                                    <button type={'button'} className='btn bg-price text-white fw-bolder fs-5 d-block w-100 '
                                    onClick={handleCreateCartItem}>
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                                {/*Share*/}
                                <div className="pro-share d-flex mt-3 align-items-center">
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

                                <div className="mt-3 text-decoration-underline" style={{
                                    fontSize:'12px'
                                }}>
                                    <Link to={'/'} className="fw-light">Xem chi tết sản phẩm >></Link>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>


            </div>
        )

    }
    export default  ProductQuickView;