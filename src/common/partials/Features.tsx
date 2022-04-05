import React from 'react';
import { gql, useQuery } from '@apollo/client';
import cx from 'classnames';

import { Container, Spinner, Stack } from 'react-bootstrap';
import { Card } from '../components/Card';
import { Post } from '@prisma/client';

interface Features {
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
const Features: React.FC<Features> = ({ prop1, prop2 }) => {
  const {
    data,
    loading: isLoading,
    error
  } = useQuery(PostQueryExec, {
    variables: { isFeatured: true }
  });
  return (
    <Container>
      <Stack gap={1} className="mt-3">
        <h2 className="display-5">Our Offerings</h2>
      </Stack>
      <Stack
        gap={4}
        className={cx([isLoading && 'justify-content-center w-100', 'mt-4'])}
        direction="horizontal"
      >
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          ((data?.Posts ?? []) as Post[]).map(
            ({ title, desc, image, link, buttonText }) => (
              <Card
                cardTitle={title}
                imageSrc={image}
                cardText={desc}
                link={link}
                buttonText={buttonText}
              />
            )
          )
        )}
      </Stack>
    </Container>
  );
};

export default Features;
