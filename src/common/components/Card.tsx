import React from 'react';
import Link from 'next/link';
import { Card as BootstrapCard, Button } from 'react-bootstrap';
import CustomImage from './CustomImage';

interface Card {
  cardTitle: string;
  width?: string;
  imageSrc?: string;
  cardText?: string;
  link?: string;
  buttonText?: string;
}

export const Card: React.FC<Card> = ({
  cardTitle,
  width = '18rem',
  imageSrc = null,
  cardText = `
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio repellat facilis sint explicabo vitae, eum veniam rerum iste molestiae sit nisi reprehenderit ullam odio expedita perferendis iusto quo ratione incidunt.`,
  link = './',
  buttonText = 'Check it out'
}) => {
  return (
    <BootstrapCard style={{ width: width, maxHeight: '20rem' }}>
      {imageSrc && <CustomImage path={imageSrc} size={300} />}
      <BootstrapCard.Body>
        <BootstrapCard.Title>{cardTitle}</BootstrapCard.Title>
        <BootstrapCard.Text className="text-truncate">
          {cardText}
        </BootstrapCard.Text>
        <Link href={link}>
          <Button variant="secondary" className="btn-md">
            {buttonText}
          </Button>
        </Link>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};
