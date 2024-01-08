const navAdmin=[
    {
        section:'Product',
        links:[
            {
                name:"Thêm sản phẩm",
                path:'/admin/product/create'
            },
            {
                name:"Danh sách sản phẩm",
                path:'/admin/product/index'
            },

        ]
    }, {
        section:'Quản lý danh mục',
        links:[
            {
                name:"Danh sách danh mục",
                path:'/admin/category/index'
            }
        ]
    }, {
        section:'Quản lý Người dùng',
        links:[
            {
                name:"Danh sách người dùng",
                path:'/admin/list-user'
            }
        ]
    }, {
        section:'Quản lý đơn hàng',
        links:[
            {
                name:"Danh sách đơn hàng",
                path:'/admin/list-order'
            }
        ]
    },{
        section:'Quản lý Banner',
        links:[
            {
                name:"Danh sách banners",
                path:'/admin/banner-list',
            }
        ]
    },
]
export default  navAdmin;