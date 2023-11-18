import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';


import {Grid, Navigation, Pagination} from 'swiper/modules';
import ProductItem from "./ProductItem";
import {Link} from "react-router-dom";
function HomeCollection({handleIsOpen}) {
    const [tabIndex,setTabIndex]=React.useState()
    const tabs=[
        {
            name:'Áo khoác'
        },
        {
            name:'Quần jeans'
        },
        {
            name:'Áo thu đông'
        },
        {
            name:'Áo khoác'
        },
    ]
    return(
        <section className='section-home-collection'>
            <div className="section-title mb-4">
                <div className="title_tabs__navigation">
                    <ul className='d-flex justify-content-center'>
                        {
                            tabs.map((item,index)=>(
                                <li onClick={()=>setTabIndex(item.name)} key={index}>
                                    <div className={"py-2 fs-5 fw-semibold "+(tabIndex===item.name?'tab-active':'')}>{item.name}</div>
                                </li>
                            ))
                        }

                    </ul>
                </div>


            </div>
            <div className="list-product">
                <div className="container">
                    <Swiper
                        slidesPerView={6}
                        grid={{
                            rows: 1,
                        }}
                        spaceBetween={24}
                        navigation
                        modules={[Grid,Navigation]}
                        className="mySwiper">
                        {[...Array(20)].map((item, index) => (
                            <SwiperSlide
                                key={index}
                            >
                                <ProductItem handleIsOpen={handleIsOpen}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
            <div className="d-flex justify-content-center mt-5 ">
                <Link to={'/'}  className="btn btn-outline-dark px-5">
                    Xem tất cả <strong>{tabIndex}</strong>
                </Link>
            </div>

        </section>
    )

}
export default HomeCollection;