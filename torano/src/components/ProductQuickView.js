import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

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
function ProductQuickView({status,handleIsOpen}) {
    const [quantity,setQuantity]=React.useState(1);
    const product={
        name:'Áo khoác da lộn basic cổ cao EWCL002',
        code:'EWCL00231PE00SB_LBE-S',
        status:true,
        brand:'TORANO',
        price:675000,
        sale:0.1,
        images:[
            {
                path:'https://product.hstatic.net/200000690725/product/53291247328_6a10f65c68_k_c48ce308b98c4e02ac2fe22b90a28c92_compact.jpg'
            },
            {
                path: 'https://product.hstatic.net/200000690725/product/53291004106_2ecbdd0476_k_eb63e8b148e040f59bd8e461ca6868cc_master.jpg'
            },
            {
                path: 'https://product.hstatic.net/200000690725/product/53291003996_058b8a3db0_k_3e5db04784954e52a6e7fdb4012b4ed0_master.jpg'
            }
            ,{
                path: 'https://product.hstatic.net/200000690725/product/53291246808_a50ace7ead_k_30ea86df07ad4cbd85460af6104a759d_master.jpg'
            }, {
                path:'https://product.hstatic.net/200000690725/product/53291247328_6a10f65c68_k_c48ce308b98c4e02ac2fe22b90a28c92_compact.jpg'
            },
            {
                path: 'https://product.hstatic.net/200000690725/product/53291004106_2ecbdd0476_k_eb63e8b148e040f59bd8e461ca6868cc_master.jpg'
            },
            {
                path: 'https://product.hstatic.net/200000690725/product/53291003996_058b8a3db0_k_3e5db04784954e52a6e7fdb4012b4ed0_master.jpg'
            }
            ,{
                path: 'https://product.hstatic.net/200000690725/product/53291246808_a50ace7ead_k_30ea86df07ad4cbd85460af6104a759d_master.jpg'
            },
        ],
        color:[{
            id:'1',
            name:'Green',
            sizes: [
                {
                    id: '1',
                    name: 'S',
                    quantity:1
                },
                {
                    id: '2',
                    name: 'M',
                    quantity:1
                },
                // Add more sizes as needed
            ]

        },{

            id:'1',
            name:'Red',
            sizes: [
                {
                    id: '1',
                    name: 'S',
                    quantity:0
                },
                {
                    id: '2',
                    name: 'M',
                    quantity:0
                },
                {
                    id: '2',
                    name: 'L',
                    quantity:1
                },
                // Add more sizes as needed
            ]

        }
        ],
    }
    // url
    const url='https://www.youtube.com/watch?v=-LoPYVsBpc0&ab_channel=MiuMusic';
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
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

    return (
        <div className={'wrapper_quick_view '+(status===true?'is-open-view':'')}>
            <div className="quick-view" onClick={handleIsOpen}>

            </div>
            <div className="view-product-content rounded">
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
                                    {product.images.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div
                                                className="product-image"
                                                style={{
                                                    background: `url(${item.path})`,
                                                    backgroundSize: 'cover',
                                                }}
                                            >
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
                                    {product.images.map((item, index) => (
                                        <SwiperSlide key={index}
                                        >
                                            <div className="">
                                                <img src={item.path} alt="" className="w-100" />
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
                                    <span className='fw-bolder me-5'>Giá:</span>
                                    <div className="fs-6 fw-bolder text-danger">{FormatPrice(290000)}đ</div>
                                    <del className='ms-2'>{FormatPrice(400000)}đ</del>
                                    <span className="bg-danger rounded-pill  text-white ms-3 sale">-25%</span>
                                </div>
                                <div className="product-variants mb-3">
                                    <div className="pro-color">
                                        <span className='variant-title'>Màu sắc:<strong className='color-name ms-1'>{color}</strong></span>
                                    </div>
                                    <div className="select-color w-100 mt-1 ">
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
                                    <div className="pro-color my-1">
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
                                <button className='btn btn-danger fw-bolder fs-5 d-block w-100 '>
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