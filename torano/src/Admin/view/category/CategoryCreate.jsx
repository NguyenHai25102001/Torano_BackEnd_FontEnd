import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faX} from "@fortawesome/free-solid-svg-icons";
import React, {useState, useEffect} from "react";
import {createCategory} from "../../components/dataApi";
import Swal from "sweetalert2";

function CategoryCreate({onClose}) {

    const [name, setName] = useState('');

    const [file, setFile] = useState();

    const [showFile, setShowFile] = useState();

    const data = new FormData();
    data.append('name', name);
    data.append('image', file);
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFile(file);

            const reader = new FileReader();

            reader.onload = (e) => {
                // Use e.target.result to get the base64-encoded image data
                setShowFile(e.target.result);
            };

            reader.readAsDataURL(file);
        }

    };
    const handleCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await createCategory(data);
            console.log(response)
            if (response.status) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Tạo danh mục thành công",
                    showConfirmButton: false,
                    timer: 1500
                }).then(response => {
                    onClose();
                    window.location.reload();
                });

            } else {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: response.error,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log(error)
            if (!error.status) {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: error.error,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <div className="sidebar-main">
            <div className={"category-create rounded shadow bg-body p-3 is-opened "}>
                <form onSubmit={handleCategory}>
                    <div className="row">
                        <div className="col-md-12 my-2 fs-5 fw-bolder text-center text-primary">Thêm danh mục</div>
                        <div className="col-md-12">
                            <label className='form-label' htmlFor='namCategory'>Tên danh mục</label>
                            <input type="text" id='namCategory' className='form-control'
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="col-md-12">
                            <label className='form-label' htmlFor='imgCategory'>Chọn hình ảnh</label>

                            {
                                showFile ? <div className="w-100 position-relative add-img-category rounded"
                                                style={{
                                                    background: `url(${showFile})`,
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'
                                                }}>
                                    <div className="pt"></div>
                                    <div className="btn-close-c position-absolute text-danger"
                                         role={'button'} onClick={() => {
                                        setShowFile('');
                                        setFile()
                                    }}>
                                        <FontAwesomeIcon icon={faX}/></div>
                                </div> : <div className="w-100 position-relative">
                                    <label htmlFor="imgCategory" className='add-img-category rounded' role={'button'}>
                                        <div className="pt"></div>
                                        <div className="position-absolute " role={'button'}
                                             style={{
                                                 top: '50%',
                                                 left: '50%',
                                                 transform: 'translate(-50%,-50%)'
                                             }}>
                                            <span className='me-2'><FontAwesomeIcon icon={faPlus}/></span>
                                            <span>Select</span>
                                        </div>
                                    </label>
                                    <input type="file" className='d-none' id={'imgCategory'} accept="image/*"
                                           onChange={handleImageChange}/>
                                </div>

                            }

                        </div>
                        <div className="d-flex justify-content-center gap-3 mt-4">
                            <button type='reset' className='btn btn-danger' onClick={onClose}>Cancel</button>
                            <button className='btn btn-primary'>Send</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="sitenav-mask" onClick={onClose}></div>
        </div>
    )

}

export default CategoryCreate;