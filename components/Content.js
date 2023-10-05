import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  '@media (max-width: 480px)': {
    root: {
      '& h2': {
        fontSize: 18,
      },
    },
  },
  root: {
    marginBottom: 40,
  },
});

function Content({ children: description, title }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>{title}</h2>
      {typeof description === 'string' ? <p>{description}</p> : description}
    </div>
  );
}

Content.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  title: PropTypes.string,
};

Content.defaultProps = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id et laboriosam nesciunt quasi laudantium dignissimos sint exercitationem. Sit vel minima consectetur obcaecati, iste eos. Unde quasi vel deserunt quo sint?',
  title: 'Lorem.',
};

export default Content;
