import React from "react";
import {Link} from "react-router-dom";
import formatPrice from "../components/FormatPrice";

function Cart() {
    return(
        <div className='layout-cart '>
            <div className="list-name-category">
                <div className="container">
                    <ol className='d-flex align-items-center py-1'>
                        <li>Trang chủ</li>
                        <li>Giỏ hàng(2)</li>
                    </ol>
                </div>
            </div>
            <div className="wrap-cart">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-12">
                            <div className="mainCart-detail mb-5">
                                <div className="head-cart d-flex flex-wrap justify-content-between  mt-2 pt-2">
                                    <h1 className='fs-4 fw-bolder'>Giỏ hàng của bạn</h1>
                                    <div className="fs-6">Bạn đang có <strong>2 sản phẩm</strong> trong giỏ hàng</div>

                                </div>
                                <div className="d-block p-2 rounded border border-1  border-secondary">
                                    <div className="list-cart  ">
                                        {
                                            [...Array(3)].map((item,index)=>(
                                                <div className="cart-item">
                                                    <div className="img"
                                                         style={{
                                                             background:`url('https://product.hstatic.net/200000690725/product/53198475828_a71b6fcb90_o_2b4fc9c563644729ab41eae39e61ed90_medium.jpg')`,
                                                             backgroundSize:'cover'
                                                         }}>
                                                        <div className="pt"></div>
                                                    </div>
                                                    <div className="item-info px-2 media-right">
                                                        <div className="mb-2">
                                                            <div className="item--title">
                                                                <Link to={'/'}>Quần nỉ trơn basic EWBS002</Link>
                                                            </div>
                                                            <div className="item-var">Đen/S</div>
                                                        </div>
                                                        <div className="item-price">
                                                            <p>{formatPrice('290000')}đ</p>
                                                        </div>

                                                    </div>
                                                    <div className="media-total">
                                                        <div className="fs-6 fw-bolder">{formatPrice('290000')}</div>
                                                        <div className="d-flex my-2">
                                                            <span className='qty-btn'>+</span>
                                                            <input type="text" value={2} name='quantity' readOnly={true}/>
                                                            <span className='qty-btn'>-</span>
                                                        </div>

                                                    </div>
                                                    <div className="item-remove rounded-circle p-1">
                                                        <span>Xoá</span>
                                                    </div>

                                                </div>
                                            ))
                                        }
                                        
                                    </div>
                                </div>
                            {/*    Ghi chú*/}
                                <div className="cart-note p-2 mt-5">
                                    <label htmlFor="cartNote" className='form-label fw-bolder'>Ghi chú đơn hàng</label>
                                    <textarea className='form-control p-2' id='cartNote' rows={5} ></textarea>


                                </div>
                            </div>
                        </div>
                        
                        
                        <div className="col-lg-4 col-md-12 col-12 sidebarCart-sticky">
                            <div className="border border-1 border-secondary rounded p-2">
                                <div className="fs-5 fw-bolder ">Thông tin đơn hàng</div>
                                <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
                                    <div className="fs-6 fw-bolder">Tổng tiền</div>
                                    <div className="fs-5 fw-bolder text-red">{formatPrice(500000)}</div>
                                </div>
                                <div className="mt-3">
                                    <p className='m-0 p-0'>Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
                                    <p className='m-0 p-0'>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</p>
                                </div>
                                <div className="mt-3">
                                    <button className='py-2 rounded bg-red w-100'>
                                        <span className='text-white fw-bolder fs-6'>Thanh toán</span>
                                    </button>
                                </div>

                            </div>
                            <div className="p-2 mt-3 order-summary rounded">
                                <p><strong>Chính sách mua hàng</strong></p>
                                <p className='m-0'>Hiện chúng tôi chỉ áp dụng thanh toán với đơn hàng có giá trị tối thiểu<strong> 0₫</strong> trở lên.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Cart;