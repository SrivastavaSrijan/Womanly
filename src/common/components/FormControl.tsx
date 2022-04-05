import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

interface FormControlProps {
  label: string;
  placeholder: string;
  modifier: string;
  type?: string;
  as: string;
  helpText?: string;
}

const FormControl: React.FC<FormControlProps> = ({
  label,
  placeholder,
  modifier,
  type = 'text',
  as = '',
  helpText = null
}) => {
  return (
    <FloatingLabel label={label} controlId={modifier} className="mb-3">
      <Form.Control type={type} placeholder={placeholder} className="mb-1" />
      {helpText && (
        <Form.Text id={modifier} muted className="mx-2">
          {helpText}
        </Form.Text>
      )}
    </FloatingLabel>
  );
};

export default FormControl;
