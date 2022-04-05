import Link from 'next/dist/client/link';
import React from 'react';
import { Button, Col, Row, Stack, Card } from 'react-bootstrap';
import CustomImage from '../components/CustomImage';

interface HeroProps {
  prop1?: string;
  prop2?: number;
}

const Hero: React.FC<HeroProps> = ({ prop1, prop2 }) => {
  return (
    <Row className="justify-content-md-center bg-muted mx-0 pb-3">
      <Col lg={6}>
        <Stack gap={1} className="mt-5">
          <h2 className="display-6">Skip the judgement.</h2>
          <h1 className="display-3 mt-n1 lh-1">Welcome to Womanly!</h1>
          <Stack className="px-3 mt-3">
            <p>
              Full-stack healthcare platform for women &mdash; track your
              periods, use your symptom checker, and save your vitals.
            </p>
            <Stack gap={4} className="w-75">
              <Link href="auth-user">
                <Button variant="primary" className="btn-md">
                  Login to Womanly
                </Button>
              </Link>
            </Stack>
          </Stack>
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
