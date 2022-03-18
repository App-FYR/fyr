import { Spinner } from 'react-bootstrap';

const Loader = props => {
  const { classes, altText } = props;
  
  return <div className={classes}>
  <Spinner animation="border" role="status">
    <span className="visually-hidden">{altText || 'Loading...'}</span>
  </Spinner>
</div>
};

export default Loader;