import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

interface IFormControl {
  label: string;
  placeholder: string;
  modifier: string;
  type?: string;
  helpText?: string;
}

function FormControl({
  label,
  placeholder,
  modifier,
  type,
  helpText,
}: IFormControl) {
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
}
FormControl.defaultProps = {
  type: 'text',
  helpText: '',
};
export default FormControl;
