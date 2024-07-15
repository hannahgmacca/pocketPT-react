import React, { PropsWithChildren } from 'react';
import './card.scss';

type Props = {
  isCarousel?: boolean;
  className?: string;
  variant: 'outlined' | 'contained' | 'outlined-ribbon';
  backgroundColor?: string;
  minHeight?: number;
};

const Card = (props: PropsWithChildren<Props>) => {
  const { children, isCarousel, className, variant } = props;

  const cardStyles = {} as React.CSSProperties;

  if (props.backgroundColor) {
    cardStyles.backgroundColor = props.backgroundColor;
  }

  return (
    <div className={`card ${isCarousel && 'carousel'} ${className} ${variant}`} style={cardStyles}>
      {variant == 'outlined-ribbon' && <div className='ribbon'></div>}
      {children}
    </div>
  );
};

export default Card;
