import React from "react";
import { Link } from "react-router-dom";
function Header({ handleCart }) {
  const category = [
    {
      name: "Áo nam",
      parentCategory: [
        {
          name: "Áo Polo",
          subCategory: [
            {
              name: "Áo polo trơn",
            },
          ],
        },
      ],
    },
    {
      name: "Quần nam",
      parentCategory: [
        {
          name: "Áo Polo",
          subCategory: [
            {
              name: "Áo polo trơn",
            },
          ],
        },
      ],
    },
    {
      name: "Hàng đông",
      parentCategory: [
        {
          name: "Áo Polo",
          subCategory: [
            {
              name: "Áo polo trơn",
            },
          ],
        },
      ],
    },
    {
      name: "Bộ sưu tập",
      parentCategory: [
        {
          name: "Áo Polo",
          subCategory: [
            {
              name: "Áo polo trơn",
            },
          ],
        },
      ],
    },
  ];
  return (
    <header className="wrapper__nav container position-relative">
      <div className="nav-content ">
        <div className="d-flex justify-content-between flex-container-header align-items-center">
          <div className="header-wrap-logo px-4">
            <Link to="/">
              <img
                src="//theme.hstatic.net/200000690725/1001078549/14/logo.png?v=202"
                alt=""
              />
            </Link>
          </div>
          <div className="header-wrap-menu">
            <nav className="navbar-mainmenu text-center ">
              <ul className="menuList-main m-0 x`">
                <li className="text-center py-4 position-relative ">
                  <Link to="/">Sale</Link>
                </li>
                {category.map((item, index) => (
                  <li
                    className="has-submenu text-center header-icon position-relative fullwidth"
                    key={index}
                  >
                    <Link to="/" className="py-4 header-icon">
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
                        <div className="subchilmenu d-flex flex-wrap">
                          {[...Array(4)].map((item) => (
                            <div className="ui-menu-item col-lg-3">
                              <Link to="#">Quần dài kiki</Link>
                              <ul className="subchildmenu-item">
                                <li className="m-0 ">
                                  <Link
                                    to="#"
                                    className="fw-normal d-block opacity-75"
                                  >
                                    Quần âu basic
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div className="menuBanner">
                          <Link to={""}>
                            <img
                              alt=""
                              src="//theme.hstatic.net/200000690725/1001078549/14/mega_menu_2_img.jpg?v=202"
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
          <div className="header-wrap-actions mx-4">
            <div className="">
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
              <div className="d-inline-block ms-3">
                <button>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                    >
                      <path d="M14.5156 12.875C15.9479 12.875 17.1719 13.3958 18.1875 14.4375C19.2292 15.4531 19.75 16.6771 19.75 18.1094V19.125C19.75 19.6458 19.5677 20.0885 19.2031 20.4531C18.8385 20.8177 18.3958 21 17.875 21H4.125C3.60417 21 3.16146 20.8177 2.79688 20.4531C2.43229 20.0885 2.25 19.6458 2.25 19.125V18.1094C2.25 16.6771 2.75781 15.4531 3.77344 14.4375C4.8151 13.3958 6.05208 12.875 7.48438 12.875C7.82292 12.875 8.31771 12.9792 8.96875 13.1875C9.64583 13.3958 10.3229 13.5 11 13.5C11.6771 13.5 12.3542 13.3958 13.0312 13.1875C13.7083 12.9792 14.2031 12.875 14.5156 12.875ZM17.875 19.125V18.1094C17.875 17.1979 17.5365 16.4167 16.8594 15.7656C16.2083 15.0885 15.4271 14.75 14.5156 14.75C14.4375 14.75 14.0208 14.8542 13.2656 15.0625C12.5365 15.2708 11.7812 15.375 11 15.375C10.2188 15.375 9.45052 15.2708 8.69531 15.0625C7.96615 14.8542 7.5625 14.75 7.48438 14.75C6.57292 14.75 5.77865 15.0885 5.10156 15.7656C4.45052 16.4167 4.125 17.1979 4.125 18.1094V19.125H17.875ZM14.9844 10.6094C13.8906 11.7031 12.5625 12.25 11 12.25C9.4375 12.25 8.10938 11.7031 7.01562 10.6094C5.92188 9.51562 5.375 8.1875 5.375 6.625C5.375 5.0625 5.92188 3.73438 7.01562 2.64062C8.10938 1.54688 9.4375 1 11 1C12.5625 1 13.8906 1.54688 14.9844 2.64062C16.0781 3.73438 16.625 5.0625 16.625 6.625C16.625 8.1875 16.0781 9.51562 14.9844 10.6094ZM13.6562 3.96875C12.9271 3.23958 12.0417 2.875 11 2.875C9.95833 2.875 9.07292 3.23958 8.34375 3.96875C7.61458 4.69792 7.25 5.58333 7.25 6.625C7.25 7.66667 7.61458 8.55208 8.34375 9.28125C9.07292 10.0104 9.95833 10.375 11 10.375C12.0417 10.375 12.9271 10.0104 13.6562 9.28125C14.3854 8.55208 14.75 7.66667 14.75 6.625C14.75 5.58333 14.3854 4.69792 13.6562 3.96875Z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div className="d-inline-block ms-3 ">
                <button className="position-relative" onClick={handleCart}>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                    >
                      <path d="M15.95 6H19.7V17.875C19.7 18.7344 19.3875 19.4635 18.7625 20.0625C18.1635 20.6875 17.4344 21 16.575 21H5.325C4.46563 21 3.72344 20.6875 3.09844 20.0625C2.49948 19.4635 2.2 18.7344 2.2 17.875V6H5.95C5.95 4.61979 6.43177 3.44792 7.39531 2.48438C8.3849 1.49479 9.56979 1 10.95 1C12.3302 1 13.5021 1.49479 14.4656 2.48438C15.4552 3.44792 15.95 4.61979 15.95 6ZM13.1375 3.8125C12.5385 3.1875 11.8094 2.875 10.95 2.875C10.0906 2.875 9.34844 3.1875 8.72344 3.8125C8.12448 4.41146 7.825 5.14062 7.825 6H14.075C14.075 5.14062 13.7625 4.41146 13.1375 3.8125ZM17.825 17.875V7.875H15.95V9.4375C15.95 9.69792 15.8589 9.91927 15.6766 10.1016C15.4943 10.2839 15.2729 10.375 15.0125 10.375C14.7521 10.375 14.5307 10.2839 14.3484 10.1016C14.1661 9.91927 14.075 9.69792 14.075 9.4375V7.875H7.825V9.4375C7.825 9.69792 7.73385 9.91927 7.55156 10.1016C7.36927 10.2839 7.14792 10.375 6.8875 10.375C6.62708 10.375 6.40573 10.2839 6.22344 10.1016C6.04115 9.91927 5.95 9.69792 5.95 9.4375V7.875H4.075V17.875C4.075 18.2135 4.19219 18.5 4.42656 18.7344C4.68698 18.9948 4.98646 19.125 5.325 19.125H16.575C16.9135 19.125 17.2 18.9948 17.4344 18.7344C17.6948 18.5 17.825 18.2135 17.825 17.875Z"></path>
                    </svg>
                  </span>
                  <span className="count-holder">
                    <span className="count">0</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
