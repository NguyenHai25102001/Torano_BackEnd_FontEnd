import {Link} from "react-router-dom";

function Login() {
return(
    <div className='wrap-account w-100 py-5'>
      <div className="container">
          <div className="col-md-5 col-12 m-auto p-2">
              <div className="tab-form-account d-flex align-items-center justify-content-center">
                  <h4 className={'active'}><Link to={'#'}>Đăng nhập</Link></h4>
                  <h4><Link to={'/account/register'}>Đăng ký </Link></h4>
              </div>
              <form action="" method={'post'}>
                  <div className="mt-5">
                      <input type="text" className='form-control ' placeholder='Vui lòng nhập email của bạn' name='email' value={''}/>
                      <input type="text" className='form-control ' placeholder='Vui lòng nhập mật khẩu' name='email' value={''}/>
                      <div className="d-flex">
                          <button className='btn btn-dark'>Đăng nhập</button>
                          <div className="ms-3">
                              <div>Bạn chưa có tài khoản?<Link to={''} className='text-primary ms-2 text-decoration-underline'>Đăng kí</Link></div>
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
export default Login;