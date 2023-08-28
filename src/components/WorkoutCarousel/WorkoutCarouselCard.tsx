import { PropsWithChildren, useEffect } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import Card from "../Card/Card";

type Props = {
  title: string;
  subtitle: string;
  isActive?: boolean;
  progress?: number;
};

const WorkoutCarouselCard = (props: PropsWithChildren<Props>) => {
  const { title, subtitle, isActive, progress } = props;

  return (
    <Card isCarousel className={isActive ? "active" : ""}>
      <h5 className="ms-4 mt-4">{title}</h5>
      <p className="ms-4">{subtitle}</p>
      <Row className="pe-3">
        <Col xs={6}></Col>
        <Col xs={6}>
          <Row>
            <Col xs={7}>Progress </Col>
            <Col xs={5}>{progress}%</Col>
          </Row>
          {isActive && <ProgressBar style={{ height: "9px" }} now={progress} />}
        </Col>
      </Row>
    </Card>
  );
};

export default WorkoutCarouselCard;
