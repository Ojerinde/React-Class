import Book from "./Book";

const Books = () => {
  const books = [1, 2, 3, 4, 5];
  return (
    <ul className="book__lists">
      {books.map((num) => (
        <Book number={num} key={num} />
      ))}
    </ul>
  );
};
export default Books;
