import PropTypes from 'prop-types';
import { Jumbotron } from 'reactstrap';

const PageHead = ({ title }) => {
  return (
    <Jumbotron>
      <h1 className="display-3 text-center">{title}</h1>
    </Jumbotron>
  );
};

PageHead.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHead;
