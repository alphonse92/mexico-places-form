import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { extractGoogleGeocodeComponents } from 'conekta-places-lib/dist/helpers/address';

import { useFormPlaces } from '../../Context/useFormPlaces';
import { getStyles } from '../styles';
import { ControlButtonContainer } from '../../../../Layout/ControlButtonsContainer';
import { useLanguage } from '../../../../root/LanguageProvider/use';

export function GeocodeAddressInput() {
  const {
    exit,
    setIsLoading,
    googleAPIKey,
    setAddressComponents,
  } = useFormPlaces();

  const { getString } = useLanguage();

  const [address, setAddress] = useState('');

  const classes = getStyles();

  const getAddressComponents = async () => {
    setIsLoading(true);

    try {
      const encodedKey = encodeURIComponent(googleAPIKey);
      const encodedAdress = encodeURIComponent(address);
      const URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${encodedKey}&address=${encodedAdress}`;
      const response = await fetch(URL);
      const jsonResponse = await response.json();
      const { results = [] } = jsonResponse;
      const [place] = results;

      if (place) {
        setAddressComponents(extractGoogleGeocodeComponents(place));
      }

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  const onInputChanged = (event) => setAddress(event.target.value);
  const disableSubmitBtn = !(Boolean(address) && address.length > 0);

  return (
    <>
      <TextField
        classes={{ root: classes.root }}
        label={getString('USER_FULL_ADDRESS_INPUT_LABEL')}
        helperText={getString('USER_FULL_ADDRESS_INPUT_HELPER_TEXT')}
        onChange={onInputChanged}
      />
      <ControlButtonContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={getAddressComponents}
          disabled={disableSubmitBtn}
        >
          {getString('STR_CONTINUE')}
        </Button>

        <Button onClick={exit}>{getString('STR_CANCEL')}</Button>
      </ControlButtonContainer>
    </>
  );
}

GeocodeAddressInput.propTypes = {};

GeocodeAddressInput.defaultProps = {};
