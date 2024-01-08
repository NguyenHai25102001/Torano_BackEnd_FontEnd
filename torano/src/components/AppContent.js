import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "../routes/index";
import LoadingComponent from "./LoadingComponent";



function AppContent() {
  return (
    <div className="App">
      <Suspense fallback={<LoadingComponent/>}>
        <Routes>
          {routes.map((route, idx) => (
            <Route
              key={idx}
              path={route.path}
              element={<route.element />} // Change this line
            />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
}

export default AppContent;
