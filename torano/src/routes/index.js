import React, { lazy } from "react";
const Home = lazy(() => import("../views/Home.js"));
const Collections = lazy(() => import("../views/Collections"));
const ProductDetails = lazy(() => import("../views/ProductDetails"));
const Login = lazy(() => import("../views/Login"));
const Register = lazy(() => import("../views/Register"));
const Cart = lazy(() => import("../views/Cart"));
const Payment = lazy(() => import("../views/Payment"));
const routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/collections/:codeParams",
    element: Collections,
  },
  {
    path: "/account/login",
    element: Login,
  },
  {
    path: "/account/register",
    element: Register,
  },
  {
    path: "/product/:id",
    element: ProductDetails,
  },
  {
    path: "/cart",
    element: Cart,
  }
];
export default routes;
