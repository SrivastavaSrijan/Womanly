/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { gql } from 'apollo-server-micro';
import { map, uniqueId } from 'lodash';
import { List } from '@prisma/client';
import { NextPage } from 'next';
import { Button, Stack, Form } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

interface ISymptomTypeahead {
  handleSubmit: (payload: string[]) => void;
}
interface ISuggestionList {
  label: string;
  id: string;
}

export const SYMPTOM_TYPEAHEAD = gql`
  query symptomTypeahead($searchString: String!) {
    SymptomTypeahead(searchString: $searchString) {
      payload
    }
  }
`;

const SymptomTypeahead: NextPage<ISymptomTypeahead> = ({ handleSubmit }: ISymptomTypeahead) => {
  const [invokeSearch,
    { called: isCalled, loading: hasFetched, error, data }] = useLazyQuery(SYMPTOM_TYPEAHEAD);

  const [list, setList] = useState([] as ISuggestionList[]);

  const [isLoading, setLoading] = useState(false);

  const filterBy = () => true;
  const handleSearch = (query: string) => invokeSearch(
    {
      variables: { searchString: query.toLowerCase() },
    },
  );

  const handleInputChange = (query: string) => (query === '' || query.length < 3
    ? setList([]) : false);

  const handleChange = ((selected: any[]) => handleSubmit(map(selected, 'label')));

  useEffect(() => {
    let listToRender: ISuggestionList[] = [];
    if (isCalled && !hasFetched && !error && data) {
      const listFetched = (data?.SymptomTypeahead as List)?.payload ?? [];
      listToRender = listFetched
        .map((suggestions) => ({ label: suggestions, id: uniqueId('suggestion_') }));
      setList(listToRender);
      setLoading(false);
    } else if (isCalled && isLoading) {
      setLoading(true);
      setList([]);
    }
  }, [isLoading, error, isCalled, data, hasFetched]);

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
          minLength={3}
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
      <Button type="submit" className="mt-3 w-100">
        Continue
      </Button>
    </Form.Group>

  );
};

export default SymptomTypeahead;
