import { Route, Routes } from "react-router-dom";
import BookDetails from "./BookDetails";
import Books from "./Books";

const BooksHome = (props) => {
  return (
    <>
      <Routes>
        <Route path="" element={<Books />} /> {/* /books */}
        <Route path=":book_id" element={<BookDetails />} /> {/* /books/anyId */}
      </Routes>
    </>
  );
};
export default BooksHome;
