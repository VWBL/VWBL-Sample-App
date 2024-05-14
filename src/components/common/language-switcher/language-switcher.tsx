import React, { MouseEvent } from 'react';

import { i18n } from '../../../shared/i18n';
import { Button } from '../button';

const LanguageSwitcher: React.FC = () => {
  const currentLanguage = i18n.language;

  const changeLanguage = (language: string) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    i18n.changeLanguage(language);
  };

  return (
    <div>
      {currentLanguage === 'en' && (
        <Button text='日本語' borderRadius={'3xl'} onClick={changeLanguage('ja')} height='40px' />
      )}
      {currentLanguage === 'ja' && (
        <Button text='EN' borderRadius={'3xl'} onClick={changeLanguage('en')} height='40px' />
      )}
    </div>
  );
};

export default LanguageSwitcher;
