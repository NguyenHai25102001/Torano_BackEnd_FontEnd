import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {FormControl, MenuItem, Select,} from "@mui/material";
import ProductItem from "../components/ProductItem";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../redux/slices/categorySlides";
import {Link, useParams} from "react-router-dom";
import {fetchProduct, setCode, setFilter,setPage} from "../redux/slices/productSlices";

function Collections() {
    const [filterOptions,setFilterOptions]=React.useState(true);
    
    const [listChild,setListChild]=React.useState('');
    
    const [arrange, setArrange] = React.useState(1);
    
    const [isOpen,setIsOpen]=React.useState(false);

    const [selectPage, setSelectPage] = useState(1);

    const [products, setProducts] = useState([]);

    const [nameCategory, setNameCategory] = useState('')

    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.category.data);

    const { code, filter,page } = useSelector((state) => state.products);

    const [inputCode, setInputCode] = useState('quan-nam');

    const [inputFilter, setInputFilter] = useState('');

    const {codeParams}=useParams();

    useEffect(() => {
        setSelectPage(1)
      setInputCode(codeParams)
    }, [codeParams]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleIsOpen=()=>{
        setIsOpen(!isOpen)
    }
    const handleChange = (event) => {
        setInputFilter(event.target.value);
    };
    const handleInputChange = () => {
        dispatch(setCode(inputCode));
        dispatch(setFilter(inputFilter));
        dispatch(setPage(selectPage));
    };

    useEffect(() => {
        handleInputChange();
    }, [inputCode, inputFilter,selectPage]);

    // ...

    useEffect(() => {
        if (code) {
            const fetchData = async () => {
                try {
                    const result = await dispatch(fetchProduct({ code, filter, page }));

                    setProducts(result.payload)
                } catch (error) {
                    console.log('Error fetching product:', error);
                }
            };

            fetchData();
        }
    }, [code, filter, page, dispatch]);

    return (
        <div className='wrap-collection'>
            <div className="list-name-category">
                <div className="container">
                    <ol className='d-flex align-items-center py-1'>
                        <li>Trang chủ</li>
                        <li>Áo nam</li>
                    </ol>
                </div>
            </div>
            <div className="container ">
                <div className="section-collection">
                    <div className="row pt-4">
                        <div className="col-lg-3 col-md-12 col-12">
                            <div className="filter-wrapper sticky-sidebar">
                                <div className="filter-content d-block">
                                    <div className="filter-head"><p>Bộ lọc</p></div>
                                    <div className="filter-options  d-flex w-100 justify-content-between align-items-center"
                                    role={'button'}
                                    onClick={()=>setFilterOptions(!filterOptions)}>
                                        <div className="fs-6 fw-bolder">Danh sách sản phẩm</div>
                                        <div className=""><FontAwesomeIcon icon={filterOptions? faPlus:faMinus} /></div>
                                    </div>
                                    <div className="d-block">
                                        <ul className={(filterOptions?'':'d-none')}>
                                            {categoryList?.categories?.map((category) => (
                                                    <li key={category.id} className={'py-1 fw-semibold'}>
                                                        <div className="d-flex align-items-center"
                                                        role={'button'}
                                                        onClick={()=>listChild===category.name?setListChild(''):setListChild(category.name)}>
                                                         <span className={'me-2'}>   {category.name}</span>
                                                            {
                                                                category?.subcategories&&(<span className={''+(listChild===category.name&&(' active-list-child'))}><FontAwesomeIcon icon={faChevronDown} size={'xs'} /></span>)
                                                            }
                                                        </div>
                                                        {
                                                            listChild===category.name&&(
                                                                <ul className={'list-child ms-4 mt-1'}>
                                                                    {  category?.subcategories.map((sub) => (
                                                                        <li key={sub.id} className={'py-1'}><Link to={'/collections/'+sub.code}>{sub.name}</Link></li>
                                                                    ))}
                                                                </ul>
                                                            )
                                                        }

                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                {/*    Khoảng giá*/}
                                    <div className="mt-3">
                                        <div className="fs-6 fw-bolder">Khoảng giá:</div>
                                    </div>
                                {/*    end khoảng giá*/}
                                    {/* Màu sắc */}
                                    <div className="mt-3">
                                        <div className="fs-6 fw-bolder">Màu sắc:</div>
                                    </div>
                                    {/*    end Màu sắc*/}
                                    {/* Sie */}
                                    <div className="mt-3">
                                        <div className="fs-6 fw-bolder">Size:</div>
                                    </div>
                                    {/* end size*/}
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-12 col-12">
                            <div className="toolbar-products d-flex align-items-start flex-wrap">
                                <div className="d-flex flex-wrap align-items-center">
                                    <div className="fw-bolder fs-4">{products?.nameCategory}</div>
                                    <div className="ms-2 fs-6">
                                        <strong>{products?.data?.total}</strong> sản phẩm
                                    </div>
                                </div>
                                <div className="ms-auto d-flex align-items-center">
                                    <div className="d-inline-block me-4">Sắp xếp theo: </div>
                                    <div className="d-inline-block">
                                        <FormControl sx={{ m: 0, minWidth: 200 }}>
                                        <Select
                                            value={inputFilter}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}

                                        >
                                            <MenuItem value={''}><em>None</em></MenuItem>

                                            <MenuItem value={1}>Sản phẩm nổi bật</MenuItem>
                                            <MenuItem value={'priceAsc'}>Giá:Tăng dần</MenuItem>
                                            <MenuItem value={'priceDesc'}>Giá:Giảm dần</MenuItem>
                                            <MenuItem value={'nameAsc'}>Tên:A-Z</MenuItem>
                                            <MenuItem value={'nameDesc'}>Tên:Z-A</MenuItem>
                                            <MenuItem value={30}>Cũ nhất</MenuItem>
                                            <MenuItem value={30}>Bán chạy nhất</MenuItem>
                                            <MenuItem value={30}>Tồn kho nhiều nhất</MenuItem>
v                                        </Select>
                                        </FormControl>
                                    </div>
                                </div>

                            </div>
                            <div className="row list-product-row mt-3">
                                {
                                    products?.data?.data?.map((product)=>(
                                        <div className="col-lg-3 col-md-6 col-6 position-relative mb-4" key={product.id}>
                                            <ProductItem handleIsOpen={handleIsOpen} product={product}/>
                                        </div>
                                    ))
                                }
                            </div>
                            {
                                products?.data?.last_page >1 ?
                                    <div className="d-flex justify-content-center">
                                        <Stack spacing={2}>
                                            <Pagination count={products?.data?.last_page}  color="standard"
                                                        page={selectPage}
                                                        onChange={(event,value)=>setSelectPage(value)}
                                            />
                                        </Stack>
                                    </div>
                                :''
                            }

                        </div>
                    </div>
                </div>
            </div>




        </div>
    )
}
export  default Collections;