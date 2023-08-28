import React, { PropsWithChildren } from "react";
import "./card.scss";

type Props = { isCarousel?: boolean; className?: string };

const Card = (props: PropsWithChildren<Props>) => {
  const { children, isCarousel, className } = props;

  return (
    <div className={`card ${isCarousel && "carousel"} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
