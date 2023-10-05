import PropTypes from 'prop-types';
import { Jumbotron } from 'reactstrap';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

const useStyles = createUseStyles({
  img: {
    '@media (min-width: 1000px)': {
      objectPosition: '50% 55%',
    },
    filter: 'brightness(0.7)',
    height: '100%',
    left: 0,
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: -1,
  },
  root: {
    '& h1': {
      textShadow: '1px 1px #000',
    },
    backgroundColor: 'transparent',
    position: 'relative',
  },
});

function PageHead({ img, title }) {
  const classes = useStyles();
  return (
    <Jumbotron className={classnames('text-white', classes.root)}>
      <img className={classes.img} src={img} alt={`${title} - splash of work`} />
      <h1 className="display-3 text-center">{title}</h1>
    </Jumbotron>
  );
}

PageHead.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PageHead;
