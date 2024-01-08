import axios from "axios";

export const apiUrl = 'http://127.0.0.1:8000/api/';

const ImageUrl = 'http://127.0.0.1:8000/storage/';
export const Authorization='Bearer '+sessionStorage.getItem('access_token')?.trim();
export const updateProduct=(id)=>apiUrl+'admin/update-product/'+id;

export const urlListProducts=()=>apiUrl+'admin/list-product';
export const urlDeleteProducts=(id)=>apiUrl+'admin/delete-product/'+id;
export const urlChangeProductStatus=(id)=>apiUrl+'admin/change-pro-status/'+id;

export const urlListCategory=()=>apiUrl+'admin/category/index';
export const urlListSubcategory=()=>apiUrl+'admin/sub-category';
export const urlListChildCategory=()=>apiUrl+'admin/child-category';

/* User */
export const urlListUser=()=>apiUrl+'admin/list-user';

export const urlDeleteUser=(id)=>apiUrl+'admin/delete-user/'+id;

/* End user */


/* Web api*/
export const urlWebCategoryList=()=>apiUrl+'web/category-list';
export const urlCodeByProducts=(code)=>apiUrl+'web/by-code-product-list/'+code;

export const urlProductDetails=(id)=>apiUrl+'web/product-details/'+id;
export const urlCollectionProductSale=()=>apiUrl+'web/collection-product-sale';
export const urlCollectionSubcategories=()=>apiUrl+'web/collection-categories';
export const urlCollectionProducts=()=>apiUrl+'web/collection-product';


/* End web api*/

export const urlLogin=()=>apiUrl+'login';
export const urlLogout=()=>apiUrl+'logout';


/**
 * Cart
 * */
export const urlCreateCartItem=()=>apiUrl+'web/create-cart_item';
export const urlCartList=()=>apiUrl+'web/list-cart_item';
export const urlDeleteCarItem=(id)=>apiUrl+'web/delete-cart_item/'+id;
export const urlUpdateQuantityCartItem=(id)=>apiUrl+'web/update-quantity-cart_item/'+id;
/**
 * End cart
 * */

/** Order */
export const urlCreateOrder=()=>apiUrl+'web/create-order';
export const urlListOrder=()=>apiUrl+'admin/list-order';
export const urlChangeOrderStatus=(id)=>apiUrl+'admin/change-order-status/'+id;
export const urlChanPaymentStatus=(id)=>apiUrl+'admin/change-order-payment/'+id;
export const urlDeleteOrder=(id)=>apiUrl+'admin/delete-order/'+id;


export const showApi = (path,id) => {
    return axios.get(apiUrl + path + id,
        {
            headers:{
                Authorization:Authorization
            }
        })
        .then(response => response.data)
        .catch(error => {
            throw error.response ? error.response.data : error;
        });
};

const getApi = (path) => {
    return axios.get(apiUrl + path,
        {
            headers:{
                Authorization:Authorization
            }
        })
        .then(response => response.data)
        .catch(error => {
            throw error.response ? error.response.data : error;
        });
};

const postApi = (path, data) => {
    return axios.post(apiUrl + path, data,
        {
            headers:{
                Authorization:Authorization
            }})
        .then(response => response.data)
        .catch(error => {
            throw error.response ? error.response.data : error;
        });
};

const postEditApi = (path, id,data) => {
    return axios.post(apiUrl + path+id, data,
        {
            headers:{
                Authorization:Authorization
            }})
        .then(response => response.data)
        .catch(error => {
            throw error.response ? error.response.data : error;
        });
};

const deleteApi = (path,id) => {
    return axios.delete(apiUrl+path + id,
        {
            headers:{
                Authorization:Authorization
            }})
        .then(response => response.data)
        .catch(error => {
            throw error.response ? error.response.data : error;
        });
};




/*Login*/
const loginAdmin=(data)=>postApi('login',data);

/*End Login*/

/* Category */
const listCategory = () => getApi('admin/category/index');
const createCategory=(data)=>postApi('admin/category/create',data);
const deleteCategory=(id)=>deleteApi('admin/category/delete/',id);
export const showCategory=(id)=>showApi('admin/category/',id);
export const  editCategory=(id,data)=>postEditApi('admin/category/edit/',id,data);
/* end Category */


/*Sub Category */
const listSubcategory = (data) => postApi('admin/sub-category',data);
const createSubcategory=(data)=>postApi('admin/sub-category/create',data);
const deleteSubcategory=(id)=>deleteApi('admin/sub-category/delete/',id);
export const editSubcategory=(id,data)=>postEditApi('admin/sub-category/edit/',id,data);
/* end Sub Category */


/*Child Category */
export const listChildCategory = (data) => postApi('admin/child-category',data);
export const createChildCategory=(data)=>postApi('admin/child-category/create',data);
export const deleteChildCategory=(id)=>deleteApi('admin/child-category/delete/',id);
export const editChildCategory=(id,data)=>postEditApi('admin/child-category/edit/',id,data);
/* end Sub Category */


/* Product */
export const createProduct = (data) => postApi('admin/product/create',data);
export  const productDetails=(id)=>showApi('admin/product/',id)


/* End Product*/




export { listCategory ,ImageUrl,createCategory,loginAdmin,deleteCategory
,listSubcategory,createSubcategory,deleteSubcategory};
