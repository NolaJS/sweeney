import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Carousel, CarouselItem } from 'reactstrap';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    '&:active, &:focus': {
      outline: 0,
    },
    '@media (max-width: 480px)': {
      boxShadow: '1px 1px 8px 0px rgba(0,0,0,0.4)',
      margin: [0, 10],
    },
    border: 0,
    borderRadius: 0,
    boxShadow: '1px 1px 20px 0px rgba(0,0,0,0.4)',
    height: 68,
    margin: [10, 4],
    maxWidth: 68,
    minWidth: 68,
    padding: 0,
    textAlign: 'center',
  },
  img: {
    '@media (max-width: 480px)': {
      maxHeight: 400,
    },
    maxHeight: 600,
    maxWidth: '100%',
    minHeight: 400,
    objectFit: 'contain',
  },
  imgSmall: {
    height: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
  },
  instructions: {
    '& span': {
      '@media (max-width: 480px)': {
        display: 'block',
        marginBottom: 10,
      },
      display: 'none',
    },
    marginTop: 10,
    textAlign: 'center',
  },
  root: {
    boxShadow: '1px 1px 8px 0px rgba(0,0,0,0.1)',
  },
  slider: {
    textAlign: 'center',
  },
  text: {
    textShadow: '1px 1px #000',
  },
  thumbnailContainer: {
    '@media (max-width: 480px)': {
      display: 'flex',
      overflow: 'auto',
    },
    textAlign: 'center',
  },
});

const AppCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const classes = useStyles();

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = useMemo(
    () =>
      items &&
      items.map(item => {
        return (
          <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.src}
            className={classes.slider}
          >
            <img src={item.src} alt={item.altText} className={classes.img} />
          </CarouselItem>
        );
      }),
    [items, classes],
  );

  return (
    <div>
      <Carousel
        className={classes.root}
        activeIndex={activeIndex}
        interval={false}
        next={next}
        previous={previous}
      >
        {slides}
      </Carousel>
      <div className={classes.instructions}>
        Click on image to view. <span>Images below are scrollable.</span>
      </div>
      <div className={classes.thumbnailContainer}>
        {items.map((item, i) => (
          <button
            className={classes.button}
            type="button"
            key={`small-img-${item.src}`}
            onClick={e => {
              e.preventDefault();
              if (animating) return;
              setActiveIndex(i);
            }}
            disabled={animating}
          >
            <img src={item.src} alt={item.altText} className={classes.imgSmall} />
          </button>
        ))}
      </div>
    </div>
  );
};

AppCarousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default AppCarousel;
