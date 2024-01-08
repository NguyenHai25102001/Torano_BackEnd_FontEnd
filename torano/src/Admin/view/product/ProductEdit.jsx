import React,{useState,useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { v4 as uuidv4 } from 'uuid';
import {
    apiUrl,
    createProduct, ImageUrl,
    listCategory,
    listChildCategory,
    listSubcategory,
    productDetails, updateProduct
} from "../../components/dataApi";
import { useParams } from 'react-router-dom';
import axios from "axios";

function ProductEdit() {

    const [name,setName]=useState('')

    const [code,setCode]=useState('')

    const [description,setDescription]=useState('')

    const [price,setPrice]=useState('')

    const [title,setTitle]=useState('')


    const [files,setFiles]=useState([]);

    const [discount, setDiscount] = useState('')

    const [showFiles,setShowFiles]=useState([]);

    const [deleteAllFile,setDeleteAllFile]=useState([])

    const [deleteColor,setDeleteColor]=useState([])

    const [deleteSize,setDeleteSize]=useState([])

    const[fileAdd,setFileAdd]=useState([]);


    const[productDetails,setProductDetails]=useState('');


    const {id}=useParams();

    const [productId, setProductId] = useState();

    const Authorization='Bearer '+sessionStorage.getItem('access_token')?.trim();


    useEffect(() => {
        setProductId(id)
    }, []);

    const [colorsSizes,setColorSizes]=useState([]);
    /*{  color:'',sizes:[{ name: 'S', quantity: 1 },{ name: 'M', quantity: 1 },
        { name: 'L', quantity: 1 },{ name: 'XL', quantity: 1 },]}*/

    const generateUniqueId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };


    //Thêm form nhập màu
    const handleAddColor = () => {
        setColorSizes((prevState) => {
            const newData = [...prevState, { id: uuidv4(), name: '', sizes: [{ id: uuidv4(),name: 'S', quantity: 1 }, {id: uuidv4(), name: 'M', quantity: 1 }, {id: uuidv4(), name: 'L', quantity: 1 }, {id: uuidv4(), name: 'XL', quantity: 1 }] }];
            return newData;
        });
    }

    //end add color


    //Delete color
    const handleDeleteColor = (colorIndex,colorId) => {
        setDeleteColor((prevState)=>{
            const newData=[...prevState,colorId]
            return newData;
        })


      setColorSizes((prevState)=>{
          const newData=[...prevState];
          if(newData.length>1){
              newData.splice(colorIndex,1);

          }else {

              Swal.fire({
                  position: "top",
                  icon: "warning",
                  title: `<div class="fs-5 alert alert-danger">Sản phẩm phải có ít nhất 1 color</div>`,
                  showConfirmButton: false,
                  timer: 2000
              });
          }
          return newData;
      })

    }
    //End Delete Color

    //Add size
    const handleAddSize=(colorIndex)=>{
        setColorSizes((prevData)=>{
            const newData=[...prevData];
            newData[colorIndex].sizes.push({id:  uuidv4(),name: '',quantity: 1,color_id:'',product_id:''});
            return newData;
        })
    }
    //end add size
    const handleChangeColor = (colorIndex,color) => {
      setColorSizes((prevState)=>{
          const newData=[...prevState];
          newData[colorIndex].name=color;
          return newData
      })
    }
    const handleChangeSize = (colorIndex,sizeIndex,newSize) => {
        setColorSizes((prevState)=>{
            const newData=[...prevState];
            newData[colorIndex].sizes[sizeIndex]=newSize;
            return newData
        })
    }
    // Delete Size
    const handleDeleteSize = (colorIndex, sizeId, color) => {
        setDeleteSize((prevState)=>{
            const newData=[...prevState,sizeId]
            return newData;
        })


        setColorSizes((prevState) => {

            const newData = [...prevState];

            const colorData = newData[colorIndex];

            const updatedSizes = colorData.sizes.filter((size) => size.id !== sizeId);

            if (updatedSizes.length >= 1) {
                newData[colorIndex] = { ...colorData, sizes: updatedSizes };
            } else {
                Swal.fire({
                    position: "top",
                    icon: "warning",
                    title: `<div class="fs-5 alert alert-danger">Color: ${' ' + color + ' '} phải có ít nhất 1 size</div>`,
                    showConfirmButton: false,
                    timer: 2000
                });
            }

            return newData;
        });
    };

    //End Delete Size
    // send data in Api


    useEffect(()=>{
       // setShowFiles([])

            fileAdd.forEach((file)=>{
                if(file){
                    const reader=new FileReader();
                    reader.onload=(e)=>{
                        setShowFiles((prevState)=>{
                            const newData=[...prevState,{id:file.id,path:e.target.result}];
                            return newData
                        });
                    }
                    reader.readAsDataURL(file.file)
                }
            })
    },[fileAdd])

    const handleDeleteFile = (idxFile,id) => {
        setShowFiles((prevShowFiles) => {
            const newShowFiles = [...prevShowFiles];
            newShowFiles.splice(idxFile, 1);
            return newShowFiles;
        })

        setFiles((prevState) => {
            const newData = prevState.filter((file) => file.id !== id);
            return newData;
        });
        setDeleteAllFile((prevState)=>{
            const newData=[...prevState,id];
            return newData;
        })


    };

    const handleDeleteAll = () => {
        setDeleteAllFile((prevState) => {
            const newData = [...prevState, ...showFiles.map((file) => file.id)];
            return newData;
        });
        setFiles([]);
        setShowFiles([]);
    };


    useEffect(() => {
        fileAdd.forEach((file)=>{
            if(file){
                setFiles((prevState)=>{
                    const newData =[...prevState];
                    newData.push({id:file.id,file:file.file})
                    return newData;
                })
            }
        })
        setFileAdd([]);
    }, [fileAdd]);

    useEffect(() => {
       if(productId>0){
        try {
            axios.get(apiUrl + `admin/product/${productId}`,{
                headers:{
                    Authorization:Authorization
                }
            })
                .then(function (response) {
                    setProductDetails(response.data.data)
                    setName(response.data.data.name);
                    setCode(response.data.data.code);
                    setDescription(response.data.data.description);
                    setPrice(response.data.data.price);
                    setTitle(response.data.data.title);
                    setDiscount(response.data.data.discount*100);

                    if (response.data && response.data.data && response.data.data.images) {
                        setShowFiles((prevState) => {
                            const newData = [...prevState, ...response.data.data.images];
                            return newData;
                        });
                    } else {
                        console.log('Cấu trúc dữ liệu không hợp lệ trong phản hồi API.');
                    }

                    if (response.data && response.data.data && response.data.data.colors ) {
                        setColorSizes((prevState)=>{
                            const newData=[...prevState,...response.data.data.colors];

                            return newData;
                        })
                    } else {
                        console.log('Không có color và size');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }catch (e) {

        }
       }
    }, [productId]);


    const handleSubmit =async (e) => {
        e.preventDefault();
        if (showFiles.length === 0) {
            Swal.fire({
                position: "top",
                icon: "warning",
                title: "Ảnh sản phẩm là bắt buộc.",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }


        const data=new FormData();
        data.append('name',name);
        data.append('code',code);
        data.append('description',description);
        data.append('price',price);
        data.append('discount',discount);
        data.append('title',title);

        for (let i = 0; i < files.length; i++) {
            data.append(`files[${i}]`, files[i].file);
        }
        for (let i = 0; i < deleteColor.length; i++) {
            data.append(`deleteColor[${i}]`, deleteColor[i]);
        }
        for (let i = 0; i < deleteSize.length; i++) {
            data.append(`deleteSize[${i}]`, deleteSize[i]);
        }
        for (let i = 0; i < deleteAllFile.length; i++) {
            data.append(`deleteImage[${i}]`, deleteAllFile[i]);
        }

        colorsSizes.forEach((color,indexColor)=>{
            data.append(`colors[${indexColor}][id]`,color.id);
            data.append(`colors[${indexColor}][name]`,color.name);
            color.sizes.forEach((size,idxSize)=>{
                data.append(`colors[${indexColor}][sizes][${idxSize}][id]`, size.id);
                data.append(`colors[${indexColor}][sizes][${idxSize}][name]`, size.name);
                data.append(`colors[${indexColor}][sizes][${idxSize}][quantity]`, size.quantity);
            })

        })


        try {
            // Make a POST request to update the product
            axios.post(updateProduct(productId), data, {
                headers: {
                    Authorization: Authorization
                }
            }).then(function (response) {
                console.log(response.data);
                if(response.data.status){
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title:'Update sản phẩm thành công',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            }).catch(function (error) {
                console.log(error.response.data)
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title:error.response.data.error,
                    showConfirmButton: false,
                    timer: 2000
                });

            });
        } catch (e) {
            console.log("Unexpected error:", e);
        }


    }
    const handlePriceChange = (e) => {
        const inputValue = e.target.value;

        // Loại bỏ tất cả các ký tự không phải là chữ số hoặc dấu chấm
        const sanitizedValue = inputValue.replace(/[^\d.]/g, '');

        // Chỉ giữ lại một dấu chấm
        const formattedValue = sanitizedValue.replace(/(\..*)\./g, '$1');

        // Định dạng giá trị để hiển thị theo đúng định dạng số
        const numericValue = parseFloat(formattedValue);

        // Kiểm tra xem giá trị có là một số hợp lệ không
        if (!isNaN(numericValue)) {
            setPrice(numericValue);
        } else {
            setPrice('');
        }
    };




return (
    <div className='admin-pro-cre'>
        <h2 className='fw-bolder fs-4'>Thêm sản phẩm</h2>
        <div className="mt-3">
           <form method='post' encType={'multipart'} onSubmit={handleSubmit}>
               <div className="row row-cols-1">

                   <div className="col-md-7 d-flex flex-wrap">
                       <div className="col-md-4 mb-3">
                           <FormControl variant="standard" sx={{ m: 0, width: '100%' }}>
                               <InputLabel id="demo-simple-select-standard-label">Danh mục</InputLabel>
                               <Select
                                   labelId="demo-simple-select-standard-label"
                                   id="demo-simple-select-standard"
                                   value={1}
                                   label="Age"
                               >
                                   <MenuItem value={1}>
                                       <em>{productDetails?.category?.name}</em>
                                   </MenuItem>
                               </Select>
                           </FormControl>
                       </div>

                       <div className="col-md-4 mb-3">
                           <FormControl variant="standard" sx={{ m: 0, width: '100%' }}>
                               <InputLabel id="demo-simple-select-standard-label">Danh mục con</InputLabel>
                               <Select
                                   labelId="demo-simple-select-standard-label"
                                   id="demo-simple-select-standard"
                                   value={1}
                                   label="Age"
                               >
                                   <MenuItem value={1}>
                                       <em>{productDetails?.sub_category?.name}</em>
                                   </MenuItem>
                               </Select>
                           </FormControl>
                       </div>
                       <div className="col-md-4 mb-3">
                           <FormControl variant="standard" sx={{ m: 0, width: '100%' }}>
                               <InputLabel id="demo-simple-select-standard-label">Danh mục cháu</InputLabel>
                               <Select
                                   labelId="demo-simple-select-standard-label"
                                   id="demo-simple-select-standard"
                                   value={1} // Set giá trị mặc định thành null
                                   label="Age"
                               >
                                   <MenuItem value={1}> {/* Sử dụng giá trị null cho mục chọn mặc định */}
                                       <em>{productDetails?.child_category?.name}</em>
                                   </MenuItem>
                                   {/* Các mục cháu khác có thể được thêm vào đây */}
                               </Select>
                           </FormControl>
                       </div>





                       <div className="col-md-6 mb-3">
                              <label className='form-label' htmlFor='namePro'>Tên sản phẩm</label>
                              <input id='namePro' name='name'  className='form-control'
                                     value={name}
                                     onChange={(e)=>setName(e.target.value)}
                              />
                          </div>
                       <div className="col-md-6 mb-3">
                           <label className='form-label' htmlFor='namePro'>Mã sản phẩm</label>
                           <input id='code' name='code'  className='form-control'
                           value={code} onChange={(e)=>setCode(e.target.value)}/>
                       </div>
                       <div className="col-md-6 mb-3">
                           <label className='form-label' htmlFor='namePro'>Mô tả sản phẩm</label>
                           <input id='description' name='description'  className='form-control'
                           value={description} onChange={(e)=>setDescription(e.target.value)}/>
                       </div>


                       <div className="col-md-6 mb-3">
                           <label className='form-label' htmlFor='namePro'>Tiêu đề</label>
                           <input  id='price' name='price'  className='form-control' value={title}
                                   onChange={(e)=>setTitle(e.target.value)}/>
                       </div>
                       <div className="col-md-6 mb-3">
                       <label className='form-label' htmlFor='namePro'>Giá  sản phẩm</label>
                       <input type='text'  id='price' name='price'  className='form-control'
                              value={price === '' ? '' : price.toLocaleString('en-US')}
                              onChange={handlePriceChange}/>
                   </div>
                       <div className="col-md-6 mb-3">
                           <label className='form-label' htmlFor='discount'>Sale</label>

                           <input type={'number'}  id='discount' name='discount'  className='form-control' value={discount}
                                  placeholder={'Đơn vị %'} onChange={(e)=>setDiscount(e.target.value)}/>
                       </div>
                           <div className="d-flex col-md-12 align-items-center mb-3">
                               <h1 className="fs-6 fw-bolder">Thêm màu sắc</h1>
                               <div className="btn btn-primary ms-auto" onClick={handleAddColor}>Thêm màu sắc</div>
                           </div>
                       {
                           colorsSizes.map((item,idx)=>(
                             <div className='col-md-6 mb-3' key={idx}>
                              <div className="d-flex align-items-center mb-2">
                                  <label className='form-label m-0' htmlFor={'color'+idx}>Color: <span className='fw-bolder fs-6 text-primary'>{item.name}</span></label>
                                  <div className={"ms-auto " +(colorsSizes.length>1?'':'d-none')} role={'button'} onClick={()=>handleDeleteColor(idx,item.id)}><FontAwesomeIcon icon={faTrash} style={{color: "#fb0404",}} /></div>
                              </div>
                                 <input className='form-control mb-2' id={'color'+idx} value={item.name} onChange={(e)=>handleChangeColor(idx,e.target.value)}/>
                                  <div className="d-flex mb-2 align-items-center" >
                                      <label className='form-label m-0'>Nhập size</label>
                                      <div className="ms-auto bg-secondary text-white btn" role={'button'} onClick={()=>handleAddSize(idx)}><FontAwesomeIcon icon={faPlus} /><span>Thêm size</span> </div>
                                  </div>

                                 {item.sizes?.map((size,idxSize)=>(
                                     <div className="d-flex gap-2 mb-2 align-items-center" key={idxSize}>
                                         <input type="text"
                                                id={'size'+idx+idxSize}
                                                name={'size'+idx+idxSize}
                                                className='form-control'
                                                placeholder='Nhập size' value={size.name}
                                                onChange={(e) => handleChangeSize(idx, idxSize, { ...size, name: e.target.value })}/>
                                         <input type="number" name='' className='form-control' placeholder='Số lượng'
                                                value={size.quantity}
                                                onChange={(e) => handleChangeSize(idx, idxSize, { ...size, quantity: e.target.value })}/>
                                         <div className={"ms-auto " +(item.sizes?.length>1?'':'d-none')} role={'button'} onClick={()=>handleDeleteSize(idx,size.id,item.color)}><FontAwesomeIcon icon={faXmark} size="xl" style={{color: "#f31212",}} /></div>
                                     </div>
                                 ))}

                             </div>
                           ))
                       }
                   </div>
                   <div className="col-md-5">
                    <div className="d-flex justify-content-between align-items-center px-2">
                        <label className='form-label'  htmlFor={'image'}>Chọn hình ảnh</label>
                        {showFiles.length>0&& <div className='btn btn-danger' onClick={handleDeleteAll}>Xoá hết</div>}
                    </div>
                       <div className="p-2 w-100 m-auto">
                           {
                               showFiles.length > 0 ? (
                                   <div className="show-files flex-wrap">
                                       {showFiles.map((showFile, index) => (
                                           <div className=' show-file p-1'  key={index}>
                                               <div className='w-100 rounded  position-relative'
                                                    style={{
                                                    }}>
                                                   <img src={(showFile.id>0?ImageUrl:'')+showFile.path} alt="" className='position-absolute w-100 h-100 rounded object-fit-cover'
                                                   style={{
                                                       top:'0'
                                                   }}/>
                                                   <div className="pt"></div>
                                                   <div className='show-file-delete p-2 d-flex align-items-center justify-content-center'
                                                        role={'button'}
                                                        onClick={()=>handleDeleteFile(index,showFile.id)}
                                                   >
                                                               <FontAwesomeIcon icon={faTrash} size="xl" style={{color: "white",}} />
                                                   </div>
                                               </div>

                                           </div>
                                       ))}

                                       <div className=' show-file p-1'>
                                           <input type="file" multiple accept={'image/*'} id={'addFile'} className='d-none'
                                                  onChange={(e) => {
                                                      const filesArray = Array.from(e.target.files).map((file) => ({
                                                          id: generateUniqueId(),
                                                          file: file
                                                      }));
                                                      setFileAdd(filesArray);
                                                  }}/>
                                         <label htmlFor={'addFile'} className='w-100' role={'button'}>
                                             <div className=' w-100 rounded border opacity-75 position-relative'
                                                  style={{
                                                      background: '#F4DFC8',
                                                      backgroundSize:'cover',
                                                      border: '1px dashed black',
                                                  }}>
                                                 <div className="file-add"><FontAwesomeIcon icon={faPlus} className='pe-1' />Thêm</div>
                                                 <div className="pt"></div>
                                             </div>
                                         </label>
                                       </div>
                                   </div>
                               ) : (
                                   <>
                                       <input
                                           type="file"
                                           accept={'image/*'}
                                           className='d-none'
                                           multiple
                                           id='image'
                                           onChange={(e) => {
                                               const filesArray = Array.from(e.target.files).map((file) => ({
                                                   id: generateUniqueId(),
                                                   file: file
                                               }));
                                               setFileAdd(filesArray);
                                           }}/>
                                       <label className='w-100' htmlFor={'image'}>
                                           <div className="cre_product_img">
                                               <div className="pt"></div>
                                               <div className="btn-select btn rounded">
                                                   Select
                                               </div>
                                           </div>
                                       </label>
                                   </>
                               )
                           }


                       </div>

                   </div>
               </div>
               <div className="d-flex justify-content-center gap-2">
                   <button type={'reset'} className='btn btn-outline-danger'
                   onClick={()=>{window.history.back()}}>Quay lại</button>
                   <button type={'submit'} className='btn btn-outline-primary'>Save</button>
               </div>

           </form>


        </div>

    </div>
)
}
export default ProductEdit;