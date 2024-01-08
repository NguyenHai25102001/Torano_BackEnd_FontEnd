import {Link} from "react-router-dom";
import axios from "axios";
import {urlLogin} from "../Admin/components/dataApi";
import {useState} from "react";
import Swal from "sweetalert2";

function Login() {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

   const handleSubmit=async (e)=>{
       e.preventDefault();
       const data=new FormData();
       data.append('email',email);
       data.append('password',password);
       axios.post(urlLogin(),data).then((res)=>{
           console.log(res.data?.access_token)
           if(res.data?.status){
               sessionStorage.setItem('user', JSON.stringify(res.data?.user));
               sessionStorage.setItem('user_access_token', JSON.stringify(res.data?.access_token));
               window.history.back();
           }else {
               Swal.fire({
                   position: "top",
                   icon: "error",
                   title:res.data?.error,
                   showConfirmButton: false,
                   timer: 1500
               });
           }



       }).catch((e)=>{
           console.log(e.response?.data)
               Swal.fire({
                   position: "top",
                   icon: "error",
                   title: e.response?.data?.error,
                   showConfirmButton: false,
                   timer: 1500
               });
       })


   }

return(
    <div className='wrap-account w-100 py-5'>
      <div className="container">
          <div className="col-md-5 col-12 m-auto p-2">
              <div className="tab-form-account d-flex align-items-center justify-content-center">
                  <h4 className={'active'}><Link to={'#'}>Đăng nhập</Link></h4>
                  <h4><Link to={'/account/register'}>Đăng ký </Link></h4>
              </div>
              <form action="" method={'post'} onSubmit={handleSubmit}>
                  <div className="mt-5">
                      <input type="text" className='form-control '
                             placeholder='Vui lòng nhập email của bạn'
                             name='email' value={email}
                      onChange={(e)=>setEmail(e.target.value)}/>
                      <input type="password"
                             className='form-control '
                             placeholder='Vui lòng nhập mật khẩu'
                             name='email' value={password}
                      onChange={(e)=>setPassword(e.target.value)}/>
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