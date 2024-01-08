import React, {useState} from "react";
import {loginAdmin} from "../../components/dataApi";
import {useAuth} from "../../components/authContext";
import Swal from "sweetalert2";

function LoginAdmin() {


    const [email, setEmail] = useState('');


    const [password, setPassword] = useState('');

    const {login} = useAuth()

    const dataLogin = new FormData();

    dataLogin.append('email', email);

    dataLogin.append('password', password);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAdmin(dataLogin);

            if (response.status) {
                if (response.user?.role_id === 1) {
                    login();
                    window.location.href = '/admin';
                    sessionStorage.setItem('access_token', response.access_token);
                } else {
                    Swal.fire({
                        position: "top",
                        icon: "warning",
                        title: "Bạn không có quyền quản trị",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            } else {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: response.error,
                    showConfirmButton: false,
                    timer: 1500
                });
            }


        } catch (error) {

            if (!error.status) {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: error.error,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };


    return (
        <div className='bg-gradient-primary' style={{
            minHeight: '100vh'
        }}>
            <div className="container">
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* Nested Row within Card Body */}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"/>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Admin Back!</h1>
                                            </div>
                                            <form className="user" onSubmit={handleLogin}>
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-user"
                                                        id="exampleInputEmail"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address..."
                                                        value={email}
                                                        name={'email'}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        id="exampleInputPassword"
                                                        placeholder="Password"
                                                        name={'password'}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="customCheck"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="customCheck"
                                                        >
                                                            Remember Me
                                                        </label>
                                                    </div>
                                                </div>
                                                <button

                                                    className="btn btn-primary btn-user btn-block"
                                                >
                                                    Login
                                                </button>
                                                <hr/>
                                                <button

                                                    className="btn btn-google btn-user btn-block"
                                                >
                                                    <i className="fab fa-google fa-fw"/> Login with Google
                                                </button>
                                                <a
                                                    href="index.html"
                                                    className="btn btn-facebook btn-user btn-block"
                                                >
                                                    <i className="fab fa-facebook-f fa-fw"/> Login with
                                                    Facebook
                                                </a>
                                            </form>
                                            <hr/>
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">
                                                    Forgot Password?
                                                </a>
                                            </div>
                                            <div className="text-center">
                                                <a className="small" href="register.html">
                                                    Create an Account!
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginAdmin;