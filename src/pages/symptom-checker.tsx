/* eslint-disable react/function-component-definition */
import { NextPage } from 'next';
import React from 'react';
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import CustomImage from '../common/components/CustomImage';
import FormControl from '../common/components/FormControl';

interface ISymptomChecker {
  prop1?: string;
}
const SymptomChecker: NextPage<ISymptomChecker> = ({
  prop1,
}: ISymptomChecker) => (
  <Container fluid className="pt-5 mx-0 bg-muted">
    <Row gap={5} className="w-100 justify-content-evenly">
      <Col lg={6}>
        <Form>
          <Stack>
            <h1>Consult with a Doctor</h1>
            <p>
              Use the Symptom Checker to find out what&lsquo;s causing your
              symptom
            </p>
            <p>Tell us your symptom or health problem</p>

            <FormControl
              label="Eg: fever, headache"
              modifier="symptoms"
              placeholder="fever, headache"
              helpText="Choose the most appropriate option from the dropdown (min. 3 letters)"
            />
            <Button>Continue</Button>
          </Stack>
        </Form>
      </Col>
      <Col lg={3}>
        <CustomImage classNames="img-fluid" path="/images/consult.webp" />
      </Col>
    </Row>
    <Row />
  </Container>
);

SymptomChecker.defaultProps = {
  prop1: '',
};
export default SymptomChecker;
