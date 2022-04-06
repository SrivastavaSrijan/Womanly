/* eslint-disable react/function-component-definition */
import React, { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { gql } from 'apollo-server-micro';
import { debounce } from 'lodash';
import { NextPage } from 'next';
import { Button, Col, Container, Row, Stack, Spinner } from 'react-bootstrap';
import { Form } from 'react-bootstrap-formik';
import * as yup from 'yup';

import { List } from '@prisma/client';
import CustomImage from '../common/components/CustomImage';

interface ISymptomChecker {
  prop1?: string;
}

export const SymptomTypeaheadQuery = gql`
  query symptomTypeahead($searchString: String!) {
    SymptomTypeahead(searchString: $searchString) {
      payload
    }
  }
`;

const SymptomChecker: NextPage<ISymptomChecker> = ({ prop1 }: ISymptomChecker) => {
  const [suggestions,
    { called: isCalled, loading: isLoading, error, data }] = useLazyQuery(SymptomTypeaheadQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const findTypeahead = useCallback(debounce(suggestions, 1000), []);

  const [list, setList] = useState(
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>,
  );
  useEffect(() => {
    const renderElement = () => {
      if (!isCalled) {
        return (<span />);
      } if (isLoading) {
        return (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        );
      } if (error) {
        return (<p>Failed to fetch</p>);
      }
      const listToRender = (data?.SymptomTypeahead as List).payload;
      if (listToRender.length === 0) {
        return (<span />);
      }
      return (
        <datalist id="datalistOptions">
          {listToRender.map((suggestion, i) => (
            <option value={suggestion} selected={i === 0}>
              {suggestion}
            </option>
          ))}
        </datalist>
      );
    };
    setList(renderElement());
  }, [isLoading, error, isCalled, data]);

  return (
    <Container fluid className="pt-5 mx-0 bg-muted">
      <Row gap={5} className="w-100 justify-content-evenly">
        <Col lg={6}>
          <Stack>
            <h1>Consult with a Doctor</h1>
            <p>Use the Symptom Checker to find out what&lsquo;s causing your symptom</p>
            <Form
              initialValues={{
                symptomList: '',
              }}
              onSubmit={console.log}
              validationSchema={yup.object({
                symptomList: yup.string().min(4, 'Min. 4 characters'),
              })}
            >
              <Form.Input
                name="symptomList"
                list="datalistOptions"
                onChange={({ target: { value } }) => (value !== '' && value.length > 3 ? findTypeahead({ variables: { searchString: value } }) : false)}
                label="Tell us your symptom or health problem"
                placeholder="Eg. fever, headache"
              />
              {list}
              <Button type="submit" className="mt-3">
                Continue
              </Button>
            </Form>
          </Stack>
        </Col>
        <Col lg={3}>
          <CustomImage classNames="img-fluid" path="/images/consult.webp" />
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
