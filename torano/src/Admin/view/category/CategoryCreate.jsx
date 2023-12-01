import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useState,useEffect} from "react";

function CategoryCreate({onClose}) {


    return(
        <div className="sidebar-main">
            <div className={"category-create rounded shadow bg-body p-3 is-opened "}>
                <form>
                    <div className="row">
                        <div className="col-md-12 my-2 fs-5 fw-bolder text-center text-primary">Thêm danh mục</div>
                        <div className="col-md-6">
                            <label className='form-label' htmlFor='namCategory'>Tên danh mục</label>
                            <input type="text" id='namCategory' className='form-control'/>
                        </div>
                        <div className="col-md-6">
                            <label className='form-label' htmlFor='imgCategory'>Chọn hình ảnh</label>
                            <div className="w-100 position-relative">
                                <label htmlFor="imgCategory" className='add-img-category rounded' role={'button'} >
                                    <div className="pt"></div>
                                    <div className="position-absolute " role={'button'}
                                         style={{
                                             top:'50%',
                                             left:'50%',
                                             transform:'translate(-50%,-50%)'
                                         }}>
                                        <span className='me-2'><FontAwesomeIcon icon={faPlus} /></span>
                                        <span>Select</span>
                                    </div>
                                </label>
                                <input type="file" className='d-none' id={'imgCategory'}  accept="image/*"/>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center gap-3">
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
export default CategoryCreate;