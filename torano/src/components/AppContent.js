import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "../routes/index";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">Loading.....</div>
  </div>
);

function AppContent() {
  return (
    <div className="App">
      <Suspense fallback={loading}>
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
