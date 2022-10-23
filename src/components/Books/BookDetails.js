import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { book_id } = useParams();
  
  const books = [1, 2, 3, 4, 5];

  const book = books.find((book) => book === Number(book_id));
  
  return <div className="book__details">This is book {book}</div>;
};
export default BookDetails;
