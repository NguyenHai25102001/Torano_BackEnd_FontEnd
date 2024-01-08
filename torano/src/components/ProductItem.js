import React, {useMemo, useState} from "react";

import FormatPrice from "./FormatPrice";

import {ImageUrl} from "../Admin/components/dataApi";

import {Link} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";

import {openProductQuickView, setProductId} from "../redux/slices/productQuickViewSlice";


function ProductItem({product}) {

    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(setProductId(product.id));

        dispatch(openProductQuickView());
    };

    return (
        <div className="wrapper__product-item w-100 bg-white">

           <div className="product-content position-relative">
               <div className='product-img position-relative'>
                   <Link to={'/product/'+product?.id}>
                       <div className="img-after">
                           <figure>
                               <img src={ImageUrl+product?.images[0]?.path}
                                    alt=""
                                    className='object-fit-cover '/>
                           </figure>
                       </div>
                       <div className="img-before ">
                           <figure >
                               <img src={ImageUrl+product?.images[1].path}
                                    alt=""
                                    className='object-fit-cover'/>
                           </figure>
                       </div>
                   </Link>

                   <div className="proloop-actions position-absolute w-100">
                       <div className="d-flex w-100 px-2 justify-content-around align-items-center"
                       onClick={handleOpen}>
                           <div className="proloop-cart bg-white text-uppercase px-3 py-2 fw-bold rounded" role={'button'}
                                onClick={handleOpen}>
                               <span className='me-1 fw-bolder'><i className="bi bi-bag"></i></span>
                               Thêm vào giỏ
                           </div>
                           <div role='button' className="bg-dark d-inline-block text-white px-2 py-2 rounded "
                                onClick={handleOpen}>
                               <i className="bi bi-eye-fill"></i>
                           </div>
                       </div>
                   </div>

               </div>
               <div className="product-info p-1">
                   <div className='proloop-variant d-flex justify-content-between mb-1'>
                       <div className="">+{product?.color_count} Màu sắc</div>
                       <div className="">+4 Kích thước</div>
                   </div>
                   <div className="text-start mb-1 text-truncate">
                       {product?.name}
                   </div>
                   <div className="mt-2 text-start">
                       <span className='fw-bolder  price'>{FormatPrice(product?.price - product?.discount*product?.price || 0)}</span>
                       {
                           product?.discount > 0 &&     <span className='ms-2 fw-light text-decoration-line-through'
                                                              style={{
                                                                  fontSize:'13px'
                                                              }}>{FormatPrice(product.price)}</span>
                       }

                   </div>
               </div>

               {
                   product?.discount > 0 &&    <div className="product-sale position-absolute">
                       <span className='px-3 py-1 text-white  rounded-4'>-{product?.discount * 100}%</span>
                   </div>
               }

           </div>


        </div>

    );
}

export default ProductItem;