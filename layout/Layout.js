import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Header from './Header';
import Footer from './Footer';

const useStyles = createUseStyles({
  root: {
    paddingBottom: 30,
  },
});

function Layout({ children }) {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.root}>{children}</div>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
