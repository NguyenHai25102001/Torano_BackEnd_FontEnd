import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CategoryCreate from "./CategoryCreate";
import SubCategoryCreate from "./SubCategoryCreate";
import ChildCategoryCreate from "./ChildCategoryCreate";
function Index() {
    const [age, setAge] = React.useState('');
    const [categoryCreate, setCategoryCreate] = useState(false);
    const [subCategoryCreate, setSubCategoryCreate] = useState(false);
    const [childCategoryCreate, setChildCategoryCreate] = useState(false);
    const handleChange = (event) => {
        setAge(event.target.value);

    };
    const handleCloseCategoryCreate = () => {
      setCategoryCreate(false);
    }
    return(
        <div className="wrap__category">
            <h2 className='Danh mục'>Quản lý danh mục</h2>
            <div className="row row-cols-1">
                {/*danh mục*/}
                <div className="col-md-6">
                    <div className="fs-5 fw-bolder text-warning d-flex mb-2">
                        <span className=''>Danh mục</span>
                        <button type={'button'} className='ms-auto btn btn-outline-success' onClick={()=>setCategoryCreate(true)}>
                            <span className='me-1'><FontAwesomeIcon icon={faPlus} size="l" style={{color: "#ff1a1a",}} /></span>
                            <span>Thêm </span>
                        </button>
                    </div>

                    <table className="table table-striped table-primary">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Tên danh mục</th>
                            <th scope="col" className='text-center'>Hình ảnh</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td className='d-flex justify-content-center'>
                               <div className=""
                               style={{
                                   background:`url('https://cdn.alongwalk.info/vn/wp-content/uploads/2022/09/28150733/image-69-hinh-anh-gai-xinh-trung-quoc-hot-girl-trung-quoc-dep-nhat-2022-166432725338362.jpg')`
                                   ,backgroundSize:'cover',width:'50%'
                               }}>
                                   <div className="pt"
                                   style={{
                                       paddingTop:'50%'
                                   }}></div>
                               </div>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                {/*danh mục con*/}
                <div className="col-md-3">
                    <div className="fs-5 fw-bolder text-warning d-flex mb-2">
                        <span className=''>Danh mục con</span>
                      
                        <button type={'button'} className='ms-auto btn btn-outline-success' onClick={()=>setSubCategoryCreate(true)}>
                            <span className='me-1'><FontAwesomeIcon icon={faPlus} size="l" style={{color: "#ff1a1a",}} /></span>
                            <span>Thêm </span>
                        </button>
                    </div>
                    <div className="mb-2">
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small-label">Danh mục</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
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
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Tên</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>

                        </tr>

                        </tbody>
                    </table>

                </div>
                {/*danh mục cháu*/}
                <div className="col-md-3">
                    <div className="fs-5 fw-bolder text-warning d-flex mb-2"><span className=''>Danh mục cháu</span>
                        <button type={'button'} className='ms-auto btn btn-outline-success'>
                            <span className='me-1'><FontAwesomeIcon icon={faPlus} size="l" style={{color: "#ff1a1a",}} /></span>
                            <span>Thêm </span>
                        </button>
                    </div>
                    <div className="mb-2 d-flex justify-content-between">
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="childCategory">Danh mục</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
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

                        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                            <InputLabel id="childCategory">Danh mục con</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
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
                    <table className="table table-striped table-warning">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Tên</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>

                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>

                        </tr>
                        </tbody>
                    </table>

                </div>

            </div>
            {/*    Thêm danh mục*/}
             <div className={(categoryCreate?'':'d-none')}>
                 <CategoryCreate  onClose={() => setCategoryCreate(false)}/>
             </div>
            {/*    end thêm danh mục*/}

            {/*    Thêm danh mục con*/}
            <div className={(subCategoryCreate?'':'d-none')}>
                <SubCategoryCreate  onClose={() => setSubCategoryCreate(false)}/>
            </div>
            {/*    end thêm danh mục con*/}
            {/*    Thêm danh mục con*/}
            <div className={(childCategoryCreate?'':'d-none')}>
                <ChildCategoryCreate  onClose={() => setChildCategoryCreate(false)}/>
            </div>
            {/*    end thêm danh mục con*/}



        </div>
    )

}
export default Index;