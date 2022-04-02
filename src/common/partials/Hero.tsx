import Link from 'next/dist/client/link';
import React from 'react';
import { Button, Col, Row, Stack } from 'react-bootstrap';
import CustomImage from '../components/CustomImage';

interface HeroProps {
  prop1?: string;
  prop2?: number;
}

const Hero: React.FC<HeroProps> = ({ prop1, prop2 }) => {
  return (
    <Row className="justify-content-md-center bg-muted mx-0">
      <Col lg={6}>
        <Stack gap={1} className="mt-5">
          <h1 className="display-3">Skip the judgement! </h1>
          <h2 className="display-6">Take Online Doctor Consultation</h2>
          <p> Private consultation + Audio call Starts at just ₹199</p>
        </Stack>
        <Stack gap={2}>
          <Link href="new-consult">
            <Button variant="primary" className="w-100 btn-lg">
              Consult Now
            </Button>
          </Link>
        </Stack>
      </Col>
      <Col lg={5}>
        <CustomImage
          path="/images/hero-image.svg"
          classNames="img-fluid"
        ></CustomImage>
      </Col>
    </Row>
  );
};

export default Hero;
