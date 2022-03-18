import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import NotFoundPage from "./pages/NotFoundPage";

const ReactRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Navigate to="/home" replace={true} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/books/:bookId" element={<BookPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default ReactRoutes;
