import React, { useCallback, useState } from "react";
import { Alert } from "react-bootstrap";

import BooksList from "../components/Books/BooksList";
import SearchBar from "../components/SearchBar/SearchBar";
import Loader from "../components/utils/Loader";

import useHttp from "../hook/use-http";
import { getBooksByQuery } from "../lib/api";

const HomePage = () => {
  const [search, setSearch] = useState({});
  const { sendRequest, status, data: books, error } = useHttp(getBooksByQuery);

  const formattedSearchTerms = useCallback(userSearch => {
    const { query, authors } = userSearch;

    let search = `q=${query.replaceAll(" ", "+")}`;
    if (authors) search = `${search}+inauthor:${authors.replaceAll(" ", "+")}`;

    return search;
  }, []);

  const onSearchHandler = userSearch => {
    setSearch(userSearch);
    const query = formattedSearchTerms(userSearch);

    sendRequest(query);
  };

  const booksList = () => {
    if (status === "pending") return <Loader classes="text-center" altText="Loading results..." />;

    if (status === "completed" && error) {
      return (
        <Alert variant="info" className="text-center d-flex justify-content-center">
          <p className="mb-0">{error}</p>
        </Alert>
      );
    }

    if (!books || books.length === 0)
      return (
        <Alert variant="info" className="text-center d-flex justify-content-center">
          <p className="mb-0">No results.</p>
        </Alert>
      );

    return <BooksList books={books} />;
  };

  return (
    <main>
      <SearchBar
        onSearchChange={onSearchHandler}
        buttonDisabled={status === "pending"}
        requestError={error}
      />
      <div className="row">
        {search.length > 0 && (
          <Alert variant="info" className="text-center d-flex justify-content-center">
            <p className="mb-0">
              Results for : {search.query} {search.authors.length > 0 && `by ${search.authors}`}
            </p>
          </Alert>
        )}
        {booksList()}
      </div>
    </main>
  );
};

export default HomePage;
