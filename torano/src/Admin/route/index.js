import React from "react";
import ListProduct from "../view/product/ListProduct";


const CreateProductView=React.lazy(()=>import('../view/product/Create'))
const CategoryView=React.lazy(()=>import('../view/category/Index'))
//const ListProduct=React.lazy(()=>import('../view/product/ListProduct'));
const ProductEdit=React.lazy(()=>import('../view/product/ProductEdit'));
const ListUser=React.lazy(()=>import('../view/user/ListUser'));
const OrderList=React.lazy(()=>import('../view/order/index'));
const Banners=React.lazy(()=>import('../view/banner/index'));

const routesAdmin = [
    {
        name: 'Thêm sản phẩm',
        path: '/product/create',
        component: CreateProductView,
    },
    {
        name: 'Danh sách Danh mục',
        path: '/category/index',
        component: CategoryView,
    },
    {
        name: 'Chi tiết sản phẩm',
        path: '/product/:id',
        component: ProductEdit,
    },
    {
        name: 'Chi tiết sản phẩm',
        path: '/product/index',
        component: ListProduct,
    },  {
        name: 'Danh sách người dùng',
        path: '/list-user',
        component: ListUser,
    }, {
        name: 'Danh sách người dùng',
        path: '/list-order',
        component: OrderList,
    }, {
        name: 'Danh sách banner',
        path: '/banner-list',
        component: Banners,
    },
];
export  default routesAdmin;