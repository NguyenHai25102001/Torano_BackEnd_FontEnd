import React from "react";

const CreateProductView=React.lazy(()=>import('../view/product/Create'))
const CategoryView=React.lazy(()=>import('../view/category/Index'))
let routesAdmin;
routesAdmin = [
        {
                name:'Thêm sản phẩm',
                path: '/product/create',
                component: <CreateProductView />,
            },
    {
        name:'Danh sách Danh mục',
        path: '/category/index',
        component: <CategoryView/>,
    }

]
export  default routesAdmin;