import React,{useState,useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
function Create() {
    const [name,setName]=useState('')
    const [code,setCode]=useState('')
    const [description,setDescription]=useState('')
    const [price,setPrice]=useState('')
    const [colorsSizes,setColorSizes]=useState([
        {  color:'',sizes:[{ name: 'S', quantity: 1 },{ name: 'M', quantity: 1 },
                { name: 'L', quantity: 1 },{ name: 'XL', quantity: 1 },]}
    ])

    //Thêm form nhập màu
    const handleAddColor = () => {
            setColorSizes([...colorsSizes,{  color:'',sizes:['S','M','L','XL']}])
    }
    //end add color


    //Delete color
    const handleDeleteColor = (colorIndex) => {
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
            newData[colorIndex].sizes.push({name: '',quantity: 0});
            return newData;
        })
    }
    //end add size
    const handleChangeColor = (colorIndex,color) => {
      setColorSizes((prevState)=>{
          const newData=[...prevState];
          newData[colorIndex].color=color;
          return newData
      })
    }
    const handleChangeSize = (colorIndex,sizeIndex,newsize) => {
        setColorSizes((prevState)=>{
            const newData=[...prevState];
            newData[colorIndex].sizes[sizeIndex]=newsize;
            return newData
        })
    }
    // Delete Size
    const handleDeleteSize = (colorIndex,sizeIndex,color) => {
        setColorSizes((prevState)=>{
            const newData=[...prevState];
            if( newData[colorIndex].sizes.length>1){
                newData[colorIndex].sizes.splice(sizeIndex,1);
            }else {

                    Swal.fire({
                        position: "top",
                        icon: "warning",
                        title: `<div class="fs-5 alert alert-danger">Color: ${' '+color+' '} phải có ít nhất 1 size</div>`,
                        showConfirmButton: false,
                        timer: 2000
                    });
            }
            return newData;
        })
      
    }
    //End Delete Size
    // send data in Api
    const handleSubmit = (e) => {
        e.preventDefault();
    }

return (
    <div className='admin-pro-cre'>
        <h2 className='fw-bolder fs-4'>Thêm sản phẩm</h2>
        <div className="mt-3">
           <form method='post' encType={'multipart'} onSubmit={handleSubmit}>
               <div className="row row-cols-1">
                   <div className="col-md-7 d-flex flex-wrap">
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
                           value={code} onChange={(e)=>e.target.value}/>
                       </div>
                       <div className="col-md-6 mb-3">
                           <label className='form-label' htmlFor='namePro'>Mô tả sản phẩm</label>
                           <input id='description' name='description'  className='form-control'
                           value={description} onChange={(e)=>setDescription(e.target.value)}/>
                       </div>
                       <div className="col-md-6 mb-3">
                           <label className='form-label' htmlFor='namePro'>Giá tả sản phẩm</label>
                           <input  id='price' name='price'  className='form-control' value={price}
                           onChange={(e)=>setPrice(e.target.value)}/>
                       </div>

                           <div className="d-flex col-md-12 align-items-center mb-3">
                               <h1 className="fs-6 fw-bolder">Thêm màu sắc</h1>
                               <div className="btn btn-primary ms-auto" onClick={handleAddColor}>Thêm màu sắc</div>
                           </div>
                       {
                           colorsSizes.map((item,idx)=>(
                             <div className='col-md-6 mb-3' key={idx}>
                              <div className="d-flex align-items-center mb-2">
                                  <label className='form-label m-0' htmlFor={'color'+idx}>Color: <span className='fw-bolder fs-6 text-primary'>{item.color}</span></label>
                                  <div className={"ms-auto " +(colorsSizes.length>1?'':'d-none')} role={'button'} onClick={()=>handleDeleteColor(idx)}><FontAwesomeIcon icon={faTrash} style={{color: "#fb0404",}} /></div>
                              </div>
                                 <input className='form-control mb-2' id={'color'+idx} value={item.color} onChange={(e)=>handleChangeColor(idx,e.target.value)}/>
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
                                         <div className={"ms-auto " +(item.sizes?.length>1?'':'d-none')} role={'button'} onClick={()=>handleDeleteSize(idx,idxSize,item.color)}><FontAwesomeIcon icon={faXmark} size="xl" style={{color: "#f31212",}} /></div>
                                     </div>
                                 ))}

                             </div>
                           ))
                       }
                   </div>
                   <div className="col-md-5">
                       <label className='form-label'>Chọn hình ảnh</label>
                       <div className="bg-danger p-2 w-50 m-auto">

                       </div>
                   </div>
               </div>
               <div className="d-flex justify-content-center gap-2">
                   <button type={'reset'} className='btn btn-outline-danger'>Rest</button>
                   <button type={'submit'} className='btn btn-outline-primary'>Send</button>

               </div>

           </form>

        </div>

    </div>
)
}
export default Create;