import { useLocation, useNavigate } from "react-router-dom";

const Book = ({ number }) => {
  const { pathname } = useLocation(); // /books

  // Navigate to the current path with the id of the book
  const navigate = useNavigate();

  return (
    <>
      <li
        className="book__item"
        onClick={() => navigate(`${pathname}/${number}`)} // /books/anyId
      >
        Book {number} 
      </li>
    </>
  );
};
export default Book;
