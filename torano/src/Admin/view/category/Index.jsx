import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CategoryCreate from "./CategoryCreate";
import SubCategoryCreate from "./SubCategoryCreate";
import ChildCategoryCreate from "./ChildCategoryCreate";
import {
    listCategory,
    ImageUrl,
    deleteCategory,
    listSubcategory,
    deleteSubcategory,
    listChildCategory, deleteChildCategory
} from "../../components/dataApi";
import Swal from "sweetalert2";
import EditCategory from "./EditCategory";
import EditSubCategory from "./EditSubCategory";
import EditChildCategory from "./EditChildCategory";

function Index() {
    const [categoryCreate, setCategoryCreate] = useState(false);

    const [subCategoryCreate, setSubCategoryCreate] = useState(false);

    const [subId, setSubId] = useState('');

    const [subName, setSubName] = useState('');

    const [childName, setChildName] = useState('');

    const [childId, setChildId] = useState('');


    const [childCategoryCreate, setChildCategoryCreate] = useState(false);

    const [listCategories, setListCategories] = useState([]);

    const [categoryId, setCategoryId] = useState('');

    const [listChild, setListChild] = useState([])

    const [listSub, setListSub] = useState([]);

    const [categoryImage, setCategoryImage] = useState('')

    /*Edit category*/

    const [isOpenEditCategory, setIsOpenEditCategory] = useState(false);

    const [isOpenEditSubCategory, setIsOpenEditSubcategory] = useState(false);

    const [isOpenEditChildCategory, setIsOpenEditChildCategory] = useState(false);

    const [nameCategory, setNameCategory] = useState('')
    /* End edit category*/


    useEffect(() => {
        if (listCategories.length > 0) {
            setCategoryId(listCategories[0].id);
        }
    }, [listCategories]);


    useEffect(() => {

        if (listSub && listSub.data && listSub.data.length > 0) {
            setSubId(listSub.data[0].id);
        }
    }, [listSub]);


    useEffect(() => {
        listCategory().then(response => {
            setListCategories(response.categories);
        }).catch(error => {
            // Handle errors
            console.error(error);
        });
    }, []);


    /* Danh sách Sub Category */
    useEffect(() => {
        setChildId('');
        setSubId('');
        setListChild([]);
        setListSub([]);
        const dataSubCategory = {
            category_id: categoryId,
        }
        listSubcategory(dataSubCategory).then(response => {
            setListSub(response);
        }).catch(error => {
            console.error(error);
        });
    }, [categoryId]);

    /* list subcategory*/

    /* list child category*/
    useEffect(() => {
        setChildId('');
        setListChild([]);
        const dataChild = {
            subId: subId,
        }
        listChildCategory(dataChild).then(response => {
            setListChild(response.data);

        }).catch(error => {
            // console.error(error);
        });
    }, [subId]);


    const handleEditCategory = (nameCategory, categoryImage, categoryId) => {
        setIsOpenEditCategory(true);
        setNameCategory(nameCategory);
        setCategoryImage(categoryImage);
        setCategoryId(categoryId)
    }

    const handleEditSub = (id, name) => {
        setIsOpenEditSubcategory(true)
        setSubName(name);
        setSubId(id);
    }

    const handleEditChild = (id, name) => {
        setIsOpenEditChildCategory(true)
        setChildName(name);
        setChildId(id);


    }


    /* end list child category*/
    const handleDelete = async (id, name, deleteFunction) => {
        try {
            const result = await Swal.fire({
                position: 'top',
                title: "Bạn có muốn xoá danh mục " + name,
                text: 'You won\'t be able to revert this!',
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                const response = await deleteFunction(id);
                console.log(response)
                if (response.status) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: response.error,
                        icon: "error"
                    });
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Có lỗi xảy ra trong quá trình",
                text: !error.status && error.error,
                icon: "error"
            });
        }
    };


    return (
        <div className="wrap__category">
            <h2 className='Danh mục'>Quản lý danh mục</h2>
            <div className="row row-cols-1">
                {/*danh mục*/}
                <div className="col-md-6">
                    <div className="fs-5 fw-bolder text-warning d-flex mb-2">
                        <span className=''>Danh mục</span>
                        <button type={'button'} className='ms-auto btn btn-outline-success'
                                onClick={() => setCategoryCreate(true)}>
                            <span className='me-1'><FontAwesomeIcon icon={faPlus} size="xl" style={{color: "#ff1a1a"}}/></span>
                            <span>Thêm </span>
                        </button>
                    </div>
                    <div className="py-4"></div>

                    <table className="table table-striped table-primary">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Tên danh mục</th>
                            <th scope="col" className='text-center'>Hình ảnh</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            listCategories?.map((category, idxCategory) => (
                                <tr key={idxCategory} role={'button'} onClick={() => setCategoryId(category.id)}>
                                    <th scope="row">{idxCategory + 1}</th>
                                    <td>{category.name}</td>
                                    <td className='d-flex justify-content-center'>
                                        <div className=""
                                             style={{
                                                 background: `url(${ImageUrl + category.image})`
                                                 , backgroundSize: 'cover', width: '80%'
                                             }}>
                                            <div className="pt"
                                                 style={{
                                                     paddingTop: '50%'
                                                 }}></div>
                                        </div>
                                    </td>

                                    <td className=''>
                                        <div className="d-flex gap-2 justify-content-end">
                                            <FontAwesomeIcon icon={faPenToSquare} size={'xl'}
                                                             onClick={() => handleEditCategory(category.name, category.image, category.id)}/>
                                            <FontAwesomeIcon icon={faTrash} style={{color: "#ff0000",}} size={'xl'}
                                                             onClick={() => handleDelete(category.id, category.name, deleteCategory)}/>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }


                        </tbody>
                    </table>
                </div>
                {/*danh mục con*/}
                <div className="col-md-3">
                    <div className="fs-5 fw-bolder text-warning d-flex mb-2">
                        <span className=''>Danh mục con</span>
                        <button type={'button'} className='ms-auto btn btn-outline-success'
                                onClick={() => setSubCategoryCreate(true)}>
                            <span className='me-1'><FontAwesomeIcon icon={faPlus} size="xl"
                                                                    style={{color: "#ff1a1a",}}/></span>
                            <span>Thêm </span>
                        </button>
                    </div>
                    <div className="mb-2">
                        <FormControl sx={{m: 1, minWidth: 120}} size="small">
                            <InputLabel id="demo-select-small-label">Danh mục</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={categoryId}
                                label="Age"
                                onChange={(e) => setCategoryId(e.target.value)}
                            >

                                {listCategories?.map((category, idxCate) => (
                                    <MenuItem key={idxCate} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>
                    </div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Tên</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            listSub?.data?.map((sub, idxSub) => (
                                <tr role={'button'}
                                    key={idxSub}
                                    onClick={() => setSubId(sub.id)}>
                                    <th scope="row">{idxSub + 1}</th>
                                    <td>{sub.name}</td>
                                    <td className=''>
                                        <div className="d-flex gap-2 justify-content-end">
                                            <button type={"button"}>
                                                <FontAwesomeIcon icon={faPenToSquare} size={'xl'}
                                                                 onClick={() => handleEditSub(sub.id, sub.name)}/>
                                            </button>
                                            <button type={"button"}
                                                    onClick={() => handleDelete(sub.id, sub.name, deleteSubcategory)}>
                                                <FontAwesomeIcon icon={faTrash} style={{color: "#ff0000",}}
                                                                 size={'xl'}/>
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        }

                        </tbody>
                    </table>

                </div>
                {/*danh mục cháu*/}
                <div className="col-md-3">
                    <div className="fs-5 fw-bolder text-warning d-flex mb-2"><span className=''>Danh mục cháu</span>
                        <button type={'button'} className='ms-auto btn btn-outline-success'
                                onClick={() => setChildCategoryCreate(true)}>
                            <span className='me-1'><FontAwesomeIcon icon={faPlus} size="xl"
                                                                    style={{color: "#ff1a1a",}}/></span>
                            <span>Thêm </span>
                        </button>
                    </div>
                    <div className="mb-2 d-flex justify-content-between">
                        <FormControl sx={{m: 1, minWidth: 120}} size="small">
                            <InputLabel id="childCategory">Danh mục</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={categoryId}
                                label="Age"
                                onChange={(e) => setCategoryId(e.target.value)}
                            >

                                {listCategories?.map((category, idxCate) => (
                                    <MenuItem key={idxCate} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{m: 1, minWidth: 150}} size="small">
                            <InputLabel id="childCategory">Danh mục con</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={subId}
                                label="Age"
                                onChange={(e) => setSubId(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    listSub?.data?.map((sub, idxSub) => (
                                        <MenuItem key={idxSub} value={sub.id}>{sub.name}</MenuItem>
                                    ))
                                }


                            </Select>
                        </FormControl>
                    </div>
                    <table className="table table-striped table-warning">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Tên</th>
                            <th scope="col"></th>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            listChild?.map((child, idxChild) => (
                                <tr key={idxChild}>
                                    <th scope="row">{child.id}</th>
                                    <td>{child.name}</td>

                                    <td className=''>
                                        <div className="d-flex gap-2 justify-content-end">
                                            <button type={'button'}
                                                    onClick={() => handleEditChild(child.id, child.name)}
                                            ><FontAwesomeIcon icon={faPenToSquare} size={'xl'}/></button>
                                            <button type={'button'}><FontAwesomeIcon icon={faTrash}
                                                                                     style={{color: "#ff0000",}}
                                                                                     size={'xl'}
                                                                                     onClick={() => handleDelete(child.id, child.name, deleteChildCategory)}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }


                        </tbody>
                    </table>

                </div>

            </div>


            {/*    Thêm danh mục*/}
            <div className={(categoryCreate ? '' : 'd-none')}>
                <CategoryCreate
                    onClose={() => setCategoryCreate(false)}

                />
            </div>
            {/*    end thêm danh mục*/}


            {/*    Thêm danh mục con*/}
            <div className={(subCategoryCreate ? '' : 'd-none')}>
                {
                    listCategories.length > 0 && <SubCategoryCreate onClose={() => setSubCategoryCreate(false)}
                                                                    listCategories={listCategories}
                                                                    categoryId={categoryId}/>
                }

            </div>
            {/*    end thêm danh mục con*/}


            {/*    Thêm danh mục cháu*/}
            <div className={(childCategoryCreate ? '' : 'd-none')}>
                {
                    listCategories.length > 0 && (
                        <ChildCategoryCreate
                            onClose={() => setChildCategoryCreate(false)}
                            categoryId={categoryId}
                            subId={subId}
                            listCategory={listCategories}

                        />
                    )
                }
            </div>
            {/*    end thêm danh mục cháu */}


            {/*Edit Category */}
            <div className={(isOpenEditCategory ? '' : 'd-none')}>
                <EditCategory categoryId={categoryId}
                              nameCategory={nameCategory}
                              categoryImage={categoryImage}
                              onClose={() => setIsOpenEditCategory(false)}/>

            </div>
            {/*End Category */}


            {/*Edit Sub Category */}
            <div className={(isOpenEditSubCategory ? '' : 'd-none')}>
                <EditSubCategory
                    listCategories={listCategories}
                    categoryId={categoryId}
                    subId={subId}
                    subName={subName}
                    onClose={() => setIsOpenEditSubcategory(false)}
                />

            </div>
            {/*End Sub Category */}

            {/*   Sửa danh mục cháu*/}
            <div className={(isOpenEditChildCategory ? '' : 'd-none')}>
                {
                    listCategories.length > 0 && (
                        <EditChildCategory
                            onClose={() => setIsOpenEditChildCategory(false)}
                            categoryId={categoryId}
                            subId={subId}
                            listCategory={listCategories}
                            childName={childName}
                            childId={childId}

                        />
                    )
                }
            </div>
            {/*    end sửa danh mục cháu */}


        </div>
    )

}

export default Index;