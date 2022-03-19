import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <div>This page do not exist.</div>
      <Link className="btn btn-primary" to="https://app-fyr.github.io/home">
        Return to the home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
