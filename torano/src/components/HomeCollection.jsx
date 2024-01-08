import React, {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import {Grid, Navigation, Pagination} from 'swiper/modules';
import ProductItem from "./ProductItem";
import {Link} from "react-router-dom";
import axios from "axios";
import {urlCollectionProducts, urlCollectionSubcategories} from "../Admin/components/dataApi";
function HomeCollection({subcategories}) {
    const [tabIndex,setTabIndex]=React.useState();
    const [listSubcategories, setListSubcategories] = useState([]);

    const [listSubcategoryId, setListSubcategoryId] = useState([]);

    const [listProducts, setListProducts] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (subcategories) {

                    const response = await axios.get(urlCollectionSubcategories(), {
                        params: {
                            subcategories: subcategories
                        }
                    });
                    setListSubcategories(response.data?.subcategories);

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [subcategories]);

    const handleSubcategories = (id, name) => {
        setTabIndex(id);
        setListSubcategoryId((prevState) => {

            if (!prevState.some((item) => item === id)) {
                return [...prevState, id];
            }

            return prevState;
        });

    };
    useEffect(() => {
        if (listSubcategories && listSubcategories.length > 0) {
            const firstCategoryId = listSubcategories[0]?.id;
            const firstCategoryName = listSubcategories[0]?.name;

            setListSubcategoryId((prevState) => {
                if (!prevState.some((item) => item === firstCategoryId)) {
                    return [...prevState, firstCategoryId];
                }
                return prevState;
            });

            setTabIndex(() => firstCategoryId);
        }
    }, [listSubcategories]);



    useEffect(() => {
        const fetchCollectionProducts = async () => {
            try {
                const response = await axios.get(urlCollectionProducts(), {
                    params: {
                        subcategories: listSubcategoryId
                    }
                });

                setListProducts(response.data?.data);
            } catch (error) {
                console.error("Error fetching collection products:", error);
            }
        };

        if (listSubcategoryId.length>0) {
            fetchCollectionProducts();
        }
    }, [listSubcategoryId]);




    return(
        <section className='section-home-collection'>
            <div className="section-title mb-4">
                <div className="title_tabs__navigation">
                    <ul className='d-flex justify-content-center'>
                        {
                            listSubcategories?.map((item)=>(
                                <li onClick={()=>handleSubcategories(item.id,item.name)} key={item.id} role={'button'}>
                                    <div className={"py-2 fs-5 fw-semibold "+(tabIndex===item.id?'tab-active':'')}>{item.name}</div>
                                </li>
                            ))
                        }

                    </ul>
                </div>

            </div>
            <div className="list-product">
                <div className="container">
                  <div className="row">

                      {
                          listProducts.map((item) => (
                              tabIndex === item.sub_category_id && (
                                  <div className='col-lg-2 col-md-6 col-6 mb-4' key={item?.id}>
                                      <ProductItem product={item} />
                                  </div>
                              )
                          ))
                      }



                  </div>

                </div>

            </div>
            <div className="d-flex justify-content-center mt-5 ">
                <Link to={'/'}  className="btn btn-outline-dark px-5">
                    Xem tất cả
                    {/*<strong>{tabIndex}</strong>*/}
                </Link>
            </div>

        </section>
    )

}
export default HomeCollection;