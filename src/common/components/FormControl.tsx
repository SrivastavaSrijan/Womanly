import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

interface FormControlProps {
  label: string;
  placeholder: string;
  modifier: string;
  type?: string;
  as: string;
}

const FormControl: React.FC<FormControlProps> = ({
  label,
  placeholder,
  modifier,
  type = 'text',
  as = '',
}) => {
  return (
    <FloatingLabel label={label} controlId={modifier} className="mb-3">
      <Form.Control type={type} placeholder={placeholder} />
    </FloatingLabel>
  );
};

export default FormControl;
