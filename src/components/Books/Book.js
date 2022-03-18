import LazyLoadImg from "../utils/LazyLoadImg";

const parse = require("html-react-parser");

const Book = (props) => {
  const { book } = props;
  if (!book) return;

  // id
  const { title, authors, description, publishedData, publisher, images } = book;

  const formattedAuthors = () => {
    if (!authors) return "Unknown";

    const authorsNumber = authors.length;
    if (authorsNumber === 1) return authors.toString();

    return authors.join(", ");
  };

  return (
    <div className="row mb-3 book">
      <div className="book-card text-center col-md-12">
        {images && images.thumbnail && (
          <div className="illustration p-3 m-auto" style={{ width: "300px" }}>
            <LazyLoadImg
              image={{
                alt: "Img cover",
                src: images.thumbnail,
                class: "card-img-top col-md-12",
              }}
            />
          </div>
        )}
        <div className="book-info row">
          <h5>{title}</h5>

          <div>
            <p className="text-muted">{formattedAuthors()}</p>
            <p className="text-muted">
              {publishedData} ({publisher})
            </p>
          </div>
          <div>{parse(`${description}`)}</div>
        </div>
      </div>
    </div>
  );
};

export default Book;
