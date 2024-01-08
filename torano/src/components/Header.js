import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {
  ImageUrl,
  urlLogout,
} from "../Admin/components/dataApi";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/slices/categorySlides';
import Avatar from '@mui/material/Avatar';


import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faChevronDown, faUser, faXmark} from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
import {Badge} from "@mui/material";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


function stringToColor(string) {

  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}


function Header({ handleCart }) {
  const [filterOptions,setFilterOptions]=React.useState(true);

  const [listChild,setListChild]=React.useState('');

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.category.data);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [isOpenMenuBar, setIsOpenMenuBar] = useState(false)


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const user=JSON.parse(sessionStorage.getItem('user'));
  const user_access_token=JSON.parse(sessionStorage.getItem('user_access_token'))
  const handleLogout = () => {
    axios.get(urlLogout(),{
      headers:{
        Authorization:'Bearer '+user_access_token,
      }
    })
        .then((res) => {
          sessionStorage.clear();

          window.location.reload();
        })
        .catch((error) => {
          console.log(error)
        });
  }

    const handleLinkClick = () => {
    setIsOpenMenuBar(false)

    };



  return (
    <header className="wrapper__nav container position-relative">
      <div className="nav-content ">
        <div className=" d-flex justify-content-between flex-container-header align-items-center   pt-2">
          <div className="bars " role={'button'} onClick={()=>setIsOpenMenuBar(true)}>
            <FontAwesomeIcon icon={faBars} size={'2xl'} />
          </div>
          <div className="header-wrap-logo px-4">
            <Link to="/">
              <img
                src="//theme.hstatic.net/200000690725/1001078549/14/logo.png?v=202"
                alt=""
                className='w-100'
              />
            </Link>
          </div>
          {/*Menu*/}
          <div className="header-wrap-menu">
            <nav className="navbar-mainmenu text-center ">
              <ul className="menuList-main m-0 x`">
                <li className="text-center py-4 position-relative ">
                  <Link to="/">Sale</Link>
                </li>

                {categoryList?.categories?.map((item, index) => (
                  <li className="has-submenu text-center header-icon position-relative fullwidth"
                    key={item.id}>

                    <Link to={'/collections/'+item.code} className="py-4 header-icon">
                      {item.name}
                      <span className="ms-1 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          x="0"
                          y="0"
                          viewBox="0 0 128 128"
                        >
                          <g>
                            <path d="m64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z"></path>
                          </g>
                        </svg>
                      </span>
                    </Link>

                    <div className="menuList-submain multicolumn">
                      <div className="multicolumn-container">
                      <div className="d-inline-block w-100">
                        <div className="subchilmenu d-flex flex-wrap align-items-start w-100">
                          {item?.subcategories?.map((sub) => (
                              <div className="ui-menu-item col-lg-3 d-inline-block" key={sub.id}>
                                <Link to={'/collections/'+sub.code}>{sub.name}</Link>

                                <ul className="subchildmenu-item d-flex flex-column gap-1">
                                  {
                                    sub?.child_categories?.map((child)=>(
                                        <li className="m-0 " key={child.id}>
                                          <Link
                                              to={'/collections/'+child.code}
                                              className="fw-normal d-block opacity-75"
                                          >
                                            {child.name}
                                          </Link>
                                        </li>
                                    ))
                                  }
                                </ul>

                              </div>
                          ))}
                        </div>
                      </div>

                        <div className="menuBanner">
                          <Link to={""}>
                            <img
                              alt=""
                              src={ImageUrl+ item.image}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>



                  </li>
                ))}
                <li className="text-center">
                  <Link to="/">Hệ thống cửa hàng</Link>
                </li>
              </ul>
            </nav>
          </div>

          {/*End menu*/}

          <div className="header-wrap-actions mx-4">
            <div className="d-flex align-items-center">
              <div className="d-inline-block">
                <button>
                  <span>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.8438 19.3203C21.0781 19.5286 21.0781 19.75 20.8438 19.9844L19.9844 20.8438C19.75 21.0781 19.5286 21.0781 19.3203 20.8438L14.5938 16.1172C14.4896 16.013 14.4375 15.9089 14.4375 15.8047V15.2578C12.901 16.5859 11.1302 17.25 9.125 17.25C6.88542 17.25 4.97135 16.4557 3.38281 14.8672C1.79427 13.2786 1 11.3646 1 9.125C1 6.88542 1.79427 4.97135 3.38281 3.38281C4.97135 1.79427 6.88542 1 9.125 1C11.3646 1 13.2786 1.79427 14.8672 3.38281C16.4557 4.97135 17.25 6.88542 17.25 9.125C17.25 11.1302 16.5859 12.901 15.2578 14.4375H15.8047C15.9349 14.4375 16.0391 14.4896 16.1172 14.5938L20.8438 19.3203ZM4.71094 13.5391C5.9349 14.763 7.40625 15.375 9.125 15.375C10.8438 15.375 12.3151 14.763 13.5391 13.5391C14.763 12.3151 15.375 10.8438 15.375 9.125C15.375 7.40625 14.763 5.9349 13.5391 4.71094C12.3151 3.48698 10.8438 2.875 9.125 2.875C7.40625 2.875 5.9349 3.48698 4.71094 4.71094C3.48698 5.9349 2.875 7.40625 2.875 9.125C2.875 10.8438 3.48698 12.3151 4.71094 13.5391Z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              { /* user*/}
              <div className="d-inline-block ms-3">

                {
                  user?.name?(   <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar {...stringAvatar(user?.name)}/>
                      </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >

                          <MenuItem  onClick={handleCloseUserMenu}>
                          <div className="p-1">
                            <div className='text-uppercase fw-medium border-bottom border-1 border-secondary pb-2'>Thông tin tài khoản</div>

                            <ul className='mt-2'>
                              <li className='mt-1'>{user?.name}</li>
                              <li className="mt-1">Tài khoản của tôi</li>
                              <li className="mt-1">Danh sách địa chỉ</li>
                              <li className="mt-1" onClick={handleLogout}>Đăng xuất</li>

                            </ul>
                          </div>


                          </MenuItem>
                    </Menu>
                  </Box>):(   <Link to='/account/login'><FontAwesomeIcon icon={faUser} size="xl" /> </Link>)
                }


              </div>
               {/*end user */}
              <div className="d-inline-block ms-3 ">
                {/*onClick={handleCart}*/}
                <Link to={'/cart'} className="position-relative" >
                  <Stack spacing={2} direction="row">
                    <Badge badgeContent={sessionStorage.getItem('quantityCartItem')} color="error">
                      <ShoppingBagIcon color="action" />
                    </Badge>

                  </Stack>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* menu bar */}
      <div className={(isOpenMenuBar?'':'d-none') +" menu-bars"}>
        <div className="position-relative">
          <div className="ssh" onClick={()=>setIsOpenMenuBar(false)} role={'button'}></div>
          <div className="content-mebu-bars">
            <div className="p-3  border-bottom border-1 border-secondary ">
              <div className='d-flex justify-content-between align-items-center '>
                <div className="fs-5 fw-bold">Danh mục</div>
                <div className="" onClick={()=>setIsOpenMenuBar(false)} role={'button'}><FontAwesomeIcon icon={faXmark} size="xl" /></div>
                
              </div>
            </div>

              <div className="d-block">
                <ul className={(filterOptions?'':'d-none')+" d-flex flex-column"}>
                  {categoryList?.categories?.map((category) => (
                      <li key={category.id} className={'py-1 fw-semibold'}>
                        <div className="d-flex align-items-center justify-content-between" role={'button'}>
                          <Link to={'/collections/'+category.code} className={'me-2'} onClick={()=>handleLinkClick()}> {category.name}</Link>
                          {
                              category?.subcategories&&(<span className={''+(listChild===category.name&&(' active-list-child'))}
                                                              onClick={()=>listChild===category.name?setListChild(''):setListChild(category.name)}
                              ><FontAwesomeIcon icon={faChevronDown} size={'xs'} /></span>)
                          }
                        </div>
                        {
                            listChild===category.name&&(
                                <ul className={'list-child ms-4 mt-1 d-flex flex-column'}>
                                  {  category?.subcategories.map((sub) => (
                                      <li key={sub.id} className={'py-1'}><Link to={'/collections/'+sub.code} onClick={handleLinkClick}>{sub.name}</Link></li>
                                  ))}
                                </ul>
                            )
                        }

                      </li>
                  ))}
                </ul>
              </div>

            
          </div>

        </div>

      </div>
      {/*  end menu bar*/}

    </header>
  );
}

export default Header;
