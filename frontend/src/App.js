import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./routes/userRouters";
import { Suspense, lazy } from "react";
import AdminRouter from "./routes/adminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
