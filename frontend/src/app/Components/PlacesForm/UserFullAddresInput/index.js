import React, { useState } from 'react';
import classnames from 'classnames';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { GeocodeAddressInput } from './Geocode';
import { getStyles } from './styles';
import { PlacesInput } from './Places';
import { useLanguage } from '../../../root/LanguageProvider/use';

function UserFullAddresInputComponent() {
  const { getString } = useLanguage();

  const classes = getStyles();

  const [userAlreadyHaveAPlaceInGoogle, setUserAlreadyHaveAPlaceInGoogle] = useState(false);

  const onGooglePlacesToggled = () => setUserAlreadyHaveAPlaceInGoogle(!userAlreadyHaveAPlaceInGoogle);
  const component = userAlreadyHaveAPlaceInGoogle
    ? <PlacesInput />
    : <GeocodeAddressInput />;
  return (
    <>
      <div className={classnames(classes.toggleContainer)}>
        <FormControlLabel
          control={
            (
              <Switch
                checked={userAlreadyHaveAPlaceInGoogle}
                onChange={onGooglePlacesToggled}
                color="primary"
              />
            )
          }
          label={getString('USER_DOES_HAVE_GOOGLE_PLACES')}
        />
      </div>
      {component}
    </>
  );
}

UserFullAddresInputComponent.propTypes = {};

UserFullAddresInputComponent.defaultProps = {};

export const UserFullAddresInput = UserFullAddresInputComponent;
