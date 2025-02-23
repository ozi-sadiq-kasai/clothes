import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          {/* UserLayout */}
          <Route path="/" element={<UserLayout/>}/>
        </Route>
        {/* AdminLayout */}
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
