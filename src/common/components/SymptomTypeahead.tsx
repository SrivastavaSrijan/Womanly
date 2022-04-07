import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { gql } from 'apollo-server-micro';
import { map, uniqueId, capitalize } from 'lodash';
import { List } from '@prisma/client';
import { NextPage } from 'next';
import { Button, Stack, Form } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { IList } from '../types/types';

interface ISymptomTypeahead {
  handleSubmit: (payload: string[]) => void;
  predictDisease: React.Dispatch<React.SetStateAction<boolean>>;
  showingDisease: boolean;
}

export const SYMPTOM_TYPEAHEAD = gql`
  query symptomTypeahead($searchString: String!) {
    SymptomTypeahead(searchString: $searchString) {
      payload
    }
  }
`;

function SymptomTypeahead({
  handleSubmit, predictDisease, showingDisease,
}: ISymptomTypeahead) {
  const [invokeSearch, {
    called: isCalled, loading: isFetching, error, data,
  }] = useLazyQuery(SYMPTOM_TYPEAHEAD);

  const [list, setList] = useState([] as IList[]);

  const [isLoading, setLoading] = useState(false);

  const filterBy = () => true;
  const handleSearch = (query: string) => invokeSearch(
    {
      variables: { searchString: query.toLowerCase() },
    },
  );

  const handleInputChange = (query: string) => {
    if (query.length < 2 && list.length !== 0) {
      setList([]);
    }
  };

  const handleChange = ((selected: any[]) => {
    handleSubmit(selected
      .flatMap(({ label }) => capitalize(label)));
    setList([]);
    if (selected.length === 0) {
      predictDisease(false);
    }
  });

  useEffect(() => {
    let listToRender: IList[] = [];
    if (isCalled && !isFetching && !error && data) {
      const listFetched = (data?.SymptomTypeahead as List)?.payload ?? [];
      listToRender = listFetched
        .map((suggestions) => ({ label: suggestions, id: uniqueId('suggestion_') }));
      setList(listToRender);
      setLoading(false);
    }
    setLoading(isFetching && isCalled);
  }, [isLoading, error, isCalled, data, isFetching]);

  return (

    <Form.Group>
      <Form.Label>
        Tell us your symptom or health problem
      </Form.Label>
      <Stack>
        <AsyncTypeahead
          align="left"
          filterBy={filterBy}
          id="async-filtering"
          isLoading={isLoading}
          minLength={2}
          onSearch={handleSearch}
          onInputChange={handleInputChange}
          onChange={handleChange}
          multiple
          autoFocus
          options={list}
          highlightOnlyResult
          placeholder="Eg. fever, headache"
          searchText="Looking for matching symptoms..."
        />
        <Form.Text muted>
          Min 3 characters, press enter to select
        </Form.Text>
      </Stack>
      <Button type="submit" className="mt-3 w-100" onClick={() => predictDisease(!showingDisease)}>
        Continue
      </Button>
    </Form.Group>

  );
}

export default SymptomTypeahead;
