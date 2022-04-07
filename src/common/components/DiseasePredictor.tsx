import { useLazyQuery } from '@apollo/client';
import { gql } from 'apollo-server-micro';
import { uniqueId } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Container, Stack, Spinner, Accordion, Toast } from 'react-bootstrap';
import cx from 'classnames';

import Disease from './Disease';

interface IDiseasePredictor {
  symptomList: string[];
}

interface IDiseaseList {
  diseaseName: string;
}

export const DISEASE_FINDER = gql`
  query diseaseFinder($symptomList: [String]!) {
    SymptomDiseaseFinder(symptomList: $symptomList) {
      diseaseName
    }
  }
`;

function DiseasePredictor({
  symptomList,
}: IDiseasePredictor) {
  const [invokeSearch,
    { called: isCalled, loading: isFetching, error, data }] = useLazyQuery(DISEASE_FINDER);

  useEffect(() => {
    invokeSearch({ variables: { symptomList } });
  }, [symptomList, invokeSearch]);

  const [list, setList] = useState(<span />);
  useEffect(() => {
    let listToRender = [];
    if (isCalled && !isFetching && !error && data) {
      const listFetched = (data?.SymptomDiseaseFinder as IDiseaseList[]) ?? [];
      if (listFetched.length === 0) {
        setList(
          <Toast className="w-100">
            <Toast.Header>
              <strong className="me-auto">Try again?</strong>
            </Toast.Header>
            <Toast.Body>No diseases matching your symptoms found.</Toast.Body>
          </Toast>,
        );
      } else {
        listToRender = listFetched
          .map(({ diseaseName }, index) => (
            <Disease
              key={uniqueId('disease_')}
              diseaseName={diseaseName}
              index={index}
            />
          ));
        const finalAccordion = (
          <Accordion defaultActiveKey="0" className="d-flex vh-25 flex-column overflow-auto" style={{ height: '25vh' }}>
            {listToRender}
          </Accordion>
        );
        setList(finalAccordion);
      }
    } else if (isCalled && isFetching) {
      const loadingJSX = (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
      setList(loadingJSX);
    } else {
      setList(<p>Failed to fetch</p>);
    }
  }, [error, isCalled, data, isFetching]);

  return (
    <Stack className={cx([isFetching && 'w-100', 'justify-content-center'])}>
      {list}
    </Stack>
  );
}

export default DiseasePredictor;
