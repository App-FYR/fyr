import LazyLoadImg from '../utils/LazyLoadImg';
import './Book.scss';

const BookItem = props => {
  const { book } = props;

  if (!book.volumeInfo) return;

  const formattedAuthors = () => {
    if (!book.volumeInfo.authors) return 'Unknown';

    const authorsNumber = book.volumeInfo.authors.length;
    if (authorsNumber === 1) return book.volumeInfo.authors.toString();

    return book.volumeInfo.authors.join(", ");
  };

  return (
    <div className="col-md-3 mb-3 book">
      <div className="book-card card text-center">
        {book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
          <div className="illustration p-3">
            <LazyLoadImg
              image={{
                alt: 'Img cover',
                src: book.volumeInfo.imageLinks.thumbnail,
                class: 'card-img-top'
              }}
            />
          </div>
        )}
        <div className="book-info card-body">
          <h5 className="card-title">{book.volumeInfo.title}</h5>

          <div className="card-text">
            <p className="text-muted">{formattedAuthors()}</p>
          </div>
          <div className='book-button-action'>
            <button href={book.volumeInfo.previewLink} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Learn more...</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;