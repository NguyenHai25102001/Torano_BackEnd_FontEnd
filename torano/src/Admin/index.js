
import React, {Suspense} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../scss/admin/sb-admin-2.min.css';
import  '../scss/admin/vendor/fontawesome-free/css/all.min.css'
import $ from 'jquery';
import '../scss/admin/admin.scss'
const loading = (
    <div className="pt-3 text-center">
     <div className="sk-spinner sk-spinner-pulse">Loading.....</div>
    </div>
);
const DefaultLayoutAdmin=React.lazy(()=>import('./layout/DefaultLayout'))
function Admin() {
 return (

       <Suspense fallback={loading}>
        <Routes>
         {/* Define your routes within the Routes component */}
         <Route path="*" element={<DefaultLayoutAdmin />} />
         {/* Add more routes as needed */}
        </Routes>
       </Suspense>

 );

}
 export default Admin;