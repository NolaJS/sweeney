import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Carousel, CarouselItem } from 'reactstrap';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    '&:active, &:focus': {
      outline: 0,
    },
    '&:first-child': {
      marginLeft: 0,
    },
    border: 0,
    borderRadius: 0,
    boxShadow: '1px 1px 20px 0px rgba(0,0,0,0.4)',
    margin: [10, 4],
    padding: 0,
  },
  img: {
    maxHeight: 600,
    maxWidth: '100%',
    minHeight: 400,
    objectFit: 'contain',
  },
  imgSmall: {
    height: 70,
    objectFit: 'cover',
    width: 70,
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
});

const AppCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const classes = useStyles();

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
      <Carousel className={classes.root} activeIndex={activeIndex} interval={false}>
        {slides}
      </Carousel>
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
  );
};

AppCarousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default AppCarousel;
