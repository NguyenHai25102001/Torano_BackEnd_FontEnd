import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {lisCategory} from "../components/test"
import {FormControl, MenuItem, Select,} from "@mui/material";
import ProductItem from "../components/ProductItem";
import ProductQuickView from "../components/ProductQuickView";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
function Collections() {
    const [filterOptions,setFilterOptions]=React.useState(true);
    const [listChild,setListChild]=React.useState('');
    const [arrange, setArrange] = React.useState(1);
    const [isOpen,setIsOpen]=React.useState(false)
    const handleIsOpen=()=>{
        setIsOpen(!isOpen)
    }
    const handleChange = (event) => {
        setArrange(event.target.value);
    };
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
                                            {lisCategory &&
                                                lisCategory.map((item, index) => (
                                                    <li key={index} className={'py-1 fw-semibold'}>
                                                        <div className="d-flex align-items-center"
                                                        role={'button'}
                                                        onClick={()=>listChild===item.name?setListChild(''):setListChild(item.name)}>
                                                            {item.name}
                                                            {
                                                                item.childCategory&&(<span className={'ms-1'+(listChild===item.name&&(' active-list-child'))}><FontAwesomeIcon icon={faChevronDown} size={'xs'} /></span>)
                                                            }
                                                        </div>
                                                        {
                                                            listChild===item.name&&(
                                                                <ul className={'list-child ms-4 mt-1'}>
                                                                    {item.childCategory && item.childCategory.map((item1, index1) => (
                                                                        <li key={index1} className={'py-1'}>{item1.name}</li>
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
                                    <div className="fw-bolder fs-4">Áo nam</div>
                                    <div className="ms-2 fs-6">
                                        <strong>26</strong> sản phẩm
                                    </div>
                                </div>
                                <div className="ms-auto d-flex align-items-center">
                                    <div className="d-inline-block me-4">Sắp xếp theo: </div>
                                    <div className="d-inline-block">
                                        <FormControl sx={{ m: 0, minWidth: 200 }}>
                                        <Select
                                            value={arrange}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >

                                            <MenuItem value={1}>Sản phẩm nổi bật</MenuItem>
                                            <MenuItem value={20}>Giá:Tăng dần</MenuItem>
                                            <MenuItem value={20}>Giá:Giảm dần</MenuItem>
                                            <MenuItem value={20}>Tên:A-Z</MenuItem>
                                            <MenuItem value={20}>Tên:Z-A</MenuItem>
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
                                    [...Array(16)].map((item,index)=>(
                                        <div className="col-lg-3 col-md-6 col-6 position-relative mb-4">
                                            <ProductItem handleIsOpen={handleIsOpen}/>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="d-flex justify-content-center">
                                <Stack spacing={2}>
                                    <Pagination count={10} color="standard" />
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductQuickView status={isOpen} handleIsOpen={handleIsOpen}/>



        </div>
    )
}
export  default Collections;