import React, {useState,useEffect} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {createSubcategory, editSubcategory} from "../../components/dataApi";
import Swal from "sweetalert2";
function EditSubCategory({onClose,listCategories,categoryId,subId,subName}) {


    const [cId, setCId] = React.useState('');


    const [sId, setSId] = React.useState('');

    const [name,setName]=useState('');


    useEffect(() => {
        if (categoryId) {
            setCId(categoryId);
        }
    }, [categoryId]);

    useEffect(() => {
        if (subName) {
            setName(subName)
        }
    }, [subName]);

    useEffect(() => {
        if (subId) {
           setSId(subId)
        }
    }, [subId]);



    const handleSubCreate=async (e)=>{
        e.preventDefault();
        try {
            const data={
                name:name,
                category_id:cId
            }
            const response=await editSubcategory(sId,data);
            console.log(response)
            if (response.status){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thêm Subcategory thành công ",
                    showConfirmButton: false,
                    timer: 1500
                }).then(response=>{
                     setName('')
                    window.location.reload();
                });
            }else {
                let errorMessage = "";

                for (const key in response.error) {
                    if (response.error.hasOwnProperty(key) && Array.isArray(response.error[key]) && response.error[key].length > 0) {
                        // Concatenate the first error message for each property
                        errorMessage += response.error[key][0]
                    }
                }
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title:errorMessage,
                    showConfirmButton: false,
                    timer: 1500
                });
            }


        }catch (e) {
            console.log(e)
            let errorMessage = "";

            for (const key in e.error) {
                if (e.error.hasOwnProperty(key) && Array.isArray(e.error[key]) && e.error[key].length > 0) {
                    // Concatenate the first error message for each property
                    errorMessage = e.error[key][0]
                }
            }

            if (!e.status){
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title:errorMessage,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }

    return(
        <div className="sidebar-main">
            <div className={"category-create rounded shadow bg-body p-3 is-opened "}>
                <form onSubmit={handleSubCreate}>
                    <div className="row">
                        <div className="col-md-12 my-2 fs-5 fw-bolder text-center text-primary">Thêm danh mục con</div>
                        <div className="col-md-12 pe-none">
                            <label className='form-label' htmlFor='selectCategory'>Chọn danh mục </label>

                            <FormControl sx={{ m: 0, minWidth: '100%' }} size="small">
                                <InputLabel id="demo-select-small-label">Chọn danh mục</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="selectCategory"
                                    value={cId}
                                    label="Age"
                                    onChange={(e)=>setCId(e.target.value)}
                                    checked={cId.id === categoryId}

                                >
                                    {
                                        listCategories.map((category,idxCategory)=>(
                                            <MenuItem value={category.id}
                                                      key={idxCategory}

                                            >{category.name}</MenuItem>
                                        ))

                                    }

                                </Select>
                            </FormControl>

                        </div>
                        <div className="col-md-12">
                            <label className='form-label' htmlFor='namCategory'>Tên danh mục Sub </label>
                            <input type="text" id='namCategory' value={name}
                                   className='form-control'
                            onChange={(e)=>setName(e.target.value)}/>
                        </div>

                        <div className="d-flex justify-content-center gap-3 mt-3">
                            <button type='reset' className='btn btn-danger' onClick={onClose}>Cancel</button>
                            <button className='btn btn-primary' >Send</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="sitenav-mask" onClick={onClose}></div>
        </div>
    )

}
export default EditSubCategory;