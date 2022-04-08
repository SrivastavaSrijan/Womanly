/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Post } from '@prisma/client';
import cx from 'classnames';
import { uniqueId } from 'lodash';

import { Container, Spinner, Stack, Row, Col } from 'react-bootstrap';
import Card from '../components/Card';

interface IFeatures {
  prop1?: string;
  prop2?: number;
}

export const PostQueryExec = gql`
  query postQuery($isFeatured: Boolean) {
    Posts(isFeatured: $isFeatured) {
      title
      desc
      image
      link
      buttonText
      desc
    }
  }
`;
function Features({ prop1, prop2 }: IFeatures) {
  const [featureCards, setFeatureCards] = useState([<span />]);
  const {
    data,
    loading: isLoading,
    error,
  } = useQuery(PostQueryExec, {
    variables: { isFeatured: true },
  });

  useEffect(() => {
    if (!isLoading && !error && data) {
      const cardsFetched = (data?.Posts as Post[]) ?? [];
      const cardsToRender = cardsFetched
        .map(({ title, desc, image, link, buttonText }) => (
          <Col
            className="m-2"
            lg={3}
            key={uniqueId('feature_card_')}
          >
            <Card
              cardTitle={title}
              width="100%"
              imageSrc={image}
              cardText={desc}
              link={link}
              buttonText={buttonText}
            />
          </Col>
        ));
      setFeatureCards(cardsToRender);
    } else if (isLoading) {
      const loadingJSX = (
        <Spinner
          animation="border"
          role="status"
          className="position-relative start-50"
          key={uniqueId('loader_')}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
      setFeatureCards([loadingJSX]);
    } else {
      setFeatureCards([<p key={uniqueId('failure_')}>Failed to fetch</p>]);
    }
  }, [isLoading, error, data]);

  return (
    <Container className="mt-3 px-lg-0 px-xs-4" fluid="md">
      <Stack gap={1} className="mt-3">
        <h2 className="display-3">Our Offerings</h2>
      </Stack>
      <Row className={cx([isLoading && 'justify-content-center w-100', 'my-4', 'justify-content-lg-start', 'justify-content-center'])} direction="horizontal">
        {featureCards}
      </Row>
    </Container>
  );
}

Features.defaultProps = {
  prop1: '',
  prop2: -1,
};
export default Features;
