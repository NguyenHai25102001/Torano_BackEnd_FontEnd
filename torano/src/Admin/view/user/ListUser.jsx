import React, {useEffect, useState} from "react";
import {FormControlLabel, styled, Switch} from "@mui/material";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import {Authorization, urlDeleteProducts, urlDeleteUser, urlListUser} from "../../components/dataApi";
import Swal from "sweetalert2";

function ListUser() {
    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState(1);

    const fetchData = async () => {
        try {
            const response = await axios.get(urlListUser(), {
                params: {
                    page: page,
                },
                headers: {
                    Authorization: Authorization,
                },
            });
            setUserList(response.data?.users?.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const handleDeleteUser = (id, name) => {
        Swal.fire({

            html: `<div class="fs-5">Do you want to delete user: ${name}</div>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(urlDeleteUser(id))
                    .then((response) => {
                        console.log(response)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            window.location.reload();
                        });
                    }).catch((e) => {
                    console.log(e)
                })

            }
        });

    }


    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({theme}) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));


    return (
        <div className='wrap_list-user'>
            <h2 className='fs-3'>Danh sách người dùng</h2>
            <div className="row mt-3">
                <div className="col-md-12 list-product">
                    <table className=" table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên người dùng</th>
                            <th scope="col">Email</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            userList?.map((user, idxUser) => (
                                <tr key={user.id}>
                                    <th scope="row">{idxUser + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <FormControlLabel
                                            control={
                                                <IOSSwitch sx={{m: 1}}
                                                           defaultChecked
                                                />
                                            }

                                            label=""
                                        />

                                    </td>
                                    <td className='text-center'>
                                        <button type={'button'} className='me-2'>
                                            <Link to={'/admin/product/'}>
                                                <FontAwesomeIcon icon={faPenToSquare} style={{color: "#ffd43b",}}
                                                                 size={'2xl'}/>
                                            </Link>
                                        </button>
                                        <button type={'button'}
                                                onClick={() => handleDeleteUser(user.id, user.name)}>


                                            <FontAwesomeIcon icon={faTrash} size="2xl" style={{color: "#f00000",}}/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }


                        </tbody>
                    </table>
                    <div className="d-flex justify-content-end mt-3">
                        {
                            userList?.last_page > 1 && (
                                <Stack spacing={2}>

                                    <Pagination count={userList?.last_page}
                                                page={page}
                                                onChange={(event, value) => setPage(value)}/>
                                </Stack>
                            )
                        }

                    </div>

                </div>
            </div>

        </div>
    )
}

export default ListUser;