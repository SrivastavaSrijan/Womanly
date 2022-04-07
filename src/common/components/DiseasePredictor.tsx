import { useLazyQuery } from '@apollo/client';
import { gql } from 'apollo-server-micro';
import { uniqueId, orderBy, curry } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Stack, Spinner, Accordion, Toast } from 'react-bootstrap';
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
      const { length } = listFetched;
      if (length === 0 || length >= 25) {
        setList(
          <Toast className="w-100">
            <Toast.Header>
              <strong className="me-auto">Try again?</strong>
            </Toast.Header>
            <Toast.Body>
              {length === 0
                ? 'No diseases matching your symptoms found.'
                : 'Too many results! Try adding more symptoms.'}
            </Toast.Body>
          </Toast>,
        );
      } else {
        const orderedList = orderBy(listFetched, [({ diseaseName }) => diseaseName.toLowerCase()], ['asc']);
        listToRender = orderedList
          .map(({ diseaseName }, index) => (
            <Disease
              key={uniqueId('disease_')}
              diseaseName={diseaseName}
              index={index}
            />
          ));
        const finalAccordion = (
          <Accordion className="d-flex vh-25 flex-column overflow-auto" style={{ height: '50vh' }}>
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
