import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { Container, Stack, Row, Col, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap-formik';
import { object, string as str, number as num } from 'yup';
import { FormikHelpers } from 'formik';
import cx from 'classnames';

interface IEditProfile {
  diseaseList?: string[];
}

interface IProfileDetails {
    firstName: string;
    lastName: string;
    age: number;
    pincode: number;
}
const defaultValues = {
  firstName: '',
  lastName: '',
  age: '',
  pincode: '',
};

const validationSchema = object().shape({
  firstName: str()
    .required('This field is required')
    .min(2, 'Min. 2 characters required')
    .max(50, 'Max. 50 characters allowed'),
  lastName: str()
    .min(2, 'Min. 2 characters required')
    .max(50, 'Max. 50 characters allowed'),
  age: num().required('This field is required')
    .min(18, 'You must be at least 18 years old to use this application')
    .max(100, 'Please enter a valid value'),
  pincode: num().required('This field is required')
    .test(
      'len',
      'Pin code needs to be exactly 6 digits',
      (val) => (val ? (val ?? '').toString().length === 6 : true),
    ),
});

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function EditProfile({
  diseaseList,
}: IEditProfile) {
  const { user } = useUser();
  const [isSubmitting, setState] = useState(false);
  const handleSubmit = async (
    values: any,
    formikHelpers: any,
  ) => {
    setState(true);
    const enteredValues = values as IProfileDetails;
    const { setSubmitting } = formikHelpers as FormikHelpers<IProfileDetails>;
    await sleep(500);
    alert(JSON.stringify(enteredValues, null, 2));
    setSubmitting(false);
    setState(false);
  };
  return (
    <Container fluid className="py-5 mx-0 bg-muted">
      <Container>
        <Row className="mb-2">
          <Stack className="border-start border-3 border-primary mb-3">
            <h1 className="display-2 ms-lg-3">Edit Profile Details</h1>
            <h6 className="px-lg-3 fw-light text-wrap ms-lg-3">For a more accurate diagnosis, we request you to fill Form A (Basic Information ) and  Form B (Voluntary information).</h6>
          </Stack>
        </Row>
        <Row gap={2} className="w-100 px-lg-4 justify-content-center">
          <Form
            initialValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Col lg={8}>
              <Stack className="px-lg-3" gap={3}>
                <h4>
                  <span className="text-primary">Form A &nbsp;</span>
                  Basic Information Form
                </h4>
              </Stack>
              <Stack gap={3}>
                <Row>
                  <Col lg={5}>
                    <Form.Input name="firstName" label="First Name" />
                  </Col>
                  <Col lg={5}>
                    <Form.Input name="lastName" label="Last Name" />
                  </Col>
                </Row>
                <Row>
                  <Col lg={3}>
                    <Form.Range name="age" label="Age" />
                  </Col>
                  <Col lg={7}>
                    <Form.Input name="pincode" label="Pin Code" />
                  </Col>
                </Row>
                <Row>
                  <Col lg={8}>
                    <Button
                      type="submit"
                      className="btn-md"
                    >
                      {isSubmitting && (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                        <span className="visually-hidden">Loading...</span>
                      </>
                      )}
                      Save details
                    </Button>
                  </Col>
                </Row>

              </Stack>

            </Col>
          </Form>

        </Row>
        <Row />
      </Container>
    </Container>
  );
}
EditProfile.defaultProps = {
  diseaseList: '',
};
export default EditProfile;
