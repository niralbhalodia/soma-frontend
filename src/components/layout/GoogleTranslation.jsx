import React, { useEffect } from 'react';

const GoogleTranslation = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT,
      },
      'google_translate_element',
    );
  };

  const loadGoogleTranslation = async () => {
    var addScript = document.createElement('script');
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit',
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = await googleTranslateElementInit;
    let runInterval = false;

    const interval = setInterval(() => {
      const elements = document.getElementsByClassName('goog-te-gadget');
      if (elements) {
        elements[0]?.childNodes[1]?.remove();
        if (elements[0]?.childNodes?.length == 2) {
          clearInterval(interval);
        }
      }
    }, 100);
  };

  useEffect(() => {
    loadGoogleTranslation();
  }, []);

  return (
    <>
      <div id='google_translate_element' />
    </>
  );
};

export default GoogleTranslation;
