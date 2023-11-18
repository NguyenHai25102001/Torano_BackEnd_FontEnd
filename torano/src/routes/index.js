import React, { lazy } from "react";
const Home = lazy(() => import("../views/Home.js"));
const Collections = lazy(() => import("../views/Collections"));
const ProductDetails = lazy(() => import("../views/ProductDetails"));
const routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/collections",
    element: Collections,
  },
  {
    path: "/product/:key",
    element: ProductDetails,
  },
];
export default routes;
