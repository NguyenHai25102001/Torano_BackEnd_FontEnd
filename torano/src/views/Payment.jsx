    import {Link} from "react-router-dom";
import formatPrice from "../components/FormatPrice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {ImageUrl, urlCartList, urlCreateOrder} from "../Admin/components/dataApi";
    import Swal from "sweetalert2";

function Payment() {
    const [showOrder,setShowOrder]=React.useState(true)

    const [cartList, setCartList] = useState([]);

    const guestCartId=localStorage.getItem('guestCartId');

    const user=JSON.parse(sessionStorage.getItem('user'));

    const [totalAmount, setTotalAmount] = useState('');

    const [order, setOrder] = useState('');

    const [name, setName] = useState(()=>{
      return   user?.name
    });

    const [email, setEmail] = useState(()=>{
        return user?.email
    });

    const [phone, setPhone] = useState('');

    const [address, setAddress] = useState('');

    const [ward, setWard] = useState('');
    const [wardId, setWardId] = useState('');
    const [wardList, setWardIdList] = useState([]);


    const [district, setDistrict] = useState('')
    const [districtId, setDistrictId] = useState('')
    const [districtList, setDistrictList] = useState([])

    const [province, setProvince] = useState('')
    const [provinceId, setProvinceId] = useState('')
    const [provinceList, setProvinceList] = useState([])


    useEffect(() => {

        if(guestCartId || user){
            axios.get(urlCartList(),{
                params:{
                    userId:user?.id,
                    guestCartId:guestCartId,
                }
            }).then((response)=>{
              //  console.log(response.data);

                setCartList(response.data?.cartList);
            }).catch((e)=>{
                console.log(e)
            })
        }
    }, [user,guestCartId]);

    useEffect(() => {
        const total = cartList.reduce((accumulator,item)=>{
            return accumulator + ( item.quantity * item.product_price + item.product_discount * item.product_price);
        },0);

        setTotalAmount(()=>{
            return total>700000?total : total+30000;
        })
    }, [cartList]);

    const handleLogout=()=>{
        sessionStorage.removeItem('user');
        window.location.reload();

    }

    useEffect(() => {
        axios.get('https://provinces.open-api.vn/api/p/?depth=2').then(res=>{

            setProvinceList(res.data)
        }).catch(e=>{
            console.log(e)
        })
    }, []);
    useEffect(() => {
        if(provinceId !==''){
            axios.get(`https://provinces.open-api.vn/api/p/${provinceId}?depth=2`).then(res=>{

                setProvince(res.data?.name)
                setDistrictList(res.data?.districts)

            }).catch(e=>{
                console.log(e)
            })
        }
    }, [provinceId]);

    useEffect(() => {
        if(districtId !==''){
            axios.get(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`).then(res=>{

                setDistrict(res.data.name)
                setWardIdList(res.data?.wards)

            }).catch(e=>{
                console.log(e)
            })
        }
    }, [districtId]);

    useEffect(() => {
        if(wardId !==''){
            axios.get(`https://provinces.open-api.vn/api/w/${wardId}?depth=2`).then(res=>{

               setWard(res.data?.name);

            }).catch(e=>{
                console.log(e)
            })
        }
    }, [wardId]);

    const handleOrder=(e)=>{
        console.log(wardId)
        e.preventDefault();
        const data=new FormData();
        data.append('userId',user?.id);
        data.append('guestCartId',guestCartId);
        data.append('userName',name);
        data.append('email',email);
        data.append('phone',phone);
        data.append('address',address);
        data.append('provinceId',provinceId);
        data.append('province',province);
        data.append('districtId',districtId);
        data.append('district',district);
        data.append('wardId',wardId);
        data.append('ward',ward);
        data.append('totalAmount',totalAmount);
        console.log(totalAmount)

        axios.post(urlCreateOrder(),data).then(res=>{
            console.log(res.data)
            if (res.data?.status){
                setOrder(res.data?.order)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    text: "Đặt hàng thành công",
                    showConfirmButton: false,
                    timer: 1500
                });
            }else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    text: res.data?.error,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        }).catch(error =>{
            console.log(error)
           if(!error.response?.data?.status){
               Swal.fire({
                   position: "top",
                   icon: "error",
                   text: error.response?.data?.error,
                   showConfirmButton: false,
                   timer: 1500
               });
           }
        })

    }
    return (
    <div className='layout-payment container-lg'>
        <div className="col-md-4 col-12 m-auto">
            <div className="pay-logo w-50 m-auto">
                <Link to={'/'}>
                    <img src="	https://theme.hstatic.net/200000690725/1001078549/14/logo.png?v=228" alt="" className='w-100'/>
                </Link>
            </div>

        {/*  end thông tin đơn hàng*/}

        {/*    Thông tin đơn hàng sau kho đặt*/}
            {
                order !==''?
                <div className='info-order'>
                    <h3 className='fw-bold'>Thông tin đơn hàng</h3>
                    <div className="mt-2 fs-5 fw-medium">
                        Họ và tên: <span className='ms-2 fs-5 fst-italic fw-normal'>{order?.user_name}</span>
                    </div>
                    <div className="mt-2 fs-5 fw-medium">
                        Email: <span className='ms-2 fs-5 fst-italic fw-normal'>{order?.email}</span>
                    </div>
                    <div className="mt-2 fs-5 fw-medium">
                        Phone: <span className='ms-2 fs-5 fst-italic fw-normal'>{order?.phone}</span>
                    </div>
                    <div className="mt-2 fs-5 fw-medium">
                        Địa chỉ: <span className='ms-2 fs-5 fst-italic fw-normal'>{order?.address},{order?.ward},{order?.province},{order?.district}</span>
                    </div>
                    <div className="mt-2 fs-5 fw-medium">
                        Tổng tiền thanh toán: <span className='ms-2 fs-5 fst-italic fw-normal price'>{formatPrice(order?.total_amount  ||0 )}</span>
                    </div>

                    <div className="d-flex mt-3 justify-content-between align-items-center">
                        <Link to={'/'} className='text-primary fst-italic fs-6 text-decoration-underline'>Quay về trang chủ</Link>
                        <button type={'button'} className='px-2 py-2 rounded bg-price text-white '>Thanh toán ngay</button>
                    </div>




                </div> :(
                    <>
                        <div className="info-order mt-4 text-primary">
                            <div className="d-flex justify-content-between flex-wrap fs-6">
                                <div className="show-order" onClick={()=>setShowOrder(!showOrder)} role={'button'}><FontAwesomeIcon icon={faCartShopping} /> {showOrder?'Ẩn thông tin đơn hàng':'Hiển thị thông tin đơn hàng'}</div>
                                <div className="price-order text-dark fw-bolder ">{formatPrice(totalAmount || 0)}</div>
                            </div>
                            <div className="text-dark">
                                {
                                    showOrder?( <div className="list-cart  ">
                                        {
                                            cartList?.map((item)=>(
                                                <div className="cart-item d-flex align-items-center " key={item.id}>
                                                    <div className="img position-relative">

                                                            <span className='product-thumbnail-quantity'>
3
                                                           </span>
                                                        <img src={ImageUrl+item.images[0]?.path} alt="" className='w-100 mh-100 position-absolute'/>
                                                        <div className="pt"></div>

                                                    </div>
                                                    <div className="item-info px-4 media-right">
                                                        <div className="mb-2">
                                                            <div className="item--title">
                                                                <Link to={'/'}>{item?.product_name}</Link>
                                                            </div>
                                                            <div className="item-var">{item.color_name}/{item?.size_name}</div>
                                                        </div>
                                                        <div className="item-price">
                                                            <p>{formatPrice(item?.product_price - item?.product_price  * item?.product_discount ||0)}</p>
                                                        </div>

                                                    </div>
                                                    <div className="media-total">
                                                        <div className="fs-6 fw-bolder">{formatPrice(item?.product_price * item?.quantity - item?.product_price  * item?.product_discount ||0)}</div>


                                                    </div>
                                                    <span className=''>

                                        </span>


                                                </div>
                                            ))
                                        }

                                    </div>):''
                                }
                                <div className="mt-1 fst-italic ">Phí vận chuyển: <strong className='text-warning'>30.000 đ</strong></div>
                                <div className="mt-1 fst-italic ">Miến phí vận chuyển đơn hàng trên: <strong className='text-warning'>700.000 đ</strong></div>
                            </div>
                            <div className="mt-2 d-flex align-items-center  ">
                                <input type="text" name='codeDiscount' className='form-control w-auto '/>
                                <button className="btn btn-secondary ms-3"><span>Sử dụng</span></button>
                            </div>

                        </div>
                        {/*    Thông tin giao hàng*/}
                        <div className="d-block mt-3">
                            <div className="fs-5 fw-bolder">Thông tin giao hàng</div>

                            {
                                user?(
                                    <div>{user.name}({user.email})
                                        <br/>
                                        <Link to={'#'} className='text-primary'
                                              onClick={handleLogout}>Đăng xuất</Link>
                                    </div>
                                ):(
                                    <div className="mt-2">Bạn đã có tài khoản? <Link to={'/account/login'} className='text-primary'>Đăng nhập</Link></div>
                                )
                            }
                            <div className="row">
                                <div className="col-md-12 col-12 mt-2">
                                    <input type="text" className='form-control' name='name'
                                           value={name}
                                           placeholder={'Họ và tên'}
                                           onChange={(e)=>setName(e.target.value)}/>
                                </div>
                                <div className="col-lg-8 mt-2">
                                    <input type="text" className='form-control' name='email' placeholder={'Vui lòng nhập email'}
                                           value={email}
                                           onChange={(e)=>setEmail(e.target.value)}/>
                                </div>
                                <div className="col-lg-4 mt-2">
                                    <input type="text" className='form-control' name='phone' placeholder={'Số điện thoại'}
                                           value={phone}
                                           onChange={(e)=>setPhone(e.target.value)}/>
                                </div>
                                <div className="col-md-12 col-12 mt-2">
                                    <input type="text" className='form-control' name='address' value={address} placeholder={'Đại chỉ'}
                                           value={address}
                                           onChange={(e)=>setAddress(e.target.value)}/>
                                </div>
                                <div className="col-md-6 col-12 mt-2">
                                    <label>Tỉnh/thành</label>
                                    <select className='form-select' onChange={(e) => setProvinceId(e.target.value)}>
                                        <option value="">None</option>
                                        {
                                            provinceList.map((province)=>(
                                                <option value={province.code} key={province.code}>{province.name}</option>

                                            ))
                                        }

                                    </select>

                                </div>
                                <div className="col-md-6 col-12 mt-2">
                                    <label>Quận huyện</label>
                                    <select className='form-select' onChange={(e) => setDistrictId(e.target.value)}>
                                        <option value="">None</option>
                                        {
                                            districtList.map((discount)=>(
                                                <option value={discount.code} key={discount.code}>{discount.name}</option>
                                            ))
                                        }

                                    </select>
                                </div>

                                <div className="col-md-12 col-12 mt-2">
                                    <label>Phường/xã</label>
                                    <select className='form-select' onChange={(e) => setWardId(e.target.value)}>
                                        <option value="">None</option>
                                        {
                                            wardList.map((ward)=>(
                                                <option value={ward.code} key={ward.code}>{ward.name}</option>
                                            ))
                                        }

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
                                    <Link to={'/cart'} className='text-primary'>Giỏ hàng</Link>
                                    <div className="btn btn-primary"
                                         onClick={handleOrder}>Hoàn tất đơn hàng</div>
                                </div>
                                <div className="py-5"></div>

                            </div>
                        </div>
                    </>
                    )
            }

            { /* end thông tin đơn hàng sau khi đặt*/}
            
        </div>
        <div className="py-5"></div>
        

    </div>
)
}
export  default Payment;