import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {FormControlLabel, FormHelperText, styled, Switch} from "@mui/material";
import {
    urlChangeProductStatus,
    urlDeleteProducts,
    urlListCategory,
    urlListChildCategory,
    urlListProducts,
    urlListSubcategory
} from "../../components/dataApi";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Swal from "sweetalert2";
import formatPrice from "../../../components/FormatPrice";
 const  ListProduct=()=> {

     const location = useLocation();
     const queryParams = new URLSearchParams(location.search);
     const searchValue = queryParams.get("search");

     const [search,setSearch]=useState('');

     const [categoryId,setCategoryId]=useState('');

     const [subcategoryId,setSubcategoryId]=useState('');

     const [listCategory,setListCategory]=useState([]);

     const [listSubcategory,setListSubcategory]=useState([]);

     const [childCategoryId,setChildCategoryId]=useState('');

     const [listChildCategory,setListChildCategory]=useState([]);

     const [listProducts,setListProducts]=useState([]);


     const [filter, setFilter] = React.useState('');

     const [page, setPage] = React.useState(1);

     const Authorization='Bearer '+sessionStorage.getItem('access_token')?.trim();

     const IOSSwitch = styled((props) => (
         <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
     ))(({ theme }) => ({
         width: 42,
         height: 26,
         padding: 0,
         '& .MuiSwitch-switchBase': {
             padding: 0,
             margin: 2,
             transitionDuration: '300ms',
             '&.Mui-checked': {
                 transform: 'translateX(16px)',
                 color: '#fff',
                 '& + .MuiSwitch-track': {
                     backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                     opacity: 1,
                     border: 0,
                 },
                 '&.Mui-disabled + .MuiSwitch-track': {
                     opacity: 0.5,
                 },
             },
             '&.Mui-focusVisible .MuiSwitch-thumb': {
                 color: '#33cf4d',
                 border: '6px solid #fff',
             },
             '&.Mui-disabled .MuiSwitch-thumb': {
                 color:
                     theme.palette.mode === 'light'
                         ? theme.palette.grey[100]
                         : theme.palette.grey[600],
             },
             '&.Mui-disabled + .MuiSwitch-track': {
                 opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
             },
         },
         '& .MuiSwitch-thumb': {
             boxSizing: 'border-box',
             width: 22,
             height: 22,
         },
         '& .MuiSwitch-track': {
             borderRadius: 26 / 2,
             backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
             opacity: 1,
             transition: theme.transitions.create(['background-color'], {
                 duration: 500,
             }),
         },
     }));

     useEffect(() => {
         setSearch(searchValue)
     }, [searchValue]);

     useEffect(() => {
        try {
            axios.get(urlListCategory(), {
                headers:{
                    Authorization:Authorization,
                }
            })
                .then(function (response) {
                    setListCategory(response.data?.categories)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }catch (e) {

        }

     }, []);

     useEffect(() => {
       setSubcategoryId('');
       setChildCategoryId('')
         const data={
             category_id:categoryId
         }
         axios.post(urlListSubcategory(),data, {
             headers:{
                 Authorization:Authorization,
             }
         })
             .then(function (response) {
                 //console.log(response.data?.data);
                 setListSubcategory(response.data?.data);
             })
             .catch(function (error) {
                 console.log(error);
             });

     }, [categoryId]);

     useEffect(() => {
         setListChildCategory([])
         const data={
             subId:subcategoryId
         }
       try {
             if(subcategoryId){
                 axios.post(urlListChildCategory(),data, {
                     headers:{
                         Authorization:Authorization,
                     }
                 })
                     .then(function (response) {
                         //console.log(response.data.data);
                         setListChildCategory(response.data?.data);
                     })
                     .catch(function (error) {
                         console.log(error);
                     });
             }


       }catch (e) {

       }

     }, [subcategoryId]);

     useEffect(() => {

         axios.get(urlListProducts(), {
             headers: {
                 Authorization: Authorization,
             },
             params: {
                 category:categoryId,
                 subcategory:subcategoryId,
                 childCategory:childCategoryId,
                 filter:filter,
                 page:page,

             }
         })
             .then(function (response) {

                 setListProducts(response.data?.data);

             })
             .catch(function (error) {
                 console.log(error);
             });
     }, [categoryId,childCategoryId,subcategoryId,filter,page]);


     const handleDeleteProduct = async (id, name) => {
         try {
             const result = await Swal.fire({
                 title: `<div class='fs-3'>Bạn có muốn xoá sản phẩm: ${name}</div>`,
                 text: "You won't be able to revert this!",
                 showCancelButton: true,
                 confirmButtonColor: "#3085d6",
                 cancelButtonColor: "#d33",
                 confirmButtonText: "Yes, delete it!",
             });

             if (result.isConfirmed) {
                 const response = await axios.delete(urlDeleteProducts(id), {
                     headers: {
                         Authorization: Authorization,
                     },
                 });

                 console.log(response.data);

                 if (response.data?.status) {
                     await Swal.fire({
                         title: "Deleted!",
                         text: "Your file has been deleted.",
                         icon: "success",
                         showConfirmButton: false,
                         timer: 1500,
                     });

                     const productsResponse = await axios.get(urlListProducts(), {
                         headers: {
                             Authorization: Authorization,
                         },
                     });

                     setListProducts(productsResponse.data?.data);
                 }
             }
         } catch (error) {
             console.error("Error deleting product:", error);

              Swal.fire({
                 title: "Error",
                 text: "An error occurred while deleting the product.",
                 icon: "error",
             });
         }
     };



     const hanleChangeProductStatus = (id) => {
         console.log(Authorization);

         try {
             axios.post(urlChangeProductStatus(id), null, {
                 headers: {
                     Authorization: Authorization
                 }
             }).then(response => {
                 console.log(response);
             }).catch(e => {
                 console.log(e.response.data);
             });
         } catch (e) {
             // Xử lý ngoại lệ nếu cần
         }
     };







     return (
        <div className='layout-list-product'>
            <h2>Danh sách sản phẩm</h2>

            <div className="row row-cols-1">

                <div className="col-md-2 mb-3">
                    <FormControl variant="standard" sx={{ m: 0, width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Danh mục</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={categoryId}
                            label="Age"
                            onChange={(e)=>setCategoryId(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {

                                    listCategory.map((category, idxCategory) => (
                                        <MenuItem value={category.id} key={idxCategory}>
                                            {category.name}
                                        </MenuItem>
                                    ))

                            }

                        </Select>
                    </FormControl>
                </div>

                <div className="col-md-2 mb-3">
                    <FormControl variant="standard" sx={{ m: 0, width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Danh mục con</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={subcategoryId}
                            label="Age"
                            onChange={(e)=>setSubcategoryId(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                listSubcategory?.map((subcategory, idxSubcategory) => (
                                    <MenuItem value={subcategory.id} key={subcategory.id}>
                                        {subcategory.name}
                                    </MenuItem>
                                ))
                            }


                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-2 mb-3">
                    <FormControl variant="standard" sx={{ m: 0, width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Danh mục</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={childCategoryId}
                            label="Age"
                            onChange={(e)=>setChildCategoryId(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                listChildCategory?.map((childCategory,idxChildCategory)=>(
                                    <MenuItem value={childCategory.id} key={childCategory.id}>
                                        {childCategory.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
               <div className="col-md-6 ms-auto d-flex justify-content-end align-items-center">Sắp xếp theo:
                   <FormControl sx={{ m: 1, minWidth: 120 }}>
                       <Select
                           value={filter}
                           onChange={(e)=>setFilter(e.target.value)}
                           displayEmpty
                           inputProps={{ 'aria-label': 'Without label' }}
                       >
                           <MenuItem value="">
                               <em>None</em>
                           </MenuItem>
                           <MenuItem value={'priceAsc'}>Giá:Tăng dần</MenuItem>
                           <MenuItem value={'priceDesc'}>Giá:Giảm dần</MenuItem>
                           <MenuItem value={'nameAsc'}>Tên:A-Z</MenuItem>
                           <MenuItem value={'nameDesc'}>Tên:Z-A</MenuItem>
                       </Select>

                   </FormControl></div>
            </div>
            <div className="col-md-12 list-product">
                <table className=" table table-striped ">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Mã sản phẩm</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope={'col'}>Sale</th>
                        <th scope="col">Số lượng còn</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        listProducts?.data?.map((product,idxProduct)=>(
                            <tr key={product.id}>
                                <th scope="row">{idxProduct+1}</th>
                                <td>{product.code}</td>
                                <td>{product.name}</td>
                                <td>{formatPrice(product?.price || 0)}</td>
                                <td>{product.discount*100}</td>
                                <td>{product.total_quantity}</td>
                                <td>
                                    <FormControlLabel
                                        control={
                                            <IOSSwitch sx={{ m: 1 }}
                                                       defaultChecked={product.status === 1}

                                            />
                                        }
                                        onClick={()=>hanleChangeProductStatus(product.id)}
                                        label=""
                                    />

                                </td>
                                <td className='text-center'>
                                    <button type={'button'} className='me-2'>
                                       <Link to={'/admin/product/'+product.id}>
                                           <FontAwesomeIcon icon={faPenToSquare} style={{color: "#ffd43b",}} size={'2xl'} />
                                       </Link>
                                    </button>
                                    <button type={'button'}
                                            onClick={()=>handleDeleteProduct(product.id,product.name)}
                                    >

                                        <FontAwesomeIcon icon={faTrash} size="2xl" style={{color: "#f00000",}} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }


                    </tbody>
                </table>
                <div className="d-flex justify-content-end mt-3">
                    {
                        listProducts?.last_page>1 && (
                            <Stack spacing={2} >

                                <Pagination  count={listProducts?.last_page}
                                             page={page}
                                             onChange={(event, value) => setPage(value)}/>
                            </Stack>
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default ListProduct;