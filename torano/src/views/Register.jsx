import {Link} from "react-router-dom";

function Register() {
return(
    <div className='wrap-account w-100 py-5'>
        <div className="container">
            <div className="col-md-5 col-12 m-auto p-2">
                <div className="tab-form-account d-flex align-items-center justify-content-center">
                    <h4 ><Link to={'/account/login'}>Đăng nhập</Link></h4>
                    <h4><Link to={'/account/register'} className={'active'}>Đăng ký </Link></h4>
                </div>
                <form action="" method={'post'}>
                    <div className="mt-5">
                        <input type="text" className='form-control' placeholder='Vui lòng nhập họ và tên' name='name' value={''}/>
                        
                        <div className="gender d-flex">


                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="flexRadioDefault1"
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Nam
                                    </label>
                                </div>
                                <div className="form-check ms-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="flexRadioDefault2"
                                        defaultChecked=""
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                       Nữ
                                    </label>
                                </div>
                        </div>
                        <input type="date" className='form-control '  name='date' value={''}/>
                        <input type="text" className='form-control ' placeholder='Vui lòng nhập email' name='email' value={''}/>
                        <input type="text" className='form-control ' placeholder='Vui lòng nhập mật khẩu' name='password' value={''}/>

                        <div className="d-flex">
                            <button className='btn btn-dark'>Đăng ký</button>
                            <div className="ms-3">
                                <div>Bạn đã có tài khoản?</div>
                                <div>Bạn quên mật khẩu?<Link to={''} className='text-primary ms-2 text-decoration-underline'>Quên mật khẩu</Link></div>
                            </div>
                        </div>

                    </div>
                </form>


            </div>
        </div>
    </div>
)
}
export default Register;


