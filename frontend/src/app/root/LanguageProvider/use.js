import { useContext } from 'react';
import LanguageContext from './context';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  const {
    getString,
  } = context;
  return {
    getString,
  };
};
