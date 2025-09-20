import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./routes/home";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
