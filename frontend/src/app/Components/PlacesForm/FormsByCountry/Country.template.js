/* eslint-disable no-nested-ternary */

/**
 *
 * This component is a template to show you how to create
 * a new form address for a new country
 *
*/
import React from 'react';
import classnames from 'classnames';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import mexicoValidatorSchema from 'conekta-places-lib/dist/schemas/models/validators/mexico';
import { getCountrySegmentsExtrator } from 'conekta-places-lib/dist/helpers/address';

import { useFormPlaces } from '../Context/useFormPlaces';
import { getStyles } from './styles';
import { ControlButtonContainer } from '../ControlButtonsContainer';
import { useLanguage } from '../../../root/LanguageProvider/use';

export default function CountryFormTemplate() {
  // call the hook for lang provider features
  const { getString } = useLanguage();
  // Call the Form places hook to get useful functions
  const {
    addressComponents = {},
    submit,
    exit,
  } = useFormPlaces();

  // Load the init values of the form, just calling the extractor
  const countryId = 'mx'; // Ar for argentina, CO for colombia, and so on...
  const initialValues = getCountrySegmentsExtrator(countryId)(addressComponents);

  // Get the style classes
  const classes = getStyles();

  // You can keep it as it is
  const formik = useFormik({
    initialValues,
    // check the validator schema, in this case méxico
    // The validator defines the business rules of each input
    validationSchema: mexicoValidatorSchema,
    // If you want to lookup the form data
    // onSubmit: (values) => {
    //   console.log(values);
    // },
    onSubmit: submit,

  });

  // Check if there are errors in order to enable/disable the submit btn
  const containErrors = Boolean(Object.keys(formik.errors).length);

  // Function helper, it's only returning a Configured Input field
  const getInput = (id, label, isRequired) => (
    <div className={classnames(classes.formBodyRowContainer)}>
      <TextField
        fullWidth
        id={id}
        name={id}
        label={label}
        value={formik.values[id]}
        onChange={formik.handleChange}
        error={formik.touched[id] && Boolean(formik.errors[id])}
        helperText={(
          (formik.touched[id] && formik.errors[id])
            // formik.errors[inputUniqueName] is an string according to the current error of this field
            // For example, should be a number, positive, greater than, and required
            // And then get the error text for the given error
            ? getString(formik.errors[id] || 'INPUT_ERROR_DEF')
            : (
              // In helper text show * Required if the input is required
              isRequired
                ? getString('INPUT_REQUIRED_HELPER')
                : undefined
            )
        )}
      />
    </div>
  );

  // Build this shit
  return (
    <>
      <p>{getString('FORM_BODY_TEXT')}</p>
      <form onSubmit={formik.handleSubmit}>
        <div className={classnames(classes.formBodyContainer)}>
          {getInput('estado', 'Estado', true)}
          {getInput('ciudad', 'Ciudad', true)}
          {getInput('colonia', 'Colonia', true)}
          {getInput('municipio', 'Municipio', true)}
          {getInput('calle', 'Calle', true)}
          {getInput('codigoPostal', 'Codigo Postal', true)}
          {getInput('numExt', 'Número exterior', true)}
          {getInput('numInt', 'Número interior', false)}
        </div>
        <ControlButtonContainer>
          <Button
            variant="contained"
            color="primary"
            disabled={containErrors}
            type="submit"
          >
            {getString('STR_CONTINUE')}
          </Button>
          <Button onClick={exit}>{getString('STR_CANCEL')}</Button>
        </ControlButtonContainer>
      </form>

    </>
  );
}

CountryFormTemplate.propTypes = {};
CountryFormTemplate.defaultProps = {};
