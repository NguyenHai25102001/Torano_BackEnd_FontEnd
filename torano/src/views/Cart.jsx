import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import formatPrice from "../components/FormatPrice";
import axios from "axios";
import {ImageUrl, urlCartList, urlDeleteCarItem, urlUpdateQuantityCartItem} from "../Admin/components/dataApi";
import Swal from "sweetalert2";

function Cart() {

    const [quantityCartItems, setQuantityCartItems] = useState('')

    const [cartList, setCartList] = useState([])

    const guestCartId=localStorage.getItem('guestCartId');
    
    const user=JSON.parse(sessionStorage.getItem('user'));

    const [totalAmount, setTotalAmount] = useState('');


    useEffect(() => {
try {

    if( user?.id || guestCartId){
        axios.get(urlCartList(),{
            params:{
                userId:user?.id,
                guestCartId:guestCartId,
            }
        }).then((response)=>{
            setCartList(response.data?.cartList);
        }).catch((e)=>{
            console.log(e)
        })
    }
}catch (e) {

}
    }, [user,guestCartId]);

    const handleUpOrDownQuantity = (id,action) => {

        const data={
            userId:user?.id,
            action:action,
            guestCartId:guestCartId
        }
       try {
           axios.post(urlUpdateQuantityCartItem(id),data)
               .then((response)=>{
                   console.log(response.data);
                   setCartList((prevState)=>{
                       const newData=prevState.map(item=>{
                           if(item.id===id){
                               return {...item,quantity: action==="up" ? item.quantity+1:item.quantity-1}
                           }
                           return item;
                       });

                       return newData;
                   });
               }).catch((e)=>{
               console.log(e.response.data?.status);
               if (!e.response.data?.status){
                   Swal.fire({
                       position: "top",
                       icon: "warning",
                       text:e.response.data?.error,
                       showConfirmButton: false,
                       timer: 1500
                   });
               }
           })
       }catch (e) {

       }

    }




    useEffect(() => {
       const total = cartList.reduce((accumulator,item)=>{
           return accumulator + ( item.quantity * item.product_price + item.product_discount * item.product_price);
       },0);
       setTotalAmount(total)
        const totalQuantityItem = cartList.reduce((accumulator,item)=>{
            return accumulator + item.quantity;
        },0);

        setQuantityCartItems(totalQuantityItem);
    }, [cartList]);


    const handleDeleteCartItem=(id)=>{
        const data={
            userId:user?.id,
            guestCartId:guestCartId
        }

            Swal.fire({

                text: "Bạn có muốn xoá sản phẩm này khỏi giỏ hàng?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                   try {
                       axios.delete(urlDeleteCarItem(id), { data: data })
                           .then((response) => {

                               setCartList((prevState)=>{
                                   const updatedList = prevState.filter(item => item.id !== id);
                                   return updatedList;
                               })

                           })
                           .catch((error) => {
                               // Handle error
                               console.error("Error deleting cart item:", error);
                               Swal.fire({
                                   title: "Error!",
                                   text: "There was an error deleting the cart item.",
                                   icon: "error",
                                   showConfirmButton: true,
                               });
                           });
                   }catch (e) {

                   }


                }
            });


    }




    return(
        <div className='layout-cart '>
            <div className="list-name-category">
                <div className="container">
                    <ol className='d-flex align-items-center py-1'>
                        <li>Trang chủ</li>
                        <li>Giỏ hàng({quantityCartItems})</li>
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
                                    <div className="fs-6">Bạn đang có <strong>{quantityCartItems} sản phẩm</strong> trong giỏ hàng</div>

                                </div>
                                <div className="d-block p-2 rounded border border-1  border-secondary">
                                    <div className="list-cart  ">
                                        {
                                            cartList?.map((item)=>(
                                                <div className="cart-item" key={item.id}>
                                                    <div className="img position-relative"
                                                         style={{

                                                         }}>
                                                        <img src={ImageUrl+item.images[0]?.path} alt="" className="object-fit-cover position-absolute w-100"
                                                        style={{
                                                            top:'0'
                                                        }}/>
                                                        <div className="pt"></div>
                                                    </div>
                                                    <div className="item-info px-2 media-right">
                                                        <div className="mb-2">
                                                            <div className="item--title">
                                                                <Link to={'/product/'+item.product_id}>{item.product_name}</Link>
                                                            </div>
                                                            <div className="item-var">Đen/S</div>
                                                        </div>
                                                        <div className="item-price">
                                                            <p>{formatPrice(item.product_price || 0)}đ</p>
                                                        </div>

                                                    </div>
                                                    <div className="media-total">
                                                        <div className="fs-6 fw-bolder">{formatPrice(item.product_price*item.quantity || 0)}</div>
                                                        <div className="d-flex my-2">
                                                            <span className='qty-btn user-select-none ' onClick={()=> item.quantity>1 && handleUpOrDownQuantity(item.id,'down')}>-</span>
                                                            <input type="text" value={item.quantity} name='quantity' readOnly={true}/>
                                                            <span className='qty-btn user-select-none' onClick={()=>handleUpOrDownQuantity(item.id,'up')}>+</span>
                                                        </div>

                                                    </div>
                                                    <button type={'button'} className="item-remove rounded-circle p-1"
                                                    onClick={()=>handleDeleteCartItem(item.id)}>
                                                        <span>Xoá</span>
                                                    </button>

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
                                    <div className="fs-5 fw-bolder text-red">{formatPrice(totalAmount || 0)}</div>
                                </div>
                                <div className="mt-3">
                                    <p className='m-0 p-0'>Phí vận chuyển sẽ được tính ở trang thanh toán.</p>
                                    <p className='m-0 p-0'>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</p>
                                </div>
                                <div className="mt-3">
                                  <Link to={'/payment'}>
                                      <button className='py-2 rounded bg-red w-100'>
                                          <span className='text-white fw-bolder fs-6'>Thanh toán</span>
                                      </button>
                                  </Link>
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