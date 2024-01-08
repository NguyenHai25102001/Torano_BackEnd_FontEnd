import { Link } from "react-router-dom";
import Header from "../components/Header";
import React,{useEffect,useState} from "react";
import AppContent from "../components/AppContent";
import {Footer} from "../components/Footer";
import ProductQuickView from "../components/ProductQuickView";
import {ImageUrl, urlCartList, urlDeleteCarItem, urlUpdateQuantityCartItem} from "../Admin/components/dataApi";
import formatPrice from "../components/FormatPrice";
import Swal from "sweetalert2";
import axios from "axios";
import LoadingComponent from "../components/LoadingComponent";

function DefaultLayout() {
  const [cart, setCart] = React.useState(false);

  const [quantityCartItems, setQuantityCartItems] = useState('')

  const [cartList, setCartList] = useState([]);

  const guestCartId=localStorage.getItem('guestCartId');

  const user=JSON.parse(sessionStorage.getItem('user'));

  const [totalAmount, setTotalAmount] = useState('');
  const handleCart = () => {
    setCart(true);
  };



  /**
   * Giỏ hàng header
   * */


  // useEffect(() => {
  //
  //   if( user?.id || guestCartId>0){
  //     axios.get(urlCartList(),{
  //       params:{
  //         userId:user?.id,
  //         guestCartId:guestCartId,
  //       }
  //     }).then((response)=>{
  //
  //       setCartList(response.data?.cartList);
  //     }).catch((e)=>{
  //       console.log(e)
  //     })
  //   }
  // }, [user,guestCartId]);
  const handleUpOrDownQuantity = (id,action) => {

    const data={
      userId:user?.id,
      action:action,
    }
    axios.post(urlUpdateQuantityCartItem(id),data)
        .then((response)=>{
          console.log(response);
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
    }

    Swal.fire({

      text: "Bạn có muốn xoá sản phẩm này khỏi giỏ hàng?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(urlDeleteCarItem(id),{data:data}).then((response)=>{
          console.log(response.data)
          setCartList((prevState)=>{
            const updateCartList=prevState.filter(item => item.id !== id)
            return updateCartList;
          })
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        }).catch((e)=>{
          console.log(e.response.data)
        })

      }
    });


  }





  /** End giỏ hàng header*/

  return (
    <div className="wrapper__layout">
      <div className="topbar">
        <div className="topbar-bottom bg-black text-white">
          <div className="container">
            <div className="box-content d-flex justify-content-between align-items-center p-1 flex-wrap ">
              <div className="box-left d-flex flex-wrap align-items-center">
                <div className="hotline">
                  <span>
                    Hotline mua hàng: <Link to={"/"}>03545833467</Link>
                    8:30-21:30, Tất cả các ngày trong tuần
                  </span>
                </div>
                <div className="contact">
                  <span>
                    <Link to="/">Liên hệ</Link>
                  </span>
                </div>
              </div>
              <div className="box-right">
                <div className="notify position-relative">
                  <div className="notify-title">
                    <div className="notify-tt">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 32 32"
                        className="me-2"
                      >
                        <g fill="#FFFFFF">
                          <g fill="#FFFFFF">
                            <path
                              d="m29.39355 22.24194c0-1.85809-1.32587-3.40649-3.07745-3.76453v-7.15167c0-5.70001-4.62579-10.32574-10.3161-10.32574s-10.3161 4.62573-10.3161 10.32574v7.15167c-1.75159.35803-3.07745 1.90643-3.07745 3.76453 0 2.10968 1.7226 3.83221 3.84192 3.83221h19.10327c2.11932.00001 3.84191-1.72253 3.84191-3.83221z"
                              fill="#FFFFFF"
                            ></path>
                            <path
                              d="m16 31c2.32263 0 4.32581-1.43231 5.15808-3.47424h-10.31616c.83227 2.04193 2.83545 3.47424 5.15808 3.47424z"
                              fill="#FFFFFF"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <span className="noti-numb">0</span>
                      Thông báo của tôi
                    </div>
                  </div>
                  <div className="notify-container">
                    <div className="sitenav-wrapper sitenav-notify">
                      <div className="sitenav-content">
                        <div className=" t text-dark p-3">
                          Hiện không có thông báo nào
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
      <Header handleCart={handleCart} />
      {/* main default */}
      <div className="wrapper_layout--main">
        <AppContent/>

      </div>
      {/* emd main fault main */}

      {/* Đóng mở Cart */}
      <div className="sidebar-main">
        <div
          className={
            "sitenav-wrapper sitenav-right sitenav-cart cart-empty " +
            (cart ? "is-opened" : "")
          }
        >
          <div className="sitenav-inner">
            <div className="p-3 d-flex  justify-content-between border-bottom ">
              <p className="sitenav-header__title">Giỏ hàng</p>
              <div
                className="d-flex align-items-center"
                role="button"
                onClick={() => setCart(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 19 19"
                  role="presentation"
                  width="19"
                  height="19"
                >
                  <path
                    d="M9.1923882 8.39339828l7.7781745-7.7781746 1.4142136 1.41421357-7.7781746 7.77817459 7.7781746 7.77817456L16.9705627 19l-7.7781745-7.7781746L1.41421356 19 0 17.5857864l7.7781746-7.77817456L0 2.02943725 1.41421356.61522369 9.1923882 8.39339828z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="sitenav-content">
              <div className="cart-view">
                <div className="mini-cart__empty">

                  {
                    cartList?.length>0?(
                        <div className="d-block ">
                          <div className="list-cart ">
                            {
                              cartList?.map((item)=>(
                                  <div className="cart-item  border-0" key={item.id}>
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
                    ):(
                        <div className="svgico-mini-cart">
                          <img
                              src="https://theme.hstatic.net/200000690725/1001078549/14/cart_banner_image.jpg?v=202"
                              alt=""
                          />
                          <p>Chưa có sản phẩm giỏ hàng...</p>
                          <div className="d-flex justify-content-around mt-2">
                            <Link
                                to={"#"}
                                className="text-primary text-decoration-underline"
                            >
                              Trở về trang sản phẩm
                            </Link>
                            <Link
                                to={"#"}
                                className="text-primary text-decoration-underline"
                            >
                              Khuyến mãi dành cho bạn
                            </Link>
                          </div>
                        </div>
                    )
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sitenav-mask" onClick={() => setCart(false)}></div>
        <div></div>
      </div>
      {/* end open Cart */}





    {/*  Footer*/}
      <ProductQuickView/>
      <div className="mt-5"></div>
      <Footer/>

    {/*  end Footer*/}



    </div>
  );
}

export default DefaultLayout;
