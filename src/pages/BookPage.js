import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Book from "../components/Books/Book";
import Loader from "../components/utils/Loader";
import useHttp from "../hook/use-http";
import { getBookById } from "../lib/api";

const BookPage = () => {
  const { bookId } = useParams();
  const { sendRequest, status, data: book, error } = useHttp(getBookById, true);

  useEffect(() => {
    sendRequest(bookId);
  }, [sendRequest, bookId]);

  if (status === "pending") return <Loader />;
  if (status === "completed" && error) return <Alert variant="danger">{error}</Alert>;

  return <Book book={book} />;
};

export default BookPage;
