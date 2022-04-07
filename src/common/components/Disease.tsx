import React, { MouseEvent, useState } from 'react';
import { CurriedFunction1, find } from 'lodash';
import { Accordion, Spinner } from 'react-bootstrap';

import { IWikipedia } from '../types/types';

const WIKIPEDIA_API = (
  title: string,
) => `https://en.wikipedia.org/w/api.php?action=query&&redirects=1&format=json&prop=extracts&titles=${title}&formatversion=2&exsentences=4&exlimit=1&exintro=1&explaintext=1`;

interface IDisease {
  diseaseName: string;
  index: number;
}

function Disease({
  diseaseName,
  index,
}: IDisease) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const handleClick = (ev: MouseEvent) => {
    const isExpanded = (
      (ev?.target as HTMLElement)
        .firstChild as HTMLElement)?.ariaExpanded ?? false;
    if (!isExpanded && data === '') {
      const endpoint = WIKIPEDIA_API(diseaseName);
      setLoading(true);
      fetch(endpoint)
        .then((res) => res.json())
        .then((res: IWikipedia) => {
          const hasRedirects = Array.isArray(res.query?.redirects);
          let name = diseaseName;
          if (hasRedirects) {
            name = find(
              res.query?.redirects,
              (query) => query.from === diseaseName,
            )?.to ?? name;
          }
          const text = find(
            res.query.pages,
            (val) => val.title === name,
          )?.extract ?? '';
          setData(text === '' ? 'No information found!' : text);
        })
        .then(() => setLoading(false))
        .catch((err) => {
          setData('No information found!');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  return (
    <Accordion.Item eventKey={index.toString()}>
      <Accordion.Header onClick={handleClick}>{diseaseName}</Accordion.Header>
      <Accordion.Body>
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <small className="fw-light">
            { data }
          </small>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Disease;
