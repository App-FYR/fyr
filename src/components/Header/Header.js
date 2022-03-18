import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const HeaderBlock = props => {
  return (
    <header>
      <div className="px-3 py-2 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
              FindYourReviews
            </a>

            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <Link to='/' className='nav-link text-secondary'>Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

const Header = props => {
  return ReactDOM.createPortal(
    <HeaderBlock />,
    document.getElementById('header-root')
  )
};

export default Header;