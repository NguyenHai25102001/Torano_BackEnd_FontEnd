import React, {useState,useEffect} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {createChildCategory, listSubcategory} from "../../components/dataApi";
import Swal from "sweetalert2";
function ChildCategoryCreate({onClose,listCategory,categoryId,subId}) {
    const [listSub,setListSub]=useState('');


    const [name, setName] = useState('');


    const [cId,setCId]=useState('');


    const [sId,setSId]=useState('');


    useEffect(()=>{
        if (categoryId) {
            setCId(categoryId);
        }
    },[categoryId])


    useEffect(()=>{
        if (subId) {
           setSId(subId);
        }
    },[subId])



    useEffect(() => {
        const dataSubCategory={
            category_id:cId,
        }
        listSubcategory(dataSubCategory).then(response => {
            setListSub(response);
        }).catch(error => {
            console.error(error);
        });
    }, [cId]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const data={
            sub_category_id:sId,
            name:name
        }
        try {
            const response=await createChildCategory(data)
            console.log(response)
            if(response.data){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title:"Thêm Child Category thành công",
                    showConfirmButton: false,
                    timer: 1500
                }).then(response=>{
                    //window.location.reload()
                    setName('');
                    window.location.reload();
                });
            }else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title:"",
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
                    errorMessage += e.error[key][0]
                }
            }
            Swal.fire({
                position: "top",
                icon: "error",
                title:errorMessage,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }



    return(
        <div className="sidebar-main">
            <div className={"category-create rounded shadow bg-body p-3 is-opened "}>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12 my-2 fs-5 fw-bolder text-center text-primary">Thêm danh mục con</div>
                        <div className="col-md-12">

                            <FormControl sx={{ m: 0, minWidth: '100%' }} size="small">
                                <InputLabel id="demo-select-small-label">Chọn danh mục</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="selectCategory"
                                    value={cId}
                                    label="Age"
                                    onChange={(e)=>setCId(e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        listCategory?.map((category,idxCategory)=>(
                                            <MenuItem key={idxCategory} value={category.id}>{category.name}</MenuItem>
                                        ))

                                    }


                                </Select>
                            </FormControl>

                        </div>

                        <div className="col-md-12 mt-3">

                            <FormControl sx={{ m: 0, minWidth: '100%' }} size="small">
                                <InputLabel id="demo-select-small-label">Chọn danh mục Sub</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="selectCategory"
                                    value={sId}
                                    label="Age"
                                    onChange={(e)=>setSId(e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        listSub?.data?.map((sub,idxSub)=>(
                                            <MenuItem key={idxSub} value={sub.id}>{sub.name}</MenuItem>

                                        ))
                                    }

                                </Select>
                            </FormControl>

                        </div>
                        <div className="col-md-12">
                            <label className='form-label' htmlFor='namCategory'>Tên danh mục </label>
                            <input type="text" id='namCategory' className='form-control' value={name} onChange={(e)=>setName(e.target.value)}/>
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
export default ChildCategoryCreate;