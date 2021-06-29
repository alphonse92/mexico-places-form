import React from 'react';
import PropTypes from 'prop-types';
import configurationContext from './context';

export const ConfigurationProvider = ({
  children,
}) => {
  const {
    REACT_APP_ENV = 'development',
    REACT_APP_ENV_GOOGLE_API_KEY,
    REACT_APP_ENV_SERVICE_NAME,
    REACT_APP_ENV_PLACES_FORM_SERVICE_API_URL,
    REACT_APP_ENV_PLACES_FORM_SERVICE_APP_ID,
    REACT_APP_ENV_LANG,
  } = process.env;

  const CONEKTA_CREDENTIALS = {
    service: REACT_APP_ENV_SERVICE_NAME,
    credentials: {
      apiUrl: REACT_APP_ENV_PLACES_FORM_SERVICE_API_URL,
      appId: REACT_APP_ENV_PLACES_FORM_SERVICE_APP_ID,
    },
  };

  const contextValue = {
    REACT_APP_ENV,
    REACT_APP_ENV_GOOGLE_API_KEY,
    REACT_APP_ENV_SERVICE_NAME,
    REACT_APP_ENV_PLACES_FORM_SERVICE_API_URL,
    REACT_APP_ENV_PLACES_FORM_SERVICE_APP_ID,
    REACT_APP_ENV_LANG: REACT_APP_ENV_LANG || document.documentElement.lang || 'en',
    CONEKTA_CREDENTIALS,
  };

  return React.createElement(
    configurationContext.Provider,
    { value: contextValue },
    children,
  );
};

ConfigurationProvider.defaultProps = {};

ConfigurationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

ConfigurationProvider.displayName = 'ConfigurationProvider';
