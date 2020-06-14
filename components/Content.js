import PropTypes from 'prop-types';

const Content = ({ title, description }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

Content.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

Content.defaultProps = {
  title: 'Lorem.',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id et laboriosam nesciunt quasi laudantium dignissimos sint exercitationem. Sit vel minima consectetur obcaecati, iste eos. Unde quasi vel deserunt quo sint?',
};

export default Content;
