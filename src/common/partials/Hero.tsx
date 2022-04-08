import Link from 'next/dist/client/link';
import React from 'react';
import { Button, Col, Row, Stack } from 'react-bootstrap';
import CustomImage from '../components/CustomImage';

interface IHero {
  prop1?: string;
}

function Hero({ prop1 }: IHero) {
  return (
    <Row className="justify-content-md-center bg-muted mx-0 pb-3">
      <Col lg={6}>
        <Stack
          gap={1}
          className="mt-5 text-center text-md-start"
        >
          <h2 className="display-6">Skip the judgement.</h2>
          <h1 className="display-1 mt-n1 lh-1">Welcome to Womanly!</h1>
          <Stack className="px-3 mt-3">
            <Stack gap={2} className="w-75 mx-xs-auto mx-lg-0">
              <p>
                Full-stack healthcare platform for women &mdash;
                track your periods, use your symptom checker, and save your vitals.
              </p>
              <Link href="api/auth/login">
                <Button variant="primary" className="btn-lg">
                  Login to Womanly
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Col>
      <Col lg={5}>
        <CustomImage path="/images/hero-image.svg" classNames="img-fluid" />
      </Col>
    </Row>
  );
}

Hero.defaultProps = {
  prop1: '',
};
export default Hero;
