import formatPrice from "../../../components/FormatPrice";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    deleteOrder,
    urlChangeOrderStatus,
    urlChanPaymentStatus,
    urlDeleteOrder,
    urlListOrder
} from "../../components/dataApi";
import MenuItem from "@mui/material/MenuItem";
import {FormControl, Select} from "@mui/material";
import Swal from "sweetalert2";

function Order() {

    const Authorization = 'Bearer ' + sessionStorage.getItem('access_token')?.trim();

    const [orderStatus, setOrderStatus] = useState('');

    const [paymentStatus, setPaymentStatus] = useState('');

    const [page, setPage] = useState('')

    const [lastPage, setLastPage] = useState(1)

    const [listOrder, setListOrder] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                orderStatus: orderStatus,
                paymentStatus: paymentStatus,
                page: page
            };

            try {
                const response = await axios.get(urlListOrder(), {
                    params: data,
                    headers: {
                        Authorization: Authorization
                    }
                });

                //console.log(response.data);
                setListOrder(response.data?.orders?.data)
                setLastPage(response.data?.orders?.last_page)
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [orderStatus, paymentStatus, Authorization, page]);


    const handleChangeOrder = async (e, id) => {
        try {
            if (id && e) {
                const response = await axios.post(
                    urlChangeOrderStatus(id),
                    {
                        orderStatus: e.target.value,
                    },
                    {
                        headers: {
                            Authorization: Authorization,
                        },
                    }
                );


                setListOrder((prevState) => {
                    const newListOrder = [...prevState];
                    const updatedOrderIndex = newListOrder.findIndex((order) => order.id === id);

                    if (updatedOrderIndex !== -1) {
                        newListOrder[updatedOrderIndex] = {
                            ...newListOrder[updatedOrderIndex],
                            order_status: e.target.value,
                        };
                    }
                    return newListOrder;
                });

            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleChangePayment = async (e, id) => {
        try {
            if (id && e) {
                const response = await axios.post(
                    urlChanPaymentStatus(id),
                    {
                        paymentStatus: e.target.value,
                    },
                    {
                        headers: {
                            Authorization: Authorization,
                        },
                    }
                );

                setListOrder((prevState) => {
                    const newListOrder = [...prevState];
                    const updatedOrderIndex = newListOrder.findIndex((order) => order.id === id);

                    if (updatedOrderIndex !== -1) {
                        newListOrder[updatedOrderIndex] = {
                            ...newListOrder[updatedOrderIndex],
                            payment_status: e.target.value,
                        };
                    }
                    return newListOrder;
                });


            }
        } catch (error) {
            console.error(error);
        }

    }

    const deleteOrder = async (id) => {
        if (id) {
            Swal.fire({
                text: "Bạn có muốn xoá đơn hàng",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.delete(urlDeleteOrder(id), {
                            headers: {
                                Authorization: Authorization,
                            },
                        });

                        if (response.data?.status) {
                            // setListOrder((prevState) => {
                            //     return prevState.filter((item) => item.id !== id);
                            // });

                            const listOrderResponse = await axios.get(urlListOrder(), {
                                params: {
                                    page: response.data?.orders?.data.length > 0 ? page : 1,
                                },

                                headers: {
                                    Authorization: Authorization,
                                },
                            });

                            setListOrder(listOrderResponse.data?.orders?.data);
                            setLastPage(listOrderResponse.data?.orders?.last_page);

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your order has been deleted.",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500,
                            });

                        }
                    } catch (error) {
                        console.error("Error deleting order:", error);
                    }
                }
            });
        }
    };


    const formattedDate = (dateString) => {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    return (
        <div className='wrap__order'>
            <h3>Danh sách đơn hàng</h3>

            <div className="col-md-12 list-product">
                <div className="d-flex justify-content-end">
                    <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>

                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                        >
                            <MenuItem value={''}><em>None</em></MenuItem>

                            <MenuItem value={1}>Đang chuẩn bị</MenuItem>
                            <MenuItem value={2}>Đang giao hàng</MenuItem>
                            <MenuItem value={3}>Đã giao hàng</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" sx={{m: 1, minWidth: 130}}>

                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                            label="Age"


                        >
                            <MenuItem value={''}><em>None</em></MenuItem>
                            <MenuItem value={1}>Chưa thanh toán</MenuItem>
                            <MenuItem value={2}>Đã thanh toán</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <table className=" table table-striped ">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên khách hàng</th>
                        <th scope="col">Email</th>
                        <th scope={'col'}>Tổng tiền</th>
                        <th scope={'col'}>Thời gian đặt hàng</th>

                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thanh toán</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        listOrder?.map(order => (
                            <tr>
                                <th scope="row" key={order.id}></th>
                                <td>{order.user_name}</td>
                                <td>{order.email}</td>
                                <td>{formatPrice(order.total_amount || 0)}</td>
                                <td>{formattedDate(order.created_at || '')}</td>
                                <td>
                                    <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>

                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={order.order_status}
                                            onChange={(e) => handleChangeOrder(e, order.id)}
                                            label="Age"
                                            className={order.order_status === 0 ? 'text-danger' :
                                                order.order_status === 1 ? 'text-warning' :
                                                    order.order_status === 2 ? 'text-success' :
                                                        ''
                                            }
                                        >

                                            <MenuItem value={1}>Đang chuẩn bị</MenuItem>
                                            <MenuItem value={2}>Đang giao hàng</MenuItem>
                                            <MenuItem value={3}>Đã giao hàng</MenuItem>
                                        </Select>
                                    </FormControl>

                                </td>
                                <td>
                                    <FormControl variant="standard" sx={{m: 1, minWidth: 130}}>

                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={order.payment_status}
                                            onChange={(e) => handleChangePayment(e, order.id)}
                                            label="Age"
                                            className={order.payment_status === 0 ? 'text-danger' :

                                                order.payment_status === 1 ? 'text-success' :
                                                    ''
                                            }


                                        >

                                            <MenuItem value={1}>Chưa thanh toán</MenuItem>
                                            <MenuItem value={3}>Đã thanh toán</MenuItem>
                                        </Select>
                                    </FormControl>
                                </td>
                                <td className='text-center'>
                                    <button type={'button'} className='me-2'>
                                        <button type={'button'}
                                                onClick={() => deleteOrder(order.id)}>
                                            <FontAwesomeIcon icon={faTrash} style={{color: 'red',}} size={'2xl'}/>
                                        </button>
                                    </button>

                                </td>
                            </tr>


                        ))
                    }

                    </tbody>
                </table>
                <div className="d-flex justify-content-end mt-3">


                    {
                        lastPage > 1 && (
                            <Stack spacing={2}>
                                <Pagination
                                    count={lastPage}
                                    page={page}
                                    onChange={(event, value) => setPage(value)}
                                />
                            </Stack>
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default Order;