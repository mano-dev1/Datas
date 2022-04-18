import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from '../../routes/index';

function Body() {
  return (
    <div className="body">
      <div className="body-container">
        <Suspense fallback={'..loading'}>
          <BrowserRouter>
            <Routes>
              {routes.map((route, idx) => {
                return route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    name={route.name}
                    element={<route.component />} />
                )
              })}
            </Routes>
          </BrowserRouter>
        </Suspense>

      </div>
    </div>
  )
}
export default Body;