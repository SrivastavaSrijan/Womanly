/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { gql } from 'apollo-server-micro';
import { uniqueId } from 'lodash';
import { List } from '@prisma/client';
import { NextPage } from 'next';
import { Col, Container, Row, Stack } from 'react-bootstrap';

import CustomImage from '../common/components/CustomImage';
import SymptomTypeahead from '../common/components/SymptomTypeahead';

interface ISymptomChecker {
  prop1?: string;
}

const SymptomChecker: NextPage<ISymptomChecker> = ({ prop1 }: ISymptomChecker) => {
  const [symptomSelected, setSymptomSelected] = useState([] as string[]);
  const handleSubmit = (payload: string[]) => setSymptomSelected(payload);
  return (
    <Container fluid className="py-5 mx-0 bg-muted">
      <Row gap={2} className="w-100 justify-content-center">
        <Col lg={5}>
          <Stack className="px-3">
            <h1>Consult with a Doctor</h1>
            <p>Use the Symptom Checker to find out what&lsquo;s causing your symptom</p>
            <SymptomTypeahead handleSubmit={handleSubmit} />
          </Stack>
        </Col>
        <Col lg={4} className="border-sm-0 border-start border-primary border-3">
          <CustomImage classNames="img-fluid pl-3" path="/images/consult.webp" />
        </Col>
      </Row>
      <Row />
    </Container>
  );
};

SymptomChecker.defaultProps = {
  prop1: '',
};
export default SymptomChecker;
