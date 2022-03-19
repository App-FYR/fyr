import { Link } from "react-router-dom";
import LazyLoadImg from "../utils/LazyLoadImg";

const BooksList = props => {
  const { books } = props;

  if (books.items.length === 0) return <p>No books found.</p>;

  const formattedAuthors = book => {
    if (!book.authors) return "Unknown";

    const authorsNumber = book.authors.length;
    if (authorsNumber === 1) return book.authors.toString();

    return book.authors.join(", ");
  };

  const BookItem = (book, i) => {
    if (!book) return;

    return (
      <div className="col-md-3 mb-3 book" key={`${book.id}${i}`}>
        <div className="book-card card text-center">
          {book.images && book.images.thumbnail && (
            <div className="illustration p-3">
              <LazyLoadImg
                image={{
                  alt: "Img cover",
                  src: book.images.thumbnail,
                  class: "card-img-top",
                }}
              />
            </div>
          )}
          <div className="book-info card-body">
            <h5 className="card-title">{book.title}</h5>

            <div className="card-text">
              <p className="text-muted">{formattedAuthors(book)}</p>
            </div>
            <div className="book-button-action">
              <Link
                to={`https://app-fyr.github.io/books/${book.id}`}
                rel="noreferrer"
                target="_blank"
                className="btn btn-sm btn-primary"
              >
                More...
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return books.items.map((book, i) => {
    return BookItem(book, i);
  });
};

export default BooksList;
