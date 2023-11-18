import {useMemo, useState} from "react";
import FormatPrice from "./FormatPrice";
import ProductQuickView from "./ProductQuickView";


function ProductItem({handleIsOpen}) {
    return (
        <div className="wrapper__product-item w-100 bg-white">
            <div className="product-content position-relative">
                <div className='product-img position-relative'>
                    <div className="img-after">
                    <figure>
                        <img src="	https://product.hstatic.net/200000690725/product/cs002_bce7c5c1befd47a09fd4acd42668fc94_master.jpg"
                             alt=""
                             className='object-fit-cover '/>
                    </figure>
                    </div>
                    <div className="img-before ">
                      <figure >
                          <img src="https://product.hstatic.net/200000690725/product/53197790942_bf4bc7352a_o_9c76cdf68bfc41c2936861828ab4003c_master.jpg"
                               alt=""
                               className='object-fit-cover'/>
                      </figure>
                    </div>
                    <div className="proloop-actions position-absolute w-100">
                        <div className="d-flex w-100 px-2 justify-content-around align-items-center">
                            <div className="proloop-cart bg-white text-uppercase px-3 py-2 fw-bold rounded" role={'button'}
                            onClick={handleIsOpen}>
                                <span className='me-1 fw-bolder'><i className="bi bi-bag"></i></span>
                                Thêm vào giỏ
                            </div>
                            <div role='button' className="bg-dark d-inline-block text-white px-2 py-2 rounded "
                                 onClick={handleIsOpen}>
                                <i className="bi bi-eye-fill"></i>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="product-info p-1">
                    <div className='proloop-variant d-flex justify-content-between mb-1'>
                        <div className="">+3 Màu sắc</div>
                        <div className="">+4 Kích thước</div>
                    </div>
                    <div className="text-start mb-1">
                        Áo khoác nỉ 1 lớp cổ cao EWCS002
                    </div>
                    <div className="mt-2 text-start">
                        <span className='fw-bolder text-danger'>{FormatPrice(200000)}</span>
                        <span className='ms-2 fw-light text-decoration-line-through'
                        style={{
                            fontSize:'13px'
                        }}>{FormatPrice(200000)}</span>
                    </div>
                </div>

                <div className="product-sale position-absolute">
                    <span className='px-3 py-1 text-white  rounded-4'>-34%</span>
                </div>

            </div>


        </div>

    );
}

export default ProductItem;