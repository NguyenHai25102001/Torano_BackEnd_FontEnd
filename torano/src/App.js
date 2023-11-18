import React, { Suspense } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/grid';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import "./scss/styles.scss";
const DefaultLayout = React.lazy(() => import("./layout/DefautltLayout"));
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">Loading.....</div>
  </div>
);
function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <DefaultLayout />,
    },
  ]);
  return (
    <div className="">
      <Suspense fallback={loading}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
