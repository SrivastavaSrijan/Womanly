/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import cx from 'classnames';

import CustomImage from '../common/components/CustomImage';
import SymptomTypeahead from '../common/components/SymptomTypeahead';
import DiseasePredictor from '../common/components/DiseasePredictor';

interface ISymptomChecker {
  prop1?: string;
}

const SymptomChecker: NextPage<ISymptomChecker> = ({ prop1 }: ISymptomChecker) => {
  const [symptomSelected, setSymptomSelected] = useState([] as string[]);
  const [showingDisease, predictDisease] = useState(false);
  const handleSubmit = (payload: string[]) => setSymptomSelected(payload);

  return (
    <Container fluid className="py-5 mx-0 bg-muted">
      <Container>
        <Row className="mb-2">
          <Stack className="border-start border-3 border-primary mb-3">
            <h1 className="display-2 ms-lg-3">Symptom Checker</h1>
            <h6 className="px-lg-3 fw-light text-wrap ms-lg-3">Use the Symptom Checker to find out what&lsquo;s causing your symptom.</h6>
          </Stack>
        </Row>
        <Row gap={2} className="w-100 justify-content-center">
          <Col lg={6}>
            <Stack className="px-lg--3">
              <h4>
                <span className="text-primary">1. </span>
                Submit your symptoms
              </h4>
              <p>
                <small>
                  Choose what symptoms best describe what
                  you&lsquo;re feeling from our list of over 2000+ symptoms
                </small>
              </p>
              <SymptomTypeahead
                handleSubmit={handleSubmit}
                predictDisease={predictDisease}
                showingDisease={showingDisease}
              />
            </Stack>
          </Col>
          <Col
            lg={6}
            className="border-start-xs-0 my-lg-n2 my-5"
          >
            <Stack className="px-lg-3">
              <h4>
                <span className="text-primary">2. </span>
                Get a list of probable diseases
              </h4>
              <p>
                <small>
                  From our database, we will find the most probable ailment you&lsquo;re suffering.
                </small>
              </p>
              <Col lg={6} xs={12} className={cx(showingDisease ? 'w-100 h-25' : 'mx-auto')}>
                {showingDisease ? <DiseasePredictor symptomList={symptomSelected} />
                  : <CustomImage classNames="img-fluid" path="/images/consult.webp" />}
              </Col>
            </Stack>
          </Col>
        </Row>
        <Row />
      </Container>
    </Container>
  );
};

SymptomChecker.defaultProps = {
  prop1: '',
};
export default SymptomChecker;
