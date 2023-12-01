
const lisCategory=[
    {

    }
];
const productImage=[
    {
        path:'https://product.hstatic.net/200000690725/product/bs002_19fa4cd191704c63ace6c7cfd5f2bc67_master.jpg'
    },
    {
        path: "https://product.hstatic.net/200000690725/product/53197791242_44caf87cfa_o_00d5feda75cd4c5098a764d01f018daa_master.jpg"
    },
    {
        path: "https://product.hstatic.net/200000690725/product/53198475703_b004703fb7_o_62502900a97541e6a5dace0b49bd3cb8_master.jpg"
    },
    {
        path: "https://product.hstatic.net/200000690725/product/53198475828_a71b6fcb90_o_2b4fc9c563644729ab41eae39e61ed90_master.jpg"
    },
    {
        path: "https://product.hstatic.net/200000690725/product/53198475778_516594d950_o_2c5f0235de4348a697c6e92d9e711d3e_master.jpg"
    },
    {
        path: "https://product.hstatic.net/200000690725/product/53198585335_892272c162_o_35823cc0731f46d4af7fe6e57c477759_master.jpg"
    },
    {
        path: "https://product.hstatic.net/200000690725/product/53198585400_2cb2e27e18_o_899cbc1f32264a179126ea3dbbcfd90a_master.jpg"
    },


]

const productDetails={
    name:'',
    colors:[
        {
            id:'',
            name:'Đen',
            sizes:[
                {

                    name:'S'
                },{
                name:'M'
                },{
                name: "L"
                },{name:'XL'}
            ]
        }, {
            name:'Xanh navy',
            sizes:[
                {

                    name:'S'
                },{
                    name:'M'
                },{
                    name: "L"
                },{name:'XL'}
            ]
        }, {
            name:'Xám nhạt',
            sizes:[
                {

                    name:'S'
                },{
                    name:'M'
                },{
                    name: "L"
                },{name:'XL'}
            ]
        },

    ]

}
const product={
    name:'Áo khoác da lộn basic cổ cao EWCL002',
    code:'EWCL00231PE00SB_LBE-S',
    status:true,
    brand:'TORANO',
    price:675000,
    sale:0.1,
    images:[
        {
            path:'https://product.hstatic.net/200000690725/product/53291247328_6a10f65c68_k_c48ce308b98c4e02ac2fe22b90a28c92_compact.jpg'
        },
        {
            path: 'https://product.hstatic.net/200000690725/product/53291004106_2ecbdd0476_k_eb63e8b148e040f59bd8e461ca6868cc_master.jpg'
        },
        {
            path: 'https://product.hstatic.net/200000690725/product/53291003996_058b8a3db0_k_3e5db04784954e52a6e7fdb4012b4ed0_master.jpg'
        }
        ,{
            path: 'https://product.hstatic.net/200000690725/product/53291246808_a50ace7ead_k_30ea86df07ad4cbd85460af6104a759d_master.jpg'
        }, {
            path:'https://product.hstatic.net/200000690725/product/53291247328_6a10f65c68_k_c48ce308b98c4e02ac2fe22b90a28c92_compact.jpg'
        },
        {
            path: 'https://product.hstatic.net/200000690725/product/53291004106_2ecbdd0476_k_eb63e8b148e040f59bd8e461ca6868cc_master.jpg'
        },
        {
            path: 'https://product.hstatic.net/200000690725/product/53291003996_058b8a3db0_k_3e5db04784954e52a6e7fdb4012b4ed0_master.jpg'
        }
        ,{
            path: 'https://product.hstatic.net/200000690725/product/53291246808_a50ace7ead_k_30ea86df07ad4cbd85460af6104a759d_master.jpg'
        },
    ],
    color:[{
        id:'1',
        name:'Green',
        sizes: [
            {
                id: '1',
                name: 'S',
                quantity:1
            },
            {
                id: '2',
                name: 'M',
                quantity:1
            },
            // Add more sizes as needed
        ]

    },{

        id:'1',
        name:'Red',
        sizes: [
            {
                id: '1',
                name: 'S',
                quantity:0
            },
            {
                id: '2',
                name: 'M',
                quantity:0
            },
            {
                id: '2',
                name: 'L',
                quantity:1
            },
            // Add more sizes as needed
        ]

    }
    ],
}
export {lisCategory,productImage,productDetails,product}