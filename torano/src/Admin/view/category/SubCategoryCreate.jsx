import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useState,useEffect} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function SubCategoryCreate({onClose}) {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return(
        <div className="sidebar-main">
            <div className={"category-create rounded shadow bg-body p-3 is-opened "}>
                <form>
                    <div className="row">
                        <div className="col-md-12 my-2 fs-5 fw-bolder text-center text-primary">Thêm danh mục con</div>
                        <div className="col-md-6">
                            <label className='form-label' htmlFor='selectCategory'>Chọn danh mục </label>

                            <FormControl sx={{ m: 0, minWidth: '100%' }} size="small">
                                <InputLabel id="demo-select-small-label">Chọn danh mục</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="selectCategory"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>

                        </div>
                        <div className="col-md-6">
                            <label className='form-label' htmlFor='namCategory'>Tên danh mục </label>
                            <input type="text" id='namCategory' className='form-control'/>
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
export default SubCategoryCreate;