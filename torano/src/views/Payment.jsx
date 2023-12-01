import {Link} from "react-router-dom";
import formatPrice from "../components/FormatPrice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import React from "react";

function Payment() {
    const [showOrder,setShowOrder]=React.useState(false)
return (
    <div className='layout-payment'>
        <div className="col-md-4 col-12 m-auto">
            <div className="pay-logo w-50 m-auto">
                <Link to={'/'}>
                    <img src="	https://theme.hstatic.net/200000690725/1001078549/14/logo.png?v=228" alt="" className='w-100'/>
                </Link>
            </div>
            <div className="info-order mt-4 text-primary">
                <div className="d-flex justify-content-between flex-wrap fs-6">
                    <div className="show-order" onClick={()=>setShowOrder(!showOrder)} role={'button'}><FontAwesomeIcon icon={faCartShopping} /> {showOrder?'Ẩn thông tin đơn hàng':'Hiển thị thông tin đơn hàng'}</div>
                    <div className="price-order text-dark fw-bolder ">{formatPrice(500000)}</div>
                </div>
                <div className="text-dark">
                    {
                        showOrder?( <div className="list-cart  ">
                            {
                                [...Array(3)].map((item,index)=>(
                                    <div className="cart-item d-flex align-items-center">
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


                                        </div>


                                    </div>
                                ))
                            }

                        </div>):''
                    }
                </div>
                <div className="mt-2 d-flex align-items-center  ">
                    <input type="text" name='codeDiscount' className='form-control w-auto '/>
                    <button className="btn btn-secondary ms-3"><span>Sử dụng</span></button>
                </div>

            </div>
        {/*    Thông tin giao hàng*/}
            <div className="d-block mt-3">
                <div className="fs-5 fw-bolder">Thông tin giao hàng</div>
                <div className="mt-2">Bạn đã có tài khoản? <Link to={'/account/login'} className='text-primary'>Đăng nhập</Link></div>
                <div className="row">
                 <div className="col-md-12 col-12 mt-2">
                     <input type="text" className='form-control' name='name' value={''} placeholder={'Họ và tên'}/>
                 </div>
                    <div className="col-lg-8 mt-2">
                        <input type="text" className='form-control' name='email' placeholder={'Vui lòng nhập email'}/>
                    </div>
                    <div className="col-lg-4 mt-2">
                        <input type="text" className='form-control' name='phone' placeholder={'Số điện thoại'}/>
                    </div>
                    <div className="col-md-12 col-12 mt-2">
                        <input type="text" className='form-control' name='address' value={''} placeholder={'Đại chỉ'}/>
                    </div>
                    <div className="col-md-6 col-12 mt-2">
                        <label>Tỉnh/thành</label>
                        <select className='form-select'>
                            <option>đl;sckl</option>

                        </select>
                    </div>
                    <div className="col-md-6 col-12 mt-2">
                        <label>Quận huyện</label>
                        <select className='form-select'>
                            <option>đl;sckl</option>

                        </select>
                    </div>
                    <div className="mt-3">
                        <div className="my-3">Phương thức vận chuển</div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                               Gia hàng tận nơi
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                defaultChecked=""
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Giao hàng ngoại tỉnh
                            </label>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-5">
                        <Link to={'/cart'}>Giỏ hàng</Link>
                        <div className="btn btn-primary">Hoàn tất đơn hàng</div>
                    </div>
                    <div className="py-5"></div>

                </div>
            </div>
        {/*  end thông tin đơn hàng*/}
            
        </div>
        

    </div>
)
}
export  default Payment;