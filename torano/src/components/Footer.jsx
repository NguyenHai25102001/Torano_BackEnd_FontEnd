import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faTiktok, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
export const Footer = () => {
    return (
       <footer className='main-footer'>
           <div className="d-block">
               <div className="container">
                   <div className="row">
                       <div className="col-xl-3 col-lg-6 col-12 widget-footer">
                           <h2 className='widget-footer__title'>Thời trang nam TORANO</h2>
                           <p>Hệ thống thời trang cho phái mạnh hàng đầu
                               Việt Nam, hướng tới phong cách nam tính, lịch lãm và trẻ trung.</p>

                           <ul className='d-flex mt-3 flex-wrap p-0 gap-3'>
                               <li className='d-inline-block'>
                                   <Link to={'/'}>
                                       <FontAwesomeIcon icon={faFacebook} size={'2xl'} />
                                   </Link>
                               </li>
                               <li className='d-inline-block '>
                                   <Link to={'/'}>
                                       <FontAwesomeIcon icon={faTwitter} size="2xl" />
                                   </Link>
                               </li>
                               <li className='d-inline-block'>
                                   <Link to={'/'}>
                                       <FontAwesomeIcon icon={faInstagram} size="2xl" />
                                   </Link>
                               </li>
                               <li className='d-inline-block'>
                                   <Link to={'/'}>
                                       <FontAwesomeIcon icon={faTiktok} size="2xl" />
                                   </Link>
                               </li>
                               <li className='d-inline-block'>
                                   <Link to={'/'}>
                                       <FontAwesomeIcon icon={faYoutube} size="2xl" />
                                   </Link>
                               </li>
                           </ul>
                           <div className="footer-payment py-3">
                               <div className="payment-title fs-6 fw-bolder">Phương thức thanh toán</div>
                               <ul className='d-flex flex-wrap gap-2 my-2'>
                                   <li className='w-20'>
                                       <img src="https://theme.hstatic.net/200000690725/1001078549/14/payment_1_img.png?v=228" alt="" className='w-100'/>
                                   </li>
                                   <li className='w-20'>
                                       <img src="https://theme.hstatic.net/200000690725/1001078549/14/payment_2_img.png?v=228" alt="" className='w-100'/>
                                   </li>
                                   <li className='w-20'>
                                       <img src="https://theme.hstatic.net/200000690725/1001078549/14/payment_3_img.png?v=228" alt="" className='w-100'/>
                                   </li>
                                   <li className='w-20'>
                                       <img src="https://theme.hstatic.net/200000690725/1001078549/14/payment_4_img.png?v=228" alt="" className='w-100'/>
                                   </li>
                                   <li className='w-20'>
                                       <img src="https://theme.hstatic.net/200000690725/1001078549/14/payment_5_img.png?v=228" alt="" className='w-100 '/>
                                   </li>

                               </ul>
                           </div>
                       </div>
                       <div className="col-xl-3 col-lg-6 col-12 widget-footer">
                           <h2 className='widget-footer__title'>Thông tin liên hệ</h2>


                           <div className="footer-payment py-3">
                               <div className="payment-title fs-6 fw-bolder">Thông tin vận chuyển</div>
                               <div className="d-block">
                                   <div className="address-footer mt-2">
                                       <ul>
                                           <li>
                                               <b className=''>Địa chỉ: </b>Tầng 8, tòa nhà Ford, số 313 Trường Chinh, quận Thanh Xuân, Hà Nội
                                           </li>
                                           <li>
                                               <b className=''>Điện thoại: </b>0964942121
                                           </li>
                                           <li>
                                               <b className=''>Fax: </b>0904636356
                                           </li>
                                           <li>
                                               <b className=''>Email: </b>cskh@torano.vn
                                           </li>
                                       </ul>
                                   </div>
                               </div>

                               <div className="footer-payment py-3">
                                   <div className="payment-title fs-6 fw-bolder">Phương thức vận chuyển</div>
                                   <ul className='d-flex flex-wrap gap-2 my-2'>
                                       <li className='w-20'>
                                           <img src="https://theme.hstatic.net/200000690725/1001078549/14/shipment_1_img.png?v=228" alt="" className='w-100'/>
                                       </li>
                                       <li className='w-20'>
                                           <img src="https://theme.hstatic.net/200000690725/1001078549/14/shipment_2_img.png?v=228" alt="" className='w-100'/>
                                       </li>
                                       <li className='w-20'>
                                           <img src="	https://theme.hstatic.net/200000690725/1001078549/14/shipment_3_img.png?v=228" alt="" className='w-100'/>
                                       </li>
                                       <li className='w-20'>
                                           <img src="https://theme.hstatic.net/200000690725/1001078549/14/shipment_4_img.png?v=228" alt="" className='w-100'/>
                                       </li>

                                   </ul>
                               </div>


                           </div>
                       </div>
                       <div className="col-xl-3 col-lg-6 col-12 widget-footer">
                           <h2 className='widget-footer__title'>Nhóm liên kết</h2>
                           <div className="footerNav-Link d-block py-3">
                               <ul>
                                   <li className='mb-1'><Link to={''} className='ps-3'>Tìm kiến</Link></li>
                                   <li className='mb-1'><Link to={''} className='ps-3'>Giới thiệu</Link></li>
                                   <li className='mb-1'><Link to={''} className='ps-3'>Chính sach đổi trả</Link></li>
                                   <li className='mb-1'><Link to={''} className='ps-3'>Chính sách bảo mật</Link></li>
                                   <li className='mb-1'><Link to={''} className='ps-3'>Liên hệ</Link></li>
                               </ul>
                           </div>
                           
                       </div>
                       <div className="col-xl-3 col-lg-6 col-12 widget-footer">
                           <h2 className='widget-footer__title'>Đăng kí nhận tin</h2>
                         <div className="d-block py-2">
                             <p>
                                 Để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt và thông tin giảm giá khác.
                             </p>
                             <div className="mt-2">
                                 <form method='POST'>
                                     <div className="w-100 border border-1 border-secondary rounded d-flex align-items-center justify-content-between">
                                            <span className='ms-2'><FontAwesomeIcon icon={faEnvelope} size="xl" /></span>
                                         <input type="email" name='email' id='email' placeholder={'Nhập email của bạn'}/>
                                         <button className='btn btn-dark text-white text-uppercase fs-6 rounded-0'>Đăng ký</button>

                                     </div>

                                 </form>
                             </div>
                             <div className="mt-3">
                                 <Link to={''}>
                                     <img src="https://theme.hstatic.net/200000690725/1001078549/14/footer_logobct_img.png?v=228" alt=""/>
                                 </Link>
                             </div>
                         </div>

                       </div>

                   </div>
               </div>
           </div>

       </footer>
    )
}