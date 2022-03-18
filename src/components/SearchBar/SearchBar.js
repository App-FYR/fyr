import { useEffect, useState, useRef } from "react";
import { Alert } from "react-bootstrap";

const SearchBar = props => {
  const { buttonDisabled, onSearchChange, requestError } = props;

  const queryInputRef  = useRef();
  const authorsInputRef  = useRef();

  const [querySearch, setQuerySearch] = useState('');
  const [authorsSearch, setAuthorsSearch] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Focus query on load
  useEffect(() => { queryInputRef.current.focus(); }, []);

  useEffect(() => {
    if (querySearch.length > 0 || authorsSearch.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [querySearch, authorsSearch]);

  const onQueryChangeHandler = e => {
    setQuerySearch(e.target.value);
  }

  const onAuthorsChangeHandler = e => {
    setAuthorsSearch(e.target.value);
  }

  const onSubmitHandler = e => {
    e.preventDefault();

    onSearchChange({
      query: queryInputRef.current.value,
      authors: authorsInputRef.current.value,
    });

    setQuerySearch('');
    setAuthorsSearch('');

    // Focus query on submit
    queryInputRef.current.focus();
  };

  const formStyle = { border: "solid 1px #eee", borderRadius: "5px", backgroundColor: "#eee" };

  return <>
    <form className='mt-3 mb-4 row p-2' style={formStyle} onSubmit={onSubmitHandler}>
      {requestError && (
        <Alert variant='danger' className="text-center d-flex justify-content-center">
          <p className="mb-0">{requestError.message}</p>
        </Alert>
      )}
      <Alert variant='light' className="text-center d-flex justify-content-center">
        <p className="mb-0">Please, fill at least one of the following input to search a book.</p>
      </Alert>

      <div className="mb-3 mt-2 col-md-12">
        <input
          type="search"
          className="form-control"
          placeholder='Search...'
          onChange={onQueryChangeHandler}
          value={querySearch}
          aria-label='Query search input'
          ref={queryInputRef}
        />
      </div>

      <div className="mb-3 col-md-12">
        <input
          type="search"
          className="form-control"
          placeholder='Authors'
          onChange={onAuthorsChangeHandler}
          value={authorsSearch}
          aria-label='Authors search input'
          ref={authorsInputRef}
        />
      </div>

      <div className="col-md-12 mt-2 mb-2">
        <button
          type="submit"
          className={`btn btn-primary col-md-12 text-center ${(buttonDisabled || !isFormValid) && 'disabled'}`}
          onClick={onSubmitHandler}>
            Search
        </button>
      </div>
    </form>
  </>;
};

export default SearchBar;