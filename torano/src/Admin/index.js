
import React, {Suspense} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../scss/admin/sb-admin-2.min.css';
import  '../scss/admin/vendor/fontawesome-free/css/all.min.css'
import $ from 'jquery';
import '../scss/admin/admin.scss'
import {AuthProvider} from "./components/authContext";
const loading = (
    <div className="pt-3 text-center">
     <div className="sk-spinner sk-spinner-pulse">Loading.....</div>
    </div>
);
const DefaultLayoutAdmin=React.lazy(()=>import('./layout/DefaultLayout'))
const LoginAdmin=React.lazy(()=>import('./view/page/LoginAdmin'))
function Admin() {
 return (

       <Suspense fallback={loading}>
           <AuthProvider>
               <Routes>
                   <Route path="/login" element={<LoginAdmin />} />

                   <Route path="*" element={<DefaultLayoutAdmin />} />
               </Routes>
           </AuthProvider>

       </Suspense>

 );

}
 export default Admin;